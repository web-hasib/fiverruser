"use client";

import React from "react";
import { AlertCircle, Users, CheckCircle, Database, Calendar, Settings } from "lucide-react";

interface AlertBadgeProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ icon, label, color, borderColor, bgColor }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${borderColor} ${bgColor} ${color} transition-all hover:brightness-110 cursor-pointer shadow-sm`}>
    <div className="flex-shrink-0">{icon}</div>
    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight whitespace-nowrap">{label}</span>
  </div>
);

export const AlertsBar: React.FC = () => {
  const alerts = [
    {
      icon: <Users size={14} />,
      label: "12 new users pending",
      color: "text-rose-500 dark:text-rose-400",
      borderColor: "border-rose-200 dark:border-rose-900/30",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
    },
    {
      icon: <CheckCircle size={14} />,
      label: "5 approvals waiting",
      color: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-900/30",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: <Database size={14} />,
      label: "Storage at 78%",
      color: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-900/30",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: <Calendar size={14} />,
      label: "3 subscriptions expiring soon",
      color: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-900/30",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: <Settings size={14} />,
      label: "AI model updated v2.4.1",
      color: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-900/30",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 mb-6">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 mr-2 flex-shrink-0 shadow-sm">
        <AlertCircle size={14} />
        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-none">Alerts</span>
      </div>
      <div className="flex items-center gap-3">
        {alerts.map((alert, idx) => (
          <AlertBadge key={idx} {...alert} />
        ))}
      </div>
    </div>
  );
};
