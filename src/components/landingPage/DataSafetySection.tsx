"use client";
import React from "react";
import { Shield, Lock, FileText, Award, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./(new components)/SectionHeader";
import { motion } from "framer-motion";

export const DataSafetySection = () => {
  const features = [
    "GDPR Compliant for international use",
    "CCPA Compliant for California privacy",
    "HITRUST CSF Certified",
    "ISO 27001 Information Security",
    "Regular third-party security audits",
    "Penetration testing quarterly",
  ];

  const badges = [
    {
      icon: (
        <ShieldCheck
          className="w-8 h-8 md:w-10 md:h-10 text-blue-600"
          strokeWidth={1.5}
        />
      ),
      label: "HIPAA",
    },
    {
      icon: (
        <Lock
          className="w-8 h-8 md:w-10 md:h-10 text-blue-600"
          strokeWidth={1.5}
        />
      ),
      label: "SOC 2",
    },
    {
      icon: (
        <FileText
          className="w-8 h-8 md:w-10 md:h-10 text-blue-600"
          strokeWidth={1.5}
        />
      ),
      label: "GDPR",
    },
    {
      icon: (
        <Award
          className="w-8 h-8 md:w-10 md:h-10 text-blue-600"
          strokeWidth={1.5}
        />
      ),
      label: "ISO 27001",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 450,
        damping: 30,
      },
    },
  } as const;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white font-sans mx-auto overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeader
            title="Data Safety "
            highlightedText="& Security"
            badge="security"
            icon={<Shield className="w-4 h-4 text-blue-500" />}
            description="Your patient data is protected with modern security practices designed for healthcare environments."
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Checklist */}
          <motion.div
            className="flex flex-col space-y-5 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{scale:1.05, transition: { type: "spring", stiffness: 500, damping: 30 } }}
                className="flex items-center px-7 py-6 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 group cursor-default"
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                  className="bg-[#10B981] rounded-full p-1 mr-5 flex-shrink-0 shadow-lg shadow-emerald-500/20"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
                <span className="text-[#374151] font-semibold text-base md:text-lg lg:text-xl group-hover:text-blue-600 transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Badges Grid */}
          <motion.div
            className="grid grid-cols-2 gap-5 sm:gap-8 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
          >
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-3xl auto-rows-fr shadow-[0_8px_30px_rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all"
              >
                <div className="bg-[#EFF6FF] w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-6">
                    {badge.icon}
                  </div>
                <span className="text-blue-600 font-semibold text-lg md:text-[22px] tracking-wide">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

