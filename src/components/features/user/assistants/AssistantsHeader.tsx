"use client";

import React from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";

interface AssistantsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  languageFilter: string;
  setLanguageFilter: (val: string) => void;
  specialtyFilter: string;
  setSpecialtyFilter: (val: string) => void;
  isFavoriteFilter: boolean;
  setIsFavoriteFilter: (val: boolean) => void;
  onCreateNew?: () => void;
  showCreateButton?: boolean;
}

const FilterDropdown = ({
  placeholder,
  value,
  onValueChange,
  options,
}: {
  placeholder: string;
  value: string;
  onValueChange: (val: string) => void;
  options: { label: string; value: string }[];
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className="w-[140px] bg-primary border-none text-primary-foreground/70 text-xs h-10 px-3 hover:bg-primary-foreground/5 transition-colors">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-primary border-primary-foreground/10 text-primary-foreground">
      <SelectItem value="all">{placeholder}</SelectItem>
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const AssistantsHeader = ({
  searchQuery,
  setSearchQuery,
  languageFilter,
  setLanguageFilter,
  specialtyFilter,
  setSpecialtyFilter,
  isFavoriteFilter,
  setIsFavoriteFilter,
  onCreateNew,
  showCreateButton = true,
}: AssistantsHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-primary/40 backdrop-blur-md p-4 rounded-2xl border border-primary-foreground/10 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative min-w-[300px]">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/40"
          size={18}
        />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-primary/60 border border-primary-foreground/10 text-primary-foreground text-sm rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-foreground/20 transition-all placeholder:text-primary-foreground/30"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mr-2 leading-none uppercase tracking-wider font-semibold">
          <SlidersHorizontal size={18} /> Filter:
        </div>

        <FilterDropdown
          placeholder="language"
          value={languageFilter}
          onValueChange={setLanguageFilter}
          options={[
            { label: "English", value: "en" },
            { label: "Spanish", value: "es" },
          ]}
        />

        <button
          onClick={() => setIsFavoriteFilter(!isFavoriteFilter)}
          className={`flex items-center gap-2 border-none text-xs h-10 px-4 rounded-lg transition-colors ${
            isFavoriteFilter
              ? "bg-primary-foreground/10 text-primary-foreground"
              : "bg-primary text-primary-foreground/70 hover:bg-primary-foreground/5"
          }`}
        >
          Favorite
        </button>

        <FilterDropdown
          placeholder="Specialty"
          value={specialtyFilter}
          onValueChange={setSpecialtyFilter}
          options={[
            { label: "Cardiology", value: "Cardiology" },
            { label: "Pediatrics", value: "Pediatrics" },
          ]}
        />

        {showCreateButton && (
          <Button
            onClick={onCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 h-10 px-5 rounded-xl font-bold gap-2 shrink-0 ml-2"
          >
            <Plus className="h-5 w-5 stroke-[2.5]" />
            Create New Assistant
          </Button>
        )}
      </div>
    </div>
  );
};
