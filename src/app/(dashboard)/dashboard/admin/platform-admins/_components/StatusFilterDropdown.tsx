"use client";

import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import {
  FILTER_BTN,
  PANEL_TITLE,
  POPOVER_PANEL,
  STATUS_COLOR,
  STATUS_OPTIONS,
} from "../_constants";

interface StatusFilterDropdownProps {
  selected: string;
  onSelect: (v: string) => void;
}

export function StatusFilterDropdown({ selected, onSelect }: StatusFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={FILTER_BTN}>
          {selected || "All Status"}
          <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className={cn(POPOVER_PANEL, "w-[200px]")}>
        <p className={PANEL_TITLE}>Status</p>
        <div className="flex flex-col py-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { onSelect(s === selected ? "" : s); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <span className={cn("text-sm font-semibold", STATUS_COLOR[s])}>{s}</span>
              {selected === s && <Check className="size-4 text-blue-500 shrink-0" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
