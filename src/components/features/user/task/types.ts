export type TaskStatus = "To Do" | "In Progress" | "Complete" | "Overdue";
export type TaskPriority = "High" | "Medium" | "Low" | "None";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  patientName: string | string[];
  patientId: string;
  priority: TaskPriority;
  folderName: string;
  status: TaskStatus;
  assignedTo: string[];
  caseName?: string | string[];
}

export interface FolderItem {
  id: string;
  name: string;
  count: number;
  color?: string;
  isShared?: boolean;
}
