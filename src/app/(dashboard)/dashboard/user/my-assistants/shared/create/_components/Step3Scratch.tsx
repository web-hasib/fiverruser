'use client'


import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface Step3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Scratch({ formData, updateFormData, onNext, onBack }: Step3Props) {
  const [step3Tab, setStep3Tab] = useState("freeForm");
  const step3FileRef = useRef<HTMLInputElement>(null);

  // State to make Quick-Inserts selectable
  const [selectedQuickInserts, setSelectedQuickInserts] = useState<string[]>([]);

  const defaultSections = [
    { id: "s", letter: "S", title: "Subjective", color: "bg-[#4D8EF5]", content: "Chief complaint • HPI • Symptoms • Medications" },
    { id: "o", letter: "O", title: "Objective", color: "bg-purple-500", content: "Vitals • Exam • Labs • Imaging" },
    { id: "a", letter: "A", title: "Assessment", color: "bg-emerald-500", content: "Diagnosis • Differentials • Impression" },
    { id: "p", letter: "P", title: "Plan", color: "bg-orange-500", content: "Investigations • Medications • Referrals • Follow-up" },
  ];

  const quickInserts = [
    { id: "q1", title: "Structured sections", desc: "Click to insert this prompt" },
    { id: "q2", title: "Brief/concise style", desc: "Click to insert this prompt" },
    { id: "q3", title: "Numbered problems", desc: "Click to insert this prompt" },
    { id: "q4", title: "Comprehensive detail", desc: "Click to insert this prompt" },
  ];

  const handleQuickInsertToggle = (id: string, title: string) => {
    setSelectedQuickInserts(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        // Remove from selection and ideally remove from freeFormText
        return prev.filter(item => item !== id);
      } else {
        // Add to selection and append to freeFormText
        const newText = formData.freeFormText ? `${formData.freeFormText}\n- ${title}` : `- ${title}`;
        updateFormData("freeFormText", newText);
        return [...prev, id];
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 text-left w-full animate-in fade-in duration-300">
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg p-3 text-sm flex items-center gap-2 font-medium">
        <span className="text-lg">⚙️</span> Structured sections recommended for SOAP Note. Free-form mode is still available.
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground">Example Output</h3>
        <p className="text-sm text-muted-foreground mb-4">Optional but strongly recommended — the AI will learn your clinical writing style from this</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => step3FileRef.current?.click()}
            className="bg-background border border-dashed border-border/50 hover:border-[#4D8EF5]/50 cursor-pointer rounded-xl h-48 flex flex-col items-center justify-center transition p-4 text-center"
          >
            <input type="file" className="hidden" ref={step3FileRef} />
            <div className="bg-white/10 p-2 rounded-lg mb-2">
              <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
            </div>
            <h4 className="font-bold text-foreground text-sm">Drop a file or click to browse</h4>
            <p className="text-[10px] text-muted-foreground mt-1">PDF, DOCX, or TXT - Max 10 MB</p>
          </div>
          <textarea
            value={formData.exampleText || ""}
            onChange={(e) => updateFormData("exampleText", e.target.value)}
            placeholder="Or paste an example note here. The AI will learn your structurer detail level, and clinical writing style."
            className="bg-background border border-dashed border-border/50 hover:border-[#4D8EF5]/50 focus:border-[#4D8EF5] focus:border-solid rounded-xl h-48 p-4 text-sm text-foreground focus:outline-none transition resize-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 bg-background border border-border/50 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => setStep3Tab("freeForm")}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${step3Tab === "freeForm" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Free Form
        </button>
        <button
          onClick={() => setStep3Tab("sections")}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${step3Tab === "sections" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Sections
        </button>
        <button
          onClick={() => setStep3Tab("preview")}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${step3Tab === "preview" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Preview
        </button>
      </div>

      {step3Tab === "freeForm" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <textarea
            value={formData.freeFormText || ""}
            onChange={(e) => updateFormData("freeFormText", e.target.value)}
            placeholder="Describe your template structure in your own words ..."
            className="w-full bg-background border border-border/50 rounded-xl p-5 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] transition resize-y min-h-[300px]"
          />

          <div className="mt-6">
            <label className="block text-sm font-bold text-foreground mb-3">Quick-Insert: <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickInserts.map((qi) => {
                const isSelected = selectedQuickInserts.includes(qi.id);
                return (
                  <button
                    key={qi.id}
                    onClick={() => handleQuickInsertToggle(qi.id, qi.title)}
                    className={`flex flex-col items-start p-4 rounded-xl transition text-left focus:outline-none border ${isSelected
                        ? "bg-[#4D8EF5]/10 border-[#4D8EF5] shadow-sm"
                        : "bg-background border-border/50 hover:border-[#4D8EF5]/50"
                      }`}
                  >
                    <span className={`font-bold text-sm ${isSelected ? "text-foreground" : "text-foreground"}`}>{qi.title}</span>
                    <span className="text-xs text-muted-foreground mt-1">{qi.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step3Tab === "sections" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col gap-4">
          {defaultSections.map((sec, idx) => (
            <div key={idx} className="bg-background border border-border/50 rounded-xl p-5 transition hover:border-[#4D8EF5]/30 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white ${sec.color}`}>
                    {sec.letter}
                  </div>
                  <span className="font-bold text-foreground text-sm">{sec.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1 border border-border/50 rounded-full text-muted-foreground">Required</span>
                  <button className="px-4 py-1 border border-indigo-500/30 text-indigo-400 rounded-full hover:bg-indigo-500/10 transition opacity-0 group-hover:opacity-100">
                    Edit
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pl-10">{sec.content}</p>
            </div>
          ))}

          <button className="mt-2 w-full py-4 border border-dashed border-border/50 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:border-border transition flex items-center justify-center gap-2">
            <span>+</span> Add Custom Section
          </button>
        </div>
      )}

      {step3Tab === "preview" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-1">SOAP Note</h3>
            <p className="text-xs text-muted-foreground font-medium">Emergency Medicine — Emergency Dept Assistant · Emergency Medicine · Mixed Format · English · 🏠 Community</p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-bold text-foreground mb-2">Subjective (HPI)</h4>
              <div className="bg-background border border-dashed border-border/50 rounded-xl p-4 text-sm text-muted-foreground">
                Chief complaint and history of presenting illness. Onset, duration, character, associated symptoms. Medications and allergies. Relevant PMH/PSH/SH/FH.
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground mb-2">Objective (Exam & Results)</h4>
              <div className="bg-background border border-dashed border-border/50 rounded-xl p-4 text-sm text-muted-foreground">
                Vital signs. Physical examination findings. Relevant investigations and imaging reviewed or ordered.
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground mb-2">Assessment & Differential</h4>
              <div className="bg-background border border-dashed border-border/50 rounded-xl p-4 text-sm text-muted-foreground">
                Primary diagnosis and differential diagnoses with clinical reasoning. ICD code where applicable.
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground mb-2">Plan</h4>
              <div className="bg-background border border-dashed border-border/50 rounded-xl p-4 text-sm text-muted-foreground">
                Investigations, prescriptions, referrals, procedures. Patient education. Safety-net advice. Follow-up timeframe.
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#4D8EF5]/10 border border-[#4D8EF5]/50 text-[#4D8EF5] rounded-xl p-4 text-sm flex items-center gap-2">
            <span>🔒</span> HIPAA & GDPR protected. AI-generated notes must be reviewed by the responsible clinician before finalizing.
          </div>
        </div>
      )}

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
