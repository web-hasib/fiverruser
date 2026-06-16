"use client";

import React from "react";
import { Phone, Mail, Camera } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { TeamMember } from "./types";

interface TeamMemberTableProps {
    members: TeamMember[];
    onSelect: (member: TeamMember) => void;
}

const statusConfig = {
    "on-duty": { bg: "bg-emerald-500/15", text: "text-emerald-500", dot: "bg-emerald-500", label: "On Duty" },
    "on-call": { bg: "bg-amber-500/15", text: "text-amber-500", dot: "bg-amber-500", label: "On Call" },
    "on-or": { bg: "bg-blue-500/15", text: "text-blue-500", dot: "bg-blue-500", label: "On OR" },
    "day-off": { bg: "bg-slate-500/15", text: "text-slate-400", dot: "bg-slate-400", label: "Day Off" }
};

const avatarColors = [
    "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-emerald-500",
    "bg-rose-500", "bg-amber-500", "bg-cyan-500", "bg-teal-500"
];

export function TeamMemberTable({ members, onSelect }: TeamMemberTableProps) {
    return (
        <div className="bg-[#1a1d24] border border-[#2d3748] rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#252a33] border-b border-[#2d3748] text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="col-span-3">Team Member</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Contact</div>
                <div className="col-span-1 text-center">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#2d3748]/50">
                {members.map((member) => {
                    const status = statusConfig[member.status];
                    const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase();
                    const avatarColor = avatarColors[parseInt(member.id) % avatarColors.length];

                    return (
                        <div
                            key={member.id}
                            onClick={() => onSelect(member)}
                            className="grid grid-cols-12 gap-4 px-4 py-3 items-center cursor-pointer hover:bg-[#252a33]/50 transition-colors"
                        >
                            {/* Team Member */}
                            <div className="col-span-3 flex items-center gap-3 min-w-0">
                                <div className={cn("size-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0", avatarColor)}>
                                    {initials}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {member.firstName} {member.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{member.email}</p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="col-span-2">
                                <span className="text-sm text-gray-300">{member.role}</span>
                            </div>

                            {/* Department */}
                            <div className="col-span-2">
                                <span className="text-sm text-gray-400">{member.department}</span>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                <div className={cn(
                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",
                                    status.bg, status.text
                                )}>
                                    <span className={cn("size-1.5 rounded-full", status.dot)} />
                                    {status.label}
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="col-span-2 flex items-center gap-2">
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="size-7 rounded-lg border border-[#2d3748] flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                >
                                    <Phone className="size-3.5" />
                                </button>
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="size-7 rounded-lg border border-[#2d3748] flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                >
                                    <Mail className="size-3.5" />
                                </button>
                                <span className="text-xs text-gray-500">{member.phone}</span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 flex items-center justify-center gap-1">
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="size-7 rounded-lg border border-[#2d3748] flex items-center justify-center text-amber-500 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                                >
                                    <Camera className="size-3.5" />
                                </button>
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-7 px-2 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition-colors"
                                >
                                    {member.tasks} Tasks
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
