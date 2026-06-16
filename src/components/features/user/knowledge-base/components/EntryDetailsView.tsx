"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Pin, Star, Edit, Trash2, ChevronDown, Plus,
  Paperclip, Link as LinkIcon, FileText, UserPlus, Save,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, List, ListOrdered, Image as ImageIcon, Link as Link2,
  Type
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { KnowledgeEntry } from "../types";
import DeleteKnowledgeModal from "./DeleteKnowledgeModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

interface EntryDetailsViewProps {
  entry: KnowledgeEntry;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onAddMember: () => void;
  onSaveContent?: (id: string, content: string) => void;
}

const FONT_SIZES = ["10", "12", "14", "16", "18", "20", "24", "32"];

const EntryDetailsView = ({ entry, onEdit, onDelete, onAddMember, onSaveContent }: EntryDetailsViewProps) => {
  const [activeTab, setActiveTab] = useState<"content" | "attachments">("content");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState("14");
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    if (editorRef.current) {
      onSaveContent?.(entry.id, editorRef.current.innerHTML);
      console.log("Saving content:", editorRef.current.innerHTML);
    }
  };

  // Keep editor content in sync with entry when switching entries
  useEffect(() => {
    if (editorRef.current && activeTab === "content") {
      editorRef.current.innerHTML = entry.content || entry.summary || "";
    }
  }, [entry.id, activeTab]);

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-2xl border border-border overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-2 md:p-6 border-b border-border bg-card/50">
        <div className="md:flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground tracking-tight">{entry.title}</h2>
            <p className="text-sm text-muted-foreground">
              By: Me | {entry.date} | {entry.views} views
            </p>
          </div>
          <div className="md:flex items-center gap-2">
            <button className="flex items-center gap-2 mb-2 mt-2 md:mb-0 md:mt-0 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-bold border border-amber-500/20 active:scale-95 transition-all">
              <Pin size={12} className="fill-current" /> Pinned
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-500 rounded-lg text-xs font-bold border border-blue-600/20 active:scale-95 transition-all">
              <Star size={12} className="fill-current" /> Saved
            </button>
            <Button onClick={onEdit} variant="secondary" size="sm" className="bg-blue-600 mt-2 md:mt-0 mr-2 md:mr-0 hover:bg-blue-700 text-white gap-2 font-bold px-4 rounded-lg border-0 h-9 active:scale-95 transition-all shadow-lg shadow-blue-600/20">
              <Edit size={14} /> EDIT
            </Button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-lg border border-rose-500/20 transition-all active:scale-95"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Type:</span>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[10px] font-bold">
              {entry.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Specialty:</span>
            <span className="flex items-center gap-1.5 text-foreground font-semibold">
              <span className="size-2 rounded-full bg-pink-500" /> {entry.specialty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">Tags:</span>
            <div className="flex gap-1.5">
              {entry.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-muted/50 text-muted-foreground border border-border rounded text-[10px] font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-muted-foreground font-medium">AI Context</span>
            <div className={cn(
              "w-10 h-5 rounded-full relative transition-colors cursor-pointer border border-border/50",
              entry.isAiContext ? "bg-blue-600" : "bg-muted"
            )}>
              <div className={cn(
                "absolute top-0.5 left-0.5 size-3.5 bg-white rounded-full transition-transform",
                entry.isAiContext ? "translate-x-5" : "translate-x-0"
              )} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-8 px-6 border-b border-border bg-card/20">
          {[
            { id: "content", label: "Content", icon: FileText },
            { id: "attachments", label: "Attachments", icon: Paperclip },
            // { id: "links", label: "Links", icon: LinkIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 py-4 text-sm font-bold transition-all relative",
                activeTab === tab.id
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === "content" && (
            <div className="space-y-6">
              {/* Rich Text Editor */}
              <div className="bg-muted/10 rounded-xl border border-border overflow-hidden focus-within:border-blue-500/50 transition-all flex flex-col min-h-[500px]">
                {/* Toolbar */}
                <div className="bg-muted/20 px-4 py-2 flex flex-wrap items-center gap-2 border-b border-border">
                  <div className="flex items-center gap-1 border-r border-border pr-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-1 text-xs font-bold text-foreground hover:bg-muted p-1.5 rounded transition-colors">
                          {fontSize} <ChevronDown size={10} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-20 p-1">
                        {FONT_SIZES.map(size => (
                          <button
                            key={size}
                            onClick={() => { setFontSize(size); execCommand("fontSize", size); }}
                            className="w-full text-left text-xs p-1.5 hover:bg-blue-600 hover:text-white rounded transition-all font-bold"
                          >
                            {size}
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                    <button onClick={() => { }} className="p-1.5 text-foreground hover:bg-muted rounded transition-colors"><Type size={14} /></button>
                    <div className="size-4 rounded-full bg-white border border-border cursor-pointer shadow-sm ml-1" />
                  </div>

                  <div className="flex items-center gap-0.5 border-r border-border pr-2">
                    <button onClick={() => execCommand("bold")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all" title="Bold"><Bold size={14} /></button>
                    <button onClick={() => execCommand("italic")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all" title="Italic"><Italic size={14} /></button>
                    <button onClick={() => execCommand("underline")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all" title="Underline"><Underline size={14} /></button>
                    <button onClick={() => execCommand("strikeThrough")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all" title="Strikethrough"><Strikethrough size={14} /></button>
                  </div>

                  <div className="flex items-center gap-0.5 border-r border-border pr-2">
                    <button onClick={() => execCommand("justifyLeft")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><AlignLeft size={14} /></button>
                    <button onClick={() => execCommand("justifyCenter")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><AlignCenter size={14} /></button>
                    <button onClick={() => execCommand("justifyRight")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><AlignRight size={14} /></button>
                  </div>

                  <div className="flex items-center gap-0.5 border-r border-border pr-2">
                    <button onClick={() => execCommand("insertUnorderedList")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><List size={14} /></button>
                    <button onClick={() => execCommand("insertOrderedList")} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><ListOrdered size={14} /></button>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <button onClick={() => { }} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><ImageIcon size={14} /></button>
                    <button onClick={() => { const url = prompt("Enter URL"); if (url) execCommand("createLink", url); }} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all"><Link2 size={14} /></button>
                  </div>

                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground hidden sm:inline">Auto-saved 2 min ago</span>
                    <Button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-8 text-[11px] px-6 font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>

                {/* Editor Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="flex-1 p-6 text-foreground/80 leading-relaxed text-sm outline-none overflow-y-auto"
                  style={{ fontSize: `${fontSize}px` }}
                  onInput={(e) => {
                    // Can handle auto-save logic here
                  }}
                >
                  {/* Content injected via useEffect */}
                </div>
              </div>
            </div>
          )}

          {activeTab === "attachments" && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
              <Paperclip size={48} className="opacity-20" />
              <p className="font-medium">No attachments yet</p>
              <Button variant="outline" className="border-dashed border-2 rounded-xl">
                <Plus size={16} className="mr-2" /> Add Attachment
              </Button>
            </div>
          )}

          {/* {activeTab === "links" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-muted/10 border border-border flex justify-between items-center group hover:bg-muted transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
                    <UserPlus size={18} />
                  </div>
                  <span className="font-bold text-sm">Link Patients</span>
                </div>
                <Button variant="secondary" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-lg h-8 px-4 text-[10px] active:scale-95 transition-all">
                  + NEW PATIENT
                </Button>
              </div>
              <div className="p-4 rounded-xl bg-muted/10 border border-border flex justify-between items-center group hover:bg-muted transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
                    <LinkIcon size={18} />
                  </div>
                  <span className="font-bold text-sm">Link Session</span>
                </div>
                <Button variant="secondary" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-lg h-8 px-4 text-[10px] active:scale-95 transition-all">
                  + NEW SESSION
                </Button>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Modals */}
      <DeleteKnowledgeModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(entry.id);
          setIsDeleteModalOpen(false);
        }}
        title={entry.title}
      />
    </div>
  );
};

export default EntryDetailsView;
