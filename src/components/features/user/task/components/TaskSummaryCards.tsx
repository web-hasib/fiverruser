"use client";

import React from "react";
import { FileText, Clock, Users } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SummaryItem {
  label: string;
  value: number;
  sublabel: string;
  icon: React.ReactNode;
  borderColor: string;
}

const TaskSummaryCards = ({
  counts,
  onCardClick,
  activeFilter,
}: {
  counts: {
    all: number;
    overdue: number;
    todo: number;
    progress: number;
    completed: number;
  };
  onCardClick?: (status: string) => void;
  activeFilter?: string;
}) => {
  const items: SummaryItem[] = [
    {
      label: "All Tasks",
      value: counts.all,
      sublabel: "Across All Patients",
      icon: <FileText size={20} />,
      borderColor: "border-l-[6px] border-l-blue-600",
    },
    {
      label: "Overdue",
      value: counts.overdue,
      sublabel: "Requires Attention",
      icon: <Clock size={20} />,
      borderColor: "border-l-[6px] border-l-rose-500",
    },
    {
      label: "To Do",
      value: counts.todo,
      sublabel: "Not Yet Started",
      icon: <FileText size={20} />,
      borderColor: "border-l-[6px] border-l-blue-500",
    },
    {
      label: "In Progress",
      value: counts.progress,
      sublabel: "Active Work",
      icon: <FileText size={20} />,
      borderColor: "border-l-[6px] border-l-amber-500",
    },
    {
      label: "Complete",
      value: counts.completed,
      sublabel: "This Month",
      icon: <Users size={20} />,
      borderColor: "border-l-[6px] border-l-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => onCardClick?.(item.label === "All Tasks" ? "All Status" : item.label)}
          className={cn(
            "relative flex items-center justify-between p-4 rounded-2xl bg-primary transition-all text-left cursor-pointer",
            "border border-primary-foreground/20 hover:border-blue-500/50 hover:bg-primary-foreground/5",
            item.borderColor,
            (activeFilter === item.label || (activeFilter === "All Status" && item.label === "All Tasks")) && "ring-2 ring-blue-500 border-transparent shadow-lg shadow-blue-500/10 bg-primary-foreground/5"
          )}
        >
          <div className="pl-2">
            <p className="text-primary-foreground/50 text-[11px] font-bold uppercase tracking-wider mb-1">
              {item.label}
            </p>
            <h3 className="text-2xl font-bold text-primary-foreground">
              {item.value}
            </h3>
            <p className="text-primary-foreground/40 text-[10px] mt-1 font-medium italic">
              {item.sublabel}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/40 shrink-0">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummaryCards;
