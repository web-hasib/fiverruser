"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { AlertCircle, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendValue?: string;
  icon: React.ElementType;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  className,
  variant = "blue",
}: StatsCardProps & { variant?: "blue" | "purple" | "green" | "orange" | "red" }) => {
  const themes = {
    blue: {
      glow: "bg-[linear-gradient(to_bottom_right,#102FEC,#05B1D5)]",
      iconBg: "bg-[#102FEC]/20",
      iconText: "text-primary-foreground",
    },
    purple: {
      glow: "bg-[linear-gradient(to_bottom_right,#D50589,#F7306E)]",
      iconBg: "bg-[#D50589]/20",
      iconText: "text-primary-foreground",
    },
    green: {
      glow: "bg-[linear-gradient(to_bottom_right,#05D59A,#10EC8D)]",
      iconBg: "bg-[#05D59A]/20",
      iconText: "text-primary-foreground",
    },
    orange: {
      glow: "bg-[linear-gradient(to_bottom_right,#D5AB05,#FF8100)]",
      iconBg: "bg-[#D5AB05]/20",
      iconText: "text-primary-foreground",
    },
    red: {
      glow: "bg-[linear-gradient(to_bottom_right,#D50505,#FF0000)]",
      iconBg: "bg-[#D50505]/20",
      iconText: "text-primary-foreground",
    },
  };

  const theme = themes[variant];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[18px] bg-primary p-8 transition-all hover:shadow-lg dark:shadow-none",
        className,
      )}
    >
      {/* Corner Vibrant Gradient Glow */}
      <div
        className={cn(
          "absolute -right-27 -top-27 h-50 w-50 md:h-60 md:w-60 lg:h-80 lg:w-90 rounded-full blur-[90px] opacity-60  group-hover:opacity-90 transition-all duration-1000",
          theme.glow,
        )}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-[20px] font-bold text-primary-foreground ">{title}</h4>
           
          </div>
          <div className={cn("rounded-xl p-4 transition-all shadow-sm", theme.iconText)}>
            <Icon size={32} strokeWidth={2.5} />
          </div>
        </div>

        <div className="">
          <h3 className="text-[48px] lg:text-[58px] font-black tracking-tight text-primary-foreground/70 leading-[1.1]">
            {value}
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            <p className="text-[17px] font-medium text-primary-foreground/50 tracking-tight">
              {trendValue} {trend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};





