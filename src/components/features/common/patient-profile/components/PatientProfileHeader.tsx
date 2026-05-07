import React from "react";
import { Button } from "@/src/components/ui/button";
import { 
  Copy, Edit2, Download, Send, Calendar, User, Phone, Mail, FileText, 
  Plus, MessageSquare, Sparkles, Share2, FileSignature
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";

export const PatientProfileHeader = () => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* ─── Top Main Header Box ─── */}
      <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
        
        {/* Left Side: Avatar & Info */}
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 size-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
            SR
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Saifur Rahman</h1>
              <button className="text-muted-foreground hover:text-foreground transition-colors"><Copy className="size-4" /></button>
              <div className="flex items-center gap-2 bg-muted/40 px-3 py-1 rounded-full border border-border/50 text-xs font-semibold text-muted-foreground ml-2">
                MED-XXXX <button className="hover:text-foreground"><Copy className="size-3" /></button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground/80 mt-1">
              <div className="flex items-center gap-1.5"><Calendar className="size-3.5" /> DOB: Oct 14, 2000 (24 yrs)</div>
              <div className="flex items-center gap-1.5"><User className="size-3.5" /> Male</div>
              <div className="flex items-center gap-1.5"><Phone className="size-3.5" /> +1 (555) 014-2847 <button><Copy className="size-3 opacity-60" /></button></div>
              <div className="flex items-center gap-1.5"><Mail className="size-3.5" /> saifur.rahman@email.com <button><Copy className="size-3 opacity-60" /></button></div>
              <div className="flex items-center gap-1.5"><FileText className="size-3.5" /> 123-45-6789 <button><Copy className="size-3 opacity-60" /></button></div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="bg-muted/30 border border-border/50 rounded-lg px-4 py-2 flex flex-col justify-center">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-0.5">Department</span>
                <span className="text-xs font-semibold text-foreground/80">General Surgery</span>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-lg px-4 py-2 flex flex-col justify-center">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-0.5">Entry Date</span>
                <span className="text-xs font-semibold text-foreground/80">Feb 10, 2026</span>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-lg px-4 py-2 flex flex-col justify-center">
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-0.5">Next Appointment</span>
                <span className="text-xs font-semibold text-foreground/80">Feb 20, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-start gap-2">
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 px-4 w-36 justify-center text-xs"
            onClick={() => toast.info("Edit Profile will be functional after backend integration")}
          >
            <Edit2 className="size-3.5 mr-2" /> Edit Profile
          </Button>
          <Button 
            variant="outline" 
            className="font-bold h-9 px-4 border-border/50 bg-card hover:bg-accent text-foreground w-36 justify-center text-xs"
            onClick={() => toast.info("Export PDF will be functional after backend integration")}
          >
            <Download className="size-3.5 mr-2" /> Export PDF
          </Button>
          <Button 
            variant="outline" 
            className="font-bold h-9 px-4 border-border/50 bg-card hover:bg-accent text-foreground w-36 justify-center text-xs"
            onClick={() => toast.info("Share ID will be functional after backend integration")}
          >
            <Send className="size-3.5 mr-2" /> Share ID
          </Button>
        </div>
      </div>

      {/* ─── Bottom Action Buttons Row ─── */}
      <div className="flex flex-wrap items-center gap-3">
        <Button 
          className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all"
          onClick={() => toast.info("Start New Session will be functional after backend integration")}
        >
          <Plus className="size-3.5 mr-1.5" /> Start New Session
        </Button>
        
        <Button 
          variant="outline" 
          className="h-9 px-4 border-emerald-500/30 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 text-[11px] font-bold transition-all"
          onClick={() => toast.info("Booked Appointment will be functional after backend integration")}
        >
          <Calendar className="size-3.5 mr-1.5" /> Booked Appointment
        </Button>

        <Button 
          variant="outline" 
          className="h-9 px-4 border-blue-500/30 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10 hover:text-blue-400 text-[11px] font-bold transition-all"
          onClick={() => toast.info("Send Message will be functional after backend integration")}
        >
          <MessageSquare className="size-3.5 mr-1.5" /> Send Message
        </Button>

        <Button 
          variant="outline" 
          className="h-9 px-4 border-purple-500/30 bg-purple-500/5 text-purple-500 hover:bg-purple-500/10 hover:text-purple-400 text-[11px] font-bold transition-all"
          onClick={() => toast.info("Generated feature will be functional after backend integration")}
        >
          <Sparkles className="size-3.5 mr-1.5" /> Generated
        </Button>

        <Button 
          variant="outline" 
          className="h-9 px-4 border-emerald-500/30 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 text-[11px] font-bold transition-all"
          onClick={() => toast.info("Send to Shared Folder will be functional after backend integration")}
        >
          <Share2 className="size-3.5 mr-1.5" /> Send to Shared Folder
        </Button>

        <Button 
          variant="outline" 
          className="h-9 px-4 border-amber-500/30 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400 text-[11px] font-bold transition-all"
          onClick={() => toast.info("Create a Task will be functional after backend integration")}
        >
          <Plus className="size-3.5 mr-1.5" /> Create a Task
        </Button>
      </div>
    </div>
  );
};
