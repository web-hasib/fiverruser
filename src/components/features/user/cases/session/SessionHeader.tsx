"use client";

import React from "react";
import {
  Link2,
  Trash2,
  Mic,
  Pause,
  Play,
  ChevronDown,
  Settings,
  Download,
  Calendar,
  Globe,
  Copy,
  Clock,
  User,
  Phone,
  FileText,
  Sparkles,
  Plus,
  Languages,
  Square,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import LiveAudioVisualizer from "../modals/LiveAudioVisualizer";
import SelectPatientModal from "../modals/SelectPatientModal";
import { AddPatientModal } from "@/src/components/features/user/patients/AddPatientModal";
import DatePopover from "./popovers/DatePopover";
import LanguagePopover from "./popovers/LanguagePopover";

import { LanguageSwitcher } from "@/src/components/google-translation/LanguageSwitcher";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { GlobalSearch } from "@/src/components/features/admin/dashboard/components/GlobalSearch";
import { useSidebar } from "@/src/components/features/admin/dashboard/components/SidebarProvider";
import { Menu } from "lucide-react";

interface SessionHeaderProps {
  recorder: any;
  id: string;
  isAssistanceActive?: boolean;
  onOpenAssistance: () => void;
  onOpenCreateTask: () => void;
  onOpenSettings?: () => void;
  userProfile?: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

const SessionHeader = ({ 
  recorder, 
  id, 
  isAssistanceActive, 
  onOpenAssistance, 
  onOpenCreateTask,
  onOpenSettings,
  userProfile = {
    name: "Dr. Jamal",
    email: "jamal@medsyst.com",
    imageUrl: "https://i.ibb.co.com/5hGpDBLy/Screenshot-2026-04-24-192428.png",
  }
}: SessionHeaderProps) => {
  const searchParams = useSearchParams();
  const workflow = searchParams.get("workflow") || "Ambulatory";
  const { toggleSidebarCollapse, isPastScribeOpen, togglePastScribe } = useSidebar();

  const { isRecording, isPaused, toggleRecording, pauseRecording, resumeRecording, recordingTime, mediaRecorder } = recorder;
  const [isSelectModalOpen, setIsSelectModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = React.useState(false);
  const [isLangPopoverOpen, setIsLangPopoverOpen] = React.useState(false);

  const [sessionDate, setSessionDate] = React.useState(new Date(2026, 3, 25));
  const [inputLang, setInputLang] = React.useState("English");
  const [outputLang, setOutputLang] = React.useState("Hungarian");

  const [selectedPatient, setSelectedPatient] = React.useState("");
  const [patientData, setPatientData] = React.useState<{ dob?: string, phone?: string, patientId?: string }>({});

  const handlePatientSelect = (patientName: string) => {
    setSelectedPatient(patientName);
    // Simulate fetching patient details
    setPatientData({
      dob: "Oct 14, 2000 (24 yrs)",
      phone: "+1 (555) 014-2847",
      patientId: "123-45-6789"
    });
  };

  const handleAddPatientSave = (data: any) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    setSelectedPatient(fullName);
    setPatientData({
      dob: data.dob ? `${format(data.dob, "MMM dd, yyyy")} (newly added)` : "N/A",
      phone: data.phone || "N/A",
      patientId: "NEW-" + Math.floor(Math.random() * 10000)
    });
  };

  const clearPatient = () => {
    setSelectedPatient("");
    setPatientData({});
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="flex flex-col bg-background border-b border-border shadow-sm">
      {/* Row 1: Patient, Global Search, Theme, User */}
      <div className="flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 gap-1 md:gap-4 border-b border-border/50">
        {/* Left: Patient Info */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <button 
            onClick={toggleSidebarCollapse}
            className="lg:hidden p-1.5 md:p-2 -ml-2 rounded-xl hover:bg-secondary text-foreground transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          <button
            title="Select patient"
            onClick={() => setIsSelectModalOpen(true)}
            className="size-8 md:size-9 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-600/20 transition-all border border-blue-600/20 shadow-sm"
          >
            <Link2 size={16} className="md:w-[18px] md:h-[18px]" />
          </button>

          <div className={cn(
            "flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-xl border transition-all duration-300 w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] group bg-card focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/40",
            selectedPatient ? "border-blue-500/30 shadow-[0_0_10px_-3px_rgba(59,130,246,0.1)]" : "border-border"
          )}>
            <User size={14} className={cn("shrink-0 md:w-4 md:h-4", selectedPatient ? "text-blue-500" : "text-muted-foreground/40")} />
            <input
              type="text"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              placeholder="Patient"
              className="bg-transparent border-none outline-none text-[10px] md:text-sm font-semibold text-foreground placeholder:text-muted-foreground/60 w-full"
            />
            {selectedPatient && (
              <button
                onClick={clearPatient}
                className="text-muted-foreground/40 hover:text-red-500 transition-colors shrink-0"
              >
                <Trash2 size={12} className="md:w-3.5 md:h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Middle: Global Search + Patient Details (Hidden on small screens) */}
        <div className="flex-1 flex items-center gap-2 md:gap-4 min-w-0 max-w-2xl justify-center">
          <GlobalSearch className="flex-1 min-w-[120px] lg:max-w-[300px] xl:max-w-[400px] 2xl:max-w-[600px]" />
          
          {selectedPatient && (
            <div className="hidden min-[1600px]:flex items-center gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500 shrink-0">
              <div className="flex items-center gap-1">
                <Calendar size={13} className="text-muted-foreground/60" />
                <span className="text-[10px] font-medium text-muted-foreground">
                  DOB: <span className="text-foreground/80 font-bold">{patientData.dob}</span>
                </span>
              </div>

              <div className="w-px h-3 bg-border/50" />

              <div className="flex items-center gap-1">
                <Phone size={13} className="text-muted-foreground/60" />
                <span className="text-[10px] font-medium text-foreground/80 font-bold">
                  {patientData.phone}
                </span>
                <button
                  onClick={() => {
                    if (patientData.phone && patientData.phone !== "N/A") {
                      navigator.clipboard.writeText(patientData.phone);
                      toast.success("Phone number copied");
                    }
                  }}
                  className="p-0.5 hover:text-blue-500 transition-colors text-muted-foreground/30"
                  title="Copy phone number"
                >
                  <Copy size={11} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Theme, Language, User */}
        <div className="flex items-center gap-1 md:gap-3 shrink-0">
          <div className="hidden min-[1100px]:flex items-center gap-1 md:gap-1.5 ">
            <ThemeToggle />
            <div className="w-px h-4 bg-border/50" />
            <LanguageSwitcher />
          </div>

            <div className="flex items-center md:gap-2 gap-0.5 bg-secondary rounded-full p-0.5 md:p-1 pr-2 md:pr-2 cursor-pointer border border-border">
                    <div className="md:w-7 md:h-7 w-5 h-5 rounded-full overflow-hidden shrink-0">
                      <img
                        src={userProfile.imageUrl}
                        alt={userProfile.name}
                        className="w-5 h-5 md:w-full md:h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-col hidden xl:flex text-left">
                      <h3 className="text-foreground font-semibold text-xs leading-tight">
                        {userProfile.name}
                      </h3>
                      <p className="text-muted-foreground text-[10px] leading-tight">
                        {userProfile.email}
                      </p>
                    </div>
                    <ChevronDown className="md:w-4 md:h-4 w-2 h-2 text-muted-foreground ml-1" />
                  </div>
        </div>
      </div>

      {/* Row 2: Date/Lang, Recording, Actions */}
      <div className="flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 bg-muted/5 gap-1.5 md:gap-4">
        {/* Left: Date & Language Selectors */}
        <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
          <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 cursor-pointer transition-all group">
                <Calendar size={15} className="text-blue-500" />
                <span className="text-[11px] font-bold text-foreground hidden lg:inline truncate max-w-[80px]">
                  {format(sessionDate, "MMM dd")}
                </span>
                <ChevronDown size={11} className="text-muted-foreground group-hover:text-blue-500 transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none bg-transparent shadow-none" align="start" sideOffset={8}>
              <DatePopover
                isOpen={true}
                onClose={() => setIsDatePopoverOpen(false)}
                onApply={(date) => { setSessionDate(date); setIsDatePopoverOpen(false); }}
              />
            </PopoverContent>
          </Popover>

          <Popover open={isLangPopoverOpen} onOpenChange={setIsLangPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 cursor-pointer transition-all group">
                <Languages size={15} className="text-blue-500" />
                <div className="text-[10px] hidden lg:flex items-center justify-between flex-nowrap gap-.5 text-foreground font-bold truncate max-w-[100px]">
                  <span className="flex-1 uppercase">{inputLang.slice(0, 3)}</span> 
                  <ChevronRight size={11} className="text-blue-500 shrink-0" /> 
                  <span className="flex-1 text-right uppercase">{outputLang.slice(0, 3)}</span>
                </div>
                <ChevronDown size={11} className="text-muted-foreground group-hover:text-blue-500 transition-colors" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none bg-transparent shadow-none" align="start" sideOffset={8}>
              <LanguagePopover
                isOpen={true}
                selectedInput={inputLang}
                selectedOutput={outputLang}
                onSelectInput={setInputLang}
                onSelectOutput={setOutputLang}
                onClose={() => setIsLangPopoverOpen(false)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Middle: Recording Controls (Pinned) */}
        <div className="flex items-center gap-1.5 md:gap-4 shrink-0 justify-center">
          <Button
            onClick={toggleRecording}
            className={cn(
              "size-8 md:size-9 rounded-full flex items-center justify-center transition-all shrink-0 shadow-lg border-none p-0",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/40 animate-pulse" 
                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 shadow-blue-500/20"
            )}
          >
            {isRecording ? (
              <Square size={12} className="fill-white text-white md:w-3.5 md:h-3.5" />
            ) : (
              <Mic size={18} className="text-white md:w-5 md:h-5" />
            )}
          </Button>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden min-[1400px]:flex items-center gap-1.5 h-7 overflow-hidden w-[100px] lg:w-[150px]">
              {isRecording && !isPaused ? (
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  width={150}
                  height={24}
                  barWidth={2}
                  gap={2}
                  barColor="#3b82f6"
                />
              ) : (
                <div className="flex items-center gap-1.5 opacity-30">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-3 bg-blue-500 rounded-full" />
                  ))}
                </div>
              )}
            </div>
            <span className="text-sm md:text-lg font-mono font-black text-foreground tracking-tighter w-12 md:w-20 text-center">
              {recordingTime}
            </span>
          </div>

          {isRecording && (
            <Button
              onClick={isPaused ? resumeRecording : pauseRecording}
              variant="outline"
              className="h-8 md:h-9 border-border bg-card hover:bg-accent text-foreground rounded-xl gap-1 md:gap-2 text-[10px] md:text-xs font-bold px-2 md:px-4 shadow-sm"
            >
              {isPaused ? <Play size={12} className="md:w-3.5 md:h-3.5 fill-current" /> : <Pause size={12} className="md:w-3.5 md:h-3.5 fill-current" />}
              <span className="uppercase tracking-widest hidden min-[1400px]:inline">{isPaused ? "Resume" : "Pause"}</span>
            </Button>
          )}
        </div>

        {/* Right Section: Actions & Workflow */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <div className="flex items-center gap-1 md:gap-1.5">
            <button 
              className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-sm bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] md:text-xs font-bold hover:bg-purple-600/20 transition-all shadow-sm group"
              onClick={onOpenAssistance}
            >
              <Sparkles size={14} className="group-hover:scale-110 transition-transform md:w-3.5 md:h-3.5" />
              <span className="hidden min-[1600px]:inline">Assistants</span>
            </button>

            <button 
              className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-sm bg-card border border-border text-foreground text-[10px] md:text-xs font-bold hover:bg-accent hover:border-border/80 transition-all shadow-sm group"
              onClick={onOpenCreateTask}
            >
              <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors md:w-3.5 md:h-3.5" />
              <span className="hidden min-[1600px]:inline">To Do</span>
            </button>

            <button 
              className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-sm bg-card border border-border text-foreground text-[10px] md:text-xs font-bold hover:bg-accent hover:border-border/80 transition-all shadow-sm group"
              onClick={onOpenAssistance}
            >
              <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors md:w-3.5 md:h-3.5" />
              <span className="hidden min-[1600px]:inline">Letter</span>
            </button>
          </div>

          <div className="w-px h-6 bg-border/60 mx-0.5 md:mx-1 hidden min-[1400px]:block" />

          <button
            title="Settings"
            onClick={onOpenSettings}
            className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl border border-border shadow-sm transition-all shrink-0"
          >
            <Settings size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>

      <SelectPatientModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSave={handlePatientSelect}
        onOpenAdd={() => setIsAddModalOpen(true)}
      />

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddPatientSave}
      />
    </div>
  );
};

export default SessionHeader;
