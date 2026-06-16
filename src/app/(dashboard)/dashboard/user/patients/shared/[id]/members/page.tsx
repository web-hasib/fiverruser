"use client";

import Container from "@/src/components/Container";
import { CustomPagination } from "@/src/components/dashboard/CustomPagination";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import { MemberCard } from "@/src/components/dashboard/MemberCard";
import { ViewToggleControl } from "@/src/components/dashboard/ViewToggleControl";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { ArrowUpDown, ChevronDown, ChevronUp, Download, Plus, Search, Trash2, Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AddMemberModal, MemberFormData } from "./_components/AddMemberModal";
import { TableToolbar } from "@/src/components/dashboard/TableToolbar";
import { ConfirmModal } from "@/src/components/dashboard/ConfirmModal";

const DUMMY_MEMBERS = [
  { id: "1", uniqueId: "UNQ-XXXX", name: "Savannah Nguyen", role: "Super Admin", email: "bill.sanders@example.com", accessType: "Full Edit", status: "Active" },
  { id: "2", uniqueId: "UNQ-XXXX", name: "Courtney Henry", role: "Admin", email: "michael.mitc@example.com", accessType: "Full Edit", status: "Invited" },
  { id: "3", uniqueId: "UNQ-XXXX", name: "Darlene Robertson", role: "Member", email: "georgia.young@example.com", accessType: "View Only", status: "Suspended" },
  { id: "4", uniqueId: "UNQ-XXXX", name: "Arlene McCoy", role: "Member", email: "jessica.hanson@example.com", accessType: "Full Edit", status: "Active" },
  { id: "5", uniqueId: "UNQ-XXXX", name: "Kristin Watson", role: "Member", email: "alma.lawson@example.com", accessType: "View Only", status: "Invited" },
  { id: "6", uniqueId: "UNQ-XXXX", name: "Dianne Russell", role: "Member", email: "nevaeh.simmons@example.com", accessType: "Full Edit", status: "Active" },
  { id: "7", uniqueId: "UNQ-XXXX", name: "Bessie Cooper", role: "Member", email: "willie.jennings@example.com", accessType: "View Only", status: "Active" },
  { id: "8", uniqueId: "UNQ-XXXX", name: "Robert Fox", role: "Member", email: "debra.holt@example.com", accessType: "Full Edit", status: "Invited" },
  { id: "9", uniqueId: "UNQ-XXXX", name: "Cameron Williamson", role: "Member", email: "kenzi.lawson@example.com", accessType: "Full Edit", status: "Active" },
  { id: "10", uniqueId: "UNQ-XXXX", name: "Jerome Bell", role: "Member", email: "sara.cruz@example.com", accessType: "View Only", status: "Suspended" },
];

