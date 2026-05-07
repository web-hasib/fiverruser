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
  DashboardSubSidebarContainer,
} from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { DashboardGroupedNavigation } from "@/src/components/features/admin/dashboard/components/DashboardNavigation";
import SidebarProvider, { useSidebar } from "@/src/components/features/admin/dashboard/components/SidebarProvider";
import { DashboardNavGroupType } from "@/src/components/features/admin/dashboard/types";
import PastScribeSidebar from "@/src/components/features/user/cases/PastScribeSidebar";
import StartNewSessionModal from "@/src/components/features/user/cases/StartNewSessionModal";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// ─── Admin Nav ────────────────────────────────────────────────────────
const adminNavGroups: DashboardNavGroupType[] = [
  {
    groupLabel: "System",
    items: [
      {
        href: "/dashboard/admin",
        name: "Dashboard",
        icon: "LayoutDashboard",
        exact: true,
      },
      {
        href: "/dashboard/admin/audit-logs",
        name: "Audit Logs",
        icon: "ScrollText",
      },
    ],
  },
  {
    groupLabel: "Users & Accounts",
    items: [
      { href: "/dashboard/admin/users", name: "All Users", icon: "Users" },
      { href: "/dashboard/admin/platform-admins", name: "Platform Admins", icon: "ShieldUser" },
      {
        href: "/dashboard/admin/teams",
        name: "Teams / Org",
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
      { href: "/dashboard/admin/sessions", name: "All Sessions", icon: "FolderOpen" },
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
        href: "/dashboard/admin/plans-limits",
        name: "Plans Features & Limits",
        icon: "Sliders",
      },
      {
        href: "/dashboard/admin/payments",
        name: "Payments",
        icon: "DollarSign",
      }

    ],
  },
  {
    groupLabel: "Settings",
    items: [
      { href: "/dashboard/admin/settings", name: "System Settings", icon: "Settings" },
    ],
  },
];

// ─── User Nav ─────────────────────────────────────────────────────────
const userNavGroups: DashboardNavGroupType[] = [
  {
    items: [
      {
        href: "#",
        name: "New Session",
        icon: "Plus",
        className: "bg-(--blue) text-white! hover:bg-(--blue)/80! mb-4! mx-auto! rounded-lg! cursor-pointer!",
      },
      {
        href: "/dashboard/user/cases/past-scribe",
        name: "Sessions",
        icon: "PiSidebar",
        // className: "",
      },
      {
        href: "/dashboard/user",
        name: "Dashboard",
        icon: "LayoutDashboard",
        exact: true,
      },
      // {
      //   href: "/dashboard/user/cases",
      //   name: "Cases",
      //   icon: "FileText",
      //   exact: true,
      // },
      {
        href: "/dashboard/user/patients/my",
        name: "Patients",
        icon: "PiUsersThree",
        children: [
          {
            href: "/dashboard/user/patients/my",
            name: "My Patients",
            icon: "PiUsersThree",
          },
          {
            href: "/dashboard/user/patients/shared",
            name: "Shared Folder",
            icon: "FolderOpen",
            badge: "Pro",
          },
        ],
      },
      { href: "/dashboard/user/task", name: "Tasks", icon: "ClipboardList" },
      {
        href: "/dashboard/user/calendar",
        name: "Calendar",
        icon: "CalendarCheck",
      },
      {
        href: "/dashboard/user/my-assistants/private",
        name: "Assistants",
        icon: "Bot",
        children: [
          {
            href: "/dashboard/user/my-assistants/private",
            name: "Private Assistants",
            icon: "Bot",
          },
          {
            href: "/dashboard/user/my-assistants/shared",
            name: "Shared Assistants",
            icon: "Users",
            // badge: "Pro",
          },
        ],
      },
      // {
      //   href: "/dashboard/user/my-assistants",
      //   name: "My Assistants",
      //   icon: "Bot",
      // },
    ],
  },
  {
    items: [
      { href: "/dashboard/user/team", name: "Team", icon: "Users" },
    ],
  },
  {
    items: [
      { href: "/dashboard/user/knowledge-base", name: "Knowledge Base", icon: "BookOpen" },
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
import { TooltipProvider } from "@/src/components/ui/tooltip";

// ─── Layout ───────────────────────────────────────────────────────────
function DashboardLayoutInner({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const { isPastScribeOpen } = useSidebar();
  const isUserDashboard = pathname.startsWith("/dashboard/user");
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  useEffect(() => {
    // Patch Node.prototype to handle DOM manipulations by Google Translate/React conflict
    if (typeof window !== "undefined") {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(
        this: Node,
        child: T,
      ): T {
        if (child.parentNode !== this) {
          return child;
        }
        return originalRemoveChild.call(this, child) as T;
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(
        this: Node,
        newNode: T,
        referenceNode: Node | null,
      ): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          return newNode;
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__sidebar_controls = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(window as any).__sidebar_controls,
      openNewCaseModal: () => setIsNewCaseModalOpen(true),
    };

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const isSessionPage = /^\/dashboard\/user\/new\/session\/[^/]+/.test(pathname) || /^\/dashboard\/admin\/session\/[^/]+/.test(pathname) || /^\/dashboard\/admin\/sessions\/[^/]+/.test(pathname);

  return (
    <>
      <DashboardContainer
        hideHeader={isSessionPage}
        hideSubSidebar={isSessionPage}
      >
        {!isSessionPage && (
          <DashboardHeaderContainer>
            <DashboardHeader />
          </DashboardHeaderContainer>
        )}
        <DashboardSidebarContainer preventClose={isSessionPage}>
          <DashboardSidebar>
            {/* {isUserDashboard && (
              <div className="px-2 py-2">
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

        {isUserDashboard && (!isSessionPage || isPastScribeOpen) && (
          <DashboardSubSidebarContainer>
            <PastScribeSidebar
              onNewCase={() => setIsNewCaseModalOpen(true)}
            />
          </DashboardSubSidebarContainer>
        )}

        <DashboardMainContainer preventClose={isSessionPage}>
          <Suspense
            fallback={<div className="p-4 text-gray-400">Loading...</div>}
          >
            <div className="p-3 md:p-6 sora">{children}</div>
          </Suspense>
        </DashboardMainContainer>
      </DashboardContainer>

      <StartNewSessionModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
      />
    </>
  );
}

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <TooltipProvider>
          <DashboardLayoutInner>{children}</DashboardLayoutInner>
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
