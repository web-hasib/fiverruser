"use client";

import React, { useState } from "react";
import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { Save, RefreshCw, FileText, Sparkles } from "lucide-react";

export default function CustomPromptPage() {
  // Demo initial instruction specifically for SOAP Notes
  const initialSoapPrompt =
    "You are a medical AI assistant specializing in clinical documentation. Generate a structured SOAP (Subjective, Objective, Assessment, Plan) note based on the provided clinical transcript. Maintain clinical accuracy, avoid jargon unless appropriate, and organize findings logically into the four standard SOAP sections.";

  const [savedInstruction, setSavedInstruction] = useState(initialSoapPrompt);
  const [instruction, setInstruction] = useState(initialSoapPrompt);
  const [isSaving, setIsSaving] = useState(false);

  const isModified = instruction !== savedInstruction;

  const handleSave = () => {
    if (!isModified) return;
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSavedInstruction(instruction);
      toast.success("SOAP note custom prompt saved successfully!");
    }, 800);
  };

  const handleReset = () => {
    setInstruction(initialSoapPrompt);
    toast.info("SOAP note prompt reset to default demo.");
  };

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <Heading
            title="SOAP Note Customization"
            subtitle="Configure the system-wide AI assistant instructions for generating SOAP notes."
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className="size-3.5" />
              Reset Default
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <FileText className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-500">SOAP Note System Instruction</h3>
              <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                This prompt defines how the AI processes clinical transcripts to generate SOAP notes. 
                You can customize the instructions to enforce specific formatting, terminology, or structure.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="prompt-instruction"
              className="text-xs font-semibold text-foreground/70 tracking-wide uppercase flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-blue-500" />
              SOAP Note Custom Prompt
            </label>
            <textarea
              id="prompt-instruction"
              rows={12}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter custom SOAP note prompt instruction here..."
              className="w-full px-4 py-3 rounded-lg border text-sm text-foreground bg-muted/30 border-border focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all placeholder:text-muted-foreground/30 resize-y min-h-[220px] leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground/50 italic flex items-center justify-between">
              <span>Use clear instructions for structuring the Subjective, Objective, Assessment, and Plan fields.</span>
              {isModified && <span className="text-blue-500 font-medium not-italic">Modified (unsaved changes)</span>}
            </p>
          </div>

          <div className="flex items-center justify-end border-t border-border/40 pt-4">
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!isModified || isSaving}
              className="uppercase tracking-widest text-xs h-11 px-6 flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-3.5" />
                  Save Instruction
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
