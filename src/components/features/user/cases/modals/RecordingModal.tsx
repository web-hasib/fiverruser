"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Mic, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onResume?: () => void;
  type: "start" | "end";
  recordingTime?: number | string;
  audioBlob?: Blob | null;
}

const RecordingModal = ({
  isOpen,
  onClose,
  onConfirm,
  onResume,
  type,
  recordingTime = 0,
  audioBlob,
}: RecordingModalProps) => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getFileSize = (blob: Blob | null): string => {
    if (!blob) return "0 KB";
    const kb = blob.size / 1024;
    if (kb > 1024) {
      return `${(kb / 1024).toFixed(2)} MB`;
    }
    return `${kb.toFixed(2)} KB`;
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "start" ? "Start Recording" : "Stop Recording"}
      maxWidth="sm:max-w-[450px]"
    >
      <div className="flex flex-col">
        {/* Icon Section */}
        <div className="flex justify-center">
          <div
            className={cn(
              "size-16 rounded-full flex items-center justify-center animate-pulse",
              type === "start"
                ? "bg-blue-600/20 border-2 border-blue-500"
                : "bg-orange-600/20 border-2 border-orange-500"
            )}
          >
            {type === "start" ? (
              <Mic className="size-8 text-blue-500 animate-pulse" />
            ) : (
              <Mic className="size-8 text-orange-500" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h3
              className={cn(
                "text-lg font-bold mb-2",
                type === "start" ? "text-blue-500" : "text-orange-500"
              )}
            >
              {type === "start" ? "Ready to Record?" : "Stop Recording?"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {type === "start"
                ? "Your audio recording will begin. You can pause and resume as needed."
                : "Your current recording will be saved and processed for transcription."}
            </p>
          </div>

          {/* Recording Details */}
          <div className="flex flex-col gap-3 bg-muted/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="size-4" />
                Duration
              </span>
              <span className="font-mono text-sm font-bold text-foreground">
                {typeof recordingTime === "number" ? formatTime(recordingTime) : recordingTime}
              </span>
            </div>

            {type === "end" && audioBlob && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">File Size</span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {getFileSize(audioBlob)}
                </span>
              </div>
            )}

            {type === "end" && audioBlob && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="flex items-center gap-1 text-sm font-bold text-green-500">
                  <CheckCircle className="size-3.5" />
                  Ready
                </span>
              </div>
            )}
          </div>

          {/* Info Message */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-medium">
              {type === "start"
                ? "💡 Tip: You can pause and resume your recording as needed."
                : "💡 Your recording will be automatically transcribed and processed."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {type === "start" ? (
            <>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 h-10 rounded-lg font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                className="flex-1 h-10 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Recording
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  onResume?.();
                  onClose();
                }}
                variant="outline"
                className="flex-1 h-10 rounded-lg font-semibold"
              >
                Continue Recording
              </Button>
              <Button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                className="flex-1 h-10 rounded-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white"
              >
                Stop & Save
              </Button>
            </>
          )}
        </div>
      </div>
    </DashboardModal>
  );
};

export default RecordingModal;
