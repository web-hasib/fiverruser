"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { SectionHeader } from "./SectionHeader";

// --- Mock Data ---
const categories = [
  "ALL",
  "Cardiology",
  "Surgery",
  "Neurology",
  "Radiology",
  "Oncology",
  "General",
];

const mockAssistants = [
  {
    id: 1,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    flag: "gb",
  },
  {
    id: 2,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    flag: "gb",
  },
  {
    id: 3,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    flag: "gb",
  },
  {
    id: 4,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    flag: "gb",
  },
  {
    id: 5,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    flag: "gb",
  },
  {
    id: 6,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
    flag: "gb",
  },
  {
    id: 7,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
    flag: "gb",
  },
  {
    id: 8,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
    flag: "gb",
  },
  {
    id: 9,
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: "234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9",
    flag: "gb",
  },
];

// --- Sub-component: AssistantCard ---
const AssistantCard = ({
  assistant,
  index,
}: {
  assistant: (typeof mockAssistants)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      whileHover={{ 
        y: -12, 
        scale: 1.06,
        boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.15)"
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
        y: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className="group relative h-full w-full rounded-[20px] p-[2px] overflow-hidden"
    >
      {/* 1. Spinning Border Layer (Visible only on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#102FEC,#05B1D5,#102FEC)] animate-border-rotate" />
      </div>

      {/* 2. Inner White Mask (Keeps the background white) */}
      <div className="absolute inset-[2px] bg-white rounded-[18px] z-0" />

      {/* 3. Card Content */}
      <div className="relative z-10 bg-white h-full w-full rounded-[18px] p-5 flex flex-col gap-4">
        {/* Header: Avatar and Flag */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300">
            <img
              src={assistant.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-2xl pt-1">
            <img
              src={`https://flagcdn.com/w40/${assistant.flag}.png`}
              alt={assistant.flag}
              className="w-9 h-5 object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl lg:text-2xl font-bold text-[#1E293B] leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {assistant.name}
          </h3>
          <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-2">
            {assistant.description}
          </p>
        </div>

        {/* Footer Stats & Tags */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/50">
              {assistant.specialty}
            </span>
            <span className="text-[12px] text-slate-400 font-medium">
              {assistant.language}
            </span>
            <span className="hidden sm:inline text-[12px] text-slate-400 font-medium">
              Version: {assistant.version}
            </span>
            <span className="hidden sm:inline text-[12px] text-slate-400 font-medium whitespace-nowrap">
              {assistant.uses} Users
            </span>
          </div>

          <Button variant={"gradient"} className="h-8 w-18 text-[13px]" size={"icon"}>
            Review
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main component: Assistants ---
const Assistants = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <section className="py-20 px-4 bg-[#F0F4FF] overflow-hidden">
      <div className="container mx-auto">
        {/* Header Section */}
        <SectionHeader
          title="AI Medical "
          badge="Assistants"
          icon={<Sparkles className="w-5 h-5" />}
          highlightedText="Assistants Library"
          description="Browse ready-made AI medical assistants, customize them to match your workflow, or create and share your own assistants tailored to your specialty."
        />

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16 px-4">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative px-7 py-2.5 rounded-full text-sm font-bold transition-colors duration-1000 hover:scale-105 shadow-[0_2px_10px_-3px_rgba(59,130,246,0.2)]",
                  "hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                  isActive 
                    ? "text-blue-600" 
                    : "text-slate-500 hover:text-blue-500 bg-white border border-slate-100 hover:border-blue-200"
                )}
              >
                {/* Text remains on top */}
                <span className="relative z-10">{cat}</span>
                
                {/* Sliding active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-blue-400/30 border border-blue-100 rounded-full shadow-[0_2px_10px_-3px_rgba(59,130,246,0.2)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {mockAssistants.map((assistant, index) => (
              <AssistantCard
                key={assistant.id}
                assistant={assistant}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Button
           variant={"primary"}
           className="uppercase h-12"
           
          >      
            View More..
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Assistants;
