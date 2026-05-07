"use client";

import React, { useState } from "react";
import {
  Search,
  RotateCw,
  Filter,
  ListFilter,
  CheckSquare,
  Square,
  Trash2,
  Link as LinkIcon
} from "lucide-react";
import { useSidebar } from "../../admin/dashboard/components/SidebarProvider";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent } from "@/src/components/ui/sheet";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

const pastScribes = [
  { id: "1", name: "Saifur Rahman", time: "12:00 AM", status: "Active", statusColor: "bg-emerald-500", department: "ER", tag: "Emergency", tagColor: "text-red-500 border-red-500/40", desc: "Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup," },
  { id: "2", name: "Saifur Rahman", time: "12:00 AM", status: "Active", statusColor: "bg-emerald-500", department: "ER", tag: "Cardiology", tagColor: "text-amber-500 border-amber-500/40", desc: "Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup," },
  { id: "3", name: "Saifur Rahman", time: "12:00 AM", status: "Active", statusColor: "bg-emerald-500", department: "ER", tag: "Surgery", tagColor: "text-purple-500 border-purple-500/40", desc: "Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup," },
  { id: "4", name: "Saifur Rahman", time: "12:00 AM", status: "Active", statusColor: "bg-emerald-500", department: "ER", tag: "Neurology", tagColor: "text-emerald-500 border-emerald-500/40", desc: "Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup," },
  { id: "5", name: "Saifur Rahman", time: "12:00 AM", status: "Active", statusColor: "bg-emerald-500", department: "ER", tag: "Surgery", tagColor: "text-purple-500 border-purple-500/40", desc: "Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup," },
  { id: "6", name: "Saifur Rahman", time: "12:00 AM", status: "Active", statusColor: "bg-emerald-500", department: "ER", tag: "Cardiology", tagColor: "text-amber-500 border-amber-500/40", desc: "Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup," },
  ...Array.from({ length: 94 }).map((_, i) => ({
    id: `${i + 7}`,
    name: "Mock Patient " + (i + 7),
    time: "10:30 AM",
    status: i % 2 === 0 ? "Active" : "Done",
    statusColor: i % 2 === 0 ? "bg-emerald-500" : "bg-gray-400",
    department: "OPD",
    tag: i % 3 === 0 ? "Review" : "Follow-up",
    tagColor: i % 3 === 0 ? "text-blue-500 border-blue-500/40" : "text-gray-500 border-gray-500/40",
    desc: "Simulated session data for testing view all functionality.",
  })),
];

const tabs = ["All", "Draft", "Done"];

interface PastScribeSidebarProps {
  onNewCase?: () => void;
}

const PastScribeSidebar = ({ onNewCase }: PastScribeSidebarProps) => {
  const { isPastScribeOpen, togglePastScribe } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [data, setData] = useState(pastScribes);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredScribes.length && filteredScribes.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredScribes.map(s => s.id)));
    }
  };

  const deleteSelected = () => {
    setData(prev => prev.filter(s => !selectedIds.has(s.id)));
    setSelectedIds(new Set());
  };

  const filteredScribes = data.filter(scribe => {
    const matchesSearch = scribe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scribe.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || scribe.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const sidebarContent = (
    <>
      {selectedIds.size > 0 && (
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between animate-in slide-in-from-top duration-200 sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={selectAll} className="hover:bg-white/10 p-1 rounded transition-colors">
              {selectedIds.size === filteredScribes.length ? <CheckSquare size={18} /> : <Square size={18} />}
            </button>
            <span className="text-xs font-bold uppercase tracking-wider">{selectedIds.size} Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-white/10 rounded-lg transition-colors text-[10px] font-bold uppercase tracking-widest">
              <LinkIcon size={14} /> Link
            </button>
            <button onClick={deleteSelected} className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-rose-500 rounded-lg transition-colors text-[10px] font-bold uppercase tracking-widest">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full bg-background">
        {/* Header Area */}
        <div className="flex flex-col pb-0 border-b border-border/40">

          <div className="bg-card p-4 flex flex-col gap-4">

            <div className="flex items-center justify-between">
              <h3 className="text-foreground font-semibold text-sm tracking-tight">Past Sessions</h3>
              <div className="flex items-center gap-3">
                <ListFilter size={14} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                <Filter size={14} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                <RotateCw size={14} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                <div className="px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-medium text-blue-500">
                  {filteredScribes.length} Sessions
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Session..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border/50 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center mt-4 gap-4 px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-[11px] font-medium pb-2 border-b-2 transition-colors",
                  activeTab === tab
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List Container */}
        <div className="flex-1 overflow-y-auto ">
          {filteredScribes.length > 0 ? (
            <div className="flex flex-col">
              {filteredScribes.slice(0, visibleCount).map((scribe, idx) => (
                <Link
                  key={scribe.id}
                  href={`/dashboard/user/new/session/${scribe.id}`}
                  className={cn(
                    "flex flex-col p-4 hover:bg-card rounded-lg cursor-pointer transition-all relative group",
                    idx !== filteredScribes.length - 1 && "border-b border-border/40",
                    selectedIds.has(scribe.id) && "bg-blue-500/5 hover:bg-blue-500/10"
                  )}
                >
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSelect(scribe.id);
                    }}
                    className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-all transform scale-90",
                      selectedIds.has(scribe.id) ? "opacity-100 scale-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    {selectedIds.has(scribe.id) ? (
                      <CheckSquare className="text-blue-600" size={20} />
                    ) : (
                      <Square className="text-primary-foreground hover:text-blue-600" size={20} />
                    )}
                  </div>
                  <div className="flex items-start justify-between mb-1.5">
                    <p className="text-foreground text-[13px] font-medium">
                      {scribe.name}
                    </p>
                    <span className="text-[10px] text-muted-foreground/80">
                      {scribe.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-[11px]">
                    <span className="text-muted-foreground font-medium">{scribe.department}</span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded-full border text-[9px] font-medium tracking-wide",
                      scribe.tagColor
                    )}>
                      {scribe.tag}
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-muted-foreground/70 line-clamp-2">
                    {scribe.desc}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-xs font-medium text-muted-foreground">No sessions found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pt-6 pb-2 border-t border-border/40 mt-auto">
          <Button
            variant="primary"
            onClick={() => setVisibleCount(100)}
            className={cn(
              "mx-auto w-full rounded font-bold text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all text-white",
              visibleCount >= filteredScribes.length && "hidden"
            )}
          >
            VIEW ALL ({filteredScribes.length})
          </Button>
        </div>
      </div>
    </>
  );

  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:flex flex-col h-full border-none">
        {sidebarContent}
      </div>

      {/* Mobile/Tablet Version */}
      {isMobile && (
        <Sheet open={isPastScribeOpen} onOpenChange={togglePastScribe}>
          <SheetContent side="left" className="p-0 w-[90%] sm:w-[400px] border-r border-border bg-background lg:hidden">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default PastScribeSidebar;
