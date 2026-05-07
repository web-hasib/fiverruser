"use client";

import React from "react";
import Container from "@/src/components/Container";
import Heading from "@/src/components/Heading";

// --- Extracted Components ---
import { StatCardsGrid } from "./components/StatCardsGrid";
import { ScheduleSection } from "./components/ScheduleSection";
import { RecentCasesSection } from "./components/RecentCasesSection";
import { AssistantsSection } from "./components/AssistantsSection";
import { RecentPatientsSection } from "./components/RecentPatientsSection";
import { KnowledgeBaseSection } from "./components/KnowledgeBaseSection";

/**
 * UserDashboardPage
 * 
 * Main clinical dashboard for providers. 
 * Displays key statistics, daily schedule, recent cases, and clinical knowledge base.
 */
const UserDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors overflow-x-hidden">
      <Container className="py-8 space-y-8">
        
        {/* Top Greeting */}
        <div className="space-y-1">
          <Heading title="Welcome back, Dr. Saifur 👋" />
          <p className="text-sm text-muted-foreground font-semibold tracking-wide">
            Here&apos;s your clinical overview for today.
          </p>
        </div>

        {/* 1. Statistics Cards Grid */}
        <StatCardsGrid />

        {/* 2. Today's Clinical Schedule */}
        <ScheduleSection />

        {/* 3. Recent Cases & Provider Assistants */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <RecentCasesSection />
          <AssistantsSection />
        </div>

        {/* 4. Recent Patients & Knowledge Repository */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <RecentPatientsSection />
          <KnowledgeBaseSection />
        </div>

      </Container>
    </div>
  );
};

export default UserDashboardPage;
