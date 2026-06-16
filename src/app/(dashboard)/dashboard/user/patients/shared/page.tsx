"use client";
import React, { useState, useMemo } from "react";
import Container from "@/src/components/Container";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search, Upload, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { AddFolderModal, FolderFormData } from "./_components/AddFolderModal";
import { SharedFolderCard, FolderItem } from "./_components/SharedFolderCard";
import Heading from "@/src/components/Heading";
import { TableToolbar } from "@/src/components/dashboard/TableToolbar";
import { ConfirmModal } from "@/src/components/dashboard/ConfirmModal";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const INITIAL_FOLDERS: FolderItem[] = [
  {
    id: "1", name: "Oncoteam Department", category: "Oncology", categoryColor: "#14b8a6", color: "#14b8a6",
    description: "Hospital policy on obtaining and documenting informed consent prior to all invasive procedures.",
    patients: 54, active: 18, tasks: 156, capacity: 54, capacityMax: 100, members: ["N", "D", "N", "D"], modifiedLabel: "Modified yesterday",
  },
  {
    id: "2", name: "Surgery Department", category: "Surgery", categoryColor: "#22c55e", color: "#22c55e",
    description: "Hospital policy on obtaining and documenting informed consent prior to all invasive procedures.",
    patients: 60, active: 24, tasks: 210, capacity: 60, capacityMax: 100, members: ["N", "D", "N", "D"], modifiedLabel: "Modified 2 days ago",
  },
  {
    id: "3", name: "Cardiology Department", category: "Cardiology", categoryColor: "#3b82f6", color: "#3b82f6",
    description: "Hospital policy on obtaining and documenting informed consent prior to all invasive procedures.",
    patients: 80, active: 36, tasks: 250, capacity: 80, capacityMax: 100, members: ["N", "D", "N", "D"], modifiedLabel: "Modified today",
  },
  {
    id: "4", name: "Dentist Department", category: "Dental", categoryColor: "#ef4444", color: "#ef4444",
    description: "Hospital policy on obtaining and documenting informed consent prior to all invasive procedures.",
    patients: 36, active: 6, tasks: 22, capacity: 36, capacityMax: 100, members: ["N", "D", "N", "D"], modifiedLabel: "Modified today",
  },
];

const RECENTLY_ACCESSED = [
  { id: "1", name: "Cameron Williamson", patientId: "MED-XXXX", category: "Urgent Sessions", folder: "Oncoteam Dep...", status: "Pre-surgery", statusColor: "emerald", sessions: "View 2" },
  { id: "2", name: "Cameron Williamson", patientId: "MED-XXXX", category: "Post Surgery",    folder: "Surgery Depart...", status: "Post-op review", statusColor: "blue", sessions: "View 3+" },
  { id: "3", name: "Cameron Williamson", patientId: "MED-XXXX", category: "VIP Patients",    folder: "Cardiology Dep...", status: "Under treatment", statusColor: "indigo", sessions: "View 2+" },
];

const DISTRIBUTION = [
  { label: "Cardiology Department", count: 80, color: "#f97316" },
  { label: "Cardiology Department", count: 60, color: "#14b8a6" },
  { label: "Oncoteam Department",   count: 54, color: "#3b82f6" },
  { label: "Dentist Department",    count: 36, color: "#ef4444" },
];
const TOTAL_PATIENTS = DISTRIBUTION.reduce((s, d) => s + d.count, 0);

const SORT_OPTIONS = ["Name A–Z", "Name Z–A", "Most Patients", "Recently Modified"];
const CATEGORY_OPTIONS = ["All Category", "Oncology", "Surgery", "Cardiology", "Dental"];

