"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const DeleteKnowledgeModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}: DeleteKnowledgeModalProps) => {
  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Entry"
      maxWidth="sm:max-w-[400px]"
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Are you sure?</h3>
        <p className="text-muted-foreground text-sm mb-8">
          You are about to delete the entry <span className="text-foreground font-bold">"{title}"</span>. This action cannot be undone.
        </p>

        <div className="flex w-full gap-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 bg-muted/20 border border-border text-foreground hover:bg-muted/40 h-12 rounded-xl font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white h-12 rounded-xl font-bold transition-transform active:scale-95"
          >
            Delete
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default DeleteKnowledgeModal;
