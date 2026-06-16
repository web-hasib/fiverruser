"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Search, UserPlus, Trash2, Shield, MoreVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  access: string;
}

interface FolderMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  onAddMemberClick: () => void;
}

const MOCK_MEMBERS: Member[] = [
  { id: "1", name: "Cameron Williamson", email: "cameron.w@hospital.com", role: "Specialist", access: "Full Access" },
  { id: "2", name: "Theresa Webb", email: "theresa.webb@hospital.com", role: "Resident", access: "Edit Access" },
  { id: "3", name: "Jacob Jones", email: "jacob.j@hospital.com", role: "Nurse", access: "View Only" },
];

export const FolderMembersModal = ({
  isOpen,
  onClose,
  folderName,
  onAddMemberClick,
}: FolderMembersModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${folderName} - Members`}
      maxWidth="sm:max-w-[550px]"
    >
      <div className="space-y-6 pt-2 pb-2">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search member name or email"
                    className="w-full h-11 bg-muted/20 border border-border/50 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                />
            </div>
            <Button
                onClick={() => {
                    onClose();
                    onAddMemberClick();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl flex items-center gap-2 shrink-0 active:scale-95 transition-all w-full sm:w-auto"
            >
                <UserPlus size={18} /> Add New
            </Button>
        </div>

        {/* Member List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1">Assigned Members ({MOCK_MEMBERS.length})</p>
            {filtered.map((member) => (
                <div key={member.id} className="group flex items-center justify-between p-3 rounded-2xl bg-muted/10 border border-border/50 hover:bg-muted/20 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{member.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{member.email}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[11px] font-bold text-foreground/80">{member.role}</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Shield size={10} /> {member.access}
                            </span>
                        </div>
                        <button className="p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all active:scale-90 opacity-0 group-hover:opacity-100">
                             <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
            {filtered.length === 0 && (
                <p className="text-center py-10 text-sm text-muted-foreground italic">No members found matching your search.</p>
            )}
        </div>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <p>Folders can be shared with individual team members or entire departments.</p>
            <button className="text-blue-500 font-bold hover:underline">Manage Permissions</button>
        </div>
      </div>
    </DashboardModal>
  );
};
