"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
function ToggleSwitch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent",
                "transition-colors duration-200 focus:outline-none",
                checked ? "bg-blue-600" : "bg-muted"
            )}
        >
            <span
                className={cn(
                    "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow",
                    "transform transition-transform duration-200",
                    checked ? "translate-x-4" : "translate-x-0"
                )}
            />
        </button>
    );
}

// ─── Feature data ──────────────────────────────────────────────────────────────
interface Feature {
    id: string;
    title: string;
    description: string;
    defaultEnabled: boolean;
}

const FEATURES: Feature[] = [
    {
        id: "community-menu",
        title: "Community Menu",
        description: "Show/hide the Community section in the main navigation menu",
        defaultEnabled: false,
    },
    {
        id: "subscription-visibility",
        title: "Subscription Visibility",
        description: "Display subscription plan information on the dashboard",
        defaultEnabled: false,
    },
    {
        id: "upgrade-cta",
        title: "Upgrade CTA",
        description: "Show upgrade call-to-action banners for Free plan users",
        defaultEnabled: false,
    },
    {
        id: "export",
        title: "Export",
        description: "Allow export of patient records",
        defaultEnabled: true,
    },
    {
        id: "shared-patient-folders",
        title: "Shared Patient Folders",
        description: "Enable team collaboration through shared patient folders",
        defaultEnabled: false,
    },
    {
        id: "patient-sharing",
        title: "Patient Sharing",
        description: "Allow users to share individual patient records with team members",
        defaultEnabled: false,
    },
    {
        id: "audit-logging",
        title: "Audit Logging",
        description: "Admin Show detailed audit logs for all user actions",
        defaultEnabled: true,
    },
];

// ─── Toggle Card ───────────────────────────────────────────────────────────────
function ToggleCard({
    feature,
    enabled,
    onChange,
}: {
    feature: Feature;
    enabled: boolean;
    onChange: (id: string, v: boolean) => void;
}) {
    return (
        <div className="bg-card border border-border rounded-xl px-4 py-4 flex items-start justify-between gap-3 hover:border-border/80 transition-colors">
            <div className="flex flex-col gap-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-snug">
                    {feature.description}
                </p>
            </div>
            <div className="shrink-0 mt-0.5">
                <ToggleSwitch
                    checked={enabled}
                    onChange={(v) => onChange(feature.id, v)}
                />
            </div>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function FeatureTogglesPage() {
    const [states, setStates] = useState<Record<string, boolean>>(
        Object.fromEntries(FEATURES.map((f) => [f.id, f.defaultEnabled]))
    );

    const handleChange = (id: string, value: boolean) => {
        setStates((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <DashboardMainContainer>
            <div className="p-6 space-y-6">
                {/* Title */}
                <h1 className="text-2xl font-bold text-foreground">Feature Toggles</h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {FEATURES.map((feature) => (
                        <ToggleCard
                            key={feature.id}
                            feature={feature}
                            enabled={states[feature.id]}
                            onChange={handleChange}
                        />
                    ))}
                </div>
            </div>
        </DashboardMainContainer>
    );
}
