"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { AdminUser } from "./UsersTable";

interface EditUserModalProps {
    open: boolean;
    user: AdminUser | null;
    onClose: () => void;
    onSave: (user: AdminUser) => void;
}

const PLAN_OPTIONS = ["Free", "Pro", "Enterprise"];
const PAYMENT_OPTIONS = ["Paid", "Expired", "Trail"];
const STATUS_OPTIONS = ["Active", "Inactive", "Suspended", "Flagged"];

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

export default function EditUserModal({ open, user, onClose, onSave }: EditUserModalProps) {
    const [form, setForm] = useState<AdminUser | null>(user);

    useEffect(() => {
        setForm(user);
    }, [user]);

    if (!form) return null;

    const set = (key: keyof AdminUser, val: string | number) =>
        setForm((prev) => prev ? { ...prev, [key]: val } : prev);

    return (
        <DashboardModal
            isOpen={open}
            onClose={onClose}
            title="Edit User"
            maxWidth="sm:max-w-[540px]"
        >
            <div className="space-y-5">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <FieldLabel required>Full Name</FieldLabel>
                        <Input value={form.name} onChange={(v) => set("name", v)} placeholder="e.g. Cardiology" />
                    </div>
                    <div>
                        <FieldLabel required>Email</FieldLabel>
                        <Input value={form.email} onChange={(v) => set("email", v)} placeholder="user@example.com" type="email" />
                    </div>
                </div>

                {/* Row 2: Plan + Payment */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <FieldLabel>Plan</FieldLabel>
                        <Select value={form.plan} onChange={(v) => set("plan", v as AdminUser["plan"])} options={PLAN_OPTIONS} />
                    </div>
                    <div>
                        <FieldLabel>Payment Status</FieldLabel>
                        <Select value={form.payment} onChange={(v) => set("payment", v)} options={PAYMENT_OPTIONS} />
                    </div>
                </div>

                {/* Row 3: Status */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <FieldLabel>Status</FieldLabel>
                        <Select value={form.status} onChange={(v) => set("status", v as AdminUser["status"])} options={STATUS_OPTIONS} />
                    </div>
                </div>

                {/* Limit Overrides */}
                <div>
                    <p className="text-sm font-semibold text-blue-500 mb-1">
                        Limit Overrides{" "}
                        <span className="text-xs text-muted-foreground font-normal">(leave blank = use plan default</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <FieldLabel>Token Limit Override</FieldLabel>
                            <Input
                                value={form.tokenLimit ? String(form.tokenLimit) : ""}
                                onChange={(v) => set("tokenLimit", Number(v))}
                                placeholder="e.g. 1000000"
                            />
                        </div>
                        <div>
                            <FieldLabel>Sessions Limit Override</FieldLabel>
                            <Input
                                value={form.sessionsLimit ? String(form.sessionsLimit) : ""}
                                onChange={(v) => set("sessionsLimit", Number(v))}
                                placeholder="e.g. 50"
                            />
                        </div>
                        <div>
                            <FieldLabel>Storage Limit Override</FieldLabel>
                            <Input
                                value={form.storageLimitOverride ?? ""}
                                onChange={(v) => set("storageLimitOverride", v)}
                                placeholder="e.g. 50 GB, 500 MB (Blank= plan default)"
                            />
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Current plan defaults: Free 1 GB · Pro 20 GB · Enterprise unlimited
                            </p>
                        </div>
                        <div>
                            <FieldLabel>Storage Used (display)</FieldLabel>
                            <Input
                                value={form.storageUsed ?? ""}
                                onChange={(v) => set("storageUsed", v)}
                                placeholder="2 GB"
                            />
                            <p className="text-[10px] text-muted-foreground mt-1">effective limit unlimited</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={onClose} className="border border-border text-foreground hover:bg-muted">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => form && onSave(form)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                    >
                        SAVE DEPARTMENT
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
