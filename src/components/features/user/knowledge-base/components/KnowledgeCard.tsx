"use client";

import React from "react";
import { Pin, Star, Share2, MoreVertical, FileText, Calendar, Eye, Brain } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { KnowledgeEntry } from "../types";

interface KnowledgeCardProps {
  entry: KnowledgeEntry;
  isSelected: boolean;
  onClick: () => void;
  onPin?: () => void;
  onFavorite?: () => void;
}

const KnowledgeCard = ({ entry, isSelected, onClick, onPin, onFavorite }: KnowledgeCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group p-4 rounded-xl border transition-all cursor-pointer relative",
        isSelected
          ? "bg-blue-600/5 border-blue-500/50 shadow-lg shadow-blue-600/5"
          : "bg-card border-border hover:border-muted-foreground/30 hover:bg-muted/10 shadow-sm"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <FileText size={18} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-blue-400 transition-colors">
              {entry.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium mt-0.5">
              <span className="flex items-center gap-1"><Calendar size={10} /> {entry.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Eye size={10} /> {entry.views} views</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); onPin?.(); }}
              className={cn("p-1.5 rounded hover:bg-muted transition-colors", entry.isPinned ? "text-blue-500 opacity-100" : "text-muted-foreground")}
            >
              <Pin size={14} className={entry.isPinned ? "fill-current" : ""} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onFavorite?.(); }}
              className={cn("p-1.5 rounded hover:bg-muted transition-colors", entry.isFavorite ? "text-amber-500 opacity-100" : "text-muted-foreground")}
            >
              <Star size={14} className={entry.isFavorite ? "fill-current" : ""} />
            </button>
            {entry.isAiContext && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-bold border border-emerald-500/20">
                    <Brain size={10} fill="currentColor" /> AI
                </div>
            )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[9px] font-bold">
          {entry.type}
        </span>
        <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded text-[9px] font-bold">
          {entry.specialty}
        </span>
        {entry.tags.slice(0, 2).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-[9px] font-bold">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {entry.summary}
      </p>
    </div>
  );
};

export default KnowledgeCard;
