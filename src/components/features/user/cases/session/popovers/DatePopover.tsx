"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface DatePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (date: Date) => void;
}

const DatePopover = ({ isOpen, onClose, onApply }: DatePopoverProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 25)); // April 25, 2026
  const [currentMonth, setCurrentMonth] = useState(3); // April
  const [currentYear, setCurrentYear] = useState(2026);

  if (!isOpen) return null;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="w-[300px] bg-card border border-border rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-foreground">Date of Session</h4>
          <button 
            onClick={() => { onApply(selectedDate); onClose(); }}
            className="text-[10px] font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600"
          >
            Apply
          </button>
        </div>

        <div className="p-3 bg-muted/20 border border-border/50 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold">{monthNames[currentMonth]} {currentYear}</span>
            <div className="flex gap-1">
              <ChevronLeft 
                size={14} 
                className="text-muted-foreground cursor-pointer hover:text-foreground" 
                onClick={prevMonth}
              />
              <ChevronRight 
                size={14} 
                className="text-muted-foreground cursor-pointer hover:text-foreground" 
                onClick={nextMonth}
              />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground/60 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <div
                key={i}
                onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg text-[11px] transition-all cursor-pointer",
                  day === null
                    ? "opacity-0 pointer-events-none"
                    : "hover:bg-muted text-foreground",
                  day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()
                    ? "bg-blue-600 text-white font-bold hover:bg-blue-800 shadow-md shadow-blue-600/20"
                    : ""
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default DatePopover;
