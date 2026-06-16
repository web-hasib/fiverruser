"use client";

import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { cn } from "@/src/lib/utils";

interface MiniCalendarProps {
  currentDate: Date;
}

export const MiniCalendar = ({ currentDate }: MiniCalendarProps) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="text-foreground w-full">
      <h3 className="text-lg font-bold mb-4 px-1">{format(currentDate, "MMMM")}</h3>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] font-bold text-muted-foreground/50 mb-3">
        {weekDays.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1.5 text-center">
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "text-[11px] py-1.5 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-(--blue)/30 rounded-sm relative group",
              !isSameMonth(day, monthStart) && "text-muted-foreground/20 pointer-events-none",
              isSameDay(day, currentDate) && "bg-(--blue) text-white font-bold shadow-md shadow-blue-600/20 hover:bg-blue-600",
              isToday(day) && !isSameDay(day, currentDate) && "text-(--blue) font-bold"
            )}
          >
            <span>{format(day, "d")}</span>
            {/* Event indicators (subtle dots) */}
            {[4, 5, 21, 23, 28].includes(day.getDate()) && isSameMonth(day, monthStart) && !isSameDay(day, currentDate) && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-blue-500/50" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
