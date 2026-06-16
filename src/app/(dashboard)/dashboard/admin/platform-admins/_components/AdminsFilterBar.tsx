"use client";

import React from "react";
import { Search } from "lucide-react";
import { DEPARTMENTS, TEAMS } from "../_constants";
import { SortDropdown } from "./SortDropdown";
import { SearchableDropdown } from "./SearchableDropdown";
import { StatusFilterDropdown } from "./StatusFilterDropdown";
import { DateFilterDropdown } from "./DateFilterDropdown";

export interface FilterState {
  search: string;
  sortBy: string;
  department: string;
  team: string;
  status: string;
  date: Date | undefined;
}

interface AdminsFilterBarProps {
  filters: FilterState;
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

export function AdminsFilterBar({ filters, onChange }: AdminsFilterBarProps) {
  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      {/* Search */}
      <div className="relative group shrink-0 w-[400px]">
        <input
          type="text"
          placeholder="Search by name...."
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          className="w-full bg-card border border-border/50 rounded-lg pl-4 pr-11 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-muted-foreground/50"
        />
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 gap-2">
          <div className="w-px h-4 bg-border/70" />
          <Search className="w-3.5 h-3.5 text-muted-foreground/50 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </div>

      <SortDropdown
        selected={filters.sortBy}
        onSelect={(v) => onChange("sortBy", v)}
      />

      <SearchableDropdown
        label="All Department"
        title="Department"
        items={DEPARTMENTS}
        selected={filters.department}
        onSelect={(v) => onChange("department", v)}
        placeholder="Search by name, patient id"
      />

      <SearchableDropdown
        label="All Team"
        title="Team"
        items={TEAMS}
        selected={filters.team}
        onSelect={(v) => onChange("team", v)}
        placeholder="Search team"
      />

      <StatusFilterDropdown
        selected={filters.status}
        onSelect={(v) => onChange("status", v)}
      />

      <DateFilterDropdown
        selected={filters.date}
        onSelect={(d) => onChange("date", d)}
      />
    </div>
  );
}
