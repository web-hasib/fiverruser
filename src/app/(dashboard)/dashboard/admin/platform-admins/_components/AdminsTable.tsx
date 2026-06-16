"use client";

import React, { useMemo } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { PlatformAdmin } from "../_constants";

interface AdminsTableProps {
  data: PlatformAdmin[];
  onEdit: (admin: PlatformAdmin) => void;
  onDelete: (admin: PlatformAdmin) => void;
}

export function AdminsTable({ data, onEdit, onDelete }: AdminsTableProps) {
  const columns = useMemo<ColumnDef<PlatformAdmin>[]>(
    () => [
      {
        header: "User Name",
        cell: (item) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tight shrink-0">
              {item.initials}
            </div>
            <span className="text-sm font-bold text-foreground whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ),
      },
      {
        header: "Email",
        cell: (item) => (
          <span className="text-sm font-medium text-muted-foreground">
            {item.email}
          </span>
        ),
      },
      {
        header: "Last Login",
        cell: (item) => (
          <span className="text-sm font-medium text-muted-foreground">
            {item.lastLogin}
          </span>
        ),
      },
      {
        header: "Status",
        cell: (item) => (
          <span
            className={cn(
              "inline-flex items-center px-4 py-1 rounded-full text-[11px] font-bold border",
              item.status === "Active"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-slate-500/10 text-slate-400 border-slate-500/30"
            )}
          >
            {item.status}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: (item) => (
          <div className="flex items-center gap-3 justify-end pr-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(item)}
              className="border-2 border-primary text-primary-foreground cursor-pointer"
            >
              <Edit2 size={13} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(item)}
              className="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-red-500 cursor-pointer"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <DataTable columns={columns} data={data} className="border-none bg-transparent" />
    </div>
  );
}
