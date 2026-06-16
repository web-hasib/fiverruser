"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { Settings2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const ALL_DEFAULT_TABS = [
  { id: "content", label: "Content" },
  { id: "soap", label: "SOAP Note" },
  { id: "summary", label: "Patient Summary" },
  { id: "test", label: "Test Result" },
  { id: "qa", label: "Q & A" },
];

interface TabPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedIds: string[]) => void;
  initialSelectedIds: string[];
}

const TabPreferenceModal = ({
  isOpen,
  onClose,
  onSave,
  initialSelectedIds,
}: TabPreferenceModalProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

  useEffect(() => {
    if (isOpen) {
      setSelectedIds(initialSelectedIds);
    }
  }, [isOpen, initialSelectedIds]);

  const handleToggle = (id: string) => {
    if (id === "content") return; // content tab is always required
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    // Always ensure "content" is included
    const finalIds = selectedIds.includes("content") ? selectedIds : ["content", ...selectedIds];
    onSave(finalIds);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Settings2 className="size-5 text-blue-500" />
            Tab Preferences
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose which tabs you want to see by default in your sessions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-2">
          {ALL_DEFAULT_TABS.map((tab) => {
            const isLocked = tab.id === "content";
            return (
              <div
                key={tab.id}
                className={cn(
                  "flex items-center space-x-3 space-y-0 p-2 rounded-xl border border-border/50 transition-colors",
                  isLocked ? "opacity-70 cursor-not-allowed" : "hover:bg-muted/30 cursor-pointer"
                )}
                onClick={() => !isLocked && handleToggle(tab.id)}
              >
                <Checkbox
                  id={tab.id}
                  checked={isLocked ? true : selectedIds.includes(tab.id)}
                  disabled={isLocked}
                  onCheckedChange={() => !isLocked && handleToggle(tab.id)}
                  className="border-blue-500/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={tab.id}
                  className={cn("text-sm font-semibold flex-1", isLocked ? "cursor-not-allowed" : "cursor-pointer")}
                >
                  {tab.label}
                </Label>
                {isLocked && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} className="font-semibold">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8"
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TabPreferenceModal;
