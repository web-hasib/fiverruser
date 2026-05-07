"use client";

import { ArrowRight } from "lucide-react";
import React from "react";

const Activities = [
  { text: "Dr. Saifur approved cardiology v2", time: "2 min ago" },
  { text: "Dr. Saifur approved cardiology v2", time: "2 min ago" },
  { text: "Dr. Saifur approved cardiology v2", time: "2 min ago" },
  { text: "Dr. Saifur approved cardiology v2", time: "2 min ago" },
  { text: "Dr. Saifur approved cardiology v2", time: "2 min ago" },
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-full hover:border-accent transition-all duration-300 shadow-sm">
      <div className="p-5 flex justify-between items-center border-b border-border bg-muted/20">
        <h3 className="text-foreground font-semibold">Recent Activity</h3>
        <button className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-all text-[10px] md:text-xs font-bold uppercase bg-muted px-3 py-1.5 rounded-md border border-border hover:bg-accent/20">
          Full Log <ArrowRight size={12} />
        </button>
      </div>

      <div className="flex flex-col p-6 space-y-7 gap-4">
        {Activities.map((act, i) => (
          <div key={i} className="flex gap-4 items-start group cursor-pointer">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <p className="text-card-foreground text-sm font-bold group-hover:text-blue-500 transition-colors leading-tight">{act.text}</p>
              <span className="text-muted-foreground text-[10px] mt-1.5 font-bold uppercase tracking-wider">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
