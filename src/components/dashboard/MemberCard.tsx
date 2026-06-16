"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface MemberCardProps {
  member: {
    id: string;
    uniqueId: string;
    name: string;
    role: string;
    email: string;
    accessType: string;
    status: string;
  };
  onDelete?: (id: string) => void;
  statusStyles: Record<string, string>;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function MemberCard({ member, onDelete, statusStyles, isSelected, onSelect }: MemberCardProps) {
  return (
    <div className="group relative bg-card p-5 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {onSelect && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(member.id);
              }}
              className={cn(
                "size-5 rounded border transition-all flex items-center justify-center cursor-pointer",
                isSelected 
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                  : "bg-muted/40 border-border/50 hover:border-blue-400"
              )}
            >
              {isSelected && <div className="size-2 bg-white rounded-full" />}
            </div>
          )}
          <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/20">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <button 
          onClick={() => onDelete?.(member.id)}
          className="text-muted-foreground/30 hover:text-rose-500 transition-colors p-1"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="text-sm font-bold text-foreground">
          {member.name}
        </h3>
        <p className="text-[10px] text-muted-foreground font-medium">{member.email}</p>
        <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-1">{member.role}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-full text-[9px] border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold uppercase tracking-tight">
          {member.accessType}
        </span>
        <span className={cn("px-2.5 py-1 rounded-full text-[9px] border font-bold uppercase tracking-tight", statusStyles[member.status] || statusStyles["Active"])}>
          {member.status}
        </span>
      </div>

      <div className="pt-4 border-t border-border/50">
        <div className="space-y-0.5">
          <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Unique ID</p>
          <p className="text-[10px] font-medium text-foreground">{member.uniqueId}</p>
        </div>
      </div>
    </div>
  );
}
