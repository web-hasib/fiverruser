"use client";
import { LanguageSwitcher } from "@/src/components/google-translation/LanguageSwitcher";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { cn } from "@/src/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSidebar } from "./SidebarProvider";
import { GlobalSearch } from "./GlobalSearch";

interface UserProfile {
  name: string;
  email: string;
  imageUrl: string;
}

interface NavbarProps {
  userProfile?: UserProfile;
  onSearch?: (query: string) => void;
}

const DashboardNavbar: React.FC<NavbarProps> = ({
  userProfile = {
    name: "Dr. Jamal",
    email: "jamal@medsyst.com",
    imageUrl: "https://i.ibb.co.com/5hGpDBLy/Screenshot-2026-04-24-192428.png",
  },
  onSearch,
}) => {
  const { toggleSidebarCollapse } = useSidebar();
  const pathname = usePathname();


  // Helper to generate breadcrumbs
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    const isUser = pathname.includes("/dashboard/user");
    const isAdmin = pathname.includes("/dashboard/admin");
    const baseHref = isUser ? "/dashboard/user" : isAdmin ? "/dashboard/admin" : "/dashboard";

    let currentPath = "";

    // Always start with "General" if it's a dashboard path
    if (segments.length > 0 && segments[0] === "dashboard") {
      breadcrumbs.push({
        label: "General",
        href: baseHref,
      });
    } else if (segments.length > 0) {
      breadcrumbs.push({
        label: segments[0].charAt(0).toUpperCase() + segments[0].slice(1),
        href: `/${segments[0]}`,
      });
    }

    segments.forEach((segment) => {
      // Skip redundant segments to keep breadcrumbs clean like the design
      if (segment === "dashboard" || segment === "user" || segment === "admin") return;

      currentPath += `/${segment}`;

      // Building labels: capitalize and replace hyphens
      const label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        href: `${baseHref}${currentPath}`,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between gap-1 md:gap-6 transition-colors duration-200">
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={toggleSidebarCollapse}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-secondary text-foreground transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="hidden md:flex items-center text-xs font-medium">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="mx-1 text-muted-foreground/50 select-none">›</span>
              )}
              <Link
                href={crumb.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  index === breadcrumbs.length - 1
                    ? "text-foreground cursor-default pointer-events-none"
                    : "text-muted-foreground"
                )}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Global Search Bar (Desktop - Centered) */}
      <GlobalSearch
        className={`hidden lg:block flex-1 max-w-sm mx-auto `}

        onSearch={onSearch}
      />

      {/* Right side Elements Section */}
      <div className="flex items-center gap-1 md:gap-4">
        {/* Mobile Search (Before Theme Toggle) */}
        <GlobalSearch
          className="lg:hidden"

          onSearch={onSearch}
        />
        <ThemeToggle />

        {/* Language Selector */}
        <LanguageSwitcher />

        {/* User Profile Section */}
        <div className="flex items-center md:gap-2 gap-0.5 bg-secondary rounded-full p-0.5 md:p-1 pr-2 md:pr-2 cursor-pointer border border-border">
          <div className="md:w-7 md:h-7 w-5 h-5 rounded-full overflow-hidden shrink-0">
            <img
              src={userProfile.imageUrl}
              alt={userProfile.name}
              className="w-5 h-5 md:w-full md:h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-col hidden xl:flex text-left">
            <h3 className="text-foreground font-semibold text-xs leading-tight">
              {userProfile.name}
            </h3>
            <p className="text-muted-foreground text-[10px] leading-tight">
              {userProfile.email}
            </p>
          </div>
          <ChevronDown className="md:w-4 md:h-4 w-2 h-2 text-muted-foreground ml-1" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
