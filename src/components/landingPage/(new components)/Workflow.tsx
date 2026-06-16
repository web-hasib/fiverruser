"use client";
import { GoShareAndroid } from "react-icons/go";

import React from "react";
import { motion } from "framer-motion";
import { FileText, GitBranch } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const workflowSteps = [
  {
    title: "Voice Record or File Upload",
    description:
      "Start a case, record the consultation voice or upload patient documents, images, or lab results.",
    backDescription:
      "Our AI captures every detail from your conversation and ambient sounds, even in noisy clinical settings.",
    icon: <GitBranch className="w-8 h-8" />,
    imageColor: "bg-[#B4C6FF]",
  },
  {
    title: "AI Structures Data",
    description:
      "Our AI anonymizes data, extracts clinical information, and generates a structured draft note SOAP, or your custom format.",
    backDescription:
      "The AI organizes information into structured formats, making it easy to review and edit.",
    icon: <FileText className=" w-8 h-8" />,
    imageColor: "bg-[#B4C6FF]",
  },
  {
    title: "Generate Documents",
    description:
      "Uncertain parts are highlighted for fast verification. You edit, approve, and add personal clinical judgment where needed.",
    backDescription:
      "Easily generate professional referral letters and other documents based on your consultations.",
    icon: <FileText className=" w-8 h-8" />,
    imageColor: "bg-[#B4C6FF]",
  },
  {
    title: "Review tasks in To-Do list",
    description:
      "Generate referral letters, save to the case, create patient-linked to-do tasks, or share with your team instantly.",
    backDescription: "Securely save your work and share it with your team for collaborative care.",
    icon: <GitBranch className=" w-8 h-8" />,
    imageColor: "bg-[#B4C6FF]",
  },
  ];

const Workflow = () => {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        {/* Header Section */}
        <SectionHeader
          badge="Workflow/How it Work"
          title="From first words to finished"
          highlightedText=" document, in minutes"
          description="Use patient documents or voice recording on your mobile or desktop and stop struggling with administration. Turn patient conversations + documents into structured notes, tasks, and shared care — fast. We anonymize patient data before processing — GDPR and HIPAA ready."
          icon={<GoShareAndroid className="text-blue-600 w-4 h-4" />}
          br
        />

        {/* Workflow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flip-card"
              style={{ perspective: "1000px", minHeight: "420px" }}
            >
              {/* Flip inner wrapper */}
              <div
                className="flip-inner relative w-full h-full transition-transform duration-700"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ── FRONT ── */}
                <div
                  className="absolute inset-0 bg-white rounded-[22px] p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div
                    className={`w-full aspect-square rounded-2xl ${step.imageColor} flex items-center justify-center mb-4 overflow-hidden relative`}
                  >
                    <div className="absolute inset-10 bg-white/20 rounded-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-slate-800 text-md leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* ── BACK ── */}
                <div
                  className={`absolute inset-0 border border-gray-300 rounded-[22px] p-6 flex flex-col items-center justify-center text-center`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold  mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className=" text-md leading-relaxed">
                    {step.backDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
