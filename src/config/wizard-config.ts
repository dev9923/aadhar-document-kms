// src/config/wizard-config.ts
export type WizardStepType = "select" | "checkbox";

export interface WizardOption {
  value: string;
  label: string;
  description?: string;
}

export interface WizardStep {
  id: string;
  title: string;
  placeholder?: string;
  type: WizardStepType;
  options: WizardOption[];
  /** Decide next step id ("results" finishes the wizard) */
  next?: (formData: Record<string, string>) => string | null;
}

export interface WizardConfig {
  steps: Record<string, WizardStep>;
  firstStep: string;
}

export const STEPS_IN_ORDER = ["purpose", "ageGroup", "category", "enrolmentType", "availableDocuments", "updateDocuments"] as const;

/* -----------------------------
 * Step-by-step configuration
 * ----------------------------- */
export const wizardConfig: WizardConfig = {
  firstStep: "purpose",

  steps: {
    // Step 1
    purpose: {
      id: "purpose",
      title: "Select the purpose of your visit",
      placeholder: "Choose purpose…",
      type: "select",
      options: [
        { value: "new", label: "New Aadhaar Enrolment" },
        { value: "update", label: "Update Existing Aadhaar" },
      ],
      next: (data) => {
        if (!data.purpose) return null;
        return "ageGroup";
      },
    },

    // Step 2
    ageGroup: {
      id: "ageGroup",
      title: "Select Age Group",
      placeholder: "Choose age group…",
      type: "select",
      options: [
        { value: "upto5", label: "Minor (0–5 years)" },
        { value: "5to18", label: "5–18 years" },
        { value: "18plus", label: "18+ years (Adult)" },
      ],
      next: (data) => {
        if (!data.ageGroup) return null;
        return "category";
      },
    },

    // Step 3
    category: {
      id: "category",
      title: "Select Category",
      placeholder: "Choose category…",
      type: "select",
      options: [
        { value: "indian", label: "Indian Resident (Citizen)" },
        { value: "nri", label: "Non-Resident Indian (NRI)" },
        { value: "foreign", label: "Foreign National" },
      ],
      next: (data) => {
        if (!data.ageGroup) return null;
        // If purpose is Update → go to what-to-update picker
        if (data.purpose === "update") return "updateDocuments";
        // New enrolment:
        // for 0–5 → choose enrolment type; for 5–18 / 18+ → choose available documents
        return data.ageGroup === "upto5" ? "enrolmentType" : "availableDocuments";
      },
    },

    // Step 4A (for 0–5 → enrolment type)
    enrolmentType: {
      id: "enrolmentType",
      title: "Select Enrolment/Update Type",
      placeholder: "Choose type…",
      type: "select",
      options: [
        { value: "hof", label: "Head of Family (HoF)–Based Enrolment" },
        { value: "doc", label: "Document-Based Enrolment (CCI/DCPO/Standard Certificate)" },
        { value: "foreign", label: "Foreign National Enrolment (OCI/Nepal/Bhutan/LTV/Other)" },
      ],
      next: () => "results",
    },

    // Step 4B (for 5–18 / 18+ in New)
    availableDocuments: {
      id: "availableDocuments",
      title: "Select Available Document Types",
      placeholder: "Select one or more documents…",
      type: "checkbox",
      // Names reflect List III items & generic PoI/PoA/PoR/PDB buckets
      options: [
        { value: "passport", label: "Valid Indian Passport" },
        { value: "ration", label: "Ration / PDS Photograph Card / e-Ration Card" },
        { value: "voter", label: "Voter Identity Card / e-Voter Identity Card" },
        { value: "dl", label: "Driving Licence" },
        { value: "serviceId", label: "Service Photo Identity Card (Govt/PSU/Regulatory/Statutory)" },
        { value: "pensionId", label: "Pensioner / Freedom Fighter Photo ID / Pension Payment Order" },
        { value: "healthScheme", label: "CGHS / ECHS / ESIC / Medi-Claim Card" },
        { value: "disabilityId", label: "Disability Identity Card / Certificate of Disability" },
        { value: "mgnregaDomicile", label: "MGNREGA/NREGS Job Card or Domicile Certificate" },
        { value: "casteCertificate", label: "ST/SC/OBC Certificate (Central/State)" },
        { value: "marksheet", label: "Mark-sheet / Certificate (Board/University/Higher Ed.)" },
        { value: "transgenderId", label: "Transgender Identity Card / Certificate" },
        { value: "uidaiCert_MPMLA", label: "UIDAI Std. Certificate – MP/MLA/MLC/Municipal Councillor" },
        { value: "uidaiCert_GazA_EPFO", label: "UIDAI Std. Certificate – Gazetted Officer Group A / EPFO Officer" },
        { value: "uidaiCert_Tehsildar_GazB", label: "UIDAI Std. Certificate – Tehsildar / Gazetted Officer Group B" },
        { value: "uidaiCert_NACO_Health", label: "UIDAI Std. Certificate – NACO/State Health/State AIDS Project" },
        { value: "uidaiCert_EdInstitution", label: "UIDAI Std. Certificate – Recognised Educational Institution" },
        { value: "uidaiCert_VillageAuth", label: "UIDAI Std. Certificate – Village Panchayat/Revenue Officer (Rural)" },
        { value: "electricityBill", label: "Electricity Bill (≤3 months)" },
        { value: "waterBill", label: "Water Bill (≤3 months)" },
        { value: "telecomBill", label: "Telephone/Post-paid Mobile/Broadband Bill (≤3 months)" },
        { value: "propertyDocs", label: "Registered Sale/Gift Deed or Rent/Lease/Leave & Licence Agreement" },
        { value: "gasBill", label: "Gas Bill (≤3 months)" },
        { value: "allotmentLetter", label: "Allotment Letter of Accommodation (Govt/PSU etc., ≤1 year)" },
        { value: "insurancePolicy", label: "Life/Medical Insurance Policy (valid ≤1 year from issue)" },
        { value: "birthCert", label: "Birth Certificate" },
        { value: "prisonerInduction", label: "Prisoner Induction Document (PID)" },
        { value: "legalGuardianship", label: "Legal Guardianship Document (GWA/NT Act/RPwD Act)" },
        // Foreign/OCI/Nepal/Bhutan/LTV
        { value: "ociPassport", label: "OCI: Valid Foreign Passport + OCI Card" },
        { value: "nepalBhutanPassport", label: "Nepal/Bhutan: Passport" },
        { value: "nepalBhutanAltPair", label: "Nepal/Bhutan: Any two – Citizenship / Voter ID / Limited Photo ID Cert." },
        { value: "ltv", label: "Long Term Visa (LTV) – Minority Communities" },
        { value: "foreignPassportVisa", label: "Other Foreign Nationals: Valid Foreign Passport + Visa" },
        { value: "frroPermit", label: "FRRO/FRO Registration Certificate or Residential Permit" },

        // Generic buckets (kept last for flexibility)
        { value: "poi", label: "Generic PoI" },
        { value: "poa", label: "Generic PoA" },
        { value: "por", label: "Generic PoR" },
        { value: "pdb", label: "Generic Proof of Date of Birth (PDB)" },
      ],
      next: () => "results",
    },

    // Step 4C (for update purpose)
    updateDocuments: {
      id: "updateDocuments",
      title: "What do you want to update?",
      placeholder: "Choose one or more updates…",
      type: "checkbox",
      options: [
        { value: "name", label: "Name" },
        { value: "address", label: "Address" },
        { value: "dateOfBirth", label: "Date of Birth" },
        { value: "gender", label: "Gender" },
      ],
      next: (data) => {
        if (!data.updateDocuments) return null;
        return "results";
      },
    },
  },
};

