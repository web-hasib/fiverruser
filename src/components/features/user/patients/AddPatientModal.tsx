"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Calendar } from "@/src/components/ui/calendar";
import { CalendarIcon, Search, Check, Plus, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";

// ─── Static Data ────────────────────────────────────────────────────────────
const GENDERS = ["Male", "Female", "Other"];
const DEFAULT_CATEGORIES = [
  { label: "General Medicine",       icon: "🧬" },
  { label: "Neurology",              icon: "🧠" },
  { label: "Dentistry",              icon: "🦷" },
  { label: "Pharmacy / Medication", icon: "💊" },
  { label: "Pulmonology (Lungs)",    icon: "🫁" },
];
const SESSIONS = [
  { id: "1", label: "Review blood test results for Kovács Er..." },
  { id: "2", label: "Review blood test results for Kovács Er..." },
  { id: "3", label: "Review blood test results for Kovács Er..." },
  { id: "4", label: "Review blood test results for Kovács Er..." },
  { id: "5", label: "Review blood test results for Kovács Er..." },
  { id: "6", label: "Review blood test results for Kovács Er..." },
];

// ─── Shared Styles (Inspired by CreateTaskModal) ─────────────────────────────
const LABEL_STYLE = "text-xs font-semibold text-foreground/90 mb-2 block";

const INPUT_STYLE = cn(
  "h-11 px-3 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/50",
  "border-foreground/30 text-foreground placeholder:text-muted-foreground/50",
);

const TRIGGER_STYLE = cn(
  "w-full h-11 px-3 rounded-md border text-sm text-left flex items-center justify-between transition-all cursor-pointer outline-none",
  "border-foreground/30 text-foreground hover:border-muted-foreground/30",
);

const PANEL = "p-0 max-w-[280px] bg-card border-border shadow-2xl rounded-xl overflow-hidden";
const PANEL_TITLE = "text-base font-bold text-foreground px-4 pt-4 pb-3 border-b border-border";
const SEARCH_INPUT = cn(
  "w-full h-9 pl-9 pr-3 rounded-md border text-sm transition-all focus:outline-none",
  "bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/40 focus:border-blue-500/50",
);

// ─── SearchableList Components ────────────────────────────────────────────────
function SearchableList({
  title, items, selected, onSelect, placeholder = "Search...",
  renderItem, multi = false, onSave,
}: {
  title: string; 
  items: { id: string, label: string }[]; 
  selected: string | string[];
  onSelect: (v: string) => void; 
  placeholder?: string;
  renderItem?: (item: { id: string, label: string }, index: number) => React.ReactNode;
  multi?: boolean;
  onSave?: () => void;
}) {
  const [q, setQ] = useState("");
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  const isSelected = (id: string) => 
    multi ? (selected as string[]).includes(id) : selected === id;

  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>{title}</p>
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/40" />
          <input className={SEARCH_INPUT} placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
        {filtered.map((item, idx) => (
          <div key={item.id} onClick={() => onSelect(item.id)}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted/50 cursor-pointer transition-colors">
            {renderItem ? renderItem(item, idx) : <span>{item.label}</span>}
            {isSelected(item.id) && <Check className="size-4 text-blue-500 shrink-0 ml-2" />}
          </div>
        ))}
      </div>
      {multi && onSave && (
        <div className="p-3 border-t border-border">
          <Button onClick={onSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9 text-xs font-bold uppercase rounded-md shadow-lg shadow-blue-600/20">
            Save Selection
          </Button>
        </div>
      )}
    </div>
  );
}

function StatusDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [newColor, setNewColor] = useState("#3B82F6");
  const colorInputRef = React.useRef<HTMLInputElement>(null);

  const [statuses, setStatuses] = useState([
    { label: "Overdue",     color: "#F43F5E" },
    { label: "Complete",    color: "#10B981" },
    { label: "In Progress", color: "#3B82F6" },
    { label: "To Do",       color: "#F59E0B" },
  ]);
  const filtered = statuses.filter((s) => s.label.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setStatuses((p) => [...p, { label: newVal.trim(), color: newColor }]);
    onSelect(newVal.trim());
    setNewVal(""); setNewColor("#3B82F6"); setAdding(false);
  };

  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Status</p>
      <div className="px-3 py-2">
        <div className="relative">
          <input className={SEARCH_INPUT} placeholder="Search status name" value={q} onChange={(e) => setQ(e.target.value)} />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60" />
        </div>
      </div>
      <div className="max-h-[180px] overflow-y-auto custom-scrollbar">
        {filtered.map((s) => (
          <div key={s.label} onClick={() => onSelect(s.label)}
            className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors">
            <span className="text-sm font-bold" style={{ color: s.color }}>{s.label}</span>
            {selected === s.label && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="border-t border-border px-3 py-4 space-y-4">
          <p className="text-xs font-bold text-foreground">Add Own Status</p>
          <div className="flex items-center gap-3">
            {/* Color Picker Box */}
            <div 
              onClick={() => colorInputRef.current?.click()}
              className="size-11 rounded-xl flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/10 transition-transform active:scale-95"
              style={{ background: newColor.startsWith("#") ? `linear-gradient(135deg, ${newColor} 0%, #ffffff 200%)` : "linear-gradient(135deg, #FF0000, #00FF00, #0000FF)" }}
            >
              <Plus className="size-5 text-white stroke-[3] drop-shadow-md" />
              <input 
                type="color" 
                ref={colorInputRef}
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="sr-only"
              />
            </div>
            <input autoFocus placeholder="Enter status name" value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              className="flex-1 h-11 px-3 rounded-xl border border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setAdding(false)} className="text-sm font-bold text-foreground hover:text-muted-foreground px-4">Cancel</button>
            <button onClick={handleCreate} className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold uppercase rounded-xl">Create New</button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3.5 text-sm font-bold text-blue-500 hover:text-blue-400 cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-3.5" /><span>Add Own Status</span>
        </div>
      )}
    </div>
  );
}

function CategoryDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [newIcon, setNewIcon] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const filtered = categories.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setCategories((p) => [...p, { label: newVal.trim(), icon: newIcon || "📁" }]);
    onSelect(newVal.trim());
    setNewVal(""); setNewIcon(null); setAdding(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewIcon(url);
    }
  };

  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Category</p>
      <div className="px-3 py-2">
        <div className="relative">
          <input className={SEARCH_INPUT} placeholder="Search by name, patient id" value={q} onChange={(e) => setQ(e.target.value)} />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60" />
        </div>
      </div>
      <div className="max-h-[180px] overflow-y-auto custom-scrollbar">
        {filtered.map((c) => (
          <div key={c.label} onClick={() => onSelect(c.label)}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 cursor-pointer hover:bg-muted/50 transition-colors group">
            <div className="flex items-center gap-3 font-medium">
              <div className="size-6 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden rounded-md">
                {c.icon.startsWith("http") || c.icon.startsWith("blob:") ? (
                  <img src={c.icon} alt={c.label} className="size-full object-cover" />
                ) : (
                  <span className="text-lg">{c.icon}</span>
                )}
              </div>
              <span>{c.label}</span>
            </div>
            {selected === c.label && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="border-t border-border px-3 py-4 space-y-4">
          <p className="text-xs font-bold text-foreground">Add New Category</p>
          <div className="flex items-center gap-3">
            {/* Image Upload Box */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="size-11 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground/40 hover:text-blue-500 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden bg-muted/20"
            >
              {newIcon ? (
                <img src={newIcon} className="size-full object-cover" alt="Preview" />
              ) : (
                <CalendarIcon className="size-5" />
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="sr-only" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            <input autoFocus placeholder="Enter Specialty name" value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              className="flex-1 h-11 px-3 rounded-xl border border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setAdding(false)} className="text-sm font-bold text-foreground hover:text-muted-foreground px-4">Cancel</button>
            <button onClick={handleCreate} className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold uppercase rounded-xl">Create New</button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3.5 text-sm font-bold text-blue-500 hover:text-blue-400 cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-3.5" /><span>Add New Category</span>
        </div>
      )}
    </div>
  );
}

function TypeDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [types, setTypes] = useState(["New", "Returning", "Emergency", "Follow-up"]);
  const filtered = types.filter((t) => t.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setTypes((p) => [...p, newVal.trim()]);
    onSelect(newVal.trim());
    setNewVal(""); setAdding(false);
  };

  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Type</p>
      <div className="px-3 py-2">
        <div className="relative">
          <input className={SEARCH_INPUT} placeholder="Search type" value={q} onChange={(e) => setQ(e.target.value)} />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60" />
        </div>
      </div>
      <div className="max-h-[180px] overflow-y-auto custom-scrollbar">
        {filtered.map((t) => (
          <div key={t} onClick={() => onSelect(t)}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 cursor-pointer hover:bg-muted/50 transition-colors">
            <span className="font-medium">{t}</span>
            {selected === t && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="border-t border-border px-3 py-4 space-y-4">
          <p className="text-xs font-bold text-foreground">Add New Type</p>
          <input autoFocus placeholder="Enter type name" value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-blue-500/50" />
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setAdding(false)} className="text-sm font-bold text-foreground hover:text-muted-foreground px-4">Cancel</button>
            <button onClick={handleCreate} className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold uppercase rounded-xl">Create New</button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3.5 text-sm font-bold text-blue-500 hover:text-blue-400 cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-3.5" /><span>Add Own Type</span>
        </div>
      )}
    </div>
  );
}

function GenderDropdown({ selected, onSelect, onClose }: { selected: string; onSelect: (v: string) => void; onClose: () => void }) {
  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Gender</p>
      <div className="py-2">
        {GENDERS.map((g) => (
          <div key={g} onClick={() => onSelect(g)}
            className="flex items-center justify-between px-4 py-3 text-sm font-bold text-foreground/80 hover:bg-muted/50 cursor-pointer transition-colors">
            <span>{g}</span>
            {selected === g && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-border flex justify-end">
        <button onClick={onClose} className="h-8 px-6 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded-md">Save</button>
      </div>
    </div>
  );
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dob?: Date;
  gender: string;
  phone: string;
  email: string;
  sessionId: string[];
  status: string;
  category: string;
  type: string;
}

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PatientFormData) => void;
}

export const AddPatientModal = ({
  isOpen,
  onClose,
  onSave,
}: AddPatientModalProps) => {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    dob: undefined,
    gender: "",
    phone: "",
    email: "",
    sessionId: [],
    status: "",
    category: "",
    type: "",
  });

  const [openStates, setOpenStates] = useState({
    dob: false,
    gender: false,
    sessionId: false,
    status: false,
    category: false,
    type: false,
  });

  const toggleOpen = (field: keyof typeof openStates, state?: boolean) => {
    setOpenStates((prev) => ({ ...prev, [field]: state ?? !prev[field] }));
  };

  const handleChange = <K extends keyof PatientFormData>(field: K, value: PatientFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSession = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sessionId: prev.sessionId.includes(id)
        ? prev.sessionId.filter((item) => item !== id)
        : [...prev.sessionId, id],
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Patient"
      maxWidth="sm:max-w-[620px]"
    >
      <div className="space-y-5 pt-1">
        
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>First Name *</Label>
            <Input 
              placeholder="Saifur" 
              className={INPUT_STYLE} 
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Last Name *</Label>
            <Input 
              placeholder="Rahman" 
              className={INPUT_STYLE} 
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Date of Birth & Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Date of Birth *</Label>
            <Popover open={openStates.dob} onOpenChange={(o) => toggleOpen("dob", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                   <span className={formData.dob ? "text-foreground" : "text-muted-foreground/40"}>
                    {formData.dob ? format(formData.dob, "MM/dd/yyyy") : "MM/DD/YYYY"}
                  </span>
                  <CalendarIcon className="size-4 text-muted-foreground/40 shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <p className={PANEL_TITLE}>Date of Birth</p>
                <Calendar 
                  mode="single" 
                  selected={formData.dob} 
                  onSelect={(date: Date | undefined) => {
                    handleChange("dob", date);
                    toggleOpen("dob", false);
                  }} 
                  initialFocus 
                  className="bg-card text-foreground" 
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Gender</Label>
            <Popover open={openStates.gender} onOpenChange={(o) => toggleOpen("gender", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={formData.gender ? "text-foreground" : "text-muted-foreground/40"}>
                    {formData.gender || "Male"}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <GenderDropdown 
                  selected={formData.gender} 
                  onSelect={(v) => handleChange("gender", v)} 
                  onClose={() => toggleOpen("gender", false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Row 3: Phone & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Phone</Label>
            <Input 
              placeholder="(208) 555-0112" 
              className={INPUT_STYLE} 
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Email</Label>
            <Input 
              placeholder="michelle.rivera@example.com" 
              className={INPUT_STYLE} 
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>

        {/* Row 4: Session ID & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Session ID</Label>
            <Popover open={openStates.sessionId} onOpenChange={(o) => toggleOpen("sessionId", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={cn("truncate max-w-[150px]", formData.sessionId.length > 0 ? "text-foreground" : "text-muted-foreground/40")}>
                    {formData.sessionId.length === 0 
                      ? "Select Session" 
                      : formData.sessionId.length === 1 
                        ? SESSIONS.find(c => c.id === formData.sessionId[0])?.label 
                        : `${formData.sessionId.length} Sessions Selected`}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <SearchableList 
                  title="Linked Session" 
                  items={SESSIONS} 
                  selected={formData.sessionId}
                  multi
                  onSave={() => toggleOpen("sessionId", false)}
                  placeholder="Search session"
                  onSelect={toggleSession}
                  renderItem={(item, idx) => (
                    <span className="text-foreground/80 truncate text-xs">
                      {idx + 1}. {item.label}
                    </span>
                  )}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Status</Label>
            <Popover open={openStates.status} onOpenChange={(o) => toggleOpen("status", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={formData.status ? "text-foreground" : "text-muted-foreground/40"}>
                    {formData.status || "Select/own Create"}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <StatusDropdown 
                  selected={formData.status} 
                  onSelect={(v) => { handleChange("status", v); toggleOpen("status", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Row 5: Category & Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Category</Label>
            <Popover open={openStates.category} onOpenChange={(o) => toggleOpen("category", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={cn("truncate max-w-[150px]", formData.category ? "text-foreground" : "text-muted-foreground/40")}>
                    {formData.category || "Cardiology"}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <CategoryDropdown 
                  selected={formData.category} 
                  onSelect={(v) => { handleChange("category", v); toggleOpen("category", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Type</Label>
            <Popover open={openStates.type} onOpenChange={(o) => toggleOpen("type", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={cn("truncate max-w-[150px]", formData.type ? "text-foreground" : "text-muted-foreground/40")}>
                    {formData.type || "Select Type"}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <TypeDropdown 
                  selected={formData.type} 
                  onSelect={(v) => { handleChange("type", v); toggleOpen("type", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Actions (Consistent with CreateTaskModal) */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <Button 
            type="button" 
            onClick={onClose}
            className="bg-background hover:bg-muted text-foreground border border-border px-4 py-5 transition-all font-medium"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant={"primary"}
            onClick={handleSave}
            className=""
          >
            SAVE PATIENT
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
