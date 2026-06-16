"use client";

import React, { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SessionPageContent from "@/src/components/features/user/cases/session/SessionPageContent";

const AdminSessionDetailsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const workflow = searchParams.get("workflow") || "ambulatory";

  return (
    <Suspense fallback={<div className="flex h-full min-h-[500px] items-center justify-center bg-background text-foreground">Loading session details...</div>}>
      <SessionPageContent id={id} workflow={workflow} />
    </Suspense>
  );
};

export default AdminSessionDetailsPage;
