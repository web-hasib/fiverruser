"use client";

import React from "react";
import { 
  Sparkles, 
  Send,
  Mic
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const QATab = () => {
  const suggestions = [
    "What antibiotics were mentioned?",
    "Summarise the diagnosis",
    "What ICD codes apply?",
    "List all medications",
    "Draft the impression section",
    "Vital signs?"
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[400px]">
      <div className="max-w-[600px] w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
        {/* Assistant Header */}
        <div className="size-16 md:size-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6 relative">
          <Sparkles className="size-8 md:size-10 text-amber-500" />
          <div className="absolute -top-1 -right-1 size-5 md:size-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-background">
            <Sparkles className="size-2.5 md:size-3 text-white fill-white" />
          </div>
        </div>
        
        <h3 className="text-foreground font-bold text-lg md:text-xl mb-2 md:mb-3">AI Clinical Assistant</h3>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-[450px]">
          Ask anything about this session — diagnoses, medications, treatment options, ICD codes, or let the AI draft sections of your notes.
        </p>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              className="px-3 md:px-4 py-1.5 md:py-2 bg-muted border border-border text-muted-foreground rounded-full text-[10px] md:text-xs hover:bg-accent hover:text-foreground transition-all whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="w-full relative group">
          <input 
            type="text" 
            placeholder="Ask anything about this session..." 
            className="w-full bg-card border border-border rounded-2xl py-3 md:py-4 px-4 md:px-6 pr-20 md:pr-24 text-foreground text-sm outline-none focus:border-blue-500/50 transition-all shadow-lg"
          />
          <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
            <button className="p-1.5 md:p-2 text-muted-foreground hover:text-blue-500 transition-colors">
              <Mic className="size-4 md:size-[18px]" />
            </button>
            <button className="size-8 md:size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
              <Send className="size-4 md:size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QATab;
