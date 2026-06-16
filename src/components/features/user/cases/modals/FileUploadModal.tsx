"use client";

import React, { useState, useCallback } from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

const FileUploadModal = ({
  isOpen,
  onClose,
  onUpload,
}: FileUploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
      onClose();
    }
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Document"
      maxWidth="sm:max-w-[500px]"
    >
      <div className="space-y-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 text-center min-h-[200px]",
            dragActive
              ? "border-blue-500 bg-blue-500/5"
              : "border-border hover:border-blue-500/50 hover:bg-accent/50",
            selectedFiles.length > 0 && "border-blue-500/30 bg-blue-500/5",
          )}
        >
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept=".doc,.docx,.pdf,.txt"
          />

          <div className="bg-blue-600/10 p-4 rounded-full border border-blue-600/20 text-blue-600">
            <Upload className="size-8" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-muted-foreground">
              DOCX, PDF or TXT (max. 10MB)
            </p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl border border-border/50 group animate-in fade-in slide-in-from-top-1"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-background p-2 rounded-lg border border-border">
                    <CheckCircle2 className="size-4 text-green-500" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                      {file.name.split(".").pop()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl h-11 font-semibold"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
            className="flex-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-semibold shadow-lg shadow-blue-600/20 disabled:opacity-50"
            type="button"
          >
            {selectedFiles.length > 1
              ? `Upload ${selectedFiles.length} Files`
              : "Upload and Continue"}
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default FileUploadModal;
