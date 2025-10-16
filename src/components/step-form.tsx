"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { WizardStep } from "@/config/wizard-config";

export function StepForm({
  step,
  onNext,
  onBack,
  canGoBack,
  initialValue,
  initialMulti,
  stepNumber,
  stepTotal: _stepTotal,
}: {
  step: WizardStep;
  onNext: (data: Record<string, string>) => void;
  onBack: () => void;
  canGoBack: boolean;
  initialValue?: string;
  initialMulti?: string[];
  stepNumber: number;
  stepTotal: number;
}) {
  const [value, setValue] = useState<string>("");
  const [multi, setMulti] = useState<string[]>([]);

  useEffect(() => {
    setValue(initialValue ?? "");
    setMulti(initialMulti ?? []);
  }, [step.id, initialValue, initialMulti]);

  const isValid = step.type === "checkbox" ? multi.length > 0 : value !== "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    if (step.type === "checkbox") {
      onNext({ [step.id]: multi.join(",") });
      return;
    }
    onNext({ [step.id]: value });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">
          Step {stepNumber}: {step.title}
        </h3>

        {step.type === "select" && (
          <div className="space-y-2">
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger id={step.id} className="w-full">
                <SelectValue placeholder={step.placeholder ?? "Select an option…"} />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {step.options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step.type === "checkbox" && (
          <div className="space-y-2">
            {step.placeholder && <Label>{step.placeholder}</Label>}

            {/* Scroll when there are many options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-auto pr-1">
              {step.options.map((o) => {
                const checked = multi.includes(o.value);
                return (
                  <label
                    key={o.value}
                    className="flex items-start gap-3 rounded-md border p-3 hover:bg-muted/50 w-full cursor-pointer"
                  >
                    {/* align checkbox and text */}
                    <Checkbox
                      className="mt-0.5"
                      checked={checked}
                      onCheckedChange={(c) => {
                        const next = !!c;
                        setMulti((prev) =>
                          next
                            ? prev.includes(o.value)
                              ? prev
                              : [...prev, o.value]
                            : prev.filter((v) => v !== o.value)
                        );
                      }}
                    />
                    <span className="text-sm leading-snug break-words">{o.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={`flex ${canGoBack ? "justify-between" : "justify-end"}`}>
        {canGoBack && (
          <Button type="button" variant="outline" onClick={onBack} className="group gap-2">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="outline"
          disabled={!isValid}
          className="group gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </form>
  );
}
