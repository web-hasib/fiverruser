"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { Info } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendValue: string;
  icon: React.ElementType;
  chartData?: { value: number }[];
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  chartData,
  className,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-xl shadow-primary-foreground/5 transition-all hover:bg-primary-foreground/2",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-sm font-medium">{title}</span>
          <Info size={14} className="cursor-help" />
        </div>
        <div className="rounded-xl bg-[#ffffff10] p-2 text-gray-400">
          <Icon size={20} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-4xl font-bold tracking-tight mb-2">{value}</h3>
          <p className="text-xs text-gray-500">
            {trend} <span className="text-primary-foreground font-medium">{trendValue}</span>{" "}
            in 7 days!
          </p>
        </div>

        {chartData && (
          <div className="h-16 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
