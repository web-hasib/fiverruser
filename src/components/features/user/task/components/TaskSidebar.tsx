"use client";

import React, { useState } from "react";
import { Plus, Search, Share2, Edit2, Trash2, Check, X, Users, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SearchInput } from "@/src/components/dashboard/SearchInput";
import { cn } from "@/src/lib/utils";
import { FolderItem } from "../types";

interface TaskSidebarProps {
  myFolders: FolderItem[];
  sharedFolders: FolderItem[];
  selectedFolderId?: string;
  onSelectFolder: (id: string) => void;
  onAddFolder: () => void;
  onAddSharedFolder: () => void;
  onShareFolder: (folder: FolderItem) => void;
  onDeleteFolder: (folder: FolderItem) => void;
  onRenameFolder: (id: string, newName: string) => void;
  onMembers: (folder: FolderItem) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const TaskSidebar = ({
  myFolders,
  sharedFolders,
  selectedFolderId,
  onSelectFolder,
  onAddFolder,
  onAddSharedFolder,
  onShareFolder,
  onDeleteFolder,
  onRenameFolder,
  onMembers,
  isCollapsed = false,
  onToggleCollapse,
}: TaskSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterFolders = (folders: FolderItem[]) =>
    folders.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className={cn(
      "bg-card border-r border-border h-full flex flex-col p-4 transition-all duration-300 shrink-0 relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 hover:bg-gray-600 size-6 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:text-foreground shadow-sm z-10 hidden lg:flex"
      >
        {isCollapsed ? <ChevronRight size={36} className="w-8 h-6" /> : <ChevronLeft size={36} className="w-8 h-6" />}
      </button>

      <div className="flex flex-col gap-2 mb-6">
        <Button
          onClick={onAddFolder}
          className={cn(
            "bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center h-10 rounded-lg font-bold transition-all",
            isCollapsed ? "w-10 p-0" : "w-52 gap-2"
          )}
        >
          <Plus size={16} strokeWidth={2.5} />
          {!isCollapsed && <span>NEW FOLDER</span>}
        </Button>
        <Button
          onClick={onAddSharedFolder}
          className={cn(
            "bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center h-11 rounded-lg font-bold transition-all",
            isCollapsed ? "w-10 p-0" : "w-52 gap-2"
          )}
        >
          <Plus size={16} strokeWidth={2.5} />
          {!isCollapsed && <span>NEW SHARED FOLDER</span>}
        </Button>
      </div>

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
          <button className="size-10 flex items-center justify-center rounded-lg bg-muted/30 text-muted-foreground/40 hover:text-foreground transition-colors border border-border">
            <Search size={18} />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">
        {/* My Folders */}
        <div>
          <h3 className={cn(
            "text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3 px-2 transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0" : "opacity-100"
          )}>
            My Folder
          </h3>
          <div className="space-y-1">
            {filterFolders(myFolders).map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                isSelected={selectedFolderId === folder.id}
                onClick={() => onSelectFolder(folder.id)}
                onShare={() => onShareFolder(folder)}
                onDelete={() => onDeleteFolder(folder)}
                onRename={(newName) => onRenameFolder(folder.id, newName)}
                onMembers={() => onMembers(folder)}
                canDelete={folder.id !== "all"}
                isCollapsed={isCollapsed}
                showMembers={false}
              />
            ))}
          </div>
        </div>

        {/* Shared Folders */}
        <div>
          <h3 className={cn(
            "text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3 px-2 transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0" : "opacity-100"
          )}>
            Shared Folders
          </h3>
          <div className="space-y-1">
            {filterFolders(sharedFolders).map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                isSelected={selectedFolderId === folder.id}
                onClick={() => onSelectFolder(folder.id)}
                onShare={() => onShareFolder(folder)}
                onDelete={() => onDeleteFolder(folder)}
                onRename={(newName) => onRenameFolder(folder.id, newName)}
                onMembers={() => onMembers(folder)}
                canDelete
                isCollapsed={isCollapsed}
                showMembers={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Folder Row ───────────────────────────────────────────────────────────────
const FolderRow = ({
  folder,
  isSelected,
  onClick,
  onShare,
  onDelete,
  onRename,
  onMembers,
  canDelete,
  isCollapsed,
  showMembers,
}: {
  folder: FolderItem;
  isSelected: boolean;
  onClick: () => void;
  onShare: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
  onMembers: () => void;
  canDelete: boolean;
  isCollapsed?: boolean;
  showMembers?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(folder.name);

  const handleRenameConfirm = () => {
    if (editValue.trim()) {
      onRename(editValue.trim());
    } else {
      setEditValue(folder.name);
    }
    setIsEditing(false);
  };

  const handleRenameCancel = () => {
    setEditValue(folder.name);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all",
        isSelected
          ? "bg-primary-foreground/10 text-blue-500"
          : "text-muted-foreground hover:bg-primary-foreground/5 hover:text-foreground",
        isCollapsed && "px-0 justify-center"
      )}
      onClick={() => !isEditing && onClick()}
    >
      {/* Left: dot + name / edit input */}
      <div className={cn("flex items-center gap-2 flex-1 min-w-0", isCollapsed && "justify-center")}>
        <div
          className="size-2 rounded-full shrink-0"
          style={{ backgroundColor: folder.color || "#2563eb" }}
        />
        {!isCollapsed && (
          isEditing ? (
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameConfirm();
                if (e.key === "Escape") handleRenameCancel();
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 min-w-0 bg-muted/30 border border-blue-500 rounded px-2 py-0.5 text-xs text-foreground focus:outline-none"
            />
          ) : (
            <span className="text-sm font-medium truncate">{folder.name}</span>
          )
        )}
      </div>

      {/* Right: count + action icons */}
      {!isCollapsed && (
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {isEditing ? (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handleRenameConfirm(); }}
                className="text-emerald-500 hover:text-emerald-400 p-0.5 transition-colors"
                title="Confirm"
              >
                <Check size={12} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleRenameCancel(); }}
                className="text-rose-500 hover:text-rose-400 p-0.5 transition-colors"
                title="Cancel"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <>
              <span className={cn("text-xs font-bold mr-1", isSelected ? "text-blue-500" : "")}>{folder.count}</span>

              {/* Action icons — visible on hover or selection */}
              <div className={cn(
                "flex items-center gap-0.5 transition-all",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}>
                <button
                  onClick={(e) => { e.stopPropagation(); onShare(); }}
                  title="Share folder"
                  className="p-1 rounded text-muted-foreground hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                >
                  <Share2 size={12} />
                </button>
                {showMembers && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onMembers(); }}
                    title="View members"
                    className="p-1 rounded text-emerald-500 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
                  >
                    <Users size={12} />
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    title="Delete folder"
                    className="p-1 rounded text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSidebar;
