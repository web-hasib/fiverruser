"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDot, Mic, Play, Plus, ShieldCheck, X } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  const featureTags = [
    { icon: <Mic className="w-3.5 h-3.5" />, label: "VOICE RECORDING" },
    {
      icon: <CircleDot className="w-3.5 h-3.5" />,
      label: "PATIENT TO-DO LISTS",
    },
    { icon: <Plus className="w-3.5 h-3.5" />, label: "LETTER GENERATION" },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      label: "GDPR & HIPAA READY",
    },
  ];

  return (
    <section className="relative bg-[#020612] pt-24 md:pt-36 pb-32 md:pb-48 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center justify-center space-y-10"
          >
            {/* Early Access Badge */}
            <motion.div variants={itemVariants} className="flex">
              <div className="inline-flex items-center group relative overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 ease-out space-x-2 bg-[#0A1A3A] border border-white/10 hover:border-[#0084FF] rounded-full px-5 py-2.5 shadow-md hover:shadow-[0_0_30px_-8px_#0084FF,inset_0_0_15px_-5px_#0084FF]">
                {/* Glowing dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#0084FF] shadow-[0_0_12px_#0084FF] group-hover:shadow-[0_0_18px_#0084FF]"></div>

                <span className="text-[14px] text-white/90 tracking-[0.25em] uppercase font-medium group-hover:text-white transition-all duration-300">
                  NOW IN EARLY ACCESS — SIGN IN!
                </span>

                {/* Optional subtle shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl  md:text-5xl  lg:text-6xl  font-bold tracking-tight text-white leading-[1.05]">
                The Intelligent <br className="hidden sm:block" />
                Platform for <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#2563EB] to-[#00D1FF]">
                  Modern Medicine
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                See More Patients. Clinical Documentation Simplified. Automated
                AI scribing and comprehensive patient management system,
                engineered for clinicians.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4"
            >
              <Button
                variant="primary"
                className="rounded-2xl px-8 h-14 text-base font-bold tracking-wide"
              >
                REQUEST DEMO
              </Button>
              <button 
                onClick={() => setShowVideo(true)}
                className="rounded-2xl bg-transparent border-[.5px] border-white/30 px-8 h-14 text-white text-base backdrop-blur-sm flex items-center gap-4 transition-all group cursor-pointer"
              >
                <div className="text-white rounded-full p-1.5 transition-transform group-hover:scale-110 border border-white">
                  <Play className="w-3.5 h-3.5 text-white fill-current ml-0.5" />
                </div>
                <span className="font-bold tracking-wide">WATCH OVERVIEW</span>
              </button>
            </motion.div>

            {/* Feature Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-center gap-3 md:gap-4"
            >
              {featureTags.map((tag, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-center space-x-2.5 px-5 py-2.5 bg-[#10B981]/5 border border-[#10B981]/30 rounded-full 
             overflow-hidden transition-all duration-300 ease-out
             hover:scale-[1.08] active:scale-95
             hover:shadow-[0_0_25px_-5px_#10B981] hover:shadow-[#10B981]/40
             hover:border-[#10B981]/70 hover:bg-[#10B981]/10"
                >
                  {/* Icon */}
                  <span className="text-[#10B981] text-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    {tag.icon}
                  </span>

                  {/* Text */}
                  <span className="text-[#10B981] text-[10px] md:text-[11px] font-bold tracking-widest transition-all duration-300 group-hover:text-white">
                    {tag.label}
                  </span>

                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"></div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-[640px] mx-auto lg:max-w-none"
          >
            <div className="relative aspect-square md:aspect-6/3 bg-[#071329] border border-white/10 rounded-[32px] md:rounded-[40px] flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Play Button */}
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-tr from-[#2563EB] to-[#00D1FF] flex items-center justify-center shadow-2xl cursor-pointer"
              >
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-current ml-2" />
              </motion.div> */}

              {/* Internal Mockup Backdrop */}
              <div className="absolute inset-0 bg-black/20" />
              <Image
                src="/dashboard.gif"
                alt="Hero Mockup"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Video Modal Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 bg-black/10 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-video bg-[#071329] rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-all border border-white/10"
              >
                <X size={24} />
              </button>

              <iframe
                src="https://www.youtube.com/embed/2WglRXkiBbE?autoplay=1"
                title="Product Overview Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
