"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Plus, Star, FileText, ChevronRight, Brain, Notebook, BookText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AddKnowledgeModal } from "@/src/components/features/user/knowledge-base/AddKnowledgeModal";

const tagColors: Record<string, string> = {
  Protocol: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Cardiology: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Surgery: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Team: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export const KnowledgeBaseSection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  return (
    <div className="bg-card rounded-2xl p-6 flex flex-col shadow-none border-none">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground shrink-0">
          Knowledge Base
        </h2>
        
        {/* Responsive Tabs */}
        <div className="flex flex-nowrap items-center gap-1.5 p-1.5 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm w-full sm:w-auto order-3 sm:order-none">
          {["All", "Newly", "Pinned", "Shared"].map((tab) => (
            <Button
              key={tab}
              variant={tab === activeTab ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-8 sm:h-9 rounded-xl text-[10px] sm:text-[11px] px-3 sm:px-4 lg:px-6 font-bold transition-all uppercase tracking-wider whitespace-nowrap flex-1 sm:flex-initial",
                tab === activeTab ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 order-2 sm:order-none ml-auto sm:ml-0">
          <Button 
            variant="primary" 
            size="sm" 
            className="h-8 sm:h-10 rounded-xl text-[10px] sm:text-[11px] font-bold px-3 sm:px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} className="sm:mr-1.5" /> <span className="hidden sm:inline">NEW ENTRY</span><span className="inline sm:hidden">NEW</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 sm:h-10 rounded-xl text-[10px] sm:text-[11px] font-bold px-2 sm:px-4 border-border/60 hover:bg-muted/50 group">
            <span className="hidden sm:inline">All</span> <ChevronRight size={14} className="sm:ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-muted/20 border border-border/40 hover:border-blue-500/30 transition-all flex flex-col group relative shadow-xs">
              <div className="absolute top-6 right-6 flex items-center gap-3">
                <Star size={20} className={cn("cursor-pointer transition-all", i === 1 ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 hover:text-amber-400")} />
                {(i === 1 || i === 4) && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-lg border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
                    <Brain size={14} className="shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">AI</span>
                  </div>
                )}
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20 shadow-inner">
                <Notebook size={24} />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1 leading-snug group-hover:text-blue-500 transition-colors">
                Post-Cardiac Surgery Anticoagulation Pro...
              </h3>
              <span className="text-[10px] text-muted-foreground/60 font-semibold mb-4">Mar 8, 2026 | 47 views</span>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["Protocol", "Cardiology", "Surgery", "Team"].map(tag => (
                  <span 
                    key={tag} 
                    className={cn(
                      "text-[9px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wide",
                      tagColors[tag] || "bg-muted text-muted-foreground border-border/50"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[13px] text-muted-foreground/80 line-clamp-2 leading-relaxed font-medium mb-2">
                Hospital policy on obtaining and documenting informed consent prior to all invasive procedure...
              </p>
          </div>
        ))}
      </div>
          <AddKnowledgeModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={(data) => {
              console.log("Saving new knowledge base entry:", data);
              setIsAddModalOpen(false);
            }}
          />
    </div>
  );
};
