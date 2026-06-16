"use client";

import React, { useState, useRef, useEffect } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Task } from "./types";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { CalendarIcon, Search, Check, Plus, Clock, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";

// ─── Static Data ────────────────────────────────────────────────────────────
const PATIENTS = [
  "Kathryn Murphy", "Annette Black", "Floyd Miles",
  "Jacob Jones", "Brooklyn Simmons", "Darrell Steward",
];
const SESSIONS = [
  "Session #101 - General", "Session #102 - Follow-up", "Session #103 - Consultation",
  "Session #104 - Lab Review", "Session #105 - Emergency", "Session #106 - Routine",
];
const DEFAULT_FOLDERS = ["Medical", "Follow-up", "Documents"];
const DEFAULT_STATUSES = [
  { label: "Overdue", color: "text-rose-500" },
  { label: "Complete", color: "text-emerald-500" },
  { label: "In Progress", color: "text-blue-500" },
  { label: "To Do", color: "text-amber-500" },
];
const TEAM = [
  "Kathryn Murphy", "Theresa Webb", "Annette Black",
  "Floyd Miles", "Brooklyn Simmons", "Jacob Jones", "Darrell Steward",
];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

// ─── Shared Styles ───────────────────────────────────────────────────────────
const TRIGGER = cn(
  "w-full h-12 px-4 rounded-xl border text-sm text-left flex items-center justify-between transition-all cursor-pointer",
  "bg-muted/50 border-border text-foreground hover:border-primary-foreground/30",
);
const PANEL = "p-0 w-[280px] bg-popover border border-border shadow-2xl rounded-xl overflow-hidden";
const PANEL_TITLE = "text-base font-bold text-foreground px-4 pt-4 pb-3 border-b border-border";
const SEARCH_INPUT = cn(
  "w-full h-10 pl-9 pr-3 rounded-xl border text-sm transition-all focus:outline-none",
  "bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-blue-500/50",
);

// ─── FormField ────────────────────────────────────────────────────────────────
const FormField = ({ label, subLabel, required, children }: { label: string; subLabel?: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-primary-foreground/70">
      {label}{" "}
      {required && <span className="text-red-500">*</span>}
      {subLabel && <span className="text-muted-foreground font-normal">{subLabel}</span>}
    </Label>
    {children}
  </div>
);

// ─── SearchableList ────────────────────────────────────────────────────────────
function SearchableList({
  title, items, selected, onSelect, placeholder = "Search...",
  multi = false, onSave, renderItem, showFilter,
}: {
  title: string; items: string[]; selected: string | string[];
  onSelect: (v: string) => void; placeholder?: string;
  multi?: boolean; onSave?: () => void;
  renderItem?: (item: string) => React.ReactNode;
  showFilter?: boolean;
}) {
  const [q, setQ] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const filtered = items.filter((i) => i.toLowerCase().includes(q.toLowerCase()));
  const sel = (item: string) => (multi ? (selected as string[]).includes(item) : selected === item);

  return (
    <div className="flex flex-col relative -mx-4 -mt-1">
      <div className="px-4 py-2 border-b border-border/40 pb-4">
        <div className="relative flex items-center gap-2 pr-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/40" />
            <input className={SEARCH_INPUT} placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {showFilter && (
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "size-10 rounded-xl border flex items-center justify-center transition-all shrink-0",
                    filterOpen ? "bg-muted/50 border-border text-muted-foreground hover:border-primary-foreground/30" : "bg-muted/50 border-border text-muted-foreground hover:border-primary-foreground/30"
                  )}
                >
                  <Filter className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-[180px]  border border-border rounded-2xl p-5 shadow-2xl z-[100] animate-in fade-in zoom-in duration-200">
                <h4 className="text-2xl font-bold mb-6">Filter</h4>
                <div className="space-y-4">
                  {["Doctor", "Nurse", "Resident", "Admin"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setFilterOpen(false)}
                      className="w-full text-left text-foreground/80 text-lg font-medium transition-colors"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {title && <h3 className="px-4 pt-4 pb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>}

      <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
        {filtered.map((item) => (
          <div key={item} onClick={() => onSelect(item)}
            className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-muted/50 cursor-pointer transition-colors">
            {renderItem ? renderItem(item) : <span>{item}</span>}
            {sel(item) && <Check className="size-4 text-blue-500 shrink-0 ml-2" />}
          </div>
        ))}
      </div>
      {onSave && (
        <div className="border-t border-border p-2">
          <Button onClick={onSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm font-bold uppercase rounded-xl">
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── StatusDropdown ────────────────────────────────────────────────────────────
const COLOR_SWATCHES = [
  { label: "Rose", bg: "bg-rose-500", text: "text-rose-500" },
  { label: "Orange", bg: "bg-orange-500", text: "text-orange-500" },
  { label: "Amber", bg: "bg-amber-500", text: "text-amber-500" },
  { label: "Emerald", bg: "bg-emerald-500", text: "text-emerald-500" },
  { label: "Blue", bg: "bg-blue-500", text: "text-blue-500" },
  { label: "Indigo", bg: "bg-indigo-500", text: "text-indigo-500" },
  { label: "Violet", bg: "bg-violet-500", text: "text-violet-500" },
  { label: "Pink", bg: "bg-pink-500", text: "text-pink-500" },
];

function StatusDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [pickedColor, setPickedColor] = useState(COLOR_SWATCHES[4]); // default blue
  const [statuses, setStatuses] = useState(DEFAULT_STATUSES);
  const filtered = statuses.filter((s) => s.label.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setStatuses((p) => [...p, { label: newVal.trim(), color: pickedColor.text }]);
    onSelect(newVal.trim());
    setNewVal(""); setAdding(false); setShowColors(false);
  };

  return (
    <div className="flex flex-col relative -mx-4 -mt-1">
      <div className="px-4 py-2 border-b border-border/40 pb-4">
        <div className="relative pr-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/40" />
          <input className={SEARCH_INPUT} placeholder="Search status name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <h3 className="px-4 pt-4 pb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Status</h3>
      <div className="max-h-[180px] overflow-y-auto custom-scrollbar">
        {filtered.map((s) => (
          <div key={s.label} onClick={() => onSelect(s.label)}
            className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors">
            <span className={cn("text-sm font-semibold", s.color)}>{s.label}</span>
            {selected === s.label && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="border-t border-border px-3 py-3 space-y-2">
          {/* Color picker */}
          {showColors && (
            <div className="grid grid-cols-8 gap-1.5 p-2 bg-muted/30 border border-border rounded-lg mb-2">
              {COLOR_SWATCHES.map((c) => (
                <button key={c.label} type="button"
                  onClick={() => { setPickedColor(c); setShowColors(false); }}
                  className={cn(
                    "size-6 rounded-full transition-all duration-150 ring-offset-1",
                    c.bg,
                    pickedColor.label === c.label ? "ring-2 ring-foreground ring-offset-background scale-110" : "hover:scale-110",
                  )} />
              ))}
            </div>
          )}
          {/* Input row */}
          <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-md px-3 py-2">
            <button type="button" onClick={() => setShowColors((v) => !v)}
              className={cn(
                "size-5 rounded-full shrink-0 transition-all duration-200 hover:scale-110 ring-offset-1",
                pickedColor.bg,
                showColors && "ring-2 ring-foreground ring-offset-background",
              )} />
            <input autoFocus placeholder="Enter status name" value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none" />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => { setAdding(false); setShowColors(false); }}
              className="flex-1 h-8 text-xs border border-border hover:bg-muted text-foreground">Cancel</Button>
            <Button onClick={handleCreate}
              className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase">Create New</Button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-4" /><span>Add Own Status</span>
        </div>
      )}
    </div>
  );
}

// ─── FolderDropdown ────────────────────────────────────────────────────────────
function FolderDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [folders, setFolders] = useState(DEFAULT_FOLDERS);
  const filtered = folders.filter((f) => f.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setFolders((p) => [...p, newVal.trim()]);
    onSelect(newVal.trim());
    setNewVal(""); setAdding(false);
  };

  return (
    <div className="flex flex-col relative -mx-4 -mt-1">
      <div className="px-4 py-2 border-b border-border/40 pb-4">
        <div className="relative pr-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/40" />
          <input className={SEARCH_INPUT} placeholder="Search folder name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <h3 className="px-4 pt-4 pb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Folder</h3>
      <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
        {filtered.map((f) => (
          <div key={f} onClick={() => onSelect(f)}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 cursor-pointer hover:bg-muted/50 transition-colors">
            <span>{f}</span>
            {selected === f && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="border-t border-border px-3 py-3 space-y-2">
          <input autoFocus placeholder="Enter folder name" value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="w-full h-9 px-3 rounded-md border text-sm bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-blue-500/50 transition-all" />
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setAdding(false)}
              className="flex-1 h-8 text-xs border border-border hover:bg-muted text-foreground">Cancel</Button>
            <Button onClick={handleCreate}
              className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase">Create New</Button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-4" /><span>Add New Folder</span>
        </div>
      )}
    </div>
  );
}

// ─── Scroll Column (Time Picker) ──────────────────────────────────────────────
const ITEM_H = 40;
const PAD = 2;
const VISIBLE = 5;

function ScrollColumn({ items, value, onChange, label }: {
  items: number[]; value: number; onChange: (v: number) => void; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const velY = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const rafId = useRef<number>(0);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Refs for stable closures
  const itemsRef = useRef(items);
  const onChangeRef = useRef(onChange);
  useEffect(() => { itemsRef.current = items; onChangeRef.current = onChange; });

  const snapNearest = (container: HTMLDivElement, smooth = true) => {
    const idx = Math.round(container.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, itemsRef.current.length - 1));
    container.scrollTo({ top: clamped * ITEM_H, behavior: smooth ? "smooth" : "auto" });
    if (itemsRef.current[clamped] !== undefined) onChangeRef.current(itemsRef.current[clamped]);
  };

  useEffect(() => {
    // Initial position - run once
    const idx = items.indexOf(value);
    if (idx !== -1 && ref.current) ref.current.scrollTop = idx * ITEM_H;
  }, [value, items]);

  useEffect(() => {
    const applyMom = (container: HTMLDivElement) => {
      let vel = -velY.current * 12;
      const tick = () => {
        if (Math.abs(vel) < 0.5) { snapNearest(container); return; }
        container.scrollTop += vel;
        vel *= 0.90;
        rafId.current = requestAnimationFrame(tick);
      };
      rafId.current = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current || !ref.current) return;
      e.preventDefault();
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const now = Date.now();
      velY.current = (clientY - lastY.current) / Math.max(now - lastT.current, 1);
      lastY.current = clientY;
      lastT.current = now;
      ref.current.scrollTop = startScrollTop.current + (startY.current - clientY);
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (ref.current) applyMom(ref.current);
    };
    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    cancelAnimationFrame(rafId.current);
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = ref.current.scrollTop;
    lastY.current = e.clientY;
    lastT.current = Date.now();
    velY.current = 0;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!ref.current) return;
    cancelAnimationFrame(rafId.current);
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    startScrollTop.current = ref.current.scrollTop;
    lastY.current = e.touches[0].clientY;
    lastT.current = Date.now();
    velY.current = 0;
  };

  const handleNativeScroll = () => {
    if (isDragging.current) return;
    clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      if (ref.current) snapNearest(ref.current);
    }, 100);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!ref.current) return;
    ref.current.scrollTop += e.deltaY;
    e.preventDefault();
  };

  const scrollToOffset = (offset: number) => {
    if (!ref.current) return;
    const currentIdx = Math.round(ref.current.scrollTop / ITEM_H);
    const newIdx = Math.max(0, Math.min(currentIdx + offset, items.length - 1));
    ref.current.scrollTo({ top: newIdx * ITEM_H, behavior: "smooth" });
    onChange(items[newIdx]);
  };

  return (
    <div className="flex-1 flex flex-col items-center group/column">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{label}</p>

      <div className="relative w-full overflow-hidden flex flex-col items-center" style={{ height: (VISIBLE + 1) * ITEM_H }}>
        {/* Top Arrow */}
        <button
          type="button"
          onClick={() => scrollToOffset(-1)}
          className="z-20 text-muted-foreground/40 hover:text-foreground transition-colors p-1"
        >
          <ChevronUp className="size-4" />
        </button>

        <div className="relative w-full overflow-hidden h-full">
          <div className="absolute inset-x-2 rounded-lg bg-muted/60 border border-border/50 pointer-events-none z-0"
            style={{ top: PAD * ITEM_H, height: ITEM_H }} />
          <div className="absolute top-0 inset-x-0 h-10 bg-linear-to-b from-card to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 inset-x-0 h-10 bg-linear-to-t from-card to-transparent pointer-events-none z-10" />

          <div
            ref={ref}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onScroll={handleNativeScroll}
            onWheel={handleWheel}
            className="h-full overflow-y-scroll scrollbar-none cursor-grab active:cursor-grabbing select-none overscroll-contain"
            style={{
              scrollSnapType: "none",
              msOverflowStyle: "none",
              scrollbarWidth: "none"
            } as React.CSSProperties}
          >
            {Array.from({ length: PAD }).map((_, i) => <div key={`t${i}`} style={{ height: ITEM_H }} />)}
            {items.map((item) => (
              <div key={item}
                onClick={() => {
                  if (!isDragging.current) {
                    onChange(item);
                    ref.current?.scrollTo({ top: items.indexOf(item) * ITEM_H, behavior: "smooth" });
                  }
                }}
                style={{ height: ITEM_H }}
                className={cn(
                  "flex items-center justify-center transition-all duration-200 font-bold pointer-events-auto",
                  item === value ? "text-foreground text-2xl scale-105" : "text-muted-foreground/30 text-base scale-100",
                )}>
                {String(item).padStart(2, "0")}
              </div>
            ))}
            {Array.from({ length: PAD }).map((_, i) => <div key={`b${i}`} style={{ height: ITEM_H }} />)}
          </div>
        </div>

        {/* Bottom Arrow */}
        <button
          type="button"
          onClick={() => scrollToOffset(1)}
          className="z-20 text-muted-foreground/40 hover:text-foreground transition-colors p-1"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ─── AM/PM Column ─────────────────────────────────────────────────────────────
function AmPmColumn({ value, onChange }: { value: "AM" | "PM"; onChange: (v: "AM" | "PM") => void }) {
  return (
    <div className="flex flex-col items-center justify-center pb-[40px] gap-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Period</p>
      {(["AM", "PM"] as const).map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={cn(
            "w-full text-center font-bold rounded-lg py-2 transition-all duration-200",
            value === v
              ? "bg-muted/60 border border-border text-foreground text-lg"
              : "text-muted-foreground/30 text-sm hover:text-muted-foreground",
          )}>
          {v}
        </button>
      ))}
    </div>
  );
}

function TimePickerDropdown({ title, hour, minute, ampm, onHourChange, onMinuteChange, onAmPmChange, onSave }: {
  title: string; hour: number; minute: number; ampm: "AM" | "PM";
  onHourChange: (v: number) => void; onMinuteChange: (v: number) => void;
  onAmPmChange: (v: "AM" | "PM") => void; onSave: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="px-3 pt-3 flex gap-3">
        <ScrollColumn items={HOURS} value={hour} onChange={onHourChange} label="Hours" />
        <ScrollColumn items={MINUTES} value={minute} onChange={onMinuteChange} label="Minute" />
        <AmPmColumn value={ampm} onChange={onAmPmChange} />
      </div>
      <div className="text-center py-1">
        <span className="text-3xl font-bold text-foreground tabular-nums tracking-widest">
          {String(hour).padStart(2, "0")} : {String(minute).padStart(2, "0")}{" "}
          <span className="text-xl text-muted-foreground">{ampm}</span>
        </span>
      </div>
      <div className="p-3 border-t border-border">
        <Button onClick={onSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs font-bold uppercase rounded-md">
          Save
        </Button>
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: Record<string, unknown>) => void;
  task?: Task | null;
  initialDate?: Date;
}

const priorityConfig = {
  High: { active: "bg-rose-500/10 border-rose-500 text-rose-500", inactive: "bg-transparent border-border text-muted-foreground hover:text-foreground" },
  Medium: { active: "bg-amber-500/10 border-amber-500 text-amber-500", inactive: "bg-transparent border-border text-muted-foreground hover:text-foreground" },
  Low: { active: "bg-emerald-500/10 border-emerald-500 text-emerald-500", inactive: "bg-transparent border-border text-muted-foreground hover:text-foreground" },
  None: { active: "bg-muted border-border text-foreground", inactive: "bg-transparent border-border text-muted-foreground hover:text-foreground" },
};

const CreateTaskModal = ({ isOpen, onClose, onSave, task, initialDate }: CreateTaskModalProps) => {
  const isEditMode = !!task;

  const [priority, setPriority] = useState<keyof typeof priorityConfig>(task?.priority || "High");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [folder, setFolder] = useState(task?.folderName || "");
  const [status, setStatus] = useState(task?.status || "");
  const [assignedTo, setAssignedTo] = useState<string[]>(task?.assignedTo || []);
  const [linkedPatient, setLinkedPatient] = useState<string[]>(
    task?.patientName ? (Array.isArray(task.patientName) ? task.patientName : [task.patientName]) : []
  );
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [linkedCase, setLinkedCase] = useState<string[]>(
    task?.caseName ? (Array.isArray(task.caseName) ? task.caseName : [task.caseName]) : []
  );
  const [startHour, setStartHour] = useState(10);
  const [startMinute, setStartMinute] = useState(0);
  const [startAmPm, setStartAmPm] = useState<"AM" | "PM">("AM");
  const [endHour, setEndHour] = useState(11);
  const [endMinute, setEndMinute] = useState(30);
  const [endAmPm, setEndAmPm] = useState<"AM" | "PM">("PM");

  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [assignedOpen, setAssignedOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && task) {
        setPriority(task.priority);
        let parsedDate: Date | undefined = undefined;
        if (task.dueDate) {
          let dateStr = task.dueDate;
          if (dateStr.startsWith("Today")) {
            dateStr = dateStr.replace("Today", new Date().toDateString());
          } else if (dateStr.startsWith("Tomorrow")) {
            const tmrw = new Date();
            tmrw.setDate(tmrw.getDate() + 1);
            dateStr = dateStr.replace("Tomorrow", tmrw.toDateString());
          }
          const parsed = new Date(dateStr);
          if (!isNaN(parsed.getTime())) {
            parsedDate = parsed;
          }
        }

        setDueDate(parsedDate);
        setFolder(task.folderName);
        setStatus(task.status);
        setAssignedTo(task.assignedTo);
        setLinkedPatient(task.patientName ? (Array.isArray(task.patientName) ? task.patientName : [task.patientName]) : []);
        setTaskTitle(task.title);
        setDescription(task.description || "");

        if (parsedDate) {
          const h = parsedDate.getHours();
          setStartHour(h % 12 || 12);
          setStartMinute(parsedDate.getMinutes());
          setStartAmPm(h >= 12 ? "PM" : "AM");
        }
      } else if (initialDate) {
        setDueDate(initialDate);
        const h = initialDate.getHours();
        setStartHour(h % 12 || 12);
        setStartMinute(initialDate.getMinutes());
        setStartAmPm(h >= 12 ? "PM" : "AM");

        // Default end time to 1 hour after start
        const eh = (h + 1) % 24;
        setEndHour(eh % 12 || 12);
        setEndMinute(initialDate.getMinutes());
        setEndAmPm(eh >= 12 ? "PM" : "AM");

        // Reset other fields for new task
        setTaskTitle("");
        setDescription("");
        setFolder("");
        setStatus("");
        setPriority("High");
        setAssignedTo([]);
      }
    }
  }, [isOpen, initialDate, isEditMode, task]);

  const toggleAssigned = (name: string) =>
    setAssignedTo((p) => p.includes(name) ? p.filter((n) => n !== name) : [...p, name]);

  const togglePatient = (name: string) =>
    setLinkedPatient((p) => p.includes(name) ? p.filter((n) => n !== name) : [...p, name]);

  const toggleSession = (name: string) =>
    setLinkedCase((p) => p.includes(name) ? p.filter((n) => n !== name) : [...p, name]);

  const fmt = (h: number, m: number, ap: "AM" | "PM") =>
    `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} ${ap}`;

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Task" : "Add New Task"} maxWidth="sm:max-w-[620px]">
      <div className="space-y-5">

        {/* Task Title */}
        <FormField label="Task Title">
          <Input
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="h-11 bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all" />
        </FormField>

        {/* Description */}
        <FormField label="Description">
          <textarea
            placeholder="Details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] rounded-md px-3 py-2 text-sm resize-none border bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" />
        </FormField>

        {/* Row 1: Due Date & Folder */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Due Date">
            <button type="button" onClick={() => setDueDateOpen(true)} className={TRIGGER}>
              <span className={dueDate ? "text-foreground" : "text-muted-foreground/50"}>
                {dueDate ? format(dueDate, "yyyy/MM/dd") : "YYYY/MM/DD"}
              </span>
              <CalendarIcon className="size-4 text-muted-foreground/50 shrink-0" />
            </button>
            <DashboardModal isOpen={dueDateOpen} onClose={() => setDueDateOpen(false)} title="Select Due Date" maxWidth="sm:max-w-[400px]">
              <Calendar mode="single" selected={dueDate}
                onSelect={(d: Date | undefined) => { setDueDate(d); setDueDateOpen(false); }}
                className="bg-card text-foreground mx-auto" />
            </DashboardModal>
          </FormField>

          <FormField label="Folder">
            <button type="button" onClick={() => setFolderOpen(true)} className={TRIGGER}>
              <span className={folder ? "text-foreground" : "text-muted-foreground/50"}>
                {folder || "Select folder"}
              </span>
            </button>
            <DashboardModal isOpen={folderOpen} onClose={() => setFolderOpen(false)} title="" maxWidth="sm:max-w-[400px]">
              <FolderDropdown selected={folder} onSelect={(v) => { setFolder(v); setFolderOpen(false); }} />
            </DashboardModal>
          </FormField>
        </div>

        {/* Row 2: Start Time & End Time */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Start Time">
            <button type="button" onClick={() => setStartOpen(true)} className={TRIGGER}>
              <span className="text-foreground">{fmt(startHour, startMinute, startAmPm)}</span>
              <Clock className="size-4 text-muted-foreground/50 shrink-0" />
            </button>
            <DashboardModal isOpen={startOpen} onClose={() => setStartOpen(false)} title="Set Start Time" maxWidth="sm:max-w-[400px]">
              <TimePickerDropdown title="Set Start Time" hour={startHour} minute={startMinute} ampm={startAmPm}
                onHourChange={setStartHour} onMinuteChange={setStartMinute} onAmPmChange={setStartAmPm} onSave={() => setStartOpen(false)} />
            </DashboardModal>
          </FormField>

          <FormField label="End Time">
            <button type="button" onClick={() => setEndOpen(true)} className={TRIGGER}>
              <span className="text-foreground">{fmt(endHour, endMinute, endAmPm)}</span>
              <Clock className="size-4 text-muted-foreground/50 shrink-0" />
            </button>
            <DashboardModal isOpen={endOpen} onClose={() => setEndOpen(false)} title="Set End Time" maxWidth="sm:max-w-[400px]">
              <TimePickerDropdown title="Set End Time" hour={endHour} minute={endMinute} ampm={endAmPm}
                onHourChange={setEndHour} onMinuteChange={setEndMinute} onAmPmChange={setEndAmPm} onSave={() => setEndOpen(false)} />
            </DashboardModal>
          </FormField>
        </div>

        {/* Row 3: Linked Patient & Linked Case */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Linked Patient" >
            <button type="button" onClick={() => setPatientOpen(true)} className={TRIGGER}>
              <span className={linkedPatient.length > 0 ? "text-foreground truncate" : "text-muted-foreground/50"}>
                {linkedPatient.length === 0 ? "Select Patient" : linkedPatient.length === 1 ? linkedPatient[0] : `${linkedPatient.length} selected`}
              </span>
            </button>
            <DashboardModal isOpen={patientOpen} onClose={() => setPatientOpen(false)} title="" maxWidth="sm:max-w-[450px]">
              <SearchableList title="Select Patient" items={PATIENTS} selected={linkedPatient}
                onSelect={togglePatient}
                placeholder="Search patient" multi onSave={() => setPatientOpen(false)} />
            </DashboardModal>
          </FormField>

          <FormField label="Linked Session" >
            <button type="button" onClick={() => setSessionOpen(true)} className={TRIGGER}>
              <span className={cn("truncate max-w-[150px]", linkedCase.length > 0 ? "text-foreground" : "text-muted-foreground/50")}>
                {linkedCase.length === 0 ? "Enter Session ID" : linkedCase.length === 1 ? linkedCase[0] : `${linkedCase.length} selected`}
              </span>
            </button>
            <DashboardModal isOpen={sessionOpen} onClose={() => setSessionOpen(false)} title="" maxWidth="sm:max-w-[450px]">
              <SearchableList title="Select Session" items={SESSIONS} selected={linkedCase}
                onSelect={toggleSession}
                placeholder="Search Session"
                renderItem={(item) => <span className="text-foreground/80 truncate text-xs">{item}</span>} multi onSave={() => setSessionOpen(false)} />
            </DashboardModal>
          </FormField>
        </div>

        {/* Priority */}
        <FormField label="Priority">
          <div className="grid grid-cols-4 gap-3">
            {(Object.keys(priorityConfig) as (keyof typeof priorityConfig)[]).map((p) => (
              <button key={p} type="button" onClick={() => setPriority(p)}
                className={cn("h-11 rounded-lg text-sm font-semibold border transition-all",
                  priority === p ? priorityConfig[p].active : priorityConfig[p].inactive)}>
                {p}
              </button>
            ))}
          </div>
        </FormField>

        {/* Row 4: Assigned To & Status */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Assigned To">
            <button type="button" onClick={() => setAssignedOpen(true)} className={TRIGGER}>
              <span className={assignedTo.length > 0 ? "text-foreground truncate" : "text-muted-foreground/50"}>
                {assignedTo.length === 0 ? "Select multiple" : assignedTo.length === 1 ? assignedTo[0] : `${assignedTo.length} selected`}
              </span>
            </button>
            <DashboardModal isOpen={assignedOpen} onClose={() => setAssignedOpen(false)} title="" maxWidth="sm:max-w-[450px]">
              <SearchableList title="Assigned To" items={TEAM} selected={assignedTo}
                onSelect={toggleAssigned} placeholder="Search name" multi
                onSave={() => setAssignedOpen(false)} showFilter />
            </DashboardModal>
          </FormField>

          <FormField label="Status">
            <button type="button" onClick={() => setStatusOpen(true)} className={TRIGGER}>
              <span className={status ? "text-foreground" : "text-muted-foreground/50"}>
                {status || "Select status"}
              </span>
            </button>
            <DashboardModal isOpen={statusOpen} onClose={() => setStatusOpen(false)} title="" maxWidth="sm:max-w-[400px]">
              <StatusDropdown selected={status} onSelect={(v) => { setStatus(v); setStatusOpen(false); }} />
            </DashboardModal>
          </FormField>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}
            className="flex-1 bg-background hover:bg-muted text-foreground border border-border h-11 rounded-xl transition-all">
            Cancel
          </Button>
          <Button type="button" onClick={() => onSave?.({
            priority,
            dueDate,
            folder,
            status,
            assignedTo,
            linkedPatient,
            linkedCase,
            startTime: fmt(startHour, startMinute, startAmPm),
            endTime: fmt(endHour, endMinute, endAmPm),
          })}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
          >
            {isEditMode ? "Save" : "Add Task"}
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default CreateTaskModal;