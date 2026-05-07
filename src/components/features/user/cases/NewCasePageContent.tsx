"use client";

import React, { useState, useCallback } from "react";
import {
  Paperclip,
  Send,
  Sparkles,
  Mic,
  RotateCcw,
  Link2,
  Calendar,
  Globe,
  Bot,
  ChevronDown,
  X,
  Plus as PlusIconSmall,
  Pause,
  Play,
  FileText,
  RotateCw,
  Undo2,
  Redo2,
  ExternalLink,
  Copy,
  Download,
  Save,
  FileIcon,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import AssistanceModal from "./modals/AssistanceModal";
import TranscriptionTypePopover from "./modals/TranscriptionTypePopover";
import LanguageSettingsModal from "./modals/LanguageSettingsModal";
import DateTimeSettingsModal from "./modals/DateTimeSettingsModal";
import SelectPatientModal from "./modals/SelectPatientModal";
import { useAudioRecorder } from "@/src/hooks/useAudioRecorder";
import LiveAudioVisualizer from "./modals/LiveAudioVisualizer";
import { cn } from "@/src/lib/utils";
import FileUploadModal from "./modals/FileUploadModal";

interface CaseTab {
  id: string;
  assistance: string;
  transcriptionType: string;
  inputLang: string;
  dateTime: string;
  content: string;
  isGenerated: boolean;
  isGenerating: boolean;
  viewMode: "example" | "structure";
  files: string[];
}

const DUMMY_RESPONSE = `Referral to Psychiatry

Patient: Mr. Kocsir
Referring Clinician: Dr. [Referring Clinician Name], Surgical Emergency Unit
Referred to: On-call Psychiatry

Reason for Referral:
Request for urgent psychiatric consultation regarding capacity assessment for urgent leg amputation.

History of Present Illness:
Mr. Kocsir presents to the surgical emergency unit with a necrotic leg infection requiring urgent amputation. He reports his leg becomes discoloured every summer. He states surgery is scheduled for next Thursday, though no fixed date has been confirmed. He demonstrates poor insight into the severity of his condition, describing it as a "scratch". Personal hygiene is significantly neglected. Blood tests show markedly elevated inflammatory markers. His last medical review was over one year ago.

Past Psychiatric History:
Previous treatment at this hospital for alcohol-related issues, several years ago.

Substance Use History:
History of heavy alcohol use. Reports last drink on Thursday (approximately 3 days prior). Denies withdrawal symptoms including tremor, diaphoresis, or anxiety.

Medical History:
Leg infection with necrosis requiring surgical intervention.

Laboratory Results:
Elevated inflammatory markers on blood tests. Liver function tests (GOT, GPT, GGT, bilirubin, INR) to be performed.

Current Status and Examination:
The patient has been agitated and loud, using vulgar language. He is vague and confabulatory regarding recent events. He demonstrates empty cheerfulness when discussing serious matters. He is disoriented to time but oriented to place. Memory for recent events is significantly impaired with confabulation.

Specific Question for Psychiatry:
Please assess the patient's capacity to consent to or refuse urgent surgical treatment. We are concerned about his poor insight, impaired judgment, and cognitive deficits. Your assessment is needed to guide our treatment plan.`;

const NewCasePageContent = ({ id }: { id: string }) => {
  // Tabs State
  const [tabs, setTabs] = useState<CaseTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  // Modal States
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [isTranscribeOpen, setIsTranscribeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("Today 11:22 AM");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Pending Actions (when no tab is active)
  const [pendingRecording, setPendingRecording] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  // Drawer / Chat State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // Audio Recording
  const {
    isRecording,
    isPaused,
    pauseRecording,
    resumeRecording,
    toggleRecording,
    recordingTime,
    mediaRecorder,
    audioBlob,
  } = useAudioRecorder();

  // Active Tab Data
  const activeTab = tabs.find((t) => t.id === activeTabId);

  const updateActiveTab = useCallback(
    (updates: Partial<CaseTab>) => {
      if (!activeTabId) return;
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, ...updates } : t)),
      );
    },
    [activeTabId],
  );

  const handleAddTab = (assistanceName: string) => {
    const newTab: CaseTab = {
      id: Math.random().toString(36).substr(2, 9),
      assistance: assistanceName,
      transcriptionType: "Transcribe",
      inputLang: "English",
      dateTime: "Today 11:22 AM",
      content: "",
      isGenerated: false,
      isGenerating: pendingRecording,
      viewMode: "structure",
      files: pendingFiles.map((f) => f.name),
    };

    if (pendingRecording) {
      setTimeout(() => {
        setTabs((prev) =>
          prev.map((t) =>
            t.id === newTab.id
              ? {
                  ...t,
                  isGenerating: false,
                  isGenerated: true,
                  content: DUMMY_RESPONSE,
                }
              : t,
          ),
        );
      }, 2000);
    }

    setPendingRecording(false);
    setPendingFiles([]);
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    setTabs((prev) => {
      const filtered = prev.filter((t) => t.id !== tabId);
      if (activeTabId === tabId) {
        setActiveTabId(
          filtered.length > 0 ? filtered[filtered.length - 1].id : null,
        );
      }
      return filtered;
    });
  };

  const handleStopRecording = useCallback(() => {
    if (isRecording) {
      console.log("Audio Recording Stopped. Data:", {
        time: recordingTime,
        blob: audioBlob,
      });

      if (activeTabId) {
        // Start Simulation for active tab
        updateActiveTab({ isGenerating: true });

        setTimeout(() => {
          updateActiveTab({
            isGenerating: false,
            isGenerated: true,
            content: DUMMY_RESPONSE,
          });
        }, 2000);
      } else {
        // No active tab, mark as pending and open modal
        setPendingRecording(true);
        setIsAssistanceOpen(true);
      }

      toggleRecording();
    }
  }, [
    isRecording,
    recordingTime,
    audioBlob,
    updateActiveTab,
    toggleRecording,
    activeTabId,
  ]);

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      console.log(
        "Files uploaded:",
        files.map((f) => f.name),
      );
      if (activeTabId) {
        // If there's an active tab, add files to its list
        updateActiveTab({
          files: [...(activeTab?.files || []), ...files.map((f) => f.name)],
        });
      } else {
        // No active tab, store files
        setPendingFiles((prev) => [...prev, ...files]);
      }
    }
  };

  const removeFile = (index: number, type: "pending" | "tab") => {
    if (type === "pending") {
      setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      updateActiveTab({
        files: activeTab?.files.filter((_, i) => i !== index) || [],
      });
    }
  };

  const triggerFileUpload = () => {
    setIsUploadModalOpen(true);
  };

  const renderContent = () => {
    if (!activeTab) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
          <div className="bg-card p-4 rounded-full border border-border shadow-sm">
            <Bot className="size-12 opacity-20" />
          </div>
          <p className="text-sm">
            Select an assistance template to start adding details
          </p>
          <Button
            onClick={() => setIsAssistanceOpen(true)}
            variant="outline"
            className="rounded-lg gap-2"
          >
            <PlusIconSmall className="size-4" /> Select Assistance
          </Button>
        </div>
      );
    }

    if (activeTab.isGenerating) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
          <div className="bg-blue-500/10 p-4 rounded-full border border-blue-500/20 animate-pulse">
            <Sparkles className="size-12 text-blue-500" />
          </div>
          <p className="text-sm font-medium text-foreground/80">
            Generating structured clinical note...
          </p>
        </div>
      );
    }

    if (activeTab.isGenerated) {
      return (
        <div className="flex-1 flex flex-col pt-12">
          {/* Tabs Toggle */}
          <div className="flex items-center gap-4 border-b border-border/50 mb-6 -mt-4">
            <button
              onClick={() => updateActiveTab({ viewMode: "example" })}
              className={cn(
                "pb-3 text-sm font-medium transition-all relative px-2",
                activeTab.viewMode === "example"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Example
              {activeTab.viewMode === "example" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
            <button
              onClick={() => updateActiveTab({ viewMode: "structure" })}
              className={cn(
                "pb-3 text-sm font-medium transition-all relative px-2",
                activeTab.viewMode === "structure"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Structure
              {activeTab.viewMode === "structure" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          </div>

          <div className="flex-1 custom-scrollbar overflow-y-auto pr-2">
            {activeTab.viewMode === "structure" ? (
              <div className="space-y-6 text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {activeTab.content.split("\n\n").map((section, idx) => {
                  const [title, ...rest] = section.split(":");
                  if (rest.length > 0) {
                    return (
                      <div key={idx}>
                        <span className="font-bold text-foreground">
                          {title}:
                        </span>
                        <span>{rest.join(":")}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="font-bold text-foreground">
                      {section}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                {activeTab.content}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-border/50 flex items-center flex-wrap gap-4 justify-between">
            <div className="flex items-center gap-3">
              {activeTab.files.map((fileName, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm rounded-lg text-xs font-medium border border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-2 transition-all group"
                >
                  <FileIcon className="size-3.5 text-muted-foreground" />
                  {fileName}
                  <button
                    onClick={() => removeFile(index, "tab")}
                    className="p-0.5 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors ml-1"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={triggerFileUpload}
                disabled={activeTab.isGenerated}
                className="p-1.5 hover:bg-accent rounded-md transition-all text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Paperclip className="size-4 rotate-45" />
              </button>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <Button
                onClick={() => setIsSaveModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg gap-2 h-10 px-5 text-sm font-semibold shadow-lg shadow-blue-600/20"
              >
                <Save className="size-4" /> Save a Patient
              </Button>
              <Button
                variant="outline"
                className="bg-card border-border hover:bg-accent rounded-lg gap-2 h-10 px-5 text-sm font-semibold"
              >
                <Copy className="size-4" /> Copy to Clipboard
              </Button>
              <Button
                variant="outline"
                className="bg-card border-border hover:bg-accent rounded-lg gap-2 h-10 px-5 text-sm font-semibold"
              >
                <FileText className="size-4" /> Export Docx
              </Button>
              <Button
                variant="outline"
                className="bg-card border-border hover:bg-accent rounded-lg gap-2 h-10 px-5 text-sm font-semibold"
              >
                <Download className="size-4" /> Export PDF
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <textarea
        placeholder="Add any additional context about the patient or paste files here"
        className="w-full flex-1 bg-transparent border-none outline-none resize-none text-foreground/80 placeholder:text-muted-foreground/50 text-base custom-scrollbar"
        value={activeTab.content}
        onChange={(e) => updateActiveTab({ content: e.target.value })}
      />
    );
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">
            Add patient details {id !== "sonething" && id}
          </h1>
          <Paperclip
            // onClick={triggerFileUpload}
            className="size-5 text-muted-foreground rotate-45 cursor-pointer hover:text-foreground transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Hide Generate Letter when recording */}
          {!isRecording && (
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg flex items-center gap-2"
              onClick={() => setIsAssistanceOpen(true)}
            >
              <PlusIconSmall className="size-4" /> Generate Letter
            </Button>
          )}

          <div className="flex items-center gap-2">
            {/* Pause Button next to stop */}
            {isRecording && (
              <Button
                onClick={isPaused ? resumeRecording : pauseRecording}
                variant="outline"
                className="border-border text-foreground hover:bg-accent rounded-lg h-10 px-4 gap-2 shadow-lg transition-all"
              >
                {isPaused ? (
                  <>
                    <Play className="size-4" />
                    <span className="text-sm font-semibold">Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="size-4" />
                    <span className="text-sm font-semibold">Pause</span>
                  </>
                )}
              </Button>
            )}

            <div className="relative">
              <div className="flex bg-blue-600 rounded-lg overflow-hidden shadow-lg shadow-blue-600/20">
                <Button
                  onClick={() => {
                    if (isRecording) {
                      handleStopRecording();
                    } else {
                      toggleRecording();
                    }
                  }}
                  className={cn(
                    "bg-transparent hover:bg-blue-700 text-white font-semibold flex items-center gap-2 px-4 h-10 rounded-none border-r border-blue-500/50 transition-all",
                    isRecording && "bg-blue-700",
                  )}
                >
                  <Mic
                    className={cn("size-4", isRecording && "text-red-400")}
                  />
                  {isRecording
                    ? "Stop transcribing"
                    : activeTab?.isGenerated
                      ? "Transcribe"
                      : activeTab?.transcriptionType || "Transcribe"}
                </Button>
                <Button
                  onClick={() => setIsTranscribeOpen(!isTranscribeOpen)}
                  className="bg-transparent hover:bg-blue-700 text-white px-2 h-10 rounded-none"
                >
                  <ChevronDown className="size-4" />
                </Button>
              </div>

              <TranscriptionTypePopover
                isOpen={isTranscribeOpen}
                onClose={() => setIsTranscribeOpen(false)}
                selected={activeTab?.transcriptionType || "Transcribe"}
                onSelect={(val) => updateActiveTab({ transcriptionType: val })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar & Info Pills */}
      <div className="flex items-center gap-3 text-sm flex-wrap">
        {/* Date Time Pill */}
        <div
          onClick={() => setIsDateTimeOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-card text-muted-foreground rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
        >
          <Calendar className="size-4" />
          {activeTab?.dateTime || currentDateTime}
        </div>

        {/* Language Pill */}
        <div
          onClick={() => setIsLanguageOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-card text-muted-foreground rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
        >
          <Globe className="size-4" />
          {activeTab?.inputLang || "English"}
        </div>

        {/* Dynamic Tabs */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer group relative pr-8",
              activeTabId === tab.id
                ? "bg-accent border-primary/20 text-foreground ring-1 ring-primary/10 shadow-sm"
                : "bg-card border-border text-muted-foreground hover:bg-accent/50 hover:border-border-hover",
            )}
          >
            <Bot
              className={cn(
                "size-4",
                activeTabId === tab.id
                  ? "text-blue-500"
                  : "text-muted-foreground",
              )}
            />
            <span className="font-medium whitespace-nowrap">
              {tab.assistance}
            </span>
            <button
              onClick={(e) => handleCloseTab(e, tab.id)}
              className={cn(
                "absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-red-500/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100",
                activeTabId === tab.id && "opacity-40",
              )}
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        {/* Add Tab Button / Select Assistance Placeholder */}
        {tabs.length === 0 ? (
          <div
            onClick={() => setIsAssistanceOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-card text-muted-foreground rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
          >
            <Bot className="size-4" />
            Select Assistance
          </div>
        ) : (
          <button
            onClick={() => setIsAssistanceOpen(true)}
            className="flex items-center justify-center size-8 bg-card border border-border rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all shadow-sm"
            title="Add Assistance Template"
          >
            <PlusIconSmall className="size-4" />
          </button>
        )}

        {/* Recording Info (Always Aligned Right) */}
        <div className="ml-auto flex items-center gap-4 text-muted-foreground min-w-[200px] justify-end">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className={cn(
                "size-2 rounded-full bg-red-500",
                isRecording && !isPaused && "animate-pulse",
              )}
            />
            {recordingTime}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Mic className="size-3.5" />
            {isRecording
              ? isPaused
                ? "Paused"
                : "Recording..."
              : "Default Microphone"}
            <div className="flex items-center gap-0.5 h-6 ml-2">
              {mediaRecorder && isRecording && !isPaused ? (
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  width={60}
                  height={18}
                  barWidth={3}
                  gap={2}
                  barColor="#3b82f6"
                />
              ) : (
                <div className="flex items-center gap-0.5 h-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-blue-600/30 rounded-full h-full"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "relative flex-1 bg-background rounded-2xl border border-border  p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-auto overflow-x-hidden shadow-inner flex flex-col min-h-[400px]",
          activeTab?.isGenerated && "pt-2",
        )}
      >
        {renderContent()}

        {/* Floating Toolbar */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {activeTab && !activeTab.isGenerating && (
            <>
              {activeTab.isGenerated ? (
                <div className="flex items-center bg-card rounded-lg border border-border p-1 gap-1">
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all">
                    <Undo2 className="size-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all">
                    <Redo2 className="size-4" />
                  </button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all">
                    <RotateCw className="size-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all">
                    <ExternalLink className="size-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all">
                    <Copy className="size-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center bg-card rounded-lg border border-border p-1">
                    <button
                      onClick={toggleRecording}
                      className={cn(
                        "p-2 rounded-md transition-all",
                        isRecording
                          ? "text-red-500 bg-red-500/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
                      )}
                    >
                      <Mic className="size-4" />
                    </button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <button
                      onClick={() => setIsTranscribeOpen(!isTranscribeOpen)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
                    >
                      <ChevronDown className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-center bg-card rounded-lg border border-border p-1 gap-1">
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all">
                      <RotateCcw className="size-4" />
                    </button>
                    <button
                      onClick={triggerFileUpload}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
                    >
                      <Paperclip className="size-4 rotate-45" />
                    </button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <button className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all text-xs font-medium">
                      Copy
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Paperclip button bottom left */}
        {!activeTab?.isGenerated && (
          <div className="absolute bottom-6 left-6 flex items-center gap-2 flex-wrap max-w-[80%]">
            {/* Show pending files (if any) */}
            {pendingFiles.map((file, index) => (
              <div
                key={`pending-${index}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm rounded-lg text-xs font-medium border border-border/50 shadow-sm animate-in fade-in slide-in-from-left-2 transition-all group"
              >
                <FileIcon className="size-3.5 text-muted-foreground" />
                {file.name}
                <button
                  onClick={() => removeFile(index, "pending")}
                  className="p-0.5 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors ml-1"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}

            {/* Show active tab files */}
            {activeTab?.files.map((fileName, index) => (
              <div
                key={`tab-${index}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm rounded-lg text-xs font-medium border border-border/50 shadow-sm animate-in fade-in slide-in-from-left-2 transition-all group"
              >
                <FileIcon className="size-3.5 text-muted-foreground" />
                {fileName}
                <button
                  onClick={() => removeFile(index, "tab")}
                  className="p-0.5 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors ml-1"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}

            <button
              onClick={triggerFileUpload}
              className="bg-card p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <Link2 className="size-5" />
            </button>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="relative mt-auto">
        {/* Modern Drawer / AI Helper Overlay */}
        <div
          className={cn(
            "absolute bottom-full left-0 right-0 mb-4 bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden z-10 flex flex-col pointer-events-auto",
            isDrawerOpen
              ? "opacity-100 translate-y-0 h-auto max-h-[400px] border-blue-500/20 shadow-blue-500/10 ring-1 ring-blue-500/10"
              : "opacity-0 translate-y-8 h-0 overflow-hidden pointer-events-none pb-0 mb-0 border-transparent shadow-none",
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-transparent">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600/10 p-1.5 rounded-lg border border-blue-600/20">
                <Sparkles className="size-4 text-blue-500" />
              </div>
              <span className="font-semibold text-sm text-foreground">
                AI MedAI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Drawer Content - Detailed Dummy Data */}
          <div
            className={cn(
              "p-5 overflow-y-auto max-h-[300px] custom-scrollbar space-y-5 transition-opacity duration-300 delay-100",
              isDrawerOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5 shadow-sm bg-blue-600 text-white p-2 rounded-xl h-fit border border-blue-500/20">
                <Bot className="size-4" />
              </div>
              <div className="space-y-3 text-sm text-foreground/90">
                <p className="leading-relaxed">
                  I&apos;ve analyzed the patient&apos;s record along with your
                  request. Based on the notes, here is the suggested structured
                  insight:
                </p>

                {/* Simulated Data Card */}
                <div className="bg-background p-4 rounded-xl border border-border/60 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-muted-foreground pb-3 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <FileText className="size-3.5 text-blue-500" />
                      <span className="font-medium text-xs text-foreground/80 tracking-wide uppercase">
                        Key Clinical Findings
                      </span>
                    </div>
                    <span className="text-[10px] bg-accent/50 px-2 py-0.5 rounded-full border border-border/50 text-foreground/70">
                      Just now
                    </span>
                  </div>
                  <ul className="space-y-2 mt-2">
                    <li className="flex gap-2">
                      <div className="min-w-1.5 mt-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Reported missing leg pulses on examination.</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-1.5 mt-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>
                        Noted significant inflammation and necrosis in the lower
                        extremities.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-1.5 mt-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>
                        Patient expressed poor insight into the urgency of
                        amputation.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-muted-foreground pt-1">
                  Would you like me to append these direct clinical findings to
                  the current active case note?
                </p>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div
            className={cn(
              "px-5 py-3 border-t border-border/50 bg-accent/30 flex items-center justify-end gap-3 transition-opacity duration-300 delay-150",
              isDrawerOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(false)}
              className="text-xs font-medium hover:bg-background"
            >
              Dismiss
            </Button>
            <Button
              size="sm"
              onClick={() => setIsDrawerOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5 h-8 px-4 rounded-lg shadow-md shadow-blue-600/20"
            >
              <PlusIconSmall className="size-3.5" /> Append Insights
            </Button>
          </div>
        </div>

        {/* Chat Input Container */}
        <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl border border-border shadow-sm focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all relative z-20">
          <Sparkles className="size-5 text-blue-500 drop-shadow-sm" />
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsDrawerOpen(true);
                setChatInput("");
              }
            }}
            placeholder="Ask MedAI Pro to do anything..."
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 text-sm font-medium"
          />
          <button
            onClick={() => {
              setIsDrawerOpen(true);
              setChatInput("");
            }}
            className="bg-blue-600 p-2 cursor-pointer rounded-lg text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/30 hover:shadow-blue-600/40 translate-y-0 active:translate-y-0.5"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AssistanceModal
        isOpen={isAssistanceOpen}
        onClose={() => setIsAssistanceOpen(false)}
        onApply={(val) => handleAddTab(val)}
      />

      <LanguageSettingsModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        onApply={(data) => {
          updateActiveTab({ inputLang: data.input });
        }}
      />

      <DateTimeSettingsModal
        isOpen={isDateTimeOpen}
        onClose={() => setIsDateTimeOpen(false)}
        onApply={(data) => {
          const formattedDate = `${data.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })} ${data.time}`;
          setCurrentDateTime(formattedDate);
          updateActiveTab({ dateTime: formattedDate });
        }}
      />

      <SelectPatientModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={(name) => {
          console.log("Saving patient:", name);
        }}
      />

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={(file) => handleFileUpload(file)}
      />
    </div>
  );
};

export default NewCasePageContent;
