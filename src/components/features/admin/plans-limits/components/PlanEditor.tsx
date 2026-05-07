"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PlanEditorProps {
    initialData?: any;
    onSave?: (data: any) => void;
    onCancel?: () => void;
}

const FEATURE_CATEGORIES = [
    {
        name: "Core Access",
        features: [
            "Web app access",
            "Core AI writing",
            "Built-in community prompt",
            "Personal templates",
            "Limited tasks",
            "Limited patient/case retention",
        ],
    },
    {
        name: "Default Limits (Admin adjustable)",
        features: [
            "Per-seat: 3M-10M / user / month OR Pooled workspace tokens",
            "Tokens: 200k – 500k / user / month",
            "Tokens: 2M – 5M / user / month",
            "Tasks: Unlimited + assignment",
            "Tasks: Unlimited (fair use)",
            "Tasks: 10–25 active",
            "Retention: Long / indefinite (workspace policy)",
            "Retention: 180–365 days OR manual delete",
            "Retention: 30 days",
            "Templates: Unlimited personal",
            "Sharing: Enabled (permission-based)",
            "Sharing: Optional (off by default)",
            "Sharing: Disabled",
        ],
    },
    {
        name: "Includes everything in Free +",
        features: [
            "Full template library",
            "Workspace collaboration",
            "Higher token allowance",
            "Team admin controls",
            "Unlimited tasks",
            "Audit logs",
            "Long retention",
            "Patient & case sharing",
        ],
    },
];

export const PlanEditor = ({ initialData, onSave, onCancel }: PlanEditorProps) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || "Tap to Plan Name",
        target: initialData?.target || "Tap to Set Target Title",
        price: initialData?.price || "00.00",
        selectedFeatures: initialData?.selectedFeatures || [],
    });

    const toggleFeature = (feature: string) => {
        setFormData((prev) => {
            const isSelected = prev.selectedFeatures.includes(feature);
            if (isSelected) {
                return {
                    ...prev,
                    selectedFeatures: prev.selectedFeatures.filter((f: string) => f !== feature),
                };
            } else {
                return {
                    ...prev,
                    selectedFeatures: [...prev.selectedFeatures, feature],
                };
            }
        });
    };

    return (
        <div className="min-h-full flex flex-col">
            {/* Editor Header */}
            <div className="p-6 border-b border-border flex justify-between items-start">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">
                            {initialData ? `Edit ${initialData.name}` : "Create New Plan"}
                        </h2>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-transparent border-none p-2 font-bold focus:ring-0 mb-1"
                                placeholder="Tap to Plan Name"
                            />
                            <div className="flex items-center gap-1 text-xs">
                                <span>Target:</span>
                                <input
                                    type="text"
                                    value={formData.target}
                                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                    className="bg-transparent border-none p-2 focus:ring-0 w-full"
                                    placeholder="Tap to Set Target Title"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                        <span className="text-blue-500 text-4xl font-black">$</span>
                        <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="bg-transparent border-none p-0 text-blue-500 text-4xl font-black w-24 focus:ring-0"
                        />
                        <span className="text-sm">/ Monthly</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-md bg-secondary hover:opacity-80 text-secondary-foreground text-sm font-medium transition-all"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => onSave?.(formData)}
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all"
                    >
                        {initialData ? "Update Plan" : "Save Plan"}
                    </button>
                </div>
            </div>

            {/* Feature Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-4 px-6 text-sm font-semibold">Featured List</th>
                            <th className="text-center py-4 px-6 text-sm font-semibold w-32">Check Mark</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {FEATURE_CATEGORIES.map((category) => (
                            <React.Fragment key={category.name}>
                                <tr>
                                    <td colSpan={2} className="py-4 px-6 text-sm font-bold text-blue-500">
                                        {category.name}
                                    </td>
                                </tr>
                                {category.features.map((feature) => (
                                    <tr key={feature} className="hover:opacity-80 transition-opacity">
                                        <td className="py-4 px-8 text-sm max-w-md">{feature}</td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => toggleFeature(feature)}
                                                className={cn(
                                                    "w-6 h-6 rounded border flex items-center justify-center transition-all mx-auto",
                                                    formData.selectedFeatures.includes(feature)
                                                        ? "bg-blue-600 border-blue-600 text-white"
                                                        : "bg-transparent border-blue-600/50 text-transparent"
                                                )}
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
