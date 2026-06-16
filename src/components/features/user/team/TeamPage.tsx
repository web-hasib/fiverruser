"use client";

import React, { useState, useMemo } from "react";
import {
    Grid3X3,
    List,
    Plus,
    ChevronDown,
    FileText,
    Calendar,
    X,
} from "lucide-react";
import Heading from "@/src/components/Heading";
import { cn } from "@/src/lib/utils";
import { SearchInput } from "@/src/components/dashboard/SearchInput";
import { Button } from "@/src/components/ui/button";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamMemberDetail } from "./TeamMemberDetail";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";

import { TeamMember } from "./types";
import { DUMMY_TEAM_MEMBERS, ROLES, PROFESSIONS, DEPARTMENTS, SPECIALTIES } from "./data";
import { AddEditTeamMemberModal, TeamMemberFormData } from "./AddEditTeamMemberModal";

const TeamPage = () => {
    // ─── State ────────────────────────────────────────────────────────────────
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("Name A—Z");
    const [roleFilter, setRoleFilter] = useState("All Role");
    const [professionFilter, setProfessionFilter] = useState("All Profession");
    const [departmentFilter, setDepartmentFilter] = useState("All Department");
    const [specialtyFilter, setSpecialtyFilter] = useState("All Specialty");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);

    // ─── Filtered Data ────────────────────────────────────────────────────────
    const filteredMembers = useMemo(() => {
        let result = DUMMY_TEAM_MEMBERS.filter(member => {
            const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
            const matchesSearch = fullName.includes(search.toLowerCase()) ||
                member.id.toLowerCase().includes(search.toLowerCase());
            const matchesRole = roleFilter === "All Role" || member.role === roleFilter;
            const matchesProfession = professionFilter === "All Profession" || member.profession === professionFilter;
            const matchesDepartment = departmentFilter === "All Department" || member.department === departmentFilter;
            const matchesSpecialty = specialtyFilter === "All Specialty" || member.specialty === specialtyFilter;

            return matchesSearch && matchesRole && matchesProfession && matchesDepartment && matchesSpecialty;
        });

        // Sorting
        if (sortOrder === "Name A—Z") {
            result.sort((a, b) => (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName));
        } else if (sortOrder === "Name Z—A") {
            result.sort((a, b) => (b.firstName + b.lastName).localeCompare(a.firstName + a.lastName));
        }

        return result;
    }, [search, roleFilter, professionFilter, departmentFilter, specialtyFilter, sortOrder]);


    // ─── Handlers ─────────────────────────────────────────────────────────────
    const handleAddMember = (data: TeamMemberFormData) => {
        console.log("Add Member:", data);
        setIsAddModalOpen(false);
    };

    const handleEditMember = (data: TeamMemberFormData) => {
        console.log("Update Member:", data);
        setIsEditModalOpen(false);
        setMemberToEdit(null);
    };

    const openEditModal = (member: TeamMember) => {
        setMemberToEdit(member);
        setIsEditModalOpen(true);
    };

    // ─── Table Columns ────────────────────────────────────────────────────────
    const columns: ColumnDef<TeamMember>[] = [
        {
            header: "Member Name",
            cell: (m) => (
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold text-xs">
                        {m.firstName.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-primary-foreground">{m.firstName} {m.lastName}</p>
                        <p className="text-xs text-primary-foreground/40">{m.id}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Profession",
            accessorKey: "profession"
        },
        {
            header: "Specialty",
            accessorKey: "specialty"
        },
        {
            header: "Department",
            accessorKey: "department"
        },
        {
            header: "Role",
            accessorKey: "role"
        },
        {
            header: "Status",
            cell: (m) => (
                <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                    m.status === "on-duty"  ? "bg-emerald-500/10 text-emerald-500" :
                    m.status === "on-call"  ? "bg-blue-500/10 text-blue-500" :
                    m.status === "on-or"    ? "bg-amber-500/10 text-amber-500" :
                    "bg-rose-500/10 text-rose-500"
                )}>
                    {m.status.replace(/-/g, " ")}
                </span>
            )
        },
        {
            header: "Action",
            cell: (m) => (
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setSelectedMember(m)}
                        className="text-xs font-bold text-blue-500 hover:underline"
                    >
                        View Details
                    </button>
                </div>
            )
        }
    ];

    return (
        <DashboardMainContainer>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <Heading title="Team" />
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline"
                            className="border-primary-foreground/10 bg-primary/50 hover:bg-primary-foreground/5 text-primary-foreground/70 gap-2 font-bold h-10 px-4 rounded-xl"
                        >
                            <FileText size={18} />
                            EXPORT PDF
                        </Button>
                        <Button 
                            variant="outline"
                            className="border-primary-foreground/10 bg-primary/50 hover:bg-primary-foreground/5 text-primary-foreground/70 gap-2 font-bold h-10 px-4 rounded-xl"
                        >
                            <Calendar size={18} />
                            DUTY SCHEDULE
                        </Button>
                        <Button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 font-bold h-10 px-6 rounded-xl shadow-lg shadow-blue-500/20"
                        >
                            <Plus size={18} />
                            ADD MEMBER
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {/* Search */}
                    <div className="flex-1 min-w-[300px]">
                        <SearchInput
                            placeholder="Search by name, ID, diagnosis, date..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            containerClassName="mb-0"
                            className="w-full"
                        />
                    </div>

                    {/* Filters Row */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <FilterDropdown 
                            label="Specialty" 
                            value={specialtyFilter} 
                            options={SPECIALTIES} 
                            onChange={setSpecialtyFilter} 
                        />
                        <FilterDropdown 
                            label="Priority" 
                            value={professionFilter} 
                            options={PROFESSIONS} 
                            onChange={setProfessionFilter} 
                        />
                        <FilterDropdown 
                            label="Assigned" 
                            value={roleFilter} 
                            options={ROLES} 
                            onChange={setRoleFilter} 
                        />

                        {/* Clear All */}
                        <button 
                            className="px-3 py-2 text-rose-500 hover:bg-rose-50 text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5"
                            onClick={() => {
                                setRoleFilter("All Role");
                                setProfessionFilter("All Profession");
                                setSpecialtyFilter("All Specialty");
                            }}
                        >
                            <X className="size-4" />
                            Clear all
                        </button>
                    </div>

                    {/* Sort & View Toggle */}
                    <div className="flex items-center gap-2 ml-auto">
                        <FilterDropdown 
                            label="Sort:" 
                            value={sortOrder} 
                            options={["Name A—Z", "Name Z—A"]} 
                            onChange={setSortOrder} 
                            showLabelWhenSelected
                        />

                        <div className="flex items-center p-1 bg-card border border-border/50 rounded-xl">
                            <button
                                onClick={() => setView("list")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    view === "list" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <List className="size-4" />
                            </button>
                            <button
                                onClick={() => setView("grid")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    view === "grid" ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Grid3X3 className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {view === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredMembers.map((member) => (
                            <TeamMemberCard 
                                key={member.id} 
                                member={member} 
                                onClick={() => setSelectedMember(member)}
                                isSelected={selectedMember?.id === member.id}
                            />
                        ))}
                    </div>
                ) : (
                    <DataTable columns={columns} data={filteredMembers} className="rounded-2xl" />
                )}
            </div>

            {/* Modals */}
            {selectedMember && (
                <TeamMemberDetail 
                    member={selectedMember} 
                    onClose={() => setSelectedMember(null)}
                    onEdit={() => {
                        const member = selectedMember;
                        setSelectedMember(null);
                        openEditModal(member);
                    }}
                />
            )}

            <AddEditTeamMemberModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddMember}
            />

            {memberToEdit && (
                <AddEditTeamMemberModal 
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setMemberToEdit(null);
                    }}
                    onSave={handleEditMember}
                    member={memberToEdit}
                />
            )}
        </DashboardMainContainer>
    );
};

