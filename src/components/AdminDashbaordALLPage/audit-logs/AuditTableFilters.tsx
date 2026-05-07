"use client";

import React from "react";
import { Search, ChevronDown, Calendar, Download } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface AuditFilters {
    search: string;
    action: string;
    level: string;
    dateFrom: string;
    dateTo: string;
}

interface AuditTableFiltersProps {
    filters: AuditFilters;
    onChange: (updated: Partial<AuditFilters>) => void;
    actionOptions: string[];
    levelOptions?: string[];
    onExport?: () => void;
    warningCount: number;
}

// ─── Pill Dropdown ──────────────────────────────────────────────────────────────
function PillSelect({
    value,
    onChange,
    options,
    label,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
    label: string;
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "appearance-none rounded-full border border-white/15 bg-[#1a1d21]",
                    "text-[#c0ccd8] text-xs font-medium",
                    "pl-4 pr-7 py-[7px] focus:outline-none cursor-pointer",
                    "hover:border-white/25 transition-colors"
                )}
            >
                <option value="">{label}</option>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none text-[#8a9ab0]" />
        </div>
    );
}

// ─── Date Pill ──────────────────────────────────────────────────────────────────
function DatePill({
    dateFrom,
    dateTo,
    onFromChange,
    onToChange,
}: {
    dateFrom: string;
    dateTo: string;
    onFromChange: (v: string) => void;
    onToChange: (v: string) => void;
}) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 rounded-full border border-white/15 bg-[#1a1d21]",
                "px-4 py-[7px] hover:border-white/25 transition-colors"
            )}
        >
            <input
                type="date"
                value={dateFrom}
                onChange={(e) => onFromChange(e.target.value)}
                className="bg-transparent text-xs text-[#c0ccd8] focus:outline-none w-[90px] cursor-pointer"
                placeholder="mm/dd/yyyy"
            />
            {/* <Calendar className="size-3.5 text-[#8a9ab0] shrink-0" /> */}
            <span className="text-[#8a9ab0] text-xs">—</span>
            <input
                type="date"
                value={dateTo}
                onChange={(e) => onToChange(e.target.value)}
                className="bg-transparent text-xs text-[#c0ccd8] focus:outline-none w-[90px] cursor-pointer"
                placeholder="mm/dd/yyyy"
            />
            {/* <Calendar className="size-3.5 text-[#8a9ab0] shrink-0" /> */}
        </div>
    );
}

// ─── Main ───────────────────────────────────────────────────────────────────────
export default function AuditTableFilters({
    filters,
    onChange,
    actionOptions,
    levelOptions = ["Info", "Warning", "Critical", "Success"],
    onExport,
    warningCount,
}: AuditTableFiltersProps) {
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            {/* Left: Search input + icon */}
            <div className="flex items-center gap-2 flex-1  min-w-[220px] max-w-sm">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => onChange({ search: e.target.value })}
                        placeholder="User, action, entity, IP"
                        className={cn(
                            "w-full rounded-none border rounded-md border-white/15 bg-[#1a1d21]",
                            "text-[#c0ccd8] text-xs placeholder:text-[#5a6a7a]",
                            "pl-4 pr-4 py-[9px] focus:outline-none focus:border-white/30",
                            "transition-colors"
                        )}
                    />
                </div>
                <button className="p-[9px] border rounded-md border-white/15 bg-[#1a1d21] text-[#8a9ab0] hover:border-white/25 hover:text-[#c0ccd8] transition-colors shrink-0">
                    <Search className="size-4" />
                </button>
            </div>

            {/* Center: Pill dropdowns + date range */}
            <div className="flex items-center gap-2 flex-wrap">
                <PillSelect
                    value={filters.action}
                    onChange={(v) => onChange({ action: v })}
                    options={actionOptions}
                    label="All Actions"
                />
                <PillSelect
                    value={filters.level}
                    onChange={(v) => onChange({ level: v })}
                    options={levelOptions}
                    label="All Levels"
                />
                <DatePill
                    dateFrom={filters.dateFrom}
                    dateTo={filters.dateTo}
                    onFromChange={(v) => onChange({ dateFrom: v })}
                    onToChange={(v) => onChange({ dateTo: v })}
                />
            </div>

            {/* Right: Export button */}
            <button
                onClick={onExport}
                className={cn(
                    "flex items-center gap-2 px-5 py-[9px]",
                    "border rounded-md cursor-pointer border-white/15 bg-[#1a1d21] text-[#c0ccd8] text-xs font-medium",
                    "hover:border-white/30 hover:text-white transition-colors shrink-0"
                )}
            >
                <Download className="size-3.5" />
                Export
            </button>
        </div>
    );
}
