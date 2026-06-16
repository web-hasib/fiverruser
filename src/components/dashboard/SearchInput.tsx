"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  iconClassName?: string;
}

export const SearchInput = ({
  className,
  containerClassName,
  iconClassName,
  ...props
}: SearchInputProps) => {
  return (
    <div className={cn("relative group mb-4 w-full h-11", containerClassName)}>
      <Search
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors",
          "text-muted-foreground/50 group-focus-within:text-blue-500",
          "stroke-[2px]",
          iconClassName
        )}
      />
      <input
        {...props}
        className={cn(
          "w-full h-11 pl-11 pr-4 rounded-xl border transition-all outline-none text-sm font-medium shadow-sm",
          "bg-[var(--input-bg)] border-[var(--input-border)] text-foreground placeholder:text-muted-foreground/50",
          "hover:border-[var(--input-border-hover)] hover:bg-[var(--input-bg-hover)]",
          "focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:focus:ring-blue-500/10",
          className
        )}
      />
    </div>
  );
};
