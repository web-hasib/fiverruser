"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { ChevronDown } from "lucide-react";

interface LanguageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: { input: string; output: string }) => void;
}

const languages = [
  { name: "English", code: "gb" },
  { name: "Hungarian", code: "hu" },
];

const Flag = ({ code }: { code: string }) => {
  // Using a placeholder flag emoji for now, or you could use an image API
  const flags: Record<string, string> = {
    gb: "🇬🇧",
    hu: "🇭🇺",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
  };
  return <span className="text-lg">{flags[code] || "🌐"}</span>;
};

const LanguageSettingsModal = ({
  isOpen,
  onClose,
  onApply,
}: LanguageSettingsModalProps) => {
  const [inputLang, setInputLang] = useState("English");
  const [outputLang, setOutputLang] = useState("Hungarian");

  const [activeSelect, setActiveSelect] = useState<"input" | "output" | null>(
    null,
  );

  const handleApply = () => {
    console.log("Selected Languages:", {
      input: inputLang,
      output: outputLang,
    });
    onApply({ input: inputLang, output: outputLang });
    onClose();
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Language Settings"
      maxWidth="sm:max-w-[440px]"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div /> {/* Spacer */}
          <Button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 rounded-lg text-xs font-semibold"
          >
            Apply
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Input language
            </label>
            <div className="relative">
              <button
                onClick={() =>
                  setActiveSelect(activeSelect === "input" ? null : "input")
                }
                className="flex items-center justify-between w-full p-4 bg-muted/30 border border-border rounded-xl text-foreground font-medium hover:bg-muted/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Flag
                    code={
                      languages.find((l) => l.name === inputLang)?.code || ""
                    }
                  />
                  {inputLang}
                </div>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
              {activeSelect === "input" && (
                <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      onClick={() => {
                        setInputLang(l.name);
                        setActiveSelect(null);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer text-sm"
                    >
                      <Flag code={l.code} />
                      {l.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Output language
            </label>
            <div className="relative">
              <button
                onClick={() =>
                  setActiveSelect(activeSelect === "output" ? null : "output")
                }
                className="flex items-center justify-between w-full p-4 bg-muted/30 border border-border rounded-xl text-foreground font-medium hover:bg-muted/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Flag
                    code={
                      languages.find((l) => l.name === outputLang)?.code || ""
                    }
                  />
                  {outputLang}
                </div>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
              {activeSelect === "output" && (
                <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      onClick={() => {
                        setOutputLang(l.name);
                        setActiveSelect(null);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer text-sm"
                    >
                      <Flag code={l.code} />
                      {l.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardModal>
  );
};

export default LanguageSettingsModal;
