"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import { SectionHeader } from "./DashboardUI";
import Image from "next/image";
import { CreateAssistantModal } from "../my-assistants/_components/CreateAssistantModal";

export const AssistantsSection = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="bg-card rounded-2xl p-4">
      <SectionHeader 
        title="Assistants" 
        actions={
          <Button 
            variant="primary" 
            size="sm" 
            className="h-8 text-[10px] px-3"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={14} /> CREATE
          </Button>
        }
      />
      <div className="flex-1 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-accent/5 border border-border/50 hover:border-primary/20 transition-all group relative overflow-hidden">
             <div className="absolute top-3 right-3 text-purple-600 dark:text-purple-400 opacity-30 group-hover:opacity-100 transition-opacity">
               <ExternalLink size={14} />
             </div>
             <div className="flex gap-3 items-start mb-3">
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-border shadow-sm shrink-0 overflow-hidden">
                 <Image unoptimized width={100} height={100} src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
               </div>
               <div>
                 <h3 className="text-xs font-bold text-foreground mb-1 group-hover:text-primary-foreground/50 transition-colors leading-tight">Cardiology Discharge Template</h3>
                 <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">Comprehensive discharge summary template for cardiac patients post-procedure.</p>
               </div>
             </div>
             <div className="flex items-center justify-between mt-4">
               <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">Cardiology</span>
               <Button variant="primary" size="sm" className="h-7 text-[10px] px-3 font-bold">View</Button>
             </div>
          </div>
        ))}
      </div>
      
      <CreateAssistantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
