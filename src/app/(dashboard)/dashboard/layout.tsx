"use client";

import {
  DashboardContainer,
  DashboardHeader,
  DashboardSidebar,
} from "@/src/components/features/admin/dashboard/components";
import {
  DashboardHeaderContainer,
  DashboardMainContainer,
  DashboardSidebarContainer,
} from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { DashboardGroupedNavigation } from "@/src/components/features/admin/dashboard/components/DashboardNavigation";
import SidebarProvider from "@/src/components/features/admin/dashboard/components/SidebarProvider";
import { DashboardNavGroupType } from "@/src/components/features/admin/dashboard/types";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

// ─── Admin Nav ────────────────────────────────────────────────────────
const adminNavGroups: DashboardNavGroupType[] = [
  {
    groupLabel: "System",
    items: [
      { href: "/dashboard/admin", name: "Dashboard", icon: "LayoutDashboard" },
      {
        href: "/dashboard/admin/audit-logs",
        name: "Audit Logs",
        icon: "ScrollText",
      },
    ],
  },
  {
    groupLabel: "Users & Workspaces",
    items: [
      { href: "/dashboard/admin/users", name: "Users", icon: "Users" },
      {
        href: "/dashboard/admin/teams",
        name: "Teams / Hospitals",
        icon: "Building2",
      },
    ],
  },
  {
    groupLabel: "Content & AI",
    items: [
      {
        href: "/dashboard/admin/assistants-library",
        name: "Assistants Library",
        icon: "BookOpen",
      },
      {
        href: "/dashboard/admin/assistants-approval",
        name: "Assistants Approval",
        icon: "CheckSquare",
      },
    ],
  },
  {
    groupLabel: "Data & Safety",
    items: [
      { href: "/dashboard/admin/case", name: "Case", icon: "FolderOpen" },
      {
        href: "/dashboard/admin/patients",
        name: "Patients",
        icon: "UserRound",
      },
    ],
  },
  {
    groupLabel: "Plans & Billing",
    items: [
      {
        href: "/dashboard/admin/featured-list",
        name: "Featured List",
        icon: "Star",
      },
      {
        href: "/dashboard/admin/plans-limits",
        name: "Plans & Limits",
        icon: "Sliders",
      },
    ],
  },
  {
    groupLabel: "Settings",
    items: [
      {
        href: "/dashboard/admin/feature-toggles",
        name: "Feature Toggles",
        icon: "ToggleLeft",
      },
      { href: "/dashboard/admin/settings", name: "Setting", icon: "Settings" },
    ],
  },
];

// ─── User Nav ─────────────────────────────────────────────────────────
const userNavGroups: DashboardNavGroupType[] = [
  {
    items: [
      {
        href: "/dashboard/user/cases/new",
        name: "New Case",
        icon: "Plus",
        className: "bg-blue-500",
      },
      { href: "/dashboard/user", name: "Dashboard", icon: "LayoutDashboard" },
      { href: "/dashboard/user/cases", name: "Cases", icon: "FolderOpen" },
      { href: "/dashboard/user/patients", name: "Patients", icon: "UserRound" },
      { href: "/dashboard/user/task", name: "Task", icon: "ClipboardList" },
      {
        href: "/dashboard/user/calendar",
        name: "Calendar",
        icon: "CalendarCheck",
      },
      {
        href: "/dashboard/user/my-assistants",
        name: "My Assistants",
        icon: "Bot",
      },
    ],
  },
  {
    groupLabel: "Settings",
    items: [
      { href: "/dashboard/user/settings", name: "Setting", icon: "Settings" },
    ],
  },
];

import { ThemeProvider } from "@/src/components/ui/theme-provider";

// ─── Layout ───────────────────────────────────────────────────────────
function DashboardLayoutInner({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const isUserDashboard = pathname.startsWith("/dashboard/user");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <DashboardContainer>
          <DashboardHeaderContainer>
            <DashboardHeader />
          </DashboardHeaderContainer>
          <DashboardSidebarContainer>
            <DashboardSidebar>
              {/* {isUserDashboard && (
              <div className="px-4 py-3">
                <Link
                  href="/dashboard/user/cases/new"
                  className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
                >
                  <Plus size={16} />
                  New Case
                </Link>
              </div>
            )} */}
              <DashboardGroupedNavigation
                groups={isUserDashboard ? userNavGroups : adminNavGroups}
              />
            </DashboardSidebar>
          </DashboardSidebarContainer>

          <DashboardMainContainer>
            <Suspense
              fallback={<div className="p-4 text-gray-400">Loading...</div>}
            >
              <div className="p-6">{children}</div>
            </Suspense>
          </DashboardMainContainer>
        </DashboardContainer>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return <DashboardLayoutInner>{children}</DashboardLayoutInner>;
}