export default function SharedFolderMembersPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [accessFilter, setAccessFilter] = useState("Access Type");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    description: "",
    onConfirm: () => { }
  });

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="ml-2 size-3.5 opacity-30" />;
    return sortConfig.direction === "asc" ? <ChevronUp className="ml-2 size-3.5 text-blue-500" /> : <ChevronDown className="ml-2 size-3.5 text-blue-500" />;
  };

  const SortableHeader = ({ label, columnKey, children }: { label?: string; columnKey: string; children?: React.ReactNode }) => (
    <div 
      className="flex items-center cursor-pointer hover:text-blue-500 transition-colors group" 
      onClick={() => handleSort(columnKey)}
    >
      {children || label}
      <SortIcon columnKey={columnKey} />
    </div>
  );

  const filteredData = useMemo(() => {
    let data = DUMMY_MEMBERS;
    if (searchQuery) {
      data = data.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (accessFilter !== "Access Type") {
      data = data.filter(m => m.accessType === accessFilter);
    }
    return data;
  }, [searchQuery, accessFilter]);

  const sortedData = useMemo(() => {
    let data = [...filteredData];
    if (!sortConfig) return data;

    return data.sort((a: any, b: any) => {
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const statusStyles: any = {
    "Active": "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    "Invited": "bg-amber-500/10 text-amber-500 border-amber-500/30",
    "Suspended": "bg-rose-500/10 text-rose-500 border-rose-500/30",
  };

  const handleAddMember = (data: MemberFormData) => {
    console.log("Adding member:", data);
  };

  const memberColumns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: (
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            className="size-3.5 rounded border-border bg-transparent cursor-pointer accent-blue-600" 
            checked={selectedIds.length === filteredData.length && filteredData.length > 0}
            onChange={() => {
              if (selectedIds.length === filteredData.length) setSelectedIds([]);
              else setSelectedIds(filteredData.map(m => m.id));
            }}
          />
          <SortableHeader label="Unique ID" columnKey="uniqueId" />
        </div>
      ) as any,
      accessorKey: "uniqueId",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            className="size-3.5 rounded border-border bg-transparent cursor-pointer accent-blue-600" 
            checked={selectedIds.includes(row.id)}
            onChange={() => toggleOne(row.id)}
          />
          <span className="text-muted-foreground/60 text-[11px]">{row.uniqueId}</span>
        </div>
      )
    },
    {
      header: (
        <SortableHeader label="Name" columnKey="name" />
      ) as any,
      accessorKey: "name",
      cell: (row: any) => <span className="text-foreground font-bold text-[11px]">{row.name}</span>,
    },
    {
      header: (
        <SortableHeader label="Role" columnKey="role" />
      ) as any,
      accessorKey: "role",
      cell: (row: any) => <span className="text-muted-foreground text-[11px]">{row.role}</span>,
    },
    {
      header: (
        <SortableHeader label="Email" columnKey="email" />
      ) as any,
      accessorKey: "email",
      cell: (row: any) => <span className="text-muted-foreground/80 text-[11px]">{row.email}</span>,
    },
    {
      header: (
        <SortableHeader label="Access Type" columnKey="accessType" />
      ) as any,
      accessorKey: "accessType",
      cell: (row: any) => (
        <span className="px-2.5 py-1 rounded-full text-[9px] border font-bold bg-blue-500/5 text-blue-400 border-blue-500/20 whitespace-nowrap">
          {row.accessType}
        </span>
      ),
    },
    {
      header: (
        <SortableHeader label="Status" columnKey="status" />
      ) as any,
      accessorKey: "status",
      cell: (row: any) => (
        <span className={cn("px-2.5 py-1 rounded-full text-[9px] border font-bold whitespace-nowrap", statusStyles[row.status] || statusStyles["Active"])}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      id: "actions",
      cell: (row: any) => (
        <button 
          onClick={() => handleDelete(row.id)}
          className="text-muted-foreground/40 hover:text-rose-500 transition-colors"
        >
          <Trash2 className="size-3.5" />
        </button>
      ),
    },
  ], [selectedIds, filteredData, sortConfig]);

  const handleDelete = (id: string) => {
    const member = DUMMY_MEMBERS.find(m => m.id === id);
    setConfirmConfig({
      title: "Delete Member",
      description: `Are you sure you want to delete ${member?.name}? This action cannot be undone.`,
      onConfirm: () => {
        setSelectedIds(prev => prev.filter(i => i !== id));
        setIsConfirmOpen(false);
      }
    });
    setIsConfirmOpen(true);
  };

  const handleBulkDelete = () => {
    setConfirmConfig({
      title: "Delete Members",
      description: `Are you sure you want to delete ${selectedIds.length} selected members? This action cannot be undone.`,
      onConfirm: () => {
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

  const toggleAll = () => {
    if (selectedIds.length === filteredData.length) setSelectedIds([]);
    else setSelectedIds(filteredData.map(m => m.id));
  };

  return (
    <Container className="">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
        <Heading title="Members" />
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
            <Plus className="size-3.5 mr-1" /> NEW MEMBER
          </Button>
        </div>
      </div>

      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder="Name A-Z"
        sortOptions={[{ label: "Name A-Z", value: "Name A-Z" }]}
        filters={[
          {
            value: accessFilter,
            onChange: setAccessFilter,
            options: [
              { label: "Access Type", value: "Access Type" },
              { label: "Full Edit", value: "Full Edit" },
              { label: "View Only", value: "View Only" },
            ],
            placeholder: "Access Type"
          }
        ]}
        selectedCount={selectedIds.length}
        onBulkDelete={handleBulkDelete}
        showSelectAll={true}
        isAllSelected={selectedIds.length === filteredData.length && filteredData.length > 0}
        onSelectAll={toggleAll}
        viewType={viewType}
        rightContent={
          <div className="flex items-center gap-1">
            <button
              onClick={() => router.push(`/dashboard/user/patients/shared/${id}`)}
              className={cn(
                "px-4 py-2 text-[11px] font-bold rounded-lg transition-all",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Patients
            </button>
            <button
              onClick={() => router.push(`/dashboard/user/patients/shared/${id}/members`)}
              className={cn(
                "px-4 py-2 text-[11px] font-bold rounded-lg transition-all",
                "bg-card shadow-sm text-foreground"
              )}
            >
              Member
            </button>
          </div>
        }
        onViewTypeChange={setViewType}
      />

      {/* ─── Page Content ─── */}
      {viewType === "list" ? (
        <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
          <DataTable
            columns={memberColumns}
            data={sortedData}
            className="border-none bg-transparent"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedData.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              statusStyles={statusStyles}
              isSelected={selectedIds.includes(m.id)}
              onSelect={toggleOne}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddMember}
      />

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
