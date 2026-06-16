"use client";

import React from "react";
import { UploadedFile } from "@/src/types/patient";
import { File, Download, FileWarning, FileCode } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface UploadedFilesProps {
  files: UploadedFile[];
  onDownload: (id: string) => void;
}

export const UploadedFiles = ({ files, onDownload }: UploadedFilesProps) => {
  return (
    <div className="bg-card rounded-3xl p-6 border border-border h-full shadow-sm transition-colors">
      <h2 className="text-xl font-bold text-foreground mb-6">Uploaded File</h2>
      <div className="space-y-3">
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file.id}
              className="bg-muted/30 rounded-2xl p-4 border border-border flex items-center gap-4 group hover:bg-muted/50 transition-all"
            >
              <div className="size-12 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                <FileCode className="size-8 " />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate pr-2">
                    {file.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground hover:bg-background transition-all"
                    onClick={() => onDownload(file.id)}
                  >
                    <Download className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    {file.size} | {file.progress}%
                  </span>
                  <span className="size-1 rounded-full bg-border" />
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    {file.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-50">
            <File className="size-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No files uploaded yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
