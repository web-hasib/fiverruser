"use client";

import React, { useState } from "react";
import { ArrowLeft, Send, FileText, Mic } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateAssistantPage = () => {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Create assistant prompt:", prompt);
    // Real implementation would make an API call here, then navigate back
    setPrompt("");
    router.push("/dashboard/user/my-assistants/my/:id");
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-118px)] bg-background">
      {/* Top Header Navigation */}
      <div className="flex items-center gap-2 mb-12 text-sm text-muted-foreground hover:text-foreground w-fit transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <Link className="cursor-pointer z-20" href="/dashboard/user/my-assistants/my">
          Back to my Community
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-32 px-4 sm:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
          What do you want to create?
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
          Upload an example, or describe the structure and purpose of what you
          want to create. We&apos;ll create a reusable template that writes
          content that sounds just like you.
        </p>

        <div className="w-full max-w-3xl relative bg-primary rounded-2xl border border-border/50 transition-colors focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 group text-left shadow-sm">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I need a SOAP note with a problem based plan..."
            className="w-full bg-transparent border-none resize-none outline-none text-foreground placeholder:text-muted-foreground p-5 min-h-[140px] text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <div className="flex items-center justify-between px-5 pb-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <button
                type="button"
                className="hover:text-foreground transition-colors"
                title="Attach file"
              >
                <FileText className="h-5 w-5" />
              </button>
              {/* Vertical Divider */}
              <div className="h-4 w-px bg-border mx-1" />
              <button
                type="button"
                className="hover:text-foreground transition-colors"
                title="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:hover:text-blue-500 transition-colors"
              title="Send prompt"
            >
              <Send className="h-6 w-6 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssistantPage;
