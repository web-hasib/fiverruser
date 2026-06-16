export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  emailOptional?: string;
  phone: string;
  language: string;
  country: string;
  department: string;
  hospital: string;
  avatar?: string;
  // Additional fields for new design
  title: string;
  displayName: string;
  secondaryEmail: string;
  phoneCountry: string;
  interfaceLanguage: string;
  countryRegion: string;
  dateFormat: string;
  timeZone: string;
  medicalSpecialty: string;
  academicDegree: string;
  departmentWard: string;
  licenseNumber: string;
  yearsInPractice: string;
  formatDisplay: string;
  formatDate: string;
  formatTime: string;
  dateOfBirth?: string;
}

export interface ProfileCompletionItem {
  label: string;
  completed: boolean;
}

export interface ProfileCompletion {
  percent: number;
  items: ProfileCompletionItem[];
}

export interface SecuritySettings {
  sessionTimeout: string;
  twoFactorEnabled: boolean;
  smsVerificationEnabled: boolean;
  emailVerificationEnabled: boolean;
  passwordScore: number;
  lastPasswordChange: string;
}

export interface BillingHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: string;
  sessions: string;
  status: "Paid" | "Pending" | "Failed";
}

export interface PreferenceSettings {
  defaultSpecialty: string;
  preferredOutputFormat: string;
  aiModelPreference: string;
  notifications: {
    emailCaseCompletion: boolean;
    weeklyUsageSummary: boolean;
    newFeatureAnnouncements: boolean;
  };
}

export interface TokenUsageStats {
  used: string;
  total: string;
  percentUsed: number;
  dailyAverage: string;
  resetsInDays: number;
  nextResetDate: string;
  planLimit: string;
  remaining: string;
}

export interface UsageBreakdownItem {
  name: string;
  tokens: string;
  percent: number;
  color: string;
}

export interface CreditPack {
  id: string;
  name: string;
  price: string;
  tokens: string;
  notes?: string;
  savings?: string;
  description: string;
  features: string[];
}

export interface PaymentMethod {
  type: string;
  last4: string;
  expiry: string;
  country: string;
  isActive: boolean;
}

export interface PlanCategory {
  title: string;
  items: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: string;
  priceAnnually: string;
  target: string;
  notesPerMonth: string;
  categories: PlanCategory[];
  isCurrent?: boolean;
}

export interface AdminAccessMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  grantedBy: string;
  grantedAt: string;
  department: string;
  lastActivity: string;
  tokenUsage: number;
  tokenTotal: number;
  ipAddress: string;
  accessLevel: "Full Access" | "View Only";
}

export const mockProfile: UserProfile = {
  firstName: "Saifur",
  lastName: "Rahman",
  email: "example.xyz@gmail.com",
  emailOptional: "Rahman",
  phone: "(591) 556-0115",
  language: "Hungarian",
  country: "Bangladesh",
  department: "Surgery",
  hospital: "General Hospital",
  avatar: "/avatars/user-avatar.jpg",
  // New fields
  title: "Dr.",
  displayName: "Saifur Rahman",
  secondaryEmail: "example.lets@gmail.com",
  phoneCountry: "Bangladesh, +880",
  interfaceLanguage: "en/En (US)",
  countryRegion: "un/United States",
  dateFormat: "YYYY-MM-DD",
  timeZone: "UTC+0 (London)",
  medicalSpecialty: "General Practice + Family Med",
  academicDegree: "MD — Doctor of Medicine",
  departmentWard: "Cardiology Ward 45",
  licenseNumber: "GHCE 0334521",
  yearsInPractice: "10–20 years",
  formatDisplay: "12h",
  formatDate: "YYYY-MM-DD",
  formatTime: "12h",
  dateOfBirth: "1990-01-01",
};

export const mockTokenUsage: TokenUsageStats = {
  used: "2.45M",
  total: "5.0M",
  percentUsed: 49,
  dailyAverage: "85K",
  resetsInDays: 9,
  nextResetDate: "March 14, 2026",
  planLimit: "5.0M",
  remaining: "2.55M",
};

export const mockProfileCompletion: ProfileCompletion = {
  percent: 65,
  items: [
    { label: "Profile photo", completed: true },
    { label: "Full name & title", completed: true },
    { label: "Primary email verified", completed: true },
    { label: "Medical specialty set", completed: true },
    { label: "Phone number", completed: true },
    { label: "Hospital / Institution", completed: false },
    { label: "License number", completed: false },
  ],
};

export const mockUsageBreakdown: UsageBreakdownItem[] = [
  { name: "SOAP Notes & Patient Notes", tokens: "1.20M", percent: 49, color: "bg-blue-500" },
  { name: "Referral Letters", tokens: "1.20M", percent: 49, color: "bg-emerald-500" },
  { name: "Clinical Summaries", tokens: "1.20M", percent: 49, color: "bg-purple-500" },
  { name: "Discharge Notes", tokens: "1.20M", percent: 49, color: "bg-amber-500" },
];

export const mockCreditPacks: CreditPack[] = [
  {
    id: "starter-s",
    name: "Starter . S",
    price: "$10",
    tokens: "1M",
    notes: "170",
    description: "Packs are valid for 90 days and consumed after your base plan.",
    features: ["1M tokens", "170 notes"],
  },
  {
    id: "starter-m",
    name: "Starter . M",
    price: "$18",
    tokens: "2M",
    notes: "330",
    savings: "10% Off",
    description: "Packs are valid for 90 days and consumed after your base plan.",
    features: ["2M tokens", "330 notes"],
  },
  {
    id: "pro-l",
    name: "Pro . L",
    price: "$40",
    tokens: "5M",
    notes: "830",
    savings: "20% Off",
    description: "Packs are valid for 90 days and consumed after your base plan.",
    features: ["5M tokens", "830 notes"],
  },
  {
    id: "team-xl",
    name: "Team . XL",
    price: "$140",
    tokens: "20M",
    notes: "3300",
    savings: "30% Off",
    description: "Packs are valid for 90 days and consumed after your base plan.",
    features: ["20M tokens", "3300 notes"],
  },
];

