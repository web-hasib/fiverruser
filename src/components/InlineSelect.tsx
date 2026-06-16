"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { ChevronDown, Check, Plus, Pencil, Trash2, Palette, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const PRESET_COLORS = [
  { name: "emerald", class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", dot: "bg-emerald-500" },
  { name: "blue",    class: "bg-blue-500/10 text-blue-500 border-blue-500/30",       dot: "bg-blue-500" },
  { name: "indigo",  class: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",   dot: "bg-indigo-500" },
  { name: "teal",    class: "bg-teal-500/10 text-teal-500 border-teal-500/30",       dot: "bg-teal-500" },
  { name: "rose",    class: "bg-rose-500/10 text-rose-500 border-rose-500/30",       dot: "bg-rose-500" },
  { name: "amber",   class: "bg-amber-500/10 text-amber-500 border-amber-500/30",     dot: "bg-amber-500" },
  { name: "slate",   class: "bg-slate-500/10 text-slate-500 border-slate-500/30",     dot: "bg-slate-500" },
  { name: "purple",  class: "bg-purple-500/10 text-purple-500 border-purple-500/30",   dot: "bg-purple-500" },
];

interface InlineSelectProps {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  /** Optional: map option values to a badge-style class string */
  styleMap?: Record<string, string>;
  /** Render as a colored badge pill (for Status) */
  asBadge?: boolean;
  align?: "start" | "center" | "end";
  onAddOption?: (val: string) => void;
  onEditOption?: (oldVal: string, newVal: string) => void;
  onDeleteOption?: (val: string) => void;
  onColorChange?: (opt: string, colorClass: string) => void;
}

export const InlineSelect = ({
  value,
  options,
  onChange,
  styleMap,
  asBadge = false,
  align = "start",
  onAddOption,
  onEditOption,
  onDeleteOption,
  onColorChange,
}: InlineSelectProps) => {
  const [open, setOpen] = useState(false);
  const [newOpt, setNewOpt] = useState("");
  const [selectedAddColor, setSelectedAddColor] = useState(PRESET_COLORS[1].class); // Default to blue
  const [showAddColorPicker, setShowAddColorPicker] = useState(false);
  const [editingOpt, setEditingOpt] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
  };

  const triggerClass = asBadge
    ? cn(
        "flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-tight cursor-pointer transition-all hover:opacity-80",
        styleMap?.[value] ?? "bg-muted text-muted-foreground border-transparent"
      )
    : "flex items-center gap-1 text-xs font-semibold text-foreground/80 cursor-pointer hover:text-blue-500 transition-colors group";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className={triggerClass}
        >
          <span className="truncate max-w-[130px]">{value}</span>
          <ChevronDown
            className={cn(
              "shrink-0 transition-transform duration-200",
              asBadge ? "size-2.5" : "size-3 opacity-40 group-hover:opacity-100",
              open && "rotate-180"
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={6}
        className="w-auto min-w-[160px] p-1.5 rounded-xl shadow-xl border border-border/60 bg-popover"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col gap-0.5">
          {options.map((opt) => (
            <li key={opt} className="group/item relative">
              {editingOpt === opt ? (
                <div className="flex items-center gap-1 p-1">
                  <input
                    autoFocus
                    className="flex-1 h-8 px-2 text-[11px] bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && editValue.trim()) {
                        onEditOption?.(opt, editValue.trim());
                        setEditingOpt(null);
                      } else if (e.key === "Escape") {
                        setEditingOpt(null);
                      }
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      if (editValue.trim()) {
                        onEditOption?.(opt, editValue.trim());
                        setEditingOpt(null);
                      }
                    }}
                    className="size-7 flex items-center justify-center bg-blue-600 text-white rounded-lg"
                  >
                    <Check size={14} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setEditingOpt(null)}
                    className="size-7 flex items-center justify-center bg-muted text-muted-foreground rounded-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      "flex-1 flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left",
                      opt === value
                        ? "bg-blue-500/10 text-blue-600"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {asBadge && styleMap?.[opt] && (
                        <div className={cn("size-2 rounded-full", styleMap[opt].split(" ").find(c => c.startsWith("bg-"))?.split("/")[0])} />
                      )}
                      <span>{opt}</span>
                    </div>
                    {opt === value && <Check className="size-3 shrink-0 text-blue-500" />}
                  </button>

                  <div className="flex items-center gap-0.5 pr-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    {onColorChange && asBadge && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowColorPicker(showColorPicker === opt ? null : opt);
                        }}
                        className="size-6 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground/40 hover:text-foreground"
                      >
                        <Palette size={12} />
                      </button>
                    )}
                    {onEditOption && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingOpt(opt);
                          setEditValue(opt);
                        }}
                        className="size-6 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground/40 hover:text-foreground"
                      >
                        <Pencil size={12} />
                      </button>
                    )}
                    {onDeleteOption && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onDeleteOption(opt);
                        }}
                        className="size-6 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground/40 hover:text-rose-500"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {showColorPicker === opt && (
                <div className="absolute left-full top-0 ml-2 p-2 bg-popover border border-border rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                  <div className="grid grid-cols-4 gap-1.5 w-28">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          onColorChange?.(opt, c.class);
                          setShowColorPicker(null);
                        }}
                        className={cn(
                          "size-5 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-110",
                          c.dot
                        )}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {onAddOption && (
          <div className="mt-1.5 pt-1.5 border-t border-border/50 px-1">
            <div className="flex items-center gap-1.5 relative">
              {onColorChange && asBadge && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowAddColorPicker(!showAddColorPicker)}
                    className={cn(
                      "size-8 rounded-lg border border-border/50 flex items-center justify-center transition-all hover:bg-accent",
                      PRESET_COLORS.find(c => c.class === selectedAddColor)?.dot
                    )}
                  />
                  {showAddColorPicker && (
                    <div className="absolute bottom-full left-0 mb-2 p-2 bg-popover border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in duration-200">
                      <div className="grid grid-cols-4 gap-1.5 w-28">
                        {PRESET_COLORS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => {
                              setSelectedAddColor(c.class);
                              setShowAddColorPicker(false);
                            }}
                            className={cn(
                              "size-5 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-110",
                              c.dot
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <input
                className="flex-1 h-8 px-2 text-[10px] bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-foreground placeholder:text-muted-foreground/40"
                placeholder="Add custom..."
                value={newOpt}
                onChange={(e) => setNewOpt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newOpt.trim()) {
                    onAddOption(newOpt.trim());
                    if (onColorChange && asBadge) {
                      onColorChange(newOpt.trim(), selectedAddColor);
                    }
                    setNewOpt("");
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (newOpt.trim()) {
                    onAddOption(newOpt.trim());
                    if (onColorChange && asBadge) {
                      onColorChange(newOpt.trim(), selectedAddColor);
                    }
                    setNewOpt("");
                  }
                }}
                className="size-8 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shrink-0"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
