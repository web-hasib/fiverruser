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
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleCancel = () => router.push("/dashboard/user/my-assistants/private");

  // API Ready Form State
  const [formData, setFormData] = useState({
    assistantName: "",
    medicalSpecialty: "",
    outputLanguage: "English",
    clinicalRole: "",
    documentType: "",
    description: "",
    assistantIcon: null as File | null,
    exampleFile: null as File | null,
    careSetting: "",
    introduction: "",
    outputFormat: "",
    exampleText: "",
    freeFormText: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AssistantStepperLayout
      currentStep={currentStep}
      title={currentStep === 1 ? "Create from Scratch" : (currentStep === 2 ? "Review & Edit" : "Final Preview")}
      subtitle={
        currentStep === 1
          ? "Configure your medical assistant with custom settings and behavior."
          : (currentStep === 2 ? "Refine the logic and instructions for your assistant." : "Review your assistant configuration before finishing.")
      }
    >
      {currentStep === 1 && (
        <Step2Scratch
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleCancel}
        />
      )}
      {currentStep === 2 && (
        <Step3Scratch
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <Step4Preview
          onEdit={() => setCurrentStep(2)}
          onExport={() => alert("Export CSV")}
        />
      )}
    </AssistantStepperLayout>
  );
}
