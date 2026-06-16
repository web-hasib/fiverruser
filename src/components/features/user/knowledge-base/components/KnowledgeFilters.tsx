"use client";

import React from "react";
import { Search, ListFilter, Grid, List as ListIcon } from "lucide-react";
import { SearchInput } from "@/src/components/dashboard/SearchInput";
import { cn } from "@/src/lib/utils";

interface KnowledgeFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ["All", "Note", "Documents", "Saved"];

const KnowledgeFilters = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}: KnowledgeFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="flex-1 min-w-[300px]">
          <SearchInput
            placeholder="Search by name, ID, diagnosis, date..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            containerClassName="mb-0"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                "pb-3 text-sm font-bold transition-all relative",
                activeTab === tab
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeFilters;
