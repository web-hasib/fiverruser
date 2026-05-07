"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Eye, Link2 } from "lucide-react";
import { Assistant } from "@/src/types/assistant";

interface ShareAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  assistant: Assistant | null;
  onShare: (accessType: string) => void;
}

export const ShareAssistantModal = ({
  isOpen,
  onClose,
  assistant,
  onShare,
}: ShareAssistantModalProps) => {
  const [access, setAccess] = React.useState("view");

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        assistant ? `Share the '${assistant.name}' template` : "Share template"
      }
      maxWidth="sm:max-w-[450px]"
    >
      <div className="space-y-6 pt-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Who has access
          </label>
          <Select value={access} onValueChange={setAccess}>
            <SelectTrigger className="w-full bg-transparent border-border h-11 transition-all focus:ring-1 focus:ring-blue-500/20">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground font-light" />
                <SelectValue placeholder="Select access level" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="view">Only View</SelectItem>
              <SelectItem value="edit">Can Edit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-2 border-b border-border/50 pb-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-accent text-sm font-medium h-9 px-4 flex items-center gap-2"
            onClick={() => {
              // Optional: Add copy to clipboard logic here
            }}
          >
            <Link2 className="h-4 w-4" />
            Copy Link
          </Button>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onShare(access)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-0 h-11 rounded-lg font-bold shadow-lg shadow-blue-600/20 transition-all"
          >
            Shared Assistants
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
