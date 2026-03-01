"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Basic Information",
    description: "Let's start with your basic details.",
    image: "/doctor.jpg",
  },
  {
    id: 2,
    title: "Secure Login",
    description: "Access through protected account.",
    image: "/iamge-1.jpg",
  },
  {
    id: 3,
    title: "Select Specialty & Task",
    description: "Choose specialty and task according to need.",
    image: "/array.png",
  },
  {
    id: 4,
    title: "Upload Documents",
    description: "Upload PDF, DOCX, or TXT files securely.",
    image: "/doctor.jpg",
  },
  {
    id: 5,
    title: "AI-Generated Note",
    description: "Structured clinical note generation in seconds.",
    image: "/iamge-1.jpg",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 1024;
  const optimizedStepWidth = isMobile ? windowWidth - 60 : 450;

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 8000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    startAutoplay();
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    startAutoplay();
  };

  const goToStep = (index: number) => {
    setActiveStep(index);
    startAutoplay();
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">
      {/* Subtle Background Art */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-[#001B4B] tracking-tight">
            How It Works!
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            Simple, secure, and efficient workflow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 1. Image Column — LEFT on Desktop, first on mobile */}
          <div
            className="lg:col-span-5 flex justify-center order-1 lg:order-1"
            style={{ zIndex: 500 }}
          >
            <div className="relative w-full max-w-[500px] aspect-4/5">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[3rem] border border-white/40 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.85, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.1, x: -20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-8 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/50">
                      <Image
                        src={steps[activeStep].image}
                        alt={steps[activeStep].title}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 2. Timeline + Controls — RIGHT on Desktop, second on mobile */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] flex flex-col justify-center order-2 lg:order-2">
            {/* STATIC DASHED LINE (CENTER) */}
            <div className="absolute top-1/2 left-0 w-[3000px] h-[3px] border-t-2 border-dashed border-blue-200/50 -translate-y-1/2 z-10" />

            {/* STATIC START ICON */}
            <Image
              src="/start.png"
              alt="start"
              width={40}
              height={40}
              className="absolute lg:-left-10 md:-left-10 left-0 top-1/2 -translate-y-1/2 z-20"
            />

            {/* SLIDING CONTENT ROW */}
            <div
              className={cn(
                "relative h-full flex items-center overflow-x-hidden px-0",
                !isMobile && "top-1/2 left-0 w-[3000px] -translate-y-1/2 z-10",
              )}
            >
              <motion.div
                className={cn("flex items-center", !isMobile && "-ml-106")}
                animate={{
                  x: isMobile
                    ? -activeStep * optimizedStepWidth +
                      (windowWidth - optimizedStepWidth) / 2
                    : (1 - activeStep) * optimizedStepWidth,
                }}
                transition={{ type: "spring", stiffness: 45, damping: 20 }}
              >
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <div
                      key={step.id}
                      className="shrink-0 flex flex-col items-center cursor-pointer group relative"
                      style={{ width: optimizedStepWidth }}
                      onClick={() => goToStep(index)}
                    >
                      {/* Step Text */}
                      <div className="text-center mb-40 h-[180px] lg:h-[220px] flex flex-col justify-end px-4">
                        <motion.h3
                          animate={{
                            scale: isActive ? 1.15 : 0.8,
                            opacity: isActive ? 1 : 0.1,
                            x: isActive ? 0 : 30,
                          }}
                          className="text-xl md:text-2xl font-black text-[#001B4B]"
                        >
                          {step.title}
                        </motion.h3>
                        <motion.p
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : 30,
                          }}
                          className="text-xs md:text-base text-gray-400 font-bold max-w-[350px] mt-4 lg:mt-6"
                        >
                          {step.description}
                        </motion.p>
                      </div>

                      {/* BOTTOM SPACE (Where the flag sits) */}
                      <div className="h-40" />
                      {isActive && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-40">
                          <Image
                            src="/activeIcon.png"
                            width={isMobile ? 80 : 100}
                            height={isMobile ? 80 : 100}
                            alt="flag"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div
                  className="shrink-0"
                  style={{ width: optimizedStepWidth * 2 }}
                />
              </motion.div>
            </div>

            {/* NAVIGATION CONTROLS */}
            <div className="absolute bottom-4 right-4 lg:right-auto lg:left-0 flex gap-3 z-50">
              <button
                onClick={prevStep}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#001B4B] shadow-lg border border-gray-100 group active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextStep}
                className="w-12 h-12 rounded-full bg-[#001B4B] flex items-center justify-center text-white shadow-lg group active:scale-95"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
