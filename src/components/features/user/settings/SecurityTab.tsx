"use client";

import React, { useState } from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import {
  Shield,
  Key,
  Smartphone,
  MessageSquare,
  Mail,
  AlertTriangle,
  CheckCircle2,
  X,
  ChevronRight,
  RefreshCw,
  Clock,
  Lock,
  Check
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const SecurityTab = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailVerifyEnabled, setEmailVerifyEnabled] = useState(true);

  const passwordRequirements = [
    { label: "At least 12 characters", met: true },
    { label: "Uppercase & lowercase letters", met: true },
    { label: "At least one number", met: true },
    { label: "At least one symbol (!, @, #, ...)", met: false },
    { label: "Not a previously used password", met: true },
  ];

  const improveScoreItems = [
    { label: "Enable SMS 2FA", points: "+15 pts" },
    { label: "Set up Authenticator app", points: "+8 pts" },
    { label: "Add a backup email", points: "+5 pts" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Security Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage authentication, active sessions, and compliance controls for your clinical account.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-semibold text-foreground">Change password</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-foreground/80">Current password</Label>
                <Input
                  type="password"
                  defaultValue="sdkfhslkdjflsfdls"
                  className="h-10 bg-card border-border/50 rounded-lg text-sm text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground/80">New Password</Label>
                  <div className="relative">
                    <Input
                      type="password"
                      defaultValue="sdkfhslkdjflsfdls"
                      className="h-10 bg-card border-border/50 rounded-lg pr-10 text-sm text-foreground"
                    />
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground/80">Confirm New Password</Label>
                  <Input
                    type="password"
                    defaultValue="sdkfhslkdjflsfdls"
                    className="h-10 bg-card border-border/50 rounded-lg text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground/80">Primary email</Label>
                  <div className="relative">
                    <Input
                      type="email"
                      defaultValue="example.xyz@gmail.com"
                      className="h-10 bg-card border-border/50 rounded-lg pr-10 text-sm text-foreground"
                    />
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground/80">Secondary email</Label>
                  <Select>
                    <SelectTrigger className="h-10 bg-card border-border/50 rounded-lg text-sm text-foreground">
                      <SelectValue placeholder="example.xyz@gmail.com" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="example.xyz@gmail.com">example.xyz@gmail.com</SelectItem>
                      <SelectItem value="other@email.com">other@email.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Recovery and notification fallback. Verification email will be sent.</p>
                </div>
              </div>

              {/* Password requirement tags */}
              <div className="flex items-center gap-2 pt-2">
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">12+ chars</span>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">Uppercase</span>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">Number</span>
                <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-500 text-xs font-medium">Symbol</span>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-sm text-amber-600 flex items-center gap-2">
              <Shield className="size-4 shrink-0" />
              Manage authentication, active sessions, and compliance controls for your clinical account.
            </p>
          </div>

          {/* Update Password Button - Right aligned */}
          <div className="flex justify-end">
            <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
              <RefreshCw className="size-4" />
              Update Password
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Two-factor authentication</h3>

            {/* TOTP */}
            <div className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Authenticator app (TOTP)</p>
                  <p className="text-xs text-muted-foreground">Google Authenticator, Authy, or any TOTP-compatible app — strongest method.</p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>

            {/* SMS */}
            <div className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">SMS verification</p>
                  <p className="text-xs text-muted-foreground">Receive a 6-digit code on your registered mobile number</p>
                </div>
              </div>
              <Switch
                checked={smsEnabled}
                onCheckedChange={setSmsEnabled}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {/* Email verification */}
            <div className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Email verification on new device</p>
                  <p className="text-xs text-muted-foreground">One-time code when signing in from an unrecognized browser or device</p>
                </div>
              </div>
              <Switch
                checked={emailVerifyEnabled}
                onCheckedChange={setEmailVerifyEnabled}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>

          {/* Second Warning Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-sm text-amber-600 flex items-center gap-2">
              <Shield className="size-4 shrink-0" />
              Manage authentication, active sessions, and compliance controls for your clinical account.
            </p>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Password Requirements */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Key className="size-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground">Password requirements</h3>
            </div>
            <ul className="space-y-2">
              {passwordRequirements.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">•</span>
                  <span className={cn(
                    "text-muted-foreground",
                    req.met && "text-foreground"
                  )}>{req.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improve your score */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="size-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground">Improve your score</h3>
            </div>
            <ul className="space-y-2 mb-3">
              {improveScoreItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">({item.points})</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              A score of 90+ is recommended for accounts handling patient data.
            </p>
          </div>

          {/* Auto-logout & HIPAA */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="size-4 text-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Auto-logout & HIPAA</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              HIPAA guidelines recommend automatic session termination after no more than 15 minutes of inactivity on devices that access ePHI. The default setting meets this requirement.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/50">
        <Button variant="outline" className="h-10 px-6 rounded-lg border-border hover:bg-muted text-sm">
          Cancel
        </Button>
        <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab;
