'use client'

import React, { useState } from "react";
import { AssistantStepperLayout } from "../_components/AssistantStepperLayout";
import { useRouter } from "next/navigation";
import { Step1Scratch } from "../_components/Step1Scratch";
import { Step2Scratch } from "../_components/Step2Scratch";
import { Step3Scratch } from "../_components/Step3Scratch";
import { Step4Preview } from "../_components/Step4Preview";

export default function CreateFromScratchPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleCancel = () => router.push("/dashboard/user/my-assistants/private");

  // API Ready Form State
  const [formData, setFormData] = useState({
    assistantName: "",
    medicalSpecialty: "",
    outputLanguage: "English",
    type: "",
    clinicalRole: "",
    documentType: "",
    description: "",
    assistantIcon: null as File | null,
    careSetting: "",
    instructions: "",
    outputFormat: "",
    advClinicalRole: "",
    patientPopulation: "",
    noteDetailLevel: "",
    coding: "",
    exampleText: "",
    freeFormText: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // If we are on the final preview step (4), render the static view without Stepper
  if (currentStep === 4) {
    return (
      <div className="p-6">
        <Step4Preview
          onEdit={() => setCurrentStep(3)}
          onExport={() => alert("Export CSV")}
        />
      </div>
    );
  }

  return (
    <AssistantStepperLayout
      currentStep={currentStep}
      title={currentStep === 1 ? "Create from Scratch" : (currentStep === 2 ? "Configure your Medical Assistant" : "Review & Edit")}
      subtitle={
        currentStep === 1
          ? "Build your assistant manually with full control over settings, prompts, and outputs."
          : "Every field below shapes your assistant's behaviour — fill them carefully for the best output quality."
      }
    >
      {currentStep === 1 && (
        <Step1Scratch
          onNext={handleNext}
          onCancel={handleCancel}
        />
      )}
      {currentStep === 2 && (
        <Step2Scratch
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <Step3Scratch
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </AssistantStepperLayout>
  );
}
