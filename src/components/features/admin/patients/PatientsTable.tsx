import React from "react";
import { cn } from "@/src/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";

export interface Patient {
    id: string;
    patientId: string;
    name: string;
    avatar?: string;
    createdBy: string;
    createdByAvatar?: string;
    category: string;
    linkedCase: number;
    lastActivity: string;
    status: "Active" | "Expiring Soon" | "Expired";
    expiryDate: string;
}

interface PatientsTableProps {
    patients: Patient[];
}

export default function PatientsTable({ patients }: PatientsTableProps) {
    return (
        <div className="rounded-xl border border-border overflow-hidden bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Patient ID</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Patient Name</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Created By</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Category</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Linked Case</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Last Activity</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Status</TableHead>
                        <TableHead className="py-4 px-6 font-semibold opacity-70">Expiry Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <TableRow key={patient.id} className="border-border hover:bg-muted/50 transition-colors">
                                <TableCell className="py-4 px-6 text-sm">{patient.patientId}</TableCell>
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold">
                                            {patient.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium">{patient.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-500/10 text-zinc-500 flex items-center justify-center text-xs font-bold uppercase transition-colors">
                                            {patient.createdBy.charAt(0)}
                                        </div>
                                        <span className="text-sm">{patient.createdBy}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm">{patient.category}</TableCell>
                                <TableCell className="py-4 px-6 text-sm font-bold">{patient.linkedCase}</TableCell>
                                <TableCell className="py-4 px-6 text-sm opacity-80">{patient.lastActivity}</TableCell>
                                <TableCell className="py-4 px-6">
                                    <span
                                        className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            patient.status === "Active" && "bg-emerald-500/10 text-emerald-500",
                                            patient.status === "Expiring Soon" && "bg-amber-500/10 text-amber-500",
                                            patient.status === "Expired" && "bg-red-500/10 text-red-500"
                                        )}
                                    >
                                        {patient.status}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm opacity-80">{patient.expiryDate}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                                No patients found matching your filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
