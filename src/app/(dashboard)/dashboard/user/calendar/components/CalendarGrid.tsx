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
} from "date-fns";
import { cn } from "@/src/lib/utils";
import { Event } from "../page";


interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDayClick?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

const EventPill = ({ event, onClick }: { event: Event; onClick?: () => void }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500",
    green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500",
    red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500",
  };

  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className={cn("px-1.5 py-0.5 text-[8px] md:text-[10px] font-black mb-0.5 truncate border-l-[2px] md:border-l-[3px] transition-all hover:brightness-110 cursor-pointer", colors[event.color] || colors.blue)}
    >
      {event.title}
    </div>
  );
};

export const CalendarGrid = ({ currentDate, events, onDayClick, onEventClick }: CalendarGridProps) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const rowCount = Math.ceil(days.length / 7);

  return (
    <div className="flex-1 flex flex-col transition-colors">
      <div className="flex-1 h-full">
        <div className="min-w-[500px] md:min-w-[800px] h-full flex flex-col">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 border-b border-border/50 bg-accent/5 sticky top-0 z-10 backdrop-blur-sm">
            {weekDays.map((day, i) => (
              <div key={i} className="py-2 md:py-4 text-center text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div 
            className={cn(
              "flex-1 grid grid-cols-7 border-collapse",
              rowCount === 5 ? "grid-rows-5" : "grid-rows-6"
            )}
          >
            {days.map((day, i) => {
              const dayEvents = events.filter((e) => isSameDay(e.date, day));
              const isSelected = isSameDay(day, currentDate);
              const isTrailing = !isSameMonth(day, monthStart);
              
              return (
                <div
                  key={i}
                  onClick={() => onDayClick?.(day)}
                  className={cn(
                    "min-h-[70px] md:min-h-[120px] border-r border-b border-border/40 transition-all duration-300 hover:bg-accent/10 group relative cursor-pointer",
                    isTrailing && "opacity-20 translate-y-0 bg-accent/5",
                    i % 7 === 6 && "border-r-0"
                  )}
                >
                  <div className="flex justify-between items-start p-1 md:p-3 mb-0.5 md:mb-1">
                    <span className={cn(
                      "text-[9px] md:text-[11px] font-black rounded-sm transition-all duration-300",
                      isSelected 
                        ? "bg-blue-600 text-white w-5 h-5 md:w-8 md:h-8 flex items-center justify-center shadow-lg shadow-blue-600/40 scale-105 md:scale-110" 
                        : "text-muted-foreground group-hover:text-foreground group-hover:bg-accent/50 w-5 h-5 md:w-8 md:h-8 flex items-center justify-center"
                    )}>
                      {format(day, "dd")}
                    </span>
                    {dayEvents.length > 0 && !isSelected && (
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5  bg-blue-500 animate-pulse mt-0.5 md:mt-2 mr-0.5 md:mr-1" />
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-0.5 px-1 md:px-3">
                    {dayEvents.slice(0, 3).map((event) => (
                      <EventPill key={event.id} event={event} onClick={() => onEventClick?.(event)} />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[7.5px] md:text-[9px] text-muted-foreground font-black pl-1 mt-0.5 opacity-40 uppercase tracking-tighter">
                        + {dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
