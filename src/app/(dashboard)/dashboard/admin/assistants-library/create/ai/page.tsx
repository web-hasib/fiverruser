"use client";

import React, { useState } from "react";
import { AssistantStepperLayout } from "../_components/AssistantStepperLayout";
import { useRouter } from "next/navigation";
import { Step1AI } from "../_components/Step1AI";
import { Step2Scratch } from "../_components/Step2Scratch";
import { Step3Scratch } from "../_components/Step3Scratch";
import { Step4Preview } from "../_components/Step4Preview";

export default function GenerateWithAIPage() {
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
      title={currentStep === 1 ? "Generate with AI" : (currentStep === 2 ? "Configure your Medical Assistant" : "Review & Edit")}
      subtitle={
        currentStep === 1
          ? "Describe your use Session and let AI generate an assistant for you. You can review and edit later."
          : "Every field below shapes your assistant's behaviour — fill them carefully for the best output quality."
      }
    >
      {currentStep === 1 && (
        <Step1AI
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
