"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { SharedAssistant } from "@/src/types/assistant";

interface SharedAssistantCardProps {
  assistant: SharedAssistant;
  onReview: (id: string) => void;
}

export const SharedAssistantCard = ({
  assistant,
  onReview,
}: SharedAssistantCardProps) => {
  const formattedUses =
    assistant.uses >= 1000
      ? `${(assistant.uses / 1000).toFixed(0)}K`
      : assistant.uses.toString();

  return (
    <div className="flex flex-col bg-card border border-border/60 rounded-2xl p-5 gap-3 hover:border-border hover:shadow-md transition-all duration-200 group">
      {/* Header: Avatar + Title */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl leading-none select-none">
          {assistant.authorAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
            {assistant.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
        {assistant.description}
      </p>

      {/* Footer: Specialty Badge + Meta + Review Button */}
      <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-2 border-t border-border/40">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Specialty Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white text-blue-500 border shrink-0">
            {assistant.specialty}
          </span>
          <span className="text-muted-foreground text-[11px] hidden sm:inline">
            {assistant.language}
          </span>
          <span className="text-muted-foreground text-[11px] hidden sm:inline">
            Version: {assistant.version}
          </span>
          <span className="text-muted-foreground text-[11px] hidden sm:inline">
            {formattedUses} Uses
          </span>
        </div>

        <Button
          size="sm"
          className="h-7 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shrink-0 shadow-sm shadow-blue-600/20"
          onClick={() => onReview(assistant.id)}
        >
          Review
        </Button>
      </div>
    </div>
  );
};
