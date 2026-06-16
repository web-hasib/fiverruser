"use client";

import React from "react";
import { format } from "date-fns";
import { MiniCalendar } from "./MiniCalendar";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Task {
  id: string;
  title: string;
  time: string;
  day: string;
  color: string;
}

const FilterItem = ({ label, time, color, checked, onChange }: { 
  label: string; 
  time?: string; 
  color: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-accent/5 p-1.5 rounded-xl transition-all duration-300" onClick={() => onChange(!checked)}>
    <div className="flex items-center gap-3">
      <div className={cn(
        "size-4 rounded-md border-2 transition-all duration-300 flex items-center justify-center",
        checked 
          ? {
              "bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/20": color === "blue",
              "bg-green-600 border-green-600 shadow-lg shadow-green-600/20": color === "green",
              "bg-rose-600 border-rose-600 shadow-lg shadow-rose-600/20": color === "red",
              "bg-orange-600 border-orange-600 shadow-lg shadow-orange-600/20": color === "orange",
              "bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/20": color === "purple",
            }
          : "border-muted-foreground/30 bg-transparent"
      )}>
        {checked && <Check className="size-2.5 text-white stroke-[4px]" />}
      </div>
      <div className={cn("size-2 rounded-full", {
        "bg-blue-500": color === "blue",
        "bg-green-500": color === "green",
        "bg-red-500": color === "red",
        "bg-orange-500": color === "orange",
        "bg-purple-500": color === "purple",
      })} />
      <span className={cn(
        "text-[11px] font-bold transition-colors uppercase tracking-tight",
        checked ? "text-foreground" : "text-muted-foreground/50"
      )}>
        {label}
      </span>
    </div>
    {time && <span className="text-[8px] text-muted-foreground font-black opacity-30 group-hover:opacity-100 uppercase">{time}</span>}
  </div>
);

interface CalendarSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  selectedFilters: string[];
  onToggleFilter: (color: string) => void;
}

export const CalendarSidebar = ({ isCollapsed, setIsCollapsed, selectedFilters, onToggleFilter }: CalendarSidebarProps) => {
  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isCollapsed ? 0 : 300, 
        opacity: isCollapsed ? 0 : 1,
        x: isCollapsed ? -300 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "z-50 border-r border-border flex-col h-full overflow-y-auto no-scrollbar bg-card md:rounded-xl select-none",
        "fixed inset-y-0 left-0 xl:relative xl:flex xl:translate-x-0 transition-opacity",
        isCollapsed ? "pointer-events-none opacity-0" : "flex opacity-100 shadow-2xl xl:shadow-none "
      )}
    >
      <div className="flex flex-col gap-8 p-3 md:p-6 min-w-[270px]">
        {/* Small Calendar */}
        <div className="mb-2">
            <MiniCalendar currentDate={new Date()} />
        </div>
        
        {/* Today Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic flex justify-between px-1">
            Today <span>{format(new Date(), "eeee")}</span>
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { id: "t1", title: "Daily Standup", time: "08:00", color: "blue" },
              { id: "t2", title: "Budget Review", time: "09:00", color: "purple" },
              { id: "t3", title: "Sasha Jay 121", time: "10:00", color: "green" },
              { id: "t4", title: "Web Team Progress", time: "11:00", color: "orange" },
            ].map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "group p-3 rounded-xl border-l-[3px] bg-accent/20 hover:bg-accent/40 flex flex-col gap-0.5 transition-all duration-300 cursor-pointer border-border/40",
                  task.color === "blue" && "border-blue-500 hover:bg-blue-500/10",
                  task.color === "purple" && "border-purple-500 hover:bg-purple-500/10",
                  task.color === "green" && "border-green-500 hover:bg-green-500/10",
                  task.color === "orange" && "border-orange-500 hover:bg-orange-500/10",
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-foreground tracking-tight">{task.title}</span>
                  <span className="text-[8px] font-bold text-muted-foreground opacity-50">Friday</span>
                </div>
                <span className="text-[9px] font-bold text-muted-foreground/60">{task.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-3">
            <h4 className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] px-1 italic">Event Categories</h4>
            <div className="flex flex-col gap-2">
              <FilterItem 
                label="Surgery" 
                color="purple" 
                checked={selectedFilters.includes("purple")}
                onChange={() => onToggleFilter("purple")}
              />
              <FilterItem 
                label="Meetings" 
                color="green" 
                checked={selectedFilters.includes("green")}
                onChange={() => onToggleFilter("green")}
              />
              <FilterItem 
                label="Medical/Review" 
                color="blue" 
                checked={selectedFilters.includes("blue")}
                onChange={() => onToggleFilter("blue")}
              />
              <FilterItem 
                label="Emergency/Urgent" 
                color="red" 
                checked={selectedFilters.includes("red")}
                onChange={() => onToggleFilter("red")}
              />
              <FilterItem 
                label="Admin" 
                color="orange" 
                checked={selectedFilters.includes("orange")}
                onChange={() => onToggleFilter("orange")}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};
