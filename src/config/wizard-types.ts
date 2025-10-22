export type WizardStepType = "select" | "checkbox";

export interface WizardOption {
  value: string;
  label: string;
  description?: string;
  /** Render the option in a disabled state (cannot be toggled). */
  disabled?: boolean;
}

export interface WizardStep {
  id: string;
  title: string;
  placeholder?: string;
  type: WizardStepType;
  options: WizardOption[];
  locked?: boolean;
  /**
   * Applies to both select (string) and checkbox (string[]) steps.
   * When provided, the referenced option values start selected unless prior form data exists.
   */
  defaultSelection?: string | string[];
  note?: {
    title: string;
    description: string;
    tone?: "info" | "success" | "warn" | "danger";
  };
  /** Decide next step id ("results" finishes the wizard) */
  next?: (formData: Record<string, string>) => string | null;
}

export interface WizardConfig {
  steps: Record<string, WizardStep>;
  firstStep: string;
}
