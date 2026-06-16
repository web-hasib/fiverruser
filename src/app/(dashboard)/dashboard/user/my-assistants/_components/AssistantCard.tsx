"use client";

import React from "react";
import { Pin, Star, Trash2, Calendar, Shield, Activity, User, FileText } from "lucide-react";
import { Assistant } from "@/src/constant/assistant";

interface AssistantCardProps {
  assistant: Assistant;
}

export const AssistantCard = ({ assistant }: AssistantCardProps) => {
  const getVisibilityColor = (vis: string) => {
    switch (vis) {
      case "Private":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Shared with Team":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Public":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground border-border/50";
    }
  };

  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50 hover:border-blue-500/50 transition-all group flex flex-col gap-4 relative shadow-sm hover:shadow-md">
      {/* Header: Checkbox, Name, and Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <input 
            type="checkbox" 
            className="mt-1 w-4 h-4 rounded border-border/50 bg-transparent text-blue-600 focus:ring-0 cursor-pointer" 
          />
          <div>
            <h3 className="font-bold text-foreground text-sm leading-tight group-hover:text-blue-500 transition-colors">
              {assistant.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
               <Calendar className="w-3 h-3" />
               <span className="text-[11px] font-medium">{assistant.createdDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
          <button className="hover:text-foreground transition"><Pin className="w-4 h-4" /></button>
          <button className="hover:text-foreground transition"><Star className="w-4 h-4" /></button>
          <button className="hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Specialty Badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent rounded-xl border border-border/50">
          <span className="text-base">{assistant.medicalSpecialty.icon}</span>
          <span className="text-xs font-semibold text-foreground truncate">
            {assistant.medicalSpecialty.name}
          </span>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-2 gap-3 py-2 border-y border-border/50 my-1">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-2.5 h-2.5" /> Type
          </span>
          <span className="text-xs font-medium text-foreground">{assistant.type}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
            <User className="w-2.5 h-2.5" /> Role
          </span>
          <span className="text-xs font-medium text-foreground truncate">{assistant.clinicalRole}</span>
        </div>
      </div>

      {/* Document Type and Visibility */}
      <div className="flex items-center justify-between mt-auto gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
            <FileText className="w-2.5 h-2.5" /> Document
          </span>
          <span className="text-xs font-medium text-foreground truncate">{assistant.documentumType}</span>
        </div>
        
        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getVisibilityColor(assistant.visibility)}`}>
           {assistant.visibility}
        </div>
      </div>
    </div>
  );
};
