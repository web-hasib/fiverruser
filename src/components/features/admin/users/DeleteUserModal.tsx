"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";

interface DeleteUserModalProps {
    open: boolean;
    userName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteUserModal({ open, userName, onClose, onConfirm }: DeleteUserModalProps) {
    const [confirmText, setConfirmText] = useState("");
    const canDelete = confirmText === "DELETE";

    const handleConfirm = () => {
        if (!canDelete) return;
        onConfirm();
        setConfirmText("");
        onClose();
    };

    const handleClose = () => {
        setConfirmText("");
        onClose();
    };

    return (
        <DashboardModal
            isOpen={open}
            onClose={handleClose}
            title="Delete User"
            maxWidth="sm:max-w-[420px]"
        >
            <div className="space-y-4">
                {/* Warning */}
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                    <AlertTriangle className="size-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-0.5">
                        <p className="font-semibold text-red-400">This action cannot be undone.</p>
                        <p className="text-muted-foreground">
                            You are about to permanently delete &ldquo;{userName}&rdquo;
                        </p>
                    </div>
                </div>

                {/* Confirm input */}
                <div className="space-y-2">
                    <label className="block text-xs font-medium text-foreground">
                        Type <span className="font-bold text-red-400">DELETE</span> to confirm
                    </label>
                    <input
                        type="text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder="Type here"
                        className={cn(
                            "w-full bg-background border border-border text-foreground text-sm",
                            "rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-red-500/50",
                            "placeholder:text-muted-foreground/50 transition-colors"
                        )}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-1">
                    <Button variant="ghost" onClick={handleClose} className="border border-border text-foreground hover:bg-muted">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!canDelete}
                        className="bg-red-600 hover:bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        DELETE
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
