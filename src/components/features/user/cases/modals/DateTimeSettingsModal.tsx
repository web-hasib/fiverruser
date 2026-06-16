"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface DateTimeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: { time: string; date: Date }) => void;
}

const DateTimeSettingsModal = ({
  isOpen,
  onClose,
  onApply,
}: DateTimeSettingsModalProps) => {
  const [time, setTime] = useState("11 : 20 AM");
  const [isTimeSelectOpen, setIsTimeSelectOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 12)); // Jan 12, 2026

  const handleApply = () => {
    console.log("Selected Date/Time:", { time, date: selectedDate });
    onApply({ time, date: selectedDate });
    onClose();
  };

  // Simple calendar generator for demonstration
  const daysInMonth = 31;
  const startDay = 4; // Thursday for Jan 2026
  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Time of the case"
      maxWidth="sm:max-w-[440px]"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div />
          <Button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 rounded-lg text-xs font-semibold"
          >
            Apply
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsTimeSelectOpen(!isTimeSelectOpen)}
              className="flex items-center justify-between w-full p-4 bg-muted/30 border border-border rounded-xl text-foreground font-medium hover:bg-muted/50 transition-all text-sm"
            >
              {time}
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>

            {isTimeSelectOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                {[
                  "09 : 00 AM",
                  "10 : 00 AM",
                  "11 : 00 AM",
                  "11 : 20 AM",
                  "12 : 00 PM",
                  "01 : 00 PM",
                  "02 : 00 PM",
                ].map((t) => (
                  <div
                    key={t}
                    onClick={() => {
                      setTime(t);
                      setIsTimeSelectOpen(false);
                    }}
                    className={cn(
                      "p-3 hover:bg-muted cursor-pointer text-sm rounded-lg transition-all",
                      time === t
                        ? "bg-muted text-blue-500 font-bold"
                        : "text-foreground",
                    )}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Case Date</h4>
            <div className="p-4 bg-muted/10 border border-border rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium">Jan 2026</span>
                <div className="flex gap-2">
                  <ChevronLeft className="size-4 text-muted-foreground cursor-pointer" />
                  <ChevronRight className="size-4 text-muted-foreground cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-muted-foreground mb-4">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      day && setSelectedDate(new Date(2026, 0, day))
                    }
                    className={cn(
                      "aspect-square flex items-center justify-center rounded-lg text-xs transition-all cursor-pointer",
                      day === null
                        ? "opacity-0 pointer-events-none"
                        : "hover:bg-muted",
                      day === selectedDate.getDate()
                        ? "bg-blue-600 text-white hover:bg-blue-700 font-bold"
                        : "text-muted-foreground",
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardModal>
  );
};

export default DateTimeSettingsModal;
