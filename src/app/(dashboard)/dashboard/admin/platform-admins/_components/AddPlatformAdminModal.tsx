"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { DEPARTMENTS, TEAMS } from "../_constants";

// ─── Static Options ───────────────────────────────────────────────────────────
const ROLES = ["User", "Dept Admin", "Super Admin"];
const STATUSES = ["Active", "Inactive", "Suspended", "Flagged"];
const PLANS = ["Free", "Pro", "Enterprise"];
const PAYMENT_STATUSES = ["Free", "Trial", "Paid", "Expired"];

const STATUS_COLOR: Record<string, string> = {
  Active: "text-emerald-500",
  Inactive: "text-slate-400",
  Suspended: "text-amber-500",
  Flagged: "text-rose-500",
};

// ─── Shared Styles ────────────────────────────────────────────────────────────
const TRIGGER_CLS = cn(
  "w-full h-11 px-4 rounded-xl border text-sm text-left flex items-center justify-between transition-all cursor-pointer",
  "bg-muted/50 border-border text-foreground hover:border-primary-foreground/30"
);
const PANEL_CLS =
  "p-0 w-[240px] bg-popover border border-border shadow-2xl rounded-xl overflow-hidden z-[200]";
const PANEL_TITLE_CLS =
  "text-base font-bold text-foreground px-4 pt-4 pb-3 border-b border-border";
const SEARCH_CLS = cn(
  "w-full h-10 pl-9 pr-3 rounded-xl border text-sm transition-all focus:outline-none",
  "bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-blue-500/50"
);

// ─── Reusable sub-components ─────────────────────────────────────────────────

/** Simple list dropdown (no search) */
function SimpleSelect({
  label,
  options,
  value,
  onChange,
  colorMap,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  colorMap?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={TRIGGER_CLS}>
          <span className={cn(value ? (colorMap?.[value] ?? "text-foreground") : "text-muted-foreground/50")}>
            {value || label}
          </span>
          <ChevronDown className={cn("size-4 text-muted-foreground/50 shrink-0 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={4} className={PANEL_CLS}>
        <p className={PANEL_TITLE_CLS}>{label}</p>
        <div className="flex flex-col py-1">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <span className={colorMap?.[opt] ?? "text-foreground/80"}>{opt}</span>
              {value === opt && <Check className="size-4 text-blue-500 shrink-0" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/** Searchable list dropdown */
function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (!v) setQ(""); }}>
      <PopoverTrigger asChild>
        <button type="button" className={TRIGGER_CLS}>
          <span className={value ? "text-foreground" : "text-muted-foreground/50"}>
            {value || label}
          </span>
          <ChevronDown className={cn("size-4 text-muted-foreground/50 shrink-0 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={4} className={PANEL_CLS}>
        <p className={PANEL_TITLE_CLS}>{label}</p>
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/40" />
            <input
              className={SEARCH_CLS}
              placeholder={placeholder}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); setQ(""); }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span>{opt}</span>
                {value === opt && <Check className="size-4 text-blue-500 shrink-0 ml-2" />}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-xs text-muted-foreground/50">No results</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/** Labelled form field wrapper */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-foreground/70 tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  );
}

// ─── Form State ───────────────────────────────────────────────────────────────
export interface FormState {
  fullName: string;
  email: string;
  role: string;
  status: string;
  department: string;
  team: string;
  plan: string;
  paymentStatus: string;
  tokenLimit: string;
  casesLimit: string;
  storageLimit: string;
  storageUsed: string;
}

const INITIAL: FormState = {
  fullName: "",
  email: "",
  role: "",
  status: "",
  department: "",
  team: "",
  plan: "",
  paymentStatus: "",
  tokenLimit: "",
  casesLimit: "",
  storageLimit: "",
  storageUsed: "",
};

// ─── Modal ────────────────────────────────────────────────────────────────────
interface AddPlatformAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: FormState) => void;
  /** Pass to open in Edit mode with pre-filled data */
  initialData?: Partial<FormState>;
}

