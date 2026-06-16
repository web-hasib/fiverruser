import React from "react";
import { cn } from "@/src/lib/utils";

interface TokenUsageBarProps {
    used: number;
    limit: number;
    className?: string;
}

function getBarColor(pct: number): string {
    if (pct >= 80) return "bg-red-500";
    if (pct >= 60) return "bg-amber-400";
    return "bg-green-500";
}

function formatNumber(n: number): string {
    return n.toLocaleString();
}

export default function TokenUsageBar({
    used,
    limit,
    className,
}: TokenUsageBarProps) {
    const pct = limit > 0 ? Math.min(Math.round((used / limit) * 100), 100) : 0;
    const barColor = getBarColor(pct);

    return (
        <div className={cn("flex flex-col gap-1 min-w-[140px]", className)}>
            <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
                {/* Background track */}
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                        className={cn("h-full rounded-full transition-all", barColor)}
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <span
                    className={cn(
                        "font-semibold text-xs shrink-0",
                        pct >= 80 ? "text-red-500" : pct >= 60 ? "text-amber-500" : "text-green-500"
                    )}
                >
                    {pct}%
                </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
                {formatNumber(used)} / {formatNumber(limit)}
            </span>
        </div>
    );
}
