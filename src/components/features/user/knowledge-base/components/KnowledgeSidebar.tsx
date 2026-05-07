"use client";

import React, { useState } from "react";
import {
  Plus, Search, Layout, Pin, Star, Brain, Clock,
  Circle, PlusCircle, Share2, Edit2, Trash2, Check, X,
  UserPlus, Upload, ChevronDown, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SearchInput } from "@/src/components/dashboard/SearchInput";
import { cn } from "@/src/lib/utils";
import { FolderItem } from "../types";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

interface KnowledgeSidebarProps {
  library: { id: string; label: string; count: number; icon: any; color?: string }[];
  types: { id: string; label: string; count: number; color: string }[];
  customFolders: FolderItem[];
  tags: string[];
  selectedId: string;
  onSelect: (id: string) => void;
  onNewEntry: () => void;
  onAddFolderClick: () => void;
  onDeleteFolder: (folder: FolderItem) => void;
  onRenameFolder: (id: string, name: string) => void;
  onShareFolder: (folder: FolderItem) => void;
  onAddMember: (folder: FolderItem) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const KnowledgeSidebar = ({
  library,
  types,
  customFolders,
  tags,
  selectedId,
  onSelect,
  onNewEntry,
  onAddFolderClick,
  onDeleteFolder,
  onRenameFolder,
  onShareFolder,
  onAddMember,
  isCollapsed = false,
  onToggleCollapse,
}: KnowledgeSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={cn(
      "bg-card border-r border-border h-full flex flex-col p-4 transition-all duration-300 shrink-0 relative overflow-y-auto no-scrollbar",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-1 top-6 size-6 bg-card border border-border cursor-pointer hover:bg-gray-600 transition rounded-full flex items-center justify-center text-foreground shadow-sm z-10 hidden lg:flex"
      >
        {isCollapsed ? <ChevronRight size={36} /> : <ChevronLeft size={36} />}
      </button>

      <Button
        onClick={onNewEntry}
        className={cn(
          "bg-blue-600 hover:bg-blue-700 text-white  flex items-center justify-center h-10 rounded-lg font-bold shadow-lg shadow-blue-600/20 transition-all mb-6",
          isCollapsed ? "w-9 h-9 p-0" : "w-48 gap-2"
        )}
      >
        <Plus size={16} strokeWidth={2.5} />
        {!isCollapsed && <span>NEW ENTRY</span>}
      </Button>

      {!isCollapsed && (
        <SearchInput
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />
      )}
      {isCollapsed && (
        <div className="flex justify-center mb-6">
          <button className="size-10 flex items-center justify-center rounded-lg bg-muted/20 text-muted-foreground/40 hover:text-foreground transition-colors border-2 border-border shadow-sm">
            <Search size={18} strokeWidth={3} />
          </button>
        </div>
      )}

      <div className="space-y-8 flex-1">
        {/* Library */}
        <div>
          <h3 className={cn(
            "text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-3 px-1 transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            Library
          </h3>
          <div className="space-y-1">
            {library.map((item) => (
              <SidebarItemRow
                key={item.id}
                label={item.label}
                count={item.count}
                icon={item.icon}
                isSelected={selectedId === item.id}
                onClick={() => onSelect(item.id)}
                color={item.color}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <h3 className={cn(
            "text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-3 px-1 transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            Type
          </h3>
          <div className="space-y-1">
            {types.map((item) => (
              <SidebarItemRow
                key={item.id}
                label={item.label}
                count={item.count}
                isSelected={selectedId === item.id}
                onClick={() => onSelect(item.id)}
                color={item.color}
                isType
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Custom Folder */}
        <div>
          <div className={cn(
            "flex items-center justify-between mb-3 px-1 transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            <h3 className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider">
              Custom Folder
            </h3>
            <button
              onClick={onAddFolderClick}
              className="text-muted-foreground hover:text-blue-500 transition-colors"
              title="Add New Folder"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-1">
            {customFolders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                isSelected={selectedId === folder.id}
                onClick={() => onSelect(folder.id)}
                onDelete={() => onDeleteFolder(folder)}
                onRename={(newName) => onRenameFolder(folder.id, newName)}
                onShare={() => onShareFolder(folder)}
                onAddMember={() => onAddMember(folder)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        {!isCollapsed && (
          <div>
            <h3 className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-3 px-1">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1 px-1">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-2 py-1 bg-muted/40 hover:bg-muted text-[10px] font-medium text-muted-foreground hover:text-foreground rounded transition-colors border border-border/50"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItemRow = ({
  label,
  count,
  icon: Icon,
  isSelected,
  onClick,
  color,
  isType,
  isCollapsed
}: {
  label: string;
  count: number;
  icon?: any;
  isSelected: boolean;
  onClick: () => void;
  color?: string;
  isType?: boolean;
  isCollapsed?: boolean;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all",
      isSelected
        ? "bg-blue-600/10 text-blue-500"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      isCollapsed && "px-0 justify-center"
    )}
  >
    <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
      {isType ? (
        <Circle size={10} fill={color} className={cn(color ? "" : "text-muted-foreground")} style={{ color: color }} />
      ) : (
        Icon && <Icon size={16} className={cn(isSelected ? "text-blue-500" : "text-muted-foreground group-hover:text-foreground")} />
      )}
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
    {!isCollapsed && (
      <span className={cn("text-[11px] font-bold", isSelected ? "text-blue-500" : "text-muted-foreground/60")}>
        {count}
      </span>
    )}
  </div>
);

const FolderRow = ({
  folder,
  isSelected,
  onClick,
  onDelete,
  onRename,
  onShare,
  onAddMember,
  isCollapsed,
}: {
  folder: FolderItem;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
  onShare: () => void;
  onAddMember: () => void;
  isCollapsed?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(folder.label);

  const handleRenameConfirm = () => {
    if (editValue.trim()) {
      onRename(editValue.trim());
    } else {
      setEditValue(folder.label);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all",
        isSelected
          ? "bg-blue-600/10 text-blue-500"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        isCollapsed && "px-0 justify-center"
      )}
      onClick={() => !isEditing && onClick()}
    >
      <div className={cn("flex items-center gap-2 flex-1 min-w-0", isCollapsed && "justify-center")}>
        <Circle size={10} fill={folder.color || "#2563eb"} className="border-0 shrink-0" style={{ color: folder.color || "#2563eb" }} />
        {!isCollapsed && (
          isEditing ? (
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameConfirm();
                if (e.key === "Escape") setIsEditing(false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 min-w-0 bg-transparent border-b border-blue-500 text-sm py-0 focus:outline-none"
            />
          ) : (
            <span className="text-[15px] font-semibold truncate">{folder.label}</span>
          )
        )}
      </div>
      {!isCollapsed && (
        <div className="flex items-center gap-2 shrink-0 ml-1">
          {!isEditing && (
            <div className="flex opacity-0 group-hover:opacity-100 items-center gap-2 transition-all">
              <span className={cn("text-[13px] font-bold mr-1", isSelected ? "text-blue-500" : "text-muted-foreground/60")}>
                {folder.count}
              </span>
              <button onClick={(e) => { e.stopPropagation(); onShare(); }} className="text-blue-500 hover:text-blue-400 p-0.5">
                <Upload size={14} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onAddMember(); }} className="text-emerald-500 hover:text-emerald-400 p-0.5">
                <UserPlus size={14} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-rose-500 hover:text-rose-400 p-0.5">
                <Trash2 size={14} />
              </button>
            </div>
          )}
          {!isSelected && !isEditing && (
            <span className="group-hover:hidden text-[13px] font-bold text-muted-foreground/60">
              {folder.count}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeSidebar;
