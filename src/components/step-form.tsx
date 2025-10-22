"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WizardStep } from "@/config/wizard-types";
import { cn } from "@/lib/utils";

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
  const defaultSelectValue = useMemo(() => {
    if (step.type !== "select") return "";
    if (typeof step.defaultSelection === "string") {
      return step.defaultSelection;
    }
    if (Array.isArray(step.defaultSelection) && step.defaultSelection.length) {
      return step.defaultSelection[0];
    }
    return step.options.length === 1 ? step.options[0].value : "";
  }, [step]);

  const defaultMultiValues = useMemo(() => {
    if (step.type !== "checkbox") return [];
    if (typeof step.defaultSelection === "string") {
      return [step.defaultSelection];
    }
    if (Array.isArray(step.defaultSelection) && step.defaultSelection.length) {
      return step.defaultSelection;
    }
    return step.options.length === 1 ? [step.options[0].value] : [];
  }, [step]);

  const [value, setValue] = useState<string>(() =>
    step.type === "select" ? (initialValue ?? defaultSelectValue) : "",
  );
  const [multi, setMulti] = useState<string[]>(() =>
    step.type === "checkbox" ? (initialMulti ?? defaultMultiValues) : [],
  );

  const selectableValues = useMemo(() => {
    if (step.type !== "checkbox") return [];
    return step.options.filter((o) => !o.disabled).map((o) => o.value);
  }, [step]);

  const showSelectAll = step.type === "checkbox" && selectableValues.length > 1;

  const allSelectableSelected =
    showSelectAll && selectableValues.every((value) => multi.includes(value));

  useEffect(() => {
    if (step.type === "select") {
      setValue(initialValue ?? defaultSelectValue);
    } else {
      setMulti(initialMulti ?? defaultMultiValues);
    }
  }, [
    step,
    initialValue,
    initialMulti,
    defaultSelectValue,
    defaultMultiValues,
  ]);

  const isValid = step.type === "checkbox" ? multi.length > 0 : value !== "";

  const handleSelectAllToggle = () => {
    if (!showSelectAll) return;
    setMulti((prev) => {
      const currentAllSelected = selectableValues.every((val) =>
        prev.includes(val),
      );
      if (currentAllSelected) {
        const selectableSet = new Set(selectableValues);
        return prev.filter((val) => !selectableSet.has(val));
      }
      const merged = new Set(prev);
      selectableValues.forEach((val) => {
        merged.add(val);
      });
      return Array.from(merged);
    });
  };

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
            <Select
              value={value}
              onValueChange={(next) => {
                if (step.locked) return;
                setValue(next);
              }}
            >
              <SelectTrigger id={step.id} className={cn("w-full")}>
                <SelectValue
                  placeholder={step.placeholder ?? "Select an option…"}
                />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {step.options.map((o) => (
                  <SelectItem
                    key={o.value}
                    value={o.value}
                    disabled={o.disabled}
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step.type === "checkbox" && (
          <div className="space-y-3">
            {(step.placeholder || showSelectAll) && (
              <div className="flex items-center justify-between gap-3">
                {step.placeholder ? (
                  <Label className="text-sm font-medium sm:text-base">
                    {step.placeholder}
                  </Label>
                ) : (
                  <span />
                )}
                {showSelectAll && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAllToggle}
                    aria-pressed={allSelectableSelected}
                  >
                    {allSelectableSelected ? "Clear all" : "Select all"}
                  </Button>
                )}
              </div>
            )}

            {/* Scroll when there are many options */}
            <ScrollArea
              className={cn(
                "rounded-md border border-border/40 overflow-auto",
                step.options.length > 6
                  ? "max-h-[60vh] sm:max-h-[65vh]"
                  : "max-h-full",
              )}
            >
              <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2">
                {step.options.map((o) => {
                  const checked = multi.includes(o.value);
                  const optionId = `${step.id}-${o.value}`;
                  return (
                    <label
                      key={o.value}
                      htmlFor={optionId}
                      className="flex items-start gap-3 rounded-md border bg-background/90 p-3 transition hover:bg-muted/60"
                    >
                      <Checkbox
                        id={optionId}
                        className="mt-0.5"
                        checked={checked}
                        disabled={o.disabled}
                        onCheckedChange={(c) => {
                          const next = !!c;
                          setMulti((prev) =>
                            next
                              ? prev.includes(o.value)
                                ? prev
                                : [...prev, o.value]
                              : prev.filter((v) => v !== o.value),
                          );
                        }}
                      />
                      <span className="text-sm leading-snug break-words">
                        {o.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      <div className={`flex ${canGoBack ? "justify-between" : "justify-end"}`}>
        {canGoBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="group gap-2"
          >
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
