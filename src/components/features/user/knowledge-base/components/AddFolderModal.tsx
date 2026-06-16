"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Search, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { FolderItem } from "../types";

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
  existingFolders: FolderItem[];
}

const PRESET_COLORS = [
  "#2563eb", // Blue
  "#ef4444", // Red
  "#f59e0b", // Orange
  "#10b981", // Green
  "#06b6d4", // Teal
  "#3b82f6", // Light Blue
  "#8b5cf6", // Purple
];

export const AddFolderModal = ({
  isOpen,
  onClose,
  onSave,
  existingFolders,
}: AddFolderModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [customColor, setCustomColor] = useState("#ffffff");

  const handleCreate = () => {
    if (newFolderName.trim()) {
      onSave(newFolderName.trim(), selectedColor);
      setNewFolderName("");
      onClose();
    }
  };

  const filteredFolders = existingFolders.filter((f) =>
    f.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Custom Folder"
      maxWidth="sm:max-w-[450px]"
    >
      <div className="space-y-6 pt-2 pb-2">
        {/* Search */}
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search status name"
            className="w-full h-11 bg-muted/20 border border-border/50 rounded-xl px-4 pr-10 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
        </div>

        {/* Existing Items */}
        <div className="space-y-3 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
          {filteredFolders.map((f) => (
            <div
              key={f.id}
              className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="size-2.5 rounded-full" 
                  style={{ backgroundColor: f.color || "#2563eb" }} 
                />
                <span className="text-[15px] font-semibold text-foreground/80 group-hover:text-foreground">
                  {f.label}
                </span>
              </div>
              <span className="text-xs font-bold text-muted-foreground/60">{f.count}</span>
            </div>
          ))}
          {filteredFolders.length === 0 && (
            <p className="text-center py-4 text-sm text-muted-foreground">No folders found</p>
          )}
        </div>

        {/* Add New Section */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-sm font-bold text-foreground mb-4 font-inter">Add New Folder</p>
          
          <div className="space-y-5">
            {/* Color Selection */}
            <div className="space-y-3">
              <p className="text-[13px] font-bold text-foreground/70">Color *</p>
              <div className="flex flex-wrap gap-2.5">
                {/* Custom Color Toggle */}
                <button
                  type="button"
                  onClick={() => setShowCustomColor(!showCustomColor)}
                  className={cn(
                    "size-9 rounded-xl flex items-center justify-center transition-all bg-gradient-to-tr from-blue-500 via-purple-500 to-rose-500",
                    showCustomColor ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-background" : ""
                  )}
                >
                  <Plus className="size-5 text-white" strokeWidth={3} />
                </button>

                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                        setSelectedColor(color);
                        setShowCustomColor(false);
                    }}
                    className={cn(
                      "size-9 rounded-xl transition-all hover:scale-110 active:scale-95",
                      selectedColor === color && !showCustomColor ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-background" : ""
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {showCustomColor && (
                <div className="flex items-center gap-3 mt-3 p-3 bg-muted/20 rounded-xl border border-border/50">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                        setCustomColor(e.target.value);
                        setSelectedColor(e.target.value);
                    }}
                    className="size-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => {
                        setCustomColor(e.target.value);
                        setSelectedColor(e.target.value);
                    }}
                    className="flex-1 bg-transparent border-0 text-xs font-mono text-foreground focus:outline-none"
                    placeholder="#HEX color"
                  />
                </div>
              )}
            </div>

            {/* Folder Name Input */}
            <div className="flex gap-3 items-center">
              <div 
                className="size-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-all" 
                style={{ 
                    backgroundColor: selectedColor,
                    boxShadow: `0 10px 15px -3px ${selectedColor}20` 
                }}
              >
                <Plus className="size-6 text-white" strokeWidth={3} />
              </div>
              <input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="flex-1 h-11 bg-muted/20 border border-border/50 rounded-xl px-4 text-sm font-semibold focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-muted-foreground/40"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-foreground hover:bg-muted font-bold px-6 h-11"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!newFolderName.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-8 h-11 active:scale-95 transition-all text-sm shadow-lg shadow-blue-600/20"
          >
            CREATE NEW
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
