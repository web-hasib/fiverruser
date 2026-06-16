import React from "react";
import { Button } from "@/src/components/ui/button";
import { Plus, Edit3, Trash2, Phone } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface WidgetCardProps {
  title: string;
  onAdd?: () => void;
  children: React.ReactNode;
}

const WidgetCard = ({ title, onAdd, children }: WidgetCardProps) => (
  <div className="bg-card border border-border/50 rounded-xl overflow-hidden flex flex-col">
    <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/10">
      <h4 className="text-sm font-bold text-foreground">{title}</h4>
      {onAdd && (
        <Button size="sm" onClick={onAdd} className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold">
          <Plus className="size-3 mr-1" /> Add
        </Button>
      )}
    </div>
    <div className="p-4 flex flex-col gap-4">
      {children}
    </div>
  </div>
);

export const OverviewSidebarWidgets = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* Conditions & ICD-10 */}
      <WidgetCard title="Conditions & ICD-10" onAdd={() => {}}>
        <div className="flex flex-col gap-2 relative group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Appendicitis (resolved)</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 text-amber-500 bg-amber-500/5">K37</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 ml-2">
                    <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3" /></button>
                    <button className="text-muted-foreground hover:text-rose-500"><Trash2 className="size-3" /></button>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-500 bg-emerald-500/5">Resolved</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 relative group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Penicillin Allergy</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-rose-500/30 text-rose-500 bg-rose-500/5 mt-1 w-max">Z88.0</span>
              </div>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-rose-500/30 text-rose-500 bg-rose-500/5">Chronic</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 relative group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Essential Hypertension</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-500/30 text-blue-500 bg-blue-500/5 mt-1 w-max">I10</span>
              </div>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-500 bg-amber-500/5">Managed</span>
          </div>
        </div>
      </WidgetCard>

      {/* Surgeries */}
      <WidgetCard title="Surgeries" onAdd={() => {}}>
        <div className="flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">Laparoscopic Appendectomy</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Feb 10, 2024</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
            <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3.5" /></button>
          </div>
        </div>
        <div className="flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">Tonsillectomy</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Mar 1, 2012</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
            <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3.5" /></button>
            <button className="text-muted-foreground hover:text-rose-500"><Trash2 className="size-3.5" /></button>
          </div>
        </div>
      </WidgetCard>

      {/* Current Medications */}
      <WidgetCard title="Current Medications" onAdd={() => {}}>
        <div className="flex items-start justify-between group">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">Ibuprofen 400mg</span>
            <span className="text-[9px] text-muted-foreground mt-1 max-w-[150px] leading-relaxed">Every 8h - Post-op pain - Until Feb 20</span>
          </div>
          <span className="text-[9px] font-bold text-emerald-500">Active</span>
        </div>
        <div className="flex items-start justify-between group mt-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">Ondansetron 4mg</span>
            <span className="text-[9px] text-muted-foreground mt-1 max-w-[150px] leading-relaxed">PRN - Anti nausea - 7-day course</span>
          </div>
          <span className="text-[9px] font-bold text-amber-500">Ended</span>
        </div>
      </WidgetCard>

      {/* Allergies */}
      <WidgetCard title="Allergies" onAdd={() => {}}>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-rose-500">Penicillin</span>
            <span className="text-[9px] text-muted-foreground mt-1 leading-relaxed">Severe rash, anaphylaxis risk — avoid all beta-lactam antibiotics<br/>Confirmed 2019 - Allergy test</span>
          </div>
          <span className="text-[9px] font-bold text-rose-500 ml-2 whitespace-nowrap">High Risk</span>
        </div>
        <div className="flex items-start justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground">Latex</span>
            <span className="text-[9px] text-muted-foreground mt-1 leading-relaxed">Contact dermatitis — inform surgical/procedure team<br/>Reported 2015 - Patient self-report</span>
          </div>
          <span className="text-[9px] font-bold text-amber-500 ml-2 whitespace-nowrap">Moderate</span>
        </div>
      </WidgetCard>

      {/* Emergency Contact */}
      <WidgetCard title="Emergency Contact" onAdd={() => {}}>
        <div className="flex items-center gap-3 group">
          <div className="size-10 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
            <Phone className="size-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-bold text-foreground truncate">Amy Warren</span>
            <span className="text-[10px] text-muted-foreground mt-0.5 truncate">Sister • +1 (310) 555-0118</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 ml-2">
            <button className="text-muted-foreground hover:text-foreground"><Edit3 className="size-3.5" /></button>
            <button className="text-muted-foreground hover:text-rose-500"><Trash2 className="size-3.5" /></button>
          </div>
        </div>
      </WidgetCard>
      
    </div>
  );
};
