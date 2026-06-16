import { LucideIcon } from "lucide-react";

export interface ScheduleItem {
  title: string;
  date: string;
  patient: { name: string; dob: string; gender: string };
  priority: string;
  specialty: string;
  caseId: string;
  assigned: { name: string; initial: string }[];
  status: string;
}

export interface CaseItem {
  id: string;
  name: string;
  date: string;
  patient: string;
  dob: string;
  tasks: number;
}

export interface PatientItem {
  id: string;
  name: string;
  cases: number;
}
