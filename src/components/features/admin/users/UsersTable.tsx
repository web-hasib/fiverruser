"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import SuspendUserModal from "./SuspendUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";


export type UserStatus = "Active" | "Inactive" | "Suspended" | "Flagged";
export type UserPlan = "FREE" | "PRO" | "TEAM" | "ENTERPRISE" | "Free" | "Pro" | "Enterprise";
export type UserPayment = "Paid" | "Expired" | "Trail";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    plan: UserPlan;
    payment: UserPayment;
    tokenUsed: number;
    tokenLimit: number;
    storageUsedGB: number;
    storageLimitGB: number;
    isUnlimitedStorage?: boolean;
    sessions: number;
    status: UserStatus;
    joined: string;
    // Modal extras
    sessionsLimit?: number;
    storageLimitOverride?: string;
    storageUsed?: string;
    lastActive?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(name: string) {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-cyan-600",
];

function Avatar({ name, index }: { name: string; index: number }) {
    const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
    return (
        <div className={cn("size-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white", color)}>
            {getInitials(name)}
        </div>
    );
}

function PlanBadge({ plan }: { plan: string }) {
    const cfg: Record<string, string> = {
        Free: "border-blue-500/50 text-blue-400",
        FREE: "border-blue-500/50 text-blue-400",
        Pro: "border-purple-500/50 text-purple-400",
        PRO: "border-purple-500/50 text-purple-400",
        Enterprise: "border-amber-500/50 text-amber-400",
        ENTERPRISE: "border-amber-500/50 text-amber-400",
        TEAM: "border-cyan-500/50 text-cyan-400",
    };
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold whitespace-nowrap", cfg[plan] ?? "border-border text-muted-foreground")}>
            {plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()}
        </span>
    );
}

function PaymentBadge({ payment }: { payment: string }) {
    const cfg: Record<string, string> = {
        Paid: "border-emerald-500/50 text-emerald-400",
        Expired: "border-red-500/50 text-red-400",
        Trail: "border-orange-500/50 text-orange-400",
    };
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold", cfg[payment] ?? "border-border text-muted-foreground")}>
            {payment}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const cfg: Record<string, string> = {
        Active: "border-emerald-500/50 text-emerald-400",
        Inactive: "border-slate-500/50 text-slate-400",
        Suspended: "border-red-500/50 text-red-400",
        Flagged: "border-amber-500/50 text-amber-400",
    };
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded border text-[10px] font-semibold whitespace-nowrap", cfg[status] ?? "border-border text-muted-foreground")}>
            {status}
        </span>
    );
}

function TokenBar({ used, limit }: { used: number; limit: number }) {
    const pct = Math.min(Math.round((used / limit) * 100), 100);
    const color = pct >= 80 ? "#EF4444" : pct >= 50 ? "#EAB308" : "#22C55E";
    return (
        <div className="flex items-center gap-2 min-w-[90px]">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{pct}%</span>
        </div>
    );
}

const HEADERS = [
    { key: "checkbox", label: "" },
    { key: "name", label: "User Name" },
    { key: "plan", label: "Plan" },
    { key: "payment", label: "Payment" },
    { key: "tokenUsed", label: "Token Used" },
    { key: "storage", label: "Storage" },
    { key: "sessions", label: "Sessions" },
    { key: "status", label: "Status" },
    { key: "joined", label: "Joined" },
    { key: "actions", label: "Actions" },
];

interface UsersTableProps {
    users: AdminUser[];
    onUsersChange: (updated: AdminUser[]) => void;
}

