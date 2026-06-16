"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, Download } from "lucide-react";
import { cn } from "@/src/lib/utils";
import UsersTable, { AdminUser, UserPlan, UserPayment, UserStatus } from "./UsersTable";
import DataPagination from "@/src/components/ui/DataPagination";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const NAMES = ["Cameron Williamson", "Bessie Cooper", "Wade Warren", "Guy Hawkins", "Annette Black", "Jerome Bell", "Courtney Henry", "Leslie Alexander", "Brooklyn Simmons", "Robert Fox"];
const PLANS: UserPlan[] = ["Free", "Free", "Enterprise", "Enterprise", "Pro", "Pro", "Free", "Pro", "Enterprise", "Free"];
const PAYMENTS: UserPayment[] = ["Paid", "Paid", "Paid", "Paid", "Expired", "Paid", "Expired", "Paid", "Paid", "Paid"];
const STATUSES: UserStatus[] = ["Active", "Active", "Inactive", "Active", "Active", "Inactive", "Active", "Active", "Active", "Active", "Active", "Flagged"];

function makeUser(i: number): AdminUser {
    const idx = i % NAMES.length;
    const name = NAMES[idx];
    return {
        id: String(i + 1),
        name,
        email: `${name.toLowerCase().replace(" ", ".")}@gmail.com`,
        plan: PLANS[i % PLANS.length],
        payment: PAYMENTS[i % PAYMENTS.length],
        tokenUsed: 10 + (i % 80),
        tokenLimit: 100,
        storageUsedGB: 8,
        storageLimitGB: i % 4 === 3 ? 0 : 20,
        isUnlimitedStorage: i % 4 === 3,
        sessions: 100,
        status: STATUSES[i % STATUSES.length],
        joined: `2025-08-${String((i % 28) + 1).padStart(2, "0")}`,
        sessionsLimit: 0,
        storageLimitOverride: "",
        storageUsed: "2 GB",
        lastActive: "5 min ago",
    };
}

const INITIAL_USERS: AdminUser[] = Array.from({ length: 50 }, (_, i) => makeUser(i));

// ─── Dropdown Filter ───────────────────────────────────────────────────────────
function FilterDropdown({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const current = options.find((o) => o.value === value)?.label ?? label;

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs text-foreground hover:border-blue-500/50 transition-colors whitespace-nowrap"
            >
                {current}
                <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 z-30 bg-card border border-border rounded-lg shadow-2xl min-w-[130px] py-1">
                    {options.map((o) => (
                        <button
                            key={o.value}
                            onClick={() => { onChange(o.value); setOpen(false); }}
                            className={cn(
                                "w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors",
                                value === o.value ? "text-blue-400 font-medium" : "text-foreground"
                            )}
                        >
                            {o.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function UsersPage() {
    const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
    const [search, setSearch] = useState("");
    const [planFilter, setPlanFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    // Count warnings (near-limit or flagged)
    const warningCount = users.filter(
        (u) => u.status === "Flagged" || (u.tokenUsed / u.tokenLimit) >= 0.8
    ).length;

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return users.filter((u) => {
            const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
            const matchPlan = !planFilter || u.plan.toUpperCase() === planFilter.toUpperCase() || u.plan.toLowerCase() === planFilter.toLowerCase();
            const matchPayment = !paymentFilter || u.payment === paymentFilter;
            const matchStatus = !statusFilter || u.status === statusFilter;
            return matchSearch && matchPlan && matchPayment && matchStatus;
        });
    }, [users, search, planFilter, paymentFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const reset = () => setCurrentPage(1);

    return (
        <DashboardMainContainer>
            <div className="p-5 space-y-4">
                {/* ── Header ── */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-foreground">All Users</h1>
                        {warningCount > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-semibold">
                                {warningCount} warnings
                            </span>
                        )}
                    </div>
                </div>

                {/* ── Filter Bar ── */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); reset(); }}
                            placeholder="Name, Email, Department..."
                            className="bg-card border border-border text-foreground text-xs rounded-md pl-8 pr-3 py-1.5 w-52 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-muted-foreground"
                        />
                    </div>

                    <FilterDropdown
                        label="All Plan"
                        value={planFilter}
                        options={[
                            { label: "All Plan", value: "" },
                            { label: "Free", value: "Free" },
                            { label: "Pro", value: "Pro" },
                            { label: "Enterprise", value: "Enterprise" },
                        ]}
                        onChange={(v) => { setPlanFilter(v); reset(); }}
                    />
                    <FilterDropdown
                        label="All Payment"
                        value={paymentFilter}
                        options={[
                            { label: "All Payment", value: "" },
                            { label: "Paid", value: "Paid" },
                            { label: "Expired", value: "Expired" },
                            { label: "Trail", value: "Trail" },
                        ]}
                        onChange={(v) => { setPaymentFilter(v); reset(); }}
                    />
                    <FilterDropdown
                        label="All Status"
                        value={statusFilter}
                        options={[
                            { label: "All Status", value: "" },
                            { label: "Active", value: "Active" },
                            { label: "Inactive", value: "Inactive" },
                            { label: "Flagged", value: "Flagged" },
                            { label: "Suspended", value: "Suspended" },
                        ]}
                        onChange={(v) => { setStatusFilter(v); reset(); }}
                    />

                    {/* Export buttons */}
                    <div className="ml-auto flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors">
                            <Download className="size-3" />
                            XLSX
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-foreground text-xs font-semibold hover:border-blue-500/50 transition-colors">
                            <Download className="size-3" />
                            CSV
                        </button>
                    </div>
                </div>

                {/* ── Table ── */}
                <UsersTable
                    users={paginated}
                    onUsersChange={(updated) => {
                        // Merge page changes back into full list
                        setUsers((prev) =>
                            prev
                                .map((u) => updated.find((up) => up.id === u.id) ?? u)
                                .filter((u) => updated.some((up) => up.id === u.id) || !paginated.some((p) => p.id === u.id))
                        );
                    }}
                />

                {/* ── Pagination ── */}
                <DataPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filtered.length}
                    pageSize={pageSize}
                    pageSizeOptions={[10, 20, 30, 50]}
                    onPageChange={setCurrentPage}
                />
            </div>
        </DashboardMainContainer>
    );
}
