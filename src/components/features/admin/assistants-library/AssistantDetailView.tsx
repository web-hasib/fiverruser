import React, { useState } from "react";
import { User, Stethoscope, Calendar, BarChart3, ChevronLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface InfoCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    iconBg: string;
    iconColor: string;
}

function InfoCard({ icon: Icon, label, value, iconBg, iconColor }: InfoCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
                <Icon className={cn("w-5 h-5", iconColor)} />
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
            </div>
        </div>
    );
}

interface AssistantDetailViewProps {
    assistant: {
        name: string;
        createdBy: string;
        specialty: string;
        lastEdited: string;
        uses: string;
        description: string;
        example: string;
        structure: string;
    };
    onBack: () => void;
}

export default function AssistantDetailView({
    assistant,
    onBack,
}: AssistantDetailViewProps) {
    const [activeTab, setActiveTab] = useState<"Example" | "Structure">("Example");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Library
                </button>
                <h1 className="text-3xl font-bold">{assistant.name}</h1>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <InfoCard
                    icon={User}
                    label="Created by"
                    value={assistant.createdBy}
                    iconBg="bg-red-500/10"
                    iconColor="text-red-500"
                />
                <InfoCard
                    icon={Stethoscope}
                    label="Specialty"
                    value={assistant.specialty}
                    iconBg="bg-blue-500/10"
                    iconColor="text-blue-500"
                />
                <InfoCard
                    icon={Calendar}
                    label="Last edited"
                    value={assistant.lastEdited}
                    iconBg="bg-amber-500/10"
                    iconColor="text-amber-500"
                />
                <InfoCard
                    icon={BarChart3}
                    label="Uses"
                    value={assistant.uses}
                    iconBg="bg-emerald-500/10"
                    iconColor="text-emerald-500"
                />
            </div>

            {/* About Section */}
            <div className="space-y-3">
                <h2 className="text-xl font-bold">About Community Prompts</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                    {assistant.description}
                </p>
            </div>

            {/* Content Area with Tabs */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-muted/30">
                    <span className="text-sm font-medium text-foreground/80">Referral to Psychiatry</span>
                    <div className="flex items-center bg-muted rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("Example")}
                            className={cn(
                                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                                activeTab === "Example" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Example
                        </button>
                        <div className="w-px h-4 bg-border mx-1" />
                        <button
                            onClick={() => setActiveTab("Structure")}
                            className={cn(
                                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                                activeTab === "Structure" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Structure
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <pre className="text-sm font-sans whitespace-pre-wrap leading-relaxed text-foreground/90 bg-muted/20 p-6 rounded-xl border border-border/50">
                        {activeTab === "Example" ? assistant.example : assistant.structure}
                    </pre>
                </div>
            </div>
        </div>
    );
}
