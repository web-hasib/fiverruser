"use client";

import React from "react";
import { Search, SlidersHorizontal, Calendar } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface CaseFilterBarProps {
  className?: string;
}

const FilterDropdown = ({
  placeholder,
  options,
}: {
  placeholder: string;
  options: string[];
}) => (
  <Select>
    <SelectTrigger className="w-[140px] bg-primary border-none text-primary-foreground/70 text-xs h-10 px-3 hover:bg-primary-foreground/5 transition-colors">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-primary border-primary-foreground/10 text-primary-foreground">
      {options.map((opt) => (
        <SelectItem key={opt} value={opt}>
          {opt}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const CaseFilterBar = ({ className }: CaseFilterBarProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 bg-primary/40 backdrop-blur-md p-4 rounded-2xl border border-primary-foreground/10",
        className,
      )}
    >
      {/* Search Bar */}
      <div className="flex-1 relative min-w-[300px]">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/40"
          size={18}
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-primary/60 border border-primary-foreground/10 text-primary-foreground text-sm rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-foreground/20 transition-all placeholder:text-primary-foreground/30"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mr-2 leading-none uppercase tracking-wider font-semibold">
          <SlidersHorizontal size={18} /> Filter:
        </div>

        <FilterDropdown
          placeholder="language"
          options={["English", "Spanish", "French"]}
        />
        <FilterDropdown
          placeholder="Department"
          options={["Surgery", "Cardiology", "Internal Medicine"]}
        />
        <FilterDropdown
          placeholder="Team"
          options={["Team A", "Team B", "Team C"]}
        />
        <FilterDropdown
          placeholder="Status"
          options={["Completed", "Pending", "Urgent"]}
        />

        <button className="flex items-center gap-2 bg-primary border-none text-primary-foreground/70 text-xs h-10 px-4 rounded-lg hover:bg-primary-foreground/5 transition-colors">
          Date <Calendar size={16} />
        </button>
      </div>
    </div>
  );
};
