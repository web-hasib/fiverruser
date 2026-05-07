"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { X, Plus, Mail } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Person {
  name: string;
  id: string; // MED-XXXX
  role: string;
  color: string;
}

const InviteModal = ({
  isOpen,
  onClose,
  folderName,
}: {
  isOpen: boolean;
  onClose: () => void;
  folderName?: string;
}) => {
  const [people, setPeople] = useState<Person[]>([
    { name: "Cameron Williamson", id: "MED-XXXX", role: "Team Member", color: "bg-blue-600" },
    { name: "Leslie Alexander", id: "MED-XXXX", role: "Team Member", color: "bg-indigo-600" },
  ]);

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={folderName ? `Share "${folderName}"` : "Share & Invite"}
      maxWidth="sm:max-w-[480px]"
    >
      <div className="space-y-6">
        <p className="text-primary-foreground/60 text-sm">
          {folderName
            ? `People you invite can view and edit tasks in "${folderName}".`
            : "People with access can view and edit tasks in this folder."}
        </p>

        <div className="space-y-4">
          {people.map((person, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("size-10 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase", person.color)}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-primary-foreground text-sm font-bold">{person.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-[10px] font-bold uppercase tracking-tight">{person.id}</span>
                    <span className="text-primary-foreground/40 text-[10px]">|</span>
                    <span className="text-primary-foreground/60 text-[10px]">{person.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-4">
           <label className="text-sm font-bold text-primary-foreground">Email</label>
           <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter name or email to invite..."
                  className="w-full bg-muted/30 border border-border rounded-lg py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-auto font-bold flex items-center gap-2">
                <Plus size={18} /> Invite
              </Button>
           </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="bg-primary-foreground/5 border border-border text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 px-8 h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-12 rounded-xl font-bold"
          >
            SAVE
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default InviteModal;
