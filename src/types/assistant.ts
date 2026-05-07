export type AssistantVisibility = "Just me" | "Community";

export interface Assistant {
  id: string;
  name: string;
  lastEdited: string;
  lastUsed: string;
  creator: string;
  visibility: AssistantVisibility;
  language?: string;
  specialty?: string;
  isFavorite?: boolean;
}

// ─── Shared Assistant (Community Prompts) ─────────────────────────────────────
export interface AssistantSection {
  heading: string;
  exampleText: string;
  structureText: string;
}

export interface SharedAssistant {
  id: string;
  name: string;
  description: string;
  creator: string;
  authorAvatar: string; // emoji flag or initials
  specialty: string;
  language: string;
  version: string;
  uses: number;
  lastEdited: string;
  category: string;
  assistanceType: string;
  aboutText: string;
  sections: AssistantSection[];
}

// ─── Dummy data for Private Assistants ────────────────────────────────────────
export const mockPrivateAssistants: Assistant[] = [
  {
    id: "a1",
    name: "Cardiology Discharge Te...",
    lastEdited: "May 29, 2017",
    lastUsed: "1 day ago",
    creator: "Me",
    visibility: "Just me",
    language: "English",
    specialty: "Cardiology",
  },
  {
    id: "a2",
    name: "In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc...",
    lastEdited: "November 7, 2017",
    lastUsed: "---",
    creator: "Me",
    visibility: "Just me",
    language: "English",
  },
  {
    id: "a3",
    name: "Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus....",
    lastEdited: "February 11, 2014",
    lastUsed: "1 day ago",
    creator: "Me",
    visibility: "Just me",
  },
  {
    id: "a4",
    name: "Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus....",
    lastEdited: "February 9, 2015",
    lastUsed: "---",
    creator: "Saifur Rahman",
    visibility: "Just me",
  },
  {
    id: "a5",
    name: "Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus se...",
    lastEdited: "February 28, 2018",
    lastUsed: "---",
    creator: "Farhad",
    visibility: "Community",
  },
  {
    id: "a6",
    name: "In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc...",
    lastEdited: "July 14, 2015",
    lastUsed: "---",
    creator: "Me",
    visibility: "Just me",
  },
  {
    id: "a7",
    name: "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est c...",
    lastEdited: "August 2, 2013",
    lastUsed: "4 day ago",
    creator: "Rafiun",
    visibility: "Just me",
  },
  {
    id: "a8",
    name: "Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus....",
    lastEdited: "March 23, 2013",
    lastUsed: "---",
    creator: "Unknown",
    visibility: "Just me",
  },
  {
    id: "a9",
    name: "Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus....",
    lastEdited: "March 23, 2013",
    lastUsed: "---",
    creator: "Unknown",
    visibility: "Just me",
  },
];

