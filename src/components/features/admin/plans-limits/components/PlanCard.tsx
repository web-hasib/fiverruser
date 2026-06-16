"use client";

import React from "react";
import { Check, Pencil } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Feature {
    text: string;
}

interface PlanCardProps {
    title: string;
    target: string;
    price: string;
    buttonText: string;
    features: {
        category: string;
        items: Feature[];
    }[];
    variant?: "blue" | "default";
    onAction?: () => void;
    onEdit?: () => void;
}

export const PlanCard = ({
    title,
    target,
    price,
    buttonText,
    features,
    variant = "default",
    onAction,
    onEdit,
}: PlanCardProps) => {
    return (
        <div className="border border-border rounded-xl flex flex-col h-full overflow-hidden relative group">
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="text-xs">
                            <span className="font-semibold opacity-80">Target:</span> {target}
                        </p>
                    </div>
                  
                </div>

                <div className="flex items-baseline gap-1">
                    <span className={cn(
                        "text-4xl font-black",
                        variant === "blue" && "text-blue-500"
                    )}>
                        {price}
                    </span>
                    <span className="text-sm">/ Monthly</span>
                </div>
                    {onEdit && (
                <button
                      onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm"
                >
                    {buttonText}
                </button>
                    )}
            </div>

            <div className="p-6 flex-1 space-y-6">
                {features.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h4 className="text-sm font-semibold opacity-70">{section.category}</h4>
                        <ul className="space-y-3">
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex gap-3 text-sm">
                                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border border-border flex items-center justify-center">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
