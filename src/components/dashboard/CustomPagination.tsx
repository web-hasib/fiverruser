"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  className?: string;
}

export const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  className,
}: CustomPaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 py-4",
        className,
      )}
    >
      {/* Left: Rows per page */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="appearance-none bg-primary border border-primary-foreground/20 text-primary-foreground text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30 transition-all cursor-pointer"
          >
            {[10, 20, 50, 100].map((val) => (
              <option key={val} value={val} className="bg-primary">
                {val}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground/50 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Right: Navigation */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-primary border-primary-foreground/20 text-primary-foreground/80 hover:bg-primary-foreground/10 disabled:opacity-30 rounded-lg px-3"
        >
          <ChevronLeft className="mr-1" size={16} /> Previous
        </Button>

        <div className="flex items-center gap-1 mx-2">
          {pages.map((page) => {
            // Very simple logic to show few pages if many exist could be added here
            // For now showing all pages as in the image (1, 2, 3... 16)
            if (totalPages > 5) {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all",
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-primary-foreground/60 hover:bg-primary-foreground/10",
                    )}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="text-primary-foreground/30 px-1">
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all",
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-primary-foreground/60 hover:bg-primary-foreground/10",
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="bg-blue-600 border-none text-white hover:bg-blue-700 disabled:opacity-30 rounded-lg px-4"
        >
          Next <ChevronRight className="ml-1" size={16} />
        </Button>
      </div>
    </div>
  );
};
