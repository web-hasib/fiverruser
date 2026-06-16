import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

interface AssistantApprovalFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
}

export default function AssistantApprovalFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
}: AssistantApprovalFiltersProps) {
    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search assistants, users or teams..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-[#151921] border border-border/30 rounded-xl pl-12 pr-10 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600"
                    />
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="appearance-none bg-[#151921] border border-border/30 rounded-xl pl-5 pr-12 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 cursor-pointer min-w-[160px] font-bold"
                    >
                        <option value="All Status">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Approved">Approved</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
