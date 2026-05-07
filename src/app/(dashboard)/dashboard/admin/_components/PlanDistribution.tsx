"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Free", value: 2800, color: "#94A3B8" },
  { name: "Pro", value: 1200, color: "#3B82F6" },
  { name: "Enterprise", value: 1200, color: "#10B981" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-3 rounded-lg shadow-xl backdrop-blur-md min-w-[120px] z-50">
        <p className="text-popover-foreground text-[10px] font-black uppercase tracking-widest border-b border-border/50 pb-1.5 mb-1.5">{`${payload[0].name}`}</p>
        <p className="text-blue-500 text-sm font-black">
          {`${payload[0].value.toLocaleString()} Users`}
        </p>
      </div>
    );
  }
  return null;
};

export const PlanDistribution: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-accent transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-foreground font-black text-lg tracking-tight">Plan Distribution</h3>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
      </div>

      <div className="flex-1 flex flex-col xl:flex-row items-center justify-between gap-10">
        {/* Chart area */}
        <div className="relative w-full max-w-[200px] aspect-square flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="72%"
                outerRadius="95%"
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl md:text-3xl font-black text-foreground leading-none tracking-tighter">2800</span>
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2">USERS</span>
          </div>
        </div>

        {/* Legend area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between w-full group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                <div className="flex flex-col">
                  <span className="text-sm font-black text-foreground uppercase tracking-wider group-hover:text-blue-500 transition-colors">{item.name}</span>
                  <div className="flex flex-col mt-1">
                    <span className="text-[11px] text-muted-foreground font-bold tracking-tight">12,00 Users .</span>
                    <span className="text-[11px] text-muted-foreground font-bold tracking-tight">$23,0K</span>
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded uppercase tracking-widest ml-4">Stable</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
