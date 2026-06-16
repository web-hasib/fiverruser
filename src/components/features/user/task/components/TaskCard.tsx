"use client";

import React from "react";
import { Pencil, Trash2, Calendar, Clock } from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "../types";
import { cn } from "@/src/lib/utils";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
  onToggleComplete?: (taskId: string) => void;
  onUpdatePriority?: (taskId: string, priority: TaskPriority) => void;
  onUpdateStatus?: (taskId: string, status: TaskStatus) => void;
}

const PRIORITY_OPTIONS: TaskPriority[] = ["High", "Medium", "Low", "None"];
const STATUS_OPTIONS: TaskStatus[] = ["To Do", "In Progress", "Complete", "Overdue"];

const priorityConfig = {
  High: { bg: "bg-rose-500/15", text: "text-rose-500", border: "border-rose-500/30" },
  Medium: { bg: "bg-amber-500/15", text: "text-amber-500", border: "border-amber-500/30" },
  Low: { bg: "bg-emerald-500/15", text: "text-emerald-500", border: "border-emerald-500/30" },
  None: { bg: "bg-gray-500/15", text: "text-gray-500", border: "border-gray-500/30" },
};

const statusConfig = {
  Overdue: { bg: "bg-rose-500/15", text: "text-rose-500", dot: "bg-rose-500" },
  "In Progress": { bg: "bg-blue-500/15", text: "text-blue-500", dot: "bg-blue-500" },
  Complete: { bg: "bg-emerald-500/15", text: "text-emerald-500", dot: "bg-emerald-500" },
  "To Do": { bg: "bg-amber-500/15", text: "text-amber-500", dot: "bg-amber-500" },
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onView,
  onToggleComplete,
  onUpdatePriority,
  onUpdateStatus
}: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  const firstPatient = Array.isArray(task.patientName) ? task.patientName[0] || "" : task.patientName;
  const patientNameStr = Array.isArray(task.patientName) ? task.patientName.join(", ") : task.patientName;
  const patientInitials = firstPatient.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-primary border border-primary-foreground/20 rounded-xl p-4 flex flex-col gap-3 hover:border-primary-foreground/30 transition-colors">
      {/* Header: Title + Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Checkbox
            checked={task.status === "Complete"}
            onCheckedChange={() => onToggleComplete?.(task.id)}
            className="mt-0.5 border-primary-foreground/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
          />
          <h3
            onClick={() => onEdit(task)}
            className={cn(
              "text-sm font-medium text-primary-foreground line-clamp-2 cursor-pointer hover:text-blue-500 transition-colors",
              task.status === "Complete" && "line-through text-primary-foreground/40"
            )}
          >
            {task.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onDelete(task)}
            className="size-7 rounded-lg flex items-center justify-center text-primary-foreground/50 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 text-xs text-primary-foreground/50">
        <Calendar className="size-3.5" />
        <span>{task.dueDate}</span>
      </div>

      {/* Patient Info */}
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
          {patientInitials}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-blue-500 font-medium truncate">{patientNameStr}</p>
          <p className="text-xs text-primary-foreground/40">{task.patientId}</p>
        </div>
      </div>

      {/* Badges Row */}
      <div className="flex items-center gap-2 pt-1">
        {/* Priority Badge */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className={cn(
              "px-2 py-1 rounded-lg text-xs font-medium border cursor-pointer hover:opacity-80 transition-all flex items-center gap-1",
              priority.bg, priority.text, priority.border
            )}>
              {task.priority}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#1e293b] border-white/10">
            {PRIORITY_OPTIONS.map((p) => (
              <DropdownMenuItem
                key={p}
                onClick={() => onUpdatePriority?.(task.id, p)}
                className="text-white hover:bg-white/10 cursor-pointer text-xs font-bold"
              >
                {p}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Badge */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium cursor-pointer hover:opacity-80 transition-all",
              status.bg, status.text
            )}>
              <span className={cn("size-1.5 rounded-full", status.dot)} />
              {task.status}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#1e293b] border-white/10">
            {STATUS_OPTIONS.map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => onUpdateStatus?.(task.id, s)}
                className="text-white hover:bg-white/10 cursor-pointer text-xs font-bold"
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Folder & Assigned */}
      <div className="flex items-center justify-between pt-2 border-t border-primary-foreground/20">
        <span className="text-xs text-primary-foreground/50">{task.folderName}</span>
        <div className="flex -space-x-1.5">
          {task.assignedTo.slice(0, 3).map((name, i) => (
            <div
              key={i}
              className={cn(
                "size-6 rounded-full border border-primary flex items-center justify-center text-[9px] font-bold text-white",
                i === 0 ? "bg-blue-600" : i === 1 ? "bg-indigo-600" : "bg-purple-600"
              )}
            >
              {name.split(' ').map(n => n[0]).join('')}
            </div>
          ))}
          {task.assignedTo.length > 3 && (
            <div className="size-6 rounded-full border border-primary bg-primary-foreground/10 flex items-center justify-center text-[9px] font-bold text-primary-foreground/60">
              +{task.assignedTo.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
