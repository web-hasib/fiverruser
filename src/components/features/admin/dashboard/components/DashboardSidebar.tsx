"use client";

import { ChevronsRight, PanelRightClose, SidebarIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { useSyncExternalStore } from "react";
import { cn } from "@/src/lib/utils";
import { useSidebar } from "./SidebarProvider";
import DashboardLogoutButton from "./DashboardFooter";
import Image from "next/image";
import Link from "next/link";

type DashboardSidebarProps = {
  children: React.ReactNode;
};

export default function DashboardSidebar({ children }: DashboardSidebarProps) {
  const { isCollapsedSidebar } = useSidebar();

  return (
    <div className="relative h-full bg-primary text-primary-foreground">
      <motion.nav
        className={cn(
          "h-full flex flex-col gap-2 z-50 sticky top-0 whitespace-nowrap px-4 shadow-xs text-base bg-primary text-primary-foreground overflow-hidden",
        )}
        style={{
          width: isCollapsedSidebar
            ? "var(--_sidebar-collapsed)"
            : "var(--_sidebar-expanded)",
        }}
        animate={{
          width: isCollapsedSidebar
            ? "var(--_sidebar-collapsed)"
            : "var(--_sidebar-expanded)",
        }}
      >
        <div className={cn(
          "absolute right-2 z-40 top-6",
          isCollapsedSidebar && "hidden"
        )}>
          <SidebarToggleButton />
        </div>
        <SidebarHeader />

        <div className="flex-1 space-y-(--_sidebar-spacing) -mr-4 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {children}
        </div>

        <div className="border-t mb-2 md:mb-4 lg:mb-6 border-border pt-1 mt-2">
          <DashboardLogoutButton />
        </div>
      </motion.nav>
    </div>
  );
}

const emptySubscribe = () => () => { };

function SidebarHeader() {
  const { isExpanded } = useSidebar();
  const { theme, resolvedTheme } = useTheme();

  // Modern hydration check to avoid "cascading renders" warning
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return (
      <div className="py-16 px-5 -mx-5 flex items-center justify-center h-16 relative">
        <div className="w-[120px] h-[90px]" />
      </div>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isCollapsed = !isExpanded;

  return (
    <div className={cn(
      "px-5 -mx-5 flex items-center relative",
      isExpanded ? "py-10 mb-6 h-16 -ml-14 justify-center" : "pt-6 pb-4 flex-col justify-start gap-4"
    )}>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2"
        >
          <Link href={"#"} className="flex justify-center items-center gap-0">
            <Image src="/logo-without-text.png" alt="logo" width={50} height={50} />
            {currentTheme === "light" ? (
              <Image src="/light theme text.png" alt="text" width={120} height={90} />
            ) : (
              <Image src="/dark theme text.png" alt="text" width={120} height={90} />
            )}
          </Link>
        </motion.div>
      )}

      {!isExpanded && (
        <div className="">
          <SidebarToggleButton />
        </div>
      )}
    </div>
  );
}

export function SidebarToggleButton() {
  const { isExpanded, toggleSidebarCollapse } = useSidebar();
  return (
    <button className="p-1 cursor-pointer" onClick={toggleSidebarCollapse}>
      <PanelRightClose
        className={cn(
          "size-6 text-primary-foreground/30 hover:text-primary-foreground/80",
          isExpanded ? "-scale-100" : "scale-100",
        )}
      />
    </button>
  );
}
