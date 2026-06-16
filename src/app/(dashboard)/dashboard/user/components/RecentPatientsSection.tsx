import React, { useState } from "react";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { Plus, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { SectionHeader } from "./DashboardUI";
import { AddPatientModal } from "@/src/components/features/user/patients/AddPatientModal";
import { PatientItem } from "../types";
import { patientsData } from "../data";
import Link from "next/link";

export const RecentPatientsSection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const patientsColumns: ColumnDef<PatientItem>[] = [
    {
      header: "Patient ID",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded border-input cursor-pointer" />
          <Link href={`/dashboard/user/patients/${item.id}`} className="text-sm font-mono text-primary-foreground hover:underline cursor-pointer">
            {item.id}
          </Link>
        </div>
      ),
    },
    {
      header: "Patient Name",
      cell: (item) => (
        <div className="flex flex-col items-center">
          <p 
            className="text-xs font-bold uppercase"
          >
            {item.name}
          </p>
          <span className="text-[10px] text-muted-foreground font-medium">DOB: 12/19/2005 | M</span>
        </div>
      ),
    },
    {
      header: "Sessions",
      cell: (item) => <div className="text-center"><Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400">View {item.cases}</Button></div>
    },
    {
      header: "Action",
      cell: (item) => (
        <div className="flex gap-2 justify-end text-muted-foreground/60">
          <Trash2 
            size={14} 
            className="cursor-pointer hover:text-destructive transition-colors" 
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-2xl">
      <SectionHeader 
        title="Recent Patients" 
        className="px-4 pt-4"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">
              <Download size={14} /> EXPORT CSV
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="h-8 text-[10px] font-bold px-3 transition-all active:scale-95"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={14} /> NEW PATIENT
            </Button>
          </div>
        } 
      />
      <DataTable columns={patientsColumns} data={patientsData} className="border-none bg-transparent" />

      {/* Add Patient Modal */}
      <AddPatientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => {
          console.log("Saving patient:", data);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};
