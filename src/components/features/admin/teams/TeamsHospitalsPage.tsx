"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
    Search,
    ChevronDown,
    Download,
    Pencil,
    Trash2,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import DataPagination from "@/src/components/ui/DataPagination";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import { OrgTeam, PlanType, PaymentStatus, OrgStatus, OrgType } from "./types";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const TEAM_NAMES = [
    "Dhaka hospital",
    "Berlin Medical",
    "Apollo Clinic",
    "Square Hospital",
    "LabAid Limited",
    "BIRDEM General",
    "Evercare Hospital",
    "Popular Medical",
];

const COUNTRIES = ["Bangladesh", "Hungary", "Germany", "France"];
const TYPES: OrgType[] = ["Hospital", "Clinic", "Hospital", "Hospital", "Clinic", "Clinic", "Hospital", "Clinic"];
const PLANS: PlanType[] = ["Free", "Free", "Enterprise", "Enterprise", "Pro", "Pro", "Free", "Pro"];
const PAYMENTS: PaymentStatus[] = ["Paid", "Paid", "Paid", "Paid", "Expired", "Paid", "Expired", "Paid"];
const STATUSES: OrgStatus[] = ["Active", "Inactive", "Inactive", "Active", "Active", "Inactive", "Active", "Active", "Active", "Active", "Active", "Flagged"];

function makeTeam(i: number): OrgTeam {
    const idx = i % TEAM_NAMES.length;
    const tokenLimit = 500;
    const tokenUsed = 10 + (i % 80);
    const isUnlimited = i % 5 === 3 || i % 5 === 4;
    return {
        id: String(i + 1),
        name: TEAM_NAMES[idx],
        type: TYPES[i % TYPES.length],
        country: COUNTRIES[i % COUNTRIES.length],
        plan: PLANS[i % PLANS.length],
        payment: PAYMENTS[i % PAYMENTS.length],
        users: 100,
        depts: 100,
        tokenLimit,
        tokenUsed,
        storageLimitGB: isUnlimited ? 0 : 20,
        storageUsedGB: 8,
        isUnlimitedStorage: isUnlimited,
        status: STATUSES[i % STATUSES.length],
        contactEmail: "null@gmail.com",
        phone: "+93698764565",
        address: "1 Hospital street",
        billingAddress: "1 Hospital street",
        city: "Dhaka",
        vatNumber: "24235264326",
        zipCode: "1022",
        sessionsLimit: 50,
        storageLimitOverride: "",
        storageUsed: "2 GB",
    };
}

const ALL_TEAMS: OrgTeam[] = Array.from({ length: 50 }, (_, i) => makeTeam(i));

// ─── Chart Bar ─────────────────────────────────────────────────────────────────
const CHART_DATA = [
    { name: "Berlin Medical", revenue: 1890, cost: 3000, pct: 63 },
    { name: "Berlin Medical", revenue: 1890, cost: 3000, pct: 63 },
    { name: "Berlin Medical", revenue: 1890, cost: 3000, pct: 63 },
    { name: "Berlin Medical", revenue: 1890, cost: 3000, pct: 63 },
    { name: "Berlin Medical", revenue: 1890, cost: 3000, pct: 63 },
    { name: "Berlin Medical", revenue: 1890, cost: 3000, pct: 63 },
];

type BarColor = "orange" | "green" | "yellow";
const BAR_COLORS: BarColor[] = ["orange", "green", "orange", "green", "orange", "green"];
const BAR_HEX: Record<BarColor, string> = {
    orange: "#F97316",
    green: "#22C55E",
    yellow: "#EAB308",
};