// ─── Helper Components ──────────────────────────────────────────────────────
const FilterDropdown = ({
    label,
    value,
    options,
    onChange,
    showLabelWhenSelected = false
}: {
    label: string;
    value: string;
    options: (string | { value: string; label: string })[];
    onChange: (val: string) => void;
    showLabelWhenSelected?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isDefault = value.startsWith("All");
    const displayValue = isDefault ? value : (showLabelWhenSelected ? `${label} ${value}` : value);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-primary border border-primary-foreground/20 rounded-lg text-sm hover:border-primary-foreground/30 transition-colors whitespace-nowrap"
            >
                {isDefault ? (
                    <span className="text-primary-foreground/60">{displayValue}</span>
                ) : (
                    <span className="text-primary-foreground">{displayValue}</span>
                )}
                <ChevronDown size={14} className={cn("text-primary-foreground/50 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 min-w-[160px] bg-primary border border-primary-foreground/20 rounded-lg shadow-xl z-50 py-1">
                        {options.map((opt) => {
                            const optValue = typeof opt === 'string' ? opt : opt.value;
                            const optLabel = typeof opt === 'string' ? opt : opt.label;
                            
                            return (
                                <button
                                    key={optValue}
                                    onClick={() => { onChange(optValue); setIsOpen(false); }}
                                    className={cn(
                                        "w-full px-4 py-2 text-left text-sm hover:bg-primary-foreground/10 transition-colors",
                                        value === optValue ? "text-blue-400 font-bold" : "text-primary-foreground/80"
                                    )}
                                >
                                    {optLabel}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default TeamPage;
