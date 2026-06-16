import React from "react";

interface StepperLayoutProps {
  currentStep: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AssistantStepperLayout = ({
  currentStep,
  title,
  subtitle,
  children,
}: StepperLayoutProps) => {
  return (
    <div className="w-full  mx-auto flex flex-col items-center py-10 px-4">
      {/* Stepper Progress */}
      <div className="flex items-center justify-center w-full mb-10">
        <div className="flex items-center gap-1">
          {/* Step 1 */}
          <div
            className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20 z-10 transition-colors ${currentStep >= 1
              ? "bg-blue-600 text-white"
              : "bg-card text-muted-foreground border border-border/50"
              }`}
          >
            01
          </div>
          <div
            className={`h-1 w-16 -ml-2 -mr-2 transition-colors ${currentStep >= 2 ? "bg-blue-600" : "bg-border"
              }`}
          ></div>
          {/* Step 2 */}
          <div
            className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20 z-10 transition-colors ${currentStep >= 2
              ? "bg-blue-600 text-white"
              : "bg-white text-muted-foreground border border-border/50"
              }`}
          >
            02
          </div>
          <div
            className={`h-1 w-16 -ml-2 -mr-2 transition-colors ${currentStep >= 3 ? "bg-blue-600" : "bg-border/50 bg-white"
              }`}
          ></div>
          {/* Step 3 */}
          <div
            className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20 z-10 transition-colors ${currentStep >= 3
              ? "bg-blue-600 text-white"
              : "bg-white text-muted-foreground border border-border/50"
              }`}
          >
            03
          </div>
        </div>
      </div>

      {/* Header text */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      {/* Content Area */}
      <div className="w-full bg-card border border-border/50 rounded-2xl p-6 sm:p-8 min-h-[400px]">
        {children}
      </div>
    </div>
  );
};
