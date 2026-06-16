import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Checkbox } from "@/src/components/ui/checkbox";
import { PencilLine, Star, Trash2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { AssistantLibraryRecord } from "./assistantLibraryDummyData";

interface AssistantLibraryTableProps {
  assistants: AssistantLibraryRecord[];
  selectedIds: string[];
  onToggleRow: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onEdit?: (assistant: AssistantLibraryRecord) => void;
  onToggleFeatured?: (assistant: AssistantLibraryRecord) => void;
  onDelete?: (assistant: AssistantLibraryRecord) => void;
}

export default function AssistantLibraryTable({
  assistants,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onEdit,
  onToggleFeatured,
  onDelete,
}: AssistantLibraryTableProps) {
  const allSelected = assistants.length > 0 && assistants.every((row) => selectedIds.includes(row.id));

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-background/70">
          <TableRow className="hover:bg-transparent border-border/60">
            <TableHead className="w-10 px-3 py-3">
              <Checkbox checked={allSelected} onCheckedChange={(checked) => onToggleAll(Boolean(checked))} />
            </TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Assistant / Letter</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Type</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Documentum</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Clinical Role</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Author</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Language</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Uses</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Visibility</TableHead>
            <TableHead className="px-3 py-3 text-sm font-medium text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assistants.length > 0 ? (
            assistants.map((item) => (
              <TableRow key={item.id} className="border-border/50 hover:bg-background/60 transition-colors">
                <TableCell className="px-3 py-3">
                  <Checkbox checked={selectedIds.includes(item.id)} onCheckedChange={() => onToggleRow(item.id)} />
                </TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.name}</TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.type}</TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.document}</TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.clinicalRole}</TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.author}</TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.language}</TableCell>
                <TableCell className="px-3 py-3 text-sm text-foreground">{item.uses}</TableCell>
                <TableCell className="px-3 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-md px-2 py-1 text-xs",
                      item.visibility === "Private" && "bg-red-500/15 text-red-400",
                      item.visibility === "Public" && "bg-emerald-500/15 text-emerald-400",
                      item.visibility === "Shared with Team" && "bg-blue-500/15 text-blue-400",
                    )}
                  >
                    {item.visibility}
                  </span>
                </TableCell>
                <TableCell className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit?.(item)}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-foreground hover:bg-accent"
                    >
                      <PencilLine className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => onToggleFeatured?.(item)}
                      className={cn(
                        "rounded-md border p-1.5",
                        item.featured ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400" : "border-amber-500/40 bg-amber-500/10 text-amber-400",
                      )}
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete?.(item)}
                      className="rounded-md border border-red-500/40 bg-red-500/10 p-1.5 text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="py-10 text-center text-muted-foreground">
                No assistants found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
