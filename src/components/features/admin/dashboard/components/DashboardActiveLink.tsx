"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarProvider";

type ActiveLinkProps = {
  exact?: boolean;
  isActive?: boolean;
} & React.ComponentProps<"a">;

const DashboardActiveLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ActiveLinkProps & { onClick?: React.MouseEventHandler }
>(
  (
    {
      href = "",
      className,
      children,
      exact = false,
      onClick,
      isActive: externalIsActive,
      ...props
    },
    ref,
  ) => {
    const { isExpanded } = useSidebar();
    const pathname = usePathname();
    const calculatedIsActive = exact
      ? pathname === href
      : pathname.startsWith(href as string);

    const isActive = externalIsActive ?? calculatedIsActive;

    // Common styles
    const commonClasses = cn(
      "flex items-center gap-y-2.5 rounded-sm whitespace-nowrap transition-colors notranslate",
      isActive &&
        isExpanded &&
        "bg-blue-500/40 text-primary-foreground! border-l-4 border-blue-600!",
      isActive &&
        !isExpanded &&
        "bg-blue-500/40 text-primary-foreground!",
      !isActive &&
        isExpanded &&
        "hover:bg-accent-foreground/10 text-muted-foreground hover:text-accent-foreground!",
      !isActive &&
        !isExpanded &&
        "hover:bg-accent-foreground/10 text-muted-foreground hover:text-accent-foreground!",
      className,
    );

    if (href.endsWith("#")) {
      return (
        <button
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          type={"button" as const}
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
          className={cn(commonClasses, "text-left w-full")}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={commonClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  },
);

DashboardActiveLink.displayName = "DashboardActiveLink";

export default DashboardActiveLink;
