import React from "react";
import { Search, Filter } from "lucide-react";

interface AssistantLibraryFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function AssistantLibraryFilters({
    search,
    onSearchChange,
}: AssistantLibraryFiltersProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground/80">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-semibold">Filter:</span>
            </div>

            <div className="relative group max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-card border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
            </div>
        </div>
    );
}
