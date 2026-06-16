"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberFormData) => void;
}

export interface MemberFormData {
  email: string;
  role: "Super Admin" | "Admin" | "Member";
  accessLevel: "Full Access" | "Edit Access" | "Entry Only" | "View Only";
}

const ROLES: MemberFormData["role"][] = ["Super Admin", "Admin", "Member"];

const ACCESS_LEVELS: { id: MemberFormData["accessLevel"]; title: string; description: string }[] = [
  {
    id: "Full Access",
    title: "Full Access",
    description: "Can add, edit, and delete all entries.",
  },
  {
    id: "Edit Access",
    title: "Edit Access",
    description: "Can add and edit entries, but cannot delete.",
  },
  {
    id: "Entry Only",
    title: "Entry Only",
    description: "Can add entry, cant delete.",
  },
  {
    id: "View Only",
    title: "View Only",
    description: "Can only view, but cant delete or add.",
  },
];

export const AddMemberModal = ({ isOpen, onClose, onSave }: AddMemberModalProps) => {
  const [form, setForm] = useState<MemberFormData>({
    email: "",
    role: "Super Admin",
    accessLevel: "Full Access",
  });

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title="Add New Member" maxWidth="sm:max-w-[650px]">
      <div className="flex flex-col gap-6 pt-2">
        {/* Email or Member ID */}
        <div className="space-y-3">
          <Label className="text-[13px] font-bold text-foreground">
            Email or Member ID <span className="text-rose-500 font-black">*</span>
          </Label>
          <Input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="example.xyz@gmail.com"
            className="h-14 px-4 rounded-xl border-border/50 bg-transparent text-sm placeholder:text-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all font-medium"
          />
        </div>

        {/* Role */}
        <div className="space-y-3">
          <Label className="text-[13px] font-bold text-foreground">
            Role <span className="text-rose-500 font-black">*</span>
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setForm((f) => ({ ...f, role }))}
                className={cn(
                  "h-12 rounded-xl text-xs font-bold transition-all border",
                  form.role === role
                    ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-500 shadow-sm"
                    : "border-border/50 bg-background text-foreground hover:bg-muted/50"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Access Level */}
        <div className="space-y-3">
          <Label className="text-[13px] font-bold text-foreground">
            Access Level <span className="text-rose-500 font-black">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACCESS_LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setForm((f) => ({ ...f, accessLevel: level.id }))}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border text-left transition-all",
                  form.accessLevel === level.id
                    ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                    : "border-border/50 bg-card hover:border-blue-500/30"
                )}
              >
                <div className={cn(
                  "size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                  form.accessLevel === level.id ? "border-foreground" : "border-muted-foreground/30"
                )}>
                  {form.accessLevel === level.id && <div className="size-2.5 rounded-full bg-foreground" />}
                </div>
                <div className="space-y-1">
                  <h4 className={cn(
                    "text-sm font-black",
                    form.accessLevel === level.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {level.title}
                  </h4>
                  <p className="text-[11px] font-medium text-muted-foreground/60 leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="h-12 px-6 rounded-xl text-sm font-black text-foreground hover:bg-muted transition-all uppercase tracking-wide border border-border/50"
          >
            Cancel
          </button>
          <Button
            onClick={handleSave}
            className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black shadow-lg shadow-blue-500/20 text-sm uppercase tracking-wide transition-all active:scale-95"
          >
            SAVE FOLDER
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
