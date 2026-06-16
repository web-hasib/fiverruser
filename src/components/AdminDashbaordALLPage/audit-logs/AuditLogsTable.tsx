"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type AuditAction =
    | "Approve"
    | "Warning"
    | "Reject"
    | "Info"
    | "Update"
    | "Delete"
    | "Login"
    | "Logout";

export type AuditLevel = "Info" | "Warning" | "Critical" | "Success";

export interface AuditLog {
    id: string;
    timestamp: string;
    userName: string | null;
    action: AuditAction;
    entity: string;
    details: string;
    ipAddress: string | null;
    level: AuditLevel;
}

interface AuditLogsTableProps {
    logs: AuditLog[];
}

// ─── Badge styles ───────────────────────────────────────────────────────────────
const ACTION_CONFIG: Record<AuditAction, { bg: string; text: string; border: string }> = {
    Approve:  { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/40" },
    Warning:  { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/40"   },
    Reject:   { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/40"     },
    Info:     { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/40"    },
    Update:   { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/40"    },
    Delete:   { bg: "bg-rose-500/10",    text: "text-rose-400",    border: "border-rose-500/40"    },
    Login:    { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/40"  },
    Logout:   { bg: "bg-slate-500/10",   text: "text-slate-400",   border: "border-slate-500/40"   },
};

const LEVEL_CONFIG: Record<AuditLevel, { bg: string; text: string; border: string }> = {
    Info:     { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/40"    },
    Warning:  { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/40"   },
    Critical: { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/40"     },
    Success:  { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/40" },
};

// ─── Pill Badge ─────────────────────────────────────────────────────────────────
function PillBadge({
    label,
    config,
}: {
    label: string;
    config: { bg: string; text: string; border: string };
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center px-3 py-[3px]",
                "rounded-full text-[11px] font-semibold border",
                "min-w-[68px] whitespace-nowrap",
                config.bg,
                config.text,
                config.border
            )}
        >
            {label}
        </span>
    );
}

// ─── Table columns ──────────────────────────────────────────────────────────────
const HEADERS = [
    { key: "timestamp", label: "Timestamp" },
    { key: "user",      label: "User"      },
    { key: "action",    label: "Action"    },
    { key: "entity",    label: "Entity"    },
    { key: "details",   label: "Details"   },
    { key: "ip",        label: "Ip"        },
    { key: "level",     label: "Level"     },
];

// ─── Main ───────────────────────────────────────────────────────────────────────
export default function AuditLogsTable({ logs }: AuditLogsTableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                {/* ── Head ── */}
                <thead>
                    <tr className="border-b border-white/10">
                        {HEADERS.map((h) => (
                            <th
                                key={h.key}
                                className="text-left text-[11px] font-semibold text-[#6b8aaa] px-4 py-3 whitespace-nowrap tracking-wide uppercase"
                            >
                                {h.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* ── Body ── */}
                <tbody>
                    {logs.length === 0 ? (
                        <tr>
                            <td
                                colSpan={HEADERS.length}
                                className="text-center py-16 text-muted-foreground text-sm"
                            >
                                No audit logs found.
                            </td>
                        </tr>
                    ) : (
                        logs.map((log) => (
                            <tr
                                key={log.id}
                                className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors"
                            >
                                {/* Timestamp */}
                                <td className="px-4 py-3 text-[#8a9ab0] whitespace-nowrap font-mono text-xs">
                                    {log.timestamp}
                                </td>

                                {/* User */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="font-bold text-[13px] text-foreground">
                                        {log.userName ?? "System"}
                                    </span>
                                </td>

                                {/* Action */}
                                <td className="px-4 py-3">
                                    <PillBadge
                                        label={log.action}
                                        config={ACTION_CONFIG[log.action] ?? ACTION_CONFIG.Info}
                                    />
                                </td>

                                {/* Entity */}
                                <td className="px-4 py-3 text-[#c0ccd8] text-xs whitespace-nowrap">
                                    {log.entity}
                                </td>

                                {/* Details */}
                                <td className="px-4 py-3 text-[#c0ccd8] text-xs max-w-[180px] truncate">
                                    {log.details}
                                </td>

                                {/* IP */}
                                <td className="px-4 py-3 text-[#8a9ab0] font-mono text-xs whitespace-nowrap">
                                    {log.ipAddress ?? "—"}
                                </td>

                                {/* Level */}
                                <td className="px-4 py-3">
                                    <PillBadge
                                        label={log.level}
                                        config={LEVEL_CONFIG[log.level] ?? LEVEL_CONFIG.Info}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
