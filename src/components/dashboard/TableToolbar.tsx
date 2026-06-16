"use client";

import React from "react";
import { Search, LayoutGrid, List, Trash2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  sortOrder?: string;
  onSortChange?: (val: string) => void;
  sortOptions?: FilterOption[];
  filters?: {
    value: string;
    onChange: (val: string) => void;
    options: FilterOption[];
    placeholder?: string;
  }[];
  viewType?: "list" | "grid";
  onViewTypeChange?: (view: "list" | "grid") => void;
  showSelectAll?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: () => void;
  selectedCount?: number;
  onBulkDelete?: () => void;
  selectedActions?: React.ReactNode;
  rightContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  className?: string;
}

export function TableToolbar({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  sortOptions = [],
  filters = [],
  viewType,
  onViewTypeChange,
  showSelectAll,
  isAllSelected,
  onSelectAll,
  selectedCount = 0,
  onBulkDelete,
  selectedActions,
  rightContent,
  bottomContent,
  className,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-lg">
        {/* Main Toolbar Content */}
        <div className={cn(
          "flex items-center gap-2 lg:gap-3 flex-wrap bg-card p-2 border border-border/50 shadow-sm transition-all duration-300",
          selectedCount > 0 ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0",
          className
        )}>
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-[280px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, patient id..."
              className="pr-10 h-10 w-full bg-muted/40 border-transparent text-xs rounded-lg focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>

          {/* Sort Select */}
          {onSortChange && (
            <Select value={sortOrder} onValueChange={onSortChange}>
              <SelectTrigger className="h-10 px-4 bg-muted/40 border-transparent text-xs font-semibold gap-2 w-auto rounded-lg">
                <span className="text-muted-foreground font-medium">Sort:</span> <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border/50 shadow-xl">
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Dynamic Filters */}
          {filters.map((filter, idx) => (
            <Select key={idx} value={filter.value} onValueChange={filter.onChange}>
              <SelectTrigger className="h-10 px-4 bg-muted/40 border-transparent text-xs font-semibold w-auto rounded-lg">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border/50 shadow-xl">
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {/* View Toggle & Select All */}
          {(onViewTypeChange || rightContent) && (
            <div className="flex items-center p-1 bg-muted/20 border border-border/50 rounded-xl gap-1 ml-auto">
              {viewType === "grid" && showSelectAll && (
                <div className="flex items-center gap-2 px-3 border-r border-border/50 mr-1 py-1">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-border bg-transparent cursor-pointer accent-blue-600"
                    checked={isAllSelected}
                    onChange={onSelectAll}
                  />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground whitespace-nowrap">Select All</span>
                </div>
              )}
              
              {onViewTypeChange && (
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => onViewTypeChange("list")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      viewType === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <List className="size-4" />
                  </button>
                  <button
                    onClick={() => onViewTypeChange("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      viewType === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <LayoutGrid className="size-4" />
                  </button>
                </div>
              )}

              {rightContent}
            </div>
          )}
        </div>

        {/* Bulk Action Bar (Overlays) */}
        <div className={cn(
          "absolute inset-0 bg-blue-600/10 border border-blue-500/50 p-2 flex items-center justify-between transition-all duration-300 rounded-lg backdrop-blur-sm",
          selectedCount > 0 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-full pointer-events-none"
        )}>
          <div className="flex items-center gap-4 px-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold shadow-md">
              <span className="size-5 flex items-center justify-center bg-white/20 rounded-full">{selectedCount}</span>
              SELECTED
            </div>
            <div className="h-4 w-[1px] bg-blue-500/30" />
            <span className="text-[11px] font-semibold text-blue-700/80 uppercase tracking-wider">
              Apply bulk actions to selected patients
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedActions}
            {onBulkDelete && (
              <button
                onClick={onBulkDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                <Trash2 className="size-3.5" />
                DELETE SELECTED
              </button>
            )}
            <button
              onClick={onSelectAll}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white text-blue-600 text-[11px] font-bold rounded-lg transition-all border border-blue-200"
            >
              DESELECT ALL
            </button>
          </div>
        </div>
      </div>

      {bottomContent && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {bottomContent}
        </div>
      )}
    </div>
  );
}
