import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Step1AIProps {
  onNext: () => void;
  onCancel: () => void;
}

export function Step1AI({ onNext, onCancel }: Step1AIProps) {
  const [prompt, setPrompt] = useState("");
  
  // As per screenshot, we have some preset tags
  const tags = ["ED SOAP Note", "Psychiatry Assessment", "ICU Daily Round", "GP Referral Letter"];

  const handleTagClick = (tag: string) => {
    // We can either replace or append. Let's append to the prompt.
    setPrompt(prev => prev ? `${prev} ${tag}` : tag);
  };

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      <div className="flex-1 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-foreground mb-2">
          Describe your Medical Assistant in plain English.
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Tell AI what kind of assistant you need — it will automatically fill in the entire setup and take you straight to Step 2 for review.
        </p>
        
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. need emergency department assistant for acute presentations. SOAP notes concise bullet format for patient-rs. Include triage level, vitals, clinical..."
          className="w-full bg-background border border-border/50 rounded-xl p-5 text-sm text-foreground focus:outline-none focus:border-[#4D8EF5] transition resize-y min-h-[300px] mb-4"
        />

        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <button 
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="bg-[#4D8EF5]/10 border border-[#4D8EF5]/30 hover:bg-[#4D8EF5]/20 text-[#4D8EF5] font-medium text-xs px-4 py-2 rounded-full transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Action Buttons */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="bg-transparent border border-border/50 hover:bg-accent text-foreground px-8 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Cancel
        </button>
        <button
          onClick={onNext}
          disabled={!prompt.trim()}
          className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 
            ${prompt.trim() 
              ? "bg-[#4D8EF5] hover:bg-blue-600 text-white shadow-lg shadow-[#4D8EF5]/20" 
              : "bg-muted/50 text-muted-foreground cursor-not-allowed"}`}
        >
          CONTINUE <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
