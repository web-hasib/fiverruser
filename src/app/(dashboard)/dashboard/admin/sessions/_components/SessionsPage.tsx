"use client";

import Container from "@/src/components/Container";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { cn } from "@/src/lib/utils";
import {
  Check,
  Clock,
  Download,
  Search,
  Trash2,
  User
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { TableToolbar } from "@/src/components/dashboard/TableToolbar";

type SessionData = {
  id: string;
  patient: string;
  assignedTo: string;
  dept: string;
  team: string;
  diagnosis: string;
  token: string;
  date: string;
  status: "Completed" | "In Progress";
};

const mockData: SessionData[] = Array(10).fill({
  id: "C-18421",
  patient: "Saifur Rahman",
  assignedTo: "Dr. Saifur Rahman",
  dept: "Cardiology",
  team: "Dhaka Hospital",
  diagnosis: "Hypertension",
  token: "2200",
  date: "2026-03-10",
  status: "Completed"
}).map((item, index) => ({
  ...item,
  id: `C-1842${index + 1}`,
  status: index % 2 === 0 ? "Completed" : "In Progress",
}));

export default function SessionsPage() {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("All");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const allSelected = mockData.length > 0 && selectedIds.size === mockData.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < mockData.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(mockData.map((item) => item.id)));
    }
  };

  const handleDelete = () => {
    const idsArray = Array.from(selectedIds);
    console.log("Selected IDs to Delete:", idsArray);
    toast.success(`Deleted ${idsArray.length} items successfully`);
  };



  const columns: ColumnDef<SessionData>[] = [
    {
      header: (
        <div className="flex items-center gap-3">
          <Checkbox
            checked={allSelected ? true : someSelected ? "indeterminate" : false}
            onCheckedChange={toggleSelectAll}
            className="border-primary-foreground/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <span>Assistant</span>
        </div>
      ),
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedIds.has(item.id)}
            onCheckedChange={() => toggleSelect(item.id)}
            className="border-primary-foreground/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <span className="text-blue-500 font-medium">{item.id}</span>
        </div>
      ),
    },
    { header: "Patient", accessorKey: "patient" },
    { header: "Assigned To", accessorKey: "assignedTo" },
    { header: "Dept", accessorKey: "dept" },
    { header: "Team", accessorKey: "team" },
    { header: "Diagnosis", accessorKey: "diagnosis" },
    { header: "Token", accessorKey: "token" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Status",
      cell: (item) => (
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border",
            item.status === "Completed"
              ? "text-emerald-500 border-emerald-500/50 bg-emerald-500/10"
              : "text-blue-500 border-blue-500/50 bg-blue-500/10"
          )}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push(`/dashboard/admin/sessions/${item.id}`)}
            className="h-8 w-8 rounded-md border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
          >
            <User className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-red-500/30 text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container >
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Heading title="Sessions" />
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10 font-medium h-9 rounded-lg text-xs">
            <Clock className="mr-2 h-4 w-4" />
            Auto Delete Old
          </Button>
          <Button variant="outline" className="border-border text-muted-foreground hover:bg-muted font-medium h-9 rounded-lg text-xs">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* ─── Controls ─── */}
      <TableToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        sortOptions={[
          { label: "Newest", value: "Newest" },
          { label: "Oldest", value: "Oldest" },
        ]}
        filters={[
          {
            value: team,
            onChange: setTeam,
            options: [
              { label: "All Teams", value: "All" },
              { label: "St. Mary's", value: "St. Mary's" },
              { label: "City Medical", value: "City Medical" },
            ],
            placeholder: "Team"
          },
          {
            value: dept,
            onChange: setDept,
            options: [
              { label: "All Depts", value: "All" },
              { label: "Cardiology", value: "Cardiology" },
              { label: "Neurology", value: "Neurology" },
            ],
            placeholder: "Dept"
          },
          {
            value: status,
            onChange: setStatus,
            options: [
              { label: "All Status", value: "All" },
              { label: "Completed", value: "Completed" },
              { label: "In Progress", value: "In Progress" },
            ],
            placeholder: "Status"
          }
        ]}
        selectedCount={selectedIds.size}
        onBulkDelete={handleDelete}
        onSelectAll={toggleSelectAll}
        isAllSelected={allSelected}
      />

      {/* Table */}
      <div className="flex flex-col gap-4">
        <DataTable columns={columns} data={mockData} className="rounded-xl border-border bg-card" />
      </div>
    </Container>
  );
}
