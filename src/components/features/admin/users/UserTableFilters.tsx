"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface UserTableFiltersProps {
    search: string;
    onSearchChange: (v: string) => void;
    plan: string;
    onPlanChange: (v: string) => void;
    status: string;
    onStatusChange: (v: string) => void;
}

const PLAN_OPTIONS = ["All Plan", "FREE", "PRO", "TEAM", "ENTERPRISE"];
const STATUS_OPTIONS = ["All Status", "Active", "Suspended"];

function FilterSelect({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "appearance-none bg-card border border-border text-foreground text-sm",
                    "rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-ring",
                    "cursor-pointer min-w-[110px]"
                )}
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none text-muted-foreground" />
        </div>
    );
}

export default function UserTableFilters({
    search,
    onSearchChange,
    plan,
    onPlanChange,
    status,
    onStatusChange,
}: UserTableFiltersProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                <span className="font-medium">Filter:</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search"
                        className={cn(
                            "w-full bg-card border border-border text-foreground text-sm",
                            "rounded-md pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-ring",
                            "placeholder:text-muted-foreground"
                        )}
                    />
                </div>

                {/* Dropdowns */}
                <div className="flex items-center gap-2">
                    <FilterSelect
                        value={plan}
                        onChange={onPlanChange}
                        options={PLAN_OPTIONS}
                    />
                    <FilterSelect
                        value={status}
                        onChange={onStatusChange}
                        options={STATUS_OPTIONS}
                    />
                </div>
            </div>
        </div>
    );
}
