"use client";

import React from "react";
import { 
  Plus, 
  Copy, 
  ChevronUp, 
  ChevronDown,
  Stethoscope,
  Activity,
  Scissors,
  Pill,
  AlertCircle,
  FileText,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const PatientSummaryTab = () => {
  const sections = [
    { id: "icd", icon: FileText, title: "ICD Coding", color: "bg-blue-500" },
    { id: "conditions", icon: Stethoscope, title: "Conditions", color: "bg-sky-500" },
    { id: "surgeries", icon: Scissors, title: "Surgeries & Procedures", color: "bg-indigo-500" },
    { id: "meds", icon: Pill, title: "Medications", color: "bg-amber-500" },
    { id: "allergies", icon: AlertCircle, title: "Allergies", color: "bg-red-500" },
    { id: "custom", icon: AlertCircle, title: "Custom Clinical Parameters", color: "bg-amber-600" },
  ];

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Top Toolbar */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-lg text-[10px] md:text-xs font-bold hover:bg-emerald-500/20 transition-all whitespace-nowrap">
          <Activity size={14} />
          AI Auto-Fill All
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Copy size={14} />
          Copy
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <FileText size={14} />
          EXPORT
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Plus size={14} />
          Print
        </button>
      </div>

      {/* Summary Sections */}
      <div className="space-y-4 pb-10">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 md:px-6 py-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={cn("size-8 rounded-lg flex items-center justify-center text-white shadow-lg", section.color)}>
                    <Icon size={16} />
                  </div>
                  <h4 className="text-foreground font-bold text-xs md:text-sm tracking-tight">{section.title}</h4>
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
              
              <div className="px-4 md:px-6 pb-6 pt-2 space-y-4">
                {section.id === "icd" ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="size-1.5 md:size-2 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-blue-500 font-bold text-[10px] md:text-xs uppercase tracking-wider">I21.4</span>
                          <span className="text-muted-foreground text-[10px] md:text-[11px] line-clamp-1">Non-ST elevation myocardial infarction</span>
                        </div>
                        <button className="text-muted-foreground hover:text-red-500 transition-colors ml-2"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="min-h-[30px] md:min-h-[40px] text-muted-foreground text-[10px] md:text-[11px] italic">
                    {section.id === "custom" ? "No custom parameters defined. Add fields like HbA1c, eGFR, BMI, or any specialty-specific values." : `No ${section.title.toLowerCase()} added yet.`}
                  </div>
                )}
                
                <button className="flex items-center gap-2 text-blue-500 text-[10px] md:text-[11px] font-bold hover:text-blue-400 transition-colors">
                  <Plus size={14} />
                  Add {section.title}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientSummaryTab;
