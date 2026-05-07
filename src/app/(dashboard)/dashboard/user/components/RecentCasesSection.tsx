"use client";

import React, { useState } from "react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { Plus, Download, Trash2 } from "lucide-react";
import { SectionHeader } from "./DashboardUI";
import { CaseItem } from "../types";
import { recentCasesData } from "../data";
import Link from "next/link";
import { ConfirmModal } from "@/src/components/dashboard/ConfirmModal";

export const RecentCasesSection = () => {
  const [caseToDelete, setCaseToDelete] = useState<CaseItem | null>(null);

  const handleDeleteConfirm = () => {
    if (caseToDelete) {
      console.log("Deleting case:", caseToDelete.id);
      // Logic to delete the case would go here
    }
    setCaseToDelete(null);
  };

  const casesColumns: ColumnDef<CaseItem>[] = [
    {
      header: "Case ID",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded border-input cursor-pointer" />
          <Link href={`/dashboard/user/new/session/${item.id}`} className="text-xs font-mono text-primary-foreground hover:underline cursor-pointer">{item.id}</Link>
        </div>
      ),
    },
    { header: "Case Name", cell: (item) => <span className="text-xs font-medium text-foreground/80">{item.name}</span> },
    { header: "Date & Time", cell: (item) => <span className="text-[11px] text-muted-foreground font-mono">{item.date}</span> },
    {
      header: "Patient Name",
      cell: (item) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-foreground">{item.patient}</span>
          {item.dob !== "--" && <span className="text-[10px] text-muted-foreground uppercase whitespace-nowrap">DOB: {item.dob}</span>}
        </div>
      ),
    },
    {
      header: "Related Tasks",
      cell: (item) => (
        <div className="text-center">
          {item.tasks > 0 ? (
            <Button variant="outline" size="sm" className="h-7 text-[10px] border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-full">
              View {item.tasks} Tasks
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground/60 italic font-medium">N/A</span>
          )}
        </div>
      ),
    },
    {
        header: "Action",
        cell: (item) => (
          <div className="flex items-center justify-end gap-3 text-muted-foreground/60">
            <button 
              onClick={() => setCaseToDelete(item)}
              className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
    },
  ];

  return (
    <div className="xl:col-span-3 bg-card rounded-2xl">
      <SectionHeader 
        title="Recent Sessions" 
        className="px-4 pt-4"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">
              <Download size={14} /> EXPORT CSV
            </Button>
            <Button variant="primary" size="sm" className="h-8 text-[10px] font-bold px-3">
              <Plus size={14} /> NEW SESSION
            </Button>
          </div>
        } 
      />
      <DataTable columns={casesColumns} data={recentCasesData} className="border-none bg-transparent" />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!caseToDelete}
        onClose={() => setCaseToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure?"
        description={`This action cannot be undone. This will permanently delete the session ${caseToDelete?.name ? `(${caseToDelete.name})` : ""} and remove its data from our servers.`}
        confirmText="Delete Session"
        variant="danger"
      />
    </div>
  );
};
