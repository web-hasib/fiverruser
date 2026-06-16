"use client";

import { cn } from "@/src/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Mic, Play, Save, Settings, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";

const features = [
  {
    id: 1,
    icon: Mic,
    title: "Voice Recording",
    description:
      "Record consultations directly on mobile or desktop. Our AI captures every detail from your conversation and ambient sounds, even in noisy clinical settings.",
    video: "/dummy-video.mp4",
  },
  {
    id: 2,
    icon: Settings,
    title: "AI Medical Paper Structuring & Summarization",
    description:
      "Automatically organize and summarize medical papers for better understanding and quick reference.",
    video: "/dummy-video.mp4",
  },
  {
    id: 3,
    icon: FileText,
    title: "Generate Output (Referral Letter)",
    description:
      "Easily generate professional referral letters and other documents based on your consultations.",
    video: "/dummy-video.mp4",
  },
  {
    id: 4,
    icon: Save,
    title: "Save & Share With Team",
    description:
      "Securely save your work and share it with your team for collaborative care.",
    video: "/dummy-video.mp4",
  },
  {
    id: 5,
    icon: Wand2,
    title: "AI Assistants (Browse / Create / Share)",
    description:
      "Access a library of AI assistants or create your own to help with various tasks.",
    video: "/dummy-video.mp4",
  },
];

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-play/Carousel behavior
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 md:py-24 bg-[#F0F4FF] overflow-hidden">
      <div className="container mx-auto">
        <SectionHeader
          badge="Features"
          title="One workflow. From documents or voice"
          highlightedText="recording to finished document."
          description="Use patient documents or voice recording on your mobile or desktop and stop struggling with administration. Turn patient conversations + documents into structured notes, tasks, and shared care — fast. We anonymize patient data before processing — GDPR and HIPAA ready."
          icon={<FileText className="text-blue-600 w-4 h-4" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mt-8 md:mt-16">
          {/* Left Side: Feature Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {features.map((feature, index) => {
              const isActive = activeTab === index;
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="relative">
                 <div className={isActive? "bg-blue-800 pl-2 rounded-3xl": ""}>

                  <button
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "group relative w-full flex items-stretch text-left transition-all duration-300 rounded-[20px] overflow-hidden",
                      isActive
                        ? "p-[1.5px] bg-linear-to-r from-[#102FEC] to-[#05B1D5]"
                        : "bg-white border border-slate-100 hover:border-slate-200",
                    )}
                  >
                    {/* Inner Content Container for Gradient Border Effect */}
                    <div
                      className={cn(
                        "flex items-stretch w-full h-full rounded-[18.5px] overflow-hidden",
                        isActive ? "bg-[#F4F8FF]" : "bg-white",
                      )}
                    >
                      {/* Thick Left "Reverse Rounded" Badge Indicator */}
                     

                      <div className="p-5 flex flex-col gap-1 w-full">
                        <div className="flex flex-col gap-3">
                          {/* Icon Container with Gradient */}
                          <div className="flex  shrink-0">
                            <svg width="0" height="0" className="absolute">
                              <defs>
                                <linearGradient
                                  id={`iconGradient-${feature.id}`}
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="100%"
                                >
                                  <stop offset="11.07%" stopColor="#102FEC" />
                                  <stop offset="88.3%" stopColor="#05B1D5" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <Icon
                              className="w-6 h-6"
                              stroke={`url(#iconGradient-${feature.id})`}
                              strokeWidth={2.5}
                            />
                          </div>

                          <h3
                            className={cn(
                              "text-[21px] font-bold tracking-tight transition-colors duration-300",
                              isActive ? "text-[#0F172A]" : "text-[#1E293B]",
                            )}
                          >
                            {feature.title} 
                          </h3>
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-[#475569] text-lg leading-relaxed font-medium ">
                                {feature.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </div>
                 
                </div>
              );
            })}
          </div>

          {/* Right Side: Video Preview */}
          <div className="lg:col-span-8 h-full flex items-center justify-center">
            <div className="relative w-full aspect-video lg:h-full rounded-[2.5rem] bg-slate-200/50 p-2 border border-slate-200/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full rounded-[1.85rem] bg-slate-400 overflow-hidden shadow-2xl group"
                >
                  {/* Video Backdrop */}
                  <div className="absolute inset-0 bg-linear-to-br from-slate-300 via-slate-400 to-slate-500" />

                  {/* Actual Video */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={features[activeTab].video}
                  />

                  {/* Centered Play Button (Always visible but styled premium) */}
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white shadow-2xl overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-[#2563EB] to-[#06B6D4] opacity-90 group-hover:opacity-100 transition-opacity" />
                      <Play className="relative z-20 w-8 h-8 md:w-12 md:h-12 fill-current ml-1" />
                    </motion.div>
                  </div> */}

                  {/* Overlay Gradient for contrast */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
