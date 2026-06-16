"use client";

import Container from "@/src/components/Container";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { EmptyTab } from "@/src/components/features/user/patients/profile/EmptyTab";
import { OverviewMainContent } from "./components/OverviewMainContent";
import { OverviewSidebarWidgets } from "./components/OverviewSidebarWidgets";
import { PatientProfileHeader } from "./components/PatientProfileHeader";
import { PatientTabsNav, ProfileTab } from "./components/PatientTabsNav";
import { FilesTabContent } from "./components/tabs/FilesTabContent";
import { SessionsTabContent } from "./components/tabs/SessionsTabContent";
import { TasksTabContent } from "./components/tabs/TasksTabContent";

// ─── Hash <-> Tab mapping ────────────────────────────────────────────────────
const TAB_TO_HASH: Record<ProfileTab, string> = {
  overview:  "overview",
  sessions:  "sessions",
  files:     "files",
  tasks:     "related-tasks",
  messages:  "messages",
  letters:   "letters",
};

const HASH_TO_TAB: Record<string, ProfileTab> = Object.fromEntries(
  Object.entries(TAB_TO_HASH).map(([tab, hash]) => [hash, tab as ProfileTab])
);

function getTabFromHash(): ProfileTab {
  if (typeof window === "undefined") return "overview";
  const hash = window.location.hash.replace("#", "");
  return HASH_TO_TAB[hash] ?? "overview";
}

export default function PatientProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<ProfileTab>(getTabFromHash);

  // Sync tab → hash whenever the user clicks a tab
  const handleTabChange = useCallback((tab: ProfileTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${TAB_TO_HASH[tab]}`);
  }, []);

  // Sync hash → tab on browser back/forward
  useEffect(() => {
    const onPopState = () => setActiveTab(getTabFromHash());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <Container className="p-0 pb-10">
      <PatientProfileHeader />

      <PatientTabsNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* ─── Tabs Content Area ─── */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="flex flex-col xl:flex-row items-start gap-4 w-full">
            <div className="flex-1 w-full min-w-0">
              <OverviewMainContent />
            </div>
            <div className="w-full xl:w-80 shrink-0">
              <OverviewSidebarWidgets />
            </div>
          </div>
        )}

        {activeTab === "sessions" && <SessionsTabContent />}
        {activeTab === "files"    && <FilesTabContent />}
        {activeTab === "tasks"    && <TasksTabContent />}

        {(activeTab === "messages" || activeTab === "letters") && (
          <div className="border border-border/50 bg-card rounded-xl">
            <EmptyTab
              title={activeTab === "letters" ? "No generated texts yet" : "No messages yet"}
              subtitle={activeTab === "letters"
                ? "Use the Generate button to create consultation letters, discharge summaries, and more."
                : "Use the Send Message button to communicate directly with this patient."}
            />
          </div>
        )}
      </div>
    </Container>
  );
}
