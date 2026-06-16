"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";

interface AddFeatureModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

const CATEGORIES = [
    "AI Scriber",
    "Patients & Tasks",
    "Assistants",
    "Export & Compliance",
    "Assistants & Calendar",
    "Knowledge & Export",
    "Knowledge & Calendar",
    "Compliance"
];

const PLANS = ["Free", "Starter", "Pro", "Team"];

export default function AddFeatureModal({ open, onClose, onSave }: AddFeatureModalProps) {
    const [featureName, setFeatureName] = useState("");
    const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
    const [category, setCategory] = useState("AI Scriber");

    const handleTogglePlan = (plan: string) => {
        setSelectedPlans((prev) =>
            prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
        );
    };

    const handleSave = () => {
        onSave({ featureName, selectedPlans, category });
        setFeatureName("");
        setSelectedPlans([]);
        setCategory("AI Scriber");
    };

    return (
        <DashboardModal
            isOpen={open}
            onClose={onClose}
            title="Add Feature"
            maxWidth="sm:max-w-[600px]"
        >
            <div className="space-y-6 pt-2">
                <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                        Feature Name
                    </label>
                    <input
                        type="text"
                        value={featureName}
                        onChange={(e) => setFeatureName(e.target.value)}
                        placeholder="e.g. Unlimited Session"
                        className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-muted-foreground/50 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                        Available in plans
                    </label>
                    <div className="flex flex-wrap items-center gap-6">
                        {PLANS.map((plan) => (
                            <label key={plan} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedPlans.includes(plan)}
                                    onChange={() => handleTogglePlan(plan)}
                                    className="w-4 h-4 rounded border-border bg-background focus:ring-blue-500 focus:ring-offset-background text-blue-600"
                                />
                                <span className="text-sm font-medium text-foreground">
                                    {plan}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                        Select Category to add
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-background border border-border text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer appearance-none transition-colors"
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
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
                        ADD FEATURE
                    </Button>
                </div>
            </div>
        </DashboardModal>
    );
}
