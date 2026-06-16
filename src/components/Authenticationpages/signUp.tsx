
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

// ─── Medical Specialties ──────────────────────────────────────────────────────
const MEDICAL_SPECIALTIES = [
  "Accident and Emergency Nurse",
  "Accredited Mental Health Social Worker",
  "Acupuncturist",
  "Acute Medicine Specialist",
  "Addiction Counselor",
  "Addiction Medicine Specialist",
  "Adolescent and Young Adult Medicine Specialist",
  "Adult Intensive Care Specialist",
  "Advanced Clinical Practitioner",
  "Allergist / Immunologist",
  "Anesthesiologist",
  "Cardiologist",
  "Child & Adolescent Psychiatrist",
  "Clinical Nurse Specialist",
  "Clinical Psychologist",
  "Colorectal Surgeon",
  "Critical Care Medicine Specialist",
  "Dermatologist",
  "Diagnostic Radiologist",
  "Emergency Medicine Physician",
  "Endocrinologist",
  "Family Medicine Physician",
  "Gastroenterologist",
  "General Practitioner",
  "General Surgeon",
  "Geriatrician",
  "Hematologist",
  "Hospitalist",
  "Infectious Disease Specialist",
  "Internal Medicine Physician",
  "Interventional Cardiologist",
  "Medical Oncologist",
  "Neonatologist",
  "Nephrologist",
  "Neurologist",
  "Neurosurgeon",
  "Nurse Practitioner",
  "Obstetrician / Gynecologist",
  "Occupational Therapist",
  "Ophthalmologist",
  "Oral and Maxillofacial Surgeon",
  "Orthopedic Surgeon",
  "Otolaryngologist (ENT)",
  "Palliative Care Specialist",
  "Pathologist",
  "Pediatric Cardiologist",
  "Pediatric Neurologist",
  "Pediatric Surgeon",
  "Pediatrician",
  "Physical Therapist",
  "Physician Assistant",
  "Plastic Surgeon",
  "Primary Care Physician",
  "Psychiatrist",
  "Pulmonologist",
  "Radiation Oncologist",
  "Radiologist",
  "Registered Nurse",
  "Reproductive Endocrinologist",
  "Rheumatologist",
  "Sleep Medicine Specialist",
  "Sports Medicine Physician",
  "Thoracic Surgeon",
  "Transplant Surgeon",
  "Urologist",
  "Vascular Surgeon",
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialty: string;
  institution: string;
  phone: string;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
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
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < total && (
              <div
                className={`h-0.5 w-8 transition-all duration-300 ${isCompleted ? "bg-blue-600" : "bg-gray-200"}`}
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
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
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

// ─── Specialty Native Dropdown ────────────────────────────────────────────────
function SpecialtyDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Primary Specialty <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pr-10 text-gray-700 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Select your specialty
          </option>
          {MEDICAL_SPECIALTIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Policy Modal ─────────────────────────────────────────────────────────────
function PolicyModal({
  type,
  onClose,
}: {
  type: "privacy" | "terms";
  onClose: () => void;
}) {
  const isPrivacy = type === "privacy";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${isPrivacy ? "bg-blue-50" : "bg-purple-50"}`}
            >
              {isPrivacy ? (
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {isPrivacy ? "Privacy Policy" : "Terms of Service"}
              </h2>
              <p className="text-xs text-gray-400">
                Last updated: January 2025
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5 text-sm text-gray-600 leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
                <p>
                  MedAI Pro ("we", "us", "our") is committed to protecting your
                  privacy and handling personal and medical data responsibly.
                  This Privacy Policy explains what data we collect, why we
                  collect it, and how it is used and protected when you use our
                  platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  2. What Data We Collect
                </h2>
                <h3 className="font-medium mt-4 mb-2">Account Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>Email address(es)</li>
                  <li>Optional phone number</li>
                  <li>Country</li>
                  <li>
                    Professional details (specialty, clinical rank - optional)
                  </li>
                </ul>

                <h3 className="font-medium mt-4 mb-2">
                  Usage & Technical Data:
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Login activity</li>
                  <li>Team usage</li>
                  <li>Feature usage statistics</li>
                  <li>
                    Device and browser information (for security and
                    performance)
                  </li>
                </ul>

                <h3 className="font-medium mt-4 mb-2">Patient & Case Data:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Case notes</li>
                  <li>Uploads & documents</li>
                  <li>Transcriptions</li>
                  <li>AI-generated summaries</li>
                  <li>Patient identifiers (as provided by the user)</li>
                </ul>

                <div className="mt-4 p-4">
                  <h4 className="font-bold flex items-center">Important:</h4>
                  <p className="mt-2">
                    You are responsible for ensuring that any patient data
                    uploaded is lawful and authorized.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  3. How We Use Your Data
                </h2>
                <p>We use your data to:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Provide and operate the MedAI Pro platform</li>
                  <li>Process AI requests and generate outputs</li>
                  <li>Secure accounts and prevent misuse</li>
                  <li>Improve system performance and features</li>
                  <li>Comply with legal and regulatory obligations (GDPR)</li>
                </ul>
                <p className="mt-2">We do not sell your data.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  4. AI Processing & Medical Data
                </h2>
                <p>
                  • AI processing is performed only to support clinical
                  workflows.
                </p>
                <p>
                  • AI outputs are not medical advice and must be reviewed by a
                  qualified clinician.
                </p>
                <p>
                  • AI-generated content is not shared with other users unless
                  you explicitly share it.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">5. Data Retention</h2>
                <p>
                  Retention periods depend on your subscription plan and
                  workspace policy.
                </p>
                <h3 className="font-medium mt-4 mb-2">Examples:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Free plans: limited retention (e.g., 30 days)</li>
                  <li>Paid plans: extended or configurable retention</li>
                  <li>AI-derived data may be stored before deletion</li>
                </ul>
                <p className="mt-2">
                  Admins may configure retention rules at organization or
                  department level.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">6. Data Sharing</h2>
                <p>Your data is shared only when you choose to:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Sharing patients or cases with team members</li>
                  <li>Sharing assistants templates in a workspace</li>
                  <li>
                    We do not share your data with third parties for marketing.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">7. Security Measures</h2>
                <p>We implement industry-standard security practices:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Encryption in transit and at rest</li>
                  <li>Role-based access control (RBAC)</li>
                  <li>Two-factor authentication (2FA)</li>
                  <li>Audit logs for admin actions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  8. Your Rights (GDPR)
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Access your data</li>
                  <li>Export your data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion (subject to retention rules)</li>
                  <li>Restrict or object to processing</li>
                </ul>
                <p className="mt-2">
                  Requests can be made via account settings or by contacting
                  support.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  9. Changes to This Policy
                </h2>
                <p>You have the right to:</p>
                <p>We may update this Privacy Policy from time to time.</p>
                <p>
                  Significant changes will be communicated within the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">10. Contact</h2>
                <p>If you have questions about privacy or data protection:</p>
                <p>support@medaipro.com</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using MedAI Pro, you agree to these Terms of
                  Service. If you do not agree, please do not use the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  2. Purpose of the Platform
                </h2>
                <p>
                  MedAI Pro is a clinical support and documentation assistant.
                  It is designed to help healthcare professionals:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Structure medical data</li>
                  <li>Draft notes, letters, and summaries</li>
                  <li>Improve workflow efficiency</li>
                </ul>
                <p className="mt-2">
                  MedAI Pro does not replace professional medical judgment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  3. User Responsibilities
                </h2>
                <p>You agree that:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>You are authorized to use any data you upload</li>
                  <li>
                    You will not upload unlawful or unauthorized patient data
                  </li>
                  <li>You remain responsible for all clinical decisions</li>
                  <li>AI outputs are reviewed before use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">4. Account Security</h2>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    You are responsible for keeping your login credentials
                    secure
                  </li>
                  <li>Two-factor authentication may be required</li>
                  <li>We must notify you immediately of unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  5. Subscription & Usage Limits
                </h2>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    Usage limits (tokens, retention, tasks) depend on your plan
                  </li>
                  <li>
                    Limits may change according to admin or organizational
                    settings
                  </li>
                  <li>
                    Exceeding limits may restrict functionality until reset or
                    upgrade
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">6. Acceptable Use</h2>
                <p>You may not:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Bypass system limits or security</li>
                  <li>Reverse engineer the platform</li>
                  <li>Use the system for fraudulent documentation</li>
                  <li>Use AI output as verified medical fact without review</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">7. Data Ownership</h2>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>You own your content and data</li>
                  <li>
                    You grant MedAI Pro a limited license to process data solely
                    to provide the service
                  </li>
                  <li>
                    Shared content remains under your control based on
                    permissions
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  8. Suspension & Termination
                </h2>
                <p>We reserve the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Suspend or restrict accounts for policy violations</li>
                  <li>Temporarily or permanently disable access</li>
                  <li>Retain or delete data according to retention rules</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">
                  9. Limitation of Liability
                </h2>
                <p>MedAI Pro is provided "as is":</p>
                <p>We are not liable for:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Clinical decisions made using AI output</li>
                  <li>Data entered incorrectly by users</li>
                  <li>Indirect or consequential damages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">10. Changes to Terms</h2>
                <p>We may update these Terms.</p>
                <p>
                  Continued use of the platform implies acceptance of updated
                  terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">11. Contact</h2>
                <p>If you have questions about privacy or data protection:</p>
                <p>support@medaipro.com</p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [policyModal, setPolicyModal] = useState<"privacy" | "terms" | null>(
    null,
  );
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

  useEffect(() => {
    if (step === 4) setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.specialty) {
      toast.error("Primary Specialty is required.");
      return;
    }
    setStep(3);
  };

  const handleRegister = async () => {
    if (!privacyChecked) {
      toast.error("Please accept the Terms of Service and Privacy Policy.");
      return;
    }
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        primarySpeciality: formData.specialty,
        institutionOrPractice: formData.institution,
        phoneNumber: formData.phone,
        termsAndConditions: privacyChecked,
      }).unwrap();
      toast.success("Account created! Please verify your email.");
      setStep(4);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(
        error?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerifyEmail = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }
    try {
      await verifyEmail({
        email: formData.email,
        otp: otpString,
      }).unwrap();
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

  const stepTitles = [
    "Basic Information",
    "Professional Details",
    "Review & Confirm",
    "Verify Your Email",
  ];
  const stepSubtitles = [
    "Let's start with your personal details",
    "Tell us about your profession",
    "Please review your account details",
    "Enter the code sent to your email",
  ];

  return (
    <>
      {/* Policy Modal */}
      {policyModal && (
        <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />
      )}

      <div className="flex h-screen w-full overflow-hidden font-sans">
        {/* Left image */}
        <div className="hidden md:block relative w-1/2 h-full flex-shrink-0">
          <Image
            src="/auth-iamge.png"
            alt="Sign up illustration"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right form */}
        <div className="flex-1 flex items-center justify-center bg-white overflow-y-auto py-10 px-6">
          <div className="w-full max-w-xl bg-white border border-blue-300 rounded-2xl px-10 py-12 flex flex-col items-center">
            <Image
              src="/login-logo.png"
              alt="Logo"
              width={64}
              height={56}
              className="object-cover mb-6"
            />
            <StepIndicator current={step} total={4} />
            <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight text-center">
              {stepTitles[step - 1]}
            </h1>
            <p className="text-sm text-gray-400 mb-8 text-center">
              {stepSubtitles[step - 1]}
            </p>

            {/* STEP 1 */}
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
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
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
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition text-sm flex items-center justify-center gap-2"
                  style={{
                    background: "#2563eb",
                    boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
                  }}
                >
                  Next{" "}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleStep2} className="w-full space-y-5">
                <SpecialtyDropdown
                  value={formData.specialty}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, specialty: val }))
                  }
                />
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
                    style={{
                      background: "#2563eb",
                      boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
                    }}
                  >
                    Next{" "}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="w-full space-y-5">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Account Summary
                  </h3>
                  {[
                    {
                      label: "Name",
                      value: `${formData.firstName} ${formData.lastName}`,
                    },
                    { label: "Email", value: formData.email },
                    {
                      label: "Phone/Institution",
                      value: formData.phone || formData.institution || "—",
                    },
                    { label: "Specialty", value: formData.specialty },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-4"
                    >
                      <span className="text-sm text-gray-400 whitespace-nowrap">
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* HIPAA notice */}
                <div className="flex items-start gap-3 border border-blue-200 rounded-xl px-4 py-3">
                  <svg
                    className="w-5 h-5 text-blue-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Your data is encrypted and HIPAA-compliant. We never share
                    your patient information.
                  </span>
                </div>

                {/* Terms checkbox — links open modals */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={privacyChecked}
                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPolicyModal("terms");
                      }}
                      className="text-blue-600 font-semibold hover:underline focus:outline-none"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPolicyModal("privacy");
                      }}
                      className="text-blue-600 font-semibold hover:underline focus:outline-none"
                    >
                      Privacy Policy
                    </button>
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
                    style={{
                      background: "#2563eb",
                      boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
                    }}
                  >
                    {isRegistering ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
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

            {/* STEP 4 */}
            {step === 4 && (
              <div className="w-full space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    OTP
                  </label>
                  <div className="flex gap-3 justify-between">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="w-8 h-8 md:w-12 md:h-12 text-center text-gray-800 text-xl font-bold border border-gray-200 rounded-xl outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-white"
                        style={
                          digit
                            ? { borderColor: "#2563eb", background: "#eff6ff" }
                            : {}
                        }
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  disabled={isVerifying || otp.join("").length !== 6}
                  className="w-full text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                  style={{
                    background: "#2563eb",
                    boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
                  }}
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
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

            <div className="w-full h-px bg-gray-100 my-6" />
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
