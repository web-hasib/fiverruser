import React from "react";
import { ProfileSectionCard } from "@/src/components/features/user/patients/profile/ProfileSectionCard";
import { CheckSquare, Plus } from "lucide-react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";

interface TaskItem {
  id: string;
  title: string;
  date: string;
  patientInitials: string;
  patientName: string;
  patientId: string;
}

const DUMMY_TASKS: TaskItem[] = [
  { id: "1", title: "Follow-up call — Hard...", date: "16/03/26 | 9:12 AM", patientInitials: "CW", patientName: "Ronald Richards", patientId: "MED-XXXX" },
  { id: "2", title: "Follow-up call — Hard...", date: "16/03/26 | 9:12 AM", patientInitials: "CW", patientName: "Ronald Richards", patientId: "MED-XXXX" },
  { id: "3", title: "Follow-up call — Hard...", date: "16/03/26 | 9:12 AM", patientInitials: "CW", patientName: "Ronald Richards", patientId: "MED-XXXX" },
  { id: "4", title: "Follow-up call — Hard...", date: "16/03/26 | 9:12 AM", patientInitials: "CW", patientName: "Ronald Richards", patientId: "MED-XXXX" },
  { id: "5", title: "Follow-up call — Hard...", date: "16/03/26 | 9:12 AM", patientInitials: "CW", patientName: "Ronald Richards", patientId: "MED-XXXX" },
];

const taskColumns: ColumnDef<TaskItem>[] = [
  {
    header: "Task Title",
    cell: (item) => (
      <div className="flex items-center gap-3 font-semibold text-foreground">
        <input type="checkbox" className="size-4 rounded border-border bg-transparent cursor-pointer" />
        {item.title}
      </div>
    ),
  },
  {
    header: "Due Date & Time",
    cell: (item) => <span className="text-muted-foreground">{item.date}</span>,
  },
  {
    header: "Patient Name",
    cell: (item) => (
      <div className="flex items-center gap-2">
        <div className="size-5 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-[8px]">{item.patientInitials}</div>
        <div className="flex flex-col">
          <span className="text-blue-500 font-bold">{item.patientName}</span>
          <span className="text-[8px] text-muted-foreground">{item.patientId}</span>
        </div>
      </div>
    ),
  },
];

export const TasksTabContent = () => {
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
        <DataTable columns={taskColumns} data={DUMMY_TASKS} className="border-none bg-transparent" />
      </div>
    </ProfileSectionCard>
  );
};
