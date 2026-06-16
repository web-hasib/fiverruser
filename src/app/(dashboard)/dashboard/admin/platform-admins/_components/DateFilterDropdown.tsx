"use client";

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Calendar } from "@/src/components/ui/calendar";
import { format } from "date-fns";
import { FILTER_BTN, PANEL_TITLE, POPOVER_PANEL } from "../_constants";

interface DateFilterDropdownProps {
  selected: Date | undefined;
  onSelect: (d: Date | undefined) => void;
}

export function DateFilterDropdown({ selected, onSelect }: DateFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={FILTER_BTN}>
          {selected ? format(selected, "dd MMM yyyy") : "All Dates"}
          <CalendarIcon className="w-3 h-3 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className={`${POPOVER_PANEL} w-auto`}>
        <p className={PANEL_TITLE}>Date Selection</p>
        <div className="p-2">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d: any) => { onSelect(d); setOpen(false); }}
            className="bg-popover text-foreground"
          />
        </div>
        {selected && (
          <div className="px-3 pb-3">
            <button
              onClick={() => { onSelect(undefined); setOpen(false); }}
              className="w-full text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg py-1.5 transition-colors"
            >
              Clear date
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
