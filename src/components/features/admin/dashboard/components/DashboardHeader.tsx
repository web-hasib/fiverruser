"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Settings, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";

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
    name: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    imageUrl: "https://i.pravatar.cc/300?img=12",
  },
}) => {
  return (
    <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between gap-6 transition-colors duration-200">
      {/* Welcome Back Section */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-xl font-bold text-foreground leading-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-muted-foreground leading-tight">
          {userProfile.name}
        </p>
      </div>

      {/* Right side Elements Section */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5 cursor-pointer border border-border">
          <span className="text-lg leading-none select-none">🇬🇧</span>
          <span className="text-foreground text-sm font-medium">US</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Search Icon */}
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer border border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Settings Icon */}
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer border border-border">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 bg-secondary rounded-full p-1 pr-4 cursor-pointer border border-border">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={userProfile.imageUrl}
              alt={userProfile.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-foreground font-semibold text-sm leading-tight">
              {userProfile.name}
            </h3>
            <p className="text-muted-foreground text-xs leading-tight">
              {userProfile.email}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
