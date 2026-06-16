"use client";

import React from "react";
import { ProfileSectionCard } from "@/src/components/features/user/patients/profile/ProfileSectionCard";
import { Button } from "@/src/components/ui/button";
import { Copy, Plus, Star, PenTool, CheckSquare, Layers, FileIcon, Trash2, Edit3, ChevronDown } from "lucide-react";
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

// Navigate to a tab by updating the URL hash and firing a popstate event
const navigateToTab = (hash: string) => {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `#${hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
};

type SessionStatus = "Active" | "Completed" | "Pending";
type SessionType = "Emergency" | "Cardiology" | "Surgery" | "Ambulatory" | "Consultation";

const typeStyles: Record<SessionType, string> = {
  Emergency:    "border-rose-500/30 text-rose-500 bg-rose-500/5",
  Cardiology:   "border-amber-500/30 text-amber-500 bg-amber-500/5",
  Surgery:      "border-purple-500/30 text-purple-500 bg-purple-500/5",
  Ambulatory:   "border-blue-500/30 text-blue-500 bg-blue-500/5",
  Consultation: "border-teal-500/30 text-teal-500 bg-teal-500/5",
};

const statusDot: Record<SessionStatus, string> = {
  Active:    "bg-emerald-500",
  Completed: "bg-muted-foreground",
  Pending:   "bg-amber-500",
};

const DUMMY_SESSIONS: {
  id: string;
  name: string;
  status: SessionStatus;
  type: SessionType;
  description: string;
  time: string;
}[] = [
  { id: "sess-001", name: "Saifur Rahman",   status: "Active",    type: "Emergency",    description: "Chest pain, SOB, possible ACS workup.",          time: "12:00 AM" },
  { id: "sess-002", name: "Nadia Islam",     status: "Active",    type: "Cardiology",   description: "Post-CABG follow-up, rhythm monitoring.",        time: "9:30 AM"  },
  { id: "sess-003", name: "Tariq Hossain",   status: "Completed", type: "Surgery",      description: "Pre-op appendectomy assessment completed.",       time: "3:15 PM"  },
];

export const OverviewMainContent = () => {
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
    <div className="flex flex-col gap-4 w-full">
      {/* ─── Patient Summary ─── */}
      <ProfileSectionCard
        title="Patient Summary"
        icon={<Star className="size-4" />}
        iconBg="bg-blue-600/10"
        iconColor="text-blue-600"
        onRefresh={() => {}}
        additionalHeadElement={<span className="text-[10px] text-muted-foreground mr-2 hidden sm:inline">Updated 11:22 AM</span>}
      >
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground font-bold">Wade Warren</strong> (s 29) admitted Feb 10 for acute appendicitis, underwent <strong className="text-foreground font-bold">laparoscopic appendectomy.</strong> Post-op day 3 — wound intact, tolerating soft diet, ambulating with physiotherapy. Pain VAS 3/10, controlled with Ibuprofen. <span className="text-amber-500 font-bold">⚠️ Penicillin allergy (HIGH RISK)</span> — avoid all beta-lactams. Essential hypertension managed, no acute cardiac concerns. Planned discharge Feb 16.
        </p>
      </ProfileSectionCard>

      {/* ─── Related Sessions ─── */}
      <ProfileSectionCard
        title="Related Sessions"
        icon={<PenTool className="size-4" />}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-500"
        showViewAll
        onViewAll={() => navigateToTab("sessions")}
        onRefresh={() => {}}
        actionText="New Session"
        actionIcon={<Plus className="size-3" />}
        onAction={() => {}}
      >
        <div className="flex flex-col gap-1">
          {DUMMY_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="flex items-start justify-between p-3 rounded-xl border border-transparent group"
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  className="size-4 rounded border-border bg-transparent mt-1 cursor-pointer shrink-0"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        (window.location.href = `/dashboard/user/new/session/${session.id}`)
                      }
                      className="text-sm font-bold cursor-pointer text-foreground hover:text-blue-500 hover:underline transition-colors text-left"
                    >
                      {session.name}
                    </button>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                      <div className={`size-1.5 rounded-full ${statusDot[session.status]}`} />
                      {session.status} | ER •
                      <span className={`px-1.5 py-0.5 rounded border ${typeStyles[session.type]}`}>
                        {session.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{session.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{session.time}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-muted-foreground cursor-pointer hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ProfileSectionCard>

      {/* ─── Related Tasks ─── */}
      <ProfileSectionCard
        title="Related Tasks"
        icon={<CheckSquare className="size-4" />}
        iconBg="bg-blue-600/10"
        iconColor="text-blue-600"
        showViewAll
        onViewAll={() => navigateToTab("related-tasks")}
        onRefresh={() => {}}
        actionText="Add Task"
        actionIcon={<Plus className="size-3" />}
        onAction={() => {}}
      >
        <div className="mt-2 text-xs">
          <DataTable columns={taskColumns} data={tasks} className="border-none bg-transparent" />
        </div>
      </ProfileSectionCard>

      {/* ─── Uploaded Files ─── */}
      <ProfileSectionCard
        title="Uploaded Files"
        icon={<Layers className="size-4" />}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-500"
        showViewAll
        onViewAll={() => navigateToTab("files")}
        onRefresh={() => {}}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["NID Frontside", "Medical Certificate", "Surgery", "Cardiology", "Surgery", "Neurology"].map((name, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/30 cursor-pointer transition-colors">
              <div className="size-8 bg-white/5 rounded flex items-center justify-center text-teal-400">
                <FileIcon className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">{name}</span>
                <span className="text-[10px] text-muted-foreground">23.5MB</span>
              </div>
            </div>
          ))}
        </div>
      </ProfileSectionCard>

    </div>
  );
};
