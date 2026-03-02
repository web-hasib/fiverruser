"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    useState,
    useRef,
    KeyboardEvent,
    ClipboardEvent,
    useEffect,
    ChangeEvent,
} from "react";
import { toast } from "sonner";
import {
    useRegisterMutation,
    useVerifyEmailMutation,
    useResendOtpMutation,
} from "@/src/redux/api/auth/authApi";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    specialty: string;
    institution: string;
    phone: string;
}

// ─── Step Progress Indicator ─────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex items-center gap-2 mb-8">
            {Array.from({ length: total }).map((_, i) => {
                const step = i + 1;
                const isCompleted = step < current;
                const isActive = step === current;
                return (
                    <div key={step} className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isCompleted
                                    ? "bg-blue-600 text-white"
                                    : isActive
                                        ? "border-2 border-blue-600 text-blue-600 bg-blue-50"
                                        : "border-2 border-gray-200 text-gray-300 bg-white"
                                }`}
                        >
                            {isCompleted ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step
                            )}
                        </div>
                        {step < total && (
                            <div
                                className={`h-0.5 w-8 transition-all duration-300 ${isCompleted ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Input Component ──────────────────────────────────────────────────────────
function Input({
    label,
    id,
    required,
    ...props
}: {
    label: string;
    id: string;
    required?: boolean;
    [key: string]: unknown;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
                id={id}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm placeholder-gray-300"
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignUpForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        specialty: "",
        institution: "",
        phone: "",
    });

    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    // Focus first OTP box when on step 4
    useEffect(() => {
        if (step === 4) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [step]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ── Step 1 ──
    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }
        setStep(2);
    };

    // ── Step 2 ──
    const handleStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.specialty) {
            toast.error("Primary Specialty is required.");
            return;
        }
        setStep(3);
    };

    // ── Step 3: Register ──
    const handleRegister = async () => {
        if (!privacyChecked || !termsChecked) {
            toast.error("Please accept both checkboxes to continue.");
            return;
        }
        try {
            await register({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                specialty: formData.specialty,
                institution: formData.institution,
                phone: formData.phone,
            }).unwrap();
            toast.success("Account created! Please verify your email.");
            setStep(4);
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error?.data?.message || "Registration failed. Please try again.");
        }
    };

    // ── Step 4: Verify OTP ──
    const handleOtpChange = (index: number, value: string) => {
        if (value && !/^\d$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasted)) return;
        const newOtp = [...otp];
        for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
        setOtp(newOtp);
        const lastIndex = Math.min(pasted.length, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    const handleVerifyEmail = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            toast.error("Please enter the complete 6-digit code.");
            return;
        }
        try {
            await verifyEmail({ email: formData.email, otp: parseInt(otpString) }).unwrap();
            toast.success("Email verified! You can now sign in.");
            router.push("/login");
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error?.data?.message || "Invalid code. Please try again.");
        }
    };

    const handleResend = async () => {
        try {
            await resendOtp({ email: formData.email }).unwrap();
            toast.success("A new code has been sent to your email.");
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error?.data?.message || "Failed to resend code.");
        }
    };

    // ── Shared layout wrapper ──
    const stepTitles = ["Basic Information", "Professional Details", "Review & Confirm", "Verify Your Email"];
    const stepSubtitles = [
        "Let's start with your personal details",
        "Tell us about your profession",
        "Please review your account details",
        "Enter the code sent to your email",
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden font-sans">
            {/* Left: Full bleed image */}
            <div className="hidden md:block relative w-1/2 h-full flex-shrink-0">
                <Image
                    src="/auth-iamge.png"
                    alt="Sign up illustration"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Right: Form Panel */}
            <div className="flex-1 flex items-center justify-center bg-white overflow-y-auto py-10 px-6">
                <div className="w-full max-w-xl bg-white border border-blue-300 rounded-2xl px-10 py-12 flex flex-col items-center">

                    {/* Logo */}
                    <Image
                        src="/login-logo.png"
                        alt="Logo"
                        width={64}
                        height={56}
                        className="object-cover mb-6"
                    />

                    {/* Step indicator */}
                    <StepIndicator current={step} total={4} />

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight text-center">
                        {stepTitles[step - 1]}
                    </h1>
                    <p className="text-sm text-gray-400 mb-8 text-center">{stepSubtitles[step - 1]}</p>

                    {/* ── STEP 1: Basic Information ── */}
                    {step === 1 && (
                        <form onSubmit={handleStep1} className="w-full space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Barlow"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Input
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="xyz@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="HTYDJ4538#$%"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm placeholder-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-500 transition"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition text-sm flex items-center justify-center gap-2"
                                style={{ background: "#2563eb", boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)" }}
                            >
                                Next
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </form>
                    )}

                    {/* ── STEP 2: Professional Details ── */}
                    {step === 2 && (
                        <form onSubmit={handleStep2} className="w-full space-y-5">
                            <div>
                                <label htmlFor="specialty" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Primary Specialty <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="specialty"
                                    name="specialty"
                                    placeholder="Primary Care"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm placeholder-gray-300"
                                />
                            </div>
                            <Input
                                label="Institution/Practice"
                                id="institution"
                                name="institution"
                                type="text"
                                placeholder="Institution Name"
                                value={formData.institution}
                                onChange={handleChange}
                            />
                            <Input
                                label="Phone Number"
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="(000) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition text-sm flex items-center justify-center gap-2"
                                    style={{ background: "#2563eb", boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)" }}
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ── STEP 3: Review & Confirm ── */}
                    {step === 3 && (
                        <div className="w-full space-y-5">
                            {/* Account Summary Card */}
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Summary</h3>
                                {[
                                    { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
                                    { label: "Email", value: formData.email },
                                    { label: "Phone/Institution", value: formData.phone || formData.institution || "—" },
                                    { label: "Specialty", value: formData.specialty },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-gray-400 whitespace-nowrap">{label}</span>
                                        <span className="text-sm font-semibold text-gray-800 text-right">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Checkbox: Privacy */}
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={privacyChecked}
                                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                />
                                <span className="text-xs text-gray-500 leading-relaxed">
                                    Your data is encrypted and HIPAA compliant. We never share your contact information.
                                </span>
                            </label>

                            {/* Checkbox: Terms */}
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={termsChecked}
                                    onChange={(e) => setTermsChecked(e.target.checked)}
                                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                />
                                <span className="text-xs text-gray-500 leading-relaxed">
                                    I agree to the{" "}
                                    <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a>
                                    {" "}and{" "}
                                    <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
                                </span>
                            </label>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="flex-1 py-3.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    disabled={isRegistering}
                                    className="flex-1 text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                                    style={{ background: "#2563eb", boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)" }}
                                >
                                    {isRegistering ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 4: Verify Your Email ── */}
                    {step === 4 && (
                        <div className="w-full space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">OTP</label>
                                <div className="flex gap-3 justify-between">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onPaste={handleOtpPaste}
                                            className="w-12 h-12 text-center text-gray-800 text-xl font-bold border border-gray-200 rounded-xl outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-white"
                                            style={digit ? { borderColor: "#2563eb", background: "#eff6ff" } : {}}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleVerifyEmail}
                                disabled={isVerifying || otp.join("").length !== 6}
                                className="w-full text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                                style={{ background: "#2563eb", boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)" }}
                            >
                                {isVerifying ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Verify Email
                                    </>
                                )}
                            </button>

                            <p className="text-sm text-gray-400 text-center">
                                Didn&apos;t receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={isResending}
                                    className="text-blue-600 font-semibold hover:text-blue-700 transition disabled:opacity-50"
                                >
                                    {isResending ? "Sending..." : "Resend Code"}
                                </button>
                            </p>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-100 my-6" />

                    {/* Sign in Link */}
                    <p className="text-sm text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition">
                            Sign in
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}
