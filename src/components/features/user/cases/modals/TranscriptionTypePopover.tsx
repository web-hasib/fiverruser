"use client";

import React from "react";
import { Check, Mic, FileAudio, PhoneIcon, Upload } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface TranscriptionTypePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (type: string) => void;
}

const types = [
  { id: "Transcribe", label: "Transcribe", icon: Mic },
  { id: "Dictate", label: "Dictate", icon: FileAudio },
  { id: "Telehealth", label: "Telehealth", icon: PhoneIcon },
  { id: "Upload Session Audio", label: "Upload Session Audio", icon: Upload },
];

const TranscriptionTypePopover = ({
  isOpen,
  onClose,
  selected,
  onSelect,
}: TranscriptionTypePopoverProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90]" onClick={onClose} />
      <div className="absolute top-12 right-0 w-64 bg-background border border-border rounded-xl shadow-2xl z-[100] p-2 py-3 animate-in fade-in zoom-in duration-200">
        <div className="px-3 pb-3 pt-1">
          <h4 className="text-sm font-bold text-foreground">Select Type</h4>
        </div>
        <div className="space-y-1">
          {types.map((type) => (
            <div
              key={type.id}
              onClick={() => {
                console.log("Selected Transcription Type:", type.label);
                onSelect(type.label);
                onClose();
              }}
              className={cn(
                "flex items-center justify-between p-2.5 px-3 rounded-lg cursor-pointer transition-all",
                selected === type.label
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                {type.icon && <type.icon className="size-4" />}
                <span className="text-sm font-medium">{type.label}</span>
              </div>
              {selected === type.label && (
                <Check className="size-4 text-foreground/80" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TranscriptionTypePopover;
