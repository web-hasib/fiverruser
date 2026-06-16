"use client";
// Touch for refresh

import React, { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SessionPageContent from "@/src/components/features/user/cases/session/SessionPageContent";

const SessionPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const workflow = searchParams.get("workflow") || "ambulatory";

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#0c0e14] text-white">Loading session...</div>}>
      <SessionPageContent id={id} workflow={workflow} />
    </Suspense>
  );
};

export default SessionPage;
