"use client";

import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface LanguagePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInput: string;
  selectedOutput: string;
  onSelectInput: (lang: string) => void;
  onSelectOutput: (lang: string) => void;
}

const languages = [
  { name: "English", code: "gb", flag: "🇬🇧" },
  { name: "Hungarian", code: "hu", flag: "🇭🇺" },
];

const LanguagePopover = ({ isOpen, onClose, selectedInput, selectedOutput, onSelectInput, onSelectOutput }: LanguagePopoverProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-56 bg-card border border-border rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200">
      <div className="space-y-5">
        {/* Input Language */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Input Language</h4>
          <Select value={selectedInput} onValueChange={onSelectInput}>
            <SelectTrigger className="w-full h-9 text-xs font-semibold bg-muted/20 border-transparent hover:bg-muted/40 transition-all rounded-lg">
              <SelectValue placeholder="Select input" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border rounded-lg shadow-xl">
              {languages.map((l) => (
                <SelectItem key={`in-${l.code}`} value={l.name} className="text-xs font-medium cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Output Language */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Output Language</h4>
          <Select value={selectedOutput} onValueChange={onSelectOutput}>
            <SelectTrigger className="w-full h-9 text-xs font-semibold bg-muted/20 border-transparent hover:bg-muted/40 transition-all rounded-lg">
              <SelectValue placeholder="Select output" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border rounded-lg shadow-xl">
              {languages.map((l) => (
                <SelectItem key={`out-${l.code}`} value={l.name} className="text-xs font-medium cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={onClose}
          className="w-full h-8 mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-all shadow-md shadow-blue-500/20"
        >
          Apply Languages
        </button>
      </div>
    </div>
  );
};

export default LanguagePopover;
