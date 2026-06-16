"use client";

import React, { useState } from "react";
import { Eye, RefreshCw, Ban, Users, Tag, Clock, Clock3, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import SuspendTeamModal from "./SuspendTeamModal";
import AdjustTeamTokenModal from "./AdjustTeamTokenModal";

export interface Team {
    id: string;
    name: string;
    memberCount: number;
    tokenUsed: number;   // e.g. 450000
    tokenLimit: number;  // e.g. 500000
    retentionDays: number;
    auditEnabled: boolean;
    lastActivity: string;
    currentUsageMB: number; // for adjust token modal display
}

function getBarColor(pct: number): string {
    if (pct >= 80) return "bg-red-500";
    if (pct >= 60) return "bg-amber-400";
    return "bg-green-500";
}

function formatNum(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)},000`;
    return String(n);
}

interface TeamCardProps {
    team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
    const [suspendOpen, setSuspendOpen] = useState(false);
    const [tokenOpen, setTokenOpen] = useState(false);

    const pct = Math.min(
        Math.round((team.tokenUsed / team.tokenLimit) * 100),
        100
    );
    const barColor = getBarColor(pct);

    return (
        <>
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-border/80 transition-colors">
                {/* Top row: icon + name + actions */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        {/* Hospital icon */}
                        <div className="flex items-center justify-center size-10 rounded-xl bg-blue-600/20 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9M9 9h.01M15 9h.01"
                                />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                                {team.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <span className="flex items-center gap-1">
                                    <Users className="size-3" />
                                    {team.memberCount} members
                                </span>
                                <span className="flex items-center gap-1">
                                    <Tag className="size-3" />
                                    Token
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Row actions */}
                    <div className="flex items-center gap-1 shrink-0">
                        {/* <button
                            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            title="View"
                        >
                            <Eye className="size-3.5" />
                        </button> */}
                        <button
                            onClick={() => setTokenOpen(true)}
                            className="p-1 rounded text-amber-500 hover:bg-amber-500/10 transition-colors"
                            title="Adjust token"
                        >
                            <RefreshCw className="size-3.5" />
                        </button>
                        <button
                            onClick={() => setSuspendOpen(true)}
                            className="p-1 rounded text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Suspend team"
                        >
                            <Ban className="size-3.5" />
                        </button>
                    </div>
                </div>

                {/* Token Usage */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Token Usage</span>
                        <span
                            className={cn(
                                "font-semibold",
                                pct >= 80
                                    ? "text-red-500"
                                    : pct >= 60
                                        ? "text-amber-500"
                                        : "text-green-500"
                            )}
                        >
                            {pct}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                            className={cn("h-full rounded-full transition-all", barColor)}
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                        {formatNum(team.tokenUsed)} / {formatNum(team.tokenLimit)} tokens
                    </p>
                </div>

                {/* Retention + Audit */}
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock3 className="size-3.5 shrink-0" />
                        <span className="font-medium text-foreground">Retention</span>
                        <span>{team.retentionDays} days</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <FileText className="size-3.5 shrink-0" />
                        <span className="font-medium text-foreground">Audit</span>
                        <span
                            className={
                                team.auditEnabled ? "text-green-500" : "text-red-500"
                            }
                        >
                            {team.auditEnabled ? "Enabled" : "Disabled"}
                        </span>
                    </div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/50 pt-2 mt-1">
                    <Clock className="size-3.5 shrink-0" />
                    <span>Last activity: {team.lastActivity}</span>
                </div>
            </div>

            {/* Modals */}
            <SuspendTeamModal
                open={suspendOpen}
                teamName={team.name}
                onClose={() => setSuspendOpen(false)}
                onConfirm={(reason) => {
                    console.log("Suspend team:", team.id, reason);
                }}
            />
            <AdjustTeamTokenModal
                open={tokenOpen}
                teamName={team.name}
                currentUsage={team.currentUsageMB}
                onClose={() => setTokenOpen(false)}
                onConfirm={(limit) => {
                    console.log("Update token limit:", team.id, limit);
                }}
            />
        </>
    );
}
