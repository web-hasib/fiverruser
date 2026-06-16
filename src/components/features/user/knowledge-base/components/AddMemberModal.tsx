"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import { Check, X } from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const ROLES = ["Super Admin", "Admin", "Member"];

const ACCESS_LEVELS = [
  { id: "full", title: "Full Access", desc: "Can add, edit, and delete all entries." },
  { id: "edit", title: "Edit Access", desc: "Can add and edit entries, but cannot delete." },
  { id: "entry", title: "Entry Only", desc: "Can add entry, cant delete." },
  { id: "view", title: "View Only", desc: "Can only view, but cant delete or add." },
];

const AddMemberModal = ({ isOpen, onClose, onAdd }: AddMemberModalProps) => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Member");
  const [selectedAccess, setSelectedAccess] = useState("full");

  const handleAdd = () => {
    onAdd({ email, role: selectedRole, access: selectedAccess });
    onClose();
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Member"
      maxWidth="sm:max-w-[600px]"
    >
      <div className="space-y-6 pt-2 pb-2">
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-foreground">Email or Member ID *</Label>
          <Input 
            placeholder="example.xyz@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 bg-transparent border-muted-foreground/20 rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[13px] font-bold text-foreground">Role *</Label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "py-2.5 rounded-lg text-sm font-bold border transition-all",
                  selectedRole === role 
                    ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500" 
                    : "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[13px] font-bold text-foreground">Access Level *</Label>
          <div className="grid grid-cols-2 gap-3">
            {ACCESS_LEVELS.map(level => (
              <div
                key={level.id}
                onClick={() => setSelectedAccess(level.id)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3",
                  selectedAccess === level.id 
                    ? "bg-blue-600/10 border-blue-600 shadow-lg shadow-blue-600/5" 
                    : "bg-muted/10 border-border hover:bg-muted/20"
                )}
              >
                <div className={cn(
                  "size-4 rounded-full border-2 flex items-center justify-center mt-0.5",
                  selectedAccess === level.id ? "border-blue-500" : "border-muted-foreground/30"
                )}>
                  {selectedAccess === level.id && <div className="size-2 bg-blue-500 rounded-full" />}
                </div>
                <div className="space-y-1">
                  <p className={cn("text-[13px] font-bold", selectedAccess === level.id ? "text-foreground" : "text-muted-foreground")}>
                    {level.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {level.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose} className="font-bold text-foreground">
            Cancel
          </Button>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-8 rounded-lg shadow-lg shadow-blue-600/20 transition-all">
            ADD MEMBER
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default AddMemberModal;
