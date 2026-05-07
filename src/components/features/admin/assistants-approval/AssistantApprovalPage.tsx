"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Calendar } from "@/src/components/ui/calendar";
import {
  APPROVAL_DEPARTMENTS,
  APPROVAL_TYPES,
  DUMMY_APPROVAL_RECORDS,
  type AssistantApprovalRecord,
  type AssistantType,
} from "./approvalDummyData";
import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";

function formatDateLabel(value?: Date) {
  if (!value) return "mm/dd/yyyy";
  return value.toLocaleDateString("en-US");
}

export default function AssistantApprovalPage() {
  const [records, setRecords] = useState<AssistantApprovalRecord[]>(DUMMY_APPROVAL_RECORDS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<AssistantType | "All Type">("All Type");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All Dept");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  const filteredDepartments = useMemo(() => {
    const query = departmentSearch.trim().toLowerCase();
    if (!query) return APPROVAL_DEPARTMENTS;
    return APPROVAL_DEPARTMENTS.filter((dept) => dept.toLowerCase().includes(query));
  }, [departmentSearch]);

  const filteredRows = useMemo(() => {
    const query = search.toLowerCase().trim();
    return records.filter((item) => {
      const searchable = `${item.assistant} ${item.submittedBy} ${item.department}`.toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesType = typeFilter === "All Type" || item.type === typeFilter;
      const matchesDepartment = departmentFilter === "All Dept" || item.department === departmentFilter;
      const submitted = new Date(item.submittedDate).getTime();
      const fromTime = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : undefined;
      const toTime = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : undefined;
      const matchesFrom = fromTime === undefined || submitted >= fromTime;
      const matchesTo = toTime === undefined || submitted <= toTime;
      return matchesSearch && matchesType && matchesDepartment && matchesFrom && matchesTo;
    });
  }, [records, search, typeFilter, departmentFilter, fromDate, toDate]);

  const pendingCount = records.filter((item) => item.status === "Pending").length;
  const allVisibleSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedIds.includes(row.id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const toggleAllVisible = (checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...filteredRows.map((row) => row.id)])));
      return;
    }
    setSelectedIds((prev) => prev.filter((id) => !filteredRows.some((row) => row.id === id)));
  };

  const applyDecision = (ids: string[], status: "Approved" | "Rejected") => {
    setRecords((prev) => prev.map((item) => (ids.includes(item.id) ? { ...item, status } : item)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  return (
    <Container>
      <div className="">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Heading title="Assistant Approval" />
            <span className="rounded-full border border-red-500/35 bg-red-500/10 px-2.5 py-0.5 text-xs text-red-400">
              {pendingCount} Pending
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                applyDecision(
                  records.filter((item) => item.status === "Pending").map((item) => item.id),
                  "Approved",
                )
              }
              className="rounded-lg bg-[#2563eb] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#1d4ed8]"
            >
              Approve All
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-accent">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-3 sm:p-4">
          <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-[1.7fr_auto_auto_auto]">
            <div className="flex h-12 items-center rounded-xl border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="User, action, entity, IP"
                className="w-full border-0 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex h-12 min-w-[124px] items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-foreground">
                  {typeFilter}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[260px] rounded-2xl border-border bg-card p-3">
                <h4 className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Type</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setTypeFilter("All Type")}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
                  >
                    All Type
                  </button>
                  {APPROVAL_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex h-12 min-w-[124px] items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-foreground">
                  {departmentFilter}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[340px] rounded-2xl border-border bg-card p-4">
                <h4 className="mb-3 text-xl font-semibold text-foreground">Department</h4>
                <div className="mb-3 flex h-12 items-center rounded-xl border border-border bg-background px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={departmentSearch}
                    onChange={(e) => setDepartmentSearch(e.target.value)}
                    placeholder="Search by name, patient id"
                    className="w-full border-0 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="max-h-56 space-y-1 overflow-y-auto">
                  <button
                    onClick={() => setDepartmentFilter("All Dept")}
                    className="w-full rounded-lg px-2 py-2 text-left text-base text-foreground hover:bg-accent"
                  >
                    All Dept
                  </button>
                  {filteredDepartments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setDepartmentFilter(dept)}
                      className="w-full rounded-lg px-2 py-2 text-left text-base text-foreground hover:bg-accent"
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="inline-flex h-12 w-[150px] items-center justify-between rounded-xl border border-border bg-background px-3 text-sm text-muted-foreground">
                    {formatDateLabel(fromDate)}
                    <CalendarDays className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto rounded-2xl border-border bg-card p-2">
                  <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
                </PopoverContent>
              </Popover>

              <span className="text-muted-foreground">-</span>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="inline-flex h-12 w-[150px] items-center justify-between rounded-xl border border-border bg-background px-3 text-sm text-muted-foreground">
                    {formatDateLabel(toDate)}
                    <CalendarDays className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto rounded-2xl border-border bg-card p-2">
                  <Calendar mode="single" selected={toDate} onSelect={setToDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="bg-background">
                  <th className="w-10 px-3 py-3 text-left">
                    <Checkbox
                      checked={allVisibleSelected}
                      onCheckedChange={(checked) => toggleAllVisible(Boolean(checked))}
                      className="border-gray-50/50 data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb]"
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Assistant</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Submitted By</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Dept/ Team</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Submitted</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Preview</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-muted-foreground">Decision</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => {
                  const checked = selectedIds.includes(row.id);
                  return (
                    <tr key={row.id} className="border-t border-border/70 hover:bg-background/70">
                      <td className="px-3 py-3">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleRow(row.id)}
                          className="border-gray-50/50 data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb]"
                        />
                      </td>
                      <td className="px-3 py-3 text-sm text-foreground">{row.assistant}</td>
                      <td className="px-3 py-3">
                        <span className="inline-flex rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-3 py-1 text-xs text-[#60a5fa]">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-foreground">{row.submittedBy}</td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{row.department}</td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{row.submittedDate}</td>
                      <td className="px-3 py-3">
                        <button className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:bg-accent">
                          Preview
                        </button>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => applyDecision([row.id], "Approved")}
                            className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-1.5 text-emerald-500 hover:bg-emerald-500/20"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => applyDecision([row.id], "Rejected")}
                            className="rounded-md border border-red-500/30 bg-red-500/10 p-1.5 text-red-500 hover:bg-red-500/20"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filteredRows.length && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-sm text-muted-foreground">
                      No assistants found for current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedIds.length > 1 && (
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-2xl">
            <button
              onClick={() => applyDecision(selectedIds, "Rejected")}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            <button
              onClick={() => applyDecision(selectedIds, "Approved")}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-500 hover:bg-emerald-500/20"
            >
              <Check className="h-4 w-4" />
              Approve
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
