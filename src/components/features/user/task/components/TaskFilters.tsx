"use client";

import React, { useState } from "react";
import { Search, ChevronDown, List, Grid3X3, X } from "lucide-react";
import { SearchInput } from "@/src/components/dashboard/SearchInput";
import { cn } from "@/src/lib/utils";

interface TaskFiltersProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  specialtyFilter: string;
  onSpecialtyChange: (value: string) => void;
  priorityFilter: string;
  onPriorityChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  assignedFilter: string;
  onAssignedChange: (value: string) => void;
}

const SORT_OPTIONS = ["Name A—Z", "Name Z—A", "Priority"];
const SPECIALTY_OPTIONS = ["All Specialty", "Cardiology", "Surgery", "Neurology", "General"];
const PRIORITY_OPTIONS = ["All Priority", "High", "Medium", "Low", "None"];
const STATUS_OPTIONS = ["All Status", "Overdue", "To Do", "In Progress", "Complete"];
const ASSIGNED_OPTIONS = ["All Assigned", "Cameron Williamson", "Theresa Webb", "Jacob Jones", "Brooklyn Simmons", "Darrell Steward"];

const TaskFilters = ({
  view,
  onViewChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  specialtyFilter,
  onSpecialtyChange,
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
  assignedFilter,
  onAssignedChange,
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {/* Search - Takes up remaining space but has a min-width */}
      <div className="flex-1 min-w-[300px]">
        <SearchInput
          placeholder="Search by name, ID, diagnosis, date..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          containerClassName="mb-0"
          className="w-full"
        />
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterDropdown
          label="Specialty"
          value={specialtyFilter}
          options={SPECIALTY_OPTIONS}
          onChange={onSpecialtyChange}
        />
        <FilterDropdown
          label="Priority"
          value={priorityFilter}
          options={PRIORITY_OPTIONS}
          onChange={onPriorityChange}
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          options={STATUS_OPTIONS}
          onChange={onStatusChange}
        />
        <FilterDropdown
          label="Assigned"
          value={assignedFilter}
          options={ASSIGNED_OPTIONS}
          onChange={onAssignedChange}
        />

        {/* Clear All - Simplified for UI match */}
        <button
          className="px-3 py-2 text-rose-500 hover:bg-rose-50 text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5"
          onClick={() => {
            onSpecialtyChange("All Specialty");
            onPriorityChange("All Priority");
            onStatusChange("All Status");
            onAssignedChange("All Assigned");
          }}
        >
          <X className="size-4" />
          Clear all
        </button>
      </div>

      {/* Sort & View Toggle */}
      <div className="flex items-center gap-2 ml-auto">
        <FilterDropdown
          label="Sort:"
          value={sortBy}
          options={SORT_OPTIONS}
          onChange={onSortChange}
          showLabelWhenSelected
        />

        <div className="flex items-center p-1 bg-card border border-border/50 rounded-xl">
          <button
            onClick={() => onViewChange("list")}
            className={cn(
              "p-2 rounded-lg transition-all",
              view === "list" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="size-4" />
          </button>
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "p-2 rounded-lg transition-all",
              view === "grid" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid3X3 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  showLabelWhenSelected = false
}: {
  label: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  showLabelWhenSelected?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDefault = value === options[0]; // First option is the default "All X"
  const displayValue = isDefault ? value : (showLabelWhenSelected ? `${label} ${value}` : value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-primary border border-primary-foreground/20 rounded-lg text-sm hover:border-primary-foreground/30 transition-colors whitespace-nowrap"
      >
        {isDefault ? (
          <span className="text-primary-foreground/60">{displayValue}</span>
        ) : (
          <>
            {showLabelWhenSelected && <span className="text-primary-foreground/50">{label}</span>}
            <span className="text-primary-foreground">{displayValue}</span>
          </>
        )}
        <ChevronDown size={14} className={cn("text-primary-foreground/50 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 min-w-[160px] bg-primary border border-primary-foreground/20 rounded-lg shadow-xl z-50 py-1">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-primary-foreground/10 transition-colors",
                  value === opt ? "text-blue-400" : "text-primary-foreground/80"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskFilters;
