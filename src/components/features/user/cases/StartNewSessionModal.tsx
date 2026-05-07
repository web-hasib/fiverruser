"use client";

import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface StartNewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkflowOption {
  id: string;
  title: string;
  description: string;
  footer: string;
  icon: keyof typeof Icons;
}

const workflows: WorkflowOption[] = [
  {
    id: "ambulatory",
    title: "Ambulatory",
    description: "Outpatient visit, follow-up, or scheduled consultation",
    footer: "SOAP · Patient Summary",
    icon: "Stethoscope",
  },
  {
    id: "inpatient",
    title: "Inpatient Round",
    description: "Ward round or hospital admission note",
    footer: "SOAP · Summary · Test Results",
    icon: "Activity",
  },
  {
    id: "surgery",
    title: "Surgery",
    description: "Pre-operative, operative, or post-operative notes",
    footer: "Procedure · Follow-up",
    icon: "Scissors",
  },
  {
    id: "emergency",
    title: "Emergency",
    description: "Urgent care or emergency department visit",
    footer: "Triage · Assessment",
    icon: "Zap",
  },
  {
    id: "consultation",
    title: "Consultation",
    description: "Specialist consultation or second opinion",
    footer: "Specialist · Advice",
    icon: "MessageSquare",
  },
  {
    id: "radiology",
    title: "Radiology",
    description: "Imaging interpretation and reporting",
    footer: "Imaging · Findings",
    icon: "Scan",
  },
  {
    id: "mdt",
    title: "MDT / Oncoteam",
    description: "Multi-disciplinary team meeting and discussion",
    footer: "Team · Multi-disciplinary",
    icon: "Users",
  },
  {
    id: "administrative",
    title: "Administrative",
    description: "Non-clinical administrative tasks and notes",
    footer: "Admin · Support",
    icon: "FileText",
  },
  {
    id: "other",
    title: "Other",
    description: "General clinical workflow for various needs",
    footer: "General · Customizable",
    icon: "PlusCircle",
  },
];

const StartNewSessionModal = ({
  isOpen,
  onClose,
}: StartNewSessionModalProps) => {
  const router = useRouter();
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<string | null>(null);

  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    const sessionId = Math.random().toString(36).substring(2, 10);
    router.push(`/dashboard/user/new/session/${sessionId}?workflow=${workflowId}`);
    onClose();
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="sm:max-w-[950px]"
      className="bg-card border-border shadow-2xl"
    >
      <div className="space-y-8 p-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-foreground text-2xl font-bold tracking-tight">
              Start New Session
            </h2>
            <p className="text-muted-foreground text-sm">
              Choose the type of clinical workflow to set up the right tabs automatically.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {workflows.map((workflow) => {
            const Icon = Icons[workflow.icon] as React.ElementType;
            const isSelected = selectedWorkflow === workflow.id;
            return (
              <div
                key={workflow.id}
                onClick={() => handleSelectWorkflow(workflow.id)}
                className={cn(
                  "group flex flex-col items-center text-center p-4 rounded-2xl cursor-pointer transition-all border",
                  isSelected 
                    ? "bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/10" 
                    : "border-border/50 bg-muted/20 hover:bg-muted/50 hover:border-blue-500/30"
                )}
              >
                <div className={cn(
                  "size-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform",
                  isSelected ? "bg-blue-500 text-white" : "bg-muted/80 text-foreground"
                )}>
                  <Icon className="size-5" />
                </div>
                
                <h3 className="text-foreground font-semibold text-base mb-1">
                  {workflow.title}
                </h3>
                
                <p className="text-muted-foreground text-[12px] leading-snug mb-3 min-h-[36px]">
                  {workflow.description}
                </p>
                
                <div className="mt-auto text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  {workflow.footer}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </DashboardModal>
  );
};

export default StartNewSessionModal;
