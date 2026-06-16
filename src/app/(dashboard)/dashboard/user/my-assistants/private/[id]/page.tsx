"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Share2,
  Undo,
  Copy,
  FileTextIcon,
  MicIcon,
  Link2Icon,
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
import { mockPrivateAssistants, Assistant } from "@/src/types/assistant";
import { ShareAssistantModal } from "@/src/components/features/user/assistants/ShareAssistantModal";
import { AssistantDetailContent } from "@/src/components/features/user/assistants/AssistantDetailContent";

// Default sections for private assistants that don't have custom sections
const DEFAULT_SECTIONS = [
  { heading: "Referral to Psychiatry", exampleText: "", structureText: "" },
  {
    heading: "Patient",
    exampleText: "Mr. Kocsir",
    structureText:
      "[Patient Name] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit completely.)",
  },
  {
    heading: "Referring Clinician",
    exampleText: "Dr. [Referring Clinician Name], Surgical Emergency Unit",
    structureText:
      "[Referring Clinician Name], [Referring Clinician Department/Unit] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit completely.)",
  },
  {
    heading: "Referred to",
    exampleText: "On-call Psychiatry",
    structureText:
      "[Receiving Clinician/Service] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit completely.)",
  },
  {
    heading: "Reason for Referral:",
    exampleText:
      "Request for urgent psychiatric consultation regarding capacity assessment for urgent leg amputation.",
    structureText:
      "[reason for referral and psychiatric consultation] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
  {
    heading: "History of Present Illness:",
    exampleText:
      "Mr. Kocsir presents to the surgical emergency unit with a necrotic leg infection requiring urgent amputation.",
    structureText:
      "[detailed description of current symptoms, timeline, and circumstances leading to referral] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely. Write in paragraph format from the perspective of a referral.)",
  },
  {
    heading: "Past Psychiatric History:",
    exampleText:
      "Previous treatment at this hospital for alcohol-related issues, several years ago.",
    structureText:
      "[previous psychiatric diagnoses, hospitalizations, treatments, and dates] (Only include if explicitly mentioned in transcript, contextual notes or clinical note, else omit section entirely.)",
  },
];

const AssistantEditorPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("example");
  const [promptInput, setPromptInput] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    const found = mockPrivateAssistants.find((a) => a.id === id);
    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAssistant(found);
    } else {
      // Fallback dummy for demonstration if ID not found
      setAssistant({
        id: "new",
        name: "Outpatient Treatment Sheet",
        lastEdited: "Just now",
        lastUsed: "Never",
        creator: "Me",
        visibility: "Just me",
      });
    }
  }, [id]);

  if (!assistant) return null;

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-118px)] bg-background">
      {/* Top Header Navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground w-fit transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <Link href="/dashboard/user/my-assistants/my">
          Back to my Community
        </Link>
      </div>

      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            {assistant.name}
            <Link2Icon className="h-5 w-5 text-muted-foreground opacity-50 cursor-pointer hover:opacity-100 transition-opacity" />
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none border-border bg-transparent hover:bg-muted text-foreground gap-2 h-10 px-4 rounded-lg transition-colors"
            onClick={() => setIsShareModalOpen(true)}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button
            onClick={() => router.push("/dashboard/user/my-assistants/my")}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm h-10 px-6 rounded-lg transition-colors"
          >
            Save & Exit
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-[400px]"
          >
            <TabsList className="bg-card p-1 h-12 rounded-xl">
              <TabsTrigger
                value="example"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-foreground text-muted-foreground data-[state=active]:shadow-sm px-6 h-10"
              >
                Example
              </TabsTrigger>
              {/* Divider */}
              <div className="w-px h-5 bg-border mx-1" />
              <TabsTrigger
                value="structure"
                className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground data-[state=active]:shadow-sm px-6 h-10"
              >
                Structure
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="hidden sm:flex items-center gap-4 text-muted-foreground">
            <button
              className="hover:text-foreground transition-colors p-2"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 hover:text-foreground transition-colors p-2 text-sm font-medium">
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 overflow-y-auto pb-32 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <Tabs value={activeTab} className="w-full h-full">
            <TabsContent value="example" className="mt-0 h-full">
              <AssistantDetailContent
                sections={DEFAULT_SECTIONS}
                mode="example"
              />
            </TabsContent>
            <TabsContent value="structure" className="mt-0 h-full">
              <AssistantDetailContent
                sections={DEFAULT_SECTIONS}
                mode="structure"
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Chat Input Floor */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background via-background pb-6 pt-12 flex justify-center">
          <div className="w-full max-w-2xl relative bg-primary rounded-2xl border border-white/5 transition-colors focus-within:border-blue-500/50 shadow-2xl">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                title="Options"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <FileTextIcon className="h-5 w-5" />
              </button>
              {/* Vertical Divider */}
              <div className="h-4 w-px bg-white/10" />
              <button
                title="Voice input"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <MicIcon className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="I need a SOAP note with a problem based plan..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-[15px] px-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("Submit refined prompt:", promptInput);
                    setPromptInput("");
                  }
                }}
              />

              <button
                type="button"
                onClick={() => {
                  if (promptInput.trim()) {
                    console.log("Submit refined prompt:", promptInput);
                    setPromptInput("");
                  }
                }}
                disabled={!promptInput.trim()}
                className="text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:hover:text-blue-500 transition-colors ml-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareAssistantModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        assistant={assistant}
        onShare={(access) => {
          console.log(`Shared ${assistant.id} with access: ${access}`);
          setIsShareModalOpen(false);
        }}
      />
    </div>
  );
};

export default AssistantEditorPage;
