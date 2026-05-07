"use client";

import React from "react";
import { 
  Copy, 
  Trash2, 
  Mic 
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface LiveTranscriptProps {
  isRecording: boolean;
}

const LiveTranscript = ({ isRecording }: LiveTranscriptProps) => {
  const demoMessages = [
    { speaker: "Doctor", initial: "DR", text: "Good morning, Mr. Smith. How are you feeling today?", time: "10:02 AM" },
    { speaker: "Patient", initial: "PT", text: "I've been having some sharp chest pain and shortness of breath lately, especially when I walk up stairs.", time: "10:02 AM" },
    { speaker: "Doctor", initial: "DR", text: "I'm sorry to hear that. When exactly did these symptoms start? Any other symptoms like nausea or sweating?", time: "10:03 AM" },
    { speaker: "Patient", initial: "PT", text: "It started about two days ago. No nausea, but I do feel a bit lightheaded when it happens.", time: "10:03 AM" },
    { speaker: "Doctor", initial: "DR", text: "Understood. We'll perform an ECG and check your vitals immediately. AI is currently extracting these details for your SOAP note.", time: "10:04 AM" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-xl min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <div className={cn("size-2 rounded-full", isRecording ? "bg-red-500 animate-pulse" : "bg-muted-foreground/30")} />
          <h3 className="text-foreground font-bold text-xs uppercase tracking-widest">Live Transcript</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-lg text-[10px] font-bold hover:bg-blue-500/20 transition-all">
            <Copy size={12} />
            <span className="hidden xs:inline">Copy</span>
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-red-500/20 text-red-500/70 rounded-lg text-[10px] font-bold hover:bg-red-500/5 hover:text-red-500 transition-all">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto custom-scrollbar bg-background/50">
        {!isRecording ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center max-w-[300px] animate-in fade-in zoom-in duration-500">
              <div className="size-16 md:size-20 rounded-full bg-blue-500/5 flex items-center justify-center mb-6 border border-blue-500/10">
                <Mic size={32} className="text-blue-500/40" />
              </div>
              <h4 className="text-foreground font-bold text-base md:text-lg mb-2">Awaiting recording</h4>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                Press the microphone above and speak naturally. AI will transcribe and extract clinical data in real time.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {demoMessages.map((msg, i) => (
              <div key={i} className="flex gap-4 group">
                <div className={cn(
                  "size-9 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-sm",
                  msg.speaker === "Doctor" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground border border-border"
                )}>
                  {msg.initial}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">{msg.speaker}</p>
                    <span className="text-[9px] text-muted-foreground/50 font-mono">{msg.time}</span>
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                    msg.speaker === "Doctor" ? "bg-blue-500/5 border border-blue-500/10 text-foreground" : "bg-card border border-border text-foreground/90"
                  )}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Real-time Indicator */}
            <div className="flex gap-4 items-center animate-pulse pt-2 px-1">
              <div className="size-2 bg-blue-500 rounded-full" />
              <p className="text-[11px] text-blue-500 font-bold uppercase tracking-[0.2em]">Listening & Extracting...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTranscript;
