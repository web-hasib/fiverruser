"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MoveDown, HelpCircle, ArrowDown } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/src/components/ui/button";

const faqData = [
  {
    question: "How does MedScribe AI work?",
    answer: "You record a visit (or upload audio), add relevant documents, and MedScribe generates structured drafts (notes, summaries, referrals) plus patient-linked to-dos. You review, edit, and finalize before saving or sharing."
  },
  {
    question: "Is it accurate enough for clinical use?",
    answer: "It's built for clinical drafting—not autopilot medicine. You always review and approve outputs before they're stored or shared. The UI highlights uncertain parts for faster verification."
  },
  {
    question: "What languages and specialties does it support?",
    answer: "You can choose specialty-focused assistants (e.g., Radiology, Surgery, Cardiology, Dermatology) and set style preferences (short vs detailed, SOAP vs narrative). Language options depend on your configured assistants."
  },
  {
    question: "Can I create my own AI assistant?",
    answer: "Yes. You can create assistants with your preferred structure, tone, language, templates, and department workflow—and share them with your team or clinic (with permissions)."
  },
  {
    question: "Can assistants be shared with other doctors?",
    answer: "Yes. Assistants can be shared at Team / Department / Organization level. You control who can use, edit, or publish updates."
  },
  {
    question: "Does it work on mobile?",
    answer: "Yes. Record dictations, upload documents/photos, review drafts, and manage tasks from mobile—ideal for rounds and quick consults."
  },
  {
    question: "How is patient data protected?",
    answer: "We use role-based access controls, audit logs, and secure storage. You can configure retention and sharing rules. (Exact compliance posture depends on your deployment and configuration.)"
  },
  {
    question: "Can I use it without uploading files?",
    answer: "Scribing generates visit documentation from voice + documents. Assistants are reusable agents for specialized tasks: radiology summaries, operative note structure, discharge packs, admin letters, and more."
  },
  {
    question: "Does it integrate with EHR systems?",
    answer: "Integrations depend on your environment (API availability, permissions). Many teams start with export/copy workflows, then add deeper integration."
  },
  {
    question: "What's the difference between scribing and assistants?",
    answer: "Scribing generates visit documentation from voice + documents. Assistants are reusable agents for specialized tasks: radiology summaries, operative note structure, discharge packs, admin letters, and more."
  },
  {
    question: "Can it generate referral letters and ambulatory papers?",
    answer: "Yes—based on your templates. It can also generate a patient-linked to-do list to prevent missed follow-ups."
  },
  {
    question: "Is patient data handled securely in the platform?",
    answer: "Yes. Our platform is built with security and privacy at its core. Patient information is protected through modern technical and organizational safeguards designed to reduce unauthorized access, accidental disclosure, and data misuse."
  },
  {
    question: "Is the platform GDPR-friendly?",
    answer: "Yes — the platform is designed with GDPR-first principles in mind. That includes data minimization, controlled access, secure data handling, and support for responsible processing of sensitive healthcare information. Actual GDPR compliance also depends on how your organization configures and uses the system, including internal policies, access management, and legal documentation."
  },
  {
    question: "How do pricing and user roles work?",
    answer: "Typically: individual plans, Pro plans, and Team/Department plans with sharing + admin controls. Role permissions (viewer/editor/admin) can be tailored."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void
}) => {
  return (
    <div
      className={`rounded-xl transition-all duration-300 overflow-hidden ${isOpen
          ? "bg-linear-to-r from-[#102FEC] to-[#05B1D5] p-[1.4px] lg:p-[2.4px] shadow-md"
          : "bg-slate-100 p-px hover:bg-blue-100 shadow-sm"
        }`}
    >
      <div className="bg-white rounded-[11px] overflow-hidden">
        <button
          onClick={onClick}
          className="w-full px-6 py-5 flex items-center justify-between text-left group"
        >
          <span className={`font-semibold text-[15px] md:text-lg lg:text-xl transition-colors ${isOpen ? "text-blue-600" : "text-slate-700 group-hover:text-blue-500"}`}>
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-blue-600" : "text-slate-400"}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-5 text-slate-500 text-sm md:text-base lg:text-md leading-relaxed border-t border-slate-50 pt-4">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 px-4 bg-[#F8FAFF] overflow-hidden" id="faq">
      <div className="container mx-auto">
        <SectionHeader
          badge="FAQ'S"
          icon={<HelpCircle className="w-4 h-4" />}
          title="Frequently "
          highlightedText="Asked Questions"
          description="Find answers to common questions about MedScribe AI, security, assistants, and clinical workflows."
          className="mb-8"
        />

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-6 pr-14 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-6">
              <div className="h-6 w-px bg-slate-200 mr-4" />
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions? Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-6xl mx-auto bg-white rounded-[32px] p-5 text-center shadow-md shadow-blue-500/5 border border-white relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute " />
          <div className="absolute  bg-blue-50/50 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Still have questions?
            </h3>
            <p className="text-slate-500 text-base md:text-base lg:text-lg max-w-xl">
              Can&apos;t find the answer you&apos;re looking for? Please contact our support team.
            </p>
            <Button 
               variant="gradient"
               className="h-12 rounded-xl group/btn "
               asChild
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                Contact Support
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="group-hover/btn:translate-y-1  transition-transform"
                >
                  <ArrowDown size={20} />
                </motion.div>
              </motion.button>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;