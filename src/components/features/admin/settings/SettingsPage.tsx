"use client";

import React, { useState } from "react";
import { AlertTriangle, DatabaseBackup, ChevronDown, Check, CloudUpload } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import Container from "@/src/components/Container";
import { Button } from "@/src/components/ui/button";
import Heading from "@/src/components/Heading";

// ─── Shared Primitives ────────────────────────────────────────────────────────

/** Card wrapper for each settings section */
function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border/60 rounded-lg p-5 flex flex-col gap-5 ">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/** Labelled text / number input */
function Field({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-foreground/70 tracking-wide uppercase">
        {label}
      </label>
      <input
        {...props}
        className={cn(
          "w-full h-11 px-3.5 rounded-lg border text-sm text-foreground bg-muted/30 border-border",
          "focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all",
          "placeholder:text-muted-foreground/30",
          props.className
        )}
      />
      {hint && (
        <p className="text-[11px] text-muted-foreground/50 italic leading-snug">{hint}</p>
      )}
    </div>
  );
}

/** Custom Styled Select using Popover */
function CustomSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-foreground/70 tracking-wide uppercase">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full h-11 px-3.5 rounded-lg border text-sm text-left flex items-center justify-between transition-all",
              "bg-muted/30 border-border text-foreground hover:border-border/80"
            )}
          >
            <span>{value || "Select..."}</span>
            <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[280px] p-1 bg-popover border-border rounded-lg  z-50">
          <div className="flex flex-col">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium hover:bg-muted/50 rounded-lg transition-colors text-left"
              >
                <span>{opt}</span>
                {value === opt && <Check className="size-4 text-blue-500" />}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/** Checkbox row */
function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-0.5">
      <div
        className={cn(
          "size-4.5 shrink-0 rounded border flex items-center justify-center transition-all",
          checked
            ? "bg-blue-600 border-blue-600"
            : "bg-muted/40 border-border group-hover:border-blue-500/50"
        )}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {checked && (
          <svg className="size-2.5 text-white" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-foreground/80 font-medium select-none">{label}</span>
    </label>
  );
}

/** Primary action button */
function SaveBtn({ onClick, text = "SAVE CHANGES" }: { onClick?: () => void; text?: string }) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      className="uppercase tracking-widest text-xs h-11"
    >
      {text}
    </Button>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function GeneralSection() {
  const [form, setForm] = useState({
    platformName: "MedAI Pro",
    supportEmail: "support@medaipro.com",
    billingEmail: "billing@medaipro.com",
    devOpsEmail: "tech@medaipro.com",
    dpoEmail: "",
    language: "English",
  });

  return (
    <SectionCard icon="📋" title="General">
      <div className="space-y-4">
        <Field label="Platform Name" value={form.platformName} onChange={(e) => setForm({ ...form, platformName: e.target.value })} />
        <Field label="Primary Support Email" value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
        <Field label="Billing / Finance Email" value={form.billingEmail} onChange={(e) => setForm({ ...form, billingEmail: e.target.value })} />
        <Field label="Technical / DevOps Email" value={form.devOpsEmail} onChange={(e) => setForm({ ...form, devOpsEmail: e.target.value })} />
        <Field 
          label="DPO (Data Protection) Email" 
          placeholder="Token Limit/ month" 
          value={form.dpoEmail} 
          onChange={(e) => setForm({ ...form, dpoEmail: e.target.value })}
          hint="Required for GDPR compliance (Art 37)"
        />
        <CustomSelect 
          label="Default Language" 
          options={["English", "French", "German", "Spanish", "Arabic"]} 
          value={form.language} 
          onChange={(v) => setForm({ ...form, language: v })}
        />
      </div>
      <div className="pt-2">
        <SaveBtn />
      </div>
    </SectionCard>
  );
}

function SecuritySection() {
  const [flags, setFlags] = useState({
    twoFa: true,
    logActions: true,
    logEmails: true,
    icd11: true,
    apiAccess: false,
  });

  return (
    <SectionCard icon="🔒" title="Security">
      <div className="space-y-4">
        <Field label="Session Timeout (Min)" type="number" defaultValue="60" />
        <Field label="Max Login Attempt" type="number" defaultValue="5" />
        <div className="space-y-3 pt-2">
          <CheckRow label="2FA for Admins" checked={flags.twoFa} onChange={(v) => setFlags({ ...flags, twoFa: v })} />
          <CheckRow label="Log all actions" checked={flags.logActions} onChange={(v) => setFlags({ ...flags, logActions: v })} />
          <CheckRow label="Log patient emails" checked={flags.logEmails} onChange={(v) => setFlags({ ...flags, logEmails: v })} />
          <CheckRow label="Assessment & Diagnosis (ICD-11)" checked={flags.icd11} onChange={(v) => setFlags({ ...flags, icd11: v })} />
          <CheckRow label="Allow API access" checked={flags.apiAccess} onChange={(v) => setFlags({ ...flags, apiAccess: v })} />
        </div>
      </div>
      <div className="pt-2">
        <SaveBtn />
      </div>
    </SectionCard>
  );
}

