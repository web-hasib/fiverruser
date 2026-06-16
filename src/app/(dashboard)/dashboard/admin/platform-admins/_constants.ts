// ─── Types ────────────────────────────────────────────────────────────────────
export interface PlatformAdmin {
  id: string;
  name: string;
  initials: string;
  email: string;
  lastLogin: string;
  status: "Active" | "Inactive";
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
export const DUMMY_ADMINS: PlatformAdmin[] = Array.from({ length: 16 }, (_, i) => ({
  id: String(i + 1),
  name: "Cameron Williamson",
  initials: "cw",
  email: "drsaifur@gmail.com",
  lastLogin: "2026-03-11",
  status: "Active",
}));

// ─── Filter Options ───────────────────────────────────────────────────────────
export const SORT_OPTIONS = ["A-Z", "Z-A", "New Only"];

export const DEPARTMENTS = [
  "General Medicine",
  "Neurology",
  "Dentistry",
  "Pharmacy / Medication",
  "Pulmonology (Lungs)",
];

export const TEAMS = [
  "St. Mary's Hospital",
  "City Medical Center",
  "Green Valley Clinic",
  "Berlin Medical",
];

export const STATUS_OPTIONS = ["Active", "Inactive", "Suspended", "Flagged"];

export const STATUS_COLOR: Record<string, string> = {
  Active: "text-emerald-500",
  Inactive: "text-slate-400",
  Suspended: "text-amber-500",
  Flagged: "text-rose-500",
};

// ─── Shared Styles ────────────────────────────────────────────────────────────
export const FILTER_BTN =
  "shrink-0 flex items-center gap-2 bg-card border border-border/50 rounded-lg px-3.5 py-2.5 text-[12px] font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-all whitespace-nowrap";

export const PANEL_TITLE =
  "text-base font-bold text-foreground px-4 pt-4 pb-3 border-b border-border";

export const SEARCH_INPUT =
  "w-full h-10 pl-9 pr-3 rounded-xl border text-sm transition-all focus:outline-none bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-blue-500/50";

export const POPOVER_PANEL =
  "p-0 bg-popover border border-border shadow-2xl rounded-xl overflow-hidden z-50";
