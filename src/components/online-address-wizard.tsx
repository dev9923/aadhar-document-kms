"use client";

import { AlertOctagon, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useEffect, useState } from "react";

import { OnlineResultsDisplay } from "@/components/online-results-display";
import { StepForm } from "@/components/step-form";
import { StepIndicator } from "@/components/step-indicator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  computeOnlinePath,
  getOnlineNextId,
  getOnlinePrevId,
  ONLINE_STEPS_IN_ORDER,
  onlineWizardConfig,
  parseOnlineMulti,
  resetOnlineFollowingSteps,
} from "@/config/online-services-config";
import type { WizardStep } from "@/config/wizard-types";
import { cn } from "@/lib/utils";

function getDisplayStepIndex(currentId: string): number {
  const idx = ONLINE_STEPS_IN_ORDER.indexOf(
    currentId as (typeof ONLINE_STEPS_IN_ORDER)[number],
  );
  return idx === -1 ? 0 : idx;
}

function computeStepDefaultValue(step: WizardStep): string | undefined {
  if (step.type === "select") {
    if (typeof step.defaultSelection === "string") return step.defaultSelection;
    if (Array.isArray(step.defaultSelection) && step.defaultSelection.length > 0) {
      return step.defaultSelection[0];
    }
    return step.options.length === 1 ? step.options[0].value : undefined;
  }
  if (step.type === "checkbox") {
    if (typeof step.defaultSelection === "string") {
      return step.defaultSelection;
    }
    if (Array.isArray(step.defaultSelection) && step.defaultSelection.length > 0) {
      return step.defaultSelection.join(",");
    }
    if (step.options.length === 1) {
      return step.options[0].value;
    }
  }
  return undefined;
}

export function OnlineAddressWizard() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentId, setCurrentId] = useState<string>(
    onlineWizardConfig.firstStep,
  );
  const [showResults, setShowResults] = useState(false);

  const currentIndex = getDisplayStepIndex(currentId);
  const totalSteps = ONLINE_STEPS_IN_ORDER.length + 1;

  useEffect(() => {
    const step = onlineWizardConfig.steps[currentId];
    if (!step) return;
    const defaultValue = computeStepDefaultValue(step);
    if (!defaultValue) return;
    setFormData((prev) => {
      if (prev[step.id]) return prev;
      return { ...prev, [step.id]: defaultValue };
    });
  }, [currentId]);

  const handleNext = (data: Record<string, string>) => {
    const key = Object.keys(data)[0] as
      | (typeof ONLINE_STEPS_IN_ORDER)[number]
      | undefined;
    const updated = { ...formData, ...data };
    const cleaned = key ? resetOnlineFollowingSteps(updated, key) : updated;
    setFormData(cleaned);
    const next = getOnlineNextId(cleaned, currentId);
    if (next === "results") {
      setShowResults(true);
      return;
    }
    if (next) {
      setCurrentId(next);
    }
  };

  const handleBack = () => {
    const prev = getOnlinePrevId(formData, currentId);
    if (prev) setCurrentId(prev);
  };

  const handleReset = () => {
    setFormData({});
    setCurrentId(onlineWizardConfig.firstStep);
    setShowResults(false);
  };

  const handleResultsBack = () => {
    const path = computeOnlinePath(formData);
    const last = path[path.length - 1];
    if (last) {
      setCurrentId(last);
      setShowResults(false);
    } else {
      handleReset();
    }
  };

  if (showResults) {
    const indicator = (
      <StepIndicator currentIndex={totalSteps - 1} total={totalSteps} />
    );
    return (
      <OnlineResultsDisplay
        formData={formData}
        onReset={handleReset}
        onBack={handleResultsBack}
        stepIndicator={indicator}
      />
    );
  }

  const step: WizardStep = onlineWizardConfig.steps[currentId];
  const initialValue = step.type === "select" ? formData[step.id] : undefined;
  const initialMulti =
    step.type === "checkbox" ? parseOnlineMulti(formData[step.id]) : undefined;
  const note = step.note;

  const toneMap = {
    info: {
      className: "border-blue-200 bg-blue-50 text-blue-900",
      description: "text-blue-800",
      Icon: Info,
    },
    success: {
      className: "border-emerald-200 bg-emerald-50 text-emerald-900",
      description: "text-emerald-800",
      Icon: CheckCircle2,
    },
    warn: {
      className: "border-amber-200 bg-amber-50 text-amber-900",
      description: "text-amber-800",
      Icon: AlertTriangle,
    },
    danger: {
      className: "border-red-200 bg-red-50 text-red-900",
      description: "text-red-800",
      Icon: AlertOctagon,
    },
  } as const;
  const palette = note ? toneMap[note.tone ?? "info"] : null;

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader className="space-y-4">
          <StepIndicator currentIndex={currentIndex} total={totalSteps} />
          {note && palette && (
            <Alert
              className={cn(
                "shadow-none",
                palette.className,
                "border rounded-lg",
              )}
            >
              <palette.Icon className="h-4 w-4" />
              <AlertTitle className="text-inherit">{note.title}</AlertTitle>
              <AlertDescription className={palette.description}>
                {note.description}
              </AlertDescription>
            </Alert>
          )}
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
