import React from "react";
import { Button } from "@/src/components/ui/button";
import { RotateCw, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ProfileSectionCardProps {
  title: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  actionText?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  onRefresh?: () => void;
  showViewAll?: boolean;
  onViewAll?: () => void;
  additionalHeadElement?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ProfileSectionCard = ({
  title,
  icon,
  iconBg = "bg-muted/50",
  iconColor = "text-foreground",
  actionText,
  actionIcon,
  onAction,
  onRefresh,
  showViewAll,
  onViewAll,
  additionalHeadElement,
  children,
  className
}: ProfileSectionCardProps) => {
  return (
    <div className={cn("bg-card border border-border/50 rounded-xl overflow-hidden", className)}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-muted/10">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn("size-8 rounded-lg flex items-center justify-center border border-border/50", iconBg)}>
              <span className={iconColor}>{icon}</span>
            </div>
          )}
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {additionalHeadElement}
          
          {showViewAll && (
            <Button variant="ghost" onClick={onViewAll} size="sm" className="hidden sm:flex text-xs font-semibold text-muted-foreground hover:text-foreground h-8">
              View All <ChevronRight className="size-3 ml-1" />
            </Button>
          )}

          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh} className="h-8 px-3 border-border/50 bg-card text-xs font-bold gap-2 hover:bg-accent hidden xs:flex">
              <RotateCw className="size-3" /> Refresh
            </Button>
          )}

          {actionText && (
            <Button size="sm" onClick={onAction} className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold whitespace-nowrap">
              {actionIcon && <span className="mr-1.5">{actionIcon}</span>}
              {actionText}
            </Button>
          )}
        </div>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};
