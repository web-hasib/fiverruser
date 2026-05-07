
'use client'
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Step1Props {
  onNext: () => void;
  onCancel: () => void;
}

export function Step1Scratch({ onNext, onCancel }: Step1Props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      <div className="flex-1">
        <div
          onClick={() => setIsSelected(!isSelected)}
          className={`bg-background border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition ${isSelected ? "border-[#4D8EF5] bg-[#4D8EF5]/10 shadow-md shadow-[#4D8EF5]/10" : "border-border/50 hover:border-[#4D8EF5]/50"
            }`}
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Make your Medical Assistant with Custom Template!
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Define your own sections, structure, and rules from scratch. Full control over every aspect of your Medical Assistant.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-background border border-border/50 text-[#4D8EF5] font-medium text-xs px-4 py-1.5 rounded-full">
                Any Specialty
              </span>
              <span className="bg-background border border-border/50 text-[#4D8EF5] font-medium text-xs px-4 py-1.5 rounded-full">
                Any Setting
              </span>
              <span className="bg-background border border-border/50 text-foreground font-medium text-xs px-4 py-1.5 rounded-full shadow-sm shadow-[#4D8EF5]/10">
                Fully Custom
              </span>
            </div>
          </div>

          <div>
            {isSelected ? (
              <button className="flex items-center gap-2 bg-[#4D8EF5] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap">
                ✓ Selected
              </button>
            ) : (
              <button className="flex items-center gap-2 bg-transparent border border-border/50 hover:bg-accent text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap">
                Start from scratch <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Action Buttons */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="bg-transparent border border-border/50 hover:bg-accent text-foreground px-8 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Cancel
        </button>
        {isSelected && (
          <button
            onClick={onNext}
            className="bg-[#4D8EF5] hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-[#4D8EF5]/20"
          >
            CONTINUE <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
