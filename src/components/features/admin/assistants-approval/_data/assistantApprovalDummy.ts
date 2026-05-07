export type AssistantType = "Letter" | "Analysis";
export type AssistantDecision = "Pending" | "Approved" | "Rejected";

export interface AssistantApprovalRecord {
  id: string;
  assistant: string;
  type: AssistantType;
  submittedBy: string;
  department: string;
  submittedDate: string; // ISO: YYYY-MM-DD
  decision: AssistantDecision;
}

export const DEPARTMENT_OPTIONS = [
  "General Medicine",
  "Neurology",
  "Dentistry",
  "Pharmacy / Medication",
  "Pulmonology (Lungs)",
  "Cardiology",
];

export const TYPE_OPTIONS: AssistantType[] = ["Letter", "Analysis"];

export const ASSISTANT_APPROVAL_DUMMY_DATA: AssistantApprovalRecord[] = [
  {
    id: "ap-1",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-2",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-3",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-4",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-5",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-6",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-7",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-8",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-9",
    assistant: "General Medical Scribe",
    type: "Letter",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-10",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-11",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
  {
    id: "ap-12",
    assistant: "General Medical Scribe",
    type: "Analysis",
    submittedBy: "Dr. Saifur Rahman",
    department: "Dhaka Hospital",
    submittedDate: "2026-03-10",
    decision: "Pending",
  },
];
