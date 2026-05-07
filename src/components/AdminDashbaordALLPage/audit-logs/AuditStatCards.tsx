import React from "react";
import { cn } from "@/src/lib/utils";
import { Activity, Users, Cpu, ShieldAlert } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    accent?: string;
    trend?: string;
    trendUp?: boolean;
}

function StatCard({ label, value, icon, accent, trend, trendUp }: StatCardProps) {
    return (
        <div className="bg-card border border-border p-5 flex flex-col gap-3 min-w-0 relative overflow-hidden group hover:border-amber-500/20 transition-colors">
            {/* Subtle glow in corner */}
            <div
                className={cn(
                    "absolute -top-6 -right-6 size-20 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity",
                    accent ?? "bg-amber-400"
                )}
            />

            <div className="flex items-start justify-between">
                <div className={cn("p-2 border", accent ? `border-current/20` : "border-border")}>
                    <div className={cn("size-4", accent ?? "text-amber-400")}>
                        {icon}
                    </div>
                </div>
                {trend && (
                    <span
                        className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 border",
                            trendUp
                                ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                                : "text-red-400 border-red-500/30 bg-red-500/10"
                        )}
                    >
                        {trendUp ? "▲" : "▼"} {trend}
                    </span>
                )}
            </div>

            <div>
                <span className="text-2xl font-bold text-foreground tracking-tight">
                    {typeof value === "number" ? value.toLocaleString() : value}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
        </div>
    );
}

interface AuditStatCardsProps {
    totalEvents?: number;
    activeUsers?: number;
    aiGenerations?: number;
    securityFlags?: number;
}

export default function AuditStatCards({
    totalEvents = 1247,
    activeUsers = 847,
    aiGenerations = 3891,
    securityFlags = 2,
}: AuditStatCardsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                label="Total Events (Today)"
                value={totalEvents}
                icon={<Activity className="size-4 text-amber-400" />}
                accent="bg-amber-400"
                trend="12%"
                trendUp
            />
            <StatCard
                label="Active Users"
                value={activeUsers}
                icon={<Users className="size-4 text-blue-400" />}
                accent="bg-blue-400"
                trend="4%"
                trendUp
            />
            <StatCard
                label="AI Generations"
                value={aiGenerations}
                icon={<Cpu className="size-4 text-purple-400" />}
                accent="bg-purple-400"
                trend="8%"
                trendUp
            />
            <StatCard
                label="Security Flags"
                value={securityFlags}
                icon={<ShieldAlert className="size-4 text-red-400" />}
                accent="bg-red-400"
                trend="2"
                trendUp={false}
            />
        </div>
    );
}
