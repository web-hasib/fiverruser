import React, { useState, useEffect } from "react";
import { Sparkles, Copy, Download, FileText, ChevronDown, Printer, Plus, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

interface AssistanceResponseTabProps {
  label: string;
  isAlreadyGenerated?: boolean;
  onGenerationComplete?: () => void;
}

const AssistanceResponseTab = ({ label, isAlreadyGenerated = false, onGenerationComplete }: AssistanceResponseTabProps) => {
  const [isGenerating, setIsGenerating] = useState(!isAlreadyGenerated);
  
  const handleRegenerate = () => {
    setIsGenerating(true);
    // After 2.5s it will set generating to false via the useEffect
  };

  useEffect(() => {
    if (!isGenerating) return;

    // Simulate API generation delay
    const timer = setTimeout(() => {
      setIsGenerating(false);
      onGenerationComplete?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [isGenerating, onGenerationComplete]);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative mb-8">
          <div className="size-20 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-xl shadow-blue-500/10">
            <Sparkles size={40} className="animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-background border border-border shadow-lg flex items-center justify-center">
            <div className="size-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 tracking-tight">Generating {label}</h3>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed opacity-80">
          Our advanced clinical AI is analyzing your session notes to create a precise <strong>{label}</strong>. This usually takes a few seconds...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Editor Toolbar (Mock) */}
      <div className="flex items-center justify-between p-2 bg-card/50 border border-border rounded-xl shadow-sm">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-muted rounded-lg cursor-pointer transition-colors">
            <span className="text-[13px] font-bold">14</span>
            <ChevronDown size={14} className="opacity-40" />
          </div>
          <div className="h-6 w-px bg-border/60 mx-1" />
          <div className="flex items-center gap-0.5">
            {["B", "I", "U", "S"].map((btn) => (
              <button key={btn} className="size-8 flex items-center justify-center text-[13px] font-bold hover:bg-muted rounded-lg transition-colors">
                {btn}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-border/60 mx-1" />
          <button className="px-3 py-1.5 hover:bg-muted rounded-lg transition-colors">
             <FileText size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2 font-bold px-4 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/5 border-emerald-500/20" onClick={handleRegenerate}>
            <RefreshCw size={14} />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2 font-bold px-4" onClick={() => window.print()}>
            <Plus size={14} />
            Print
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2 font-bold px-4">
            <Copy size={14} />
            Copy
          </Button>
          <Button className="h-9 gap-2 font-bold px-4 bg-foreground text-background hover:opacity-90">
            <Download size={14} />
            EXPORT
          </Button>
        </div>
      </div>

      {/* High-Fidelity Content Area */}
      <div className="bg-card/30 border border-border rounded-2xl p-8 md:p-12 shadow-inner min-h-[600px] leading-relaxed text-foreground/90">
        <div className="max-w-[800px] mx-auto space-y-8">
          <h1 className="text-2xl font-bold border-b border-border pb-4">Referral to Psychiatry</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-[14px]">
            <div className="flex gap-2">
              <span className="font-bold shrink-0">Patient:</span>
              <span className="text-muted-foreground">Mr. Kocsis</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold shrink-0">Referring Clinician:</span>
              <span className="text-muted-foreground">Dr. [Referring Clinician Name], Surgical Emergency Unit</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold shrink-0">Referred to:</span>
              <span className="text-muted-foreground">On-call Psychiatry</span>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Reason for Referral:</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Request for urgent psychiatric consultation regarding capacity assessment for urgent leg amputation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">History of Present Illness:</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Mr. Kocsis presents to the surgical emergency unit with a necrotic leg infection requiring urgent amputation. 
              He reports his leg becomes discoloured every summer. He states surgery is scheduled for next Thursday, 
              though no fixed date has been confirmed. He demonstrates poor insight into the severity of his condition, 
              describing it as a "scratch". Personal hygiene is significantly neglected. Blood tests show markedly elevated 
              inflammatory markers. His last medical review was over one year ago.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Past Psychiatric History:</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Previous treatment at this hospital for alcohol-related issues, several years ago.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Substance Use History:</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              History of heavy alcohol use. Reports last drink on Thursday (approximately 3 days prior). 
              Denies withdrawal symptoms including tremor, diaphoresis, or anxiety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Medical History:</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Leg infection with necrosis requiring surgical intervention.
            </p>
          </section>

          <div className="pt-8 border-t border-border/50 text-[12px] italic text-muted-foreground/60">
            Generated by Clinical AI Assistant on {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistanceResponseTab;
