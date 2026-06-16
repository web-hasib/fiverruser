"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Search, ChevronDown, Check, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

const CATEGORIES = ["General Medicine", "Neurology", "Dentistry", "Pharmacy / Medication", "Pulmonology (Lungs)"];
const COLORS = [
  "#3b82f6", "#ef4444", "#f59e0b", "#22c55e", "#14b8a6", "#6366f1", "#a855f7"
];
const ACCESS_LIST = [
  "1. Only me",
  "2. Specific members",
  "3. My Team (whole team)",
  "4. My department (whole department)"
];
const ADMINS = [
  "Kathryn Murphy",
  "Annette Black",
  "Floyd Miles",
  "Jacob Jones",
  "Darrell Steward",
  "Saifur Rahman"
];

const LABEL_STYLE = "text-xs font-bold text-foreground/90 mb-2 block";
const INPUT_STYLE = cn(
  "h-11 px-3 rounded-md border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/50",
  "border-foreground/30 text-foreground placeholder:text-muted-foreground/50 bg-transparent",
);
const TRIGGER_STYLE = cn(
  "w-full h-11 px-3 rounded-md border text-sm text-left flex items-center justify-between transition-all cursor-pointer outline-none bg-transparent",
  "border-foreground/30 text-foreground hover:border-muted-foreground/30",
);
const PANEL = "p-0 min-w-[320px] max-w-[320px] bg-card border-border shadow-2xl rounded-xl overflow-hidden";
const PANEL_TITLE = "text-base font-bold text-foreground px-4 pt-4 pb-3 border-b border-border";
const SEARCH_INPUT = cn(
  "w-full h-11 rounded-md border text-sm transition-all focus:outline-none",
  "bg-transparent border-foreground/30 text-foreground placeholder:text-muted-foreground/40 focus:border-blue-500/50",
);

function CategoryDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [cats, setCats] = useState(CATEGORIES);

  const handleAdd = () => {
    if (newVal.trim()) {
      setCats([...cats, newVal.trim()]);
      onSelect(newVal.trim());
      setAdding(false);
      setNewVal("");
    }
  };

  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Category</p>
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40" />
          <input className={cn(SEARCH_INPUT, "pl-3 pr-9")} placeholder="Search by name, patient id" value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <div className="max-h-[180px] overflow-y-auto custom-scrollbar flex flex-col pb-2">
        {cats.filter(c => c.toLowerCase().includes(q.toLowerCase())).map((c) => (
          <div key={c} onClick={() => onSelect(c)} className="flex items-center justify-between px-4 py-3 text-sm font-bold text-foreground hover:bg-muted/50 cursor-pointer transition-colors">
            {c}
            {selected === c && <Check className="size-4 text-blue-500 shrink-0 ml-2" />}
          </div>
        ))}
      </div>
      <div className="px-4 py-4 border-t border-border mt-1 bg-muted/10">
        {!adding ? (
          <button onClick={() => setAdding(true)} className="flex items-center text-[13px] font-bold text-blue-500 hover:text-blue-400 w-full text-left">
            <Plus className="size-4 mr-2" /> Add New Category
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
               <label className="text-xs font-bold text-foreground">Add New Category</label>
               <input value={newVal} onChange={e => setNewVal(e.target.value)} placeholder="Enter Category name" className={cn(INPUT_STYLE, "h-11 border-border/50 bg-background w-full")} />
            </div>
            <div className="flex items-center justify-end gap-3 mt-2">
               <Button variant="ghost" className="h-10 text-xs font-bold px-4 text-foreground hover:bg-muted" onClick={() => setAdding(false)}>Cancel</Button>
               <Button className="h-10 text-xs font-bold px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg" onClick={handleAdd}>CREATE NEW</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AccessControlDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Access Control</p>
      <div className="py-2 flex flex-col">
        {ACCESS_LIST.map((c) => {
          const val = c.replace(/^\d+\.\s*/, "");
          return (
            <div key={c} onClick={() => onSelect(val)} className="flex items-center justify-between px-4 py-3.5 text-[13px] font-bold text-foreground hover:bg-muted/50 cursor-pointer transition-colors">
              {c}
              {selected === val && <Check className="size-4 text-blue-500 shrink-0 ml-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FolderAdminDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex flex-col">
      <p className={PANEL_TITLE}>Folder Administrator</p>
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40" />
          <input className={cn(SEARCH_INPUT, "pl-3 pr-9")} placeholder="Search folder administrator" value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <div className="max-h-[260px] overflow-y-auto custom-scrollbar pb-2">
        {ADMINS.filter(a => a.toLowerCase().includes(q.toLowerCase())).map((a) => (
          <div key={a} onClick={() => onSelect(a)} className="flex items-center justify-between px-4 py-3 text-[13px] font-bold text-foreground hover:bg-muted/50 cursor-pointer transition-colors">
            {a}
            {selected === a && <Check className="size-4 text-blue-500 shrink-0 ml-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FolderFormData) => void;
}

export interface FolderFormData {
  name: string;
  category: string;
  color: string;
  administrator: string;
  accessControl: string;
  description: string;
}

export const AddFolderModal = ({ isOpen, onClose, onSave }: AddFolderModalProps) => {
  const [form, setForm] = useState<FolderFormData>({
    name: "",
    category: "",
    color: "#3b82f6",
    administrator: "Kathryn Murphy",
    accessControl: "Specific members",
    description: "",
  });

  const [openStates, setOpenStates] = useState({
    category: false,
    access: false,
    admin: false
  });

  const toggleOpen = (key: keyof typeof openStates, state: boolean) => {
    setOpenStates(prev => ({ ...prev, [key]: state }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Add New Folder">
      <div className=" flex flex-col gap-6">
        
        {/* Folder Name */}
        <div className="space-y-2">
          <Label className={LABEL_STYLE}>
            Folder Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Oncology Team, Emergency Department"
            className={INPUT_STYLE}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className={LABEL_STYLE}>
            Category <span className="text-rose-500">*</span>
          </Label>
          <Popover open={openStates.category} onOpenChange={(o) => toggleOpen("category", o)}>
            <PopoverTrigger asChild>
              <button type="button" className={TRIGGER_STYLE}>
                <span className={form.category ? "text-foreground font-semibold" : "text-muted-foreground/50"}>
                  {form.category || "Select Category"}
                </span>
                <ChevronDown className="size-4 opacity-40 ml-2" />
              </button>
            </PopoverTrigger>
            <PopoverContent className={PANEL} align="start">
              <CategoryDropdown 
                selected={form.category} 
                onSelect={(v) => { setForm(f => ({ ...f, category: v })); toggleOpen("category", false); }} 
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className={LABEL_STYLE.replace("mb-2", "mb-0")}>
              Color <span className="text-rose-500">*</span>
            </Label>
            {/* Active Color Preview Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/30 border border-border/50">
              <div className="size-2.5 rounded-full shadow-sm" style={{ backgroundColor: form.color }} />
              <span className="text-[10px] font-mono uppercase font-bold text-foreground/70">{form.color}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Custom Auto Color Picker */}
            <label 
              className={cn(
                "size-10 rounded-lg transition-transform cursor-pointer overflow-hidden border-2 flex items-center justify-center relative",
                !COLORS.includes(form.color) ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110 border-transparent" : "border-transparent hover:scale-105"
              )}
              style={{ background: !COLORS.includes(form.color) ? form.color : "linear-gradient(to bottom right, #ff0000, #ffff00, #00ff00, #00ffff)" }}
            >
              <input
                type="color"
                value={!COLORS.includes(form.color) ? form.color : "#ef4444"}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
              />
            </label>
            
            {/* Standard Swatches */}
            {COLORS.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setForm((f) => ({ ...f, color: c }))}
                style={{ background: c }}
                className={cn(
                  "size-10 rounded-lg transition-transform",
                  form.color === c ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"
                )}
              />
            ))}
          </div>
        </div>

        {/* Admin and Access Control */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className={LABEL_STYLE}>
              Folder Administrator <span className="text-rose-500">*</span>
            </Label>
            <Popover open={openStates.admin} onOpenChange={(o) => toggleOpen("admin", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={form.administrator ? "text-foreground font-semibold" : "text-muted-foreground/50"}>
                    {form.administrator || "Select folder administrator"}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <FolderAdminDropdown 
                  selected={form.administrator} 
                  onSelect={(v) => { setForm(f => ({ ...f, administrator: v })); toggleOpen("admin", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className={LABEL_STYLE}>Access Control</Label>
            <Popover open={openStates.access} onOpenChange={(o) => toggleOpen("access", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={TRIGGER_STYLE}>
                  <span className={form.accessControl ? "text-foreground font-semibold" : "text-muted-foreground/50"}>
                    {form.accessControl || "Select access control"}
                  </span>
                  <ChevronDown className="size-4 opacity-40 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <AccessControlDropdown 
                  selected={form.accessControl} 
                  onSelect={(v) => { setForm(f => ({ ...f, accessControl: v })); toggleOpen("access", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className={LABEL_STYLE}>Description</Label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Details..."
            rows={4}
            className="w-full bg-transparent border border-foreground/30 rounded-md px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all custom-scrollbar"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="h-11 px-6 font-bold text-foreground">
            Cancel
          </Button>
          <Button onClick={handleSave} className="h-11 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 text-xs tracking-wide">
            SAVE FOLDER
          </Button>
        </div>

      </div>
    </DashboardModal>
  );
};
