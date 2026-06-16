"use client";

import React from "react";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Line,
  ComposedChart,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, cost: 2400 },
  { name: "Feb", revenue: 3000, cost: 1398 },
  { name: "Mar", revenue: 2000, cost: 9800 },
  { name: "Apr", revenue: 2780, cost: 3908 },
  { name: "May", revenue: 1890, cost: 4800 },
  { name: "Jun", revenue: 2390, cost: 3800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-4 rounded-lg shadow-2xl backdrop-blur-md space-y-2.5 min-w-[160px] z-2000">
        <p className="text-popover-foreground text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b border-border/50">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color || entry.stroke }} />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{entry.name}:</span>
            </div>
            <span className="text-xs font-black text-foreground">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueVsCostChart: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-accent transition-all duration-300 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-foreground font-semibold">Revenue vs AI Cost - Last 30 Days</h3>
        <div className="flex bg-muted rounded-md p-1 border border-border">
          <button className="px-3 py-1 text-[11px] text-foreground font-medium bg-background rounded-sm transition-all shadow-sm">Revenue</button>
          <button className="px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-all">Users</button>
          <button className="px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-all">Cases</button>
        </div>
      </div>

      <div className="flex gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
          <span className="text-xs text-blue-500 font-medium">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
          <span className="text-xs text-amber-500 font-medium">AI Cost</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="currentColor" className="text-border" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              className="text-muted-foreground"
              dy={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={40} />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: '#F59E0B', r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
