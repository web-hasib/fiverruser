import React from "react";
import { ProfileSectionCard } from "@/src/components/features/user/patients/profile/ProfileSectionCard";
import { PenTool, Edit3, Trash2, Plus } from "lucide-react";

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
        {/* Dummy Session Row 1 */}
        <div className="flex items-start justify-between p-3 rounded-xl hover:bg-muted/30 border border-transparent hover:border-border/50 group transition-all">
          <div className="flex gap-3">
            <input type="checkbox" className="size-4 rounded border-border bg-transparent mt-1 cursor-pointer" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">Saifur Rahman</span>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-emerald-500" /> Active | ER • 
                  <span className="px-1.5 py-0.5 rounded border border-rose-500/30 text-rose-500 bg-rose-500/5">Emergency</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup,</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">12:00 AM</span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3.5" /></button>
              <button className="text-muted-foreground hover:text-rose-500"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Dummy Session Row 2 */}
        <div className="flex items-start justify-between p-3 rounded-xl hover:bg-muted/30 border border-transparent hover:border-border/50 group transition-all">
          <div className="flex gap-3">
            <input type="checkbox" className="size-4 rounded border-border bg-transparent mt-1 cursor-pointer" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">Saifur Rahman</span>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-emerald-500" /> Active | ER • 
                  <span className="px-1.5 py-0.5 rounded border border-amber-500/30 text-amber-500 bg-amber-500/5">Cardiology</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup,</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">12:00 AM</span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3.5" /></button>
              <button className="text-muted-foreground hover:text-rose-500"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Dummy Session Row 3 */}
        <div className="flex items-start justify-between p-3 rounded-xl hover:bg-muted/30 border border-transparent hover:border-border/50 group transition-all">
          <div className="flex gap-3">
            <input type="checkbox" className="size-4 rounded border-border bg-transparent mt-1 cursor-pointer" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">Saifur Rahman</span>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-emerald-500" /> Active | ER • 
                  <span className="px-1.5 py-0.5 rounded border border-purple-500/30 text-purple-500 bg-purple-500/5">Surgery</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Chest pain, SOB, possible ACS workup, Chest pain, SOB, possible ACS workup,</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">12:00 AM</span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3.5" /></button>
              <button className="text-muted-foreground hover:text-rose-500"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    </ProfileSectionCard>
  );
};
