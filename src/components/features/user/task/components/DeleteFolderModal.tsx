"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  folderName: string;
}

const DeleteFolderModal = ({
  isOpen,
  onClose,
  onConfirm,
  folderName,
}: DeleteFolderModalProps) => {
  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Folder"
      maxWidth="sm:max-w-[400px]"
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
          <Trash2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-primary-foreground mb-2">Delete Folder?</h3>
        <p className="text-primary-foreground/60 text-sm mb-8">
          You are about to delete the folder{" "}
          <span className="text-primary-foreground/80 font-bold">"{folderName}"</span>.
          Tasks inside will not be deleted but will become unorganized. This
          action cannot be undone.
        </p>

        <div className="flex w-full gap-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 bg-primary-foreground/5 border border-border text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white h-12 rounded-xl font-bold"
          >
            Delete Folder
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default DeleteFolderModal;
