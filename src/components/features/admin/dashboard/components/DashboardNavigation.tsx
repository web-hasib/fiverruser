"use client";

import React, { useMemo } from "react";
import { useSidebar } from "./SidebarProvider";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import DashboardActiveLink from "./DashboardActiveLink";
import { DashboardNavigationType, DashboardNavGroupType } from "../types";
import * as Icons from "lucide-react";
import { PiSidebar } from "react-icons/pi";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/src/components/ui/tooltip";
import { PiUsersThree } from "react-icons/pi";

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
  DollarSign: Icons.DollarSign,
  ScrollText: Icons.ScrollText,
  ShieldUser: Icons.ShieldUser,
  Building2: Icons.Building2,
  BookOpen: Icons.BookOpen,
  CheckSquare: Icons.CheckSquare,
  FolderOpen: Icons.FolderOpen,
  UserRound: Icons.UserRound,
  Star: Icons.Star,
  Sliders: Icons.Sliders,
  ToggleLeft: Icons.ToggleLeft,
  // User dashboard icons
  Plus: Icons.Plus,
  FileText: Icons.FileText,
  FileClock: Icons.FileClock,
  Stethoscope: Icons.Stethoscope,
  ClipboardList: Icons.ClipboardList,
  CheckSquare2: Icons.SquareCheck,
  CalendarCheck: Icons.CalendarCheck,
  Bot: Icons.Bot,
  PiUsersThree: PiUsersThree,
  PiSidebar: PiSidebar,
};

const renderIcon = (
  icon: DashboardNavigationType["icon"] | undefined,
  size: string,
) => {
  if (!icon) return null;

  // 1. If it's a string, look it up in iconMap
  if (typeof icon === "string") {
    const IconComponent = iconMap[icon];
    if (!IconComponent) return null;
    return <IconComponent className={size} />;
  }

  // 2. If it's a function (Functional Component/ElementType), render it
  if (typeof icon === "function") {
    const IconComponent = icon as React.ElementType;
    return <IconComponent className={size} />;
  }

  // 3. If it's already a React Element, clone it with the size class
  if (React.isValidElement(icon)) {
    return React.cloneElement(
      icon as React.ReactElement,
      {
        className: size,
      } as React.SVGProps<SVGSVGElement>,
    );
  }

  return null;
};

const handleSpecialClick = (
  e: React.MouseEvent,
  item: DashboardNavigationType,
) => {
  if (item.name === "Sessions" || item.name === "Past Sessions") {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { togglePastScribe } = (window as any).__sidebar_controls || {};
    if (togglePastScribe) togglePastScribe();
    return true;
  }
  // Check for both English and Hungarian "New Case" names
  if (item.name === "New Session" || item.name === "Új eset") {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { openNewCaseModal } = (window as any).__sidebar_controls || {};
    if (openNewCaseModal) openNewCaseModal();
    return true;
  }
  return false;
};

const IconSidebar = React.memo(({ items }: MenuProps) => {
  const { isPastScribeOpen, togglePastScribe } = useSidebar();
  const validItems = items.filter(
    (item) =>
      item.href && item.name && (!item.children || item.children.length === 0),
  );
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "linear" }}
      className="flex flex-col gap-6 items-center"
      role="navigation"
    >
      {validItems.map((item, idx) => (
        <li key={`${item.href}-${idx}`}>
          <DashboardActiveLink
            href={item.href}
            exact={item.exact}
            className={cn(
              "flex items-center size-7 shrink-0 justify-center w-8! cursor-pointer rounded",
            )}
            aria-label={item.name}
            onClick={(e: React.MouseEvent) => {
              if (handleSpecialClick(e, item)) return;
              if (isPastScribeOpen) togglePastScribe(false);
            }}
            title={item.name}
          >
            <div className="notranslate flex items-center justify-center relative">
              {renderIcon(item.icon, "size-5")}
              {(item.name === "Sessions" || item.name === "Past Sessions") && (
                <div className="absolute -right-2 -bottom-0.5 bg-blue-600 text-white rounded-full p-0.5 shadow-sm border border-background">
                  {isPastScribeOpen ? <Icons.ChevronLeft size={6} /> : <Icons.ChevronRight size={6} />}
                </div>
              )}
            </div>
          </DashboardActiveLink>
        </li>
      ))}
    </motion.ul>
  );
});
IconSidebar.displayName = "IconSidebar";