/* -----------------------------------
 * Helpers: parsing & dynamic pathing
 * ----------------------------------- */
export function parseMulti(val?: string): string[] {
  if (!val) return [];
  return val
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function computePath(formData: Record<string, string>): string[] {
  const path: string[] = [];
  let stepId: string | null = wizardConfig.firstStep;

  while (stepId && stepId !== "results") {
    path.push(stepId);
    const step: WizardStep = wizardConfig.steps[stepId];
    if (!step) break;
    stepId = step.next ? step.next(formData) : null;
    if (stepId && path.includes(stepId)) break;
  }
  return path;
}

export function getPrevId(formData: Record<string, string>, currentId: string): string | null {
  const path = computePath(formData);
  const index = path.indexOf(currentId);
  return index > 0 ? path[index - 1] : null;
}

export function getNextId(formData: Record<string, string>, currentId: string): string | "results" | null {
  const step = wizardConfig.steps[currentId];
  return step?.next?.(formData) ?? null;
}

export function resetFollowingSteps(formData: Record<string, string>, anchorId: (typeof STEPS_IN_ORDER)[number]): Record<string, string> {
  const nextIndex = STEPS_IN_ORDER.indexOf(anchorId);
  if (nextIndex === -1) return formData;
  const keysToKeep = new Set(STEPS_IN_ORDER.slice(0, nextIndex + 1));
  const cleanedEntries = Object.entries(formData).filter(([key]) => keysToKeep.has(key as (typeof STEPS_IN_ORDER)[number]));
  return Object.fromEntries(cleanedEntries);
}

/* -----------------------------
 * NEW: Canonical document lists
 * -----------------------------
 * These arrays mirror the names and groupings from the UIDAI Schedule II (Lists I–IV).
 * They are consumed by ResultsDisplay to render exact content.
 */

// List I (0–5) enrolment specifics
export const LIST_I = {
  hof_based: ["Birth certificate issued under the Registration of Births and Deaths Act, 1969", "Valid Indian Passport (only applicable for NRIs)", "Legal guardianship document (GWA 1890 / National Trust 1999 / RPwD 2016)"],
  document_based: ["UIDAI Standard Certificate by DCPO with CCI placement order (Form 18 of JJ Model Rules, 2016, amended 2022)"],
  foreign: [
    "OCI cardholders: Valid foreign passport + OCI card",
    "Nepal/Bhutan: Passport OR Citizenship Certificate + Limited validity Photo Identity Certificate",
    "LTV holders: Valid Long Term Visa (minority communities of AFG/BGD/PAK)",
    "Other foreign nationals: Valid foreign passport + valid visa",
  ],
} as const;

// List II (5–18) – We render via matrix using LIST_III style PoI/PoA/PDB for simplicity.

// List III (18+) – we build the matrix below.
export type MatrixEntry = {
  label: string;
  poi?: boolean;
  poa?: boolean;
  por?: boolean;
  pdb?: boolean;
  note?: string;
};

// Strict labels exactly as per List III rows.
export const LIST_III_MATRIX: Record<string, MatrixEntry> = {
  passport: { label: "Valid Indian Passport", poi: true, poa: true, pdb: true },
  ration: { label: "Ration / PDS Photograph Card / e-Ration Card", poi: true },
  voter: {
    label: "Voter Identity Card / e-Voter Identity Card (details online on ECI/CEO website)",
    poi: true,
    poa: true,
  },
  dl: { label: "Driving Licence", poi: true, poa: true },
  serviceId: {
    label: "Service Photo Identity Card issued by Central/State Government/PSU/regulatory/statutory body",
    poi: true,
  },
  pensionId: {
    label: "Pensioner / Freedom Fighter Photo Identity Card / Pension Payment Order (Central/State/PSU/regulatory/statutory)",
    poi: true,
  },
  healthScheme: {
    label: "CGHS / ECHS / ESIC / Medi-Claim Card (Central/State/PSU)",
    poi: true,
    poa: true,
  },
  disabilityId: {
    label: "Disability Identity Card / Certificate of Disability (RPwD Rules, 2017)",
    poi: true,
    pdb: true,
  },
  mgnregaDomicile: {
    label: "MGNREGA/NREGS Job Card and Domicile Certificate (State Govt.)",
    poi: true,
  },
  casteCertificate: {
    label: "ST/SC/OBC Certificate (Central/State Government)",
    poi: true,
  },
  marksheet: {
    label: "Mark-sheet/Certificate (recognised Board/University/Higher educational institution)",
    pdb: true,
  },
  transgenderId: {
    label: "Third gender / Transgender Identity Card / Certificate (TPPR Act, 2019)",
    poi: true,
  },
  uidaiCert_MPMLA: {
    label: "UIDAI Standard Certificate – MP/MLA/MLC/Municipal Councillor",
    poi: true,
    poa: true,
  },
  uidaiCert_GazA_EPFO: {
    label: "UIDAI Standard Certificate – Gazetted Officer Group ‘A’ / EPFO Officer",
    poi: true,
    poa: true,
  },
  uidaiCert_Tehsildar_GazB: {
    label: "UIDAI Standard Certificate – Tehsildar / Gazetted Officer Group ‘B’",
    poi: true,
    poa: true,
  },
  uidaiCert_NACO_Health: {
    label: "UIDAI Standard Certificate – NACO / State Health Dept / State AIDS Control Society Project Director/nominee",
    poi: true,
  },
  uidaiCert_EdInstitution: {
    label: "UIDAI Standard Certificate – Recognised educational institution (signed by Head; only for institute students concerned)",
    poi: true,
    poa: true,
  },
  uidaiCert_VillageAuth: {
    label: "UIDAI Standard Certificate – Village Panchayat Head/President/Mukhiya/Gaon Bura/equivalent; Panchayat Secretary/Revenue Officer (rural)",
    poi: true,
    poa: true,
  },
  electricityBill: { label: "Electricity bill (pre/post-paid, ≤3 months)", poa: true },
  waterBill: { label: "Water bill (≤3 months)", poa: true },
  telecomBill: {
    label: "Telephone landline / post-paid mobile / broadband bill (≤3 months)",
    poa: true,
  },
  propertyDocs: {
    label: "Valid sale agreement / gift deed (registered) OR rent/lease/leave & licence agreement (registered or unregistered)",
    poa: true,
  },
  gasBill: { label: "Gas bill (≤3 months)", poa: true },
  allotmentLetter: {
    label: "Allotment letter of accommodation (Central/State Govt/PSU/regulatory/statutory; ≤1 year)",
    poa: true,
  },
  insurancePolicy: {
    label: "Life or medical insurance policy (valid up to 1 year from date of issue)",
    poa: true,
  },
  birthCert: {
    label: "Birth certificate (Registration of Births & Deaths Act, 1969)",
    pdb: true,
  },
  prisonerInduction: {
    label: "Prisoner Induction Document (PID) with signature and seal",
    poi: true,
  },
  legalGuardianship: {
    label: "Legal guardianship document (GWA 1890 / National Trust 1999 / RPwD 2016)",
    poi: true,
    poa: true,
    por: true,
  },
  // Foreign/OCI/Nepal/Bhutan/LTV
  ociPassport: {
    label: "OCI cardholders – Valid foreign passport (+ OCI card)",
    poi: true,
    poa: true,
  },
  nepalBhutanPassport: {
    label: "Nepal/Bhutan – Passport",
    poi: true,
    poa: true,
  },
  nepalBhutanAltPair: {
    label: "Nepal/Bhutan – Any two: Citizenship Certificate / Voter ID / Limited Photo ID Certificate (same address)",
    poa: true,
  },
  ltv: { label: "Long Term Visa (LTV) – Minority Communities", poi: true },
  foreignPassportVisa: {
    label: "Other foreign nationals – Valid foreign passport (+ valid visa)",
    poi: true,
    poa: true,
  },
  frroPermit: {
    label: "FRRO/FRO Registration Certificate or Residential Permit (except OCI/LTV/Nepal/Bhutan)",
    poi: true,
    poa: true,
  },
  // Generic buckets
  poi: { label: "Generic PoI", poi: true },
  poa: { label: "Generic PoA", poa: true },
  por: { label: "Generic PoR", por: true },
  pdb: { label: "Generic Proof of Date of Birth (PDB)", pdb: true },
};

// List IV (Update) – grouped by update intent
type UpdateNote = {
  title: string;
  bullets: string[];
  tone?: "info" | "warn" | "danger";
};

type UpdateGroup = {
  title: string;
  description: string;
  bullets: string[];
  note?: UpdateNote;
};

export const UPDATE_DOCS: Record<"name" | "address" | "dateOfBirth" | "gender", UpdateGroup> = {
  name: {
    title: "Name Update",
    description: "Acceptable documents for name updates:",
    bullets: [
      "Valid Indian Passport (with name and photograph)",
      "PAN Card / e-PAN Card (with name and photograph)",
      "Ration / PDS Photograph Card / e-Ration Card",
      "Voter Identity Card / e-Voter Identity Card",
      "Driving Licence",
      "Service Photo Identity Card (Govt/PSU)",
      "Marriage Certificate (with or without photograph)",
      "Gazette Notification of name change (with supporting PoI document)",
    ],
    note: {
      title: "Important Notes",
      tone: "info",
      bullets: [
        "Name in Aadhaar will exactly match the supporting document.",
        "No additional information such as parent/guardian names will be considered.",
        "For marriage-related name changes, Marriage Certificate is required.",
      ],
    },
  },
  address: {
    title: "Address Update",
    description: "Acceptable documents for address updates:",
    bullets: [
      "Valid Indian Passport",
      "Ration / PDS Photograph Card / e-Ration Card",
      "Voter Identity Card / e-Voter Identity Card",
      "Electricity bill (not older than 3 months)",
      "Water bill (not older than 3 months)",
      "Telephone / Mobile / Broadband bill (not older than 3 months)",
      "Property Tax Receipt (not older than 1 year)",
      "Sale agreement / Rent agreement / Lease agreement",
      "Bank Account Statement (not older than 3 months)",
      "Gas connection bill (not older than 3 months)",
      "UIDAI Standard Certificate (by authorised persons)",
      "Self-declaration from HoF (for immediate family members)",
    ],
    note: {
      title: "Important Notes",
      tone: "info",
      bullets: [
        "Document must contain both name and address.",
        "All utility bills should not be older than 3 months.",
        "HoF self-declaration can be used for immediate family members.",
      ],
    },
  },
  dateOfBirth: {
    title: "Date of Birth Update",
    description: "Acceptable documents for Date of Birth updates:",
    bullets: [
      "Birth Certificate (mandatory for 0–18 years and those born on/after 1.10.2023)",
      "Valid Indian Passport",
      "Service Photo Identity Card (Govt/PSU)",
      "Pensioner / Freedom Fighter Photo Identity Card",
      "Mark-sheet / Certificate (Board / University)",
      "Self-declaration with Birth Certificate (for exception cases)",
    ],
    note: {
      title: "Mandatory Requirements",
      tone: "warn",
      bullets: [
        "Birth Certificate is mandatory for all individuals between 0–18 years.",
        "For Resident Indians and NRIs born on/after 1.10.2023, Birth Certificate is mandatory.",
      ],
    },
  },
  gender: {
    title: "Gender Update",
    description: "Acceptable documents for gender updates:",
    bullets: [
      "Valid Indian Passport (with gender information)",
      "Third gender / Transgender Identity Card / Certificate",
      "Medical Certificate from surgeon (for surgical gender change)",
      "Any valid PoI document with gender information",
    ],
    note: {
      title: "Important Notes",
      tone: "info",
      bullets: [
        "For surgical gender change, Medical Certificate from surgeon is required.",
        "Transgender Identity Card / Certificate is accepted as valid proof.",
      ],
    },
  },
};

/* -----------------------------
 * Results generation blocks
 * ----------------------------- */
export type ResultBlock =
  | { kind: "matrix"; rows: Array<{ label: string; poi: boolean; poa: boolean; por: boolean; pdb: boolean; note?: string }> }
  | { kind: "section"; title: string; bullets: string[]; tone?: "info" | "warn" | "danger" }
  | { kind: "table"; table: "foreign" | "shelter" | "hofUpto5" }
  | { kind: "heading"; title: string; subtitle?: string }
  | {
      kind: "updateAccordion";
      groups: Array<{
        title: string;
        description: string;
        bullets: string[];
        note?: UpdateNote;
      }>;
    };

export function computeResults(formData: Record<string, string>): ResultBlock[] {
  const purpose = formData.purpose;
  const age = formData.ageGroup;
  const enrolType = formData.enrolmentType;
  const selected = parseMulti(formData.availableDocuments);

  const out: ResultBlock[] = [];

  out.push({
    kind: "heading",
    title: "Step 5: Document Checklist",
    subtitle: purpose === "update" ? "Documents Required for Updates" : age === "upto5" ? "Child Enrolment (0–5 Years)" : "Documents Required for Enrolment",
  });

  // UPDATE FLOW (List IV) — accordion with 4 groups
  if (purpose === "update") {
    const updateSelections = parseMulti(formData.updateDocuments);
    const groups = updateSelections
      .map((key) => UPDATE_DOCS[key as keyof typeof UPDATE_DOCS])
      .filter((group): group is UpdateGroup => Boolean(group));

    out.push({ kind: "updateAccordion", groups });

    out.push({
      kind: "section",
      title: "General Update Requirements",
      tone: "info",
      bullets: [
        "All documents must be original and valid.",
        "Documents must be in the individual's name.",
        "HoF-based update can be used when the individual does not have the required documents.",
        "Foreign national updates are handled only at adult enrolment centres.",
        "Exception handling is through UIDAI Regional Offices.",
      ],
    });

    out.push({
      kind: "section",
      title: "As per Latest UIDAI Document List",
      bullets: ["This checklist mirrors the latest official UIDAI lists for enrolment and updates.", "For clarifications or exception cases, contact your nearest Aadhaar center or UIDAI Regional Office."],
    });

    return out;
  }

  // NEW ENROLMENT: 0–5 years – show specific tables (List I)
  if (age === "upto5") {
    if (enrolType === "foreign") out.push({ kind: "table", table: "foreign" });
    if (enrolType === "doc") out.push({ kind: "table", table: "shelter" });
    if (enrolType === "hof") out.push({ kind: "table", table: "hofUpto5" });

    out.push({
      kind: "section",
      title: "General Requirements",
      bullets: [
        "Original documents must be presented for verification.",
        "Name in Aadhaar will match the supporting document.",
        "One parent's/guardian’s biometric authentication is mandatory.",
        "For those born on/after 1.10.2023, Birth Certificate is mandatory.",
        "HoF must have a valid Aadhaar; address in HoF Aadhaar will be used for child.",
      ],
    });

    return out;
  }

  // NEW ENROLMENT: 5–18 or 18+ – Matrix view (List III)
  const keys = (selected.length ? selected : ["passport", "dl", "voter", "poa", "pdb"]).filter((k) => LIST_III_MATRIX[k]);

  const rows = keys.map((k) => {
    const e = LIST_III_MATRIX[k];
    return {
      label: e.label,
      poi: !!e.poi,
      poa: !!e.poa,
      por: !!e.por,
      pdb: !!e.pdb,
      note: e.note,
    };
  });

  out.push({ kind: "matrix", rows });
  out.push({
    kind: "section",
    title: "Important Notes",
    bullets: ["PoI must include name & photograph.", "PoA must include name & address; bills should be ≤ 3 months old.", "All documents must be currently valid and in the individual's name.", "Name & DoB must be uniform across submitted documents."],
  });

  return out;
}
