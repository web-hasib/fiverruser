"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { FILTER_BTN, PANEL_TITLE, POPOVER_PANEL, SEARCH_INPUT } from "../_constants";

interface SearchableDropdownProps {
  /** Text shown on trigger when nothing is selected */
  label: string;
  /** Popup header title */
  title: string;
  items: string[];
  selected: string;
  onSelect: (v: string) => void;
  placeholder?: string;
}

export function SearchableDropdown({
  label,
  title,
  items,
  selected,
  onSelect,
  placeholder = "Search...",
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = items.filter((i) =>
    i.toLowerCase().includes(q.toLowerCase())
  );

  const handleSelect = (item: string) => {
    onSelect(item === selected ? "" : item);
    setOpen(false);
    setQ("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={FILTER_BTN}>
          {selected || label}
          <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className={cn(POPOVER_PANEL, "w-[240px]")}>
        <p className={PANEL_TITLE}>{title}</p>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/40" />
            <input
              className={SEARCH_INPUT}
              placeholder={placeholder}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[220px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <span>{item}</span>
                {selected === item && (
                  <Check className="size-4 text-blue-500 shrink-0 ml-2" />
                )}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-xs text-muted-foreground/50">
              No results found
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
