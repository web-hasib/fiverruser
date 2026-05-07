import React from "react";
import { cn } from "@/src/lib/utils";

export type ProfileTab = 
  | "overview" 
  | "sessions" 
  | "files" 
  | "tasks" 
  | "messages" 
  | "letters";

interface TabOption {
  id: ProfileTab;
  label: string;
  count?: number;
}

const TABS: TabOption[] = [
  { id: "overview", label: "Overview" },
  { id: "sessions", label: "Sessions", count: 12 },
  { id: "files", label: "Files", count: 6 },
  { id: "tasks", label: "Related Tasks", count: 6 },
  { id: "messages", label: "Sent Messages" },
  { id: "letters", label: "Generated Letters", count: 3 },
];

interface PatientTabsNavProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export const PatientTabsNav = ({ activeTab, onTabChange }: PatientTabsNavProps) => {
  return (
    <div className="flex items-center gap-2 border border-border/50 bg-card overflow-x-auto rounded-xl p-1.5 no-scrollbar mb-6 w-full">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              isActive 
                ? "bg-blue-600/10 text-blue-500" 
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "px-2 py-0.5 rounded-md text-[10px] font-black",
                isActive ? "bg-blue-600 text-white" : "bg-muted-foreground/20 text-muted-foreground"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
