"use client";
// Force refresh module resolution

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import SessionHeader from "./SessionHeader";
import SessionTabs from "./SessionTabs";
import LiveTranscript from "./LiveTranscript";
import ContentTab from "./tabs/ContentTab";
import SOAPNoteTab from "./tabs/SOAPNoteTab";
import PatientSummaryTab from "./tabs/PatientSummaryTab";
import TestResultTab from "./tabs/TestResultTab";
import QATab from "./tabs/QATab";
import AssistanceResponseTab from "./tabs/AssistanceResponseTab";
import { useAudioRecorder } from "@/src/hooks/useAudioRecorder";
import { IoIosArrowBack } from "react-icons/io";
import { ChevronDown, Sparkles, Plus } from "lucide-react";
import AssistanceModal from "../modals/AssistanceModal";
import CreateTaskModal from "../../task/CreateTaskModal";
import TabPreferenceModal, { ALL_DEFAULT_TABS } from "../modals/TabPreferenceModal";

interface SessionPageContentProps {
  id: string;
  workflow: string;
}

const SessionPageContent = ({ id, workflow }: SessionPageContentProps) => {
  const [activeTab, setActiveTab] = useState("content");
  const [tabs, setTabs] = useState(ALL_DEFAULT_TABS);
  const [completedAssistIds, setCompletedAssistIds] = useState<Set<string>>(new Set());
  const [isTranscriptCollapsed, setIsTranscriptCollapsed] = useState(false);
  const [isContentCollapsed, setIsContentCollapsed] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isTabPreferenceModalOpen, setIsTabPreferenceModalOpen] = useState(false);
  const recorder = useAudioRecorder();

  // Load preferences on mount
  React.useEffect(() => {
    const savedPrefs = localStorage.getItem("session_tab_preferences");
    if (savedPrefs) {
      try {
        const preferredIds = JSON.parse(savedPrefs) as string[];
        const filteredTabs = ALL_DEFAULT_TABS.filter(t => preferredIds.includes(t.id));
        if (filteredTabs.length > 0) {
          setTabs(filteredTabs);
          setActiveTab(filteredTabs[0].id);
        }
      } catch (e) {
        console.error("Failed to parse tab preferences", e);
      }
    }
  }, []);

  const handleSaveTabPreferences = (selectedIds: string[]) => {
    localStorage.setItem("session_tab_preferences", JSON.stringify(selectedIds));
    
    // Update current tabs: keep existing assistant tabs, but update default tabs based on new preference
    const assistantTabs = tabs.filter(t => t.id.startsWith("assist-"));
    const newDefaultTabs = ALL_DEFAULT_TABS.filter(t => selectedIds.includes(t.id));
    const finalTabs = [...newDefaultTabs, ...assistantTabs];
    
    setTabs(finalTabs);
    
    // If active tab was removed, switch to the first available tab
    if (!finalTabs.find(t => t.id === activeTab)) {
      if (finalTabs.length > 0) {
        setActiveTab(finalTabs[0].id);
      }
    }
  };

  const handleSaveTask = (data: any) => {
    console.log("Task Saved:", data);
    setIsCreateTaskModalOpen(false);
  };

  const handleAddAssistanceTab = (label: string) => {
    console.log("Adding tab with label:", label);
    // Check if it's a core tab
    const coreTab = ALL_DEFAULT_TABS.find(
      (t) => t.label.toLowerCase().trim() === label.toLowerCase().trim()
    );
    if (coreTab) {
      if (tabs.find((t) => t.id === coreTab.id)) {
        setActiveTab(coreTab.id);
      } else {
        // Insert core tab
        setTabs([...tabs, coreTab]);
        setActiveTab(coreTab.id);
      }
      return;
    }

    const newId = `assist-${Date.now()}`;
    setTabs([...tabs, { id: newId, label }]);
    setActiveTab(newId);
    // Ensure full screen for assistants
    setIsTranscriptCollapsed(false);
    setIsContentCollapsed(false);
  };

  // Ensure full screen when switching to assistant tabs via clicking
  React.useEffect(() => {
    if (activeTab.startsWith("assist-")) {
      setIsTranscriptCollapsed(false);
      setIsContentCollapsed(false);
    }
  }, [activeTab]);

  const handleRemoveTab = (tabId: string) => {
    if (tabId === "content") return; // content tab is permanent
    if (tabs.length <= 1) return; // Prevent removing all tabs
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
  };

  const getTabLabel = (tab: string) => {
    const found = tabs.find(t => t.id === tab);
    return found ? found.label : "Clinical Notes";
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "content":
        return <ContentTab />;
      case "soap":
        return <SOAPNoteTab />;
      case "summary":
        return <PatientSummaryTab />;
      case "test":
        return <TestResultTab />;
      case "qa":
        return <QATab />;
      default:
        const currentTab = tabs.find(t => t.id === activeTab);
        if (!currentTab) return <ContentTab />;
        
        return (
          <AssistanceResponseTab 
            key={currentTab.id} 
            label={currentTab.label} 
            isAlreadyGenerated={completedAssistIds.has(currentTab.id)}
            onGenerationComplete={() => {
              setCompletedAssistIds(prev => new Set(prev).add(currentTab.id));
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full md:min-h-[800px] lg:h-full md:-m-6 -m-3 bg-background text-foreground overflow-hidden">
      {/* Session Header (Row 1 & 2) */}
      <SessionHeader 
        recorder={recorder} 
        id={id} 
        isAssistanceActive={activeTab.startsWith("assist-")} 
        onOpenAssistance={() => setIsAssistanceModalOpen(true)}
        onOpenCreateTask={() => setIsCreateTaskModalOpen(true)}
        onOpenSettings={() => setIsTabPreferenceModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col px-4 md:px-4 pt-2 overflow-hidden min-h-0">
        {/* Row 3: Tabs and Actions */}
        <SessionTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs}
          onRemoveTab={handleRemoveTab}
          onOpenAssistance={() => setIsAssistanceModalOpen(true)}
          onOpenCreateTask={() => setIsCreateTaskModalOpen(true)}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3 lg:gap-4 mt-1.5 overflow-y-auto lg:overflow-hidden">
          {/* Left Column: Live Transcript Wrapper */}
          {!activeTab.startsWith("assist-") && (
            <div className={cn(
              "transition-all duration-500 flex flex-col relative",
              isTranscriptCollapsed 
                ? "lg:w-12 h-[60px] lg:h-auto shrink-0" 
                : isContentCollapsed 
                  ? "flex-1 min-h-[400px]" 
                  : "w-full lg:w-[38%] xl:w-[42%] lg:min-w-[400px] min-h-[400px] lg:min-h-0",
            )}>
              {/* Collapse Toggle Button (Left Side) - Desktop only */}
              <button 
                onClick={() => {
                  const newState = !isTranscriptCollapsed;
                  setIsTranscriptCollapsed(newState);
                  if (newState) setIsContentCollapsed(false);
                }}
                className="absolute -right-2 top-12 z-50 size-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 transition-all hidden lg:flex"
              >
                <div className={cn("transition-transform duration-300", isTranscriptCollapsed ? "rotate-180" : "rotate-0")}>
                  <IoIosArrowBack size={12} />
                </div>
              </button>

              {/* Mobile/Tablet Accordion Header */}
              <div 
                onClick={() => setIsTranscriptCollapsed(!isTranscriptCollapsed)}
                className="lg:hidden flex items-center justify-between p-4 bg-card border border-border rounded-2xl mb-2 cursor-pointer hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-wider">Live Transcript</span>
                </div>
                <div className={cn("transition-transform duration-300", isTranscriptCollapsed ? "rotate-0" : "rotate-180")}>
                  <ChevronDown size={20} className="text-muted-foreground" />
                </div>
              </div>

              {/* Internal Container */}
              <div className={cn(
                "flex-1 flex flex-col min-h-0 overflow-hidden rounded-2xl border border-border bg-card/30",
                isTranscriptCollapsed && "hidden lg:flex lg:border-none lg:bg-transparent"
              )}>
                {isTranscriptCollapsed ? (
                  <div 
                    onClick={() => setIsTranscriptCollapsed(false)}
                    className="flex-1 bg-card flex flex-col items-center py-8 cursor-pointer hover:bg-muted transition-all rounded-2xl border border-border group hidden lg:flex"
                  >
                    <div className="rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-blue-500 mt-12 transition-colors">
                      Transcript
                    </div>
                  </div>
                ) : (
                  <LiveTranscript isRecording={recorder.isRecording} />
                )}
              </div>
            </div>
          )}

          {/* Right Column: Tab Specific Content Wrapper */}
          <div className={cn(
            "flex flex-col transition-all duration-500 relative",
            activeTab.startsWith("assist-")
              ? "flex-1 w-full"
              : isContentCollapsed 
                ? "lg:w-12 shrink-0 min-h-0" 
                : "flex-1 w-full min-h-[500px] lg:min-h-0"
          )}>
            {/* Collapse Toggle Button (Right Side) - Desktop only */}
            {!isTranscriptCollapsed && !activeTab.startsWith("assist-") && (
              <button 
                onClick={() => {
                  const newState = !isContentCollapsed;
                  setIsContentCollapsed(newState);
                  if (newState) setIsTranscriptCollapsed(false);
                }}
                className="absolute -left-2 top-12 z-50 size-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 transition-all hidden lg:flex"
              >
                <div className={cn("transition-transform duration-300", isContentCollapsed ? "rotate-0" : "rotate-180")}>
                  <IoIosArrowBack size={12} />
                </div>
              </button>
            )}

            {/* Internal Container */}
            <div className={cn(
              "flex-1 flex flex-col min-h-0 overflow-hidden transition-all",
              !isContentCollapsed && "overflow-y-auto custom-scrollbar pr-1"
            )}>
              {isContentCollapsed ? (
                <div 
                  onClick={() => setIsContentCollapsed(false)}
                  className="flex-1 bg-card flex flex-col items-center py-8 cursor-pointer hover:bg-muted transition-all rounded-2xl border border-border group"
                >
                  <div className="rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-blue-500 mt-12 transition-colors">
                    {getTabLabel(activeTab)}
                  </div>
                </div>
              ) : (
                <div key={activeTab} className="animate-in fade-in slide-in-from-right-4 duration-500 ease-out">
                  {renderTabContent()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AssistanceModal
        isOpen={isAssistanceModalOpen}
        onClose={() => setIsAssistanceModalOpen(false)}
        onApply={handleAddAssistanceTab}
        openTabs={tabs.map(t => t.label)}
      />

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onSave={handleSaveTask}
      />

      <TabPreferenceModal
        isOpen={isTabPreferenceModalOpen}
        onClose={() => setIsTabPreferenceModalOpen(false)}
        onSave={handleSaveTabPreferences}
        initialSelectedIds={tabs.filter(t => !t.id.startsWith("assist-")).map(t => t.id)}
      />
    </div>
  );
};

export default SessionPageContent;
