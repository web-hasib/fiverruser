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
  onClick?: () => void;
}

export const PatientStatsCard = ({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  className,
  variant = "blue",
  onClick,
}: StatsCardProps & { variant?: "blue" | "purple" | "green" | "orange" }) => {
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
  };

  const theme = themes[variant];

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[18px] bg-primary p-5 transition-all dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        onClick && "cursor-pointer active:scale-[0.98] active:brightness-95",
        className,
      )}
    >
      {/* Corner Vibrant Gradient Glow */}
      <div
        className={cn(
          "absolute -right-27 -top-27 h-50 w-50 md:h-60 md:w-60 lg:h-50 lg:w-70 rounded-full blur-[90px] opacity-60  group-hover:opacity-90 transition-all duration-1000",
          theme.glow,
        )}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <h4 className="text-base font-bold text-primary-foreground">{title}</h4>
            <AlertCircle size={14} className="text-orange-500 cursor-help" />
          </div>
          <div className={cn("rounded-xl p-2 transition-all shadow-sm", theme.iconText)}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
        </div>

        <div className="">
          <h3 className="text-[32px] lg:text-[40px] font-black tracking-tight text-primary-foreground/70 leading-tight">
            {value}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-600" />
            <p className="text-sm font-medium text-primary-foreground/50 tracking-tight">
              {trendValue} {trend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};





