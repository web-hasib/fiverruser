"use client";

import { PatientStatsCard } from "@/src/components/dashboard/PatientStatsCard";
import { Bell, FileText, Mail, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSidebar } from "@/src/components/features/admin/dashboard/components/SidebarProvider";

export const StatCardsGrid = () => {
  const router = useRouter();
  const { togglePastScribe } = useSidebar();

  const handleCardClick = (title: string, href?: string, isSidebar?: boolean) => {
    if (isSidebar) {
      togglePastScribe(true);
      return;
    }
    
    if (href) {
      router.push(href);
    } else {
      toast.info(`${title} feature will be implemented later`, {
        // description: "This feature is currently under development.",
        position: "top-right",
      });
    }
  };

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6">
      <PatientStatsCard
        title="Sessions Today"
        value="12"
        trend="Since Yesterday"
        trendValue="+5"
        icon={FileText}
        variant="blue"
        onClick={() => handleCardClick("Sessions Today", undefined, true)}
      />
      <PatientStatsCard
        title="Pending Tasks"
        value="7"
        trend="Urgent 3 Task!"
        trendValue=""
        icon={Bell}
        variant="purple"
        onClick={() => handleCardClick("Pending Tasks", "/dashboard/user/task")}
      />
      <PatientStatsCard
        title="Patients"
        value="1200"
        trend="In 7 Days!"
        trendValue="100 New Patient"
        icon={Users}
        variant="green"
        onClick={() => handleCardClick("Patients", "/dashboard/user/patients/my")}
      />
      <PatientStatsCard
        title="Letters Generated"
        value="24"
        trend="This Month"
        trendValue=""
        icon={Mail}
        variant="orange"
        onClick={() => handleCardClick("Letters Generated")}
      />
    </div>
  );
};
