"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation"


interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  containerClassName?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  className,
  placeholder = "Search anything...",
  onSearch,
  containerClassName,
}) => {

  const pathname = usePathname();
  const isSessionPage = pathname.includes("/dashboard/user/new/session");


  const [isFocused, setIsFocused] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile search on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Desktop Search Bar */}
      <div className="hidden lg:block w-full">
        <div
          className={cn(
            "relative flex items-center h-10 px-4 border rounded-full group transition-all duration-300 ease-out overflow-hidden",
            !isSessionPage 
              ? "light:bg-white dark:bg-slate-800/60 light:border-slate-200 dark:border-slate-700/50 light:hover:bg-gray-50 dark:hover:bg-slate-800 light:hover:border-slate-300 dark:hover:border-slate-600/50 shadow-sm" 
              : "light:bg-white dark:bg-card light:border-slate-200 dark:border-border/50",
            isFocused ? "ring-2 ring-blue-500/20 border-blue-500/40 bg-background dark:bg-slate-900 shadow-[0_4px_20px_-3px_rgba(37,99,235,0.15)]" : "shadow-sm"
          )}
        >
          <input
            type="text"
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onSearch?.(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-foreground placeholder:text-muted-foreground/70 w-full"
          />
          <div className={cn(
            "h-4 w-px transition-colors duration-300 mx-3",
            isFocused ? "bg-blue-500/30" : "bg-border"
          )} />
          <Search
            className={cn(
              "size-4 transition-all duration-300 cursor-pointer shrink-0",
              isFocused ? "text-blue-500 scale-110" : "text-muted-foreground group-hover:text-foreground"
            )}
          />

          {/* Animated Background Glow */}
          <div className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 -z-10 transition-opacity duration-500",
            isFocused ? "opacity-100" : "opacity-0"
          )} />
        </div>
      </div>

      {/* Mobile Search Icon Button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-90"
          aria-label="Open search"
        >
          <Search className="size-5" />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] lg:hidden"
            />

            {/* Search Input Popup */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-4 left-4 right-4 z-[101] lg:hidden"
            >
              <div className="relative flex items-center h-14 px-4 bg-background border border-border shadow-2xl rounded-2xl ring-4 ring-blue-500/10">
                <Search className="size-5 text-blue-500 mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder={placeholder}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/40"
                />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="ml-3 p-2 rounded-xl hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                  <X className="size-5" />
                </button>

                {/* Glow Effect for Mobile Popup */}
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.2)] -z-10 pointer-events-none" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
