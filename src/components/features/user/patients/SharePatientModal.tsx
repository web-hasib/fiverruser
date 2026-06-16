"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Patient } from "@/src/types/patient";

interface SharePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onShare: (email: string, id: string) => void;
}

export const SharePatientModal = ({
  isOpen,
  onClose,
  patient,
  onShare,
}: SharePatientModalProps) => {
  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Patient"
      maxWidth="sm:max-w-[450px]"
    >
      <div className="space-y-6">
        {patient && (
          <div className="bg-muted/30 rounded-xl p-4 border border-border transition-colors group">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">
              Sharing Profile
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold text-foreground">
                Patient #{patient.patientId.split("-")[1] || patient.patientId}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
              {patient.age} years • {patient.gender} • {patient.bloodGroup}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-muted-foreground"
            >
              Doctor Email Address
            </Label>
            <Input
              id="email"
              placeholder="xyz@gmail.com"
              className="bg-muted/30 border-border focus:border-blue-500/50 focus:ring-blue-500/20 transition-all h-11 px-4 text-foreground"
            />
          </div>

          <div className="flex items-center gap-4 py-2 opacity-30">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-[10px] font-bold text-muted-foreground">
              OR
            </span>
            <div className="h-px flex-1 bg-border"></div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="doctorId"
              className="text-sm font-semibold text-muted-foreground"
            >
              Doctor Unique ID
            </Label>
            <Input
              id="doctorId"
              placeholder="DOC-12345"
              className="bg-muted/30 border-border focus:border-blue-500/50 focus:ring-blue-500/20 transition-all h-11 px-4 text-foreground"
            />
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
          <p className="text-[11px] leading-relaxed text-amber-600/80 italic">
            <span className="text-amber-600 font-bold not-italic">
              Privacy Note:
            </span>{" "}
            Patient details will be shared securely. The recipient will receive
            view-only access to this record.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 bg-background hover:bg-muted text-foreground border border-border h-12 rounded-xl transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onShare("", "")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-0 h-12 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
          >
            Share Patient
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};
