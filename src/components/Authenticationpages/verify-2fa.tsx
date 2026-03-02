"use client";

import Image from "next/image";
import {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function VerifyTwoFactorPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method") ?? "email";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: call your verify 2FA API here
      await new Promise((r) => setTimeout(r, 800)); // placeholder
      toast.success("Verified successfully!");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    toast.success("A new code has been sent.");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      {/* Left: Full bleed image */}
      <div className="hidden md:block relative w-1/2 h-full flex-shrink-0">
        <Image
          src="/auth-iamge.png"
          alt="Verify identity illustration"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex items-center justify-center bg-white overflow-y-auto py-10 px-6">
        <div className="w-full max-w-xl bg-white border border-blue-300 rounded-2xl px-10 py-12 flex flex-col items-center">
          <Image
            src="/login-logo.png"
            alt="Login illustration"
            width={64}
            height={56}
            className="object-cover mb-6"
          />

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight text-center">
            Verify your identity
          </h2>
          <p className="text-sm text-gray-400 mb-8 text-center leading-relaxed">
            Enter the 6 digit code from your{" "}
            {method === "authenticator"
              ? "authenticator app"
              : method === "sms"
                ? "phone"
                : "email"}
            .
          </p>

          <div className="w-full space-y-6">
            {/* OTP Label + Inputs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                OTP
              </label>
              <div className="flex gap-2 justify-between">
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
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-11 h-11 text-center text-gray-800 text-lg font-bold border rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 bg-white"
                    style={{
                      borderColor: digit ? "#2563eb" : "#e2e8f0",
                      background: digit ? "#eff6ff" : "#fff",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              style={{
                background: "#2563eb",
                boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
              }}
            >
              {isLoading ? (
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
                  Verify OTP
                </>
              )}
            </button>
          </div>

          {/* Resend */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Send Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
