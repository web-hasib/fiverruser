"use client";

import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { FILTER_BTN, PANEL_TITLE, POPOVER_PANEL, SORT_OPTIONS } from "../_constants";

interface SortDropdownProps {
  selected: string;
  onSelect: (v: string) => void;
}

export function SortDropdown({ selected, onSelect }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={FILTER_BTN}>
          Sort: {selected || "Name A—Z"}
          <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className={cn(POPOVER_PANEL, "w-[200px]")}>
        <p className={PANEL_TITLE}>Name</p>
        <div className="flex flex-col py-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); setOpen(false); }}
              className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <span>{opt}</span>
              {selected === opt && <Check className="size-4 text-blue-500 shrink-0" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
