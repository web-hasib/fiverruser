"use client";

import React, { useState } from "react";
import Container from "@/src/components/Container";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import { User, Shield, Sparkles, CreditCard } from "lucide-react";

// Import tab components
import ProfileTab from "@/src/components/features/user/settings/ProfileTab";
import SecurityTab from "@/src/components/features/user/settings/SecurityTab";
import TokenUsageTab from "@/src/components/features/user/settings/TokenUsageTab";
import SubscriptionTab from "@/src/components/features/user/settings/SubscriptionTab";
import ProfileHeader from "@/src/components/features/user/settings/ProfileHeader";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Profile Header with Tabs inside */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <ProfileHeader profileCompletionPercent={65} />
            
            {/* Tab Navigation - Inside the card at bottom */}
            <div className="border-t border-border/50 px-2 ">
              <TabsList className="bg-transparent h-11 justify-start my-2 gap-1 rounded-md p-0 w-auto inline-flex">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-4 data-[state=active]:border-blue-500 text-muted-foreground text-sm font-medium transition-all hover:text-foreground"
                >
                  <User size={14} />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-4 data-[state=active]:border-blue-500 text-muted-foreground text-sm font-medium transition-all hover:text-foreground"
                >
                  <Shield size={14} />
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="credits"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-4 data-[state=active]:border-blue-500 text-muted-foreground text-sm font-medium transition-all hover:text-foreground"
                >
                  <Sparkles size={14} />
                  AI Credits
                </TabsTrigger>
                <TabsTrigger
                  value="subscription"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-4 data-[state=active]:border-blue-500 text-muted-foreground text-sm font-medium transition-all hover:text-foreground"
                >
                  <CreditCard size={14} />
                  Subscription Plan
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Contents */}
          <div className="mt-6">
            <TabsContent value="profile" className="focus-visible:outline-none m-0">
              <ProfileTab />
            </TabsContent>
            <TabsContent
              value="security"
              className="focus-visible:outline-none m-0"
            >
              <SecurityTab />
            </TabsContent>
            <TabsContent value="credits" className="focus-visible:outline-none m-0">
              <TokenUsageTab />
            </TabsContent>
            <TabsContent
              value="subscription"
              className="focus-visible:outline-none m-0"
            >
              <SubscriptionTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Container>
  );
};

export default SettingsPage;
