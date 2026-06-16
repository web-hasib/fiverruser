"use client";

import Container from "@/src/components/Container";
import { CustomPagination } from "@/src/components/dashboard/CustomPagination";
import { AddPatientModal } from "@/src/components/features/user/patients/AddPatientModal";
import { PatientGrid } from "@/src/components/features/user/patients/PatientGrid";
import { Patient, PatientsTable } from "@/src/components/features/user/patients/PatientsTable";
import { SharePatientModal } from "@/src/components/features/user/patients/SharePatientModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import {
  ChevronDown,
  CircleArrowOutDownLeft,
  Download,
  Edit,
  LayoutGrid,
  List,
  Plus,
  Search,
  Upload,
  Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { StatsCard } from "@/src/components/dashboard/StatsCard";
import { TableToolbar } from "@/src/components/dashboard/TableToolbar";
import { ConfirmModal } from "@/src/components/dashboard/ConfirmModal";
import { GoCheckbox } from "react-icons/go";
import Heading from "@/src/components/Heading";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_PATIENTS: Patient[] = [
  { id: "1", name: "Cameron Williamson", patientId: "MED-2847", dob: "12/19/2005", category: "Urgent Sessions", status: "Pre-surgery", type: "New", date: "May 29, 2026", sessions: "View 2" },
  { id: "2", name: "Annette Black", patientId: "MED-1234", dob: "01/15/1992", category: "Post Surgery", status: "Post-op review", type: "Returning", date: "May 31, 2025", sessions: "View 3+" },
  { id: "3", name: "Courtney Henry", patientId: "MED-5678", dob: "05/20/1985", category: "VIP Patients", status: "Under treatment", type: "Follow-up", date: "September 24, 2025", sessions: "View 2+" },
  { id: "4", name: "Jerome Bell", patientId: "MED-9012", dob: "07/05/2000", category: "Follow-up Group", status: "Skin test pending", type: "Emergency", date: "November 28, 2026", sessions: "View 1" },
  { id: "5", name: "Floyd Miles", patientId: "MED-3344", dob: "11/24/1998", category: "Urgent Sessions", status: "Pre-surgery", type: "Emergency", date: "October 30, 2026", sessions: "View 2+" },
  { id: "6", name: "Theresa Webb", patientId: "MED-5566", dob: "03/10/1990", category: "VIP Patients", status: "Under treatment", type: "Outpatient", date: "September 9, 2026", sessions: "N/A" },
];



const STATUS_FILTERS = [
  { label: "All Status", value: "All" },
  { label: "Pre-surgery", value: "Pre-surgery" },
  { label: "Post-op review", value: "Post-op review" },
  { label: "Under treatment", value: "Under treatment" },
  { label: "Skin test pending", value: "Skin test pending" },
];

