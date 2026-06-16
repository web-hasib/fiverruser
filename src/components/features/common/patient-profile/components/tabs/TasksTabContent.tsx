"use client";

import React from "react";
import { ProfileSectionCard } from "@/src/components/features/user/patients/profile/ProfileSectionCard";
import { CheckSquare, Plus, ChevronDown } from "lucide-react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { cn } from "@/src/lib/utils";
import { InlineSelect } from "@/src/components/InlineSelect";
import { useState, useMemo } from "react";

interface TaskItem {
  id: string;
  title: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  folderName: string;
  status: "Overdue" | "Pending" | "Done";
  assignedTo: {
    name: string;
    initials: string[];
  };
}

const DUMMY_TASKS: TaskItem[] = [
  { 
    id: "1", 
    title: "Cardiology Discharge Template", 
    date: "Today, 09:00 AM", 
    priority: "High", 
    folderName: "Medical", 
    status: "Overdue", 
    assignedTo: { name: "Cameron W", initials: ["CW", "LA"] } 
  },
  { 
    id: "2", 
    title: "Review Blood Test Results", 
    date: "Today, 11:30 AM", 
    priority: "Medium", 
    folderName: "Follow-up", 
    status: "Overdue", 
    assignedTo: { name: "Theresa Webb", initials: ["TW"] } 
  },
  { 
    id: "3", 
    title: "Schedule Physiotherapy", 
    date: "Tomorrow, 10:00 AM", 
    priority: "Low", 
    folderName: "Rehab", 
    status: "Pending", 
    assignedTo: { name: "Arlene McCoy", initials: ["AM"] } 
  },
  { 
    id: "4", 
    title: "Follow-up call — Hard...", 
    date: "16/03/26 | 9:12 AM", 
    priority: "Medium", 
    folderName: "General", 
    status: "Pending", 
    assignedTo: { name: "Ronald Richards", initials: ["RR"] } 
  },
  { 
    id: "5", 
    title: "Update Medication List", 
    date: "16/03/26 | 9:12 AM", 
    priority: "Low", 
    folderName: "Pharmacy", 
    status: "Done", 
    assignedTo: { name: "Bessie Cooper", initials: ["BC"] } 
  },
];

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];
const TASK_STATUS_OPTIONS = ["Overdue", "Pending", "Done"];

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

const TASK_STATUS_STYLES: Record<string, string> = {
  Overdue: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Pending: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Done: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export const TasksTabContent = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(DUMMY_TASKS);

  const handleUpdateTask = (id: string, field: keyof TaskItem, value: any) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const taskColumns = useMemo<ColumnDef<TaskItem>[]>(() => [
    {
      header: "Task Title",
      cell: (item) => (
        <div className="flex items-center gap-3 font-semibold text-foreground min-w-[200px]">
          <input type="checkbox" className="size-4 rounded border-border bg-transparent cursor-pointer" />
          {item.title}
        </div>
      ),
    },
    {
      header: "Due Date & Time",
      cell: (item) => <span className="text-muted-foreground whitespace-nowrap">{item.date}</span>,
    },
    {
      header: "Priority",
      cell: (item) => (
        <InlineSelect
          value={item.priority}
          options={PRIORITY_OPTIONS}
          onChange={(val) => handleUpdateTask(item.id, "priority", val)}
          styleMap={PRIORITY_STYLES}
          asBadge
          align="start"
        />
      ),
    },
    {
      header: "Folder Name",
      cell: (item) => <span className="text-muted-foreground">{item.folderName}</span>,
    },
    {
      header: "Status",
      cell: (item) => (
        <InlineSelect
          value={item.status}
          options={TASK_STATUS_OPTIONS}
          onChange={(val) => handleUpdateTask(item.id, "status", val)}
          styleMap={TASK_STATUS_STYLES}
          asBadge
          align="start"
        />
      ),
    },
    {
      header: "Assigned To",
      cell: (item) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="flex -space-x-2">
            {item.assignedTo.initials.map((init, i) => (
              <div key={i} className="size-6 rounded-full border-2 border-background bg-blue-600 flex items-center justify-center text-white text-[8px] font-black">
                {init}
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">{item.assignedTo.name}</span>
        </div>
      ),
    },
  ], [tasks]);

  return (
    <ProfileSectionCard
      title="Related Tasks"
      icon={<CheckSquare className="size-4" />}
      iconBg="bg-blue-600/10"
      iconColor="text-blue-600"
      showViewAll
      onViewAll={() => {}}
      onRefresh={() => {}}
      actionText="Add Task"
      actionIcon={<Plus className="size-3" />}
      onAction={() => {}}
    >
      <div className="mt-2 text-xs w-full">
        <DataTable columns={taskColumns} data={tasks} className="border-none bg-transparent" />
      </div>
    
    </ProfileSectionCard>
  );
};
