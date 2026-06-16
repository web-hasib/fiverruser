"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteTaskModalProps) => {
  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
      maxWidth="sm:max-w-[400px]"
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold text-primary-foreground mb-2">Are you sure?</h3>
        <p className="text-primary-foreground/60 text-sm mb-8">
          You are about to delete the task <span className="text-primary-foreground/80 font-bold">"{taskTitle}"</span>. This action cannot be undone.
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
            onClick={onConfirm}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white h-12 rounded-xl font-bold"
          >
            Delete
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default DeleteTaskModal;
