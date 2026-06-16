"use client";
import React, { useState } from "react";
import { ProfileSectionCard } from "@/src/components/features/user/patients/profile/ProfileSectionCard";
import { Layers, FileIcon, Search, LayoutGrid, List, ChevronDown } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const FILES = [
  { name: "NID Frontside",        size: "23.5MB" },
  { name: "Medical Certificate",  size: "23.5MB" },
  { name: "Surgery",              size: "23.5MB" },
  { name: "Cardiology",           size: "23.5MB" },
  { name: "Surgery",              size: "23.5MB" },
  { name: "Cardiology",           size: "23.5MB" },
  { name: "Neurology",            size: "23.5MB" },
];

const FILE_TYPES = ["All Types", "PDF", "Image", "Lab Result", "Prescription"];

export const FilesTabContent = () => {
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [typeOpen, setTypeOpen] = useState(false);

  const filtered = FILES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <ProfileSectionCard
        title="Uploaded Files"
        icon={<Layers className="size-4" />}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-500"
        showViewAll
        onViewAll={() => {}}
        onRefresh={() => {}}
      >
        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search file"
              className="h-9 pl-9 bg-muted/20 border-border/50 text-xs focus-visible:ring-blue-500/20 focus-visible:border-blue-500/50"
            />
          </div>

          {/* File Type Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTypeOpen((prev) => !prev)}
              className="h-9 px-4 border-border/50 bg-muted/20 text-xs font-semibold gap-2"
            >
              {typeFilter} <ChevronDown className="size-3.5 opacity-60" />
            </Button>
            {typeOpen && (
              <div className="absolute left-0 top-full mt-1 w-36 bg-card border border-border/50 rounded-xl shadow-sm z-10 overflow-hidden">
                {FILE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTypeFilter(t); setTypeOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs transition-colors hover:bg-muted/50",
                      typeFilter === t ? "text-blue-500 font-bold" : "text-muted-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid / List Toggle */}
          <div className="flex items-center p-1 bg-muted/20 border border-border/50 rounded-lg gap-0.5">
            <button
              onClick={() => setView("list")}
              className={cn("p-2 rounded-md transition-colors", view === "list" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <List className="size-3.5" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={cn("p-2 rounded-md transition-colors", view === "grid" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid className="size-3.5" />
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filtered.map((file, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/30 cursor-pointer transition-colors group">
                <div className="size-8 bg-white/5 rounded flex items-center justify-center text-teal-400 shrink-0">
                  <FileIcon className="size-4" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold text-foreground truncate group-hover:text-blue-500 transition-colors">{file.name}</span>
                  <span className="text-[10px] text-muted-foreground">{file.size}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {filtered.map((file, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-border/50 hover:bg-muted/20 cursor-pointer transition-colors group">
                <div className="size-8 bg-white/5 rounded flex items-center justify-center text-teal-400 shrink-0">
                  <FileIcon className="size-4" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold text-foreground group-hover:text-blue-500 transition-colors">{file.name}</span>
                  <span className="text-[10px] text-muted-foreground">{file.size}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ProfileSectionCard>
    </div>
  );
};
