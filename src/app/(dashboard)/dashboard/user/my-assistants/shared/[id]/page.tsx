"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Link2Icon,
  Undo,
  Copy,
  Download,
  Activity,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockSharedAssistants, SharedAssistant } from "@/src/types/assistant";
import { AssistantDetailContent } from "@/src/components/features/user/assistants/AssistantDetailContent";

// ─── Meta Chip ────────────────────────────────────────────────────────────────
interface MetaChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MetaChip = ({ icon, label, value }: MetaChipProps) => (
  <div className="flex items-center gap-2.5 px-4 py-3 bg-card rounded-xl border border-border/60 flex-1 min-w-[140px]">
    <div className="text-muted-foreground shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground truncate">{value}</p>
    </div>
  </div>
);

// ─── Fallback dummy assistant ─────────────────────────────────────────────────
const FALLBACK_ASSISTANT: SharedAssistant = mockSharedAssistants[0];

// ─── Page ─────────────────────────────────────────────────────────────────────
const SharedAssistantDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState<"example" | "structure">(
    "example",
  );

  const assistant: SharedAssistant = useMemo(
    () => mockSharedAssistants.find((a) => a.id === id) ?? FALLBACK_ASSISTANT,
    [id],
  );

  const formattedUses =
    assistant.uses >= 1000
      ? `${(assistant.uses / 1000).toFixed(0)}K times`
      : `${assistant.uses} times`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-118px)] bg-background">
      {/* Back Navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground w-fit transition-colors group cursor-pointer">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <Link href="/dashboard/user/my-assistants/shared">
          Back to Community
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate">{assistant.name}</span>
          <Link2Icon className="h-5 w-5 text-muted-foreground opacity-50 shrink-0 cursor-pointer hover:opacity-100 transition-opacity" />
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            className="border-border bg-transparent hover:bg-muted text-foreground gap-2 h-10 px-4 rounded-lg transition-colors"
            onClick={() => {
              // API integration point: POST /api/assistants/{id}/export-pdf
              console.log("Export PDF:", assistant.id);
            }}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm h-10 px-6 rounded-lg transition-colors"
            onClick={() => router.push("/dashboard/user/my-assistants/shared")}
          >
            Save & Exit
          </Button>
        </div>
      </div>

      {/* Meta Info Row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <MetaChip
          icon={
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-base leading-none">
              {assistant.authorAvatar}
            </div>
          }
          label="Created by"
          value={assistant.creator}
        />
        <MetaChip
          icon={<Activity className="w-5 h-5" />}
          label="Specialty"
          value={assistant.specialty}
        />
        <MetaChip
          icon={<Calendar className="w-5 h-5" />}
          label="Last edited"
          value={assistant.lastEdited}
        />
        <MetaChip
          icon={<Users className="w-5 h-5" />}
          label="Uses "
          value={formattedUses}
        />
      </div>

      {/* About Community Prompts */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3">
          About Community Prompts
        </h2>
        <p className="text-foreground/80 text-sm sm:text-[15px] leading-relaxed">
          {assistant.aboutText}
        </p>
      </div>

      {/* Template Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs + Actions Bar */}
        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6 gap-4 flex-wrap">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "example" | "structure")}
          >
            <TabsList className="bg-card p-1 h-11 rounded-xl border border-border/50">
              <TabsTrigger
                value="example"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground px-6 h-9 text-sm font-medium"
              >
                Example
              </TabsTrigger>
              <div className="w-px h-4 bg-border mx-1" />
              <TabsTrigger
                value="structure"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground px-6 h-9 text-sm font-medium"
              >
                Structure
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Utility Buttons */}
          <div className="hidden sm:flex items-center gap-1 text-muted-foreground">
            <button
              className="hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              className="flex items-center gap-2 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted text-sm font-medium"
              onClick={() => {
                // API integration point: copy template text to clipboard
                console.log("Copy template");
              }}
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
        </div>

        {/* Scrollable Template Content */}
        <div className="overflow-y-auto pb-10 scrollbar-thin">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="example" className="mt-0">
              <AssistantDetailContent
                sections={assistant.sections}
                mode="example"
              />
            </TabsContent>
            <TabsContent value="structure" className="mt-0">
              <AssistantDetailContent
                sections={assistant.sections}
                mode="structure"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SharedAssistantDetailPage;
