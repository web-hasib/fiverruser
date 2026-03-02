"use client";

import Container from "@/src/components/Container";
import { CaseFilterBar } from "@/src/components/dashboard/CaseFilterBar";
import { CustomPagination } from "@/src/components/dashboard/CustomPagination";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import { Button } from "@/src/components/ui/button";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface CaseItem {
  id: string;
  caseId: string;
  patientName: string;
  caseName: string;
  department: string;
  team: string;
  date: string;
  tokens: string;
}

const mockCases: CaseItem[] = [
  {
    id: "1",
    caseId: "Case #2847",
    patientName: "Wade Warren",
    caseName: "Post-op Discharge Summary",
    department: "Surgery",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "452",
  },
  {
    id: "2",
    caseId: "--",
    patientName: "--",
    caseName: "Cardiac History Documentation",
    department: "Cardiology",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "200",
  },
  {
    id: "3",
    caseId: "Case #2847",
    patientName: "Courtney Henry",
    caseName: "Operative Report - Appendectomy",
    department: "Internal Medicine",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "700",
  },
  {
    id: "4",
    caseId: "--",
    patientName: "--",
    caseName: "Patient Q&A Session",
    department: "27",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "125",
  },
  {
    id: "5",
    caseId: "Case #2847",
    patientName: "Annette Black",
    caseName: "Discharge Summary - Pneumonia",
    department: "Surgery",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "200",
  },
  {
    id: "6",
    caseId: "Case #2847",
    patientName: "Jerome Bell",
    caseName: "Post-op Discharge Summary",
    department: "Surgery",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "125",
  },
  {
    id: "7",
    caseId: "--",
    patientName: "--",
    caseName: "Cardiac History Documentation",
    department: "Internal Medicine",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "452",
  },
  {
    id: "8",
    caseId: "Case #2847",
    patientName: "Courtney Henry",
    caseName: "Operative Report - Appendectomy",
    department: "Internal Medicine",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "700",
  },
  {
    id: "9",
    caseId: "--",
    patientName: "--",
    caseName: "Patient Q&A Session",
    department: "Surgery",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "200",
  },
  {
    id: "10",
    caseId: "Case #2847",
    patientName: "Annette Black",
    caseName: "Discharge Summary - Pneumonia",
    department: "Internal Medicine",
    team: "---",
    date: "Jan 25, 2026",
    tokens: "200",
  },
];

const CasesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const columns: ColumnDef<CaseItem>[] = [
    { header: "Case ID", accessorKey: "caseId" },
    {
      header: "Patient Name",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
            {item.patientName !== "--" ? item.patientName.charAt(0) : "-"}
          </div>
          <span className="text-primary-foreground/90">{item.patientName}</span>
        </div>
      ),
    },
    { header: "Case Name", accessorKey: "caseName" },
    { header: "Department", accessorKey: "department" },
    { header: "Team", accessorKey: "team" },
    { header: "Date", accessorKey: "date" },
    { header: "Usage Token", accessorKey: "tokens" },

    {
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-3 text-primary-foreground/30">
          <Eye
            size={18}
            className="cursor-pointer hover:text-primary-foreground transition-colors"
          />
          <Pencil
            size={18}
            className="cursor-pointer hover:text-primary-foreground transition-colors"
          />
          <Trash2
            size={18}
            className="cursor-pointer hover:text-rose-500 transition-colors"
          />
        </div>
      ),
    },
  ];

  return (
    <Container>
    <div className="space-y-6 pb-6">
      {/* Top Header */}
      <div className="flex justify-end pr-2 pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white  px-6 h-auto font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20">
          <Plus size={20} strokeWidth={3} /> New Case
        </Button>
      </div>

      {/* Filter Bar */}
      <CaseFilterBar />

      {/* Data Table */}
      <div className="rounded-[2.5rem] bg-primary border border-primary-foreground/5 shadow-2xl shadow-black/20 overflow-hidden">
        <DataTable
          columns={columns}
          data={mockCases}
          className="rounded-none border-none bg-transparent"
        />
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={16}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>

</Container>  );
};

export default CasesPage;