export default function UsersTable({ users, onUsersChange }: UsersTableProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [editUser, setEditUser] = useState<AdminUser | null>(null);
    const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
    const [suspendUser, setSuspendUser] = useState<AdminUser | null>(null);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        if (users.every((u) => selectedIds.has(u.id))) {
            setSelectedIds((prev) => {
                const next = new Set(prev);
                users.forEach((u) => next.delete(u.id));
                return next;
            });
        } else {
            setSelectedIds((prev) => {
                const next = new Set(prev);
                users.forEach((u) => next.add(u.id));
                return next;
            });
        }
    };

    const handleSave = (updated: AdminUser) => {
        onUsersChange(users.map((u) => (u.id === updated.id ? updated : u)));
        setEditUser(null);
    };

    const handleDelete = () => {
        if (deleteUser) {
            onUsersChange(users.filter((u) => u.id !== deleteUser.id));
        }
        setDeleteUser(null);
    };

    const handleBulkDelete = () => {
        onUsersChange(users.filter((u) => !selectedIds.has(u.id)));
        setSelectedIds(new Set());
    };

    const selectedList = users.filter((u) => selectedIds.has(u.id));

    return (
        <>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Sub-header */}
                <div className="px-4 py-3 border-b border-border">
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">All Users Lists</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border/60">
                                <th className="px-4 py-3 w-8">
                                    <input
                                        type="checkbox"
                                        checked={users.length > 0 && users.every((u) => selectedIds.has(u.id))}
                                        onChange={toggleAll}
                                        className="accent-blue-500 cursor-pointer"
                                    />
                                </th>
                                {HEADERS.slice(1).map((h) => (
                                    <th
                                        key={h.key}
                                        className="px-3 py-3 text-left text-[10px] font-semibold text-[#6b8aaa] whitespace-nowrap uppercase tracking-wider"
                                    >
                                        {h.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={HEADERS.length} className="text-center py-16 text-muted-foreground text-xs">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, idx) => (
                                    <tr
                                        key={user.id}
                                        className={cn(
                                            "border-b border-border/40 hover:bg-white/[0.03] transition-colors",
                                            selectedIds.has(user.id) && "bg-blue-500/[0.04]"
                                        )}
                                    >
                                        {/* Checkbox */}
                                        <td className="px-4 py-2.5">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.has(user.id)}
                                                onChange={() => toggleSelect(user.id)}
                                                className="accent-blue-500 cursor-pointer"
                                            />
                                        </td>

                                        {/* User Name */}
                                        <td className="px-3 py-2.5">
                                            <div className="flex items-center gap-2">
                                                <Avatar name={user.name} index={idx} />
                                                <div>
                                                    <p className="text-xs font-semibold text-foreground whitespace-nowrap">{user.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Plan */}
                                        <td className="px-3 py-2.5"><PlanBadge plan={user.plan} /></td>

                                        {/* Payment */}
                                        <td className="px-3 py-2.5"><PaymentBadge payment={user.payment} /></td>

                                        {/* Token Used */}
                                        <td className="px-3 py-2.5"><TokenBar used={user.tokenUsed} limit={user.tokenLimit} /></td>

                                        {/* Storage */}
                                        <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                                            {user.isUnlimitedStorage ? (
                                                <span className="text-purple-400 font-medium">∞ Unlimited</span>
                                            ) : (
                                                `${user.storageUsedGB} GB/ ${user.storageLimitGB} GB`
                                            )}
                                        </td>

                                        {/* Sessions */}
                                        <td className="px-3 py-2.5 text-xs text-muted-foreground">{user.sessions}</td>

                                        {/* Status */}
                                        <td className="px-3 py-2.5"><StatusBadge status={user.status} /></td>

                                        {/* Joined */}
                                        <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{user.joined}</td>

                                        {/* Actions */}
                                        <td className="px-3 py-2.5">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => setEditUser(user)}
                                                    className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                                >
                                                    <Pencil className="size-3" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeleteUser(user)}
                                                    className="flex items-center justify-center size-6 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="size-3" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Bulk action bar — only visible when rows selected */}
                {selectedIds.size > 0 && (
                    <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-border bg-muted/20">
                        <span className="text-xs text-muted-foreground">{selectedIds.size} selected</span>
                        <button
                            onClick={handleBulkDelete}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-semibold border border-red-500/30 transition-colors"
                        >
                            <Trash2 className="size-3" />
                            DELETE
                        </button>
                        <button
                            onClick={() => selectedList.length === 1 && setSuspendUser(selectedList[0])}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition-colors"
                        >
                            SUSPEND
                        </button>
                    </div>
                )}
            </div>

            {/* ── Modals ── */}
            <EditUserModal
                open={!!editUser}
                user={editUser}
                onClose={() => setEditUser(null)}
                onSave={handleSave}
            />

            <DeleteUserModal
                open={!!deleteUser}
                userName={deleteUser?.name ?? ""}
                onClose={() => setDeleteUser(null)}
                onConfirm={handleDelete}
            />

            <SuspendUserModal
                open={!!suspendUser}
                userName={suspendUser?.name ?? ""}
                onClose={() => setSuspendUser(null)}
                onConfirm={(data) => {
                    console.log("Suspend:", suspendUser?.id, data);
                    setSuspendUser(null);
                }}
            />
        </>
    );
}