export const mockPaymentMethod: PaymentMethod = {
  type: "Visa",
  last4: "4242",
  expiry: "09/2027",
  country: "London, UK",
  isActive: true,
};

export const mockBillingHistory: BillingHistoryItem[] = [
  { id: "1", date: "Mar 14, 2026", description: "Clinical Pro", amount: "$19", sessions: "1", status: "Paid" },
  { id: "2", date: "Mar 14, 2026", description: "Clinical Pro", amount: "$19", sessions: "1", status: "Paid" },
  { id: "3", date: "Mar 14, 2026", description: "Clinical Pro", amount: "$19", sessions: "1", status: "Paid" },
  { id: "4", date: "Mar 14, 2026", description: "Clinical Pro", amount: "$19", sessions: "1", status: "Paid" },
];

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: "Free",
    priceAnnually: "Free",
    target: "Residents, students & occasional consultants",
    notesPerMonth: "~30 notes / month",
    categories: [
      { title: "AI SCRIBER", items: ["Max 20 min / session", "30 sessions / month"] },
      { title: "PATIENTS & TASKS", items: ["Up to 60 patient profiles", "Personal tasks only"] },
      { title: "ASSISTANTS", items: ["24+ community assistants", "3 custom assistants"] },
      { title: "EXPORT & COMPLIANCE", items: ["PDF only - 5/month", "GDPR baseline"] },
    ],
    isCurrent: true,
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: "$19",
    priceAnnually: "$15.80",
    target: "Solo GP, dentist or psychotherapist - low volume",
    notesPerMonth: "~300 notes / month",
    categories: [
      { title: "EVERYTHING IN FREE, PLUS", items: ["Unlimited sessions - 60 min max", "Unlimited patients & cases", "90-day session retention"] },
      { title: "ASSISTANTS & CALENDAR", items: ["15 custom assistants", "Patient booking link"] },
      { title: "KNOWLEDGE & EXPORT", items: ["Personal KB - 500 MB", "PDF + DOCX + JSON - no watermark", "Signed BAA / DPA"] },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: "$49",
    priceAnnually: "$40.70",
    target: "Active solo clinician, specialist or high-volume practice",
    notesPerMonth: "~1000 notes / month",
    categories: [
      { title: "EVERYTHING IN STARTER, PLUS", items: ["Unlimited custom assistants", "Flexible 90-day session retention"] },
      { title: "KNOWLEDGE & EXPORT", items: ["Personal KB - 2 GB", "DOCX with own logo & signature"] },
      { title: "COMPLIANCE", items: ["24-month audit log", "Signed BAA / DPA", "Priority email support"] },
    ],
  },
  {
    id: "team",
    name: "Team",
    priceMonthly: "$45",
    priceAnnually: "$38.35",
    target: "GP + assistant, group practice or department",
    notesPerMonth: "~900 notes / seat (pooled)",
    categories: [
      { title: "EVERYTHING IN PRO, PLUS", items: ["Shared patient records & cases", "Role-based access: Admin / Editor / Viewer", "Collaborative task board"] },
      { title: "KNOWLEDGE & CALENDAR", items: ["Team KB - 50 GB + version history", "Assistant sharing scope selector"] },
      { title: "COMPLIANCE", items: ["24-month team audit log", "Custom data residency (EU)"] },
    ],
  },
];

export const mockAdminMembers: AdminAccessMember[] = [
  {
    id: "1",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    role: "Super Admin",
    permissions: ["Edit", "Delete", "Logs"],
    grantedBy: "System",
    grantedAt: "2025-01-15",
    department: "Hospital Admin",
    lastActivity: "Jan 25, 2026",
    tokenUsage: 80000,
    tokenTotal: 100000,
    ipAddress: "System",
    accessLevel: "Full Access",
  },
  {
    id: "2",
    name: "Marvin McKinney",
    email: "marvin.mckinney@example.com",
    role: "Admin - Full Access",
    permissions: ["Edit", "Logs"],
    grantedBy: "Admin User",
    grantedAt: "2025-01-15",
    department: "Nurse",
    lastActivity: "Jan 25, 2026",
    tokenUsage: 30000,
    tokenTotal: 100000,
    ipAddress: "192.168.1.45",
    accessLevel: "Full Access",
  },
  {
    id: "3",
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    role: "Admin - View Only",
    permissions: ["Logs"],
    grantedBy: "Admin User",
    grantedAt: "2025-01-15",
    department: "Clinic",
    lastActivity: "Jan 25, 2026",
    tokenUsage: 10000,
    tokenTotal: 50000,
    ipAddress: "192.168.1.45",
    accessLevel: "View Only",
  },
  {
    id: "4",
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    role: "Admin - View Only",
    permissions: ["Logs"],
    grantedBy: "Admin User",
    grantedAt: "2025-01-15",
    department: "Doctor",
    lastActivity: "Jan 25, 2026",
    tokenUsage: 45000,
    tokenTotal: 100000,
    ipAddress: "192.168.1.45",
    accessLevel: "View Only",
  },
];
