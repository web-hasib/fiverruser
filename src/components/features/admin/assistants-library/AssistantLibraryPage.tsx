"use client";

import React, { useState, useMemo } from "react";
import { Download, Plus, Search, ChevronDown, Settings2, Star, Trash2, AlertTriangle, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { CreateAssistantModal } from "@/src/app/(dashboard)/dashboard/user/my-assistants/_components/CreateAssistantModal";
import AssistantLibraryTable from "./AssistantLibraryTable";
import {
  DUMMY_LIBRARY_ROWS,
  LIBRARY_DOCUMENTS,
  LIBRARY_LANGUAGES,
  LIBRARY_ROLES,
  LIBRARY_TAB_OPTIONS,
  LIBRARY_TYPES,
  LIBRARY_VISIBILITY,
  type AssistantLibraryRecord,
  type LibraryTab,
} from "./assistantLibraryDummyData";
import Heading from "@/src/components/Heading";
import Container from "@/src/components/Container";

export default function AssistantLibraryPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetIds, setDeleteTargetIds] = useState<string[]>([]);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [rows, setRows] = useState<AssistantLibraryRecord[]>(DUMMY_LIBRARY_ROWS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<LibraryTab>("all");
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All Language");
  const [visibilityFilter, setVisibilityFilter] = useState("All Visibility");
  const [typeFilter, setTypeFilter] = useState("All Type");
  const [roleFilter, setRoleFilter] = useState("All Role");
  const [documentFilter, setDocumentFilter] = useState("All Documents");

  const tabCounts = useMemo(
    () => ({
      all: rows.length,
      private: rows.filter((r) => r.visibility === "Private").length,
      public: rows.filter((r) => r.visibility === "Public").length,
      shared: rows.filter((r) => r.visibility === "Shared with Team").length,
      featured: rows.filter((r) => r.featured).length,
    }),
    [rows],
  );

  const filteredRows = useMemo(() => {
    const query = search.toLowerCase().trim();
    return rows.filter((row) => {
      const matchesSearch = !query || `${row.name} ${row.author}`.toLowerCase().includes(query);
      const matchesLanguage = languageFilter === "All Language" || row.language.toLowerCase() === languageFilter.toLowerCase().slice(0, 2);
      const matchesVisibility = visibilityFilter === "All Visibility" || row.visibility === visibilityFilter;
      const matchesType = typeFilter === "All Type" || row.type === typeFilter;
      const matchesRole = roleFilter === "All Role" || row.clinicalRole === roleFilter;
      const matchesDocument = documentFilter === "All Documents" || row.document === documentFilter;

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "private" && row.visibility === "Private") ||
        (activeTab === "public" && row.visibility === "Public") ||
        (activeTab === "shared" && row.visibility === "Shared with Team") ||
        (activeTab === "featured" && row.featured);

      return matchesSearch && matchesLanguage && matchesVisibility && matchesType && matchesRole && matchesDocument && matchesTab;
    });
  }, [rows, search, languageFilter, visibilityFilter, typeFilter, roleFilter, documentFilter, activeTab]);

  const updateRows = (ids: string[], updater: (row: AssistantLibraryRecord) => AssistantLibraryRecord | null) => {
    setRows((prev) => prev.flatMap((row) => {
      if (!ids.includes(row.id)) return [row];
      const next = updater(row);
      return next ? [next] : [];
    }));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const openDeleteModal = (ids: string[]) => {
    setDeleteTargetIds(ids);
    setDeleteConfirmText("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetIds([]);
    setDeleteConfirmText("");
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmText !== "DELETE" || !deleteTargetIds.length) return;
    updateRows(deleteTargetIds, () => null);
    closeDeleteModal();
  };

  return (
    <Container>
      <div className="">
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Heading title="Assistants Library" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
              >
                <Plus className="h-4 w-4" />
                ADD NEW ASSISTANT
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 grid grid-cols-1 gap-2 xl:grid-cols-[1.35fr_repeat(5,minmax(140px,1fr))]">
              <div className="flex h-11 items-center rounded-xl border border-border bg-background px-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Assistant..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>

              <FilterDropdown title={languageFilter} options={["All Language", ...LIBRARY_LANGUAGES]} onSelect={setLanguageFilter} />
              <FilterDropdown title={visibilityFilter} options={["All Visibility", ...LIBRARY_VISIBILITY]} onSelect={setVisibilityFilter} />
              <FilterDropdown title={typeFilter} options={["All Type", ...LIBRARY_TYPES]} onSelect={setTypeFilter} />
              <FilterDropdown title={roleFilter} options={["All Role", ...LIBRARY_ROLES]} onSelect={setRoleFilter} />
              <FilterDropdown title={documentFilter} options={["All Documents", ...LIBRARY_DOCUMENTS]} onSelect={setDocumentFilter} />
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              {LIBRARY_TAB_OPTIONS.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${active ? "border-blue-500 bg-blue-500 text-white" : "border-border bg-background text-muted-foreground hover:bg-accent"
                      }`}
                  >
                    {tab.label}
                    <span className={`rounded px-1.5 py-0.5 text-[10px] ${active ? "bg-white text-blue-600" : "bg-card text-foreground border border-border"}`}>
                      {tabCounts[tab.id]}
                    </span>
                  </button>
                );
              })}
            </div>

            <AssistantLibraryTable
              assistants={filteredRows}
              selectedIds={selectedIds}
              onToggleRow={(id) => setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))}
              onToggleAll={(checked) =>
                setSelectedIds(checked ? Array.from(new Set([...selectedIds, ...filteredRows.map((row) => row.id)])) : selectedIds.filter((id) => !filteredRows.some((row) => row.id === id)))
              }
              onEdit={(assistant) => console.log("Edit assistant:", assistant.id)}
              onToggleFeatured={(assistant) =>
                setRows((prev) => prev.map((row) => (row.id === assistant.id ? { ...row, featured: !row.featured } : row)))
              }
              onDelete={(assistant) => openDeleteModal([assistant.id])}
            />

            {selectedIds.length > 0 && (
              <div className="mt-3 flex justify-end gap-3">
                <button
                  onClick={() => openDeleteModal(selectedIds)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  DELETE
                </button>
                <button
                  onClick={() => updateRows(selectedIds, (row) => ({ ...row, featured: true }))}
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-500 hover:bg-emerald-500/20"
                >
                  <Star className="h-4 w-4" />
                  ADD TO FEATURED
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateAssistantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        basePath="/dashboard/admin/assistants-library/create"
      />
      <DeleteAssistantModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        confirmationText={deleteConfirmText}
        onConfirmationTextChange={setDeleteConfirmText}
        onConfirm={handleConfirmDelete}
        deleteCount={deleteTargetIds.length}
      />
    </Container>
  );
}

function FilterDropdown({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex h-11 items-center justify-between rounded-xl border border-border bg-background px-3 text-sm text-foreground">
          {title}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[180px] rounded-xl border-border bg-card p-2">
        <div className="mb-1 px-2 text-xs text-muted-foreground">Status</div>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-foreground hover:bg-accent"
          >
            <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
            {option}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function DeleteAssistantModal({
  isOpen,
  onClose,
  confirmationText,
  onConfirmationTextChange,
  onConfirm,
  deleteCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  confirmationText: string;
  onConfirmationTextChange: (value: string) => void;
  onConfirm: () => void;
  deleteCount: number;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl border border-gray-50/50 bg-[#06090f] p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 text-red-500 hover:text-red-400">
          <X className="h-7 w-7" />
        </button>

        <h3 className="mb-5 text-2xl font-bold text-foreground">Delete Assistant</h3>

        <div className="mb-6 rounded-2xl border border-red-500 bg-red-500/15 p-5">
          <p className="mb-2 flex items-center gap-2 text-md font-semibold text-red-500">
            <AlertTriangle className="h-6 w-6" />
            This action cannot be undone.
          </p>
          <p className="text-sm text-muted-foreground">
            You are about to permanently delete "{deleteCount > 1 ? `${deleteCount} assistants` : "this assistant"}"
          </p>
        </div>

        <label className="mb-3 block text-xl font-semibold text-foreground">Type DELETE to confirm</label>
        <input
          value={confirmationText}
          onChange={(e) => onConfirmationTextChange(e.target.value)}
          placeholder="Type here"
          className="h-16 w-full rounded-2xl border border-border bg-background px-5 text-xl text-foreground outline-none focus:border-blue-500"
        />

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-border bg-[#111827] px-7 py-3 text-md cursor-pointer font-semibold text-foreground hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmationText !== "DELETE"}
            className="rounded-xl cursor-pointer bg-red-500 px-7 py-3 text-md font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
