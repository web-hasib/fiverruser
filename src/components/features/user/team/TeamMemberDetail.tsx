"use client";

import React, { useState } from "react";
import { X, Phone, Mail, MapPin, Calendar, Clock, CheckSquare, Plus, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { TeamMember, Task } from "./types";
import { ACCESS_TYPES } from "./data";

interface TeamMemberDetailProps {
    member: TeamMember | null;
    onClose: () => void;
    onEdit: () => void;
}

const statusConfig = {
    "on-duty": { bg: "bg-emerald-500/15", text: "text-emerald-500", dot: "bg-emerald-500", label: "On Duty" },
    "on-call": { bg: "bg-amber-500/15", text: "text-amber-500", dot: "bg-amber-500", label: "On Call" },
    "on-or": { bg: "bg-blue-500/15", text: "text-blue-500", dot: "bg-blue-500", label: "On OR" },
    "day-off": { bg: "bg-slate-500/15", text: "text-slate-400", dot: "bg-slate-400", label: "Day Off" }
};

const priorityConfig = {
    "High": { bg: "bg-rose-500/15", text: "text-rose-500", border: "border-rose-500/30" },
    "Medium": { bg: "bg-emerald-500/15", text: "text-emerald-500", border: "border-emerald-500/30" },
    "Low": { bg: "bg-blue-500/15", text: "text-blue-500", border: "border-blue-500/30" }
};

const avatarColors = [
    "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-emerald-500",
    "bg-rose-500", "bg-amber-500", "bg-cyan-500", "bg-teal-500"
];

function TaskItem({ task, showCheckbox = false }: { task: Task; showCheckbox?: boolean }) {
    const priority = priorityConfig[task.priority];
    return (
        <div className="flex items-center gap-3 py-2">
            {showCheckbox && (
                <div className={cn(
                    "size-5 rounded border flex items-center justify-center shrink-0 cursor-pointer",
                    task.completed
                        ? "bg-blue-500 border-blue-500"
                        : "border-border bg-transparent"
                )}>
                    {task.completed && <Check className="size-3 text-white" />}
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-primary-foreground/70 truncate">{task.title}</p>
                <p className="text-xs text-primary-foreground/50">{task.category} | {task.assignedBy}</p>
            </div>
            <span className={cn(
                "px-2 py-0.5 rounded text-xs font-medium border",
                priority.bg, priority.text, priority.border
            )}>
                {task.priority}
            </span>
        </div>
    );
}

function SectionWithTags({
    title,
    items,
}: {
    title: string;
    items: string[];
}) {
    return (
        <div className="border-t border-border/50 pt-4">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-primary-foreground/40 uppercase tracking-wider">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item, idx) => (
                    <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-primary-foreground/70 text-sm font-semibold border border-border/50"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

import { DashboardModal } from "@/src/components/dashboard/DashboardModal";

export function TeamMemberDetail({ member, onClose, onEdit }: TeamMemberDetailProps) {
    const [activeAccessTab, setActiveAccessTab] = useState(member?.accessType || "Member");

    if (!member) return null;

    const status = statusConfig[member.status];
    const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase();
    const avatarColor = avatarColors[parseInt(member.id) % avatarColors.length];

    return (
        <DashboardModal
            isOpen={!!member}
            onClose={onClose}
            title="Profile Details"
            maxWidth="sm:max-w-[500px]"
            className="p-0"
        >
            <div className="flex flex-col">
                {/* Content */}
                <div className="flex-1">
                    {/* Avatar & Name Section */}
                    <div className="py-6 text-center border-b border-border/50">
                        <div className={cn("size-24 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-xl shadow-blue-500/20", avatarColor)}>
                            {initials}
                        </div>
                        <h3 className="text-xl font-bold text-primary-foreground mb-1">
                            {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-sm text-primary-foreground/60 mb-4">{member.role}, {member.department}</p>

                        <div className="flex items-center justify-center gap-2">
                            <button className="h-7 px-3 rounded-lg bg-blue-500/15 text-blue-500 text-xs font-bold hover:bg-blue-500/25 transition-colors">
                                {member.tasks} Tasks
                            </button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="py-6 border-b border-border/50">
                        <h4 className="text-sm font-bold text-primary-foreground/40 uppercase tracking-wider mb-5">Contact Info</h4>
                        <div className="grid grid-cols-1 gap-5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-primary-foreground/50">
                                    <Phone className="size-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-bold text-primary-foreground/40 uppercase">Mobile Number</p>
                                    <p className="text-sm font-semibold text-primary-foreground">{member.mobileNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-primary-foreground/50">
                                    <Mail className="size-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-bold text-primary-foreground/40 uppercase">Email Address</p>
                                    <p className="text-sm font-semibold text-primary-foreground">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-primary-foreground/50">
                                    <MapPin className="size-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-bold text-primary-foreground/40 uppercase">Pager</p>
                                    <p className="text-sm font-semibold text-primary-foreground">{member.pager}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="py-6 space-y-6">
                        {/* Profession */}
                        <div>
                            <h4 className="text-sm font-bold text-primary-foreground/40 uppercase tracking-wider mb-3">Profession</h4>
                            <div className="inline-flex px-3 py-1.5 rounded-lg bg-muted border border-border/50 text-sm font-semibold text-primary-foreground/70">
                                {member.profession}
                            </div>
                        </div>

                        {/* Specialties */}
                        <SectionWithTags
                            title="Specialties"
                            items={member.specialties}
                        />

                        {/* Roles */}
                        <SectionWithTags
                            title="Roles"
                            items={member.roles}
                        />

                        {/* Joined Date */}
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50">
                            <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-primary-foreground/50">
                                <Calendar className="size-5" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-primary-foreground/40 uppercase">Joined Since</p>
                                <p className="text-sm font-semibold text-primary-foreground">{member.joinDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-2 border-t border-border/50 flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-11 bg-muted hover:bg-muted/80 text-primary-foreground/70 font-bold rounded-xl transition-all"
                    >
                        Close
                    </button>
                    <button
                        onClick={onEdit}
                        className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </DashboardModal>
    );
}