function RevenueChart() {
    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Revenue vs AI Cost – Last 30 Days</h3>
                <span className="text-xs text-muted-foreground border border-border rounded px-2.5 py-1">This Month</span>
            </div>
            <div className="space-y-2">
                {CHART_DATA.map((row, i) => {
                    const color = BAR_COLORS[i % BAR_COLORS.length];
                    const hex = BAR_HEX[color];
                    const barW = Math.round((row.revenue / row.cost) * 100);
                    return (
                        <div key={i} className="flex items-center gap-3">
                            <span className="w-24 text-xs text-foreground shrink-0 truncate">{row.name}</span>
                            <div className="flex-1 bg-[#1a2433] rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${barW}%`, backgroundColor: hex }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap w-28 shrink-0">
                                {row.revenue}K/{row.cost}K
                            </span>
                            <span className="text-xs font-semibold w-8 shrink-0" style={{ color: hex }}>
                                {row.pct}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Plan Badge ────────────────────────────────────────────────────────────────
function PlanBadge({ plan }: { plan: string }) {
    const cfg: Record<string, string> = {
        Free: "border-blue-500/50 text-blue-400",
        Pro: "border-purple-500/50 text-purple-400",
        Enterprise: "border-amber-500/50 text-amber-400",
    };
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold", cfg[plan] ?? "border-border text-muted-foreground")}>
            {plan}
        </span>
    );
}

// ─── Payment Badge ─────────────────────────────────────────────────────────────
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

// ─── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const cfg: Record<string, string> = {
        Active: "border-emerald-500/50 text-emerald-400",
        Inactive: "border-slate-500/50 text-slate-400",
        Flagged: "border-amber-500/50 text-amber-400",
    };
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded border text-[10px] font-semibold", cfg[status] ?? "border-border text-muted-foreground")}>
            {status}
        </span>
    );
}

// ─── Token Bar ─────────────────────────────────────────────────────────────────
function TokenBar({ used, limit }: { used: number; limit: number }) {
    const pct = Math.min(Math.round((used / limit) * 100), 100);
    const color = pct >= 80 ? "#EF4444" : pct >= 50 ? "#EAB308" : "#22C55E";
    return (
        <div className="flex items-center gap-2 min-w-[100px]">
            <div className="flex-1 h-1.5 bg-[#1a2433] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{pct}%</span>
        </div>
    );
}

// ─── Dropdown Filter ───────────────────────────────────────────────────────────
interface DropdownOption {
    label: string;
    value: string;
}

function FilterDropdown({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: DropdownOption[];
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
                className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card",
                    "text-xs text-foreground hover:border-blue-500/50 transition-colors whitespace-nowrap"
                )}
            >
                {current}
                <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 z-30 bg-[#111820] border border-[#2a3441] rounded-lg shadow-2xl min-w-[130px] py-1 overflow-hidden">
                    {options.map((o) => (
                        <button
                            key={o.value}
                            onClick={() => { onChange(o.value); setOpen(false); }}
                            className={cn(
                                "w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors",
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

// ─── Column Headers ────────────────────────────────────────────────────────────
const HEADERS = [
    { key: "checkbox", label: "" },
    { key: "name", label: "Team/ ORG" },
    { key: "type", label: "Type" },
    { key: "country", label: "Country" },
    { key: "plan", label: "Plan" },
    { key: "payment", label: "Payment" },
    { key: "users", label: "Users" },
    { key: "depts", label: "Depts" },
    { key: "tokenLimit", label: "Token Limit" },
    { key: "tokenUsed", label: "Token Used" },
    { key: "storage", label: "Storage" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];

// ─── Filter Options ────────────────────────────────────────────────────────────
const TYPE_OPTS: DropdownOption[] = [
    { label: "All Type", value: "" },
    { label: "Hospital", value: "Hospital" },
    { label: "Clinic", value: "Clinic" },
];

const COUNTRY_OPTS: DropdownOption[] = [
    { label: "All Country", value: "" },
    { label: "Bangladesh", value: "Bangladesh" },
    { label: "Hungary", value: "Hungary" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
];

const PLAN_OPTS: DropdownOption[] = [
    { label: "All Plan", value: "" },
    { label: "Free", value: "Free" },
    { label: "Pro", value: "Pro" },
    { label: "Enterprise", value: "Enterprise" },
];

const PAYMENT_OPTS: DropdownOption[] = [
    { label: "Payment", value: "" },
    { label: "Paid", value: "Paid" },
    { label: "Expired", value: "Expired" },
    { label: "Trail", value: "Trail" },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function TeamsHospitalsPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [planFilter, setPlanFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const [editTeam, setEditTeam] = useState<OrgTeam | null>(null);
    const [deleteTeam, setDeleteTeam] = useState<OrgTeam | null>(null);
    const [teams, setTeams] = useState<OrgTeam[]>(ALL_TEAMS);

    // Filter
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return teams.filter((t) => {
            const matchSearch = !q || t.name.toLowerCase().includes(q) || t.country.toLowerCase().includes(q);
            const matchType = !typeFilter || t.type === typeFilter;
            const matchCountry = !countryFilter || t.country === countryFilter;
            const matchPlan = !planFilter || t.plan === planFilter;
            const matchPayment = !paymentFilter || t.payment === paymentFilter;
            return matchSearch && matchType && matchCountry && matchPlan && matchPayment;
        });
    }, [teams, search, typeFilter, countryFilter, planFilter, paymentFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const toggleAll = () => {
        if (paginated.every((t) => selectedIds.has(t.id))) {
            setSelectedIds((prev) => {
                const next = new Set(prev);
                paginated.forEach((t) => next.delete(t.id));
                return next;
            });
        } else {
            setSelectedIds((prev) => {
                const next = new Set(prev);
                paginated.forEach((t) => next.add(t.id));
                return next;
            });
        }
    };

    const handleSave = (updated: OrgTeam) => {
        setTeams((prev) => prev.map((t) => t.id === updated.id ? updated : t));
        setEditTeam(null);
    };

    const handleDelete = () => {
        if (deleteTeam) {
            setTeams((prev) => prev.filter((t) => t.id !== deleteTeam.id));
        }
        setDeleteTeam(null);
    };

    return (
        <DashboardMainContainer>
            <div className="p-5 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-xl font-bold text-foreground">Team/ Org</h1>
                    {/* Search */}
                    <div className="relative w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search Team/Org"
                            className="w-full bg-card border border-border text-foreground text-xs rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                {/* Revenue Chart */}
                <RevenueChart />

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-2">
                    <FilterDropdown label="All Type" value={typeFilter} options={TYPE_OPTS} onChange={(v) => { setTypeFilter(v); setCurrentPage(1); }} />
                    <FilterDropdown label="All Country" value={countryFilter} options={COUNTRY_OPTS} onChange={(v) => { setCountryFilter(v); setCurrentPage(1); }} />
                    <FilterDropdown label="All Plan" value={planFilter} options={PLAN_OPTS} onChange={(v) => { setPlanFilter(v); setCurrentPage(1); }} />
                    <FilterDropdown label="Payment" value={paymentFilter} options={PAYMENT_OPTS} onChange={(v) => { setPaymentFilter(v); setCurrentPage(1); }} />
                    <div className="ml-auto">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs text-foreground hover:border-blue-500/50 transition-colors">
                            <Download className="size-3" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">All Team/Org Lists</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-border/60">
                                    {/* Checkbox */}
                                    <th className="px-4 py-3 w-8">
                                        <input
                                            type="checkbox"
                                            checked={paginated.length > 0 && paginated.every((t) => selectedIds.has(t.id))}
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
                                {paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan={HEADERS.length} className="text-center py-16 text-muted-foreground text-xs">
                                            No teams found.
                                        </td>
                                    </tr>
                                ) : (
                                    paginated.map((team) => (
                                        <tr
                                            key={team.id}
                                            className={cn(
                                                "border-b border-border/40 hover:bg-white/[0.03] transition-colors",
                                                selectedIds.has(team.id) && "bg-blue-500/[0.04]"
                                            )}
                                        >
                                            {/* Checkbox */}
                                            <td className="px-4 py-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(team.id)}
                                                    onChange={() => toggleSelect(team.id)}
                                                    className="accent-blue-500 cursor-pointer"
                                                />
                                            </td>

                                            {/* Team Name */}
                                            <td className="px-3 py-2.5">
                                                <div className="flex items-center gap-2">
                                                    {team.avatar ? (
                                                        <img src={team.avatar} className="size-6 rounded-full object-cover" alt={team.name} />
                                                    ) : null}
                                                    <span className="text-xs font-medium text-foreground whitespace-nowrap">{team.name}</span>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{team.type}</td>

                                            {/* Country */}
                                            <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{team.country}</td>

                                            {/* Plan */}
                                            <td className="px-3 py-2.5"><PlanBadge plan={team.plan} /></td>

                                            {/* Payment */}
                                            <td className="px-3 py-2.5"><PaymentBadge payment={team.payment} /></td>

                                            {/* Users */}
                                            <td className="px-3 py-2.5 text-xs text-muted-foreground">{team.users}</td>

                                            {/* Depts */}
                                            <td className="px-3 py-2.5 text-xs text-muted-foreground">{team.depts}</td>

                                            {/* Token Limit */}
                                            <td className="px-3 py-2.5 text-xs text-muted-foreground">{team.tokenLimit.toLocaleString()},00</td>

                                            {/* Token Used */}
                                            <td className="px-3 py-2.5">
                                                <TokenBar used={team.tokenUsed} limit={team.tokenLimit} />
                                            </td>

                                            {/* Storage */}
                                            <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                                                {team.isUnlimitedStorage ? (
                                                    <span className="text-purple-400 font-medium">∞ Unlimited</span>
                                                ) : (
                                                    <span>{team.storageUsedGB} GB/ {team.storageLimitGB} GB</span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-3 py-2.5"><StatusBadge status={team.status} /></td>

                                            {/* Actions */}
                                            <td className="px-3 py-2.5">
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        onClick={() => setEditTeam(team)}
                                                        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                                    >
                                                        <Pencil className="size-3" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteTeam(team)}
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
                </div>

                {/* Pagination */}
                <DataPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filtered.length}
                    pageSize={pageSize}
                    pageSizeOptions={[10, 20, 30, 50]}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={() => setCurrentPage(1)}
                />
            </div>

            {/* Edit Modal */}
            <EditTeamModal
                open={!!editTeam}
                team={editTeam}
                onClose={() => setEditTeam(null)}
                onSave={handleSave}
            />

            {/* Delete Modal */}
            <DeleteTeamModal
                open={!!deleteTeam}
                teamName={deleteTeam?.name ?? ""}
                onClose={() => setDeleteTeam(null)}
                onConfirm={handleDelete}
            />
        </DashboardMainContainer>
    );
}
