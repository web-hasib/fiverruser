"use client";

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

export interface ColumnDef<T> {
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T>({ columns, data, className }: DataTableProps<T>) {
  return (
    <div
      className={cn(
        " bg-primary overflow-hidden border border-primary-foreground/20",
        className,
      )}
    >
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <Table className="w-full border-collapse">
          <TableHeader className=" light:bg-[#f4fafb] dark:bg-[#191f31]">
            <TableRow className="border-b border-primary-foreground/10 hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 border-none"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-primary-foreground/10 last:border-0 hover:bg-primary-foreground/5 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-6 py-4 text-sm text-primary-foreground/80 whitespace-nowrap border-none"
                    >
                      {column.cell
                        ? column.cell(item, rowIndex)
                        : column.accessorKey
                          ? (item[column.accessorKey] as React.ReactNode)
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-primary-foreground/80"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
