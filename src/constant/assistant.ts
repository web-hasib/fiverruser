export type AssistantVisibility = "Private" | "Shared with Team" | "Public";

export interface Assistant {
  id: string;
  name: string;
  medicalSpecialty: {
    icon: string; // basically a string indicator to render a specific emoji or svg 
    name: string;
  };
  type: string;
  clinicalRole: string;
  documentumType: string;
  createdDate: string;
  visibility: AssistantVisibility;
}

export const mockAssistants: Assistant[] = [
  {
    id: "1",
    name: "Follow-up call — Horváth Katalin",
    medicalSpecialty: { icon: "🧬", name: "Nursing" },
    type: "Outpatient",
    clinicalRole: "Resident",
    documentumType: "Discharge Summary",
    createdDate: "05 April, 2026",
    visibility: "Private",
  },
  {
    id: "2",
    name: "Send cardiology referral letter for...",
    medicalSpecialty: { icon: "🧠", name: "Follow-up" },
    type: "Emergency",
    clinicalRole: "Example 2",
    documentumType: "Example 2",
    createdDate: "05 April, 2026",
    visibility: "Shared with Team",
  },
  {
    id: "3",
    name: "Send cardiology referral letter for...",
    medicalSpecialty: { icon: "🦷", name: "Follow-up" },
    type: "Follow-up",
    clinicalRole: "Example 3",
    documentumType: "Example 3",
    createdDate: "05 April, 2026",
    visibility: "Public",
  },
  {
    id: "4",
    name: "Follow-up call — Horváth Katalin",
    medicalSpecialty: { icon: "💊", name: "Review" },
    type: "Returning",
    clinicalRole: "Example 4",
    documentumType: "Example 5",
    createdDate: "05 April, 2026",
    visibility: "Shared with Team",
  },
  {
    id: "5",
    name: "Review blood test results for Kov...",
    medicalSpecialty: { icon: "🫁", name: "Medical" },
    type: "New",
    clinicalRole: "Example 5",
    documentumType: "Example 8",
    createdDate: "05 April, 2026",
    visibility: "Private",
  },
  {
    id: "6",
    name: "Follow-up call — Horváth Katalin",
    medicalSpecialty: { icon: "🧬", name: "Review" },
    type: "Emergency",
    clinicalRole: "Example 8",
    documentumType: "Example 10",
    createdDate: "05 April, 2026",
    visibility: "Public",
  },
];
