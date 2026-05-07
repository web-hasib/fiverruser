"use client";

import React from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { 
  FileText, 
  FileIcon as FilePdf, 
  Image as ImageIcon,
  Plus,
  Check,
  X,
  Trash2,
  FileUp,
  Undo2,
  Redo2,
  Copy
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";

const ContentTab = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeZone, setActiveZone] = React.useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<Record<string, string[]>>({});
  const [clinicalNote, setClinicalNote] = React.useState("");

  const handleAddToContext = () => {
    if (!clinicalNote.trim()) return;
    console.log("Clinical Note added to context:", clinicalNote);
    
    toast.success("Added to Clinical Context", {
      description: "This content will be processed by the AI once backend integration is complete.",
      duration: 4000,
    });
    
    setClinicalNote("");
  };

  const uploadZones = [
    { id: "files", label: "Upload Documents", sub: "PDF, DOCX, TXT, Images (JPG, PNG)", icon: FileUp, accept: ".pdf,.docx,.txt,.md,.jpg,.jpeg,.png,.heic" },
  ];

  const handleZoneClick = (zoneId: string) => {
    setActiveZone(zoneId);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && activeZone) {
      const fileNames = files.map(f => f.name);
      setSelectedFiles(prev => ({ 
        ...prev, 
        [activeZone]: [...(prev[activeZone] || []), ...fileNames] 
      }));
    }
    e.target.value = "";
  };

  const removeAllFiles = (e: React.MouseEvent, zoneId: string) => {
    e.stopPropagation();
    setSelectedFiles(prev => {
      const newState = { ...prev };
      delete newState[zoneId];
      return newState;
    });
  };

  const removeSingleFile = (zoneId: string, index: number) => {
    setSelectedFiles(prev => {
      const files = [...(prev[zoneId] || [])];
      files.splice(index, 1);
      if (files.length === 0) {
        const newState = { ...prev };
        delete newState[zoneId];
        return newState;
      }
      return { ...prev, [zoneId]: files };
    });
  };

  const currentAccept = uploadZones.find(z => z.id === activeZone)?.accept || "*";

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={currentAccept}
        multiple
        className="hidden"
      />

      {/* Upload Section */}
      <div className="space-y-2">
        <h3 className="text-muted-foreground font-bold text-[11px] uppercase tracking-widest px-1">Upload Documents</h3>
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {uploadZones.map((zone) => {
            const Icon = zone.icon;
            const files = selectedFiles[zone.id];
            const hasFiles = files && files.length > 0;
            
            const ZoneUI = (
              <div 
                onClick={() => !hasFiles && handleZoneClick(zone.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer group relative min-h-[120px]",
                  hasFiles 
                    ? "border-blue-500/50 bg-blue-500/5 shadow-sm" 
                    : "border-border bg-card/40 hover:bg-muted/50 hover:border-blue-500/30"
                )}
              >
                {hasFiles && (
                  <button 
                    onClick={(e) => removeAllFiles(e, zone.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors text-muted-foreground/40 z-10"
                  >
                    <X size={14} />
                  </button>
                )}

                <div className={cn(
                  "size-8 md:size-10 rounded-lg flex items-center justify-center mb-2.5 md:mb-3 transition-all",
                  hasFiles ? "bg-blue-500 text-white" : "bg-muted group-hover:scale-105"
                )}>
                  {hasFiles ? (
                    <Check size={18} />
                  ) : (
                    <Icon className="size-4 md:size-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  )}
                </div>
                
                {hasFiles ? (
                  <div className="text-center w-full px-2">
                    <p className="text-blue-600 text-[11px] font-bold mb-0.5 line-clamp-1">
                      {files[0]}
                      {files.length > 1 && ` + ${files.length - 1} others`}
                    </p>
                    <p className="text-blue-500/60 text-[9px] uppercase font-bold tracking-tight flex items-center justify-center gap-1">
                      {files.length} {files.length === 1 ? 'File' : 'Files'} Ready
                      <span className="text-[8px] opacity-60">(Click to view)</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground text-sm font-bold mb-0.5">{zone.label}</p>
                    <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider opacity-70">{zone.sub}</p>
                  </>
                )}
              </div>
            );

            if (hasFiles) {
              return (
                <Popover key={zone.id}>
                  <PopoverTrigger asChild>
                    {ZoneUI}
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 overflow-hidden shadow-2xl border-border bg-card" side="top" align="center" sideOffset={10}>
                    <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded bg-blue-500 flex items-center justify-center">
                          <FileText size={12} className="text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">Attached Files</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="size-7 hover:bg-blue-500/10 hover:text-blue-500"
                        onClick={() => handleZoneClick(zone.id)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <div className="max-h-[250px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                      {files.map((name, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group/item">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="size-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span className="text-[11px] font-medium text-foreground/90 truncate">{name}</span>
                          </div>
                          <button 
                            onClick={() => removeSingleFile(zone.id, i)}
                            className="p-1.5 text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all opacity-0 group-hover/item:opacity-100"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-border bg-muted/20">
                       <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-8 text-[10px] font-bold uppercase tracking-wider gap-2 hover:bg-blue-500 hover:text-white transition-all"
                        onClick={() => handleZoneClick(zone.id)}
                       >
                         <FileUp size={12} />
                         Add More Documents
                       </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              );
            }

            return <React.Fragment key={zone.id}>{ZoneUI}</React.Fragment>;
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold  tracking-widest px-1">
        <div className="h-px flex-1 bg-border" />
        <span>Or Paste Free Text</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Text Area Section */}
      <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden min-h-[250px] md:min-h-[300px]">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border">
          <h3 className="text-muted-foreground font-bold text-[10px] md:text-[11px] uppercase tracking-widest">Free Text / Clinical Notes</h3>
          <div className="flex items-center gap-1">
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-all hidden sm:block"><Undo2 size={16} /></button>
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-all hidden sm:block"><Redo2 size={16} /></button>
            <div className="hidden sm:block w-px h-4 bg-border mx-2" />
            <button className="flex items-center gap-2 px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-bold hover:bg-accent transition-all">
              <Copy size={14} />
              <span className="hidden xs:inline">Copy</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-4 md:p-6 relative">
          <textarea 
            className="w-full h-full bg-transparent border-none outline-none resize-none text-foreground text-sm placeholder:text-muted-foreground/50 custom-scrollbar"
            placeholder="Start typing or paste your clinical notes here..."
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
          />
          
          <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
            <button 
              onClick={handleAddToContext}
              className={cn(
                "flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all shadow-sm",
                clinicalNote.trim() 
                  ? "bg-purple-500 text-white hover:bg-purple-600" 
                  : "bg-purple-500/10 border border-purple-500/30 text-purple-500 hover:bg-purple-500/20"
              )}
            >
              <Plus size={16} />
              Add to Context
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
