"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border-border/50 shadow-2xl bg-card">
        <DialogHeader className="flex flex-col items-center text-center gap-2">
          <div className={`p-3 rounded-full ${
            variant === "danger" ? "bg-red-500/10 text-red-500" : 
            variant === "warning" ? "bg-amber-500/10 text-amber-500" : 
            "bg-blue-500/10 text-blue-500"
          }`}>
            {variant === "danger" ? <Trash2 className="size-6" /> : <AlertTriangle className="size-6" />}
          </div>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex sm:flex-row gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border-border/50 font-semibold"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "destructive" : "default"}
            onClick={onConfirm}
            className={`flex-1 h-11 rounded-xl font-semibold shadow-sm ${
              variant === "danger" ? "bg-red-500 hover:bg-red-600" : 
              variant === "warning" ? "bg-amber-500 hover:bg-amber-600" :
              "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
