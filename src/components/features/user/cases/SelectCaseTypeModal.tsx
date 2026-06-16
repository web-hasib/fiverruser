"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";

interface SelectCaseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (caseType: string) => void;
}

const caseTypes = [
  "Ambulatory",
  "Inpatient",
  "Surgery",
  "Radiology",
  "Consultation",
  "MDT / Oncoteam",
  "Administrative",
];

const SelectCaseTypeModal = ({
  isOpen,
  onClose,
  onConfirm,
}: SelectCaseTypeModalProps) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("Ambulatory");

  const handleConfirm = () => {
    onConfirm(selectedType);
    console.log(selectedType);
    router.push(`/dashboard/user/new/sonething?caseType=${selectedType}`);
    onClose();
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Case Type"
      maxWidth="sm:max-w-[480px]"
    >
      <div className="space-y-3">
        {caseTypes.map((type) => (
          <div
            key={type}
            onClick={() => setSelectedType(type)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border border-transparent",
              selectedType === type
                ? "bg-muted border-accent"
                : "hover:bg-muted/50",
            )}
          >
            <span className="text-foreground/90 font-medium">{type}</span>
            <div
              className={cn(
                "size-5 rounded-full border-2 flex items-center justify-center transition-all",
                selectedType === type
                  ? "border-blue-600 bg-blue-600"
                  : "border-muted-foreground/30",
              )}
            >
              {selectedType === type && (
                <div className="size-2 rounded-full bg-primary-foreground" />
              )}
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 pt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-12 border-none bg-secondary hover:bg-accent text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all"
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default SelectCaseTypeModal;
