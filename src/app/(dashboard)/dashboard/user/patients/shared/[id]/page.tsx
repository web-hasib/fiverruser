"use client";

import Container from "@/src/components/Container";
import { CustomPagination } from "@/src/components/dashboard/CustomPagination";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import { PatientCard } from "@/src/components/dashboard/PatientCard";
import { StatsCard } from "@/src/components/dashboard/StatsCard";
import { ViewToggleControl } from "@/src/components/dashboard/ViewToggleControl";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { DUMMY_PATIENTS, Patient } from "@/src/types/patient";
import { AlertCircle, ArrowUpDown, CheckSquare, ChevronDown, ChevronUp, Download, Info, Plus, Search, Trash2, Upload, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AddPatientModal, PatientFormData } from "@/src/components/features/user/patients/AddPatientModal";
import { InlineSelect } from "@/src/components/InlineSelect";
import { TableToolbar } from "@/src/components/dashboard/TableToolbar";
import { ConfirmModal } from "@/src/components/dashboard/ConfirmModal";

const CATEGORY_OPTIONS = ["Urgent Sessions", "Post Surgery", "VIP Patients", "Follow-up Group"];
const STATUS_OPTIONS   = ["Pre-surgery", "Post-op review", "Under treatment", "Skin test pending"];
const TYPE_OPTIONS     = ["New", "Returning", "Follow-up", "Emergency", "Outpatient"];

