"use client";

import React from "react";
import { 
  Sparkles, 
  Copy, 
  Download, 
  Printer,
  ChevronDown,
  ChevronUp,
  Maximize2
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const SOAPNoteTab = () => {
  const sections = [
    { id: "s", letter: "S", title: "Subjective", sub: "Chief complaint · HPI · Symptoms · Medications" },
    { id: "o", letter: "O", title: "Objective", sub: "Vitals · Exam · Labs · Imaging" },
    { id: "a", letter: "A", title: "Assessment", sub: "Diagnosis · Differentials · Impression" },
    { id: "p", letter: "P", title: "Plan", sub: "Investigations · Medications · Referrals · Follow-up" },
  ];

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Top Toolbar */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-lg text-[10px] md:text-xs font-bold hover:bg-emerald-500/20 transition-all whitespace-nowrap">
          <Sparkles size={14} className="fill-emerald-500/20" />
          AI Auto-Fill All
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Copy size={14} />
          Copy
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Download size={14} />
          EXPORT
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Printer size={14} />
          Print
        </button>
      </div>

      {/* SOAP Sections */}
      <div className="space-y-4 pb-10">
        {sections.map((section) => (
          <div key={section.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 md:px-6 py-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="size-8 md:size-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20 text-sm md:text-base">
                  {section.letter}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-foreground font-bold text-xs md:text-sm">{section.title}</h4>
                  <p className="text-muted-foreground text-[9px] md:text-[11px] mt-0.5">{section.sub}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-2 md:px-3 py-1 bg-muted text-muted-foreground rounded-lg text-[9px] md:text-[10px] font-bold hover:text-foreground transition-all">
                  <Copy size={12} />
                  <span className="hidden xs:inline">Copy</span>
                </button>
                <button className="p-1 text-muted-foreground hover:text-foreground transition-all">
                  <ChevronUp size={18} />
                </button>
              </div>
            </div>
            
            <div className="px-4 md:px-6 pb-6 pt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="min-h-[60px] md:min-h-[80px] text-muted-foreground text-xs md:text-sm italic">
                No content generated yet.
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-500 rounded-lg text-[9px] md:text-[10px] font-bold hover:bg-purple-500/20 transition-all">
                  <Sparkles size={12} />
                  Expand
                </button>
                <button className="px-3 md:px-4 py-1.5 bg-muted border border-border text-muted-foreground rounded-lg text-[9px] md:text-[10px] font-bold hover:text-foreground transition-all">
                  Clear
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOAPNoteTab;
