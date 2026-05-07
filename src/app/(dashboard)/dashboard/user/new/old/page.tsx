"use client";

import React from "react";
import NewCasePageContent from "@/src/components/features/user/cases/NewCasePageContent";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="h-[calc(100vh-140px)]">
      <NewCasePageContent id={id} />
    </div>
  );
};

export default Page;
