"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { Trash2, MoreHorizontal } from "lucide-react";
import { Patient } from "./PatientsTable";
import { InlineSelect } from "@/src/components/InlineSelect";

interface PatientGridProps {
  patients: Patient[];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onUpdate: (id: string, field: keyof Patient, value: string) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

const statusStyleMap: Record<string, string> = {
  "Pre-surgery":       "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  "Post-op review":    "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "Under treatment":   "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
  "Skin test pending": "bg-teal-500/10 text-teal-500 border-teal-500/30",
};

const CATEGORY_OPTIONS = ["Urgent Sessions", "Post Surgery", "VIP Patients", "Follow-up Group"];
const STATUS_OPTIONS   = ["Pre-surgery", "Post-op review", "Under treatment", "Skin test pending"];
const TYPE_OPTIONS     = ["New", "Returning", "Follow-up", "Emergency", "Outpatient"];

export const PatientGrid = ({
  patients,
  onDelete,
  onView,
  onUpdate,
}: PatientGridProps) => {
  const [categories, setCategories] = React.useState(CATEGORY_OPTIONS);
  const [statuses, setStatuses] = React.useState(STATUS_OPTIONS);
  const [types, setTypes] = React.useState(TYPE_OPTIONS);
  const [styleMap, setStyleMap] = React.useState(statusStyleMap);

  const handleEditOption = (field: 'category' | 'status' | 'type', oldVal: string, newVal: string) => {
    const setters = { category: setCategories, status: setStatuses, type: setTypes };
    setters[field](prev => prev.map(o => o === oldVal ? newVal : o));
  };

  const handleDeleteOption = (field: 'category' | 'status' | 'type', val: string) => {
    const setters = { category: setCategories, status: setStatuses, type: setTypes };
    setters[field](prev => prev.filter(o => o !== val));
  };

  const handleColorChange = (opt: string, colorClass: string) => {
    setStyleMap(prev => ({ ...prev, [opt]: colorClass }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {patients.map((p) => (
        <div key={p.id} className="bg-card rounded-xl border border-border/50 p-5 group hover:border-blue-500/50 transition-all hover:shadow-md flex flex-col gap-4">

          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-extrabold text-base shadow-inner shrink-0">
              {p.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="size-7 text-muted-foreground/40 hover:text-rose-500" onClick={() => onDelete(p.id)}>
                <Trash2 className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="size-7 text-muted-foreground/40">
                <MoreHorizontal className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Name */}
          <div>
            <h3
              onClick={() => onView(p.id)}
              className="text-base font-extrabold text-blue-600 hover:underline cursor-pointer truncate tracking-tight"
            >
              {p.name}
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-0.5">{p.patientId}</p>
          </div>

          {/* Editable fields */}
          <div className="flex flex-col gap-3">
            {/* Category */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter shrink-0">Category</span>
              <InlineSelect
                value={p.category}
                options={categories}
                onChange={(val) => onUpdate(p.id, "category", val)}
                onAddOption={(val) => {
                  setCategories(prev => [...prev, val]);
                  onUpdate(p.id, "category", val);
                }}
                onEditOption={(oldVal, newVal) => handleEditOption("category", oldVal, newVal)}
                onDeleteOption={(val) => handleDeleteOption("category", val)}
                align="end"
              />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter shrink-0">Status</span>
              <InlineSelect
                value={p.status}
                options={statuses}
                onChange={(val) => onUpdate(p.id, "status", val)}
                onAddOption={(val) => {
                  setStatuses(prev => [...prev, val]);
                  onUpdate(p.id, "status", val);
                }}
                onEditOption={(oldVal, newVal) => handleEditOption("status", oldVal, newVal)}
                onDeleteOption={(val) => handleDeleteOption("status", val)}
                onColorChange={handleColorChange}
                styleMap={styleMap}
                asBadge
                align="end"
              />
            </div>

            {/* Type */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter shrink-0">Type</span>
              <InlineSelect
                value={p.type}
                options={types}
                onChange={(val) => onUpdate(p.id, "type", val)}
                onAddOption={(val) => {
                  setTypes(prev => [...prev, val]);
                  onUpdate(p.id, "type", val);
                }}
                onEditOption={(oldVal, newVal) => handleEditOption("type", oldVal, newVal)}
                onDeleteOption={(val) => handleDeleteOption("type", val)}
                align="end"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-extrabold mb-0.5">Entry Date</span>
              <span className="text-[12px] font-bold text-foreground/90">{p.date}</span>
            </div>
            <button className="px-3 py-1.5 rounded-full bg-blue-600/5 text-blue-600 border border-blue-600/20 text-[10px] font-extrabold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              {p.sessions}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
