"use client";

import React from "react";
import { useAppSelector } from "@/src/redux/hook";
import Container from "@/src/components/Container";

// New Overview Components (locally placed)
import { OverviewHeader as DashboardHeader } from "@/src/app/(dashboard)/dashboard/admin/_components/OverviewHeader";
import { SystemStatusBar } from "@/src/app/(dashboard)/dashboard/admin/_components/SystemStatusBar";
import { AlertsBar } from "@/src/app/(dashboard)/dashboard/admin/_components/AlertsBar";
import { StatCard } from "@/src/app/(dashboard)/dashboard/admin/_components/StatCard";
import { RevenueVsCostChart } from "@/src/app/(dashboard)/dashboard/admin/_components/RevenueVsCostChart";
import { PlanDistribution } from "@/src/app/(dashboard)/dashboard/admin/_components/PlanDistribution";
import { PendingApprovals } from "@/src/app/(dashboard)/dashboard/admin/_components/PendingApprovals";
import { RecentActivity } from "@/src/app/(dashboard)/dashboard/admin/_components/RecentActivity";

export default function DashboardOverviewPage() {
  const user = useAppSelector((state) => state.auth.user);
  const userName = user?.name || "Dr. Saifur";

  return (
    <div className="">
      <div className="">
        {/* Top Header Section */}
        <DashboardHeader userName={userName} />

        {/* Status Bars Section */}
        <div className="space-y-4">
          <SystemStatusBar />
          <AlertsBar />
        </div>

        {/* Stats Grid - Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Total Users" 
            value="2847" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="VS last month" 
            topColor="bg-blue-500"
          />
          <StatCard 
            label="Active Today" 
            value="1204" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="VS Yesterday" 
            topColor="bg-emerald-500"
          />
          <StatCard 
            label="Departments" 
            value="28" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="This week" 
            topColor="bg-purple-500"
          />
          <StatCard 
            label="Team / Org" 
            value="143" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="This week" 
            topColor="bg-cyan-500"
          />
        </div>

        {/* Stats Grid - Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
          <StatCard 
            label="MRR" 
            value="$32,247" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="VS last month" 
            topColor="bg-emerald-500"
          />
          <StatCard 
            label="ARR" 
            value="$513.6K" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="YoY" 
            topColor="bg-blue-500"
          />
          <StatCard 
            label="AI Cost (Month)" 
            value="$8,240" 
            trend="8.3%" 
            trendType="up" 
            trendLabel="VS last month" 
            topColor="bg-blue-500"
          />
          <StatCard 
            label="Gross Margin" 
            value="80.7%" 
            trend="1.2%" 
            trendType="down" 
            trendLabel="VS last month" 
            topColor="bg-blue-400"
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 mt-4 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 min-h-[400px]">
            <RevenueVsCostChart />
          </div>
          <div className="lg:col-span-1 min-h-[400px]">
            <PlanDistribution />
          </div>
        </div>

        {/* Bottom Lists Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4">
          <div className="lg:col-span-2">
            <PendingApprovals />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
