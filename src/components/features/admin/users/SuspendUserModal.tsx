"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";

export interface SuspendUserModalProps {
    open: boolean;
    userName: string;
    onClose: () => void;
    onConfirm: (data: {
        type: "temporary" | "permanent" | "soft";
        duration?: string;
        reason: string;
    }) => void;
}

const DURATION_OPTIONS = ["1 day", "3 days", "7 days", "14 days", "30 days", "90 days"];

type SuspendType = "temporary" | "permanent" | "soft";

function RadioOption({
    label,
    selected,
    onClick,
    extra,
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
    extra?: React.ReactNode;
}) {
    return (
        <label
            onClick={onClick}
            className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-colors",
                selected ? "border-blue-500 bg-blue-500/5" : "border-border bg-muted/30 hover:border-muted-foreground/40"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn("size-4 rounded-full border-2 flex items-center justify-center", selected ? "border-blue-500" : "border-muted-foreground")}>
                    {selected && <div className="size-2 rounded-full bg-blue-500" />}
                </div>
                <span className="text-sm text-foreground">{label}</span>
            </div>
            {extra}
        </label>
    );
}

export default function SuspendUserModal({ open, userName, onClose, onConfirm }: SuspendUserModalProps) {
    const [type, setType] = useState<SuspendType>("temporary");
    const [duration, setDuration] = useState("7 days");
    const [reason, setReason] = useState("");

    const handleConfirm = () => {
        onConfirm({ type, duration: type === "temporary" ? duration : undefined, reason });
        setReason("");
        setType("temporary");
        onClose();
    };

    const handleClose = () => {
        setReason("");
        setType("temporary");
        onClose();
    };

    return (
        <DashboardModal
            isOpen={open}
            onClose={handleClose}
            title={`Suspend User — ${userName}`}
            maxWidth="sm:max-w-[480px]"
        >
            <div className="space-y-4">
                {/* Type selection */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                        Suspend Type <span className="text-red-500">*</span>
                    </p>
                    <RadioOption
                        label="Temporary"
                        selected={type === "temporary"}
                        onClick={() => setType("temporary")}
                        extra={
                            type === "temporary" ? (
                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="appearance-none bg-transparent text-foreground text-sm pr-5 focus:outline-none cursor-pointer"
                                    >
                                        {DURATION_OPTIONS.map((d) => (
                                            <option key={d} value={d} className="bg-card">{d}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 size-3 pointer-events-none text-muted-foreground" />
                                </div>
                            ) : null
                        }
                    />
                    <RadioOption label="Permanent" selected={type === "permanent"} onClick={() => setType("permanent")} />
                    <RadioOption label="Soft Suspension" selected={type === "soft"} onClick={() => setType("soft")} />
                </div>

                {/* Reason */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                        Reason for Suspension <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please provide a reason for suspending this user..."
                        rows={4}
                        className={cn(
                            "w-full bg-background border border-border rounded-lg px-3 py-2.5",
                            "text-sm text-foreground placeholder:text-muted-foreground/60",
                            "resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50"
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
                        disabled={!reason.trim()}
                        className="bg-red-600 hover:bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Suspend User
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
