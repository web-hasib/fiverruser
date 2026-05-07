"use client";

import React from "react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { Eye, Copy, Edit2, Trash2 } from "lucide-react";
import { Assistant } from "@/src/types/assistant";

interface AssistantsTableProps {
  assistants: Assistant[];
  onView: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare?: (id: string) => void;
}

export const AssistantsTable = ({
  assistants,
  onView,
  onDuplicate,
  onEdit,
  onDelete,
}: AssistantsTableProps) => {
  const columns: ColumnDef<Assistant>[] = [
    {
      header: "Community Prompts Name",
      cell: (item) => (
        <span className="font-medium text-foreground max-w-[400px] truncate block opacity-80 hover:opacity-100 transition-opacity">
          {item.name}
        </span>
      ),
    },
    { header: "Last Edited", accessorKey: "lastEdited" },
    { header: "Last Used", accessorKey: "lastUsed" },
    { header: "Creator", accessorKey: "creator" },
    { header: "Visibility", accessorKey: "visibility" },
    {
      header: "Action",
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
            onClick={() => onView(item.id)}
            title="View Assistant"
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
            onClick={() => onDuplicate(item.id)}
            title="Duplicate Assistant"
          >
            <Copy className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
            onClick={() => onEdit(item.id)}
            title="Edit Assistant"
          >
            <Edit2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(item.id)}
            title="Delete Assistant"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
      <DataTable
        columns={columns}
        data={assistants}
        className="border-none bg-transparent"
      />
    </div>
  );
};
