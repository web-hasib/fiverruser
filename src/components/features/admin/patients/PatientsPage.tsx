"use client";

import Container from "@/src/components/Container";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import { TableToolbar } from "@/src/components/dashboard/TableToolbar";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import DataPagination from "@/src/components/ui/DataPagination";
import { Download, Edit2, Mars, Trash2, Venus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type PatientRecord = {
    id: string;
    name: string;
    patientId: string;
    dob: string;
    gender: "Male" | "Female";
    department: string;
    team: string;
    sessions: number;
    lastVisit: string;
};

const DUMMY_PATIENTS: PatientRecord[] = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    name: "John Fisher",
    patientId: `P - ${String(i + 1).padStart(3, '0')}`,
    dob: "1972-09-03",
    gender: i % 3 === 2 ? "Female" : "Male",
    department: i % 4 === 1 ? "Cardlology" : "Cardiology",
    team: "Dhaka Medical",
    sessions: 22 + (i % 5),
    lastVisit: "2026-03-11",
}));

export default function PatientsPage() {
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filters state
    const [department, setDepartment] = useState("All Depts.");
    const [team, setTeam] = useState("All Teams");
    const [gender, setGender] = useState("All Gender");
    const [userType, setUserType] = useState("All Users");
    const [sortOrder, setSortOrder] = useState("Newest");
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    const filteredPatients = useMemo(() => {
        const q = search.toLowerCase();
        return DUMMY_PATIENTS.filter(p =>
            !q ||
            p.name.toLowerCase().includes(q) ||
            p.patientId.toLowerCase().includes(q)
        );
    }, [search]);

    const totalPages = Math.max(1, Math.ceil(filteredPatients.length / pageSize));
    const paginatedData = filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const allVisibleSelected = paginatedData.length > 0 && paginatedData.every(p => selectedIds.includes(p.id));

    const toggleRow = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    };

    const toggleAllVisible = (checked: boolean) => {
        if (checked) {
            const newIds = new Set(selectedIds);
            paginatedData.forEach(p => newIds.add(p.id));
            setSelectedIds(Array.from(newIds));
        } else {
            const visibleIds = paginatedData.map(p => p.id);
            setSelectedIds(selectedIds.filter(id => !visibleIds.includes(id)));
        }
    };

    const columns: ColumnDef<PatientRecord>[] = [
        {
            header: (
                <div className="flex items-center pt-1.5">
                    <Checkbox
                        checked={allVisibleSelected}
                        onCheckedChange={(c) => toggleAllVisible(Boolean(c))}
                        className="border-muted-foreground data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                </div>
            ) as any,
            cell: (patient) => (
                <div className="flex items-center pt-1">
                    <Checkbox
                        checked={selectedIds.includes(patient.id)}
                        onCheckedChange={() => toggleRow(patient.id)}
                        className="border-muted-foreground data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                </div>
            ),
        },
        {
            header: "User",
            cell: (patient) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{patient.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{patient.patientId}</span>
                </div>
            ),
        },
        {
            header: "DOB",
            cell: (patient) => <span className="font-bold text-foreground tracking-wider">{patient.dob}</span>,
        },
        {
            header: "Gender",
            cell: (patient) => (
                <div className="flex items-center gap-2">
                    {patient.gender === "Male" ? (
                        <Mars className="w-4 h-4 text-foreground opacity-80" />
                    ) : (
                        <Venus className="w-4 h-4 text-foreground opacity-80" />
                    )}
                    <span className="text-sm font-bold text-foreground">{patient.gender}</span>
                </div>
            ),
        },
        { header: "Department", accessorKey: "department" },
        { header: "Team", accessorKey: "team" },
        { header: "Sessions", accessorKey: "sessions" },
        { header: "Last Visit", accessorKey: "lastVisit" },
        {
            header: "Actions",
            cell: (patient) => (
                <div className="flex items-center gap-3">
                    <Link href={`/dashboard/admin/patients/${patient.id}`} className="flex items-center gap-2 bg-transparent border border-border text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                    </Link>
                    <Button className="flex items-center justify-center bg-transparent border border-rose-500/50 text-rose-500 hover:bg-rose-500/10 w-8 h-8 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Container>
            <div className="">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <Heading title="Patients" />
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-transparent border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <button className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500 text-emerald-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors">
                            <Download className="w-4 h-4" />
                            XLSX
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <TableToolbar
                    searchQuery={search}
                    onSearchChange={setSearch}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                    sortOptions={[
                        { label: "Newest", value: "Newest" },
                        { label: "Oldest", value: "Oldest" },
                        { label: "A-Z", value: "A-Z" },
                    ]}
                    filters={[
                        {
                            value: department,
                            onChange: setDepartment,
                            options: [
                                { label: "All Depts.", value: "All Depts." },
                                { label: "Cardiology", value: "Cardiology" },
                                { label: "Neurology", value: "Neurology" },
                            ],
                            placeholder: "Dept"
                        },
                        {
                            value: team,
                            onChange: setTeam,
                            options: [
                                { label: "All Teams", value: "All Teams" },
                                { label: "Dhaka Medical", value: "Dhaka Medical" },
                                { label: "City Medical", value: "City Medical" },
                            ],
                            placeholder: "Team"
                        },
                        {
                            value: gender,
                            onChange: setGender,
                            options: [
                                { label: "All Gender", value: "All Gender" },
                                { label: "Male", value: "Male" },
                                { label: "Female", value: "Female" },
                            ],
                            placeholder: "Gender"
                        },
                        {
                            value: userType,
                            onChange: setUserType,
                            options: [
                                { label: "All Users", value: "All Users" },
                                { label: "Patient", value: "Patient" },
                                { label: "Doctor", value: "Doctor" },
                            ],
                            placeholder: "User Type"
                        }
                    ]}
                    selectedCount={selectedIds.length}
                    onBulkDelete={() => {
                        console.log("Bulk Delete:", selectedIds);
                        setSelectedIds([]);
                    }}
                    onSelectAll={() => toggleAllVisible(!allVisibleSelected)}
                    isAllSelected={allVisibleSelected}
                />

                {/* Table */}
                <div className="rounded-xl overflow-hidden bg-card mt-5">
                    <DataTable
                        columns={columns}
                        data={paginatedData}
                        className="border-none bg-transparent"
                    />
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <DataPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredPatients.length}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 15, 20, 50]}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>
        </Container>
    );
}
