"use client";

import React from "react";
import { format } from "date-fns";
import { Button } from "@/src/components/ui/button";
import { Plus, PanelLeftOpen, PanelLeftClose, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface CalendarHeaderProps {
  currentDate: Date;
  view: string;
  setView: (view: string) => void;
  onAddTask: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const CalendarHeader = ({
  currentDate,
  view,
  setView,
  onAddTask,
  isCollapsed,
  setIsCollapsed,
  onPrev,
  onNext,
  onToday
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-card transition-colors py-2 md:py-4 gap-2 md:gap-4 md:px-0">
      <div className="flex items-center gap-1 md:gap-4 w-full md:w-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </Button>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" onClick={onPrev} className="h-6 w-6 md:h-8 md:w-8 rounded-lg hover:bg-accent group">
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 group-active:scale-90 transition-transform" />
          </Button>
          <Button variant="ghost" onClick={onToday} className="text-[8px]  uppercase tracking-widest font-black h-6  px-1.5  rounded-md hover:bg-accent transition-colors">
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="h-6 w-6 md:h-8 md:w-8 rounded-lg hover:bg-accent group">
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-active:scale-90 transition-transform" />
          </Button>
        </div>

        <h2 className="text-sm md:text-2xl font-black text-foreground transition-colors truncate">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
        <div className="hidden lg:flex items-center bg-accent/30 rounded-xl p-1 border border-border transition-colors">
          {["Monthly", "Weekly", "Day"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 md:px-5 py-1 md:py-1.5 rounded-sm text-[10px] cursor-pointer md:text-xs font-bold transition-all",
                view === v
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <Button
          onClick={onAddTask}
          variant={"primary"}
          className="h-7 md:h-9 px-2 md:px-4"
        >
          <Plus className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} /> <span className="hidden sm:inline text-[9px] md:text-xs font-bold">ADD NEW TASK</span>
        </Button>
      </div>
    </div>
  );
};
