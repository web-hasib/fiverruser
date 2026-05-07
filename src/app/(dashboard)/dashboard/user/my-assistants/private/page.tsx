"use client";

import React, { useState, useMemo } from "react";
import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";
import { Plus, Search, ChevronDown, List, Grid } from "lucide-react";
import { AssistantCard } from "../_components/AssistantCard";

import { Stats } from "../_components/Stats";
import { AssistantTable } from "../_components/AssistantTable";
import { CreateAssistantModal } from "../_components/CreateAssistantModal";

import { CustomPagination } from "@/src/components/dashboard/CustomPagination";
import { mockAssistants } from "@/src/constant/assistant";

export default function PrivateAssistantsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const itemsPerPage = 11;

  // Filtering states (ready for API hookup)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("name-asc");
  const [typeFilter, setTypeFilter] = useState("all");
  const [docTypeFilter, setDocTypeFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [careSettingFilter, setCareSettingFilter] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filteredAssistants = useMemo(() => {
    let temp = mockAssistants;
    if (activeTab === "private") temp = temp.filter(a => a.visibility === "Private");
    if (activeTab === "public") temp = temp.filter(a => a.visibility === "Public");
    // (In reality favoured would be a boolean on the API model)

    if (searchQuery) {
      temp = temp.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (typeFilter !== "all") {
      temp = temp.filter(a => a.type.toLowerCase() === typeFilter.toLowerCase());
    }

    return temp;
  }, [activeTab, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredAssistants.length / itemsPerPage) || 16;
  const currentItems = filteredAssistants; // Mocking pagination slice here

  const tabs = [
    { id: "all", label: "All Assistants", count: 32 },
    { id: "private", label: "Private Assistants", count: 12 },
    { id: "public", label: "Public Assistants", count: 12 },
    { id: "favourited", label: "Favourited", count: 12 },
  ];

  return (
    <Container key="private-assistants" className="p-0 pb-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Heading title="Private Assistants" />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm px-5 py-2.5 rounded-lg text-sm font-bold transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> CREATE NEW ASSISTANTS
        </button>
      </div>

      {/* Stats Row */}
      <Stats
        totalAssistants={214}
        usesThisMonth={360}
        communityShared={8}
        favourited={4}
      />

      {/* Filters and Search Row */}
      <div className="flex flex-col xl:flex-row items-center gap-3 w-full">
        {/* Search */}
        <div className="relative flex-1 min-w-[300px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, patient id"
            className="w-full bg-card border border-border/50 rounded-xl h-11 pl-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap flex-[2] w-full xl:w-auto justify-end">
          {/* Sort Dropdown */}
          <div className="relative flex-1 min-w-[160px]">
            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className="appearance-none bg-card border border-border/50 rounded-xl h-11 w-full px-4 text-sm text-muted-foreground font-semibold hover:bg-accent focus:outline-none cursor-pointer transition-colors"
            >
              <option value="name-asc">Sort: Name A—Z</option>
              <option value="name-desc">Sort: Name Z—A</option>
              <option value="date-new">Newest First</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>

          {/* Type Dropdown */}
          <div className="relative flex-1 min-w-[120px]">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-card border border-border/50 rounded-xl h-11 w-full px-4 text-sm text-muted-foreground font-semibold hover:bg-accent focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">Type</option>
              <option value="outpatient">Outpatient</option>
              <option value="emergency">Emergency</option>
              <option value="follow-up">Follow-up</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>

          {/* Documentum Type Dropdown */}
          <div className="relative flex-1 min-w-[180px]">
            <select
              value={docTypeFilter}
              onChange={(e) => setDocTypeFilter(e.target.value)}
              className="appearance-none bg-card border border-border/50 rounded-xl h-11 w-full px-4 text-sm text-muted-foreground font-semibold hover:bg-accent focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">Documentum Type</option>
              <option value="discharge">Discharge Summary</option>
              <option value="example2">Example 2</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>

          {/* Specialty Dropdown */}
          <div className="relative flex-1 min-w-[140px]">
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="appearance-none bg-card border border-border/50 rounded-xl h-11 w-full px-4 text-sm text-muted-foreground font-semibold hover:bg-accent focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">All Specialty</option>
              <option value="nursing">Nursing</option>
              <option value="medical">Medical</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>

          {/* Care Setting Dropdown */}
          <div className="relative flex-1 min-w-[140px]">
            <select
              value={careSettingFilter}
              onChange={(e) => setCareSettingFilter(e.target.value)}
              className="appearance-none bg-card border border-border/50 rounded-xl h-11 w-full px-4 text-sm text-muted-foreground font-semibold hover:bg-accent focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">Care setting</option>
              <option value="clinic">Clinic</option>
              <option value="hospital">Hospital</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-card rounded-xl border border-border/50 p-1 h-11">
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-lg transition ${view === "list" ? "bg-accent text-foreground shadow-sm" : "hover:bg-accent text-muted-foreground"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-lg transition ${view === "grid" ? "bg-accent text-foreground shadow-sm" : "hover:bg-accent text-muted-foreground"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>



      {/* Tabs Row inline */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${isActive
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "bg-card border-border/50 text-muted-foreground hover:bg-blue-600/20 hover:border-blue-600/30 hover:text-foreground"
                }`}
            >
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive
                  ? "bg-white text-blue-600"
                  : "bg-accent border border-border/50 text-muted-foreground"
                  }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table/Grid Area */}
      <div className="w-full">
        {view === "list" ? (
          <AssistantTable assistants={currentItems} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
            {currentItems.map((assistant) => (
              <AssistantCard key={assistant.id} assistant={assistant} />
            ))}
          </div>
        )}
      </div>

      {/* Footer info & Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-2 gap-4">
        <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          Showing
          <div className="relative">
            <select className="appearance-none bg-card border border-border/50 text-foreground text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
              <option value="11">11</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          out of 1,450
        </div>

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={() => { }}
        />
      </div>

      {/* Modals */}
      <CreateAssistantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Container>
  );
}
