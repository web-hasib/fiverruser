"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { PlatformAdmin } from "../_constants";

interface DeletePlatformAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: PlatformAdmin | null;
  onConfirm?: (admin: PlatformAdmin) => void;
}

export function DeletePlatformAdminModal({
  isOpen,
  onClose,
  admin,
  onConfirm,
}: DeletePlatformAdminModalProps) {
  const [confirmText, setConfirmText] = useState("");

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  const handleDelete = () => {
    if (confirmText !== "DELETE" || !admin) return;
    onConfirm?.(admin);
    handleClose();
  };

  const isConfirmed = confirmText === "DELETE";

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Platform Admin"
      maxWidth="sm:max-w-[700px]"
    >
      <div className="space-y-5">

        {/* Warning banner */}
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="size-4 shrink-0" />
            <span className="text-sm font-bold">This action cannot be undone.</span>
          </div>
          <p className="text-sm text-foreground/70 pl-6">
            You are about to permanently delete{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{admin?.name ?? "this platform admin"}&rdquo;
            </span>
          </p>
        </div>

        {/* Confirm input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">
            Type <span className="font-black text-foreground tracking-widest">DELETE</span> to confirm
          </label>
          <input
            type="text"
            placeholder="Type here"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDelete()}
            className="w-full h-12 px-4 mt-2 rounded-xl border text-sm transition-all focus:outline-none bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/40 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="bg-background hover:bg-muted text-foreground border border-border h-11 px-6 transition-all"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleDelete}
            disabled={!isConfirmed}
            className="h-11 px-6 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-widest shadow-lg shadow-rose-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Delete
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
}
