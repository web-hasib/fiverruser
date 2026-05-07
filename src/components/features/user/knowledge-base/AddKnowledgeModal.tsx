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
import { 
  Search, Check, Plus, 
  Dna, Brain, Stethoscope, Pill, Wind, Image as ImageIcon,
  ChevronDown, FileText
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Static Data ────────────────────────────────────────────────────────────
const ENTRY_TYPES = [
  "Note", "Protocol", "Policy", "Guideline", "Reference", "Upload File"
];

const DEFAULT_SPECIALTIES = [
  { id: "1", label: "General Medicine", icon: Dna },
  { id: "2", label: "Neurology", icon: Brain },
  { id: "3", label: "Dentistry", icon: Stethoscope },
  { id: "4", label: "Pharmacy / Medication", icon: Pill },
  { id: "5", label: "Pulmonology (Lungs)", icon: Wind },
];

const DEFAULT_FOLDERS = [
  { id: "1", label: "General Notes" },
  { id: "2", label: "Patient Docs" },
  { id: "3", label: "Research" },
];

const VISIBILITY_OPTIONS = ["Private", "Public", "Shared", "Team Only"];

// ─── Shared Styles ──────────────────────────────────────────────────────────
const INPUT_STYLE = cn(
  "w-full h-11 px-4 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/50",
  "bg-background border-border text-foreground placeholder:text-muted-foreground/50",
);

const TRIGGER_STYLE = cn(
  "w-full h-11 px-4 rounded-xl border text-sm text-left flex items-center justify-between transition-all cursor-pointer outline-none",
  "bg-background border-border text-foreground hover:border-muted-foreground/30",
);

const PANEL = "p-0 w-[280px] bg-card border-border shadow-2xl rounded-xl overflow-hidden";
const SEARCH_INPUT = cn(
  "w-full h-9 pl-9 pr-3 rounded-md border text-xs transition-all focus:outline-none",
  "bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-blue-500/50",
);

// ─── Dropdown Components ────────────────────────────────────────────────────

function SpecialtyDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [items, setItems] = useState(DEFAULT_SPECIALTIES);
  
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setItems((p) => [...p, { id: Date.now().toString(), label: newVal.trim(), icon: Dna }]);
    onSelect(newVal.trim());
    setNewVal(""); setAdding(false);
  };

  return (
    <div className="flex flex-col">
      <div className="px-3 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
          <input className={SEARCH_INPUT} placeholder="Search by name, patient id" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} onClick={() => onSelect(item.label)}
              className="flex items-center justify-between px-4 py-2.5 text-[13px] font-semibold text-foreground hover:bg-muted/50 cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                <Icon className="size-4 text-pink-500 group-hover:text-blue-500 transition-colors" />
                <span>{item.label}</span>
              </div>
              {selected === item.label && <Check className="size-4 text-blue-500" />}
            </div>
          );
        })}
      </div>
      {adding ? (
        <div className="border-t border-border px-4 py-3 space-y-3">
          <p className="text-xs font-bold text-foreground">Add New Specialty</p>
          <div className="flex gap-2">
            <div className="size-9 shrink-0 flex items-center justify-center border border-border rounded-md bg-transparent">
              <ImageIcon className="size-4 text-muted-foreground" />
            </div>
            <input autoFocus placeholder="Enter Specialty name" value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              className="w-full h-9 px-3 rounded-md border text-xs bg-transparent border-border text-foreground focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button onClick={() => setAdding(false)} className="text-[11px] font-semibold text-foreground hover:text-muted-foreground px-2">Cancel</button>
            <button onClick={handleCreate} className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase rounded border-0 shadow-sm">CREATE NEW</button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3 text-[13px] font-semibold text-blue-500 hover:text-blue-600 cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-4" /><span>Add New Specialty</span>
        </div>
      )}
    </div>
  );
}

