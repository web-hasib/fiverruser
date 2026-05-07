"use client";

import React from "react";
import { Case } from "@/src/types/patient";
import { FileText } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface ActiveCasesProps {
  cases: Case[];
  onViewCase: (id: string) => void;
}

export const ActiveCases = ({ cases, onViewCase }: ActiveCasesProps) => {
  return (
    <div className="bg-card rounded-3xl p-6 border border-border h-full shadow-sm transition-colors">
      <h2 className="text-xl font-bold text-foreground mb-6">Active Case</h2>
      <div className="space-y-4">
        {cases.length > 0 ? (
          cases.map((c) => (
            <div
              key={c.id}
              className="bg-muted/30 rounded-2xl p-4 border border-border group hover:border-blue-500/30 hover:bg-muted/50 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <FileText className="size-8 " />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {c.title}
                    </h3>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs text-blue-600 hover:text-blue-500 font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCase(c.id);
                      }}
                    >
                      View Case
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1 group-hover:text-foreground transition-colors">
                    {c.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    <span>{c.date}</span>
                    <span className="size-1 rounded-full bg-border" />
                    <span className="truncate">{c.doctor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-50">
            <FileText className="size-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No active cases found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
