import React, { useState } from "react";
import { Search, ChevronDown, CalendarIcon, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/src/components/ui/command";
import { Calendar } from "@/src/components/ui/calendar";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";

export interface PatientTableFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    department: string;
    onDepartmentChange: (value: string) => void;
    team: string;
    onTeamChange: (value: string) => void;
    gender: string;
    onGenderChange: (value: string) => void;
    userType: string;
    onUserTypeChange: (value: string) => void;
    fromDate: Date | undefined;
    onFromDateChange: (date: Date | undefined) => void;
    toDate: Date | undefined;
    onToDateChange: (date: Date | undefined) => void;
}

const DEPARTMENTS = [
    "General Medicine",
    "Neurology",
    "Dentistry",
    "Pharmacy / Medication",
    "Pulmonology (Lungs)"
];

const TEAMS = [
    "St. Mary's Hospital",
    "City Medical Center",
    "Green Valley Clinic",
    "Berlin Medical"
];

export default function PatientTableFilters({
    search,
    onSearchChange,
    department,
    onDepartmentChange,
    team,
    onTeamChange,
    gender,
    onGenderChange,
    userType,
    onUserTypeChange,
    fromDate,
    onFromDateChange,
    toDate,
    onToDateChange,
}: PatientTableFiltersProps) {
    const [departmentOpen, setDepartmentOpen] = useState(false);

    return (
        <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Search Input */}
            <div className="relative w-full sm:w-[280px]">
                <input
                    type="text"
                    placeholder="Name, DOB, Patient ID ..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-card border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-muted-foreground transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* Department Combobox */}
            <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={departmentOpen} className="min-w-[160px] justify-between bg-card border-border hover:bg-card hover:text-foreground">
                        {department}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0 border-border bg-card">
                    <Command className="bg-transparent">
                        <CommandInput placeholder="Search department" className="h-10" />
                        <CommandList>
                            <CommandEmpty>No department found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem onSelect={() => { onDepartmentChange("All Depts."); setDepartmentOpen(false); }}>
                                    All Depts.
                                </CommandItem>
                                {DEPARTMENTS.map((dept) => (
                                    <CommandItem key={dept} value={dept} onSelect={(currentValue) => { onDepartmentChange(currentValue); setDepartmentOpen(false); }}>
                                        {dept}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Team Select */}
            <Select value={team} onValueChange={onTeamChange}>
                <SelectTrigger className="w-[160px] bg-card border-border focus:ring-1 focus:ring-blue-500/50">
                    <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    <SelectItem value="All Teams">All Teams</SelectItem>
                    {TEAMS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
            </Select>

            {/* Gender Select */}
            <Select value={gender} onValueChange={onGenderChange}>
                <SelectTrigger className="w-[140px] bg-card border-border focus:ring-1 focus:ring-blue-500/50">
                    <SelectValue placeholder="All Gender" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    <SelectItem value="All Gender">All Gender</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>

            {/* Users Select */}
            <Select value={userType} onValueChange={onUserTypeChange}>
                <SelectTrigger className="w-[140px] bg-card border-border focus:ring-1 focus:ring-blue-500/50">
                    <SelectValue placeholder="All Users" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    <SelectItem value="All Users">All Users</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>

            {/* Date Pickers */}
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-[140px] justify-between bg-card border-border font-normal text-left hover:bg-card hover:text-foreground", !fromDate && "text-muted-foreground")}>
                            {fromDate ? format(fromDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-border bg-card" align="start">
                        <Calendar mode="single" selected={fromDate} onSelect={onFromDateChange} initialFocus />
                    </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">—</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-[140px] justify-between bg-card border-border font-normal text-left hover:bg-card hover:text-foreground", !toDate && "text-muted-foreground")}>
                            {toDate ? format(toDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-border bg-card" align="start">
                        <Calendar mode="single" selected={toDate} onSelect={onToDateChange} initialFocus />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
