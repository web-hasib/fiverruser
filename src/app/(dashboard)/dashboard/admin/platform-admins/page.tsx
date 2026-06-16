"use client";

import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { DUMMY_ADMINS, PlatformAdmin } from "./_constants";
import { AdminsFilterBar, FilterState } from "./_components/AdminsFilterBar";
import { AdminsTable } from "./_components/AdminsTable";
import { AddPlatformAdminModal, FormState } from "./_components/AddPlatformAdminModal";
import { DeletePlatformAdminModal } from "./_components/DeletePlatformAdminModal";

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Map a PlatformAdmin row → FormState shape for the edit modal */
function adminToFormState(admin: PlatformAdmin): Partial<FormState> {
  return {
    fullName: admin.name,
    email: admin.email,
    status: admin.status,
  };
}

const INITIAL_FILTERS: FilterState = {
  search: "",
  sortBy: "A-Z",
  department: "",
  team: "",
  status: "",
  date: undefined,
};

export default function PlatformAdminsPage() {
  // ── Filter state ───────────────────────────────────────────────────────────
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // ── Modal state ────────────────────────────────────────────────────────────
  const [addOpen, setAddOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState<PlatformAdmin | null>(null);
  const [deleteAdmin, setDeleteAdmin] = useState<PlatformAdmin | null>(null);

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  // ── Filtered + sorted data ─────────────────────────────────────────────────
  const admins = useMemo(() => {
    let list = [...DUMMY_ADMINS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
      );
    }

    if (filters.status) {
      list = list.filter((a) => a.status === filters.status);
    }

    if (filters.sortBy === "A-Z") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (filters.sortBy === "Z-A") list.sort((a, b) => b.name.localeCompare(a.name));
    else if (filters.sortBy === "New Only") list = list.slice(0, 5);

    return list;
  }, [filters]);

  return (
    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Heading title="Platform Admins" />
        <Button variant="primary" className="uppercase" onClick={() => setAddOpen(true)}>
          <Plus size={15} />
          Add Super Admin
        </Button>
      </div>

      {/* ── Add Modal ─────────────────────────────────────────────────────── */}
      <AddPlatformAdminModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(data) => {
          console.log("New admin:", data);
          setAddOpen(false);
        }}
      />

      {/* ── Edit Modal ────────────────────────────────────────────────────── */}
      <AddPlatformAdminModal
        isOpen={!!editAdmin}
        onClose={() => setEditAdmin(null)}
        initialData={editAdmin ? adminToFormState(editAdmin) : undefined}
        onSave={(data) => {
          console.log("Updated admin:", data);
          setEditAdmin(null);
        }}
      />

      {/* ── Delete Modal ──────────────────────────────────────────────────── */}
      <DeletePlatformAdminModal
        isOpen={!!deleteAdmin}
        onClose={() => setDeleteAdmin(null)}
        admin={deleteAdmin}
        onConfirm={(admin) => {
          console.log("Deleted admin:", admin.id);
          setDeleteAdmin(null);
        }}
      />

      {/* Filters */}
      <AdminsFilterBar filters={filters} onChange={handleFilterChange} />

      {/* Table */}
      <AdminsTable
        data={admins}
        onEdit={(admin) => setEditAdmin(admin)}
        onDelete={(admin) => setDeleteAdmin(admin)}
      />
    </Container>
  );
}