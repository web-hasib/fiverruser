"use client";

import React, { useState, useMemo } from "react";
import KnowledgeSidebar from "./components/KnowledgeSidebar";
import KnowledgeCard from "./components/KnowledgeCard";
import KnowledgeFilters from "./components/KnowledgeFilters";
import EntryDetailsView from "./components/EntryDetailsView";
import { AddKnowledgeModal } from "./AddKnowledgeModal";
import { AddFolderModal } from "./components/AddFolderModal";
import { FolderMembersModal } from "./components/FolderMembersModal";
import AddMemberModal from "./components/AddMemberModal";
import { KnowledgeEntry, FolderItem } from "./types";
import { 
  Layout, Pin, Star, Brain, Clock, ChevronLeft, Menu
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_ENTRIES: KnowledgeEntry[] = [
  {
    id: "1",
    title: "Post-Cardiac Surgery Anticoagulation Protocol",
    summary: "Hospital policy on obtaining and documenting informed consent prior to all invasive procedures, including emergency surgery and elective cases...",
    content: "<h3>Post-Cardiac Surgery Protocol</h3><p>Hospital policy on obtaining and documenting informed consent prior to all invasive procedures, including emergency surgery and elective cases. This protocol covers the administration of NOACs and mechanical valve considerations.</p><ul><li>Ensure patient is stable</li><li>Check INR levels daily</li><li>Monitor for bleeding complications</li></ul>",
    date: "Mar 8, 2026",
    views: 47,
    type: "Protocol",
    specialty: "Cardiology",
    tags: ["Surgery", "Team"],
    isPinned: true,
    isFavorite: true,
    isAiContext: true,
    folder: "General Medicine"
  },
  {
    id: "2",
    title: "Diabetes Management Protocol",
    summary: "Comprehensive guide for inpatient management of type 2 diabetes, focusing on glycemic control and insulin titration...",
    content: "<h3>Diabetes Management</h3><p>Comprehensive guide for inpatient management of type 2 diabetes. Focus on sliding scale insulin and dietary control.</p>",
    date: "Mar 10, 2026",
    views: 32,
    type: "Protocol",
    specialty: "Endocrinology",
    tags: ["Diabetes", "Protocol"],
    folder: "General Medicine"
  },
  {
    id: "3",
    title: "Patient Information Leaflet - Hypertension",
    summary: "Clear instructions for patients diagnosed with hypertension, covering lifestyle changes and medication adherence...",
    content: "<h3>Hypertension Leaflet</h3><p>Clear instructions for patients diagnosed with hypertension. Cover basic lifestyle modifications and daily pill monitoring.</p>",
    date: "Mar 12, 2026",
    views: 89,
    type: "Note",
    specialty: "General Medicine",
    tags: ["Hypertension", "Patient Ed"],
    isFavorite: true,
    folder: "General Medicine"
  },
];

const LIBRARY_ITEMS = [
  { id: "all", label: "All Entry", count: 32, icon: Layout, color: "#2563eb" },
  { id: "pinned", label: "Pinned", count: 5, icon: Pin },
  { id: "favorite", label: "Favorite", count: 5, icon: Star },
  { id: "ai-context", label: "AI Context", count: 12, icon: Brain },
  { id: "recent", label: "Recent", count: 20, icon: Clock },
];

const TYPE_ITEMS = [
  { id: "note", label: "Notes", count: 20, color: "#10b981" },
  { id: "protocol", label: "Protocols", count: 20, color: "#2563eb" },
  { id: "policy", label: "Policies", count: 20, color: "#06b6d4" },
  { id: "guideline", label: "Guidelines", count: 20, color: "#ef4444" },
  { id: "reference", label: "References", count: 20, color: "#f59e0b" },
];

const INITIAL_CUSTOM_FOLDERS: FolderItem[] = [
  { id: "gen-med", label: "General Medicine", count: 20, color: "#10b981", isCustom: true },
  { id: "neuro", label: "Neurology", count: 20, color: "#f59e0b", isCustom: true },
  { id: "dentistry", label: "Dentistry", count: 20, color: "#ef4444", isCustom: true },
];

const TAGS = ["anticoag", "post-op", "legal", "ICU", "CCU", "age"];

const KnowledgeBasePage = () => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>(MOCK_ENTRIES);
  const [customFolders, setCustomFolders] = useState<FolderItem[]>(INITIAL_CUSTOM_FOLDERS);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(entries[0].id);
  const [selectedSidebarId, setSelectedSidebarId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);
  const [isMembersListOpen, setIsMembersListOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedFolderForMembers, setSelectedFolderForMembers] = useState<FolderItem | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  // Handlers
  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    if (selectedEntryId === id) setSelectedEntryId(null);
  };

  const handleSaveContent = (id: string, content: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, content } : e));
  };

  const handleAddFolder = (name: string, color: string) => {
    const newFolder: FolderItem = {
        id: `folder-${Date.now()}`,
        label: name,
        count: 0,
        color: color,
        isCustom: true
    };
    setCustomFolders(prev => [...prev, newFolder]);
  };

  const handleShareFolder = (folder: FolderItem) => {
    setIsAddMemberOpen(true);
  };

  const handleAddMember = (folder: FolderItem) => {
    setSelectedFolderForMembers(folder);
    setIsMembersListOpen(true);
  };

  const handleDeleteFolder = (folder: FolderItem) => {
    setCustomFolders(prev => prev.filter(f => f.id !== folder.id));
    if (selectedSidebarId === folder.id) setSelectedSidebarId("all");
  };

  const handleRenameFolder = (id: string, newName: string) => {
    setCustomFolders(prev => prev.map(f => f.id === id ? { ...f, label: newName } : f));
  };

  // Filter entries
  const filteredEntries = useMemo(() => {
    let result = entries;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q));
    }
    if (activeTab !== "All") {
        if (activeTab === "Saved") result = result.filter(e => e.isFavorite);
        else result = result.filter(e => e.type === activeTab);
    }
    if (selectedSidebarId === "pinned") result = result.filter(e => e.isPinned);
    if (selectedSidebarId === "favorite") result = result.filter(e => e.isFavorite);
    if (selectedSidebarId === "ai-context") result = result.filter(e => e.isAiContext);
    const selectedFolder = customFolders.find(f => f.id === selectedSidebarId);
    if (selectedFolder) result = result.filter(e => e.folder === selectedFolder.label);
    return result;
  }, [entries, searchQuery, activeTab, selectedSidebarId, customFolders]);

  const selectedEntry = entries.find(e => e.id === selectedEntryId) || null;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Sidebar */}
      <div className={cn(
        "hidden lg:block h-full transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <KnowledgeSidebar
            library={LIBRARY_ITEMS}
            types={TYPE_ITEMS}
            customFolders={customFolders}
            tags={[...new Set(TAGS)]}
            selectedId={selectedSidebarId}
            onSelect={setSelectedSidebarId}
            onNewEntry={() => setIsNewEntryOpen(true)}
            onAddFolderClick={() => setIsAddFolderOpen(true)}
            onDeleteFolder={handleDeleteFolder}
            onRenameFolder={handleRenameFolder}
            onShareFolder={handleShareFolder}
            onAddMember={handleAddMember}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
                <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Menu size={20} />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-r-0">
                        <KnowledgeSidebar
                            library={LIBRARY_ITEMS}
                            types={TYPE_ITEMS}
                            customFolders={customFolders}
                            tags={[...new Set(TAGS)]}
                            selectedId={selectedSidebarId}
                            onSelect={(id) => { setSelectedSidebarId(id); setIsMobileSidebarOpen(false); }}
                            onNewEntry={() => { setIsNewEntryOpen(true); setIsMobileSidebarOpen(false); }}
                            onAddFolderClick={() => { setIsAddFolderOpen(true); setIsMobileSidebarOpen(false); }}
                            onDeleteFolder={handleDeleteFolder}
                            onRenameFolder={handleRenameFolder}
                            onShareFolder={handleShareFolder}
                            onAddMember={handleAddMember}
                        />
                    </SheetContent>
                </Sheet>
                <h1 className="text-lg font-bold">Knowledge Base</h1>
            </div>
            <button onClick={() => setIsNewEntryOpen(true)} className="size-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                <Layout size={18} />
            </button>
        </div>

        <div className={cn(
            "lg:w-[400px] xl:w-[450px] border-r border-border h-full flex flex-col p-4 lg:p-6 overflow-hidden transition-all duration-300",
            selectedEntryId && "hidden lg:flex"
        )}>

            <KnowledgeFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {filteredEntries.map((entry) => (
                    <KnowledgeCard
                        key={entry.id}
                        entry={entry}
                        isSelected={selectedEntryId === entry.id}
                        onClick={() => setSelectedEntryId(entry.id)}
                    />
                ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-4">
                <div className="flex gap-2">
                    <button className="px-2 py-1 rounded hover:bg-muted font-bold">Prev</button>
                    <button className="px-2 py-1 rounded bg-blue-600 text-white font-bold px-3">1</button>
                    <button className="px-2 py-1 rounded hover:bg-muted font-bold">Next</button>
                </div>
                <span>Total {filteredEntries.length}</span>
            </div>
        </div>

        <div className={cn(
            "flex-1 h-full p-4 lg:p-6 overflow-hidden transition-all duration-300",
            !selectedEntryId && "hidden lg:flex",
            selectedEntryId && "flex"
        )}>
            {selectedEntryId ? (
                <div className="w-full h-full flex flex-col">
                    <button 
                        onClick={() => setSelectedEntryId(null)}
                        className="lg:hidden flex items-center gap-2 text-sm font-bold text-blue-500 mb-4 hover:underline"
                    >
                        <ChevronLeft size={16} /> Back to List
                    </button>
                    {selectedEntry && (
                        <EntryDetailsView
                            entry={selectedEntry}
                            onEdit={() => setIsNewEntryOpen(true)}
                            onDelete={handleDeleteEntry}
                            onSaveContent={handleSaveContent}
                            onAddMember={() => setIsAddMemberOpen(true)}
                        />
                    )}
                </div>
            ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground border border-dashed border-border rounded-2xl bg-card/5">
                    <div className="text-center space-y-4 max-w-xs px-6">
                        <div className="size-20 bg-blue-600/5 rounded-full flex items-center justify-center mx-auto">
                            <Layout size={40} className="text-blue-600/20" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground">No Entry Selected</p>
                            <p className="text-xs">Select an entry from the list to view its details or create a new one.</p>
                        </div>
                        <button onClick={() => setIsNewEntryOpen(true)} className="text-blue-500 text-sm font-bold hover:underline">+ Create New Entry</button>
                    </div>
                </div>
            )}
        </div>
      </div>

      <AddKnowledgeModal
        isOpen={isNewEntryOpen}
        onClose={() => setIsNewEntryOpen(false)}
        onSave={(data) => setIsNewEntryOpen(false)}
      />

      <AddFolderModal 
        isOpen={isAddFolderOpen}
        onClose={() => setIsAddFolderOpen(false)}
        onSave={handleAddFolder}
        existingFolders={customFolders}
      />

      <FolderMembersModal
        isOpen={isMembersListOpen}
        onClose={() => setIsMembersListOpen(false)}
        folderName={selectedFolderForMembers?.label || "Folder"}
        onAddMemberClick={() => setIsAddMemberOpen(true)}
      />

      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAdd={(data) => setIsAddMemberOpen(false)}
      />
    </div>
  );
};

export default KnowledgeBasePage;
