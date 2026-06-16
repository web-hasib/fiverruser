"use client";

import React, { useState } from "react";
import { X, Ban } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface AdjustTeamTokenModalProps {
    open: boolean;
    teamName: string;
    currentUsage: number; // in raw number, will display as "XM tokens"
    onClose: () => void;
    onConfirm: (newLimit: string) => void;
}

function formatTokenDisplay(raw: string): string {
    const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(n)) return "";
    if (n >= 1000) return `${(n / 1000).toFixed(0)}M`;
    return `${n}M`;
}

export default function AdjustTeamTokenModal({
    open,
    teamName,
    currentUsage,
    onClose,
    onConfirm,
}: AdjustTeamTokenModalProps) {
    const [newLimit, setNewLimit] = useState("");

    if (!open) return null;

    const formatted = newLimit
        ? `${formatTokenDisplay(newLimit)} tokens`
        : "";

    const handleConfirm = () => {
        if (!newLimit.trim()) return;
        onConfirm(newLimit);
        setNewLimit("");
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
                                Adjust Token Limit
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

                {/* Current Usage */}
                <div className="bg-muted/40 rounded-lg px-4 py-3 space-y-0.5">
                    <p className="text-xs text-muted-foreground">Current Usage</p>
                    <p className="text-2xl font-bold text-foreground">
                        {currentUsage}M tokens
                    </p>
                </div>

                {/* New Limit */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                        New Token Limit
                    </label>
                    <input
                        type="text"
                        value={newLimit}
                        onChange={(e) => setNewLimit(e.target.value)}
                        placeholder="100M"
                        className={cn(
                            "w-full bg-muted/40 border border-border rounded-lg px-3 py-2.5",
                            "text-sm text-foreground placeholder:text-muted-foreground",
                            "focus:outline-none focus:ring-1 focus:ring-ring"
                        )}
                    />
                    {formatted && (
                        <p className="text-xs text-blue-500">Formatted: {formatted}</p>
                    )}
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
                        disabled={!newLimit.trim()}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Update Limit
                    </button>
                </div>
            </div>
        </div>
    );
}
