export type AssistantType = "Letter" | "Analysis";

export interface AssistantApprovalRecord {
  id: string;
  assistant: string;
  type: AssistantType;
  submittedBy: string;
  department: string;
  submittedDate: string; // ISO date for easy API replacement
  status: "Pending" | "Approved" | "Rejected";
}

export const APPROVAL_DEPARTMENTS = [
  "General Medicine",
  "Neurology",
  "Dentistry",
  "Pharmacy / Medication",
  "Pulmonology (Lungs)",
  "Emergency",
];

export const APPROVAL_TYPES: AssistantType[] = ["Letter", "Analysis"];

export const DUMMY_APPROVAL_RECORDS: AssistantApprovalRecord[] = [
  {
    id: "asst-1",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-2",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-3",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-4",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-5",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-6",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-7",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-8",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-9",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-10",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-11",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: "asst-12",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    status: "Pending",
  },
];
