const data = `Medical Specialties
58 specialties across 9 groups — for use in MedSyst AI Assistant configuration
#
Specialty Name
ID / Key
Surgery
1
General Surgery
general_surgery
2
Cardiac Surgery
cardiac_surgery
3
Thoracic Surgery
thoracic_surgery
4
Vascular Surgery
vascular_surgery
5
Transplant Surgery
transplant_surgery
6
Hepatobiliary & Pancreatic Surgery
hepatobiliary_surgery
7
Colorectal Surgery
colorectal_surgery
8
Bariatric & Metabolic Surgery
bariatric_surgery
9
Breast Surgery
breast_surgery
10
Endocrine Surgery
endocrine_surgery
11
Pediatric Surgery
pediatric_surgery
12
Plastic & Reconstructive Surgery
plastic_surgery
13
Neurosurgery
neurosurgery
14
Orthopedic Surgery
orthopedic_surgery
15
Trauma Surgery
trauma_surgery
16
Urology
urology
17
Gynecologic Oncology
gynecologic_oncology
18
Ophthalmology
ophthalmology
19
Otolaryngology (ENT)
ent
20
Oral & Maxillofacial Surgery
maxillofacial_surgery
Internal Medicine
21
Internal Medicine
internal_medicine
22
Cardiology
cardiology
23
Interventional Cardiology
interventional_cardiology
24
Gastroenterology
gastroenterology
25
Hepatology
hepatology
26
Pulmonology
pulmonology
27
Nephrology
nephrology
28
Endocrinology & Diabetology
endocrinology
29
Rheumatology
rheumatology
30
Hematology
hematology
31
Oncology
oncology
32
Infectious Disease
infectious_disease
33
Acute Medicine
acute_medicine
34
Allergy & Immunology
allergy_immunology
Neurosciences
35
Neurology
neurology
36
Psychiatry
psychiatry
37
Geriatrics
geriatrics
Mental Health
38
Addiction Medicine
addiction_medicine
Women's Health
39
Obstetrics & Gynecology
obstetrics_gynecology
40
Maternal-Fetal Medicine
maternal_fetal_medicine
41
Reproductive Medicine & IVF
reproductive_medicine
Pediatrics
42
Pediatrics
pediatrics
43
Neonatology
neonatology
44
Pediatric Oncology
pediatric_oncology
Emergency & Critical Care
45
Emergency Medicine
emergency_medicine
46
Intensive Care Medicine
intensive_care
47
Anesthesiology
anesthesiology
48
Pain Management
pain_management
Diagnostics
49
Radiology & Diagnostic Imaging
radiology
50
Interventional Radiology
interventional_radiology
51
Nuclear Medicine
nuclear_medicine
52
Pathology
pathology
Other Specialties
53
Dermatology
dermatology
54
Sports Medicine
sports_medicine
55
Rehabilitation Medicine
rehabilitation_medicine
56
Palliative Care
palliative_care
57
Family Medicine / General Practice
family_medicine
58
Occupational Medicine
occupational_medicine`;

const lines = data.split('\n').map(l => l.trim()).filter(l => l.length > 0);
const result = [];
let currentGroup = "";

const groups = [
  "Surgery",
  "Internal Medicine",
  "Neurosciences",
  "Mental Health",
  "Women's Health",
  "Pediatrics",
  "Emergency & Critical Care",
  "Diagnostics",
  "Other Specialties"
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
