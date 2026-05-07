"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";

interface DeleteAIModelModalProps {
    open: boolean;
    modelName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteAIModelModal({ open, modelName, onClose, onConfirm }: DeleteAIModelModalProps) {
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
            title="Delete AI Model"
            maxWidth="sm:max-w-[420px]"
        >
            <div className="space-y-4">
                {/* Warning Banner */}
                <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/30 rounded-lg px-4 py-3">
                    <AlertTriangle className="size-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-0.5">
                        <p className="font-bold text-rose-500 uppercase tracking-wider">This action cannot be undone.</p>
                        <p className="text-muted-foreground leading-relaxed">
                            You are about to permanently delete the AI model <span className="font-bold text-foreground">"{modelName}"</span>. This will stop all cost tracking for this model.
                        </p>
                    </div>
                </div>

                {/* Confirm input */}
                <div className="space-y-2">
                    <label className="block text-xs font-semibold text-foreground/80">
                        Type <span className="font-black text-rose-500">DELETE</span> to confirm
                    </label>
                    <input
                        type="text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder="Type here"
                        className={cn(
                            "w-full bg-background border border-border text-foreground text-sm",
                            "rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-rose-500/50",
                            "placeholder:text-muted-foreground/30 transition-all"
                        )}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                        variant="ghost"
                        onClick={handleClose}
                        className="bg-card hover:bg-muted border border-border text-foreground h-11 px-6 rounded-xl font-bold"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!canDelete}
                        className="bg-rose-600 hover:bg-rose-500 text-white h-11 px-8 rounded-xl font-bold shadow-lg shadow-rose-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        DELETE
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
