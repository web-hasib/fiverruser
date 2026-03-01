"use client";

import React, { useMemo } from "react";
import { useSidebar } from "./SidebarProvider";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import DashboardActiveLink from "./DashboardActiveLink";
import { DashboardNavigationType, DashboardNavGroupType } from "../types";
import * as Icons from "lucide-react";

interface MenuProps {
  items: DashboardNavigationType[];
}

interface DashboardNavigationProps {
  items: DashboardNavigationType[];
}

interface DashboardGroupedNavigationProps {
  groups: DashboardNavGroupType[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Admin icons
  PanelsTopLeft: Icons.PanelsTopLeft,
  CalendarDays: Icons.CalendarDays,
  Package: Icons.Package,
  Users: Icons.Users,
  UserCog: Icons.UserCog,
  UserCheck: Icons.UserCheck,
  Percent: Icons.Percent,
  TicketPercent: Icons.TicketPercent,
  Gift: Icons.Gift,
  CreditCard: Icons.CreditCard,
  ListOrdered: Icons.ListOrdered,
  ArrowLeftRight: Icons.ArrowLeftRight,
  PercentCircle: Icons.PercentCircle,
  Mail: Icons.Mail,
  MessageSquare: Icons.MessageSquare,
  Settings: Icons.Settings,
  // User icons
  LayoutDashboard: Icons.LayoutDashboard,
  ShoppingBag: Icons.ShoppingBag,
  Heart: Icons.Heart,
  Ticket: Icons.Ticket,
  // New admin icons
  LayoutPanelLeft: Icons.LayoutPanelLeft,
  ScrollText: Icons.ScrollText,
  Building2: Icons.Building2,
  BookOpen: Icons.BookOpen,
  CheckSquare: Icons.CheckSquare,
  FolderOpen: Icons.FolderOpen,
  UserRound: Icons.UserRound,
  Star: Icons.Star,
  Sliders: Icons.Sliders,
  ToggleLeft: Icons.ToggleLeft,
  // User dashboard icons
  FileClock: Icons.FileClock,
  Stethoscope: Icons.Stethoscope,
  ClipboardList: Icons.ClipboardList,
  CheckSquare2: Icons.SquareCheck,
  CalendarCheck: Icons.CalendarCheck,
  Bot: Icons.Bot,
};

const renderIcon = (
  icon: string | React.ReactElement | undefined,
  size: string,
) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    const IconComponent = iconMap[icon];
    if (!IconComponent) return null;
    return <IconComponent className={size} />;
  }
  return React.cloneElement(icon, {
    className: size,
  } as React.SVGProps<SVGSVGElement>);
};

const IconSidebar = React.memo(({ items }: MenuProps) => {
  const validItems = items.filter((item) => item.href && item.name);
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "linear" }}
      className="flex flex-col gap-6"
      role="navigation"
    >
      {validItems.map((item, idx) => (
        <li key={`${item.href}-${idx}`}>
          <DashboardActiveLink
            href={item.href}
            className={cn(
              "flex items-center size-7 shrink-0 text-white justify-center ml-1x rounded",
            )}
            aria-label={item.name}
            title={item.name}
          >
            {renderIcon(item.icon, "size-5")}
          </DashboardActiveLink>
        </li>
      ))}
    </motion.ul>
  );
});
IconSidebar.displayName = "IconSidebar";

const NameSidebar = React.memo(({ items }: MenuProps) => {
  const renderItems = (navItems: DashboardNavigationType[]) =>
    navItems.map((item, index) => {
      const itemKey = `${item.href}-${index}`;
      return (
        <li key={itemKey} className={cn("w-full rounded")}>
          <div className="flex w-full flex-1 items-center justify-between relative">
            <DashboardActiveLink
              href={item.href}
              className={cn(
                "flex items-center gap-2 pl-4 py-4 text-gray-400 w-full",
              )}
            >
              <div className="shrink-0">{renderIcon(item.icon, "size-5")}</div>
              <span className="whitespace-nowrap">{item.name}</span>
            </DashboardActiveLink>
          </div>
        </li>
      );
    });

  const validItems = useMemo(
    () => items.filter((item) => item.href && item.name),
    [items],
  );

  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "linear" }}
      className="flex flex-col gap-2 whitespace-nowrap"
      role="navigation"
    >
      {renderItems(validItems)}
    </motion.ul>
  );
});
NameSidebar.displayName = "NameSidebar";

const DashboardNavigation = React.memo(
  ({ items }: DashboardNavigationProps) => {
    const { isCollapsedSidebar } = useSidebar();
    if (!items || items.length === 0) return null;
    return isCollapsedSidebar ? (
      <IconSidebar items={items} />
    ) : (
      <NameSidebar items={items} />
    );
  },
);
DashboardNavigation.displayName = "DashboardNavigation";

export default DashboardNavigation;

// ─── Grouped Navigation ───────────────────────────────────────────────
export const DashboardGroupedNavigation = React.memo(
  ({ groups }: DashboardGroupedNavigationProps) => {
    const { isCollapsedSidebar } = useSidebar();

    if (!groups || groups.length === 0) return null;

    if (isCollapsedSidebar) {
      // In collapsed mode, just show all icons flat (no labels)
      const allItems = groups.flatMap((g) => g.items);
      return <IconSidebar items={allItems} />;
    }

    return (
      <div className="flex flex-col gap-1">
        {groups.map((group, gi) => (
          <div key={gi} className="mb-2">
            {group.groupLabel && (
              <p className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase px-4 pt-3 pb-1">
                {group.groupLabel}
              </p>
            )}
            <NameSidebar items={group.items} />
          </div>
        ))}
      </div>
    );
  },
);
DashboardGroupedNavigation.displayName = "DashboardGroupedNavigation";
