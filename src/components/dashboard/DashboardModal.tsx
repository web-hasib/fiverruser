"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  hideCloseButton?: boolean;
}

export const DashboardModal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = "",
  hideCloseButton = false,
}: DashboardModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-card border-border text-foreground p-0 overflow-hidden shadow-2xl transition-colors flex flex-col max-h-[90vh] [&>button]:text-rose-500 [&>button]:top-7 [&>button]:right-7 [&>button]:opacity-100 hover:[&>button]:bg-white/5 [&>button]:rounded-full [&>button_svg]:size-6 [&>button_svg]:stroke-[2.5px]",
          hideCloseButton && "[&>button]:hidden",
          maxWidth ? maxWidth : "sm:max-w-[500px]",
          className,
        )}
      >
        {title ? (
          <DialogHeader className="p-6 pb-1 border-b border-border/50 shrink-0">
            <DialogTitle className="text-xl font-bold tracking-tight">
              {title}
            </DialogTitle>
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Dialog</DialogTitle>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pt-2 pb-6 custom-scrollbar">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DashboardModal;
