"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/src/components/ui/pagination";
import { cn } from "@/src/lib/utils";

interface DataPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    className?: string;
}

/**
 * Generates page numbers with ellipsis for smart windowing.
 * e.g. [1, '...', 4, 5, 6, '...', 16]
 */
function getPageRange(current: number, total: number): (number | "...")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];

    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push("...");

    pages.push(total);
    return pages;
}

export default function DataPagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    pageSizeOptions = [5, 10, 11, 20, 50],
    onPageChange,
    onPageSizeChange,
    className,
}: DataPaginationProps) {
    const pages = getPageRange(currentPage, totalPages);

    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4",
                className
            )}
        >
            {/* Left: Showing X out of Y */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <span>Showing</span>
                {onPageSizeChange ? (
                    <div className="relative">
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="appearance-none bg-card border border-border text-foreground text-sm rounded-md pl-3 pr-7 py-1 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                        >
                            {pageSizeOptions.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none text-muted-foreground" />
                    </div>
                ) : (
                    <span className="font-medium text-foreground">{pageSize}</span>
                )}
                <span>
                    out of <span className="font-medium text-foreground">{totalItems.toLocaleString()}</span>
                </span>
            </div>

            {/* Right: Pagination controls */}
            <Pagination className="w-auto mx-0">
                <PaginationContent className="gap-1">
                    {/* Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) onPageChange(currentPage - 1);
                            }}
                            className={cn(
                                "border border-border rounded-md text-sm",
                                currentPage === 1 && "pointer-events-none opacity-40"
                            )}
                        />
                    </PaginationItem>

                    {/* Pages */}
                    {pages.map((page, idx) =>
                        page === "..." ? (
                            <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(page as number);
                                    }}
                                    className={cn(
                                        "rounded-md border border-border text-sm h-8 w-8",
                                        page === currentPage
                                            ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                            : "bg-card text-foreground hover:bg-muted"
                                    )}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) onPageChange(currentPage + 1);
                            }}
                            className={cn(
                                "border border-border rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700",
                                currentPage === totalPages && "pointer-events-none opacity-40"
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
