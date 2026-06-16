"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { Download, Share2, Edit3, User } from "lucide-react";
import { Patient } from "@/src/types/patient";

interface PatientHeaderProps {
  patient: Patient;
  onEdit: () => void;
  onShare: () => void;
}

export const PatientHeader = ({
  patient,
  onEdit,
  onShare,
}: PatientHeaderProps) => {
  return (
    <div className="w-full bg-card rounded-3xl p-6 border border-border mb-6 shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="size-16 md:size-20 rounded-full bg-blue-500/10 flex items-center justify-center border-2 border-border transition-colors">
            <span className="text-2xl md:text-3xl font-bold text-blue-600 uppercase">
              {patient.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              {patient.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="bg-background border-border text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl h-11 px-5 transition-all"
          >
            <Download className="size-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={onShare}
            className="bg-background border-border text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl h-11 px-5 transition-all"
          >
            <Share2 className="size-4 mr-2" />
            Share ID
          </Button>
          <Button
            variant="default"
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 font-semibold shadow-md transition-all"
          >
            <Edit3 className="size-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 border-t border-border pt-8">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center transition-colors">
            <User className="size-6 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Patient ID
            </p>
            <p className="text-base font-semibold text-foreground">
              {patient.patientId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-l border-border pl-0 sm:pl-6 transition-colors">
          <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center transition-colors">
            <span className="text-xl font-bold text-purple-500">
              {patient.age}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Age
            </p>
            <p className="text-base font-semibold text-foreground">
              {patient.age} Years
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-l border-border pl-0 sm:pl-6 transition-colors">
          <div className="size-12 rounded-xl bg-pink-500/10 flex items-center justify-center transition-colors">
            <span className="text-xl font-bold text-pink-500">
              {patient.gender === "Male" ? "♂" : "♀"}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">
              Gender
            </p>
            <p className="text-base font-semibold text-foreground">
              {patient.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