function NotificationSection() {
  const [flags, setFlags] = useState({
    newUser: true,
    approval: true,
    flagging: true,
    subscription: true,
    aiBudget: false,
    daily: false,
  });

  return (
    <SectionCard icon="🔔" title="Notification">
      <div className="space-y-3.5 pt-1">
        <CheckRow label="New user registration" checked={flags.newUser} onChange={(v) => setFlags({ ...flags, newUser: v })} />
        <CheckRow label="Assistant approval needed" checked={flags.approval} onChange={(v) => setFlags({ ...flags, approval: v })} />
        <CheckRow label="Flagging account" checked={flags.flagging} onChange={(v) => setFlags({ ...flags, flagging: v })} />
        <CheckRow label="Subscription expiring soon" checked={flags.subscription} onChange={(v) => setFlags({ ...flags, subscription: v })} />
        <CheckRow label="AI sess over budget" checked={flags.aiBudget} onChange={(v) => setFlags({ ...flags, aiBudget: v })} />
        <CheckRow label="Daily revenue Email" checked={flags.daily} onChange={(v) => setFlags({ ...flags, daily: v })} />
      </div>
      <div className="pt-4">
        <SaveBtn />
      </div>
    </SectionCard>
  );
}

function DataGDPRSection() {
  const [flags, setFlags] = useState({
    autoDelete: true,
    anonymize: true,
    rightToErase: true,
    logExports: true,
    allowExport: false,
  });

  return (
    <SectionCard icon="📊" title="Data Management & GDPR">
      <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3">
        <span className="text-base">🔒</span>
        <p className="text-[11px] font-medium text-amber-500/80 leading-relaxed uppercase tracking-wider">
          GDPR / ISO 27001 compliance settings — changes are logged in Audit Logs
        </p>
      </div>

      <div className="space-y-4">
        <Field label="Audit Log Retention (days)" type="number" defaultValue="730" hint="ISO 20001 recommends min 1 year. GDPR: max as needed" />
        <Field label="Patient Data Retention (days)" type="number" defaultValue="3650" hint="Medical records: typically 10 years (country-Dependent)" />
        <Field label="Case Auto-Delete for Free Users (days)" type="number" defaultValue="30" />
        <Field label="Case Auto-Delete for Pro Users (days)" type="number" defaultValue="90" />
        <Field label="Max File Upload per Case (MB)" type="number" defaultValue="50" />

        <div className="space-y-3 pt-2">
          <CheckRow label="Auto-delete expired trial accounts after 30 days" checked={flags.autoDelete} onChange={(v) => setFlags({ ...flags, autoDelete: v })} />
          <CheckRow label="GDPR: Anonymize user data on account deletion" checked={flags.anonymize} onChange={(v) => setFlags({ ...flags, anonymize: v })} />
          <CheckRow label="GDPR: Right-to-ensure: allow users to request data deletion" checked={flags.rightToErase} onChange={(v) => setFlags({ ...flags, rightToErase: v })} />
          <CheckRow label="Log all data export actions in audit log" checked={flags.logExports} onChange={(v) => setFlags({ ...flags, logExports: v })} />
          <CheckRow label="Allow users to export their own data (GDPR Art. 20)" checked={flags.allowExport} onChange={(v) => setFlags({ ...flags, allowExport: v })} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SaveBtn />
        <Button
          variant="ghost"
          className="h-12 px-6 bg-[#F5C4C4] hover:bg-[#fa0000] hover:text-[#ffffff] text-[#fa0000] font-bold uppercase tracking-widest rounded-md border-none gap-3"
        >
          <CloudUpload className="size-5 hover:text-[#ffffff] text-[#fa0000]" />
          BACKUP NOW
        </Button>
      </div>
    </SectionCard>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <Container>
      <div className="">
        <Heading title="System Settings" />

        <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4 items-start">
          <div className="space-y-4">
            <GeneralSection />
            <NotificationSection />
          </div>
          <div className="space-y-4">
            <SecuritySection />
            <DataGDPRSection />
          </div>
        </div>
      </div>
    </Container>
  );
}
