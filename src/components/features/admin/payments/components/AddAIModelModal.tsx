"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";

interface AIModelData {
    name: string;
    inputCost: string;
    outputCost: string;
    inputTokens: string;
    outputTokens: string;
}

interface AddAIModelModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: AIModelData) => void;
    initialData?: AIModelData | null;
}

export default function AddAIModelModal({ open, onClose, onSave, initialData }: AddAIModelModalProps) {
    const [form, setForm] = useState<AIModelData>({
        name: "",
        inputCost: "",
        outputCost: "",
        inputTokens: "",
        outputTokens: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm({
                name: "",
                inputCost: "",
                outputCost: "",
                inputTokens: "",
                outputTokens: "",
            });
        }
    }, [initialData, open]);

    const handleSave = () => {
        onSave(form);
        onClose();
    };

    return (
        <DashboardModal
            isOpen={open}
            onClose={onClose}
            title={initialData ? "Edit AI Model" : "Add AI Model"}
            maxWidth="sm:max-w-[600px]"
        >
            <div className="space-y-6 pt-2">
                <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                        Model Name
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Claude-sonnet-4-6"
                        className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-muted-foreground/50 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Input Cost / 1K Tokens ($)
                        </label>
                        <input
                            type="text"
                            value={form.inputCost}
                            onChange={(e) => setForm({ ...form, inputCost: e.target.value })}
                            placeholder="0.0030"
                            className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Output Cost / 1K Tokens ($)
                        </label>
                        <input
                            type="text"
                            value={form.outputCost}
                            onChange={(e) => setForm({ ...form, outputCost: e.target.value })}
                            placeholder="0.0030"
                            className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Input Tokens (month)
                        </label>
                        <input
                            type="text"
                            value={form.inputTokens}
                            onChange={(e) => setForm({ ...form, inputTokens: e.target.value })}
                            placeholder="1000000"
                            className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Output Tokens (month)
                        </label>
                        <input
                            type="text"
                            value={form.outputTokens}
                            onChange={(e) => setForm({ ...form, outputTokens: e.target.value })}
                            placeholder="400000"
                            className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="bg-card hover:bg-muted text-foreground border-none h-11 px-6 rounded-lg font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-500 text-white h-11 px-6 rounded-lg font-semibold"
                    >
                        {initialData ? "SAVE MODEL" : "SAVE MODEL"}
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
