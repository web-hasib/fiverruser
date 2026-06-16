import React, { useState } from "react";
import { X, Ban } from "lucide-react";

interface RejectAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    assistantName: string;
    userName: string;
}

export default function RejectAssistantModal({
    isOpen,
    onClose,
    onConfirm,
    assistantName,
    userName,
}: RejectAssistantModalProps) {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between p-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                            <Ban className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-foreground">Rejected Assistance</h3>
                            <p className="text-sm text-muted-foreground">{userName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                            Reason for Suspension <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please provide a reason for suspending this user..."
                            className="w-full h-32 bg-muted/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/50 resize-none transition-all"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 p-6 pt-0">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border font-semibold hover:bg-muted transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(reason)}
                        disabled={!reason.trim()}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/20"
                    >
                        Suspend User
                    </button>
                </div>
            </div>
        </div>
    );
}
