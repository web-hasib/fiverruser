'use client'

import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface Step2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Scratch({ formData, updateFormData, onNext, onBack }: Step2Props) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const careSettingsList = [
    { id: "ed", label: "ED", sub: "Emergency Dept" },
    { id: "ward", label: "Inpatient", sub: "Ward" },
    { id: "icu", label: "ICU/HDU", sub: "Critical Care" },
    { id: "amb", label: "Ambulatory", sub: "Outpatient" },
    { id: "proc", label: "Procedure", sub: "for surgeries..." },
    { id: "tele", label: "Telehealth", sub: "Remote" },
    { id: "comm", label: "Community", sub: "Home / PHC" },
  ];

  const outputFormats = [
    { id: "full", title: "Full Paragraphs", desc: "Flowing prose. Best for psychiatry, medico-legal referral letters." },
    { id: "bullets", title: "Bullet Points", desc: "Scannable and fast. ED notes, ward rounds, handovers." },
    { id: "mixed", title: "Mixed Format", desc: "Narrative - structured bullets. Best of both worlds." },
  ];

  const populations = [
    { id: "all", label: "All Ages", sub: "> Universal" },
    { id: "geriatric", label: "Geriatric", sub: "> 65 Years" },
    { id: "paediatric", label: "Paediatric", sub: "< 18 Years" },
    { id: "adult", label: "Adult", sub: "> 18 Years" },
  ];

  const detailLevels = [
    { id: "brief", title: "Brief", icon: "⚡", desc: "200-500 words. Balanced detail. Most clinical settings." },
    { id: "standard", title: "Standard", icon: "📋", desc: "200-500 words. Balanced detail. Most clinical settings." },
    { id: "comprehensive", title: "Comprehensive", icon: "📚", desc: "300+ words. Full narrative. Medico-legal, psychiatry." },
  ];

  const codings = [
    { id: "icd10", main: "ICD-10", sub: "Most Common" },
    { id: "lcd11", main: "LCD-11", sub: "WHO 2022" },
    { id: "cpt", main: "CPT", sub: "Procedural" },
    { id: "none", main: "None", sub: "No Codes" },
  ];

  return (
    <div className="flex flex-col gap-8 text-left w-full animate-in fade-in duration-300">
      {/* Top 3-Col Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Fields - 2 cols on md screens */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 relative">
          {/* Assistant Name */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Assistant Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.assistantName || ""}
              onChange={(e) => updateFormData("assistantName", e.target.value)}
              placeholder="Psychiatry — Outpatient Assistant"
              className="w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#4D8EF5] text-foreground transition-colors transition"
            />
          </div>

          {/* Medical Specialty */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Medical Specialty <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(One Or More)</span></label>
            <select className="appearance-none w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] cursor-pointer text-muted-foreground transition">
              <option>Patient Summary</option>
            </select>
          </div>

          {/* Sub-grid for Lang & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Output Language <span className="text-red-500">*</span></label>
              <select
                value={formData.outputLanguage || "English"}
                onChange={(e) => updateFormData("outputLanguage", e.target.value)}
                className="appearance-none w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] cursor-pointer transition"
              >
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Type <span className="text-red-500">*</span></label>
              <select
                value={formData.type || ""}
                onChange={(e) => updateFormData("type", e.target.value)}
                className="appearance-none w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] cursor-pointer text-muted-foreground transition"
              >
                <option value="">Select Type</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>

          {/* Description (Spans 2 rows downwards using Tailwind) */}
          <div className="md:row-span-2">
            <label className="block text-sm font-bold text-foreground mb-2">Description <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(For colleagues & routing)</span></label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="AI Medical Assistant for Emergency Medicine clinical documentation..."
              className="w-full bg-background border border-border/50 rounded-xl p-4 text-sm focus:outline-none focus:border-[#4D8EF5] text-foreground resize-none h-[136px] transition"
            />
          </div>

          {/* Clinical Role */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Clinical Role <span className="text-red-500">*</span></label>
            <select
              value={formData.clinicalRole || ""}
              onChange={(e) => updateFormData("clinicalRole", e.target.value)}
              className="appearance-none w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] cursor-pointer text-muted-foreground transition"
            >
              <option value="">Resident</option>
            </select>
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Document Type <span className="text-red-500">*</span></label>
            <select
              value={formData.documentType || ""}
              onChange={(e) => updateFormData("documentType", e.target.value)}
              className="appearance-none w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] cursor-pointer text-muted-foreground transition"
            >
              <option value="">Discharge Summary</option>
            </select>
          </div>
        </div>

        {/* Right Col: Assistant Icon Drag/Drop */}
        <div className="w-full lg:w-72 flex flex-col">
          <label className="block text-sm font-bold text-foreground mb-2">Assistant Icon <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(optional, SVG or PNG)</span></label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-background border border-dashed border-[#4D8EF5]/50 rounded-2xl flex flex-col items-center justify-center min-h-[160px] p-6 text-center cursor-pointer hover:bg-[#4D8EF5]/5 hover:border-[#4D8EF5] transition"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => updateFormData("assistantIcon", e.target.files?.[0])}
              className="hidden"
              accept="image/png, image/svg+xml"
            />
            <div className="bg-white/10 p-2 rounded-lg mb-3">
              <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
            </div>
            <span className="text-sm font-medium text-foreground">Upload Document</span>
            <span className="text-xs text-muted-foreground mt-1">png or svg</span>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* Care Settings */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-3">Care Setting <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">shapes the entire prompt context and note style</span></label>
        <div className="flex flex-wrap gap-3">
          {careSettingsList.map(item => (
            <button
              key={item.id}
              onClick={() => updateFormData("careSetting", item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${formData.careSetting === item.id
                ? "bg-[#4D8EF5]/10 border-[#4D8EF5] text-white shadow-sm"
                : "bg-background border-border/50 text-muted-foreground hover:border-[#4D8EF5]/50"
                }`}
            >
              <img src="/light.png" alt="icon" className="w-5 h-5 object-contain" />
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${formData.careSetting === item.id ? "text-foreground" : ""}`}>{item.label}</span>
                <span className="text-[10px] leading-tight opacity-70">{item.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-3">Instructions <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(tone, rules & behaviour)</span></label>
        <textarea
          value={formData.instructions || ""}
          onChange={(e) => updateFormData("instructions", e.target.value)}
          placeholder="You are an Emergency Medicine clinical documentation assistant..."
          className="w-full bg-background border border-border/50 rounded-xl p-5 text-sm focus:outline-none focus:border-[#4D8EF5] transition text-muted-foreground resize-y min-h-[140px]"
        />
      </div>

      {/* Output Format */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-3">Output Format <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {outputFormats.map(fmt => (
            <button
              key={fmt.id}
              onClick={() => updateFormData("outputFormat", fmt.id)}
              className={`flex flex-col text-left p-5 rounded-2xl border transition-all ${formData.outputFormat === fmt.id
                ? "bg-[#4D8EF5]/10 border-[#4D8EF5] shadow-sm"
                : "bg-background border-border/50 hover:border-[#4D8EF5]/50"
                }`}
            >
              <span className={`font-bold mb-1 ${formData.outputFormat === fmt.id ? "text-foreground" : "text-foreground"}`}>{fmt.title}</span>
              <span className="text-sm text-muted-foreground">{fmt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="border border-border/50 rounded-2xl overflow-hidden bg-background mt-4 transition">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#4D8EF5]">⚙️</span>
            <span className="text-[#4D8EF5] font-bold text-sm">Advanced Settings</span>
            <span className="text-muted-foreground text-sm hidden sm:inline">Clinical Role • Patient Population • Note Detail • Coding</span>
          </div>
          <ArrowRight className={`w-4 h-4 text-muted-foreground transition-transform ${isAdvancedOpen ? "-rotate-90" : "rotate-90"}`} />
        </button>

        {isAdvancedOpen && (
          <div className="p-6 border-t border-border/50 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200">
            {/* Row 1: Role & Population */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-bold text-foreground mb-2">Clinical Role <span className="text-muted-foreground font-normal">(affects documentation depth & tone)</span></label>
                <input
                  type="text"
                  value={formData.advClinicalRole || ""}
                  onChange={(e) => updateFormData("advClinicalRole", e.target.value)}
                  placeholder="Psychiatry — Outpatient Assistant"
                  className="w-full bg-card border border-border/50 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#4D8EF5] transition text-foreground"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-foreground mb-2">Patient Population <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(Affects Dosing Language & Reference Ranges)</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {populations.map(pop => (
                    <button
                      key={pop.id}
                      onClick={() => updateFormData("patientPopulation", pop.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${formData.patientPopulation === pop.id
                        ? "bg-[#4D8EF5]/10 border-[#4D8EF5]"
                        : "bg-card border-border/50 hover:border-[#4D8EF5]/50"
                        }`}
                    >
                      <span className="text-sm font-bold text-foreground">{pop.label}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">{pop.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Note Detail Level */}
            <div>
              <label className="block text-sm text-foreground font-bold mb-3">Note Detail Level <span className="text-muted-foreground font-normal">(Controls AI Output Length And Depth)</span></label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {detailLevels.map(dl => (
                  <button
                    key={dl.id}
                    onClick={() => updateFormData("noteDetailLevel", dl.id)}
                    className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all ${formData.noteDetailLevel === dl.id
                      ? "bg-[#4D8EF5]/10 border-[#4D8EF5] shadow-sm"
                      : "bg-card border-border/50 hover:border-[#4D8EF5]/50"
                      }`}
                  >
                    <span className="text-2xl mb-2">{dl.icon}</span>
                    <span className={`font-bold mb-1 text-foreground`}>{dl.title}</span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{dl.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Coding */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Care Setting <span className="text-muted-foreground font-normal">shapes the entire prompt context and note style</span></label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {codings.map(c => (
                  <button
                    key={c.id}
                    onClick={() => updateFormData("coding", c.id)}
                    className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all ${formData.coding === c.id
                      ? "bg-[#4D8EF5]/10 border-[#4D8EF5]"
                      : "bg-card border-border/50 hover:border-[#4D8EF5]/50"
                      }`}
                  >
                    <span className="font-bold text-sm text-foreground mb-1">{c.main}</span>
                    <span className="text-[10px] text-muted-foreground">{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Step 2 Footer */}
      <div className="mt-4 flex justify-end gap-3 pt-6 border-t border-border/50">
        <button
          onClick={onBack}
          className="bg-transparent border border-border/50 hover:bg-accent text-foreground px-8 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-[#4D8EF5] hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-[#4D8EF5]/20"
        >
          CONTINUE <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
