"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "completed" | "pending" | "urgent" | "default";
  className?: string;
}

export const StatusBadge = ({
  children,
  variant = "default",
  className,
}: BadgeProps) => {
  const variants = {
    completed: "bg-emerald-500/10 text-emerald-500",
    pending: "bg-amber-500/10 text-amber-500",
    urgent: "bg-rose-500/10 text-rose-500",
    default: "bg-gray-500/10 text-gray-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
