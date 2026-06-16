"use client";

import React, { useState, useMemo } from "react";
import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";
import { Plus, Search, List, Grid, ChevronDown } from "lucide-react";

import { AssistantTable } from "../_components/AssistantTable";
import { AssistantCard } from "../_components/AssistantCard";
import { CreateAssistantModal } from "../_components/CreateAssistantModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { CustomPagination } from "@/src/components/dashboard/CustomPagination";
import { mockAssistants } from "@/src/constant/assistant";

export default function SharedAssistantsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const itemsPerPage = 11;

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [docTypeFilter, setDocTypeFilter] = useState("");
  const [careSettingFilter, setCareSettingFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  // View Toggle ('grid' by default for shared page based on mockup)
  const [view, setView] = useState<"list" | "grid">("grid");

  const totalPages = Math.ceil(mockAssistants.length / itemsPerPage) || 16;
  const currentItems = mockAssistants;

  const mockTemplates = Array(12)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      title: "Cardiology Discharge Template",
      desc: "Comprehensive discharge summary template for cardiac patients post-procedure.",
      category: "Cardiology",
      emoji: i === 0 ? "🧠" : "🧬",
      version: "v2.1",
      uses: "234 Usess",
    }));

  return (
    <Container key="shared-assistants">
      <div className="flex flex-col gap-6 w-full pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Heading title="Shared Assistants" />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-5 py-2.5 rounded-lg text-sm font-bold transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> CREATE NEW ASSISTANTS
          </button>
        </div>

        {/* Filters and Search Row */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-3 mt-2 w-full">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[300px]">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border/50 rounded-xl h-11 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-[2] w-full xl:w-auto justify-end">
            {/* Sort Dropdown */}
            <div className="flex-1 min-w-[160px]">
              <Select value={sortValue} onValueChange={setSortValue}>
                <SelectTrigger className="w-full h-11 bg-card border-border/50 rounded-xl text-muted-foreground font-semibold hover:bg-accent transition-colors">
                  <SelectValue placeholder="Sort: Name A—Z" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="a-z">Sort: Name A—Z</SelectItem>
                  <SelectItem value="z-a">Sort: Name Z—A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Dropdown */}
            <div className="flex-1 min-w-[120px]">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full h-11 bg-card border-border/50 rounded-xl text-muted-foreground font-semibold hover:bg-accent transition-colors">
                  <SelectValue placeholder="All Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Type</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Speciality Dropdown */}
            <div className="flex-1 min-w-[130px]">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full h-11 bg-card border-border/50 rounded-xl text-muted-foreground font-semibold hover:bg-accent transition-colors">
                  <SelectValue placeholder="Speciality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_specialty">All Specialty</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Docs Type Dropdown */}
            <div className="flex-1 min-w-[140px]">
              <Select value={docTypeFilter} onValueChange={setDocTypeFilter}>
                <SelectTrigger className="w-full h-11 bg-card border-border/50 rounded-xl text-muted-foreground font-semibold hover:bg-accent transition-colors">
                  <SelectValue placeholder="Docs Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Docs Type</SelectItem>
                  <SelectItem value="summary">Discharge Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Care Setting Dropdown */}
            <div className="flex-1 min-w-[140px]">
              <Select value={careSettingFilter} onValueChange={setCareSettingFilter}>
                <SelectTrigger className="w-full h-11 bg-card border-border/50 rounded-xl text-muted-foreground font-semibold hover:bg-accent transition-colors">
                  <SelectValue placeholder="Care Setting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Care Setting</SelectItem>
                  <SelectItem value="ed">Emergency Dept</SelectItem>
                  <SelectItem value="ward">Ward</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language Dropdown */}
            <div className="flex-1 min-w-[150px]">
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full h-11 bg-card border-border/50 rounded-xl text-muted-foreground font-semibold hover:bg-accent transition-colors">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hu">Hungarian</SelectItem>
                </SelectContent>
              </Select>
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

        {/* View Area (List or Grid) */}
        <div className="w-full mt-2">
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
          basePath="/dashboard/user/my-assistants/shared/create"
        />
      </div>
    </Container>
  );
}
