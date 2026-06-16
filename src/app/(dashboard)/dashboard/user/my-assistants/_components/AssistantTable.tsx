"use client";

import React, { useState } from "react";
import { Pin, Star, Trash2 } from "lucide-react";
import { Assistant, AssistantVisibility } from "@/src/constant/assistant";

// A sub-component for handling the inline visibility dropdown logic easily
const VisibilityCell = ({
  visibility,
  onUpdateVisibility,
}: {
  visibility: AssistantVisibility;
  onUpdateVisibility: (v: AssistantVisibility) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getVisibilityColor = (vis: string) => {
    switch (vis) {
      case "Private":
        return "text-red-500";
      case "Shared with Team":
        return "text-blue-500";
      case "Public":
        return "text-green-500";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm font-medium ${getVisibilityColor(
          visibility
        )} hover:underline flex items-start`}
      >
        {visibility}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-5 py-3 border-b border-border/50">
              <h4 className="text-foreground font-medium text-sm">Change Visibility Access</h4>
            </div>
            <div className="flex flex-col py-2">
              {["Private", "Shared with Team", "Public"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onUpdateVisibility(option as AssistantVisibility);
                  }}
                  className={`flex items-center justify-between px-5 py-3 text-sm font-medium hover:bg-accent transition ${getVisibilityColor(
                    option
                  )}`}
                >
                  {option}
                  {visibility === option && (
                    <span className="text-blue-500">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="px-5 pb-4 pt-1 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition"
              >
                SAVE
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface TableProps {
  assistants: Assistant[];
}

export const AssistantTable = ({ assistants }: TableProps) => {
  return (
    <div className="w-full bg-card rounded-xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 rounded border-border/50 bg-transparent text-blue-600 focus:ring-0" />
              </th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Assistant Name</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Medical Specialty</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Type</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Clinical Role</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Documentum Type</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Created Date</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">Visibility</th>
              <th className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {assistants.map((assistant) => (
              <tr key={assistant.id} className="border-b border-border/50 hover:bg-accent transition-colors group">
                <td className="py-4 px-6">
                  <input type="checkbox" className="w-4 h-4 rounded border-border/50 bg-transparent text-blue-600 focus:ring-0 cursor-pointer" />
                </td>
                <td className="py-4 px-6 text-sm text-foreground whitespace-nowrap">{assistant.name}</td>
                <td className="py-4 px-6 text-sm text-foreground whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{assistant.medicalSpecialty.icon}</span>
                    <span>{assistant.medicalSpecialty.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-foreground whitespace-nowrap">{assistant.type}</td>
                <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{assistant.clinicalRole}</td>
                <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{assistant.documentumType}</td>
                <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{assistant.createdDate}</td>
                <td className="py-4 px-6 whitespace-nowrap relative">
                  <VisibilityCell
                    visibility={assistant.visibility}
                    onUpdateVisibility={() => {}}
                  />
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-3 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                    <button className="hover:text-foreground transition"><Pin className="w-4 h-4" /></button>
                    <button className="hover:text-foreground transition"><Star className="w-4 h-4" /></button>
                    <button className="hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
