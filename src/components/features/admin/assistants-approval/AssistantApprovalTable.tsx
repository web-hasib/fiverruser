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
import { Eye, Check, X } from "lucide-react";

export interface AssistantApprovalItem {
    id: string;
    name: string;
    createdBy: string;
    specialty: string;
    language: string;
    submittedOn: string;
    status: "Pending"  | "Rejected" | "Approved";
}

interface AssistantApprovalTableProps {
    assistants: AssistantApprovalItem[];
    onView?: (assistant: AssistantApprovalItem) => void;
    onApprove?: (assistant: AssistantApprovalItem) => void;
    onReject?: (assistant: AssistantApprovalItem) => void;
}

export default function AssistantApprovalTable({
    assistants,
    onView,
    onApprove,
    onReject,
}: AssistantApprovalTableProps) {
    return (
        <div className="rounded-xl border border-border overflow-hidden bg-[#0B0E14]">
            <Table>
                <TableHeader className="bg-[#151921]/50">
                    <TableRow className="hover:bg-transparent border-border/50">
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest">Assistant</TableHead>
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest">Type</TableHead>
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest">Submitted By</TableHead>
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest">Dept/Team</TableHead>
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest">Submitted</TableHead>
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest text-center">Preview</TableHead>
                        <TableHead className="py-5 px-6 font-bold text-[11px] text-muted-foreground uppercase tracking-widest text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assistants.length > 0 ? (
                        assistants.map((item) => (
                            <TableRow key={item.id} className="border-border/30 hover:bg-muted/5 transition-colors group">
                                <TableCell className="py-4 px-6 text-sm font-bold text-slate-200">{item.name}</TableCell>
                                <TableCell className="py-4 px-6">
                                    <span className={cn(
                                        "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold border",
                                        item.id === "3" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                    )}>
                                        {item.id === "2" || item.id === "5" ? "Letter" : "Analysis"}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm font-bold text-slate-400">Dr Saifur</TableCell>
                                <TableCell className="py-4 px-6 text-sm font-medium text-slate-500">Dhaka hospital</TableCell>
                                <TableCell className="py-4 px-6 text-sm font-medium text-slate-500">2026-03-10</TableCell>
                                <TableCell className="py-4 px-6 text-center">
                                    <button 
                                        onClick={() => onView?.(item)}
                                        className="bg-[#151921] border border-border/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg hover:bg-muted hover:text-white transition-all shadow-sm"
                                    >
                                        Preview
                                    </button>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => onApprove?.(item)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onReject?.(item)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                                No assistants found matching your filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