const STATUS_STYLES: Record<string, string> = {
  "Pre-surgery": "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  "Post-op review": "bg-teal-500/10 text-teal-500 border-teal-500/30",
  "Under treatment": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Skin test pending": "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export default function SharedFolderPatientsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [patients, setPatients] = useState<Patient[]>(DUMMY_PATIENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tab, setTab] = useState("All Patients");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [sortOrder, setSortOrder] = useState("Name A-Z");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState(CATEGORY_OPTIONS);
  const [statuses, setStatuses] = useState(STATUS_OPTIONS);
  const [types, setTypes] = useState(TYPE_OPTIONS);
  const [styleMap, setStyleMap] = useState<Record<string, string>>(STATUS_STYLES);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    description: "",
    onConfirm: () => { }
  });

  const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof Patient) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEditOption = (field: 'category' | 'status' | 'type', oldVal: string, newVal: string) => {
    if (field === 'category') setCategories(prev => prev.map(o => o === oldVal ? newVal : o));
    if (field === 'status') setStatuses(prev => prev.map(o => o === oldVal ? newVal : o));
    if (field === 'type') setTypes(prev => prev.map(o => o === oldVal ? newVal : o));
    setPatients(prev => prev.map(p => p[field] === oldVal ? { ...p, [field]: newVal } : p));
  };

  const handleDeleteOption = (field: 'category' | 'status' | 'type', val: string) => {
    if (field === 'category') setCategories(prev => prev.filter(o => o !== val));
    if (field === 'status') setStatuses(prev => prev.filter(o => o !== val));
    if (field === 'type') setTypes(prev => prev.filter(o => o !== val));
  };

  const handleColorChange = (opt: string, colorClass: string) => {
    setStyleMap((prev: Record<string, string>) => ({ ...prev, [opt]: colorClass }));
  };

  const handleUpdate = (id: string, field: keyof Patient, value: any) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddPatient = (data: PatientFormData) => {
    console.log("Adding patient:", data);
  };

  const toggleAll = () => {
    if (selectedIds.length === patients.length) setSelectedIds([]);
    else setSelectedIds(patients.map(p => p.id));
  };

  const handleBulkDelete = () => {
    setConfirmConfig({
      title: "Delete Patients",
      description: `Are you sure you want to delete ${selectedIds.length} selected patients? This action cannot be undone.`,
      onConfirm: () => {
        setPatients(prev => prev.filter(p => !selectedIds.includes(p.id)));
        setSelectedIds([]);
        setIsConfirmOpen(false);
      }
    });
    setIsConfirmOpen(true);
  };

  const toggleOne = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const MOCK_AVATARS = ["CW"];
  const MOCK_NAMES = ["Cameron Williamson"];
  const MOCK_CREATORS = ["Wade Warren", "Arlene McCoy", "Theresa Webb", "Esther Howard", "Savannah Nguyen", "Ralph Edwards"];

  const filteredData = useMemo(() => {
    let data = patients;
    if (tab !== "All Patients") {
      data = data.filter(p => p.status === (tab === "Active" ? "Active" : (tab === "Follow-up" ? "Skin test pending" : (tab === "Awaiting Results" ? "Post-op review" : p.status))));
    }
    if (searchQuery) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.patientId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [patients, tab, searchQuery]);

  const sortedData = useMemo(() => {
    let data = [...filteredData];
    
    if (!sortConfig) {
      if (sortOrder === "Name A-Z") data.sort((a, b) => a.name.localeCompare(b.name));
      else if (sortOrder === "Name Z-A") data.sort((a, b) => b.name.localeCompare(a.name));
      else if (sortOrder === "Newest") data.sort((a, b) => b.id.localeCompare(a.id));
      return data;
    }

    return data.sort((a, b) => {
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, sortOrder]);

  const SortIcon = ({ columnKey }: { columnKey: keyof Patient }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="ml-2 size-3.5 opacity-30" />;
    return sortConfig.direction === "asc" ? <ChevronUp className="ml-2 size-3.5 text-blue-500" /> : <ChevronDown className="ml-2 size-3.5 text-blue-500" />;
  };

  const SortableHeader = ({ label, columnKey, children }: { label?: string; columnKey: keyof Patient; children?: React.ReactNode }) => (
    <div 
      className="flex items-center cursor-pointer hover:text-blue-500 transition-colors group" 
      onClick={() => handleSort(columnKey)}
    >
      {children || label}
      <SortIcon columnKey={columnKey} />
    </div>
  );

  const columns = useMemo<ColumnDef<Patient>[]>(() => [
    {
      header: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="size-3.5 rounded border-border bg-transparent cursor-pointer"
            checked={selectedIds.length === patients.length && patients.length > 0}
            onChange={toggleAll}
          />
          <SortableHeader label="Patient Name" columnKey="name" />
        </div>
      ) as any,
      accessorKey: "name",
      cell: (item: any) => {
        const idx = parseInt(item.id) % MOCK_NAMES.length || 0;
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="size-3.5 rounded border-border bg-transparent cursor-pointer"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleOne(item.id)}
            />
            <div className="size-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-[9px] shrink-0">
              {MOCK_AVATARS[idx] || "CW"}
            </div>
            <div className="min-w-0">
              <p
                onClick={() => router.push(`/dashboard/user/patients/${item.id}`)}
                className="text-xs font-bold text-blue-500 hover:underline cursor-pointer truncate tracking-tight"
              >
                {MOCK_NAMES[idx] || item.name}
              </p>
              <p className="text-[9px] font-medium text-muted-foreground/60">{item.patientId}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "DOB",
      accessorKey: "dob",
      cell: (row: any) => <span className="text-muted-foreground whitespace-nowrap text-[11px]">DOB: {row.dob || "12/19/2005"}</span>,
    },
    {
      header: (
        <SortableHeader label="Category" columnKey="category" />
      ) as any,
      accessorKey: "category",
      cell: (row: any) => (
        <InlineSelect
          value={row.category}
          options={categories}
          onChange={(val) => handleUpdate(row.id, "category", val)}
          onAddOption={(val) => {
            setCategories(prev => [...prev, val]);
            handleUpdate(row.id, "category", val);
          }}
          onEditOption={(oldVal, newVal) => handleEditOption("category", oldVal, newVal)}
          onDeleteOption={(val) => handleDeleteOption("category", val)}
          align="start"
        />
      ),
    },
    {
      header: (
        <SortableHeader label="Status" columnKey="status" />
      ) as any,
      accessorKey: "status",
      cell: (row: any) => (
        <InlineSelect
          value={row.status === "Draft" ? "Pre-surgery" : (row.status === "Pending" ? "Under treatment" : row.status)}
          options={statuses}
          onChange={(val) => handleUpdate(row.id, "status", val)}
          onAddOption={(val) => {
            setStatuses(prev => [...prev, val]);
            handleUpdate(row.id, "status", val);
          }}
          onEditOption={(oldVal, newVal) => handleEditOption("status", oldVal, newVal)}
          onDeleteOption={(val) => handleDeleteOption("status", val)}
          onColorChange={handleColorChange}
          styleMap={styleMap}
          asBadge
          align="start"
        />
      ),
    },
    {
      header: "Created by",
      id: "createdBy",
      cell: (row: any) => {
        const cidx = parseInt(row.id) % MOCK_CREATORS.length || 0;
        return <span className="text-blue-500 font-bold hover:underline cursor-pointer text-[11px]">{row.createdBy || MOCK_CREATORS[cidx]}</span>;
      },
    },
    {
      header: (
        <SortableHeader label="Type" columnKey="type" />
      ) as any,
      accessorKey: "type",
      cell: (row: any) => (
        <InlineSelect
          value={row.type}
          options={types}
          onChange={(val) => handleUpdate(row.id, "type", val)}
          onAddOption={(val) => {
            setTypes(prev => [...prev, val]);
            handleUpdate(row.id, "type", val);
          }}
          onEditOption={(oldVal, newVal) => handleEditOption("type", oldVal, newVal)}
          onDeleteOption={(val) => handleDeleteOption("type", val)}
          align="start"
        />
      ),
    },
    {
      header: "Entry Date",
      accessorKey: "date",
      cell: (row: any) => <span className="text-muted-foreground whitespace-nowrap text-[11px]">{row.date}</span>,
    },
    {
      header: "Sessions",
      accessorKey: "sessions",
      cell: (row: any) => {
        const val = row.sessions || "View 2";
        return (
          <button className={cn(
            "px-3.5 py-1 rounded-full text-[10px] font-bold border transition-colors whitespace-nowrap",
            val === "N/A" || val === "-"
              ? "bg-card border-border text-muted-foreground hover:bg-muted"
              : "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20"
          )}>
            {val}
          </button>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: (row: any) => (
        <button
          className="text-muted-foreground/40 hover:text-rose-500 transition-colors"
          onClick={() => {
            setConfirmConfig({
              title: "Delete Patient",
              description: "Are you sure you want to delete this patient?",
              onConfirm: () => {
                setPatients(prev => prev.filter(p => p.id !== row.id));
                setIsConfirmOpen(false);
              }
            });
            setIsConfirmOpen(true);
          }}
        >
          <Trash2 className="size-3.5" />
        </button>
      ),
    },
  ], [selectedIds, patients, router, categories, statuses, types, styleMap, sortConfig]);

  return (
    <Container className="">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
        <Heading title="Patients" />
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-9 px-4 border-border/50 bg-card hover:bg-muted text-[11px] font-extrabold gap-2 uppercase tracking-wide">
            <Upload className="size-3.5" /> EXPORT CSV
          </Button>
          <Button variant="outline" className="h-9 px-4 border-border/50 bg-card hover:bg-muted text-[11px] font-extrabold gap-2 uppercase tracking-wide text-blue-500 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10">
            <Download className="size-3.5" /> BULK IMPORT
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-500/20 text-[11px] uppercase tracking-wide"
          >
            <Plus className="size-3.5 mr-1" /> NEW PATIENT
          </Button>
        </div>
      </div>

      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        sortOptions={[
          { label: "Name A-Z", value: "Name A-Z" },
          { label: "Name Z-A", value: "Name Z-A" },
          { label: "Newest", value: "Newest" },
        ]}
        filters={[
          {
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: categories.map(c => ({ label: c, value: c })),
            placeholder: "Category"
          }
        ]}
        selectedCount={selectedIds.length}
        onBulkDelete={handleBulkDelete}
        showSelectAll={true}
        isAllSelected={selectedIds.length === patients.length && patients.length > 0}
        onSelectAll={toggleAll}
        viewType={viewType}
        rightContent={
          <div className="flex items-center gap-1">
            <button
              onClick={() => router.push(`/dashboard/user/patients/shared/${id}`)}
              className={cn(
                "px-4 py-2 text-[11px] font-bold rounded-lg transition-all",
                "bg-card shadow-sm text-foreground"
              )}
            >
              Patients
            </button>
            <button
              onClick={() => router.push(`/dashboard/user/patients/shared/${id}/members`)}
              className={cn(
                "px-4 py-2 text-[11px] font-bold rounded-lg transition-all",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Member
            </button>
          </div>
        }
        onViewTypeChange={setViewType}
      />

      {/* ─── Sub Tabs ─── */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 custom-scrollbar">
        {[
          { label: "All Patients", count: 32 },
          { label: "Active", count: 12 },
          { label: "Follow-up", count: 12 },
          { label: "Awaiting Results", count: 12 }
        ].map((t) => (
          <button
            key={t.label}
            onClick={() => setTab(t.label)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold border transition-colors whitespace-nowrap",
              tab === t.label ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-card border-border/50 text-muted-foreground hover:bg-muted/80"
            )}
          >
            {t.label}
            <span className={cn("px-1.5 py-0.5 rounded text-[10px]", tab === t.label ? "bg-white/20 text-white" : "bg-muted text-foreground")}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ─── Page Content ─── */}
      {viewType === "list" ? (
        <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
          <DataTable
            columns={columns}
            data={sortedData}
            className="border-none bg-transparent"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedData.map((p) => (
            <PatientCard
              key={p.id}
              patient={p}
              onDelete={(id) => {
                setConfirmConfig({
                  title: "Delete Patient",
                  description: "Are you sure you want to delete this patient?",
                  onConfirm: () => {
                    setPatients(prev => prev.filter(p => p.id !== id));
                    setIsConfirmOpen(false);
                  }
                });
                setIsConfirmOpen(true);
              }}
              mockAvatar={MOCK_AVATARS[parseInt(p.id) % MOCK_AVATARS.length] || "CW"}
              mockName={MOCK_NAMES[parseInt(p.id) % MOCK_NAMES.length] || p.name}
              onUpdate={handleUpdate}
              categories={categories}
              statuses={statuses}
              onAddCategory={(val) => {
                setCategories(prev => [...prev, val]);
                handleUpdate(p.id, "category", val);
              }}
              onAddStatus={(val) => {
                setStatuses(prev => [...prev, val]);
                handleUpdate(p.id, "status", val);
              }}
              onEditOption={handleEditOption}
              onDeleteOption={handleDeleteOption}
              onColorChange={handleColorChange}
              styleMap={styleMap}
            />
          ))}
        </div>
      )}

      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={18}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>

      <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddPatient as any} />
      
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
