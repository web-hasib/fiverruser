"use client";

import React, { useState } from "react";
import DashboardModal from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const COLORS = [
  "#2563eb", "#7c3aed", "#db2777", "#ea580c", 
  "#16a34a", "#0891b2", "#4f46e5", "#b91c1c"
];

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
  title?: string;
  buttonText?: string;
}

const AddFolderModal = ({ 
  isOpen, 
  onClose, 
  onSave,
  title = "Add New Folder",
  buttonText = "Create Folder"
}: AddFolderModalProps) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), selectedColor);
      setName("");
      onClose();
    }
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="sm:max-w-[400px]"
    >
      <form onSubmit={handleSubmit} className="p-1 space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">
            Folder Name
          </label>
          <input
            autoFocus
            type="text"
            className="w-full h-11 px-4 rounded-xl border-2 border-border bg-muted/20 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-blue-500 transition-all"
            placeholder="e.g. Urgent Tasks"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">
            Select Color
          </label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "size-8 rounded-full border-2 transition-all",
                  selectedColor === color ? "border-blue-500 scale-110 shadow-lg" : "border-transparent hover:scale-105"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-2 border-border font-bold h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!name.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-600/20"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </DashboardModal>
  );
};

export default AddFolderModal;
