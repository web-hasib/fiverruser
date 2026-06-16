"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search, Check, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SelectPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patientName: string) => void;
  onOpenAdd?: () => void;
}

const patients = [
  "Saifur Rahman",
  "Courtney Henry",
  "Guy Hawkins",
  "Savannah Nguyen",
  "Theresa Webb",
  "Albert Flores",
  "Arlene McCoy",
];

const SelectPatientModal = ({
  isOpen,
  onClose,
  onSave,
  onOpenAdd,
}: SelectPatientModalProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Saifur Rahman");

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  const filteredPatients = patients.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="All patients"
      maxWidth="sm:max-w-[480px]"
    >
      <div className="flex flex-col gap-4 -mt-6 ">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Search</h4>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search Patient"
              className="bg-background border-border pl-10 h-12 rounded-xl focus-visible:ring-blue-500/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Select Patient
          </h4>
          <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {filteredPatients.map((patient) => (
              <div
                key={patient}
                onClick={() => setSelected(patient)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                  selected === patient
                    ? "bg-muted border border-accent"
                    : "hover:bg-muted/50 border border-transparent",
                )}
              >
                <span className="text-sm font-medium text-foreground/90">
                  {patient}
                </span>
                {selected === patient && (
                  <Check className="size-4 text-blue-500" />
                )}
              </div>
            ))}
            <div className="p-3 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              See more...
            </div>
          </div>
        </div>
        {onOpenAdd && (
          <div className="pt-1 flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider px-1">
                Patient not found?
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  onOpenAdd?.();
                }}
                className="text-blue-500 border-blue-500/20 hover:bg-blue-500/5 text-xs font-bold gap-2 h-10 px-4"
              >
                <Plus size={14} />
                Create New Patient
              </Button>
            </div>
            
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-10 rounded-lg text-sm font-semibold"
            >
              Select
            </Button>
          </div>
        )}
      </div>
    </DashboardModal>
  );
};

export default SelectPatientModal;
