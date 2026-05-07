import { ScheduleItem, CaseItem, PatientItem } from "./types";

export const scheduleData: ScheduleItem[] = [
  {
    title: "Post-op Follow-up",
    date: "May 15, 2024 | 10:00 AM",
    patient: { name: "Floyd Miles", dob: "10/24/1985", gender: "M" },
    priority: "High",
    specialty: "Surgery",
    caseId: "CS-1024-001",
    assigned: [{ name: "Dr. Saifur", initial: "DS" }, { name: "Nurse Jane", initial: "NJ" }],
    status: "To Do"
  },
  {
    title: "Initial Consultation",
    date: "May 15, 2024 | 11:30 AM",
    patient: { name: "Jane Cooper", dob: "12/05/1992", gender: "F" },
    priority: "Medium",
    specialty: "Cardiology",
    caseId: "CS-1024-002",
    assigned: [{ name: "Dr. Saifur", initial: "DS" }],
    status: "In Progress"
  }
];

export const recentCasesData: CaseItem[] = [
  {
    id: "CS-1024-001",
    name: "Aortic Valve Replacement",
    date: "May 14, 2024 | 09:00 AM",
    patient: "Floyd Miles",
    dob: "10/24/1985",
    tasks: 3
  },
  {
    id: "CS-1024-002",
    name: "Hypertension Management",
    date: "May 14, 2024 | 02:30 PM",
    patient: "Jane Cooper",
    dob: "12/05/1992",
    tasks: 1
  }
];

export const patientsData: PatientItem[] = [
  {
    id: "PAT-2024-001",
    name: "Floyd Miles",
    cases: 2
  },
  {
    id: "PAT-2024-002",
    name: "Jane Cooper",
    cases: 1
  },
  {
    id: "PAT-2024-003",
    name: "Albert Flores",
    cases: 5
  },
  {
    id: "PAT-2024-004",
    name: "Arlene McCoy",
    cases: 3
  }
];
