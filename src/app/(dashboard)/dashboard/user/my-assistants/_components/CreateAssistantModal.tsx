"use client";

import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  basePath?: string;
}

export const CreateAssistantModal = ({ isOpen, onClose, basePath = "/dashboard/user/my-assistants/create" }: CreateAssistantModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-card border  border-gray-400/50 rounded-2xl w-full max-w-4xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-red-500 hover:text-red-400 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Assistant</h2>
          <p className="text-muted-foreground text-sm">Choose how you want to create your assistant.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create from Scratch */}
          <div className="bg-background border border-border/50 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center text-4xl mb-3">
              ✏️
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Create from Scratch</h3>
            <p className="text-muted-foreground text-sm mb-5 flex-1">
              Build your assistant manually with full control over settings, prompts, and outputs.
            </p>
            <button 
              onClick={() => router.push(`${basePath}/scratch`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            >
              Start from Scratch
            </button>
          </div>

          {/* Generate with AI */}
          <div className="bg-background border border-border/50 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center text-4xl mb-6">
              🤖
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">Generate with AI</h3>
            <p className="text-muted-foreground text-sm mb-8 flex-1">
              Describe your use Session and let AI generate an assistant for you. You can review and edit later.
            </p>
            <button 
              onClick={() => router.push(`${basePath}/ai`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            >
              Generate Assistant
            </button>
          </div>

          {/* Browse Pre-made */}
          <div className="bg-background border border-border/50 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center text-4xl mb-6">
              📚
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">Browse Pre-made</h3>
            <p className="text-muted-foreground text-sm mb-8 flex-1">
              Choose from ready-made assistants and customize them to your needs.
            </p>
            <button 
              onClick={() => router.push(`${basePath}/pre-made`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            >
              Browse Library
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
