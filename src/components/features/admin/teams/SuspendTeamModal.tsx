"use client";

import React, { useState } from "react";
import { X, Ban } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface SuspendTeamModalProps {
    open: boolean;
    teamName: string;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export default function SuspendTeamModal({
    open,
    teamName,
    onClose,
    onConfirm,
}: SuspendTeamModalProps) {
    const [reason, setReason] = useState("");

    if (!open) return null;

    const handleConfirm = () => {
        if (!reason.trim()) return;
        onConfirm(reason);
        setReason("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-red-500/10 shrink-0">
                            <Ban className="size-5 text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Suspend Team
                            </h2>
                            <p className="text-sm text-muted-foreground">{teamName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors mt-0.5"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Reason */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                        Reason for Suspension <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please provide a reason for suspending this user..."
                        rows={5}
                        className={cn(
                            "w-full bg-muted/40 border border-border rounded-lg px-3 py-2.5",
                            "text-sm text-foreground placeholder:text-muted-foreground",
                            "resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                        )}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!reason.trim()}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Suspend Team
                    </button>
                </div>
            </div>
        </div>
    );
}