function FolderDropdown({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [items, setItems] = useState(DEFAULT_FOLDERS);
  
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  const handleCreate = () => {
    if (!newVal.trim()) return;
    setItems((p) => [...p, { id: Date.now().toString(), label: newVal.trim() }]);
    onSelect(newVal.trim());
    setNewVal(""); setAdding(false);
  };

  return (
    <div className="flex flex-col">
      <div className="px-3 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
          <input className={SEARCH_INPUT} placeholder="Search folder name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="max-h-[200px] overflow-y-auto custom-scrollbar pt-1">
        {filtered.map((item) => (
          <div key={item.id} onClick={() => onSelect(item.label)}
            className="flex items-center justify-between px-4 py-2 text-[13px] font-semibold text-foreground hover:bg-muted/50 cursor-pointer transition-colors">
            <span>{item.label}</span>
            {selected === item.label && <Check className="size-4 text-blue-500" />}
          </div>
        ))}
      </div>
      {adding ? (
        <div className="border-t border-border px-4 py-3 space-y-3 mt-1">
          <p className="text-xs font-bold text-foreground">Add New Folder</p>
          <input autoFocus placeholder="Enter folder name" value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            className="w-full h-9 px-3 rounded-md border text-xs bg-transparent border-border text-foreground focus:outline-none focus:border-blue-500/50" />
          <div className="flex gap-2 justify-end pt-1">
            <button onClick={() => setAdding(false)} className="text-[11px] font-semibold text-foreground  hover:text-muted-foreground px-2">Cancel</button>
            <button onClick={handleCreate} className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase rounded shadow-sm">CREATE NEW</button>
          </div>
        </div>
      ) : (
        <div onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-3 mt-1 text-[13px] font-semibold text-blue-500 hover:text-blue-600 cursor-pointer border-t border-border hover:bg-muted/30 transition-colors">
          <Plus className="size-4" /><span>Add New Folder</span>
        </div>
      )}
    </div>
  );
}

function SimpleSelect({ options, selected, onSelect }: { options: string[], selected: string, onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-col py-1">
      {options.map((opt) => (
        <div key={opt} onClick={() => onSelect(opt)}
             className="flex items-center justify-between px-4 py-2 text-[13px] font-semibold text-foreground hover:bg-muted/50 cursor-pointer transition-colors">
          <span>{opt}</span>
          {selected === opt && <Check className="size-4 text-blue-500" />}
        </div>
      ))}
    </div>
  );
}

// ─── Main Modal Component ───────────────────────────────────────────────────

export interface KnowledgeBaseFormData {
  entryType: string;
  title: string;
  summary: string;
  specialty: string;
  folder: string;
  visibility: string;
  tags: string;
  useAsAiContext: boolean;
}

interface AddKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: KnowledgeBaseFormData) => void;
}

