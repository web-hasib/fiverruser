"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface StatusItemProps {
  label: string;
  status?: "online" | "offline" | "warning";
  value?: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status = "online", value }) => {
  const statusColor = {
    online: "bg-emerald-500",
    offline: "bg-rose-500",
    warning: "bg-amber-500",
  }[status];

  return (
    <div className="flex items-center gap-2 px-3 border-r border-border last:border-r-0">
      <div className={`w-1.5 h-1.5 rounded-full ${statusColor} shadow-[0_0_8px_rgba(16,185,129,0.3)]`} />
      <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{label}</span>
      {value && <span className="text-amber-500 text-[10px] font-mono whitespace-nowrap">{value}</span>}
    </div>
  );
};

export const SystemStatusBar: React.FC = () => {
  const systems = [
    { label: "API", status: "online" as const },
    { label: "Database", status: "online" as const },
    { label: "AI Engine", status: "online" as const },
    { label: "Email", status: "online" as const, value: "↑ 340ms" },
    { label: "Storage", status: "online" as const },
    { label: "Auth", status: "online" as const },
  ];

  return (
    <div className="bg-card border border-border overflow-x-auto rounded-lg p-2 flex items-center justify-between mb-4 shadow-sm min-w-max md:min-w-0">
      <div className="flex items-center">
        <span className="text-muted-foreground text-[10px] font-bold uppercase px-3 border-r border-border whitespace-nowrap">System</span>
        <div className="flex overflow-x-auto no-scrollbar">
          {systems.map((s) => (
            <StatusItem key={s.label} {...s} />
          ))}
        </div>
      </div>
      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all px-3 py-1.5 text-[10px] font-bold uppercase border border-border rounded-md bg-muted/50 hover:bg-muted ml-4">
        <RefreshCw size={12} />
        Refresh
      </button>
    </div>
  );
};
