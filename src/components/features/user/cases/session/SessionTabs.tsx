"use client";

import React from "react";
import {
  Plus,
  X,
  Sparkles,
  ListTodo,
  FilePlus2,
  ChevronDown
} from "lucide-react";
import { cn } from "@/src/lib/utils";


interface SessionTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string, label: string }[];
  onRemoveTab: (tabId: string) => void;
  onOpenAssistance: () => void;
  onOpenCreateTask: () => void;
}

const SessionTabs = ({ activeTab, setActiveTab, tabs, onRemoveTab, onOpenAssistance, onOpenCreateTask }: SessionTabsProps) => {

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between py-1 gap-2">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap group relative",
              activeTab === tab.id
                ? "bg-blue-600/20 text-blue-500 border border-blue-500/30 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
            )}
          >
            {tab.id.startsWith("assist-") && (
              <Sparkles size={12} className={cn("shrink-0", activeTab === tab.id ? "text-blue-500" : "text-blue-500/60")} />
            )}
            {tab.label}
            {tab.id !== "content" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTab(tab.id);
                }}
                className="p-0.5 hover:bg-red-500/20 hover:text-red-500 rounded-md transition-colors"
              >
                <X size={12} className={cn("opacity-0 group-hover:opacity-100 transition-opacity")} />
              </div>
            )}
          </button>
        ))}

        <button
          onClick={onOpenAssistance}
          className="p-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all shrink-0 ml-1 border border-transparent hover:border-blue-500/20"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SessionTabs;
