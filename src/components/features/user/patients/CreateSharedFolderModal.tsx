"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { UserPlus, X } from "lucide-react";
import { FolderRole } from "@/src/types/patient";
import { cn } from "@/src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface MemberInput {
  email: string;
  role: FolderRole;
}

interface CreateSharedFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSharedFolderModal = ({
  isOpen,
  onClose,
}: CreateSharedFolderModalProps) => {
  const [folderType, setFolderType] = useState<"Team" | "Department">("Team");
  const [members, setMembers] = useState<MemberInput[]>([
    { email: "", role: "Editor" },
    { email: "", role: "Viewer" },
  ]);

  const addMember = () => {
    setMembers([...members, { email: "", role: "Viewer" }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Shared Folder"
      maxWidth="sm:max-w-[500px]"
    >
      <div className="space-y-6 text-foreground">
        {/* Folder Name */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-muted-foreground">
            Folder Name
          </Label>
          <Input
            placeholder="e.g. Oncology Team, Emergency Department"
            className="bg-muted/30 border-border h-12 px-4 focus:border-blue-500/50 text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Patient ID / Type selection */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-muted-foreground">
            Patient ID
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setFolderType("Team")}
              className={cn(
                "p-4 rounded-xl border text-left transition-all relative group h-20",
                folderType === "Team"
                  ? "border-blue-600 bg-blue-600/5"
                  : "border-border bg-muted/20 hover:bg-muted/40",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "size-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                    folderType === "Team"
                      ? "border-blue-600"
                      : "border-muted-foreground/30",
                  )}
                >
                  {folderType === "Team" && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    Team
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Small group collaboration
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setFolderType("Department")}
              className={cn(
                "p-4 rounded-xl border text-left transition-all relative group h-20",
                folderType === "Department"
                  ? "border-blue-600 bg-blue-600/5"
                  : "border-border bg-muted/20 hover:bg-muted/40",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "size-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                    folderType === "Department"
                      ? "border-blue-600"
                      : "border-muted-foreground/30",
                  )}
                >
                  {folderType === "Department" && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    Department
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Larger organizational unit
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Members Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-muted-foreground">
              Add Team Member{" "}
              <span className="text-[10px] font-normal opacity-60">
                (Max 8)
              </span>
            </Label>
            <button
              onClick={addMember}
              className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline"
            >
              <UserPlus size={14} /> Add Member
            </button>
          </div>

          <div className="space-y-3">
            {members.map((member, idx) => (
              <div key={idx} className="flex gap-2 items-center group">
                <div className="flex-1 relative">
                  <Input
                    placeholder="e.g. doctor email or Unique Id"
                    className="bg-muted/30 border-border h-12 pl-4 pr-24 focus:border-blue-500/50 text-foreground placeholder:text-muted-foreground/50"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Select defaultValue={member.role}>
                      <SelectTrigger className="h-8 w-20 bg-transparent border-none focus:ring-0 text-[10px] font-bold uppercase tracking-wider text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-foreground">
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <button
                  onClick={() => removeMember(idx)}
                  className="size-8 flex items-center justify-center text-muted-foreground/40 hover:text-destructive transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground">
          <span className="text-red-500 font-bold">Note:</span> Patient details
          will be shared securely.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 bg-background hover:bg-muted text-foreground border border-border h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-blue-600/20">
            Create Folder
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
