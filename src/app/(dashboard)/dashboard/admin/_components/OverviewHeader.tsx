"use client";

import React, { useEffect, useState } from "react";

interface OverviewHeaderProps {
  userName: string;
}

export const OverviewHeader: React.FC<OverviewHeaderProps> = ({ userName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, {userName} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here&apos;s your MedAI Pro overview for today.</p>
      </div>
      <div className="text-left sm:text-right">
        <div className="text-xl md:text-2xl font-bold text-foreground">{formatTime(time)}</div>
        <div className="text-muted-foreground text-xs md:text-sm font-medium">{formatDate(time)}</div>
      </div>
    </div>
  );
};
