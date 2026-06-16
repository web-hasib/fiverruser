'use client'

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { documentTypes, clinicalRoles, medicalSpecialties } from "@/src/app/(dashboard)/dashboard/user/my-assistants/_components/dropdown-data";

interface Step2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Scratch({ formData, updateFormData, onNext, onBack }: Step2Props) {
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

  const groupedDocumentTypes = (documentTypes as any[]).reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const groupedSpecialties = (medicalSpecialties as any[]).reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const groupedRoles = (clinicalRoles as any[]).reduce((acc, item) => {
    if (!acc[item.groupName]) {
      acc[item.groupName] = [];
    }
    acc[item.groupName].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="flex flex-col gap-8 text-left w-full animate-in fade-in duration-300">
      {/* Top Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Fields */}
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
            <Select 
              value={formData.medicalSpecialty || ""} 
              onValueChange={(val) => updateFormData("medicalSpecialty", val)}
            >
              <SelectTrigger className="w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] transition">
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedSpecialties).map(([group, items]) => (
                  <SelectGroup key={group}>
                    <SelectLabel className="font-bold text-[#4D8EF5]">{group}</SelectLabel>
                    {(items as any[]).map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Output Language */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Output Language <span className="text-red-500">*</span></label>
            <Select 
              value={formData.outputLanguage || "English"} 
              onValueChange={(val) => updateFormData("outputLanguage", val)}
            >
              <SelectTrigger className="w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] transition">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
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
            <Select 
              value={formData.clinicalRole || ""} 
              onValueChange={(val) => updateFormData("clinicalRole", val)}
            >
              <SelectTrigger className="w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] transition">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedRoles).map(([group, items]) => (
                  <SelectGroup key={group}>
                    <SelectLabel className="font-bold text-[#4D8EF5]">{group}</SelectLabel>
                    {(items as any[]).map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Document Type <span className="text-red-500">*</span></label>
            <Select 
              value={formData.documentType || ""} 
              onValueChange={(val) => updateFormData("documentType", val)}
            >
              <SelectTrigger className="w-full bg-background border border-border/50 rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] transition">
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedDocumentTypes).map(([group, items]) => (
                  <SelectGroup key={group}>
                    <SelectLabel className="font-bold text-[#4D8EF5]">{group}</SelectLabel>
                    {(items as any[]).map((item: any) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
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

      {/* Introduction */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-3">Introduction <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(tone, rules & behaviour)</span></label>
        <textarea
          value={formData.introduction || ""}
          onChange={(e) => updateFormData("introduction", e.target.value)}
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
