"use client";

import { useState } from "react";
import { ResultsDisplay } from "@/components/results-display";
import { StepForm } from "@/components/step-form";
import { StepIndicator } from "@/components/step-indicator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  wizardConfig,
  computePath,
  getPrevId,
  getNextId,
  parseMulti,
} from "@/config/wizard-config";
import type { WizardStep } from "@/config/wizard-config";

function getDisplayStepIndex(_formData: Record<string, string>, currentId: string): number {
  if (currentId === "purpose") return 0;
  if (currentId === "ageGroup") return 1;
  if (currentId === "category") return 2;
  if (currentId === "enrolmentType" || currentId === "availableDocuments" || currentId === "updateDocuments") return 3;
  return 4; // results
}

export function DocumentChecker() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentId, setCurrentId] = useState<string>(wizardConfig.firstStep);
  const [showResults, setShowResults] = useState(false);

  const currentIndex = getDisplayStepIndex(formData, currentId);
  const totalSteps = 5;

  const handleNext = (data: Record<string, string>) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    const next = getNextId(updated, currentId);
    if (next === "results") {
      setShowResults(true);
      return;
    }
    if (next) {
      setCurrentId(next);
    }
  };

  const handleBack = () => {
    const prev = getPrevId(formData, currentId);
    if (prev) setCurrentId(prev);
  };

  const handleReset = () => {
    setFormData({});
    setCurrentId(wizardConfig.firstStep);
    setShowResults(false);
  };

  const handleResultsBack = () => {
    // go back to the last step in the computed path
    const p = computePath(formData);
    const last = p[p.length - 1];
    if (last) {
      setCurrentId(last);
      setShowResults(false);
    } else {
      handleReset();
    }
  };

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={handleReset} onBack={handleResultsBack} />;
  }

  const step: WizardStep = wizardConfig.steps[currentId];
  const initialValue = step.type === "select" ? formData[step.id] : undefined;
  const initialMulti = step.type === "checkbox" ? parseMulti(formData[step.id]) : undefined;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">Aadhaar Document Requirement Checker</h2>
        <p className="text-muted-foreground text-lg leading-snug text-balance">
          Find out exactly which documents you need for Aadhaar enrolment or update, tailored to your age and situation.
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <StepIndicator currentIndex={currentIndex} total={totalSteps} />
        </CardHeader>
        <CardContent>
          <StepForm
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={currentIndex > 0}
            initialValue={initialValue}
            initialMulti={initialMulti}
            stepNumber={currentIndex + 1}
            stepTotal={totalSteps}
          />
        </CardContent>
      </Card>
    </div>
  );
}
