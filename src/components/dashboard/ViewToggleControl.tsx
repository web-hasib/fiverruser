"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";

export type ViewType = "list" | "grid";

interface ViewToggleControlProps {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
  activePath: "patients" | "members";
  sharedFolderId: string;
}

export function ViewToggleControl({ viewType, setViewType, activePath, sharedFolderId }: ViewToggleControlProps) {
  const router = useRouter();

  return (
    <div className="flex items-center p-1 bg-muted/20 border border-border/50 rounded-xl gap-1 ml-auto">
      {/* List/Grid Toggle */}
      <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-border/50">
        <button
          onClick={() => setViewType("list")}
          className={cn(
            "p-2 rounded-lg transition-all",
            viewType === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <List className="size-4" />
        </button>
        <button
          onClick={() => setViewType("grid")}
          className={cn(
            "p-2 rounded-lg transition-all",
            viewType === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutGrid className="size-4" />
        </button>
      </div>

      {/* Navigation Toggle */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => router.push(`/dashboard/user/patients/shared/${sharedFolderId}`)}
          className={cn(
            "px-4 py-2 text-[11px] font-bold rounded-lg transition-all",
            activePath === "patients" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Patients
        </button>
        <button
          onClick={() => router.push(`/dashboard/user/patients/shared/${sharedFolderId}/members`)}
          className={cn(
            "px-4 py-2 text-[11px] font-bold rounded-lg transition-all",
            activePath === "members" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Member
        </button>
      </div>
    </div>
  );
}
