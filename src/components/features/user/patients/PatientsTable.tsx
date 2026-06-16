"use client";

import React from "react";
import { ArrowUpDown, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { InlineSelect } from "@/src/components/InlineSelect";

export interface Patient {
  id: string;
  name: string;
  patientId: string;
  dob: string;
  category: string;
  status: string;
  type: string;
  date: string;
  sessions: string;
}

interface PatientsTableProps {
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

export const PatientsTable = ({
  patients,
  onDelete,
  onView,
  onUpdate,
  selectedIds,
  onSelectionChange,
}: PatientsTableProps) => {
  const [categories, setCategories] = React.useState(CATEGORY_OPTIONS);
  const [statuses, setStatuses] = React.useState(STATUS_OPTIONS);
  const [types, setTypes] = React.useState(TYPE_OPTIONS);
  const [styleMap, setStyleMap] = React.useState(statusStyleMap);
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Patient; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof Patient) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = React.useMemo(() => {
    if (!sortConfig) return patients;
    return [...patients].sort((a, b) => {
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [patients, sortConfig]);

  const SortIcon = ({ columnKey }: { columnKey: keyof Patient }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="ml-2 size-3.5 opacity-30" />;
    return sortConfig.direction === "asc" ? <ChevronUp className="ml-2 size-3.5 text-blue-500" /> : <ChevronDown className="ml-2 size-3.5 text-blue-500" />;
  };

  const SortableHeader = ({ label, columnKey, children }: { label?: string; columnKey: keyof Patient; children?: React.ReactNode }) => (
    <div 
      className="flex items-center cursor-pointer hover:text-blue-500 transition-colors group" 
      onClick={() => handleSort(columnKey)}
    >
      {children || label}
      <SortIcon columnKey={columnKey} />
    </div>
  );

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

  const toggleAll = () => {
    if (selectedIds.length === patients.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(patients.map(p => p.id));
    }
  };

  const toggleOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(i => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const columns: ColumnDef<Patient>[] = [
    {
      header: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="size-4 rounded border-border  cursor-pointer"
            checked={selectedIds.length === patients.length && patients.length > 0}
            onChange={toggleAll}
          />
          <SortableHeader label="Patient Name" columnKey="name" />
        </div>
      ) as any,
      cell: (item) => (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="size-4 rounded border-border  cursor-pointer"
            checked={selectedIds.includes(item.id)}
            onChange={() => toggleOne(item.id)}
          />
          <div className="size-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
            {item.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <p
              onClick={() => onView(item.id)}
              className="text-sm font-bold text-blue-600 hover:underline cursor-pointer truncate"
            >
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground/60">{item.patientId}</p>
          </div>
        </div>
      ),
    },
    { header: "DOB", accessorKey: "dob" },
    {
      header: (
        <SortableHeader label="Category" columnKey="category" />
      ) as any,
      cell: (item) => (
        <InlineSelect
          value={item.category}
          options={categories}
          onChange={(val) => onUpdate(item.id, "category", val)}
          onAddOption={(val) => {
            setCategories(prev => [...prev, val]);
            onUpdate(item.id, "category", val);
          }}
          onEditOption={(oldVal, newVal) => handleEditOption("category", oldVal, newVal)}
          onDeleteOption={(val) => handleDeleteOption("category", val)}
          align="start"
        />
      ),
    },
    {
      header: (
        <SortableHeader label="Status" columnKey="status" />
      ) as any,
      cell: (item) => (
        <InlineSelect
          value={item.status}
          options={statuses}
          onChange={(val) => onUpdate(item.id, "status", val)}
          onAddOption={(val) => {
            setStatuses(prev => [...prev, val]);
            onUpdate(item.id, "status", val);
          }}
          onEditOption={(oldVal, newVal) => handleEditOption("status", oldVal, newVal)}
          onDeleteOption={(val) => handleDeleteOption("status", val)}
          onColorChange={handleColorChange}
          styleMap={styleMap}
          asBadge
          align="start"
        />
      ),
    },
    {
      header: (
        <SortableHeader label="Type" columnKey="type" />
      ) as any,
      cell: (item) => (
        <InlineSelect
          value={item.type}
          options={types}
          onChange={(val) => onUpdate(item.id, "type", val)}
          onAddOption={(val) => {
            setTypes(prev => [...prev, val]);
            onUpdate(item.id, "type", val);
          }}
          onEditOption={(oldVal, newVal) => handleEditOption("type", oldVal, newVal)}
          onDeleteOption={(val) => handleDeleteOption("type", val)}
          align="start"
        />
      ),
    },
    { header: "Entry Date", accessorKey: "date" },
    {
      header: "Sessions",
      cell: (item) => (
        <div className="text-center">
          <button className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border",
            item.sessions === "N/A"
              ? "bg-muted text-muted-foreground border-transparent"
              : "bg-blue-600/5 text-blue-600 border-blue-600/20 hover:bg-blue-600 hover:text-white"
          )}>
            {item.sessions}
          </button>
        </div>
      ),
    },
    {
      header: "Action",
      cell: (item) => (
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground/40 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl overflow-hidden border border-border/50">
      <DataTable
        columns={columns}
        data={sortedPatients}
        className="border-none bg-transparent"
      />
    </div>
  );
};
