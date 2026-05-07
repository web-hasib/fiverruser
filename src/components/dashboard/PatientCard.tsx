"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Patient } from "@/src/types/patient";
import { useRouter } from "next/navigation";
import { InlineSelect } from "@/src/components/InlineSelect";

interface PatientCardProps {
  patient: Patient;
  onDelete?: (id: string) => void;
  statusStyles?: Record<string, string>;
  mockAvatar?: string;
  mockName?: string;
  onUpdate?: (id: string, field: keyof Patient, value: any) => void;
  categories?: string[];
  statuses?: string[];
  onAddCategory?: (val: string) => void;
  onAddStatus?: (val: string) => void;
  onEditOption?: (field: 'category' | 'status' | 'type', oldVal: string, newVal: string) => void;
  onDeleteOption?: (field: 'category' | 'status' | 'type', val: string) => void;
  onColorChange?: (opt: string, colorClass: string) => void;
  styleMap?: Record<string, string>;
}

export function PatientCard({ 
  patient, 
  onDelete, 
  statusStyles, 
  mockAvatar, 
  mockName,
  onUpdate,
  categories = [],
  statuses = [],
  onAddCategory,
  onAddStatus,
  onEditOption,
  onDeleteOption,
  onColorChange,
  styleMap
}: PatientCardProps) {
  const router = useRouter();
  const statusVal = patient.status === "Draft" ? "Pre-surgery" : (patient.status === "Pending" ? "Under treatment" : patient.status);

  return (
    <div className="group relative bg-card p-5 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/20">
          {mockAvatar || "CW"}
        </div>
        <button 
          onClick={() => onDelete?.(patient.id)}
          className="text-muted-foreground/30 hover:text-rose-500 transition-colors p-1"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <h3 
          onClick={() => router.push(`/dashboard/user/patients/${patient.id}`)}
          className="text-sm font-bold text-blue-500 hover:underline cursor-pointer transition-colors"
        >
          {mockName || patient.name}
        </h3>
        <p className="text-[10px] text-muted-foreground/60 font-medium tracking-tight uppercase">ID: {patient.patientId}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <InlineSelect
          value={statusVal}
          options={statuses}
          onChange={(val) => onUpdate?.(patient.id, "status", val)}
          onAddOption={onAddStatus}
          onEditOption={(old, newVal) => onEditOption?.("status", old, newVal)}
          onDeleteOption={(val) => onDeleteOption?.("status", val)}
          onColorChange={onColorChange}
          styleMap={styleMap || statusStyles}
          asBadge
          align="start"
        />
        <InlineSelect
          value={patient.category}
          options={categories}
          onChange={(val) => onUpdate?.(patient.id, "category", val)}
          onAddOption={onAddCategory}
          onEditOption={(old, newVal) => onEditOption?.("category", old, newVal)}
          onDeleteOption={(val) => onDeleteOption?.("category", val)}
          align="start"
        />
      </div>

      <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
        <div className="space-y-0.5">
          <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">DOB</p>
          <p className="text-[10px] font-medium text-foreground">{patient.dob || "12/19/2005"}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Sessions</p>
          <p className="text-[10px] font-medium text-purple-400">{patient.sessions || "View 2"}</p>
        </div>
      </div>
    </div>
  );
}
