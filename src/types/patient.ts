export type PatientStatus = "Draft" | "Active" | "Pending" | "Completed";

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "Uploaded Successfully" | "Uploading" | "Failed";
}

export interface Case {
  id: string;
  title: string;
  description: string;
  date: string;
  doctor: string;
}

export interface Patient {
  id: string;
  patientId: string;
  name: string;
  dob: string;
  lastVisit: string;
  status: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  activeCases: number;
  category: string;
  type: string;
  date: string;
  sessions: string;
  createdBy?: string;
  cases: Case[];
  files: UploadedFile[];
}

export const DUMMY_PATIENTS: Patient[] = [
  {
    id: "1",
    patientId: "MED-2847",
    name: "Wade Warren",
    dob: "12 Dec 2005",
    lastVisit: "Aug 15, 2026",
    status: "Draft",
    age: 24,
    gender: "Male",
    bloodGroup: "O+",
    activeCases: 2,
    category: "Urgent Sessions",
    type: "New",
    date: "May 29, 2026",
    sessions: "View 2",
    cases: [
      {
        id: "c1",
        title: "Post-operative recovery",
        description: "Healing well, no complications",
        date: "2024-02-13",
        doctor: "Dr. Johnson",
      },
      {
        id: "c2",
        title: "Appendectomy surgery",
        description: "Successful laparoscopic procedure",
        date: "2024-02-10",
        doctor: "Dr. Johnson",
      },
    ],
    files: [
      {
        id: "f1",
        name: "NID Frontside",
        size: "23.5MB",
        progress: 100,
        status: "Uploaded Successfully",
      },
      {
        id: "f2",
        name: "Medical Report",
        size: "12.4MB",
        progress: 100,
        status: "Uploaded Successfully",
      },
    ],
  },
  {
    id: "2",
    patientId: "MED-1234",
    name: "Annette Black",
    dob: "15 Jan 1992",
    lastVisit: "Aug 15, 2026",
    status: "Active",
    age: 32,
    gender: "Female",
    bloodGroup: "A+",
    activeCases: 5,
    category: "Post Surgery",
    type: "Returning",
    date: "May 31, 2025",
    sessions: "View 3+",
    cases: [],
    files: [],
  },
  {
    id: "3",
    patientId: "MED-5678",
    name: "Courtney Henry",
    dob: "20 May 1985",
    lastVisit: "Aug 15, 2026",
    status: "Pending",
    age: 39,
    gender: "Female",
    bloodGroup: "B-",
    activeCases: 1,
    category: "VIP Patients",
    type: "Follow-up",
    date: "September 24, 2025",
    sessions: "View 2+",
    cases: [],
    files: [],
  },
  {
    id: "4",
    patientId: "MED-9012",
    name: "Jerome Bell",
    dob: "05 Jul 2000",
    lastVisit: "Aug 15, 2026",
    status: "Completed",
    age: 23,
    gender: "Male",
    bloodGroup: "AB+",
    activeCases: 3,
    category: "Follow-up Group",
    type: "Emergency",
    date: "November 28, 2026",
    sessions: "View 1",
    cases: [],
    files: [],
  },
];

export type FolderRole = "Editor" | "Viewer";

export interface FolderMember {
  id: string;
  email: string;
  role: FolderRole;
}

export type FolderType = "Team" | "Department";

export interface SharedFolder {
  id: string;
  name: string;
  type: FolderType;
  members: FolderMember[];
  color: string;
  patientCount: number;
}

export const DUMMY_FOLDERS: SharedFolder[] = [
  {
    id: "f1",
    name: "Oncoteam",
    type: "Team",
    members: [],
    color: "#60a5fa",
    patientCount: 12,
  },
  {
    id: "f2",
    name: "Cardiology Dept.",
    type: "Department",
    members: [],
    color: "#4ade80",
    patientCount: 8,
  },
  {
    id: "f3",
    name: "Surgery Dept.",
    type: "Department",
    members: [],
    color: "#fbbf24",
    patientCount: 15,
  },
];
