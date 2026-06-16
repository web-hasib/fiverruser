"use client";

import React, { useState } from "react";
import { mockAdminMembers, AdminAccessMember } from "@/src/types/settings";
import { Button } from "@/src/components/ui/button";
import { Plus, Edit2, Trash2, Shield, Eye, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const AdminAccessTab = () => {
  const [members, setMembers] = useState<AdminAccessMember[]>(mockAdminMembers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminAccessMember | null>(
    null,
  );

  const handleDelete = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">
            Admin Access Management
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage team permissions and token distribution
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} />
          Add Seats Access
        </Button>
      </div>

      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50 border-b border-border/50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-muted-foreground font-bold py-4">
                Admin
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-center">
                Role
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-center">
                Permissions
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-center">
                Granted By
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-center">
                Department
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-center">
                Last Activity
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 min-w-[150px]">
                Token Usage (Month)
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-center">
                IP Address
              </TableHead>
              <TableHead className="text-muted-foreground font-bold py-4 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.id}
                className="border-b border-border/40 hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-500 uppercase text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground text-sm leading-none flex items-center gap-1.5">
                        {member.name}
                        {member.accessLevel === "Full Access" && (
                          <Shield size={12} className="text-blue-500" />
                        )}
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-1">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      member.role.includes("Full Access") ||
                      member.role.includes("Super")
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    }`}
                  >
                    {member.role === "Super Admin"
                      ? "👑 Super Admin"
                      : member.role}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {member.permissions.map((p) => (
                      <span
                        key={p}
                        className="text-[11px] font-medium text-muted-foreground underline decoration-dotted underline-offset-2"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground/80">
                      {member.grantedBy}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {member.grantedAt}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-muted-foreground">
                  {member.department}
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-muted-foreground">
                  {member.lastActivity}
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5 min-w-[120px]">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-foreground/80">
                        {member.tokenUsage.toLocaleString()} /{" "}
                        {member.tokenTotal.toLocaleString()}
                      </span>
                      <span className="text-blue-500">
                        {Math.round(
                          (member.tokenUsage / member.tokenTotal) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.min(100, (member.tokenUsage / member.tokenTotal) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center text-xs font-mono text-muted-foreground opacity-60">
                  {member.ipAddress === "System" ? (
                    <span className="italic">System</span>
                  ) : (
                    member.ipAddress
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {member.ipAddress === "System" ? (
                    <span className="text-[10px] italic text-muted-foreground pr-4">
                      Cannot modify
                    </span>
                  ) : (
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Seat Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md bg-[#161821] border-border/40 p-8 rounded-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white flex items-center gap-2">
              Add Seats Access
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mt-1" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-foreground">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. Oncology Team, Emergency Department"
                className="bg-background border-border/40 h-12 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="example@gmail.com"
                  className="bg-background border-border/40 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">
                  Department
                </Label>
                <Select defaultValue="Doctor">
                  <SelectTrigger className="h-12 bg-background border-border/40 rounded-xl">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">
                  Available Token
                </Label>
                <div className="relative">
                  <Input
                    readOnly
                    value="10,000,000"
                    className="bg-background border-border/20 h-12 rounded-xl text-muted-foreground/50 cursor-default focus:ring-0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground/40 uppercase">
                    Not Editable
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">
                  Token Distribution <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="10,000"
                  className="bg-background border-border/40 h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold text-foreground">
                Access Level
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-blue-600 bg-blue-600/5 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all hover:bg-blue-600/10 group">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-4 border-blue-600 bg-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <span className="text-sm font-black text-white">
                      Full Access
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground group-hover:text-foreground/80">
                    Can view, edit, delete, manage users, workspaces, and all
                    content.
                  </p>
                </div>
                <div className="border border-border/40 bg-card/40 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all hover:border-blue-500/50 group">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-border/60 bg-transparent" />
                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">
                      View Only
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    Can view all data, audit logs, and reports but cannot make
                    any changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-8 flex sm:justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 h-12 rounded-xl font-bold border border-border/40 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button className="flex-[1.5] bg-blue-600 hover:bg-blue-700 text-white font-black h-12 rounded-xl shadow-lg shadow-blue-500/20">
              Grant Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Seat Modal */}
      <Dialog
        open={!!editingMember}
        onOpenChange={() => setEditingMember(null)}
      >
        <DialogContent className="max-w-md bg-[#161821] border-border/40 p-8 rounded-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white">
              Edit Admin Access
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-6">
            {editingMember && (
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-black text-blue-500 text-lg uppercase">
                  {editingMember.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="font-bold text-white leading-none">
                    {editingMember.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {editingMember.email}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">
                  Available Token
                </Label>
                <div className="relative">
                  <Input
                    readOnly
                    value="10,000,000"
                    className="bg-background border-border/20 h-12 rounded-xl text-muted-foreground/50 cursor-default focus:ring-0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground/40 uppercase">
                    Not Editable
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">
                  Token Distribution <span className="text-red-500">*</span>
                </Label>
                <Input
                  defaultValue={editingMember?.tokenUsage.toLocaleString()}
                  className="bg-background border-border/40 h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold text-foreground">
                Access Level
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border-2 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all ${
                    editingMember?.accessLevel === "Full Access"
                      ? "border-blue-600 bg-blue-600/5"
                      : "border-border/40 bg-card/40 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        editingMember?.accessLevel === "Full Access"
                          ? "border-4 border-blue-600 bg-white"
                          : "border border-border/60"
                      }`}
                    >
                      {editingMember?.accessLevel === "Full Access" && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-black ${editingMember?.accessLevel === "Full Access" ? "text-white" : "text-muted-foreground"}`}
                    >
                      Full Access
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    Can view, edit, delete, manage users, workspaces, and all
                    content.
                  </p>
                </div>
                <div
                  className={`border-2 rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all ${
                    editingMember?.accessLevel === "View Only"
                      ? "border-blue-600 bg-blue-600/5"
                      : "border-border/40 bg-card/40 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        editingMember?.accessLevel === "View Only"
                          ? "border-4 border-blue-600 bg-white"
                          : "border border-border/60"
                      }`}
                    >
                      {editingMember?.accessLevel === "View Only" && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-black ${editingMember?.accessLevel === "View Only" ? "text-white" : "text-muted-foreground"}`}
                    >
                      View Only
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    Can view all data, audit logs, and reports but cannot make
                    any changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-8 flex sm:justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setEditingMember(null)}
              className="flex-1 h-12 rounded-xl font-bold border border-border/40 hover:bg-white/5 text-muted-foreground"
            >
              Cancel
            </Button>
            <Button className="flex-[1.5] bg-blue-600 hover:bg-blue-700 text-white font-black h-12 rounded-xl shadow-lg shadow-blue-500/20">
              Update Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccessTab;
