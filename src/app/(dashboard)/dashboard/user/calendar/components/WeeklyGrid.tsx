"use client";

import React from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { cn } from "@/src/lib/utils";
import { Event } from "../page";


interface WeeklyGridProps {
  currentDate: Date;
  events: Event[];
  onDayClick?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

export const WeeklyGrid = ({ currentDate, events, onDayClick, onEventClick }: WeeklyGridProps) => {
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex flex-col h-full bg-background border rounded-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b bg-muted/20">
        <div className="p-4 border-r text-[10px] font-bold text-muted-foreground uppercase flex items-end justify-center">Time</div>
        {days.map((day) => (
          <div key={day.toString()} className="p-3 text-center border-r last:border-r-0 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => onDayClick?.(day)}>
            <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{format(day, "eee")}</div>
            <div className={cn(
              "text-sm font-bold w-8 h-8 flex items-center justify-center mx-auto rounded-lg",
              isSameDay(day, new Date()) ? "bg-blue-600 text-white" : "text-foreground"
            )}>
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-[80px_repeat(7,1fr)]">
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="h-20 border-r border-b text-[10px] font-bold text-muted-foreground/60 flex items-start justify-center pt-2">
                {format(new Date().setHours(hour, 0), "HH:mm")}
              </div>
              {days.map((day) => {
                const dayEvents = events.filter(e => isSameDay(e.date, day) && e.date.getHours() === hour);
                return (
                  <div 
                    key={day.toString() + hour} 
                    className="h-20 border-r border-b last:border-r-0 relative p-1 cursor-pointer hover:bg-muted/5 transition-colors"
                    onClick={() => {
                      const d = new Date(day);
                      d.setHours(hour);
                      onDayClick?.(d);
                    }}
                  >
                    {dayEvents.map(event => (
                      <div 
                        key={event.id} 
                        onClick={(e) => { e.stopPropagation(); onEventClick?.(event); }}
                        className={cn(
                        "text-[9px] font-bold p-1 border-l-2 truncate shadow-sm mb-1 cursor-pointer hover:brightness-95 transition-all",
                        event.color === "blue" && "bg-blue-500/10 text-blue-600 border-blue-500",
                        event.color === "purple" && "bg-purple-500/10 text-purple-600 border-purple-500",
                        event.color === "green" && "bg-green-500/10 text-green-600 border-green-500",
                        event.color === "red" && "bg-red-500/10 text-red-600 border-red-500",
                      )}>
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
