"use client";

import React, { useState } from "react";
import { Plus, Zap, Trophy } from "lucide-react";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import AddFeatureModal from "./components/AddFeatureModal";
import { Switch } from "@/src/components/ui/switch";

const PLANS = [
    {
        id: "free",
        name: "Free",
        price: "$0/mo",
        icon: <div className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">FREE</div>,
        color: "text-blue-400",
        limits: {
            tokens: "50000",
            sessions: "5",
            assistants: "1",
            storage: "1 GB",
            autoDelete: "30",
            extraCost: "0.001",
        },
        featureCategories: [
            {
                title: "AI SCRIBER",
                items: ["Max 20 min / session", "30 sessions / month"],
            },
            {
                title: "PATIENTS & TASKS",
                items: ["Up to 60 patient profiles", "Personal tasks only"],
            },
            {
                title: "ASSISTANTS",
                items: ["24+ community assistants", "3 custom assistants"],
            },
            {
                title: "EXPORT & COMPLIANCE",
                items: ["PDF only - 5/month", "GDPR baseline"],
            },
        ],
        totalFeatures: 7,
    },
    {
        id: "starter",
        name: "Starter",
        price: "$19/mo",
        icon: <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
        color: "text-blue-400",
        limits: {
            tokens: "50000",
            sessions: "5",
            assistants: "1",
            storage: "1 GB",
            autoDelete: "30",
            extraCost: "0.001",
        },
        everythingText: "Everything in Free, plus",
        everythingItems: [
            "Unlimited sessions - 60 min max",
            "Unlimited patients & cases",
            "90-day session retention"
        ],
        featureCategories: [
            {
                title: "ASSISTANTS & CALENDAR",
                items: ["15 custom assistants", "Google Calendar & Outlook sync", "Patient booking link"],
            },
            {
                title: "KNOWLEDGE & EXPORT",
                items: ["Personal KB - 500 MB", "PDF + DOCX + JSON - no watermark", "Signed BAA / DPA"],
            },
        ],
        totalFeatures: 10,
    },
    {
        id: "pro",
        name: "Pro",
        price: "$49/mo",
        icon: <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
        color: "text-yellow-500",
        limits: {
            tokens: "5000000",
            sessions: "Unlimited",
            assistants: "10",
            storage: "20 GB",
            autoDelete: "90",
            extraCost: "0.001",
        },
        everythingText: "Everything in Starter, plus",
        everythingItems: [
            "Unlimited custom assistants",
            "Marketplace publish + import",
            "Flexible 90-day session retention"
        ],
        featureCategories: [
            {
                title: "KNOWLEDGE & EXPORT",
                items: ["Personal KB - 2 GB", "DOCX with own logo & signature"],
            },
            {
                title: "COMPLIANCE",
                items: ["24-month audit log", "Signed BAA / DPA", "Priority email support"],
            },
        ],
    },
    {
        id: "team",
        name: "Team",
        price: "/seat/mo",
        icon: <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
        color: "text-yellow-500",
        limits: {
            tokens: "Unlimited",
            sessions: "Unlimited",
            assistants: "Unlimited",
            storage: "Unlimited",
            autoDelete: "Never",
            extraCost: "0.001",
        },
        everythingText: "Everything in Pro, plus",
        everythingItems: [
            "Shared patient records & cases",
            "Role-based access: Admin / Editor / Viewer",
            "Collaborative task board"
        ],
        featureCategories: [
            {
                title: "KNOWLEDGE & CALENDAR",
                items: ["Team KB - 50 GB + version history", "Team heat-map & shared availability", "Assistant sharing scope selector"],
            },
            {
                title: "COMPLIANCE",
                items: ["24-month team audit log", "Custom data residency (EU)"],
            },
        ],
    },
];

export default function PlansLimitsPage() {
    const [isAnnually, setIsAnnually] = useState(false);
    const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);

    return (
        <DashboardMainContainer>
            <div className="min-h-full bg-background p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Plans Features & Limits</h1>
                        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
                            Set token limits, Session limits, and feature list per plan. Changes apply to all users on the plan immediately
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-medium ${!isAnnually ? "text-foreground" : "text-muted-foreground"}`}>
                                Monthly
                            </span>
                            <Switch
                                checked={isAnnually}
                                onCheckedChange={setIsAnnually}
                                className="data-[state=checked]:bg-blue-600 h-6 w-11"
                            />
                            <span className={`text-sm font-medium ${isAnnually ? "text-foreground" : "text-muted-foreground"}`}>
                                Annualy
                            </span>
                        </div>
                        <button
                            onClick={() => setIsAddFeatureModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            ADD FEATURE
                        </button>
                    </div>
                </div>

                {/* Top Limits Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {PLANS.map((plan) => (
                        <div key={`limits-${plan.id}`} className="bg-card/50 border border-border/50 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-8 h-8">{plan.icon}</div>
                                <div>
                                    <div className="text-foreground font-semibold">{plan.name}</div>
                                    <div className="text-xs text-muted-foreground">{plan.price}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <LimitBox icon="🧠" label="Token Limit/ month" value={plan.limits.tokens} />
                                <LimitBox icon="💼" label="Sessions/month" value={plan.limits.sessions} />
                                <LimitBox icon="🤖" label="Assistant slots" value={plan.limits.assistants} />
                                <LimitBox icon="📁" label="Storage limit" value={plan.limits.storage} />
                                <LimitBox icon="🗑️" label="Session Auto Delete (Days)" value={plan.limits.autoDelete} />
                                <LimitBox icon="🪙" label="Extra Cost Per Token" value={plan.limits.extraCost} showDollar />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature List Header */}
                <h2 className="text-xl font-bold text-foreground mb-6">Feature List</h2>

                {/* Bottom Feature List Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10">
                    {PLANS.map((plan) => (
                        <div key={`features-${plan.id}`} className="bg-card/50 border border-border/50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8">{plan.icon}</div>
                                    <div className="text-foreground font-semibold">{plan.name}</div>
                                </div>
                                {plan.totalFeatures && (
                                    <div className="text-sm text-muted-foreground">{plan.totalFeatures}</div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {plan.everythingText && (
                                    <div>
                                        <h3 className="text-xs font-bold text-foreground mb-3">{plan.everythingText}</h3>
                                        <ul className="space-y-2">
                                            {plan.everythingItems?.map((item, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="mt-0.5 text-muted-foreground">{idx + 1}.</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {plan.featureCategories.map((cat, i) => (
                                    <div key={i}>
                                        <h3 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">{cat.title}</h3>
                                        <ul className="space-y-2">
                                            {cat.items.map((item, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="mt-0.5 text-muted-foreground">{idx + 1}.</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <AddFeatureModal
                    open={isAddFeatureModalOpen}
                    onClose={() => setIsAddFeatureModalOpen(false)}
                    onSave={(data) => {
                        console.log("Saving feature:", data);
                        setIsAddFeatureModalOpen(false);
                    }}
                />
            </div>
        </DashboardMainContainer>
    );
}

function LimitBox({ icon, label, value, showDollar = false }: { icon: string; label: string; value: string; showDollar?: boolean }) {
    return (
        <div className="flex items-center justify-between bg-background/50 rounded-lg p-2.5">
            <div className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <div className="flex items-center gap-1">
                {showDollar && <span className="text-xs text-muted-foreground">$</span>}
                <input
                    type="text"
                    defaultValue={value}
                    className="w-20 bg-background border border-border/50 text-foreground text-xs text-right rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
            </div>
        </div>
    );
}