export const AddKnowledgeModal = ({
  isOpen,
  onClose,
  onSave,
}: AddKnowledgeModalProps) => {
  const [entryTypes, setEntryTypes] = useState(ENTRY_TYPES);
  const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);
  const [newType, setNewType] = useState("");

  const [formData, setFormData] = useState<KnowledgeBaseFormData>({
    entryType: "Note",
    title: "",
    summary: "",
    specialty: "",
    folder: "",
    visibility: "Private",
    tags: "",
    useAsAiContext: true,
  });

  const [openStates, setOpenStates] = useState({
    specialty: false,
    folder: false,
    visibility: false,
    tags: false, // In case we make it a dropdown
  });

  const toggleOpen = (field: keyof typeof openStates, state?: boolean) => {
    setOpenStates((prev) => ({ ...prev, [field]: state ?? !prev[field] }));
  };

  const handleChange = <K extends keyof KnowledgeBaseFormData>(field: K, value: KnowledgeBaseFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAddType = () => {
    if (newType.trim() && !entryTypes.includes(newType.trim())) {
        setEntryTypes([...entryTypes, newType.trim()]);
        handleChange("entryType", newType.trim());
        setNewType("");
        setIsAddTypeModalOpen(false);
    }
  };

  return (
    <>
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Entry New Knowledge Base"
      maxWidth="sm:max-w-[700px]"
    >
      <div className="space-y-6 pt-0 pb-2">
        
        {/* Entry Type */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-muted-foreground/70 uppercase tracking-wider block">Entry Type</Label>
          <div className="flex flex-wrap gap-2">
            {entryTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange("entryType", type)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold border transition-all",
                  formData.entryType === type 
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
            <button
                type="button"
                onClick={() => setIsAddTypeModalOpen(true)}
                className="px-3 py-1 rounded-lg text-xs font-semibold border border-dashed border-muted-foreground/30 text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex items-center gap-1"
            >
                <Plus size={12} /> Add Type
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
                {/* Entry Title */}
                <div className="space-y-2">
                    <Label className="text-[13px] font-bold text-foreground block">Entry Title</Label>
                    <Input 
                        placeholder="e.g. Post-cardiac Surgery Anticoagulation Protocol" 
                        className={cn(INPUT_STYLE, "h-11 bg-transparent border-muted-foreground/20 placeholder:text-muted-foreground/70")} 
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>

                {/* Summary */}
                <div className="space-y-2">
                    <Label className="text-[13px] font-bold text-foreground block">Summary</Label>
                    <textarea 
                        placeholder="Brief summary of this entry..." 
                        className={cn(INPUT_STYLE, "h-24 py-3 resize-none bg-transparent border-muted-foreground/20 placeholder:text-muted-foreground/70")}
                        value={formData.summary}
                        onChange={(e) => handleChange("summary", e.target.value)}
                    />
                </div>
            </div>

            {/* File Upload Area - Compact */}
            <div className="space-y-2">
                <Label className="text-[13px] font-bold text-foreground block">Attachments</Label>
                <div className="w-full border border-dashed border-muted-foreground/30 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/5 hover:bg-muted/10 transition-all cursor-pointer group h-[165px]">
                    <div className="p-2 bg-card rounded-lg shadow-sm border border-border group-hover:scale-110 transition-transform">
                        <FileText className="size-5 text-blue-500" />
                    </div>
                    <div className="text-center space-y-0.5">
                        <p className="text-xs font-bold text-foreground">Drag & drop files</p>
                        <p className="text-[10px] text-muted-foreground">JPEG, PNG, PDF up to 50MB</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold mt-1 bg-transparent border-blue-500/30 text-blue-500 hover:bg-blue-500/5">
                        BROWSE FILES
                    </Button>
                </div>
            </div>
        </div>

        {/* Row: Specialty & Folder */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[13px] font-bold text-foreground block">Specialty</Label>
            <Popover open={openStates.specialty} onOpenChange={(o) => toggleOpen("specialty", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={cn(TRIGGER_STYLE, "h-11 bg-transparent border-muted-foreground/20")}>
                  <span className={formData.specialty ? "text-foreground font-medium text-[13px]" : "text-muted-foreground/70 text-[13px]"}>
                    {formData.specialty || "Cardiology"}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <SpecialtyDropdown 
                  selected={formData.specialty} 
                  onSelect={(v) => { handleChange("specialty", v); toggleOpen("specialty", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] font-bold text-foreground block">Folder</Label>
            <Popover open={openStates.folder} onOpenChange={(o) => toggleOpen("folder", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={cn(TRIGGER_STYLE, "h-11 bg-transparent border-muted-foreground/20")}>
                  <span className={formData.folder ? "text-foreground font-medium text-[13px]" : "text-muted-foreground/70 text-[13px]"}>
                    {formData.folder || "Select Folder"}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={PANEL} align="start">
                <FolderDropdown 
                  selected={formData.folder} 
                  onSelect={(v) => { handleChange("folder", v); toggleOpen("folder", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Row: Visibility & Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[13px] font-bold text-foreground block">Visibility</Label>
            <Popover open={openStates.visibility} onOpenChange={(o) => toggleOpen("visibility", o)}>
              <PopoverTrigger asChild>
                <button type="button" className={cn(TRIGGER_STYLE, "h-11 bg-transparent border-muted-foreground/20")}>
                  <span className={formData.visibility ? "text-foreground font-medium text-[13px]" : "text-muted-foreground/70 text-[13px]"}>
                    {formData.visibility || "Private"}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className={cn(PANEL, "w-full min-w-[280px]")} align="start">
                <SimpleSelect 
                  options={VISIBILITY_OPTIONS} 
                  selected={formData.visibility} 
                  onSelect={(v) => { handleChange("visibility", v); toggleOpen("visibility", false); }} 
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] font-bold text-foreground block">Tags <span className="text-muted-foreground font-normal ml-0.5">(Comma Separated)</span></Label>
            <div className="relative">
              <Input 
                placeholder="e.g. anticoag, post-op, NOAC" 
                className={cn(INPUT_STYLE, "h-11 pr-10 bg-transparent border-muted-foreground/20 placeholder:text-muted-foreground/70")} 
                value={formData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-3 pt-2">
          <input 
            type="checkbox" 
            checked={formData.useAsAiContext} 
            onChange={(e) => handleChange("useAsAiContext", e.target.checked)}
            className="size-4 rounded-sm border-0 text-blue-600 focus:ring-blue-600 focus:ring-offset-background bg-blue-600 cursor-pointer accent-blue-600"
            id="ai-context-checkout"
          />
          <Label htmlFor="ai-context-checkout" className="text-sm font-medium text-foreground cursor-pointer">
            Use as AI context in Scriber sessions
          </Label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t-0 border-border/40 mt-6">
          <Button 
            variant="ghost" 
            type="button" 
            onClick={onClose}
            className="text-foreground font-bold px-6 hover:bg-muted"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 rounded-lg font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-sm"
          >
            SAVE ENTRY
          </Button>
        </div>

      </div>
    </DashboardModal>

    {/* Sub-modal to add new Type */}
    <DashboardModal
        isOpen={isAddTypeModalOpen}
        onClose={() => setIsAddTypeModalOpen(false)}
        title="Add New Entry Type"
        maxWidth="sm:max-w-[400px]"
    >
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-[13px] font-bold text-foreground">Type Name</Label>
                <Input 
                    placeholder="Enter type name..."
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className={INPUT_STYLE}
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleAddType()}
                />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsAddTypeModalOpen(false)}>Cancel</Button>
                <Button onClick={handleAddType} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">ADD TYPE</Button>
            </div>
        </div>
    </DashboardModal>
    </>
  );
};
