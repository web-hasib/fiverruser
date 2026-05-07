export type DetailCard = {
  label: string;
  value: string;
};

export type SoapSection = {
  title: string;
  items: Array<{
    label: string;
    text: string;
    highlight?: boolean;
  }>;
};

export const previewHeaderData = {
  initials: "SR",
  title: "Psychiatry - Outpatient Assistant",
  status: "Active",
  createdAt: "Created Apr 20, 2026",
  version: "v1.0",
  author: "by Saifur Rahman",
  pills: ["Patient Summary", "Psychiatry", "Next Appointment"],
};

export const previewDetailCards: DetailCard[] = [
  { label: "Clinical Role", value: "Resident" },
  { label: "Document Type", value: "Discharge Summary" },
  { label: "Care Settings", value: "Emergency Department" },
  { label: "Clinical Role", value: "Resident" },
  { label: "Document Type", value: "Discharge Summary" },
  { label: "Care Settings", value: "Emergency Department" },
  { label: "Clinical Role", value: "Resident" },
  { label: "Document Type", value: "Discharge Summary" },
  { label: "Care Settings", value: "Emergency Department" },
];

export const previewDescription =
  "Streamline your general practice consultations with this comprehensive NHS GP Consult template. Designed for General Practitioners, this template provides a structured framework for documenting patient encounters, whether face-to-face or via telephone. Capture essential details from the patient's history, including presenting complaints, ideas, concerns, expectations (ICE), and relevant risk factors. Easily record examination findings, vital signs, and any investigations or results. The template guides you through forming a clinical impression, listing diagnoses, and outlining a clear management plan, including investigations, treatments, referrals, and crucial safety-netting advice. Ideal for busy GPs seeking efficient and thorough documentation for every patient visit, ensuring all pertinent clinical information is systematically recorded.";

export const previewTags = ["English", "Adult >18", "ED - Acute", "ICD-1 Coding", "Structured"];

export const previewMeta = {
  patient: "Al Muntakim Tuhin, 25M",
  mrn: "2222-1212",
  date: "Apr 20, 2026",
  time: "12:10",
  clinician: "Dr. Saifur",
};

export const previewSoapSections: SoapSection[] = [
  {
    title: "S - Subjective",
    items: [
      {
        label: "Chief Complaint",
        text: "Urgent psychiatric assessment requested regarding capacity for surgical consent (leg amputation).",
      },
      {
        label: "HPI",
        text: "54M presents to surgical ED with necrotic leg infection. Reports leg \"becomes discoloured every summer\" and describes condition as \"just a scratch\" - poor insight into severity.",
      },
      {
        label: "Substance Use",
        text: "Heavy alcohol use; last drink ~72h prior. Denies withdrawal symptoms.",
      },
      {
        label: "Psych History",
        text: "Prior admission at this facility for alcohol-related issues (several years ago).",
      },
    ],
  },
  {
    title: "O - Objective",
    items: [
      { label: "Vitals", text: "BP 142/88, HR 96, Temp 38.1C, SpO2 96% RA" },
      {
        label: "MSE",
        text: "Agitated, loud; vulgar language. Vague, confabulatory. Oriented to place, not time. Memory impaired for recent events.",
      },
      { label: "Affect", text: "Incongruent - \"empty cheerfulness\" when discussing serious matters." },
      {
        label: "Labs",
        text: "Markedly elevated inflammatory markers. LFTs pending (GOT/GPT/GGT/bilirubin/INR).",
      },
    ],
  },
  {
    title: "A - Assessment",
    items: [
      {
        label: "",
        text: "Likely alcohol-related cognitive impairment (R/O Korsakoff's syndrome) - confabulation, memory impairment, poor insight.",
      },
      { label: "", text: "Active systemic infection w/ delirium superimposed on cognitive baseline." },
      {
        label: "Capacity",
        text: "Patient does NOT currently demonstrate decisional capacity for surgical consent - fails to appreciate severity or consequences.",
      },
      {
        label: "",
        text: "RED FLAG: Urgent surgical decision pending. Delirium + alcohol withdrawal risk window still open (prior drink 72h ago). Prophylactic thiamine indicated.",
        highlight: true,
      },
    ],
  },
  {
    title: "P - Plan",
    items: [
      {
        label: "Capacity",
        text: "Document lack of capacity; proceed via best-interests framework with next-of-kin + surgical team.",
      },
      { label: "Thiamine", text: "IV Pabrinex 2 pairs TDS x 3 days, then PO thiamine 100mg TDS." },
      { label: "Withdrawal", text: "CIWA-Ar q4h x24h; PRN lorazepam per protocol." },
      { label: "Delirium", text: "Treat underlying infection; minimise sedatives; reorient frequently." },
      { label: "F/U", text: "Psychiatry liaison review post-op Day 1. Social work referral." },
    ],
  },
];

export const previewCoding = [
  "F10.27 - Alcohol dependence with alcohol-induced persisting amnestic disorder",
  "F05 - Delirium due to known physiological condition",
  "L97.919 - Non-pressure chronic ulcer of unspecified lower leg with unspecified severity",
];
