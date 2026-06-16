"use client";

import Image from "next/image";

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section id="home"
      className="relative md:min-h-screen mt-20 rounded-b-3xl flex flex-col items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f2f3f8 0%, #e8f0fe 30%, #d2ddeb 55%, #1344FE 80%, #1344FE 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Radial glow blobs */}
      <div
        className="absolute left-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-30%, 20%)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: "translate(20%, 10%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-6 pt-16 pb-0">
        {/* Social proof pill */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium text-gray-700"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {[
              "https://i.pravatar.cc/40?img=47",
              "https://i.pravatar.cc/40?img=32",
              "https://i.pravatar.cc/40?img=12",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="user"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 3 - i }}
              />
            ))}
            <div
              className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: "#ef4444", zIndex: 0 }}
            >
              +
            </div>
          </div>
          <span>20,000+ happy patients served!</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-center leading-tight mb-5">
          Secure Medical AI for Clinical Documentation
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-500 text-sm sm:text-lg mb-10 max-w-xl leading-relaxed">
          Generate discharge summaries, medical reports, and structured patient
          insights, safely, accurately, and GDPR-compliant.
        </p>

        {/* CTAs */}
        <div className="sm:flex items-center gap-4 mb-14">
          <button
            className="flex items-center gap-2 mb-4 sm:mb-0 px-7 py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "#2563eb",
              boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
            }}
          >
            Request Demo
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
          <button
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-gray-700 transition-all hover:bg-white/60 active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            View How It Works
          </button>
        </div>

        {/* Decorative virus/cell blobs */}
        <div
          className="absolute left-8 top-72 sm:top-64 pointer-events-none select-none"
          style={{ fontSize: 72 }}
        >
          <Image src="/corona-red.png" width={110} height={110} alt="virus" className="w-16 sm:w-[110]" />
        </div>
        <div className="absolute right-8 top-25  sm:top-64 pointer-events-none select-none">
          <Image src="/corona-blue.png" width={110} height={110} alt="virus" className="w-16 sm:w-[110]"  />
        </div>

        {/* Dashboard screenshot */}
        <div
          className="w-full relative"
          style={{
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
            boxShadow:
              "0 -8px 60px rgba(37,99,235,0.18), 0 40px 80px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {/* Reflective rim at top */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            }}
          />
          <Image
            src="/hero-image.png"
            alt="MedAI Pro Dashboard"
            width={1000}
            height={500}
          />
          {/* Inline dashboard fallback (hidden by default, shown if image 404s) */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
