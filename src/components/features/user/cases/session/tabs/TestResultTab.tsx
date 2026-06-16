"use client";

import React from "react";
import { 
  Plus, 
  Copy, 
  ChevronUp, 
  ChevronDown,
  FlaskConical,
  Scan,
  Heart,
  Microscope,
  Sparkles,
  Download,
  Printer,
  FileText,
  Trash2
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

const TestResultTab = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<Record<string, string[]>>({});

  const sections = [
    { id: "lab", icon: FlaskConical, title: "Laboratory Results" },
    { id: "imaging", icon: Scan, title: "Imaging" },
    { id: "ecg", icon: Heart, title: "ECG & Cardiology" },
    { id: "micro", icon: Microscope, title: "Microbiology & Culture" },
  ];

  const handleAddClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && activeSection) {
      const fileNames = files.map(f => f.name);
      setSelectedFiles(prev => ({ 
        ...prev, 
        [activeSection]: [...(prev[activeSection] || []), ...fileNames] 
      }));
    }
    e.target.value = "";
  };

  const removeSingleFile = (sectionId: string, index: number) => {
    setSelectedFiles(prev => {
      const files = [...(prev[sectionId] || [])];
      files.splice(index, 1);
      if (files.length === 0) {
        const newState = { ...prev };
        delete newState[sectionId];
        return newState;
      }
      return { ...prev, [sectionId]: files };
    });
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        multiple
        className="hidden"
      />

      {/* Top Toolbar */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-lg text-[10px] md:text-xs font-bold hover:bg-emerald-500/20 transition-all whitespace-nowrap">
          <Sparkles size={14} className="fill-emerald-500/20" />
          AI Auto-Fill All
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Copy size={14} />
          Copy
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Download size={14} />
          EXPORT
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border text-foreground rounded-lg text-[10px] md:text-xs font-bold hover:bg-accent transition-all whitespace-nowrap">
          <Printer size={14} />
          Print
        </button>
      </div>

      {/* Test Sections */}
      <div className="space-y-4 pb-10">
        {sections.map((section) => {
          const Icon = section.icon;
          const files = selectedFiles[section.id];
          const hasFiles = files && files.length > 0;

          return (
            <div key={section.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 md:px-6 py-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <Icon size={18} className="text-muted-foreground" />
                  <h4 className="text-foreground font-bold text-xs md:text-sm tracking-tight">{section.title}</h4>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-2 md:px-3 py-1 bg-muted text-muted-foreground rounded-lg text-[9px] md:text-[10px] font-bold hover:text-foreground transition-all">
                    <Copy size={12} />
                    <span className="hidden xs:inline">Copy</span>
                  </button>
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-all">
                    <ChevronUp size={18} />
                  </button>
                </div>
              </div>
              
              <div className="px-4 md:px-6 pb-6 pt-2 space-y-4">
                {hasFiles ? (
                  <div className="space-y-2">
                    {files.map((name, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 group/item">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="size-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <FileText size={12} className="text-blue-500" />
                          </div>
                          <span className="text-[11px] font-medium text-foreground/90 truncate">{name}</span>
                        </div>
                        <button 
                          onClick={() => removeSingleFile(section.id, i)}
                          className="p-1.5 text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-[10px] md:text-[11px] italic">No {section.id === "lab" ? "lab results" : "results"} added yet.</p>
                )}
                
                <div 
                  onClick={() => handleAddClick(section.id)}
                  className="flex items-center justify-center p-3 md:p-4 border border-dashed border-border rounded-xl bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer group"
                >
                  <button className="flex items-center gap-2 text-blue-500 text-[10px] md:text-[11px] font-bold group-hover:text-blue-400 transition-colors pointer-events-none">
                    <Plus size={14} />
                    Add {section.id === "lab" ? "Lab Result" : section.title.replace(" & Cardiology", "").replace(" & Culture", "") + " Result"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestResultTab;
