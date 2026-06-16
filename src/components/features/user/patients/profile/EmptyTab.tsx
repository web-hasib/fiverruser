import React from "react";
import { FileText } from "lucide-react";

interface EmptyTabProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export const EmptyTab = ({ title, subtitle, icon }: EmptyTabProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 opacity-80">
        {icon || <FileText className="size-16 text-muted-foreground/40 shrink-0 mx-auto" />}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm font-medium text-muted-foreground max-w-md mx-auto">
        {subtitle}
      </p>
    </div>
  );
};
