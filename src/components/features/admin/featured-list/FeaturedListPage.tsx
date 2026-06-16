"use client";

import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeatureItem {
    id: string;
    text: string;
}

interface FeatureColumn {
    id: string;
    title: string;
    items: FeatureItem[];
}

// ─── Default data ─────────────────────────────────────────────────────────────
const DEFAULT_COLUMNS: FeatureColumn[] = [
    {
        id: "core-access",
        title: "Core Access",
        items: [
            { id: "ca-1", text: "Web app access" },
            { id: "ca-2", text: "Core AI writing" },
            { id: "ca-3", text: "Built-in community prompt" },
            { id: "ca-4", text: "Personal templates" },
            { id: "ca-5", text: "Limited tasks" },
            { id: "ca-6", text: "Limited patient/case retention" },
        ],
    },
    {
        id: "default-limits",
        title: "Default Limits (Admin adjustable)",
        items: [
            { id: "dl-1", text: "Per-seat: 3M–10M / user / month OR\nPooled workspace tokens" },
            { id: "dl-2", text: "Tokens: 200k – 500k / user / month" },
            { id: "dl-3", text: "Tokens: 2M – 5M / user / month" },
            { id: "dl-4", text: "Tasks: Unlimited + assignment" },
            { id: "dl-5", text: "Tasks: Unlimited (fair use)" },
            { id: "dl-6", text: "Tasks: 10–25 active" },
            { id: "dl-7", text: "Retention: Long / indefinite (workspace policy)" },
            { id: "dl-8", text: "Retention: 180–365 days OR manual delete" },
            { id: "dl-9", text: "Retention: 30 days" },
            { id: "dl-10", text: "Templates: Unlimited personal" },
            { id: "dl-11", text: "Sharing: Enabled (permission-based)" },
            { id: "dl-12", text: "Sharing: Optional (off by default)" },
            { id: "dl-13", text: "Sharing: Disabled" },
        ],
    },
    {
        id: "free-plus",
        title: "Includes everything in Free +",
        items: [
            { id: "fp-1", text: "Full template library" },
            { id: "fp-2", text: "Workspace collaboration" },
            { id: "fp-3", text: "Higher token allowance" },
            { id: "fp-4", text: "Team admin controls" },
            { id: "fp-5", text: "Unlimited tasks" },
            { id: "fp-6", text: "Audit logs" },
            { id: "fp-7", text: "Long retention" },
            { id: "fp-8", text: "Patient & case sharing" },
        ],
    },
];

// ─── Single column component ──────────────────────────────────────────────────
interface ColumnProps {
    column: FeatureColumn;
    onSave: (colId: string, updatedItems: FeatureItem[]) => void;
}

function FeatureColumn({ column, onSave }: ColumnProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState<FeatureItem[]>(column.items);

    const startEdit = () => {
        setDraft(column.items.map((i) => ({ ...i }))); // fresh copy
        setEditing(true);
    };

    const cancelEdit = () => {
        setDraft(column.items.map((i) => ({ ...i })));
        setEditing(false);
    };

    const saveEdit = () => {
        onSave(column.id, draft);
        setEditing(false);
    };

    const updateItem = (id: string, text: string) => {
        setDraft((prev) =>
            prev.map((item) => (item.id === id ? { ...item, text } : item))
        );
    };

    return (
        <div className="flex flex-col gap-3 min-w-0">
            {/* Column header */}
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>

                {editing ? (
                    <div className="flex items-center gap-1">
                        <button
                            onClick={saveEdit}
                            className="p-1 rounded text-green-500 hover:bg-green-500/10 transition-colors"
                            title="Save changes"
                        >
                            <Check className="size-3.5" />
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="p-1 rounded text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Cancel"
                        >
                            <X className="size-3.5" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={startEdit}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="Edit items"
                    >
                        <Pencil className="size-3.5" />
                    </button>
                )}
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2">
                {(editing ? draft : column.items).map((item, idx) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex items-start gap-3 px-4 py-3 rounded-lg border border-border",
                            "bg-card transition-colors",
                            editing && "border-ring/50"
                        )}
                    >
                        <span className="text-sm text-muted-foreground shrink-0 mt-0.5 tabular-nums">
                            {idx + 1}.
                        </span>
                        {editing ? (
                            <textarea
                                value={item.text}
                                onChange={(e) => updateItem(item.id, e.target.value)}
                                rows={item.text.includes("\n") ? 2 : 1}
                                className={cn(
                                    "flex-1 bg-transparent text-sm text-foreground resize-none",
                                    "focus:outline-none focus:ring-0 leading-snug"
                                )}
                            />
                        ) : (
                            <span className="text-sm text-foreground leading-snug whitespace-pre-line">
                                {item.text}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturedListPage() {
    const [columns, setColumns] = useState<FeatureColumn[]>(DEFAULT_COLUMNS);

    const handleSave = (colId: string, updatedItems: FeatureItem[]) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === colId ? { ...col, items: updatedItems } : col
            )
        );
    };

    return (
        <DashboardMainContainer>
            <div className="p-6 space-y-6">
                {/* Page Title */}
                <h1 className="text-2xl font-bold text-foreground">Featured List</h1>

                {/* 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {columns.map((col) => (
                        <FeatureColumn key={col.id} column={col} onSave={handleSave} />
                    ))}
                </div>
            </div>
        </DashboardMainContainer>
    );
}
