"use client";
import React, { useEffect, useState } from "react";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/src/lib/utils";

type DashboardContainerProps = {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideSubSidebar?: boolean;
};

type DashboardSidebarProps = {
  children: React.ReactNode;
  preventClose?: boolean;
};

type DashboardMainProps = {
  children: React.ReactNode;
  preventClose?: boolean;
};

export default function DashboardContainer({
  children,
  hideHeader = false,
  hideSubSidebar = false,
}: DashboardContainerProps) {
  const { isCollapsedSidebar, isPastScribeOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sidebarWidth = isCollapsedSidebar
    ? "var(--_sidebar-collapsed)"
    : "var(--_sidebar-expanded)";

  const subSidebarWidth = isPastScribeOpen
    ? "var(--_sub-sidebar-width)"
    : "0px";

  const showSub = isPastScribeOpen || !hideSubSidebar;

  const gridTemplate = isMobile
    ? hideHeader
      ? "'main'"
      : "'header' 'main'"
    : (() => {
        const cols = ["sidebar", showSub ? "subsidebar" : "", "COL3"].filter(Boolean);
        const row1 = cols.map(c => c === "COL3" ? (hideHeader ? "main" : "header") : c).join(" ");
        const row2 = cols.map(c => c === "COL3" ? "main" : c).join(" ");
        return hideHeader ? `"${row2}"` : `"${row1}" "${row2}"`;
      })();

  const gridColumns = isMobile
    ? "1fr"
    : showSub 
      ? `${sidebarWidth} ${subSidebarWidth} 1fr`
      : `${sidebarWidth} 1fr`;

  return (
    <div
      style={
        {
          "--_sidebar-spacing": "1rem",
          "--_sidebar-collapsed": "4.5rem",
          "--_sidebar-expanded": "16rem",
          "--_sub-sidebar-width": "20rem",
          "--_sidebar-icon-container": "2rem",
          "--_sidebar-icon-sm": "1.5rem",
          "--_sidebar-icon-lg": "1.7rem",
          gridTemplateColumns: gridColumns,
          gridTemplateRows: hideHeader ? "1fr" : "auto 1fr",
          gridTemplateAreas: gridTemplate,
        } as React.CSSProperties
      }
      className={cn(
        "grid transition-[grid-template-columns] duration-300 bg-background h-screen overflow-hidden",
      )}
    >
      {children}
    </div>
  );
}

export function DashboardSubSidebarContainer({
  children,
}: DashboardSidebarProps) {
  const { isPastScribeOpen } = useSidebar();
  return (
    <div
      className={cn(
        "[grid-area:subsidebar] bg-card overflow-hidden transition-all duration-300",
        "hidden lg:block",
        isPastScribeOpen ? "w-[20rem] border-r border-border/50" : "w-0 border-r-0",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export function DashboardSidebarContainer({ children, preventClose }: DashboardSidebarProps) {
  const { isCollapsedSidebar, toggleSidebarCollapse, isPastScribeOpen, togglePastScribe } = useSidebar();
  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden",
          isCollapsedSidebar ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
        )}
        onClick={toggleSidebarCollapse}
      />
      <div 
        className={cn(
          "[grid-area:sidebar] print:hidden overflow-y-auto overflow-x-clip transition-all duration-300 z-50",
          "lg:relative fixed inset-y-0 left-0 bg-card border-r border-border shadow-xl lg:shadow-none",
          isCollapsedSidebar ? "-translate-x-full lg:translate-x-0 w-0 lg:w-[var(--_sidebar-collapsed)]" : "translate-x-0 w-[var(--_sidebar-expanded)]"
        )}
        onClick={() => !preventClose && isPastScribeOpen && togglePastScribe(false)}
      >
        {children}
      </div>
    </>
  );
}

export function DashboardHeaderContainer({ children, preventClose }: DashboardSidebarProps) {
  const { isPastScribeOpen, togglePastScribe } = useSidebar();
  return (
    <div 
      className="[grid-area:header] bg-background shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
      onClick={() => !preventClose && isPastScribeOpen && togglePastScribe(false)}
    >
      {children}
    </div>
  );
}

export function DashboardMainContainer({ children, preventClose }: DashboardMainProps) {
  const { isPastScribeOpen, togglePastScribe } = useSidebar();
  return (
    <div 
      className="[grid-area:main] bg-background text-foreground overflow-y-auto overflow-x-auto"
      onClick={() => !preventClose && isPastScribeOpen && togglePastScribe(false)}
    >
      {children}
    </div>
  );
}
