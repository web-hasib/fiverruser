"use client";

import React from "react";
import Image from "next/image";
import { User, Check, CreditCard } from "lucide-react";
import { mockProfile } from "@/src/types/settings";

interface ProfileHeaderProps {
  profileCompletionPercent?: number;
}

const ProfileHeader = ({ profileCompletionPercent = 65 }: ProfileHeaderProps) => {
  return (
    <div className="p-6 pb-4">
      <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border/50 bg-muted shrink-0">
            {mockProfile.avatar ? (
              <Image
                src={mockProfile.avatar}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={32} className="text-muted-foreground m-auto mt-5" />
            )}
          </div>

          {/* Name & Badges */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-3">Saifur Rahman</h1>
            <div className="flex flex-wrap items-center gap-2">
              {/* General Practice - Blue with icon */}
              <span className="px-4 py-2 rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium flex items-center gap-1.5">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                General Practice
              </span>
              
              {/* HIPAA Active - Green with checkmark */}
              <span className="px-4 py-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                <Check className="size-3.5" />
                HIPAA Active
              </span>
              
              {/* Credits Low - Red/orange with credit card icon */}
              <span className="px-4 py-2 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-1.5">
                <CreditCard className="size-3.5" />
                Credits Low
              </span>
              
              {/* Clinical Pro Plan - Gray/white */}
              <span className="px-4 py-2 rounded-md border border-border/90 bg-transparent text-muted-foreground text-xs font-medium">
                Clinical Pro Plan
              </span>
            </div>
          </div>

          {/* Profile Completion Circle - Right side with separator */}
          <div className="flex items-center pl-6 border-l border-border/50">
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-border/50"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-blue-500"
                    strokeDasharray={`${profileCompletionPercent}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-foreground">{profileCompletionPercent}%</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Profile</span>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default ProfileHeader;
