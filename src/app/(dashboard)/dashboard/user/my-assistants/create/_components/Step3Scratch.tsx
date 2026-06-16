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
  const step3FileRef = useRef<HTMLInputElement>(null);



  return (
    <div className="flex flex-col gap-8 text-left w-full animate-in fade-in duration-300">
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg p-3 text-sm flex items-center gap-2 font-medium">
        <span className="text-lg">⚙️</span> Structured sections recommended for SOAP Note. Free-form mode is still available.
      </div>

      <div>
        <h3 className="text-lg font-bold text-foreground">Example Output</h3>
        <p className="text-sm text-muted-foreground mb-4">Optional but strongly recommended — the AI will learn your clinical writing style from this (Use only one method at a time)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            value={formData.exampleText || ""}
            onChange={(e) => updateFormData("exampleText", e.target.value)}
            disabled={!!formData.exampleFile}
            placeholder="Or paste an example note here. The AI will learn your structurer detail level, and clinical writing style."
            className={`bg-background border border-dashed border-border/50 hover:border-[#4D8EF5]/50 focus:border-[#4D8EF5] focus:border-solid rounded-xl h-48 p-4 text-sm text-foreground focus:outline-none transition resize-none ${!!formData.exampleFile ? "opacity-50 cursor-not-allowed bg-accent/30" : ""}`}
          />
          <div
            onClick={() => {
              if (!formData.exampleText) {
                step3FileRef.current?.click();
              }
            }}
            className={`bg-background border border-dashed border-border/50 rounded-xl h-48 flex flex-col items-center justify-center transition p-4 text-center ${!!formData.exampleText ? "opacity-50 cursor-not-allowed bg-accent/30" : "hover:border-[#4D8EF5]/50 cursor-pointer"}`}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={step3FileRef} 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateFormData("exampleFile", file);
                }
              }}
            />
            <div className="bg-white/10 p-2 rounded-lg mb-2">
              <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
            </div>
            {formData.exampleFile ? (
              <>
                <h4 className="font-bold text-foreground text-sm truncate w-full px-4">{formData.exampleFile.name}</h4>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    updateFormData("exampleFile", null);
                  }}
                  className="text-xs text-red-500 mt-2 font-medium hover:underline"
                >
                  Remove file
                </button>
              </>
            ) : (
              <>
                <h4 className="font-bold text-foreground text-sm">Drop a file or click to browse</h4>
                <p className="text-[10px] text-muted-foreground mt-1">PDF, DOCX, or TXT - Max 10 MB</p>
              </>
            )}
          </div>
        </div>
      </div>

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
