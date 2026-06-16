"use client";

import React, { useState } from "react";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const PreferencesTab = () => {
  const [notifications, setNotifications] = useState({
    emailCase: true,
    weeklyUsage: false,
    newFeatures: false,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Default Settings */}
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-6 text-foreground">
        <div>
          <h3 className="text-lg font-bold">Default Settings</h3>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">
              Default Specialty
            </Label>
            <Select defaultValue="Surgery">
              <SelectTrigger className="h-11 bg-card border-border/60 rounded-xl">
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="General">General Practice</SelectItem>
                <SelectItem value="Internal">Internal Medicine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">
              Preferred Output Format
            </Label>
            <Select defaultValue="Narrative">
              <SelectTrigger className="h-11 bg-card border-border/60 rounded-xl">
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Narrative">Narrative</SelectItem>
                <SelectItem value="Bullet">Bullet Points</SelectItem>
                <SelectItem value="SOAP">SOAP Note</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">
              AI Model Preference
            </Label>
            <Select defaultValue="Auto">
              <SelectTrigger className="h-11 bg-card border-border/60 rounded-xl text-muted-foreground/50">
                <SelectValue placeholder="Auto (Recommended)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Auto">Auto (Recommended)</SelectItem>
                <SelectItem value="GPT4">GPT-4 Turbo</SelectItem>
                <SelectItem value="Claude3">Claude 3.5 Sonnet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all">
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Right Column: Notifications */}
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-6 text-foreground">
        <div>
          <h3 className="text-lg font-bold">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-card/60 rounded-xl border border-border/40">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold tracking-tight">
                Email case completion notifications
              </p>
            </div>
            <Switch
              checked={notifications.emailCase}
              onCheckedChange={(v) =>
                setNotifications((prev) => ({ ...prev, emailCase: v }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-card/60 rounded-xl border border-border/40 opacity-60">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold tracking-tight text-muted-foreground/80">
                Weekly usage summary
              </p>
            </div>
            <Switch
              checked={notifications.weeklyUsage}
              onCheckedChange={(v) =>
                setNotifications((prev) => ({ ...prev, weeklyUsage: v }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-card/60 rounded-xl border border-border/40 opacity-60">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold tracking-tight text-muted-foreground/80">
                New feature announcements
              </p>
            </div>
            <Switch
              checked={notifications.newFeatures}
              onCheckedChange={(v) =>
                setNotifications((prev) => ({ ...prev, newFeatures: v }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;
