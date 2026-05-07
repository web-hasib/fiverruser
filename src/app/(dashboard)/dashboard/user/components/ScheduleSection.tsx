import React, { useState } from "react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { Plus, Eye, Pencil, Trash2, ClipboardPlus, FilePlus } from "lucide-react";
import { SectionHeader, StatusBadge } from "./DashboardUI";
import { ScheduleItem } from "../types";
import { scheduleData } from "../data";
import CreateTaskModal from "@/src/components/features/user/task/CreateTaskModal";
import StartNewSessionModal from "@/src/components/features/user/cases/StartNewSessionModal";
import { AddKnowledgeModal } from "@/src/components/features/user/knowledge-base/AddKnowledgeModal";
import { InlineSelect } from "@/src/components/InlineSelect";
import { Checkbox } from "@/src/components/ui/checkbox";
import { cn } from "@/src/lib/utils";

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];
const STATUS_OPTIONS = ["Overdue", "Complete", "In Progress", "To Do"];

const initialStyleMap: Record<string, string> = {
  High: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Overdue: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Complete: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "In Progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "To Do": "bg-sky-500/10 text-sky-500 border-sky-500/20",
};

export const ScheduleSection = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [data, setData] = useState(scheduleData);
  const [styleMap, setStyleMap] = useState(initialStyleMap);

  const handleUpdate = (index: number, field: keyof ScheduleItem, value: string) => {
    setData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleColorChange = (opt: string, colorClass: string) => {
    setStyleMap((prev) => ({ ...prev, [opt]: colorClass }));
  };

  const scheduleColumns: ColumnDef<ScheduleItem>[] = [
    {
      header: "Task Title",
      cell: (item, index) => (
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={item.status === "Complete"} 
            onCheckedChange={() => handleUpdate(index, "status", item.status === "Complete" ? "To Do" : "Complete")}
            className="border-primary-foreground/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
          />
          <div onClick={() => setIsTaskModalOpen(true)} className="cursor-pointer group">
            <p className={cn(
              "text-xs font-semibold text-foreground/90 group-hover:text-blue-500 transition-colors",
              item.status === "Complete" && "line-through text-foreground/40"
            )}>
              {item.title}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Due Date & Time",
      cell: (item) => (
        <span className="text-[11px] text-muted-foreground font-medium">
          {item.date}
        </span>
      ),
    },
    {
      header: "Patient Name",
      cell: (item) => (
        <div className="flex flex-col items-center min-w-[140px]">
          <span className="text-xs font-bold text-foreground">
            {item.patient.name}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">
            DOB: {item.patient.dob} | {item.patient.gender}
          </span>
        </div>
      ),
    },
    {
      header: "Priority",
      cell: (item, index) => (
        <div className="flex justify-center">
          <InlineSelect
            value={item.priority}
            options={PRIORITY_OPTIONS}
            onChange={(val) => handleUpdate(index, "priority", val)}
            onColorChange={handleColorChange}
            styleMap={styleMap}
            asBadge
            align="center"
          />
        </div>
      ),
    },
    {
      header: "Specialty",
      cell: (item) => (
        <div className="text-center text-[11px] text-muted-foreground font-semibold">
          {item.specialty}
        </div>
      ),
    },
    {
      header: "Case ID",
      cell: (item) => (
        <div className="text-center font-mono text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border">
          {item.caseId}
        </div>
      ),
    },
    {
      header: "Assigned To",
      cell: (item) => (
        <div className="flex items-center justify-center -space-x-2">
          {item.assigned.map((a, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-primary border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-sm ring-1 ring-border cursor-help"
              title={a.name}
            >
              {a.initial}
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (item, index) => (
        <div className="flex justify-center">
          <InlineSelect
            value={item.status}
            options={STATUS_OPTIONS}
            onChange={(val) => handleUpdate(index, "status", val)}
            onColorChange={handleColorChange}
            styleMap={styleMap}
            asBadge
            align="center"
          />
        </div>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center justify-end gap-3 text-muted-foreground/60">
          <Trash2
            size={16}
            className="cursor-pointer hover:text-destructive transition-colors"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-none">
      <SectionHeader
        title="Today's Schedule"
        className="px-4 pt-4"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              className="h-9 px-4 bg-blue-600 hover:bg-blue-700 border-none shadow-blue-500/20"
              onClick={() => setIsSessionModalOpen(true)}
            >
              <Plus size={16} /> NEW SESSION
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 border-none shadow-emerald-500/20"
              onClick={() => setIsTaskModalOpen(true)}
            >
              <ClipboardPlus size={16} /> NEW TASK
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="h-9 px-4 bg-purple-600 hover:bg-purple-700 border-none shadow-purple-500/20"
              onClick={() => setIsNoteModalOpen(true)}
            >
              <FilePlus size={16} /> NEW NOTE
            </Button>
          </div>
        }
      />
      <DataTable
        columns={scheduleColumns}
        data={data}
        className="border-none bg-transparent"
      />

      {/* Modern Modals */}
      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={(data) => {
          console.log("Saving Task:", data);
          setIsTaskModalOpen(false);
        }}
      />

      <StartNewSessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />

      <AddKnowledgeModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={(data) => {
          console.log("Saving Note:", data);
          setIsNoteModalOpen(false);
        }}
      />
    </div>
  );
};
