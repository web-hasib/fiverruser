"use client";

import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const Data = [
  { assistant: "Cardiology Full Assessment v2", dr: "Dr. Saifur", by: "Dhaka hospital", type: "Analysis" },
  { assistant: "Cardiology Full Assessment v2", dr: "Dr. Saifur", by: "Dhaka hospital", type: "Letter" },
  { assistant: "Cardiology Full Assessment v2", dr: "Dr. Saifur", by: "Dhaka hospital", type: "Analysis" },
  { assistant: "Cardiology Full Assessment v2", dr: "Dr. Saifur", by: "Dhaka hospital", type: "Analysis" },
];

export const PendingApprovals: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:border-accent transition-all duration-300 shadow-sm">
      <div className="p-5 flex justify-between items-center border-b border-border bg-muted/20">
        <h3 className="text-foreground font-semibold">Pending Approval</h3>
        <Link href="/dashboard/admin/assistants-approval">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all text-[10px] md:text-sm font-bold uppercase bg-muted px-3 py-1.5 rounded-md border border-border hover:bg-accent/20">
            View All <ArrowRight size={14} />
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-muted/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Assistant</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-muted-foreground">By</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Type</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-muted-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Data.map((row, i) => (
              <TableRow key={i} className="group hover:bg-accent/5">
                <TableCell className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-foreground text-sm font-bold group-hover:text-blue-500 transition-colors uppercase">{row.assistant}</span>
                    <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">{row.dr}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground text-sm font-medium">{row.by}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${row.type === 'Analysis'
                    ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                    {row.type}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="p-1.5 cursor-pointer px-2.5 rounded border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all shadow-sm">
                      <Check size={14} />
                    </button>
                    <button className="p-1.5 cursor-pointer px-2.5 rounded border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 hover:border-rose-500 transition-all shadow-sm">
                      <X size={14} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
