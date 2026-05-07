export type AssistantVisibility = "Private" | "Public" | "Shared with Team";
export type AssistantType = "Emergency" | "Outpatient";

export interface AssistantLibraryRecord {
  id: string;
  name: string;
  type: AssistantType;
  document: string;
  clinicalRole: string;
  author: string;
  language: string;
  uses: number;
  visibility: AssistantVisibility;
  featured: boolean;
}

export const LIBRARY_LANGUAGES = ["Bangla", "Hungary", "German", "France"];
export const LIBRARY_VISIBILITY: AssistantVisibility[] = ["Private", "Public", "Shared with Team"];
export const LIBRARY_TYPES: AssistantType[] = ["Emergency", "Outpatient"];
export const LIBRARY_ROLES = ["Resident", "Example 2", "Example 2", "Example 2", "Example 2", "Example 2"];
export const LIBRARY_DOCUMENTS = ["Example 2", "Example 2", "Example 2", "Example 2", "Example 2", "Example 2"];

export const LIBRARY_TAB_OPTIONS = [
  { id: "all", label: "All" },
  { id: "private", label: "Private" },
  { id: "public", label: "Public" },
  { id: "shared", label: "Shared With Team" },
  { id: "featured", label: "Featured" },
] as const;

export type LibraryTab = (typeof LIBRARY_TAB_OPTIONS)[number]["id"];

export const DUMMY_LIBRARY_ROWS: AssistantLibraryRecord[] = [
  {
    id: "row-1",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Private",
    featured: false,
  },
  {
    id: "row-2",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Example 2",
    author: "Med AI Team",
    language: "HU",
    uses: 200,
    visibility: "Private",
    featured: false,
  },
  {
    id: "row-3",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "NZ",
    uses: 200,
    visibility: "Public",
    featured: true,
  },
  {
    id: "row-4",
    name: "General Medical Scribe",
    type: "Outpatient",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Shared with Team",
    featured: false,
  },
  {
    id: "row-5",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Public",
    featured: true,
  },
  {
    id: "row-6",
    name: "General Medical Scribe",
    type: "Outpatient",
    document: "Example 2",
    clinicalRole: "Example 2",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Private",
    featured: true,
  },
  {
    id: "row-7",
    name: "General Medical Scribe",
    type: "Outpatient",
    document: "Example 2",
    clinicalRole: "Example 2",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Shared with Team",
    featured: false,
  },
  {
    id: "row-8",
    name: "General Medical Scribe",
    type: "Outpatient",
    document: "Example 2",
    clinicalRole: "Example 2",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Public",
    featured: false,
  },
  {
    id: "row-9",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Private",
    featured: true,
  },
  {
    id: "row-10",
    name: "General Medical Scribe",
    type: "Outpatient",
    document: "Example 2",
    clinicalRole: "Example 2",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Shared with Team",
    featured: true,
  },
  {
    id: "row-11",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Public",
    featured: true,
  },
  {
    id: "row-12",
    name: "General Medical Scribe",
    type: "Emergency",
    document: "Example 2",
    clinicalRole: "Resident",
    author: "Med AI Team",
    language: "EN",
    uses: 200,
    visibility: "Shared with Team",
    featured: false,
  },
];
