"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, ArrowRight, Plus } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/src/components/ui/button";

const specialtyCards = [
  {
    icon: "🔬",
    title: "Radiology",
    description: "AI-powered imaging reports, scan interpretations, and diagnostic summaries with prec...",
  },
  {
    icon: "🏥",
    title: "Surgery",
    description: "Operative notes, pre-op assessments, and post-surgical discharge summaries automate...",
  },
  {
    icon: "❤️",
    title: "Cardiology",
    description: "ECG interpretations, cardiac catheterization reports, and heart failure documentation.",
  },
  {
    icon: "🩹",
    title: "Dermatology",
    description: "Skin lesion assessments, biopsy reports, and dermatological treatment plans.",
  },
  {
    icon: "🩹",
    title: "Dermatology",
    description: "Skin lesion assessments, biopsy reports, and dermatological treatment plans.",
  },
  {
    icon: "🎗️",
    title: "Oncology",
    description: "Cancer staging reports, chemotherapy protocols, and oncology treatment summaries.",
  },
  {
    icon: "🧠",
    title: "Neurology",
    description: "Neurological examinations, EEG interpretations, and stroke documentation.",
  },
  {
    icon: "🔬",
    title: "Radiology",
    description: "AI-powered imaging reports, scan interpretations, and diagnostic summaries with prec...",
  },
];

const tags = [
  "Radiology", "Surgery", "Neurology", "Radiology", "Oncology",
  "Orthopedics", "Endocrinology", "Pediatrics", "More"
];

const SpecialtyCard = ({ card, index }: { card: typeof specialtyCards[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-200px" }}
    whileHover={{ 
      y: -15, 
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.18)"
    }}
    animate={{
      y: [0, -8, 0],
    }}
    transition={{
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      },
      duration: 0.6,
      delay: index * 0.05,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="bg-white rounded-[24px] p-7 border border-slate-100 shadow-sm flex flex-col gap-5 group h-full relative overflow-hidden cursor-pointer"
  >
    {/* High-end Shine Sweep Effect */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
       <div className="absolute top-[-100%] left-[-200%] w-[400%] h-[100%] bg-gradient-to-r from-transparent via-blue-100/30 to-transparent -rotate-45 group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
    </div>

    {/* Subtle Background Glow on Hover */}
    <div className="absolute inset-0 bg-linear-to-br from-blue-50/0 to-blue-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner border border-slate-50 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white transition-all duration-500">
      {card.icon}
    </div>
    
    <div className="relative z-10 flex flex-col gap-3">
      <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors duration-300">
        {card.title}
      </h3>
      <p className="text-[#64748B] text-[15px] leading-relaxed font-medium group-hover:text-[#475569] transition-colors duration-300">
        {card.description}
      </p>
    </div>

    <div className="mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 flex items-center gap-2 text-blue-600 font-bold text-sm">
      Learn more <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const Specialities = () => {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <SectionHeader
          badge="Specialties"
          icon={<Stethoscope className="w-4 h-4" />}
          title="For every "
          highlightedText="medical specialty"
          description="MedScribe AI can assist with documentation, tasks, and decisions across every niche — from radiology and cardiology to dermatology, surgery, and more."
        />

        {/* Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {specialtyCards.map((card, index) => (
            <SpecialtyCard key={index} card={card} index={index} />
          ))}
        </div>

        {/* Tags Area */}
        <div className="mt-20 flex justify-center px-4">
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl">
            {tags.map((tag, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.05 
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer px-7 py-2.5 rounded-full bg-white text-[#0066FF] text-sm font-bold border border-[#D0E4FF] shadow-sm hover:shadow-xl hover:shadow-blue-500/20 hover:bg-blue-50 transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Buttons Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <Button variant="gradient" className="h-12 px-8 rounded-lg font-bold uppercase tracking-wide flex items-center gap-2 group shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            Browse Assistants
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="h-12 px-8 rounded-lg font-bold border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-2 active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            CREATE YOUR OWN
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Specialities;