"use client";

import React from "react";
import { ProfileSectionCard } from "@/src/components/features/user/patients/profile/ProfileSectionCard";
import { PenTool, Trash2, Plus } from "lucide-react";

type SessionStatus = "Active" | "Completed" | "Pending";
type SessionType = "Emergency" | "Cardiology" | "Surgery" | "Ambulatory" | "Consultation";

const typeStyles: Record<SessionType, string> = {
  Emergency:    "border-rose-500/30 text-rose-500 bg-rose-500/5",
  Cardiology:   "border-amber-500/30 text-amber-500 bg-amber-500/5",
  Surgery:      "border-purple-500/30 text-purple-500 bg-purple-500/5",
  Ambulatory:   "border-blue-500/30 text-blue-500 bg-blue-500/5",
  Consultation: "border-teal-500/30 text-teal-500 bg-teal-500/5",
};

const statusDot: Record<SessionStatus, string> = {
  Active:    "bg-emerald-500",
  Completed: "bg-muted-foreground",
  Pending:   "bg-amber-500",
};

const DUMMY_SESSIONS: {
  id: string;
  name: string;
  status: SessionStatus;
  type: SessionType;
  description: string;
  time: string;
}[] = [
  { id: "sess-001", name: "Saifur Rahman", status: "Active",    type: "Emergency",    description: "Chest pain, SOB, possible ACS workup.",       time: "12:00 AM" },
  { id: "sess-002", name: "Nadia Islam",   status: "Active",    type: "Cardiology",   description: "Post-CABG follow-up, rhythm monitoring.",      time: "9:30 AM"  },
  { id: "sess-003", name: "Tariq Hossain", status: "Completed", type: "Surgery",      description: "Pre-op appendectomy assessment completed.",    time: "3:15 PM"  },
];

export const SessionsTabContent = () => {
  return (
    <ProfileSectionCard
      title="Related Sessions"
      icon={<PenTool className="size-4" />}
      iconBg="bg-emerald-500/10"
      iconColor="text-emerald-500"
      showViewAll
      onViewAll={() => {}}
      onRefresh={() => {}}
      actionText="New Session"
      actionIcon={<Plus className="size-3" />}
      onAction={() => {}}
    >
      <div className="flex flex-col gap-1 w-full">
        {DUMMY_SESSIONS.map((session) => (
          <div
            key={session.id}
            className="flex items-start justify-between p-3 rounded-xl border border-transparent group"
          >
            <div className="flex gap-3">
              <input
                type="checkbox"
                className="size-4 rounded border-border bg-transparent mt-1 cursor-pointer shrink-0"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      (window.location.href = `/dashboard/user/new/session/${session.id}`)
                    }
                    className="text-sm font-bold cursor-pointer text-foreground hover:text-blue-500 hover:underline transition-colors text-left"
                  >
                    {session.name}
                  </button>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                    <div className={`size-1.5 rounded-full ${statusDot[session.status]}`} />
                    {session.status} | ER •
                    <span className={`px-1.5 py-0.5 rounded border ${typeStyles[session.type]}`}>
                      {session.type}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{session.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{session.time}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground cursor-pointer hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileSectionCard>
  );
};
