import { parseMulti, UPDATE_DOCS } from "@/config/wizard-config";
import type { WizardConfig, WizardStep } from "@/config/wizard-types";

export const ONLINE_STEPS_IN_ORDER = [
  "service",
  "ageGroup",
  "category",
  "updateDocuments",
] as const;

export type OnlineStepId = (typeof ONLINE_STEPS_IN_ORDER)[number];

export const onlineWizardConfig: WizardConfig = {
  firstStep: "service",
  steps: {
    service: {
      id: "service",
      title: "Select Online Service",
      placeholder: "Choose service…",
      type: "select",
      locked: true,
      defaultSelection: "address",
      note: {
        title: "Address update only",
        description:
          "This Online Service currently supports Address Update only. Other updates will be added soon.",
        tone: "info",
      },
      options: [
        {
          value: "address",
          label: "Update Existing Aadhaar",
          description: "Currently available for online document upload",
        },
      ],
      next: () => "ageGroup",
    },
    ageGroup: {
      id: "ageGroup",
      title: "Select Your Age Group",
      placeholder: "Choose age group…",
      type: "select",
      options: [
        { value: "upto5", label: "0–5 years (Minor)" },
        { value: "5to18", label: "5–18 years (Young Resident)" },
        { value: "18plus", label: "18+ years (Adult)" },
      ],
      next: (data) => (data.ageGroup ? "category" : null),
    },
    category: {
      id: "category",
      title: "Select Resident Category",
      placeholder: "Choose category…",
      type: "select",
      options: [
        { value: "indian", label: "Indian Resident (Citizen)" },
        { value: "nri", label: "NRI (With Aadhaar)" },
        { value: "foreign", label: "Foreign National" },
      ],
      next: (data) => (data.category ? "updateDocuments" : null),
    },
    updateDocuments: {
      id: "updateDocuments",
      title: "Confirm the Update You Need",
      placeholder: "Select update type…",
      type: "checkbox",
      defaultSelection: ["address"],
      note: {
        title: "Address update only",
        description:
          "Online submissions currently support Address Update only. Additional update services will follow soon.",
        tone: "info",
      },
      options: [
        {
          value: "address",
          label: "Address",
          disabled: true,
        },
      ],
      next: (data) => {
        if (!data.updateDocuments) return null;
        return "results";
      },
    },
  },
};

export function parseOnlineMulti(val?: string): string[] {
  return parseMulti(val);
}

export function computeOnlinePath(formData: Record<string, string>): string[] {
  const path: string[] = [];
  let stepId: string | null = onlineWizardConfig.firstStep;

  while (stepId && stepId !== "results") {
    path.push(stepId);
    const step: WizardStep = onlineWizardConfig.steps[stepId];
    if (!step) break;
    stepId = step.next ? step.next(formData) : null;
    if (stepId && path.includes(stepId)) break;
  }

  return path;
}

export function getOnlinePrevId(
  formData: Record<string, string>,
  currentId: string,
): string | null {
  const path = computeOnlinePath(formData);
  const index = path.indexOf(currentId);
  return index > 0 ? path[index - 1] : null;
}

export function getOnlineNextId(
  formData: Record<string, string>,
  currentId: string,
): string | "results" | null {
  const step = onlineWizardConfig.steps[currentId];
  return step?.next?.(formData) ?? null;
}

export function resetOnlineFollowingSteps(
  formData: Record<string, string>,
  anchorId: OnlineStepId,
): Record<string, string> {
  const nextIndex = ONLINE_STEPS_IN_ORDER.indexOf(anchorId);
  if (nextIndex === -1) return formData;
  const keysToKeep = new Set(ONLINE_STEPS_IN_ORDER.slice(0, nextIndex + 1));
  const cleanedEntries = Object.entries(formData).filter(([key]) =>
    keysToKeep.has(key as OnlineStepId),
  );
  return Object.fromEntries(cleanedEntries);
}

const ADDRESS_UPDATE_DOCUMENT_IDS = [
  "indian-passport",
  "ration-card",
  "voter-id",
  "electricity-bill",
  "water-bill",
  "telephone-bill",
  "property-tax",
  "property-agreement",
  "bank-statement",
  "gas-bill",
  "uidai-standard",
  "hof-self-declaration",
  "insurance-policy",
  "prisoner-induction",
  "allotment-letter",
  "std-naco",
  "dcpo-certificate",
  "std-edu-institution",
  "std-village-auth",
  "transgender-id",
  "passbook",
  "caste-certificate",
  "disability-id",
  "mgnrega-domicile",
  "marriage-certificate",
  "service-photo-id",
  "pensioner-photo-id",
] as const;

export type OnlineSummaryItem =
  | { id: string; label: string; value: string }
  | { id: string; label: string; values: string[] };

const SUMMARY_LABELS: Record<string, string> = {
  service: "Service",
  ageGroup: "Age Group",
  category: "Category",
  updateDocuments: "Update Requested",
};

export function buildOnlineSummary(
  formData: Record<string, string>,
): OnlineSummaryItem[] {
  const items: OnlineSummaryItem[] = [];
  for (const id of ONLINE_STEPS_IN_ORDER) {
    const raw = formData[id];
    if (!raw) continue;
    const step = onlineWizardConfig.steps[id];
    if (!step) continue;
    const label = SUMMARY_LABELS[id] ?? step.title;
    if (step.type === "checkbox") {
      const entries = parseOnlineMulti(raw);
      if (!entries.length) continue;
      const values = entries.map(
        (entry) => step.options.find((o) => o.value === entry)?.label ?? entry,
      );
      if (!values.length) continue;
      items.push({ id, label, values });
    } else {
      const optionLabel =
        step.options.find((o) => o.value === raw)?.label ?? raw;
      items.push({ id, label, value: optionLabel });
    }
  }
  return items;
}

const serviceNote = onlineWizardConfig.steps.service.note;

export const onlineWizardScopeBanner = serviceNote
  ? {
      title: serviceNote.title,
      description: serviceNote.description,
      tone: serviceNote.tone ?? "info",
    }
  : {
      title: "Address update only",
      description:
        "This Online Service currently supports Address Update only. Other updates will be added soon.",
      tone: "info" as const,
    };

export const onlineWizardNotes = {
  summaryHint:
    "Review your selections before downloading or printing the checklist.",
};

export const addressUpdateNote = UPDATE_DOCS.address.note;

export const onlineGeneralRequirements = [
  "All documents must be original, valid, and clearly legible.",
  "Ensure the same address appears on every proof you upload.",
  "Scans or photos must follow the Document Advisory quality guidelines.",
  "Keep supporting relationship proofs handy if you rely on HoF-based documents.",
];

export function getAddressUpdateDocumentIds(): string[] {
  return [...ADDRESS_UPDATE_DOCUMENT_IDS];
}

export function resetOnlineState(
  formData: Record<string, string>,
): Record<string, string> {
  return resetOnlineFollowingSteps(formData, "service");
}