export function AddPlatformAdminModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddPlatformAdminModalProps) {
  const isEditMode = !!initialData;
  const [form, setForm] = useState<FormState>(INITIAL);

  // Seed or reset form whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(initialData ? { ...INITIAL, ...initialData } : INITIAL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    onSave?.(form);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Platform Admin" : "Add Platform Admin"}
      maxWidth="sm:max-w-[700px]"

    >
      <div className="space-y-4">

        {/* Row 1 — Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name">
            <Input
              placeholder="e.g. Saifur"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className="h-11 bg-muted/50 border-border placeholder:text-muted-foreground/40"
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              placeholder="e.g. admin@gmail.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="h-11 bg-muted/50 border-border placeholder:text-muted-foreground/40"
            />
          </Field>
        </div>

        {/* Row 2 — Role & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Role">
            <SimpleSelect
              label="Select Role"
              options={ROLES}
              value={form.role}
              onChange={(v) => set("role", v)}
            />
          </Field>
          <Field label="Status">
            <SimpleSelect
              label="Select Status"
              options={STATUSES}
              value={form.status}
              onChange={(v) => set("status", v)}
              colorMap={STATUS_COLOR}
            />
          </Field>
        </div>

        {/* Row 3 — Department & Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Department">
            <SearchableSelect
              label="No Dept"
              options={DEPARTMENTS}
              value={form.department}
              onChange={(v) => set("department", v)}
              placeholder="Search by name, patient id"
            />
          </Field>
          <Field label="Team / Organization">
            <SearchableSelect
              label="Select Team"
              options={TEAMS}
              value={form.team}
              onChange={(v) => set("team", v)}
              placeholder="Search team"
            />
          </Field>
        </div>

        {/* Row 4 — Plan & Payment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Plan">
            <SimpleSelect
              label="Select Plan"
              options={PLANS}
              value={form.plan}
              onChange={(v) => set("plan", v)}
            />
          </Field>
          <Field label="Payment Status">
            <SimpleSelect
              label="Select Payment Status"
              options={PAYMENT_STATUSES}
              value={form.paymentStatus}
              onChange={(v) => set("paymentStatus", v)}
            />
          </Field>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-4">
          <p className="text-sm font-bold text-foreground mb-4">
            Limit Overrides{" "}
            <span className="text-muted-foreground font-normal">
              (leave blank = use plan default)
            </span>
          </p>

          {/* Row 5 — Token & Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Field label="Token Limit Override">
              <Input
                placeholder="e.g. 1000000"
                value={form.tokenLimit}
                onChange={(e) => set("tokenLimit", e.target.value)}
                className="h-11 bg-muted/50 border-border placeholder:text-muted-foreground/40"
              />
            </Field>
            <Field label="Cases Limit Override">
              <Input
                placeholder="e.g. 50"
                value={form.casesLimit}
                onChange={(e) => set("casesLimit", e.target.value)}
                className="h-11 bg-muted/50 border-border placeholder:text-muted-foreground/40"
              />
            </Field>
          </div>

          {/* Row 6 — Storage Limit & Storage Used */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Field label="Storage Limit Override">
                <Input
                  placeholder="e.g. 50 GB, 500 MB (Blank= plan default)"
                  value={form.storageLimit}
                  onChange={(e) => set("storageLimit", e.target.value)}
                  className="h-11 bg-muted/50 border-border placeholder:text-muted-foreground/40"
                />
              </Field>
              <p className="text-[11px] text-muted-foreground/60">
                Current plan defaults: Free 1 GB · Pro 20 GB · Enterprise unlimited
              </p>
            </div>
            <div className="space-y-1.5">
              <Field label="Storage Used (display)">
                <Input
                  placeholder="e.g. 2 GB"
                  value={form.storageUsed}
                  onChange={(e) => set("storageUsed", e.target.value)}
                  className="h-11 bg-muted/50 border-border placeholder:text-muted-foreground/40"
                />
              </Field>
              <p className="text-[11px] text-muted-foreground/60">
                effective limit{" "}
                <span className="text-blue-400 font-semibold">unlimited</span>
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="bg-background hover:bg-muted text-foreground border border-border h-12 p-4 transition-all"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            variant="primary"
            onClick={handleSave}
            className="h-11 px-6 uppercase tracking-wide"
          >
            {isEditMode ? "Save Changes" : "Add Admin"}
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
}
