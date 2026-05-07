"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  trend: string;
  trendType: "up" | "down";
  trendLabel: string;
  topColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendType,
  trendLabel,
  topColor,
}) => {
  return (
    <div className={`relative bg-card rounded-lg border border-border p-5 overflow-hidden transition-all hover:border-accent hover:translate-y-[-2px] group cursor-pointer shadow-sm hover:shadow-md duration-300`}>
      {/* Top Accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${topColor} opacity-70 group-hover:opacity-100 transition-opacity`} />

      <div className="space-y-4">
        <label className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest block transition-colors group-hover:text-foreground/70">{label}</label>
        <div className="text-2xl md:text-3xl font-bold text-card-foreground tracking-tight group-hover:scale-[1.02] transition-transform origin-left">{value}</div>

        <div className="flex items-center gap-2 pt-1 border-t border-border/50">
          <div className={`flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-sm ${trendType === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
            }`}>
            {trendType === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
          <span className="text-muted-foreground text-[11px] font-medium uppercase tracking-tight">{trendLabel}</span>
        </div>
      </div>
    </div>
  );
};
