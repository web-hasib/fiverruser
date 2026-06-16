const data = `Document Types
49 document types across 9 groups — for use in MedSyst AI Assistant configuration
#
Document Type
ID / Key
Admission & Discharge
1
Discharge Summary
discharge_summary
2
Admission Note
admission_note
3
Transfer Summary
transfer_summary
4
Referral Letter
referral_letter
5
Death Summary
death_summary
Clinical Notes
6
Progress Note
progress_note
7
SOAP Note
soap_note
8
History & Physical (H&P)
history_physical
9
Consultation Note
consultation_note
10
Follow-Up / Outpatient Note
follow_up_note
11
Clinic Letter / Outpatient Letter
clinic_letter
12
Nursing Note
nursing_note
13
On-Call / Handover Note
on_call_note
14
Handover Note (SBAR)
handover_sbar
15
Triage Note
triage_note
Surgical Documents
16
Pre-Operative Assessment
preop_assessment
17
Operative Report
operative_report
18
Post-Operative Note
postop_note
19
Anesthesia Record
anesthesia_record
20
Procedure Note
procedure_note
Summaries & Reports
21
Patient Summary
patient_summary
22
Tumor Board / MDT Summary
tumor_board_summary
23
Case Report
case_report
24
Incident Report
incident_report
25
Autopsy Report
autopsy_report
Diagnostics & Results
26
Radiology Report
radiology_report
27
Pathology Report
pathology_report
28
Laboratory Result Interpretation
lab_interpretation
29
ECG / EEG Report
ecg_report
30
Endoscopy Report
endoscopy_report
31
Biopsy Report
biopsy_report
Medications & Orders
32
Medication Reconciliation
medication_reconciliation
33
Prescription
prescription
34
Medication Review
medication_review
35
Treatment Plan
treatment_plan
36
Chemotherapy Protocol
chemotherapy_protocol
Legal & Administrative
37
Informed Consent Form
consent_form
38
Sick Leave Certificate
sick_leave_certificate
39
Disability Certificate
disability_certificate
40
Insurance / Medical Report
insurance_report
41
Medical Expert Opinion
expert_opinion
Nursing & Allied Health
42
Nursing Assessment
nursing_assessment
43
Physiotherapy Note
physiotherapy_note
44
Dietitian / Nutrition Note
dietitian_note
45
Social Work Note
social_work_note
46
Wound Care Note
wound_care_note
Mental Health
47
Psychiatric Evaluation
psychiatric_evaluation
48
Psychological Report
psychological_report
49
Mental Health Progress Note
mental_health_note`;

const lines = data.split('\n').map(l => l.trim()).filter(l => l.length > 0);
const result = [];
let currentGroup = "";

const groups = [
  "Admission & Discharge",
  "Clinical Notes",
  "Surgical Documents",
  "Summaries & Reports",
  "Diagnostics & Results",
  "Medications & Orders",
  "Legal & Administrative",
  "Nursing & Allied Health",
  "Mental Health"
];

let i = 5; // Start after headers
while (i < lines.length) {
  const line = lines[i];
  if (groups.includes(line)) {
    currentGroup = line;
    i++;
    continue;
  }
  
  // Check if line is a number (ID)
  if (!isNaN(line)) {
    const title = lines[i+1];
    const value = lines[i+2];
    result.push({ groupName: currentGroup, title, value });
    i += 3;
  } else {
    i++;
  }
}

console.log("export const documentTypes = " + JSON.stringify(result, null, 2) + ";");
