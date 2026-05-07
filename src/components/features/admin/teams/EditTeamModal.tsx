"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { OrgTeam } from "./types";

interface EditTeamModalProps {
    open: boolean;
    team: OrgTeam | null;
    onClose: () => void;
    onSave: (team: OrgTeam) => void;
}

const TYPE_OPTIONS = ["Hospital", "Clinic", "Lab", "Pharmacy", "Other"];
const PLAN_OPTIONS = ["Free", "Pro", "Enterprise"];
const PAYMENT_OPTIONS = ["Paid", "Expired", "Trail"];

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-sm font-semibold text-blue-500 mb-4">{children}</h3>
    );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            {children}
            {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
    );
}

function Input({
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
                "w-full bg-background border border-border text-foreground text-sm",
                "rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50",
                "placeholder:text-muted-foreground/50 transition-colors"
            )}
        />
    );
}

function Select({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
                "w-full bg-background border border-border text-foreground text-sm",
                "rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50",
                "cursor-pointer appearance-none transition-colors"
            )}
        >
            {options.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
    );
}

export default function EditTeamModal({ open, team, onClose, onSave }: EditTeamModalProps) {
    const [form, setForm] = useState<OrgTeam | null>(team);

    useEffect(() => {
        setForm(team);
    }, [team]);

    if (!form) return null;

    const set = (key: keyof OrgTeam, val: string | number | boolean) =>
        setForm((prev) => prev ? { ...prev, [key]: val } : prev);

    return (
        <DashboardModal
            isOpen={open}
            onClose={onClose}
            title="Edit Team/ORG"
            maxWidth="sm:max-w-[560px]"
        >
            <div className="space-y-6">
                {/* ── Basic Info ── */}
                <div>
                    <SectionTitle>Basic Info</SectionTitle>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <FieldLabel required>Team Name</FieldLabel>
                            <Input value={form.name} onChange={(v) => set("name", v)} placeholder="e.g. Cardiology" />
                        </div>
                        <div>
                            <FieldLabel>Type</FieldLabel>
                            <Select value={form.type} onChange={(v) => set("type", v)} options={TYPE_OPTIONS} />
                        </div>
                        <div>
                            <FieldLabel required>Contact Email</FieldLabel>
                            <Input value={form.contactEmail} onChange={(v) => set("contactEmail", v)} placeholder="null@gmail.com" type="email" />
                        </div>
                        <div>
                            <FieldLabel>Phone (Optional)</FieldLabel>
                            <Input value={form.phone} onChange={(v) => set("phone", v)} placeholder="+93698764565" />
                        </div>
                        <div>
                            <FieldLabel>Plan</FieldLabel>
                            <Select value={form.plan} onChange={(v) => set("plan", v)} options={PLAN_OPTIONS} />
                        </div>
                        <div>
                            <FieldLabel>Payment Status</FieldLabel>
                            <Select value={form.payment} onChange={(v) => set("payment", v)} options={PAYMENT_OPTIONS} />
                        </div>
                    </div>
                </div>

                {/* ── Address & Billing ── */}
                <div>
                    <SectionTitle>Address &amp; Billing</SectionTitle>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <FieldLabel>Address</FieldLabel>
                            <Input value={form.address} onChange={(v) => set("address", v)} placeholder="1 Hospital street" />
                        </div>
                        <div>
                            <FieldLabel>Billing Address</FieldLabel>
                            <Input value={form.billingAddress} onChange={(v) => set("billingAddress", v)} placeholder="1 Hospital street" />
                        </div>
                        <div>
                            <FieldLabel>City</FieldLabel>
                            <Input value={form.city} onChange={(v) => set("city", v)} placeholder="Dhaka" />
                        </div>
                        <div>
                            <FieldLabel>Country</FieldLabel>
                            <Input value={form.country} onChange={(v) => set("country", v)} placeholder="Bangladesh" />
                        </div>
                        <div>
                            <FieldLabel>VAT Number</FieldLabel>
                            <Input value={form.vatNumber} onChange={(v) => set("vatNumber", v)} placeholder="24235264326" />
                        </div>
                        <div>
                            <FieldLabel>Zip / Postal Code</FieldLabel>
                            <Input value={form.zipCode} onChange={(v) => set("zipCode", v)} placeholder="1022" />
                        </div>
                    </div>
                </div>

                {/* ── Team Limit ── */}
                <div>
                    <div className="mb-4">
                        <span className="text-sm font-semibold text-blue-500">Team Limit </span>
                        <span className="text-xs text-muted-foreground">(leave blank = use plan default)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <FieldLabel>Token Limit Override</FieldLabel>
                            <Input value={String(form.tokenLimit ?? "")} onChange={(v) => set("tokenLimit", Number(v))} placeholder="e.g. 1000000" />
                        </div>
                        <div>
                            <FieldLabel>Sessions Limit Override</FieldLabel>
                            <Input value={String(form.sessionsLimit ?? "")} onChange={(v) => set("sessionsLimit", Number(v))} placeholder="e.g. 50" />
                        </div>
                        <div>
                            <FieldLabel>Storage Limit Override</FieldLabel>
                            <Input value={form.storageLimitOverride} onChange={(v) => set("storageLimitOverride", v)} placeholder="e.g. 50 GB, 500 MB (Bank= plan default)" />
                        </div>
                        <div>
                            <FieldLabel>Storage Used (display)</FieldLabel>
                            <Input value={form.storageUsed} onChange={(v) => set("storageUsed", v)} placeholder="2 GB" />
                        </div>
                    </div>
                </div>

                {/* ── Actions ── */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={onClose} className="border border-border text-foreground hover:bg-muted">
                        Cancel
                    </Button>
                    <Button onClick={() => form && onSave(form)} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                        SAVE TEAMS
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
