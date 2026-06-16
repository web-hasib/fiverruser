"use client";

import React from "react";
import { format, isSameDay } from "date-fns";
import { cn } from "@/src/lib/utils";
import { Event } from "../page";


interface DayGridProps {
  currentDate: Date;
  events: Event[];
  onDayClick?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

export const DayGrid = ({ currentDate, events, onDayClick, onEventClick }: DayGridProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = events.filter(e => isSameDay(e.date, currentDate));

  return (
    <div className="flex flex-col h-full bg-background border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b bg-muted/20 flex flex-col items-center">
        <div className="text-xs uppercase font-bold text-muted-foreground mb-1">{format(currentDate, "eeee")}</div>
        <div className="text-2xl font-black text-foreground">{format(currentDate, "d MMMM, yyyy")}</div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col">
          {hours.map((hour) => {
            const hourEvents = dayEvents.filter(e => e.date.getHours() === hour);
            return (
              <div 
                key={hour} 
                className="flex border-b last:border-b-0 min-h-[100px] cursor-pointer hover:bg-muted/5 transition-colors"
                onClick={() => {
                  const d = new Date(currentDate);
                  d.setHours(hour);
                  onDayClick?.(d);
                }}
              >
                <div className="w-24 border-r p-4 text-xs font-bold text-muted-foreground/60 flex items-start justify-center">
                  {format(new Date().setHours(hour, 0), "HH:mm")}
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                  {hourEvents.length > 0 ? hourEvents.map(event => (
                    <div 
                      key={event.id} 
                      onClick={(e) => { e.stopPropagation(); onEventClick?.(event); }}
                      className={cn(
                      "p-3 border-l-[4px] shadow-sm flex flex-col gap-1 transition-all hover:scale-[1.01] cursor-pointer",
                      event.color === "blue" && "bg-blue-500/5 border-blue-500 text-blue-700",
                      event.color === "purple" && "bg-purple-500/5 border-purple-500 text-purple-700",
                      event.color === "green" && "bg-green-500/5 border-green-500 text-green-700",
                      event.color === "red" && "bg-red-500/5 border-red-500 text-red-700",
                    )}>
                      <span className="text-sm font-bold">{event.title}</span>
                      <span className="text-[10px] opacity-70 font-semibold">{format(event.date, "HH:mm")} - {format(new Date(event.date.getTime() + 3600000), "HH:mm")}</span>
                    </div>
                  )) : (
                    <div className="h-full flex items-center text-muted-foreground/20 text-xs font-bold italic">No events scheduled</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
