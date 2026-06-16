const data = `Clinical Roles
52 roles across 8 groups — for use in MedSyst AI Assistant configuration
#
Clinical Role
ID / Key
Physicians
1
Attending Physician
attending_physician
2
Intensivist
intensivist
3
Consultant
consultant
4
Resident
resident
5
Specialist Registrar
specialist_registrar
6
Intern / Junior Doctor
intern
7
Fellow
fellow
8
Hospitalist
hospitalist
9
General Practitioner
gp
10
Surgeon
surgeon
11
Medical Student
medical_student
Nursing
12
Registered Nurse (RN)
rn
13
Nurse Practitioner (NP)
nurse_practitioner
14
Clinical Nurse Specialist
clinical_nurse_specialist
15
Head Nurse / Charge Nurse
head_nurse
16
Scrub Nurse
scrub_nurse
17
ICU Nurse
icu_nurse
18
Nursing Student
nursing_student
Advanced Practice Providers
19
Physician Assistant (PA)
physician_assistant
20
Advanced Practice Nurse
advanced_practice_nurse
21
Midwife
midwife
Anesthesia & Perioperative
22
Anesthesiologist
anesthesiologist
23
Anaesthesia Nurse
anaesthesia_nurse
24
Anesthesia Technician
anesthesia_technician
25
Perfusionist
perfusionist
Diagnostics & Imaging
26
Radiologist
radiologist
27
Radiology Technician
radiology_technician
28
Pathologist
pathologist
29
Laboratory Technician
lab_technician
30
Sonographer / Ultrasound Tech
sonographer
31
Nuclear Medicine Technologist
nuclear_medicine_tech
Allied Health
32
Physiotherapist
physiotherapist
33
Occupational Therapist
occupational_therapist
34
Speech & Language Therapist
speech_therapist
35
Dietitian / Nutritionist
dietitian
36
Social Worker
social_worker
37
Psychologist
psychologist
38
Pharmacist
pharmacist
39
Pharmacy Technician
pharmacy_technician
Administrative & Management
40
Clinical Coordinator
clinical_coordinator
41
Ward Clerk
ward_clerk
42
Medical Secretary
medical_secretary
43
Administrator
administrator
44
Department Head / Chief
department_head
45
Medical Director
medical_director
46
Case Manager
case_manager
47
Quality & Safety Officer
quality_officer
48
Health Informatics Specialist
health_informatics
Specialized Roles
49
Transplant Coordinator
transplant_coordinator
50
Oncology Coordinator
oncology_coordinator
51
Infection Control Nurse
infection_control_nurse
52
Clinical Research Coordinator
research_coordinator`;

const lines = data.split('\n').map(l => l.trim()).filter(l => l.length > 0);
const result = [];
let currentGroup = "";

const groups = [
  "Physicians",
  "Nursing",
  "Advanced Practice Providers",
  "Anesthesia & Perioperative",
  "Diagnostics & Imaging",
  "Allied Health",
  "Administrative & Management",
  "Specialized Roles"
];

let i = 5; 
while (i < lines.length) {
  const line = lines[i];
  if (groups.includes(line)) {
    currentGroup = line;
    i++;
    continue;
  }
  
  if (!isNaN(line)) {
    const title = lines[i+1];
    const value = lines[i+2];
    result.push({ groupName: currentGroup, title, value });
    i += 3;
  } else {
    i++;
  }
}

console.log(JSON.stringify(result, null, 2));
