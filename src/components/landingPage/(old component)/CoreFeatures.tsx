"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface CoreFeature {
  id: number;
  step: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
}

export const coreFeatures: CoreFeature[] = [
  {
    id: 1,
    step: "01 / 03",
    title: "Specialty Specific AI",
    description: "Predefined prompts tailored to different medical fields.",
    image: "/dummy-dash.png",
    buttonText: "Apply Feature",
    buttonUrl: "/#",
  },
  {
    id: 2,
    step: "02 / 03",
    title: "Secure Medical Records",
    description: "End-to-end encrypted patient documentation and storage.",
    image: "/dummy-dash.png",
    buttonText: "Apply Feature",
    buttonUrl: "/#",
  },
  {
    id: 3,
    step: "03 / 03",
    title: "AI Clinical Assistant",
    description: "Automated note generation and smart clinical suggestions.",
    image: "/dummy-dash.png",
    buttonText: "Apply Feature",
    buttonUrl: "/#",
  },
];

const CoreFeatures = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % coreFeatures.length);
    }, 5000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const onThumbClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      startAutoplay(); // Reset timer on interaction
    },
    [startAutoplay],
  );

  const scrollPrev = useCallback(() => {
    setSelectedIndex(
      (prev) => (prev - 1 + coreFeatures.length) % coreFeatures.length,
    );
    startAutoplay();
  }, [startAutoplay]);

  const scrollNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % coreFeatures.length);
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    if (!emblaThumbsApi) return;
    emblaThumbsApi.scrollTo(selectedIndex);
  }, [emblaThumbsApi, selectedIndex]);

  const activeFeature = coreFeatures[selectedIndex];

  return (
    <section id="features" className="bg-linear-to-br from-[#1344FE] to-[#01105B] py-12 md:py-16 px-4 overflow-hidden md:m-4 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Core Features
          </h2>
          <p className="text-blue-100 text-lg">
            Everything you need for secure medical AI documentation
          </p>
        </div>

        {/* Unified Layout Container */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Glassy Dashboard Preview Section */}
          <div className="w-full lg:w-[70%] relative flex items-center justify-center">
            {/* Arrows Container - Separated from glassy box */}
            <button
              onClick={scrollPrev}
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl hover:scale-110 active:scale-95 transition-all z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl hover:scale-110 active:scale-95 transition-all z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Main Glassy Box */}
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-3 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col gap-6">
              {/* Image Transition Area */}
              <div className="aspect-video relative overflow-hidden rounded-3xl">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Internal Glassy Thumbnails */}
              <div
                className="overflow-hidden w-full pb-1"
                ref={thumbViewportRef}
              >
                <div className="flex gap-4 px-2">
                  {coreFeatures.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => onThumbClick(index)}
                      className={cn(
                        "relative flex-[0_0_100px] md:flex-[0_0_150px] aspect-video rounded-xl overflow-hidden transition-all duration-500 border-2",
                        selectedIndex === index
                          ? "scale-105 shadow-2xl ring-4 ring-white/10"
                          : "border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105",
                      )}
                    >
                      <Image
                        src={feature.image}
                        alt={`Thumbnail ${feature.id}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Details Content */}
          <div className="w-full lg:w-[30%] text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4"
              >
                <span className="text-blue-200 text-sm font-semibold tracking-widest uppercase opacity-80">
                  {activeFeature.step}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  {activeFeature.title}
                </h2>
                <p className="text-blue-50/80 text-lg leading-relaxed font-medium">
                  {activeFeature.description}
                </p>
                <Link
                  href={activeFeature.buttonUrl}
                  className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 rounded-full border border-white/30 text-white font-semibold hover:bg-white hover:text-blue-700 transition-all duration-500"
                >
                  <span className="tracking-wide">
                    {activeFeature.buttonText}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-600 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
