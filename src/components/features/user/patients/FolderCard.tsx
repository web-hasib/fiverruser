"use client";

import React from "react";
import { SharedFolder } from "@/src/types/patient";
import Link from "next/link";

interface FolderCardProps {
  folder: SharedFolder;
}

export const FolderCard = ({ folder }: FolderCardProps) => {
  return (
    <Link
      href={`/dashboard/user/patients/shared/${folder.id}`}
      className="group flex flex-col items-center gap-4 w-48"
    >
      <div className="relative w-full aspect-4/3 flex items-center justify-center">
        {/* Shadow layer for depth */}
        <div className="absolute inset-x-4 bottom-2 h-4 bg-black/20 blur-xl rounded-full scale-x-90 group-hover:scale-x-100 transition-transform duration-500" />

        <div className="relative w-40 h-32 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
          {/* Back Part & Tab */}
          <svg
            viewBox="0 0 160 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M0 24C0 15.1634 7.16344 8 16 8H56.5147C59.167 8 61.7107 9.05357 63.5858 10.9289L75.0858 22.4289C76.9609 24.3043 79.5046 25.3579 82.1569 25.3579H144C152.837 25.3579 160 32.5213 160 41.3579V104C160 112.837 152.837 120 144 120H16C7.16344 120 0 112.837 0 104V24Z"
              fill={folder.color}
              className="brightness-90 transition-all duration-500 group-hover:brightness-75"
            />
          </svg>

          {/* Internal Paper Stack (Peeking out on hover) */}
          <div className="absolute top-2 inset-x-4 h-24 bg-white rounded-lg shadow-sm transition-all duration-500 delay-75 group-hover:-translate-y-6 group-hover:rotate-3 origin-bottom scale-95" />
          <div className="absolute top-2 inset-x-4 h-24 bg-blue-50/80 rounded-lg shadow-sm transition-all duration-500 group-hover:-translate-y-9 group-hover:-rotate-2 origin-bottom scale-95" />

          {/* Main Paper with Content Mockup */}
          <div className="absolute top-2 inset-x-4 h-24 bg-white rounded-lg shadow-md transition-all duration-500 group-hover:-translate-y-7 group-hover:scale-105 origin-bottom flex flex-col p-3 gap-1.5 overflow-hidden">
            <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
            <div className="h-2 w-3/4 bg-slate-50 rounded-full" />
            <div className="h-2 w-2/3 bg-slate-50 rounded-full" />
          </div>

          {/* Front Flap (Glassmorphism) */}
          <div
            className="absolute bottom-0 inset-x-0 h-[78%] rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md transition-all duration-500 overflow-hidden"
            style={{
              backgroundColor: `${folder.color}cc`,
              boxShadow: `inset 0 1px 1px 0 rgba(255,255,255,0.3), 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)`,
            }}
          >
            {/* Glossy shine */}
            <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-black/10 pointer-events-none" />

            {/* Folder Icon / Logo Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="size-16 rounded-full border-[6px] border-white" />
            </div>

            {/* Patient Count Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                  {folder.patientCount} Patients
                </span>
              </div>
              <div className="size-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <svg
                  className="size-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor font-bold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-1 w-full px-2">
        <h3 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors line-clamp-1">
          {folder.name}
        </h3>
        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <span
            className="size-1 rounded-full"
            style={{ backgroundColor: folder.color }}
          />
          {folder.type}
        </p>
      </div>
    </Link>
  );
};
