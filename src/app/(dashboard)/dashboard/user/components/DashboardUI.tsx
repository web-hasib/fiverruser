"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
  actions?: React.ReactNode;
}

export const SectionHeader = ({ title, className, actions }: SectionHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between py-4", className)}>
      <h2 className="text-lg font-bold text-foreground">
        {title}
      </h2>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

interface StatusBadgeProps {
  variant?: string;
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge = ({ variant, children, className }: StatusBadgeProps) => {
  const getStyles = () => {
    const v = variant?.toLowerCase() || "";
    if (v === "high" || v === "overdue" || v === "urgent") {
      return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
    if (v === "medium" || v === "in progress" || v === "pending") {
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
    if (v === "low" || v === "complete" || v === "completed" || v === "done") {
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border",
      getStyles(),
      className
    )}>
      {children}
    </span>
  );
};