export default function SharedFoldersPage() {
  const router = useRouter();
  const [folders, setFolders] = useState<FolderItem[]>(INITIAL_FOLDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [sortVal, setSortVal] = useState("Name A–Z");
  const [catVal, setCatVal] = useState("All Category");

  const recentColumns = useMemo<ColumnDef<typeof RECENTLY_ACCESSED[0]>[]>(() => [
    {
      header: "Patient Name",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">CW</div>
          <div>
            <p className="font-bold text-blue-500 hover:underline cursor-pointer" onClick={() => router.push(`/dashboard/user/patients/${row.id}`)}>
              {row.name}
            </p>
            <p className="text-[9px] text-muted-foreground">{row.patientId}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (row) => <span className="text-muted-foreground">{row.category}</span>,
    },
    {
      header: "Folder",
      accessorKey: "folder",
      cell: (row) => <span className="text-muted-foreground truncate max-w-[100px] block">{row.folder}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <span className={cn("px-2.5 py-1 rounded-full text-[9px] font-bold uppercase border", {
          "bg-emerald-500/10 text-emerald-500 border-emerald-500/30": row.statusColor === "emerald",
          "bg-blue-500/10 text-blue-500 border-blue-500/30": row.statusColor === "blue",
          "bg-indigo-500/10 text-indigo-500 border-indigo-500/30": row.statusColor === "indigo",
        })}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Sessions",
      accessorKey: "sessions",
      cell: (row) => (
        <button className="px-3 py-1 bg-blue-600/5 text-blue-600 border border-blue-600/20 rounded-full text-[9px] font-bold hover:bg-blue-600 hover:text-white transition-all">
          {row.sessions}
        </button>
      ),
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: () => (
        <button className="text-muted-foreground/40 hover:text-rose-500 transition-colors">
          <Trash2 className="size-3.5" />
        </button>
      ),
    },
  ], [router]);

  const filtered = useMemo(() => {
    let list = folders.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) &&
      (catVal === "All Category" || f.category === catVal)
    );
    if (sortVal === "Name A–Z") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortVal === "Name Z–A") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    if (sortVal === "Most Patients") list = [...list].sort((a, b) => b.patients - a.patients);
    return list;
  }, [folders, search, sortVal, catVal]);

  const handleSave = (data: FolderFormData) => {
    const newFolder: FolderItem = {
      id: String(Date.now()), name: data.name, category: data.category,
      categoryColor: data.color, color: data.color,
      description: data.description || "No description provided.",
      patients: 0, active: 0, tasks: 0, capacity: 0, capacityMax: 100,
      members: ["N"], modifiedLabel: "Just now",
    };
    setFolders((prev) => [newFolder, ...prev]);
  };

  return (
    <Container className="p-0 pb-10 space-y-4">
      {/* ─── Page Header ─── */}
      <div className="flex items-center justify-between">
       <Heading title="Shared Folder" />
        <div className="flex flex-col justify-end items-end md:flex-row md:items-center gap-3">
          <Button variant="outline" className="h-9 px-4 border-border/50 bg-card text-xs font-bold gap-2">
            <Upload className="size-3.5" /> BULK IMPORT
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold gap-2">
            <Plus className="size-3.5" /> ADD NEW FOLDER
          </Button>
        </div>
      </div>

      <TableToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        sortOrder={sortVal}
        onSortChange={setSortVal}
        sortOptions={SORT_OPTIONS.map(s => ({ label: s, value: s }))}
        filters={[
          {
            value: catVal,
            onChange: setCatVal,
            options: CATEGORY_OPTIONS.map(c => ({ label: c, value: c })),
            placeholder: "Category"
          }
        ]}
      />

      {/* ─── Folder Cards Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((f) => (
          <SharedFolderCard key={f.id} folder={f} />
        ))}
      </div>

      {/* ─── Bottom Two-Column Section ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Recently Accessed Patient Records */}
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/10">
            <h3 className="text-sm font-bold text-foreground">Recently Accessed Patient Records</h3>
            <Button variant="ghost" size="sm" className="text-blue-500 text-xs font-bold h-8">All →</Button>
          </div>
          <div className="overflow-x-auto p-1">
            <DataTable columns={recentColumns} data={RECENTLY_ACCESSED} className="w-full text-xs border-none" />
          </div>
        </div>

        {/* Patient Distribution */}
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/10">
            <h3 className="text-sm font-bold text-foreground">Patient Distribution</h3>
            <span className="text-[10px] text-muted-foreground font-semibold">{TOTAL_PATIENTS} total</span>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="text-center">
              <p className="text-5xl font-black text-foreground">48</p>
              <p className="text-[10px] text-emerald-500 font-bold mt-1">↑ 8 Increased vs last week</p>
            </div>
            {/* Segmented Bar */}
            <div className="flex h-3 rounded-[2px] overflow-hidden gap-0.5">
              {DISTRIBUTION.map((d, i) => (
                <div key={i} className="h-full rounded-[2px]" style={{ width: `${(d.count / TOTAL_PATIENTS) * 100}%`, backgroundColor: d.color }} />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-3 mt-1">
              {DISTRIBUTION.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[11px] text-muted-foreground">{d.label}</span>
                  </div>
                  <span className="text-[11px] font-bold text-foreground">{d.count} Total Patient</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddFolderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </Container>
  );
}
