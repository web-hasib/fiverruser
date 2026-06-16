import React from "react";
import { cn } from "@/src/lib/utils";

interface StatCard {
    label: string;
    value: string | number;
    valueColor?: string;
}

interface UserStatCardsProps {
    totalUsers?: number;
    activeToday?: number;
    nearLimit?: number;
    suspended?: number;
}

function StatCard({ label, value, valueColor }: StatCard) {
    return (
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-1 min-w-0">
            <span
                className={cn(
                    "text-3xl font-bold tracking-tight",
                    valueColor ?? "text-foreground"
                )}
            >
                {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            <span className="text-sm text-muted-foreground">{label}</span>
        </div>
    );
}

export default function UserStatCards({
    totalUsers = 1247,
    activeToday = 847,
    nearLimit = 12,
    suspended = 2,
}: UserStatCardsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Users" value={totalUsers} />
            <StatCard label="Active Today" value={activeToday} />
            <StatCard
                label="Near Limit (80%)"
                value={nearLimit}
                valueColor="text-amber-500"
            />
            <StatCard
                label="Suspended"
                value={suspended}
                valueColor="text-red-500"
            />
        </div>
    );
}