// ─── Shared template sections helper ─────────────────────────────────────────
const psychiatryReferralSections: AssistantSection[] = [
  {
    heading: "Referral to Psychiatry",
    exampleText: "",
    structureText: "",
  },
  {
    heading: "Patient",
    exampleText: "Mr. Kocsir",
    structureText:
      "[Patient Name] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit completely.)",
  },
  {
    heading: "Referring Clinician",
    exampleText: "Dr. [Referring Clinician Name], Surgical Emergency Unit",
    structureText:
      "[Referring Clinician Name], [Referring Clinician Department/Unit] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit completely.)",
  },
  {
    heading: "Referred to",
    exampleText: "On-call Psychiatry",
    structureText:
      "[Receiving Clinician/Service] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit completely.)",
  },
  {
    heading: "Reason for Referral:",
    exampleText:
      "Request for urgent psychiatric consultation regarding capacity assessment for urgent leg amputation.",
    structureText:
      "[reason for referral and psychiatric consultation] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
  {
    heading: "History of Present Illness:",
    exampleText:
      'Mr. Kocsir presents to the surgical emergency unit with a necrotic leg infection requiring urgent amputation. He reports his leg becomes discoloured every summer. He states surgery is scheduled for next Thursday, though no fixed date has been confirmed. He demonstrates poor insight into the severity of his condition, describing it as a "scratch". Personal hygiene is significantly neglected. Blood tests show markedly elevated inflammatory markers. His last medical review was over one year ago.',
    structureText:
      "[detailed description of current symptoms, timeline, and circumstances leading to referral] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely. Write in paragraph format from the perspective of a referral.)",
  },
  {
    heading: "Past Psychiatric History:",
    exampleText:
      "Previous treatment at this hospital for alcohol-related issues, several years ago.",
    structureText:
      "[previous psychiatric diagnoses, hospitalizations, treatments, and dates] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
  {
    heading: "Substance Use History:",
    exampleText:
      "History of heavy alcohol use. Reports last drink on Thursday (approximately 3 days prior). Denies withdrawal symptoms including tremor, diaphoresis, or anxiety.",
    structureText:
      "[detailed alcohol and substance use patterns, duration, and related complications] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
  {
    heading: "Medical History:",
    exampleText: "Leg infection with necrosis requiring surgical intervention.",
    structureText:
      "[relevant medical conditions, surgeries, and current health status] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
  {
    heading: "Laboratory Results:",
    exampleText:
      "Elevated inflammatory markers on blood tests. Liver function tests (GOT, GPT, GGT, bilirubin, INR) to be performed.",
    structureText:
      "[relevant laboratory findings and abnormal values] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
  {
    heading: "Current Status and Examination:",
    exampleText:
      "The patient has been agitated and loud, using vulgar language. He is vague and confabulatory regarding recent events. He demonstrates empty cheerfulness when discussing serious matters. He is disoriented to time but oriented to place. Memory for recent events is significantly impaired with confabulation.",
    structureText:
      "[summary of key findings from mental status and cognitive examinations, including appearance, behavior, speech, mood, affect, thought process, and orientation] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely. Write in a concise paragraph.)",
  },
  {
    heading: "Specific Question for Psychiatry:",
    exampleText:
      "Please assess the patient's capacity to consent to or refuse urgent surgical treatment. We are concerned about his poor insight, impaired judgment, and cognitive deficits. Your assessment is needed to guide our treatment plan.",
    structureText:
      "[specific question or task for the consulting psychiatrist, including concerns about capacity, diagnosis, or management] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely. Formulate as a direct request to the receiving clinician.)",
  },
];

const cardiologyDischargeSections: AssistantSection[] = [
  {
    heading: "Cardiology Discharge Summary",
    exampleText: "",
    structureText: "",
  },
  {
    heading: "Patient Information:",
    exampleText:
      "Mr. John Smith, 67-year-old male admitted on 01/02/2026. Discharged on 06/02/2026.",
    structureText:
      "[Patient name, age, sex, admission date, discharge date] (Include all fields unless not documented.)",
  },
  {
    heading: "Primary Diagnosis:",
    exampleText:
      "ST-Elevation Myocardial Infarction (STEMI) involving the left anterior descending artery.",
    structureText:
      "[primary cardiac diagnosis with ICD code if available] (Only include if explicitly documented.)",
  },
  {
    heading: "Procedures Performed:",
    exampleText:
      "Emergency percutaneous coronary intervention (PCI) with drug-eluting stent placement to LAD. Echocardiography showing EF 45%.",
    structureText:
      "[list of procedures with dates and outcomes] (Only include explicitly documented procedures.)",
  },
  {
    heading: "Discharge Medications:",
    exampleText:
      "Aspirin 100mg daily, Ticagrelor 90mg twice daily, Atorvastatin 80mg nightly, Metoprolol 25mg twice daily, Ramipril 5mg daily.",
    structureText:
      "[medication name, dose, frequency, duration] (List all discharge medications.)",
  },
  {
    heading: "Follow-up Instructions:",
    exampleText:
      "Cardiology outpatient review in 4 weeks. Repeat echocardiogram at 3 months. Cardiac rehabilitation referral made.",
    structureText:
      "[specific follow-up appointments, tests, and rehabilitation plans] (Include all scheduled follow-ups.)",
  },
];

const soapNoteSections: AssistantSection[] = [
  {
    heading: "SOAP Note",
    exampleText: "",
    structureText: "",
  },
  {
    heading: "Subjective:",
    exampleText:
      "Patient is a 45-year-old female presenting with a 3-day history of productive cough, low-grade fever of 37.8°C, and mild dyspnoea on exertion. Reports associated myalgia and fatigue. No sick contacts identified. Vaccinated against influenza and COVID-19.",
    structureText:
      "[Chief complaint, history of presenting illness, associated symptoms, relevant past history, medications, allergies] (Write in paragraph format from patient perspective.)",
  },
  {
    heading: "Objective:",
    exampleText:
      "Temp 37.9°C, HR 88bpm, BP 122/78mmHg, RR 18, SpO2 97% on room air. Chest auscultation reveals coarse crackles at right lower zone. No wheeze. CXR shows right lower lobe consolidation.",
    structureText:
      "[Vital signs, physical examination findings, investigation results] (Include all objective findings documented.)",
  },
  {
    heading: "Assessment:",
    exampleText:
      "Community-acquired pneumonia, right lower lobe (mild severity, CURB-65 score 1).",
    structureText:
      "[Diagnosis or differential diagnoses with reasoning] (Include severity scores where relevant.)",
  },
  {
    heading: "Plan:",
    exampleText:
      "Amoxicillin 500mg TDS for 5 days. Encourage adequate hydration and rest. Safety-net advice provided. Review in 48 hours or sooner if symptoms worsen. Refer to ED if SpO2 drops below 94%.",
    structureText:
      "[Treatment plan including medications, investigations, referrals, safety-netting, and follow-up] (List all plan components.)",
  },
];

// ─── Dummy data for Shared Assistants ────────────────────────────────────────
export const mockSharedAssistants: SharedAssistant[] = [
  {
    id: "s1",
    name: "Outpatient Treatment Sheet",
    description:
      "Streamline your general practice consultations with this comprehensive NHS GP Consult template. Designed for General Practitioners.",
    creator: "Saifur Rahman",
    authorAvatar: "🇬🇧",
    specialty: "General Practitioner",
    language: "English",
    version: "v2.1",
    uses: 5822,
    lastEdited: "06/02/2026",
    category: "Discharge",
    assistanceType: "Consultation",
    aboutText:
      "Streamline your general practice consultations with this comprehensive NHS GP Consult template. Designed for General Practitioners, this template provides a structured framework for documenting patient encounters, whether face-to-face or via telephone. Capture essential details from the patient's history, including presenting complaints, ideas, concerns, expectations (ICE), and relevant risk factors. Easily record examination findings, vital signs, and any investigations or results. The template guides you through forming a clinical impression, listing diagnoses, and outlining a clear management plan, including investigations, treatments, referrals, and crucial safety-netting advice. Ideal for busy GPs seeking efficient and thorough documentation for every patient visit, ensuring all pertinent clinical information is systematically recorded.",
    sections: psychiatryReferralSections,
  },
  {
    id: "s2",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Emily Chen",
    authorAvatar: "🇫🇷",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "01/03/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures such as PCI, CABG, or electrophysiology studies. Ensures all critical information—including medications, follow-up plans, and patient education—is clearly documented for continuity of care.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s3",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Lars Eriksson",
    authorAvatar: "🇸🇪",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "14/01/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures such as PCI, CABG, or electrophysiology studies. Ensures all critical information is clearly documented for continuity of care.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s4",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Amara Diallo",
    authorAvatar: "🇨🇲",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "22/02/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures such as PCI, CABG, or electrophysiology studies.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s5",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Priya Sharma",
    authorAvatar: "🇮🇳",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "11/01/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures such as PCI, CABG, or electrophysiology studies.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s6",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Marco Rossi",
    authorAvatar: "🇮🇹",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "05/02/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures such as PCI, CABG, or electrophysiology studies.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s7",
    name: "SOAP Note Template",
    description:
      "Structured SOAP note for primary care and emergency visits. Problem-based format.",
    creator: "Dr. Sarah O'Brien",
    authorAvatar: "🇮🇪",
    specialty: "General Practice",
    language: "English",
    version: "v1.4",
    uses: 1203,
    lastEdited: "28/01/2026",
    category: "Consultation",
    assistanceType: "Consultation",
    aboutText:
      "A problem-based SOAP note template suitable for primary care, urgent care, and emergency settings. Guides the clinician through structured documentation of the subjective history, objective findings, clinical assessment, and management plan.",
    sections: soapNoteSections,
  },
  {
    id: "s8",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Hans Weber",
    authorAvatar: "🇩🇪",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "19/02/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s9",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Yuki Tanaka",
    authorAvatar: "🇯🇵",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "03/03/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s10",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Sofia Andersen",
    authorAvatar: "🇩🇰",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "15/02/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s11",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Carlos Mendez",
    authorAvatar: "🇲🇽",
    specialty: "Cardiology",
    language: "Spanish",
    version: "v2.1",
    uses: 234,
    lastEdited: "08/02/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "Plantilla completa de resumen de alta diseñada específicamente para pacientes de cardiología.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s12",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Nikos Papadopoulos",
    authorAvatar: "🇬🇷",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "25/01/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s13",
    name: "Psychiatry Referral Template",
    description:
      "Structured referral letter template for psychiatric consultations from any specialty.",
    creator: "Dr. James Wilson",
    authorAvatar: "🇦🇺",
    specialty: "Psychiatry",
    language: "English",
    version: "v3.0",
    uses: 887,
    lastEdited: "20/02/2026",
    category: "Referral",
    assistanceType: "Referral",
    aboutText:
      "A structured psychiatric referral template designed for use across all clinical specialties. Guides the referring clinician through clearly documenting the patient's current mental status, past psychiatric history, substance use, medical context, and the specific question for the consulting psychiatrist.",
    sections: psychiatryReferralSections,
  },
  {
    id: "s14",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Anna Kovacs",
    authorAvatar: "🇭🇺",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "12/02/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures.",
    sections: cardiologyDischargeSections,
  },
  {
    id: "s15",
    name: "Cardiology Discharge Template",
    description:
      "Comprehensive discharge summary template for cardiac patients post-procedure.",
    creator: "Dr. Ibrahim Al-Rashid",
    authorAvatar: "🇦🇪",
    specialty: "Cardiology",
    language: "English",
    version: "v2.1",
    uses: 234,
    lastEdited: "27/01/2026",
    category: "Discharge",
    assistanceType: "Documentation",
    aboutText:
      "A comprehensive, structured discharge summary template specifically designed for cardiology patients following procedures.",
    sections: cardiologyDischargeSections,
  },
];
