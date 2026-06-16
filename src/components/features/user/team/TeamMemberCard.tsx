"use client";

import React from "react";
import { Phone, Mail, Camera, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { TeamMember } from "./types";

interface TeamMemberCardProps {
    member: TeamMember;
    isSelected: boolean;
    onClick: () => void;
    onEdit?: () => void;
}

const statusConfig = {
    "on-duty": {
        bg: "bg-emerald-500/15",
        text: "text-emerald-500",
        dot: "bg-emerald-500",
        label: "On Duty"
    },
    "on-call": {
        bg: "bg-amber-500/15",
        text: "text-amber-500",
        dot: "bg-amber-500",
        label: "On Call"
    },
    "on-or": {
        bg: "bg-blue-500/15",
        text: "text-blue-500",
        dot: "bg-blue-500",
        label: "On OR"
    },
    "day-off": {
        bg: "bg-slate-500/15",
        text: "text-slate-400",
        dot: "bg-slate-400",
        label: "Day Off"
    }
};

const avatarColors = [
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-teal-500"
];

export function TeamMemberCard({ member, isSelected, onClick, onEdit }: TeamMemberCardProps) {
    const status = statusConfig[member.status];
    const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase();
    const avatarColor = avatarColors[parseInt(member.id) % avatarColors.length];

    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-primary border border-primary-foreground/20 rounded-xl p-4 flex flex-col gap-3 cursor-pointer transition-all duration-200",
                "hover:border-primary-foreground/30",
                isSelected ? "border-blue-500/50 ring-1 ring-blue-500/20" : ""
            )}
        >
            {/* Avatar + Name + Role */}
            <div className="flex items-start gap-3">
                <div className={cn("size-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0", avatarColor)}>
                    {initials}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-primary-foreground truncate">
                        {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-xs text-primary-foreground/50 truncate">
                        {member.role}, {member.department}
                    </p>
                </div>
            </div>

            {/* Status Badge - Hidden for now based on client feedback */}
            {/* 
            <div className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium w-fit",
                status.bg,
                status.text
            )}>
                <span className={cn("size-1.5 rounded-full", status.dot)} />
                {status.label}
            </div>
            */}

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="size-8 rounded-lg border border-primary-foreground/20 bg-transparent flex items-center justify-center text-primary-foreground/50 hover:text-blue-500 hover:border-blue-500/30 transition-colors"
                        title="Call"
                    >
                        <Phone className="size-4" />
                    </button>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="size-8 rounded-lg border border-primary-foreground/20 bg-transparent flex items-center justify-center text-primary-foreground/50 hover:text-amber-500 hover:border-amber-500/30 transition-colors"
                        title="Email"
                    >
                        <Mail className="size-4" />
                    </button>
                </div>

                {/* Tasks Button */}
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="h-7 px-3 rounded-lg bg-blue-500/15 text-blue-500 text-xs font-medium hover:bg-blue-500/25 transition-colors"
                >
                    {member.tasks} Tasks
                </button>
            </div>
        </div>
    );
}
