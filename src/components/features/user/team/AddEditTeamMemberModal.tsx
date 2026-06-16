"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { ROLES, DEPARTMENTS, SPECIALTIES, STATUSES } from "./data";

// ─── Styles ───────────────────────────────────────────────────────────────────
const INPUT_STYLE = cn(
    "w-full h-12 px-4 rounded-xl border text-sm transition-all focus:outline-none",
    "bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50",
    "focus:border-blue-500/50"
);

const LABEL_STYLE = "text-sm font-medium text-primary-foreground/70 mb-2 block";

const REQUIRED_STYLE = "text-red-500 ml-0.5";

// ─── Dropdown Component ───────────────────────────────────────────────────────
function FormDropdown({
    label,
    value,
    options,
    onChange,
    placeholder,
    required = false
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-2">
            <label className={LABEL_STYLE}>
                {label}
                {required && <span className={REQUIRED_STYLE}>*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        INPUT_STYLE,
                        "flex items-center justify-between text-left",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value || placeholder}
                    <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-3 text-left text-sm hover:bg-primary-foreground/5 transition-colors",
                                        value === option ? "text-blue-500 bg-blue-500/10" : "text-foreground"
                                    )}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Form State Type ──────────────────────────────────────────────────────────
export interface TeamMemberFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    specialty: string;
    department: string;
    pager: string;
    status: string;
}

interface AddEditTeamMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: TeamMemberFormData) => void;
    member?: any | null; // Using any to avoid strict type issues with TeamMember vs FormData
}

export function AddEditTeamMemberModal({
    isOpen,
    onClose,
    onSave,
    member,
}: AddEditTeamMemberModalProps) {
    const isEditMode = !!member;

    const [formData, setFormData] = useState<TeamMemberFormData>({
        firstName: member?.firstName || "",
        lastName: member?.lastName || "",
        email: member?.email || "",
        phone: member?.phone || "",
        role: member?.role || "",
        specialty: member?.specialty || "",
        department: member?.department || "",
        pager: member?.pager || "",
        status: member?.status || "On Duty",
    });

    const handleChange = <K extends keyof TeamMemberFormData>(
        field: K,
        value: TeamMemberFormData[K]
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <DashboardModal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Edit Team Member" : "Add New Team Member"}
            maxWidth="sm:max-w-lg"
        >
            <div className="space-y-5">
                {/* Full Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={LABEL_STYLE}>
                            First Name<span className={REQUIRED_STYLE}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Alma"
                            className={INPUT_STYLE}
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={LABEL_STYLE}>
                            Last Name<span className={REQUIRED_STYLE}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Lawson"
                            className={INPUT_STYLE}
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                    </div>
                </div>
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={LABEL_STYLE}>
                            Email ID<span className={REQUIRED_STYLE}>*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="alma.lawson@example.com"
                            className={INPUT_STYLE}
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={LABEL_STYLE}>
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="e.g. +1 234 567 8900"
                            className={INPUT_STYLE}
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                </div>

                {/* Role & Specialty */}
                <div className="grid grid-cols-2 gap-4">
                    <FormDropdown
                        label="Role"
                        value={formData.role}
                        options={ROLES}
                        onChange={(v) => handleChange("role", v)}
                        placeholder="Select role"
                        required
                    />
                    <FormDropdown
                        label="Specialty"
                        value={formData.specialty}
                        options={SPECIALTIES}
                        onChange={(v) => handleChange("specialty", v)}
                        placeholder="Select specialty"
                        required
                    />
                </div>

                {/* Department & Pager */}
                <div className="grid grid-cols-2 gap-4">
                    <FormDropdown
                        label="Department"
                        value={formData.department}
                        options={DEPARTMENTS}
                        onChange={(v) => handleChange("department", v)}
                        placeholder="Select department"
                    />
                    <div className="space-y-2">
                        <label className={LABEL_STYLE}>Pager</label>
                        <input
                            type="text"
                            placeholder="e.g. (P-112)"
                            className={INPUT_STYLE}
                            value={formData.pager}
                            onChange={(e) => handleChange("pager", e.target.value)}
                        />
                    </div>
                </div>

                {/* Status */}
                <FormDropdown
                    label="Status"
                    value={formData.status}
                    options={["On Duty", "On Call", "On OR", "Day Off"]}
                    onChange={(v) => handleChange("status", v)}
                    placeholder="Select status"
                />

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="ghost"
                        className="h-11 px-6 text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="h-11 px-8 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                        {isEditMode ? "UPDATE MEMBER" : "ADD MEMBER"}
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
