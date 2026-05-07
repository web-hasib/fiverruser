"use client";

import React, { useState, useMemo } from "react";
import AuditStatCards from "./AuditStatCards";
import AuditTableFilters, { AuditFilters } from "./AuditTableFilters";
import AuditLogsTable, { AuditLog, AuditAction, AuditLevel } from "./AuditLogsTable";
import DataPagination from "@/src/components/ui/DataPagination";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { ShieldAlert } from "lucide-react";

// ─── Dummy Data (matching reference screenshot) ────────────────────────────────
const DUMMY_LOGS: AuditLog[] = [
    {
        id: "1",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "Assistant: Cardiology v2",
        details: "Approved Assistant ID#1",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "2",
        timestamp: "2026-03-11 09:14:22",
        userName: null, // System
        action: "Warning",
        entity: "Storage",
        details: "Storage 78%",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "3",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Reject",
        entity: "Session",
        details: "Login From Unusual Ip",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "4",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "User: saifur",
        details: "New case created",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "5",
        timestamp: "2026-03-11 09:14:22",
        userName: null,
        action: "Warning",
        entity: "Case #123455",
        details: "Roll change",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "6",
        timestamp: "2026-03-11 09:14:22",
        userName: null,
        action: "Warning",
        entity: "Case #123455",
        details: "Discharge letter sent",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "7",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "Storage",
        details: "Roll change",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "8",
        timestamp: "2026-03-11 09:14:22",
        userName: null,
        action: "Approve",
        entity: "Case #123455",
        details: "Discharge letter sent",
        ipAddress: "162.152.0.1",
        level: "Warning",
    },
    {
        id: "9",
        timestamp: "2026-03-11 09:14:22",
        userName: null,
        action: "Warning",
        entity: "Case #123455",
        details: "Discharge letter sent",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "10",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Reject",
        entity: "Storage",
        details: "Roll change",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "11",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "Storage",
        details: "Discharge letter sent",
        ipAddress: "162.152.0.1",
        level: "Warning",
    },
    {
        id: "12",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Warning",
        entity: "Case #123455",
        details: "Discharge letter sent",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "13",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "Storage",
        details: "Roll change",
        ipAddress: "162.152.0.1",
        level: "Info",
    },
    {
        id: "14",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "Case #123455",
        details: "Storage 78%",
        ipAddress: "162.152.0.1",
        level: "Warning",
    },
    {
        id: "15",
        timestamp: "2026-03-11 09:14:22",
        userName: "Dr Saifur",
        action: "Approve",
        entity: "Case #123455",
        details: "Approved Assistant ID#1",
        ipAddress: "162.152.0.1",
        level: "Warning",
    },
];

// Generate more entries by cycling the above
const FULL_LOGS: AuditLog[] = Array.from({ length: 45 }, (_, i) => ({
    ...DUMMY_LOGS[i % DUMMY_LOGS.length],
    id: String(i + 1),
    timestamp: `2026-03-11 09:${String(14 + Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}`,
}));

// ─── Filter option sets ────────────────────────────────────────────────────────
const ACTION_OPTIONS: AuditAction[] = ["Approve", "Warning", "Reject", "Info", "Update", "Delete", "Login", "Logout"];
const LEVEL_OPTIONS: AuditLevel[] = ["Info", "Warning", "Critical", "Success"];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function AuditLogsHomePage() {
    const [filters, setFilters] = useState<AuditFilters>({
        search: "",
        action: "",
        level: "",
        dateFrom: "",
        dateTo: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const handleFilterChange = (updated: Partial<AuditFilters>) => {
        setFilters((prev) => ({ ...prev, ...updated }));
        setCurrentPage(1);
    };

    // ─── Client-side filtering ────────────────────────────────────────────────
    const filtered = useMemo(() => {
        const q = filters.search.toLowerCase();
        return FULL_LOGS.filter((log) => {
            const matchSearch =
                !q ||
                (log.userName?.toLowerCase().includes(q) ?? false) ||
                log.entity.toLowerCase().includes(q) ||
                log.details.toLowerCase().includes(q) ||
                log.action.toLowerCase().includes(q) ||
                (log.ipAddress?.toLowerCase().includes(q) ?? false);

            const matchAction = !filters.action || log.action === filters.action;
            const matchLevel = !filters.level || log.level === filters.level;

            let matchDate = true;
            if (filters.dateFrom || filters.dateTo) {
                const logDate = log.timestamp.split(" ")[0];
                if (filters.dateFrom && logDate < filters.dateFrom) matchDate = false;
                if (filters.dateTo && logDate > filters.dateTo) matchDate = false;
            }

            return matchSearch && matchAction && matchLevel && matchDate;
        });
    }, [filters]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Count warnings for the badge
    const warningCount = FULL_LOGS.filter((l) => l.level === "Warning" || l.level === "Critical").length;

    const handleExport = () => {
        const csv = [
            ["Timestamp", "User", "Action", "Entity", "Details", "IP", "Level"].join(","),
            ...filtered.map((l) =>
                [
                    l.timestamp,
                    l.userName ?? "System",
                    l.action,
                    l.entity,
                    l.details,
                    l.ipAddress ?? "—",
                    l.level,
                ].join(",")
            ),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "audit-logs.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <DashboardMainContainer>
            <div className="p-2 sm:p-6 space-y-6">
                {/* ── Page Header ── */}
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-foreground tracking-tight">
                        Audit Logs &amp; Email Log
                    </h1>
                    {warningCount > 0 && (
                        <span className="flex rounded-full items-center gap-1 px-2.5 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-semibold">
                            <ShieldAlert className="size-3" />
                            {warningCount} Warnings
                        </span>
                    )}
                </div>

                {/* ── Stat Cards ── */}
                {/* <AuditStatCards
                    totalEvents={1247}
                    activeUsers={847}
                    aiGenerations={3891}
                    securityFlags={warningCount}
                /> */}

                {/* ── Filters Bar ── */}
                <AuditTableFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    actionOptions={ACTION_OPTIONS}
                    levelOptions={LEVEL_OPTIONS}
                    onExport={handleExport}
                    warningCount={warningCount}
                />

                {/* ── Table ── */}
                <AuditLogsTable logs={paginated} />

                {/* ── Pagination ── */}
                <DataPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filtered.length}
                    pageSize={pageSize}
                    pageSizeOptions={[10, 15, 20, 50]}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(s) => {
                        setPageSize(s);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </DashboardMainContainer>
    );
}
