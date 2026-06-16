"use client";

import React, { useState, useEffect } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  Search, 
  Check, 
  Plus, 
  FileText, 
  Pencil, 
  Star,
  Pin,
  Bot,
  Sparkles
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { Switch } from "@/src/components/ui/switch";

interface AssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selected: string) => void;
  openTabs?: string[];
}

const SYSTEM_NAMES = ["Content", "SOAP Note", "Patient Summary", "Test Result", "Q & A"];
const PINNED_NAMES = ["SOAP Note", "Patient Summary"];

const assistanceOptions = [
  { name: "Content", category: "Favourites", icon: FileText },
  { name: "SOAP Note", category: "Favourites", icon: Pencil },
  { name: "Patient Summary", category: "Templates", icon: FileText },
  { name: "Test Result", category: "Templates", icon: FileText },
  { name: "Q & A", category: "Templates", icon: FileText },
  { name: "Patient Explainer Letter", category: "Templates", icon: FileText },
  { name: "Allied Health Team Meeting Note", category: "Templates", icon: FileText },
  { name: "Board / Executive Meeting Minutes", category: "Templates", icon: FileText },
  { name: "Business Meeting", category: "Templates", icon: FileText },
  { name: "Case Review / Clinical Supervision Note", category: "Templates", icon: FileText },
  { name: "Clinical Governance Meeting Note", category: "Templates", icon: FileText },
];

type FilterType = "All" | "Favourite" | "Pinned" | "System" | "Assistant";

const FILTER_TABS: { label: FilterType; icon: React.ElementType }[] = [
  { label: "All", icon: Sparkles },
  { label: "Favourite", icon: Star },
  { label: "Pinned", icon: Pin },
  { label: "System", icon: FileText },
  { label: "Assistant", icon: Bot },
];

const AssistanceModal = ({
  isOpen,
  onClose,
  onApply,
  openTabs = [],
}: AssistanceModalProps) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [favoriteNames, setFavoriteNames] = useState<string[]>(["Content", "SOAP Note"]);
  
  const toggleFavorite = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    setFavoriteNames(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const availableOptions = assistanceOptions.filter(opt => !openTabs.includes(opt.name));
  const [selected, setSelected] = useState(availableOptions[0]?.name || "");

  useEffect(() => {
    if (isOpen) {
      const available = assistanceOptions.filter(opt => !openTabs.includes(opt.name));
      if (available.length > 0) {
        setSelected(available[0].name);
      }
      setActiveFilter("All");
      setSearch("");
    }
  }, [isOpen, openTabs]);

  const handleApply = () => {
    if (!selected) return;
    onApply(selected);
    onClose();
  };

  const applyFilter = (opts: typeof assistanceOptions) => {
    return opts
      .filter(opt => !openTabs.includes(opt.name))
      .filter(opt => opt.name.toLowerCase().includes(search.toLowerCase()))
      .filter(opt => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Favourite") return favoriteNames.includes(opt.name);
        if (activeFilter === "Pinned") return PINNED_NAMES.includes(opt.name);
        if (activeFilter === "System") return SYSTEM_NAMES.includes(opt.name);
        if (activeFilter === "Assistant") return !SYSTEM_NAMES.includes(opt.name);
        return true;
      });
  };

  const filteredFavourites = applyFilter(assistanceOptions).filter(opt => favoriteNames.includes(opt.name));
  const filteredRest = applyFilter(assistanceOptions).filter(opt => !favoriteNames.includes(opt.name));

  const ListItem = ({ option }: { option: typeof assistanceOptions[0] }) => {
    const isSystemAssistant = SYSTEM_NAMES.includes(option.name);
    const isPinned = PINNED_NAMES.includes(option.name);

    return (
      <div
        onClick={() => setSelected(option.name)}
        className={cn(
          "flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer group transition-all duration-200",
          selected === option.name 
            ? "bg-blue-600/5 ring-1 ring-blue-500/20" 
            : "hover:bg-muted/50"
        )}
      >
        <div className="flex items-center gap-2.5">
          <option.icon className={cn(
            "size-4 transition-colors",
            selected === option.name ? "text-blue-500" : "text-muted-foreground/60 group-hover:text-foreground/80"
          )} />
          <span className={cn(
            "text-[13px] font-medium transition-colors",
            selected === option.name ? "text-foreground font-semibold" : "text-foreground/70"
          )}>
            {option.name}
          </span>
          {!isSystemAssistant && (
            <div className="size-5 rounded-md bg-blue-600/10 flex items-center justify-center">
              <Sparkles size={10} className="text-blue-600" />
            </div>
          )}
          {isPinned && (
            <div className="size-5 rounded-md bg-orange-500/10 flex items-center justify-center">
              <Pin size={10} className="text-orange-500" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => toggleFavorite(e, option.name)}
            className="p-1 hover:bg-yellow-500/10 rounded transition-colors group/star"
          >
            <Star 
              size={14} 
              className={cn(
                "transition-all",
                favoriteNames.includes(option.name) 
                  ? "text-yellow-500 fill-yellow-500" 
                  : "text-muted-foreground/30 group-hover/star:text-yellow-500/50"
              )} 
            />
          </button>
          {selected === option.name && (
            <div className="size-4 rounded-full bg-blue-600 flex items-center justify-center animate-in zoom-in-50 duration-200">
              <Check size={10} className="text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="sm:max-w-[540px]"
      hideCloseButton
    >
      <div className="flex flex-col">
        {/* Search Header */}
        <div className="relative mb-3">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
          <Input
            placeholder="Search or generate anything"
            className="bg-transparent border-none pl-7 h-10 text-[15px] focus-visible:ring-0 placeholder:text-muted-foreground/40 shadow-none border-b border-border/50 rounded-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          {FILTER_TABS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all",
                activeFilter === label
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-500"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Icon size={11} />
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
          {/* Favourites section */}
          {filteredFavourites.length > 0 && (
            <div className="space-y-1">
              <h5 className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wider px-3 mb-1">Favourites</h5>
              <div className="flex flex-col">
                {filteredFavourites.map((opt, i) => <ListItem key={i} option={opt} />)}
              </div>
            </div>
          )}

          {/* Rest of options */}
          {filteredRest.length > 0 && (
            <div className="space-y-1 pb-4">
              <h5 className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wider px-3 mb-1">
                {activeFilter === "All" ? "Document Templates" : activeFilter}
              </h5>
              <div className="flex flex-col">
                {filteredRest.map((opt, i) => <ListItem key={i} option={opt} />)}
              </div>
            </div>
          )}

          {filteredFavourites.length === 0 && filteredRest.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-0 pt-1 border-t border-border flex items-center justify-between">
          <Link
            href="/dashboard/user/my-assistants/private"
            className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-blue-600 transition-colors"
          >
            <Plus className="size-4" />
            Create new template
          </Link>
          
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">Set as default</span>
              <Switch className="scale-75" />
            </div> */}
            <Button 
              onClick={handleApply}
              disabled={!selected}
              className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-5 rounded-lg text-xs font-bold"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </DashboardModal>
  );
};

export default AssistanceModal;