export default function MyPatientsPage() {
  const router = useRouter();

  // State
  const [view, setView] = useState<"list" | "grid">("list");
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Name A-Z");
  const [createdBy, setCreatedBy] = useState("All");
  const [entryDate, setEntryDate] = useState("All");
  const [patientType, setPatientType] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    title: "",
    description: "",
    onConfirm: () => { },
  });

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedForShare, setSelectedForShare] = useState<Patient | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter Logic
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.patientId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = activeStatus === "All" || p.status === activeStatus;
      return matchesSearch && matchesStatus;
    });
  }, [patients, search, activeStatus]);

  // Handlers
  const handleDelete = (id: string) => {
    const patient = patients.find(p => p.id === id);
    setConfirmConfig({
      title: "Delete Patient",
      description: `Are you sure you want to delete ${patient?.name}? This action cannot be undone.`,
      onConfirm: () => {
        setPatients(prev => prev.filter(p => p.id !== id));
        setSelectedIds(prev => prev.filter(i => i !== id));
        setIsConfirmOpen(false);
      }
    });
    setIsConfirmOpen(true);
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/user/patients/${id}`);
  };

  const handleBulkDelete = () => {
    setConfirmConfig({
      title: "Delete Selected Patients",
      description: `Are you sure you want to delete ${selectedIds.length} selected patients? This action cannot be undone.`,
      onConfirm: () => {
        setPatients(prev => prev.filter(p => !selectedIds.includes(p.id)));
        setSelectedIds([]);
        setIsConfirmOpen(false);
      }
    });
    setIsConfirmOpen(true);
  };

  const handleUpdate = (id: string, field: keyof Patient, value: string) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <Container className="p-0 pb-10 space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Heading title="My Patients" />
        <div className="flex items-center flex-wrap gap-2">
          <Button variant="outline" className="h-9 px-4 rounded-lg bg-card border-border/50 text-xs font-bold gap-2 hover:bg-accent">
            <Download className="size-3.5" /> EXPORT CSV
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-lg bg-card border-border/50 text-xs font-bold gap-2 hover:bg-accent">
            <Upload className="size-3.5" /> BULK IMPORT
          </Button>
          <Button onClick={() => setIsAddOpen(true)} className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold gap-2 shadow-sm">
            <Plus className="size-3.5" /> NEW PATIENT
          </Button>
        </div>
      </div>

      {/* ─── Stats ─── */}
      <div className="grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="All Patients"
          value="12"
          trend="Since Yesterday"
          trendValue="+5"
          icon={Users}
          variant="blue"
        />
        <StatsCard
          title="Active"
          value="7"
          trend="Urgent 3 Task!"
          trendValue=""
          icon={GoCheckbox}
          variant="purple"
        />
        <StatsCard
          title="Awaiting Results"
          value="1200"
          trend="In 7 Days!"
          trendValue="100 New Patient"
          icon={CircleArrowOutDownLeft}
          variant="green"
        />
        <StatsCard
          title="Editable Cards"
          value="24"
          trend="This Month"
          trendValue=""
          icon={Edit}
          variant="orange"
        />
      </div>

      {/* ─── Controls ─── */}
      <TableToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        sortOptions={[
          { label: "Name A-Z", value: "Name A-Z" },
          { label: "Name Z-A", value: "Name Z-A" },
          { label: "Newest", value: "Newest" },
        ]}
        filters={[
          {
            value: createdBy,
            onChange: setCreatedBy,
            options: [
              { label: "Created by", value: "All" },
              { label: "Me", value: "Me" },
              { label: "Staff", value: "Staff" },
            ],
            placeholder: "Created by"
          },
          {
            value: entryDate,
            onChange: setEntryDate,
            options: [
              { label: "Entry Date", value: "All" },
              { label: "Newest", value: "Newest" },
              { label: "Oldest", value: "Oldest" },
            ],
            placeholder: "Entry Date"
          },
          {
            value: patientType,
            onChange: setPatientType,
            options: [
              { label: "Type", value: "All" },
              { label: "New", value: "New" },
              { label: "Returning", value: "Returning" },
              { label: "Follow-up", value: "Follow-up" },
              { label: "Emergency", value: "Emergency" },
            ],
            placeholder: "Type"
          }
        ]}
        viewType={view}
        onViewTypeChange={setView}
        showSelectAll={true}
        isAllSelected={selectedIds.length === filteredPatients.length && filteredPatients.length > 0}
        onSelectAll={() => {
          if (selectedIds.length === filteredPatients.length) setSelectedIds([]);
          else setSelectedIds(filteredPatients.map(p => p.id));
        }}
        selectedCount={selectedIds.length}
        onBulkDelete={handleBulkDelete}
        bottomContent={
          <>
            {STATUS_FILTERS.map((f, i) => (
              <Button
                key={i}
                onClick={() => setActiveStatus(f.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap",
                  activeStatus === f.value
                    ? "bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white shadow-sm"
                    : "bg-card border-border/50 text-muted-foreground hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-white"
                )}
              >
                {f.label}
              </Button>
            ))}
          </>
        }
      />

      {/* ─── Content ─── */}
      {view === "list" ? (
        <PatientsTable
          patients={filteredPatients}
          onDelete={handleDelete}
          onView={handleView}
          onUpdate={handleUpdate}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      ) : (
        <PatientGrid
          patients={filteredPatients}
          onDelete={handleDelete}
          onView={handleView}
          onUpdate={handleUpdate}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      )}

      {/* ─── Pagination ─── */}
      <div>
        <CustomPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPatients.length / rowsPerPage) || 1}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={() => { }}
        />
      </div>

      {/* ─── Modals ─── */}
      <AddPatientModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={() => setIsAddOpen(false)} />
      <SharePatientModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} patient={selectedForShare as any} onShare={() => setIsShareOpen(false)} />
      
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        description={confirmConfig.description}
        confirmText="Delete"
      />
    </Container>
  );
}
