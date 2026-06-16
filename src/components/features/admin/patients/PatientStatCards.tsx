import React from "react";
import { cn } from "@/src/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    valueColor?: string;
}

function StatCard({ label, value, valueColor }: StatCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2 min-w-0">
            <span
                className={cn(
                    "text-4xl font-bold tracking-tight",
                    valueColor ?? "text-foreground"
                )}
            >
                {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            <span className="text-sm text-muted-foreground font-medium">{label}</span>
        </div>
    );
}

interface PatientStatCardsProps {
    totalPatients: number;
    activePatients: number;
    expiringSoon: number;
    expired: number;
}

export default function PatientStatCards({
    totalPatients,
    activePatients,
    expiringSoon,
    expired,
}: PatientStatCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Patients" value={totalPatients} />
            <StatCard label="Active Patient" value={activePatients} />
            <StatCard
                label="Expiring Soon"
                value={expiringSoon}
                valueColor="text-amber-500"
            />
            <StatCard
                label="Expired"
                value={expired}
                valueColor="text-red-500"
            />
        </div>
    );
}
