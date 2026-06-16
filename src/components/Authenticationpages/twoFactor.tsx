"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFactorMethodPage() {
  const [selected, setSelected] = useState("authenticator");
  const router = useRouter();

  const methods = [
    { id: "authenticator", label: "Authenticator App (Recommended)" },
    { id: "email", label: "Email OTP (Backup)" },
    { id: "sms", label: "SMS OTP (Optional / fallback)" },
  ];

  const handleContinue = () => {
    router.push(`/verify-2fa?method=${selected}`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">

      {/* Left: Full bleed image */}
      <div className="hidden md:block relative w-1/2 h-full flex-shrink-0">
        <Image
          src="/auth-iamge.png"
          alt="Secure your account illustration"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex items-center justify-center bg-white overflow-y-auto py-10 px-6">
        <div
          className="w-full max-w-xl bg-white border border-blue-300 rounded-2xl px-10 py-12 flex flex-col items-center "
         
        >
          <Image
            src="/login-logo.png"
            alt="Login illustration"
            width={64}
            height={56}
            className="object-cover mb-6"
          />

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight text-center">
            Secure Your Account
          </h2>
          <p className="text-sm text-gray-400 mb-8 text-center leading-relaxed">
            For patient data protection, we use an<br />extra verification step.
          </p>

          {/* Method Options */}
          <div className="w-full space-y-3 mb-8">
            {methods.map((method) => (
              <label
                key={method.id}
                onClick={() => setSelected(method.id)}
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border cursor-pointer transition-all"
                style={{
                  borderColor: selected === method.id ? "#2563eb" : "#e2e8f0",
                  background: selected === method.id ? "#eff6ff" : "#fff",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: selected === method.id ? "#1d4ed8" : "#374151" }}
                >
                  {method.label}
                </span>
                {/* Custom radio */}
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    borderColor: selected === method.id ? "#2563eb" : "#d1d5db",
                  }}
                >
                  {selected === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full text-white font-semibold py-3.5 px-4 rounded-xl cursor-pointer transition text-sm flex items-center justify-center gap-2"
            style={{
              background: "#2563eb",
              boxShadow: "0 4px 14px 0 rgba(37,99,235,0.35)",
            }}
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}