const NavItem = ({
  item,
  depth = 0,
}: {
  item: DashboardNavigationType;
  depth?: number;
}) => {
  const { isPastScribeOpen, togglePastScribe } = useSidebar();
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  // Check if a child is active for styling
  const isChildActive = React.useMemo(() => {
    if (!hasChildren) return false;
    return item.children?.some((child) => pathname.startsWith(child.href));
  }, [hasChildren, item.children, pathname]);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };

  return (
    <li className={cn("w-full rounded list-none")}>
      <div
        className={cn(
          "flex w-full flex-1 items-center justify-between relative rounded-2xl transition-colors",
          item.className,
        )}
      >
        <DashboardActiveLink
          href={item.href}
          exact={item.exact}
          isActive={isChildActive && !isOpen ? true : undefined}
          className={cn(
            "flex items-center gap-2 py-3 px-4  w-full group transition-colors",
            depth > 0 && "pl-12", // Indent for children
            item?.name === "New Session"
              ? "text-white! hover:text-white! bg-blue-600! hover:bg-blue-900! cursor-pointer"
              : "text-primary-foreground/60",
          )}
          onClick={(e) => {
            if (handleSpecialClick(e, item)) return;
            if (isPastScribeOpen) togglePastScribe(false);
            if (hasChildren && item.href.endsWith("#")) {
              e.preventDefault();
              toggleOpen();
            }
          }}
        >
          <div className="shrink-0 notranslate">
            {renderIcon(item.icon, "size-4")}
          </div>
          <span className="text-sm font-medium flex-1">{item.name}</span>

          {hasChildren && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto p-2 -mr-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleOpen();
              }}
            >
              <Icons.ChevronDown className="size-3.5 opacity-50 group-hover:opacity-100" />
            </motion.div>
          )}

          {(item.name === "Sessions" || item.name === "Past Sessions") && (
            <div className="ml-auto">
              {isPastScribeOpen ? (
                <Icons.ChevronLeft className="size-4 opacity-50 group-hover:opacity-100" />
              ) : (
                <Icons.ChevronRight className="size-4 opacity-50 group-hover:opacity-100" />
              )}
            </div>
          )}

          {item.badge && !hasChildren && (
            <span className="bg-linear-to-br from-blue-600 to-blue-400 text-[10px] text-white px-2 py-0.5 rounded-full ml-auto font-bold shadow-sm">
              {item.badge}
            </span>
          )}
        </DashboardActiveLink>
      </div>

      {hasChildren && (
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <ul className="flex flex-col gap-1 mt-1">
            {item.children?.map((child, idx) => (
              <NavItem
                key={`${child.href}-${idx}`}
                item={child}
                depth={depth + 1}
              />
            ))}
          </ul>
        </motion.div>
      )}
    </li>
  );
};

const NameSidebar = React.memo(({ items }: MenuProps) => {
  const validItems = useMemo(
    () => items.filter((item) => item.href && item.name),
    [items],
  );

  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "linear" }}
      className="flex flex-col gap-1 whitespace-nowrap"
      role="navigation"
    >
      {validItems.map((item, index) => (
        <NavItem key={`${item.href}-${index}`} item={item} />
      ))}
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
      // In collapsed mode, show all icons (including children) in a flat list
      const flattenItems = (
        items: DashboardNavigationType[],
      ): DashboardNavigationType[] => {
        return items.reduce((acc, item) => {
          // Only include items that are not just parent toggles in the flat view
          const isParentToggle = item.children && item.children.length > 0;
          if (!isParentToggle) {
            acc.push(item);
          }

          if (item.children) {
            acc.push(...flattenItems(item.children));
          }
          return acc;
        }, [] as DashboardNavigationType[]);
      };

      const allItems = groups.flatMap((g) => flattenItems(g.items));
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
