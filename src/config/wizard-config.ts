// src/config/wizard-config.ts
import type { WizardConfig, WizardStep } from "@/config/wizard-types";

export const STEPS_IN_ORDER = [
  "purpose",
  "ageGroup",
  "category",
  "enrolmentType",
  "availableDocuments",
  "updateDocuments",
] as const;
export type WizardStepOrder = typeof STEPS_IN_ORDER;

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
        return data.ageGroup === "upto5"
          ? "enrolmentType"
          : "availableDocuments";
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
        {
          value: "doc",
          label: "Document-Based Enrolment (CCI/DCPO/Standard Certificate)",
        },
        {
          value: "foreign",
          label: "Foreign National Enrolment (OCI/Nepal/Bhutan/LTV/Other)",
        },
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
        {
          value: "ration",
          label: "Ration / PDS Photograph Card / e-Ration Card",
        },
        {
          value: "voter",
          label:
            "Voter Identity Card / e-Voter Identity Card whose details are displayed online on the website of the Election Commission of India or the Chief Electoral Officer concerned",
        },
        { value: "dl", label: "Driving licence" },
        {
          value: "serviceId",
          label:
            "Service Photo Identity Card issued by Central Government/ State Government/ PSU/ regulatory body / statutory body",
        },
        {
          value: "pensionId",
          label:
            "Pensioner Photo Identity Card / Freedom Fighter Photo Identity Card / Pension Payment Order issued by Central Government/ State Government/ PSU / regulatory body / statutory body",
        },
        {
          value: "healthScheme",
          label:
            "CGHS/ ECHS/ ESIC/ Medi-Claim Card issued by Central Government/ State Government/ PSU",
        },
        {
          value: "disabilityId",
          label:
            "Disability Identity Card / Certificate of Disability issued under Rights of Persons with Disabilities Rules, 2017",
        },
        {
          value: "mgnregaDomicile",
          label:
            "MGNREGA/NREGS Job Card and Domicile Certificate issued by State Government",
        },
        {
          value: "domicileCertificate",
          label: "Domicile Certificate issued by State Government",
        },
        {
          value: "casteCertificate",
          label:
            "Scheduled Tribe (ST)/ Scheduled Caste (SC)/ Other Backward Caste (OBC) Certificate issued by Central Government/ State Government",
        },
        {
          value: "marksheet",
          label:
            "Mark-sheet/Certificate issued by recognised Board of Education or university or deemed university or higher educational institution established by a Central or State Act",
        },
        {
          value: "transgenderId",
          label:
            "Third gender / Transgender Identity Card / Certificate issued under the Transgender Persons (Protection of Rights) Act, 2019 and rules made thereunder",
        },
        {
          value: "uidaiCert_MPMLA",
          label:
            "Certificate issued on UIDAI Standard Certificate format by MP/ MLA/ MLC/ Municipal Councillor",
        },
        {
          value: "uidaiCert_GazA_EPFO",
          label:
            "Certificate issued on UIDAI Standard Certificate format by Gazetted Officer Group 'A'/Employees Provident Fund Organisation (EPFO) Officer",
        },
        {
          value: "uidaiCert_Tehsildar_GazB",
          label:
            "Certificate issued on UIDAI Standard Certificate format by Tehsildar/ Gazetted Officer Group 'B'",
        },
        {
          value: "uidaiCert_NACO_Health",
          label:
            "Certificate issued on UIDAI Standard Certificate format by Gazetted Officer at National AIDS Control Organisation (NACO) / State Health Department / Project Director of the State AIDS Control Society or his nominee",
        },
        {
          value: "uidaiCert_EdInstitution",
          label:
            "Certificate issued on UIDAI Standard Certificate format by recognised educational institution (signed by Head of Institute; only for the institute students concerned)",
        },
        {
          value: "uidaiCert_VillageAuth",
          label:
            "Certificate issued on UIDAI Standard Certificate format by Village Panchayat Head/ President or Mukhiya/ Gaon Bura/ equivalent authority (for rural areas)/ Village Panchayat Secretary/ Village Revenue Officer or equivalent (for rural areas)",
        },
        {
          value: "electricityBill",
          label:
            "Electricity bill (pre-paid/post-paid bill, not older than 3 months)",
        },
        { value: "waterBill", label: "Water bill (not older than 3 months)" },
        {
          value: "telecomBill",
          label:
            "Telephone landline bill/ post-paid mobile bill/ broadband bill (not older than 3 months)",
        },
        {
          value: "propertyDocs",
          label:
            "Valid sale agreement/ gift deed registered with the Registrar Office, or registered or unregistered rent, lease agreement or leave and licence agreement",
        },
        {
          value: "gasBill",
          label: "Gas bill (not older than 3 months)",
        },
        {
          value: "allotmentLetter",
          label:
            "Allotment letter of accommodation issued by Central Government/ State Government/ PSU / regulatory body / statutory body (not older than 1 year)",
        },
        {
          value: "insurancePolicy",
          label:
            "Life or medical insurance policy (valid up to 1 year from the date of issue of the Policy)",
        },
        {
          value: "birthCert",
          label:
            "Birth certificate issued under the Registration of Births and Deaths Act, 1969 and the rules made thereunder",
        },
        {
          value: "prisonerInduction",
          label:
            "Prisoner Induction Document (PID) issued by Prison Officer with signature and seal",
        },
        {
          value: "legalGuardianship",
          label:
            "Document to prove legal guardianship issued by the Central government or a State Government authority or a court of law under the relevant Acts (the Guardians and Wards Act, 1890 / the National Trust Act, 1999 / the Rights of Persons with Disabilities Act, 2016) and the rules made under these Acts",
        },
        // Foreign/OCI/Nepal/Bhutan/LTV
        {
          value: "ociPassport",
          label:
            "For OCI cardholders - Valid foreign passport (along with OCI card)",
        },
        {
          value: "nepalBhutanPassport",
          label: "For nationals of Nepal and Bhutan – Passport of Nepal/Bhutan",
        },
        {
          value: "nepalBhutanCitizenship",
          label:
            "For nationals of Nepal and Bhutan – Valid Nepalese/ Bhutanese Citizenship Certificate (acceptable as proof of date of birth also)",
        },
        {
          value: "nepalBhutanVoterOrLimitedID",
          label:
            "For nationals of Nepal and Bhutan – Valid Voter Identity Card issued by the Election Commission of Nepal/ Bhutan or Limited validity Photo Identity Certificate issued by Nepalese Mission/ Royal Bhutanese Mission in India (not acceptable as proof of date of birth)",
        },
        {
          value: "ltv",
          label:
            "For Long Term Visa holders - Valid Long Term Visa (LTV), issued to minority communities of Afghanistan, Bangladesh and Pakistan (Hindus, Sikhs, Buddhists, Jains, Parsis and Christians)",
        },
        {
          value: "foreignPassportVisa",
          label:
            "For other foreign nationals - Valid foreign passport (along with valid visa)",
        },
        {
          value: "frroPermit",
          label:
            "Valid Registration Certificate or Residential permit issued by FRRO/FRO to the foreign national (except OCI cardholders, LTV document holders and Nepal/Bhutan nationals)",
        },
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

export function getPrevId(
  formData: Record<string, string>,
  currentId: string,
): string | null {
  const path = computePath(formData);
  const index = path.indexOf(currentId);
  return index > 0 ? path[index - 1] : null;
}

export function getNextId(
  formData: Record<string, string>,
  currentId: string,
): string | "results" | null {
  const step = wizardConfig.steps[currentId];
  return step?.next?.(formData) ?? null;
}

export function resetFollowingSteps(
  formData: Record<string, string>,
  anchorId: (typeof STEPS_IN_ORDER)[number],
): Record<string, string> {
  const nextIndex = STEPS_IN_ORDER.indexOf(anchorId);
  if (nextIndex === -1) return formData;
  const keysToKeep = new Set(STEPS_IN_ORDER.slice(0, nextIndex + 1));
  const cleanedEntries = Object.entries(formData).filter(([key]) =>
    keysToKeep.has(key as (typeof STEPS_IN_ORDER)[number]),
  );
  return Object.fromEntries(cleanedEntries);
}

/* -----------------------------
 * NEW: Canonical document lists
 * -----------------------------
 * These arrays mirror the names and groupings from the UIDAI Schedule II (Lists I–IV).
 * They are consumed by ResultsDisplay to render exact content.
 */

// List I (0–5) enrolment specifics
export type ListIHofEntry = {
  document: string;
  por: boolean;
  pdb: boolean;
  note?: string;
  docId?: string;
};

export type ListIDocumentEntry = {
  document: string;
  poi: boolean;
  poa: boolean;
  pdb: boolean;
  note?: string;
  docId?: string;
};

export type ListIForeignEntry = {
  category: string;
  documents: string;
  poi: boolean;
  poa: boolean;
  pdb: boolean;
  note?: string;
};

export type ListIConfig = {
  hofBased: readonly ListIHofEntry[];
  documentBased: readonly ListIDocumentEntry[];
  foreign: readonly ListIForeignEntry[];
};

export const LIST_I: ListIConfig = {
  hofBased: [
    {
      document:
        "Birth certificate issued under the Registration of Births and Deaths Act, 1969 and the rules made thereunder",
      por: true,
      pdb: true,
      note: "Mandatory for births on/after 1.10.2023; must clearly mention the child's name and the HoF/legal guardian.",
      docId: "birth-certificate",
    },
    {
      document: "Valid Indian Passport (only applicable for NRIs)",
      por: true,
      pdb: true,
      note: "Use only when the child holds an Indian passport; ensure HoF/parent details are captured. Applicable for NRI enrolments.",
      docId: "indian-passport",
    },
    {
      document:
        "Document to prove legal guardianship issued by the Central/State Government authority or a court under the Guardians and Wards Act, 1890 / National Trust Act, 1999 / Rights of Persons with Disabilities Act, 2016",
      por: true,
      pdb: false,
      note: "Accepted for establishing Proof of Relationship with the legal guardian. Submit a separate PDB document for the child.",
    },
  ],
  documentBased: [
    {
      document:
        "Certificate issued on UIDAI Standard Certificate format by District Child Protection Officer (DCPO) along with the order of placement of child in a Child Care Institution (CCI) in Form 18 of the Juvenile Justice Model Rules, 2016 (as amended in 2022)",
      poi: true,
      poa: true,
      pdb: false,
      note: "Applicable only for children placed in CCI. Proof of Date of Birth must be supported through another acceptable PDB document.",
    },
  ],
  foreign: [
    {
      category: "OCI cardholders",
      documents: "Valid foreign passport along with OCI card",
      poi: true,
      poa: false,
      pdb: true,
      note: "Validity: 10 years. Provide separate PoA/PDB documents as per List III requirements.",
    },
    {
      category: "Nationals of Nepal and Bhutan",
      documents:
        "Passport of Nepal/Bhutan OR valid Nepalese/Bhutanese Citizenship Certificate along with Limited validity Photo Identity Certificate issued by the respective Mission in India",
      poi: true,
      poa: false,
      pdb: true,
      note: "Validity: 10 years. Proof of Address/Date of Birth must be submitted using acceptable documents from List III.",
    },
    {
      category: "Long Term Visa (LTV) holders",
      documents:
        "Valid Long Term Visa issued to minority communities of Afghanistan, Bangladesh and Pakistan (Hindus, Sikhs, Buddhists, Jains, Parsis and Christians)",
      poi: true,
      poa: false,
      pdb: true,
      note: "Validity: till the validity of the LTV. Furnish PoA/PDB as per List III in addition to the LTV document.",
    },
    {
      category: "Other foreign nationals",
      documents: "Valid foreign passport along with valid visa",
      poi: true,
      poa: false,
      pdb: true,
      note: "Validity: till the validity of the visa. Supporting PoA/PDB documents must be chosen from List III.",
    },
  ],
};

export type MatrixEntry = {
  label: string;
  poi?: boolean;
  poa?: boolean;
  por?: boolean;
  pdb?: boolean;
  note?: string;
  docId?: string;
};

export const LIST_II_MATRIX: Record<string, MatrixEntry> = {
  birthCert: {
    label:
      "Birth certificate issued under the Registration of Births and Deaths Act, 1969 and the rules made thereunder",
    por: true,
    pdb: true,
    docId: "birth-certificate",
  },
  passport: {
    label: "Valid Indian Passport",
    poi: true,
    poa: true,
    por: true,
    pdb: true,
    docId: "indian-passport",
  },
  domicileCertificate: {
    label: "Domicile Certificate issued by State Government",
    poi: true,
    poa: true,
    por: true,
  },
  casteCertificate: {
    label:
      "Scheduled Tribe (ST) / Scheduled Caste (SC) / Other Backward Caste (OBC) Certificate issued by Central Government / State Government",
    poi: true,
    poa: true,
    por: true,
    docId: "caste-certificate",
  },
  disabilityId: {
    label:
      "Disability Identity Card / Certificate of Disability issued under Rights of Persons with Disabilities Rules, 2017",
    poi: true,
    poa: true,
  },
  legalGuardianship: {
    label:
      "Document to prove legal guardianship issued by the Central government or a State Government authority or a court of law under the relevant Acts (the Guardians and Wards Act, 1890 / the National Trust Act, 1999 / the Rights of Persons with Disabilities Act, 2016) and the rules made under these Acts",
    por: true,
  },
  dcpoCertificate: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by District Child Protection Officer (DCPO) along with order of placement of child in Child Care Institution (CCI) in Form 18 of the Juvenile Justice Model Rules, 2016 (as amended in 2022)",
    poi: true,
    poa: true,
  },
  marriageCertificate: {
    label:
      "Marriage Certificate with or without photograph issued by Central Government/ State Government (supporting PoI document of old name and photograph is required if the Marriage Certificate is without photograph)",
    poi: true,
    poa: true,
    por: true,
    docId: "marriage-certificate",
  },
  transgenderId: {
    label:
      "Third gender / Transgender Identity Card / Certificate issued under the Transgender Persons (Protection of Rights) Act, 2019 and rules made thereunder",
    poi: true,
    poa: true,
    por: true,
    pdb: true,
  },
  ociPassport: {
    label:
      "For Overseas Citizen of India (OCI) cardholders - Valid foreign passport (along with OCI card)",
    poi: true,
    pdb: true,
    note: "Validity: 10 years. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  nepalBhutanPassport: {
    label: "For nationals of Nepal and Bhutan – Passport of Nepal/Bhutan",
    poi: true,
    pdb: true,
    note: "Validity: 10 years. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  nepalBhutanCitizenship: {
    label:
      "For nationals of Nepal and Bhutan – Valid Nepalese/ Bhutanese Citizenship Certificate (along with Limited validity Photo Identity Certificate issued by Nepalese Mission/ Royal Bhutanese Mission in India)",
    poi: true,
    pdb: true,
    note: "Validity: 10 years. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  ltv: {
    label:
      "For Long Term Visa holders - Valid Long Term Visa (LTV) document, issued to minority communities of Afghanistan, Bangladesh and Pakistan (Hindus, Sikhs, Buddhists, Jains, Parsis and Christians)",
    poi: true,
    pdb: true,
    note: "Validity: till the validity of the Long Term Visa. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  foreignPassportVisa: {
    label:
      "For other foreign nationals - Valid foreign passport (along with valid visa)",
    poi: true,
    pdb: true,
    note: "Validity: till the validity of the visa. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
};

// List III (18+) – we build the matrix below.
// Strict labels exactly as per List III rows.
export const LIST_III_MATRIX: Record<string, MatrixEntry> = {
  passport: {
    label: "Valid Indian Passport",
    poi: true,
    poa: true,
    pdb: true,
    docId: "indian-passport",
  },
  ration: {
    label: "Ration / PDS Photograph Card / e-Ration Card",
    poi: true,
    poa: true,
    docId: "ration-card",
  },
  voter: {
    label:
      "Voter Identity Card / e-Voter Identity Card whose details are displayed online on the website of the Election Commission of India or the Chief Electoral Officer concerned",
    poi: true,
    poa: true,
    docId: "voter-id",
  },
  dl: {
    label: "Driving licence",
    poi: true,
    docId: "driving-licence",
  },
  serviceId: {
    label:
      "Service Photo Identity Card issued by Central Government/ State Government/ PSU/ regulatory body / statutory body",
    poi: true,
    poa: true,
    pdb: true,
    docId: "service-photo-id",
  },
  pensionId: {
    label:
      "Pensioner Photo Identity Card / Freedom Fighter Photo Identity Card / Pension Payment Order issued by Central Government/ State Government/ PSU / regulatory body / statutory body",
    poi: true,
    poa: true,
    pdb: true,
    docId: "pensioner-photo-id",
  },
  healthScheme: {
    label:
      "CGHS/ ECHS/ ESIC/ Medi-Claim Card issued by Central Government/ State Government/ PSU",
    poi: true,
  },
  disabilityId: {
    label:
      "Disability Identity Card / Certificate of Disability issued under Rights of Persons with Disabilities Rules, 2017",
    poi: true,
    poa: true,
    docId: "disability-id",
  },
  mgnregaDomicile: {
    label:
      "MGNREGA/NREGS Job Card and Domicile Certificate issued by State Government",
    poi: true,
    poa: true,
    por: true,
    docId: "mgnrega-domicile",
  },
  casteCertificate: {
    label:
      "Scheduled Tribe (ST)/ Scheduled Caste (SC)/ Other Backward Caste (OBC) Certificate issued by Central Government/ State Government",
    poi: true,
    poa: true,
    por: true,
    docId: "caste-certificate",
  },
  marksheet: {
    label:
      "Mark-sheet/Certificate issued by recognised Board of Education or university or deemed university or higher educational institution established by a Central or State Act",
    poi: true,
    pdb: true,
    docId: "marksheet-certificate",
  },
  transgenderId: {
    label:
      "Third gender / Transgender Identity Card / Certificate issued under the Transgender Persons (Protection of Rights) Act, 2019 and rules made thereunder",
    poi: true,
    poa: true,
    por: true,
    pdb: true,
    docId: "transgender-id",
  },
  uidaiCert_MPMLA: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by MP/ MLA/ MLC/ Municipal Councillor",
    poa: true,
    docId: "std-mpmla",
  },
  uidaiCert_GazA_EPFO: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by Gazetted Officer Group 'A'/Employees Provident Fund Organisation (EPFO) Officer",
    poa: true,
    docId: "std-gaz-a-epfo",
  },
  uidaiCert_Tehsildar_GazB: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by Tehsildar/ Gazetted Officer Group 'B'",
    poa: true,
    docId: "std-tehsildar-gaz-b",
  },
  uidaiCert_NACO_Health: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by Gazetted Officer at National AIDS Control Organisation (NACO) / State Health Department / Project Director of the State AIDS Control Society or his nominee (in pursuance of Hon'ble Supreme Court Judgment in Criminal Appeal No(s). 135/2010 dated 19.5.2022)",
    poi: true,
    poa: true,
    docId: "std-naco",
  },
  uidaiCert_EdInstitution: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by recognised educational institution (signed by the Head of Institute, only for the institute students concerned)",
    poa: true,
    docId: "std-edu-institution",
  },
  uidaiCert_VillageAuth: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by Village Panchayat Head/ President or Mukhiya/ Gaon Bura/ equivalent authority (for rural areas)/ Village Panchayat Secretary/ Village Revenue Officer or equivalent (for rural areas)",
    poa: true,
    docId: "std-village-auth",
  },
  electricityBill: {
    label:
      "Electricity bill (pre-paid/post-paid bill, not older than 3 months)",
    poa: true,
    docId: "electricity-bill",
  },
  waterBill: {
    label: "Water bill (not older than 3 months)",
    poa: true,
    docId: "water-bill",
  },
  telecomBill: {
    label:
      "Telephone landline bill/ post-paid mobile bill/ broadband bill (not older than 3 months)",
    poa: true,
    docId: "telephone-bill",
  },
  propertyDocs: {
    label:
      "Valid sale agreement/ gift deed registered with the Registrar Office, or registered or unregistered rent, lease agreement or leave and licence agreement",
    poa: true,
    docId: "property-agreement",
  },
  gasBill: {
    label: "Gas bill (not older than 3 months)",
    poa: true,
    docId: "gas-bill",
  },
  allotmentLetter: {
    label:
      "Allotment letter of accommodation issued by Central Government/ State Government/ PSU / regulatory body / statutory body (not older than 1 year)",
    poa: true,
    docId: "allotment-letter",
  },
  insurancePolicy: {
    label:
      "Life or medical insurance policy (valid up to 1 year from the date of issue of the Policy)",
    poa: true,
    docId: "insurance-policy",
  },
  birthCert: {
    label:
      "Birth certificate issued under the Registration of Births and Deaths Act, 1969 and the rules made thereunder",
    pdb: true,
    docId: "birth-certificate",
  },
  prisonerInduction: {
    label:
      "Prisoner Induction Document (PID) issued by Prison Officer with signature and seal",
    poi: true,
    poa: true,
    docId: "prisoner-induction",
  },
  dcpoCertificate: {
    label:
      "Certificate issued on UIDAI Standard Certificate format by District Child Protection Officer (DCPO) along with order of placement of child in Child Care Institution (CCI) in Form 18 of the Juvenile Justice Model Rules, 2016 (as amended in 2022)",
    poi: true,
    poa: true,
    docId: "dcpo-certificate",
  },
  passbook: {
    label:
      "Passbook issued by a scheduled commercial bank or a State cooperative bank having Name and Photograph (cross stamped with Bank seal) and signed by bank official/ Post Office Savings Account Passbook (with stamp and signature of issuing official of post office)",
    poa: true,
    docId: "passbook",
  },
  marriageCertificate: {
    label:
      "Marriage Certificate with or without photograph issued by Central Government/ State Government (supporting PoI document of old name and photograph is required if the Marriage Certificate is without photograph)",
    poi: true,
    poa: true,
    por: true,
    docId: "marriage-certificate",
  },
  legalGuardianship: {
    label:
      "Document to prove legal guardianship issued by the Central government or a State Government authority or a court of law under the relevant Acts (the Guardians and Wards Act, 1890 / the National Trust Act, 1999 / the Rights of Persons with Disabilities Act, 2016) and the rules made under these Acts",
    por: true,
  },
  // Foreign/OCI/Nepal/Bhutan/LTV
  ociPassport: {
    label:
      "For Overseas Citizen of India (OCI) cardholders - Valid foreign passport (along with OCI card)",
    poi: true,
    pdb: true,
    note: "Validity: 10 years. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  nepalBhutanPassport: {
    label: "For nationals of Nepal and Bhutan – Passport of Nepal/Bhutan",
    poi: true,
    pdb: true,
    note: "Validity: 10 years. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  nepalBhutanCitizenship: {
    label:
      "For nationals of Nepal and Bhutan – Valid Nepalese/ Bhutanese Citizenship Certificate (acceptable as proof of date of birth also)",
    poi: true,
    pdb: true,
    note: "Submit along with another Nepal/Bhutan-issued document carrying the same address, as specified by UIDAI.",
  },
  nepalBhutanVoterOrLimitedID: {
    label:
      "For nationals of Nepal and Bhutan – Valid Voter Identity Card issued by the Election Commission of Nepal/ Bhutan or Limited validity Photo Identity Certificate issued by Nepalese Mission/ Royal Bhutanese Mission in India (not acceptable as proof of date of birth)",
    poi: true,
    pdb: true,
    note: "Provide any two documents with matching address details; Proof of Date of Birth must be furnished separately.",
  },
  ltv: {
    label:
      "For Long Term Visa holders - Valid Long Term Visa (LTV) document, issued to minority communities of Afghanistan, Bangladesh and Pakistan (Hindus, Sikhs, Buddhists, Jains, Parsis and Christians)",
    poi: true,
    poa: true,
    pdb: true,
    note: "Validity: till the validity of the Long Term Visa.",
  },
  foreignPassportVisa: {
    label:
      "For other foreign nationals - Valid foreign passport (along with valid visa)",
    poi: true,
    pdb: true,
    note: "Validity: till the validity of the visa. Provide Proof of Address and Proof of Date of Birth documents from List III.",
  },
  frroPermit: {
    label:
      "Valid Registration Certificate or Residential permit issued by FRRO/FRO to the foreign national (except OCI cardholders, LTV document holders and Nepal/Bhutan nationals)",
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
  documents: Array<{
    label: string;
    docId?: string;
  }>;
  note?: UpdateNote;
};

export const UPDATE_DOCS: Record<
  "name" | "address" | "dateOfBirth" | "gender",
  UpdateGroup
> = {
  name: {
    title: "Name Update",
    description: "Acceptable documents for name updates:",
    documents: [
      {
        label: "Valid Indian Passport (with name and photograph)",
        docId: "indian-passport",
      },
      {
        label: "PAN Card / e-PAN Card (with name and photograph)",
        docId: "pan-card",
      },
      {
        label: "Ration / PDS Photograph Card / e-Ration Card",
        docId: "ration-card",
      },
      {
        label: "Voter Identity Card / e-Voter Identity Card",
        docId: "voter-id",
      },
      { label: "Driving Licence", docId: "driving-licence" },
      {
        label: "Service Photo Identity Card (Govt/PSU)",
        docId: "service-photo-id",
      },
      {
        label: "Marriage Certificate (with or without photograph)",
        docId: "marriage-certificate",
      },
      {
        label:
          "Gazette Notification of name change (with supporting PoI document)",
        docId: "gazette-notification",
      },
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
    documents: [
      { label: "Valid Indian Passport", docId: "indian-passport" },
      {
        label: "Ration / PDS Photograph Card / e-Ration Card",
        docId: "ration-card",
      },
      {
        label: "Voter Identity Card / e-Voter Identity Card",
        docId: "voter-id",
      },
      {
        label: "Electricity bill (not older than 3 months)",
        docId: "electricity-bill",
      },
      {
        label: "Water bill (not older than 3 months)",
        docId: "water-bill",
      },
      {
        label: "Telephone / Mobile / Broadband bill (not older than 3 months)",
        docId: "telephone-bill",
      },
      {
        label: "Property Tax Receipt (not older than 1 year)",
        docId: "property-tax",
      },
      {
        label: "Sale agreement / Rent agreement / Lease agreement",
        docId: "property-agreement",
      },
      {
        label: "Bank Account Statement (not older than 3 months)",
        docId: "bank-statement",
      },
      {
        label: "Gas connection bill (not older than 3 months)",
        docId: "gas-bill",
      },
      {
        label: "UIDAI Standard Certificate (by authorised persons)",
        docId: "uidai-standard",
      },
      {
        label: "Self-declaration from HoF (for immediate family members)",
        docId: "hof-self-declaration",
      },
      {
        label: "Life or medical insurance Policy (valid up to 1 year from the date of issue)",
        docId: "insurance-policy",
      },
      {
        label: "Prisoner Induction Document (PID) issued by Prison Officer",
        docId: "prisoner-induction",
      },
      {
        label: "Allotment letter of accommodation (Central/State Govt/PSU, not older than 1 year)",
        docId: "allotment-letter",
      },
      {
        label: "Certificate by Gazetted Officer at NACO/State Health Dept/Project Director",
        docId: "std-naco",
      },
      {
        label: "Certificate by DCPO with CCI placement order",
        docId: "dcpo-certificate",
      },
      {
        label: "Certificate by recognised educational institution",
        docId: "std-edu-institution",
      },
      {
        label: "Certificate by Village Panchayat Head/President or equivalent",
        docId: "std-village-auth",
      },
      {
        label: "Third gender / Transgender Identity Card / Certificate",
        docId: "transgender-id",
      },
      {
        label: "Bank Passbook / Post Office Savings Passbook (with name and photograph)",
        docId: "passbook",
      },
      {
        label: "SC/ST/OBC Certificate (Central/State Government)",
        docId: "caste-certificate",
      },
      {
        label: "Disability Identity Card / Certificate",
        docId: "disability-id",
      },
      {
        label: "MGNREGA/NREGS Job Card and Domicile Certificate",
        docId: "mgnrega-domicile",
      },
      {
        label: "Marriage Certificate (with or without photograph)",
        docId: "marriage-certificate",
      },
      {
        label: "Service Photo Identity Card (Central/State Govt/PSU)",
        docId: "service-photo-id",
      },
      {
        label: "Pensioner / Freedom Fighter Photo Identity Card",
        docId: "pensioner-photo-id",
      },
      {
        label: "For LTV holders - Valid Long Term Visa",
      },
      {
        label: "For foreign nationals - Valid Registration Certificate or Residential permit (FRRO/FRO)",
      },
    ],
    note: {
      title: "Important Notes",
      tone: "info",
      bullets: [
        "Document must contain both name and address.",
        "All utility bills should not be older than 3 months.",
        "HoF self-declaration can be used for immediate family members.",
        "For OCI/LTV/foreign nationals, additional documents may be required.",
      ],
    },
  },
  dateOfBirth: {
    title: "Date of Birth Update",
    description: "Acceptable documents for Date of Birth updates:",
    documents: [
      {
        label:
          "Birth Certificate (mandatory for 0–18 years and those born on/after 1.10.2023)",
        docId: "birth-certificate",
      },
      { label: "Valid Indian Passport", docId: "indian-passport" },
      {
        label: "Service Photo Identity Card (Govt/PSU)",
        docId: "service-photo-id",
      },
      {
        label: "Pensioner / Freedom Fighter Photo Identity Card",
        docId: "pensioner-photo-id",
      },
      {
        label: "Mark-sheet / Certificate (Board / University)",
        docId: "marksheet-certificate",
      },
      {
        label: "Self-declaration with Birth Certificate (for exception cases)",
        docId: "self-declaration-birth",
      },
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
    documents: [
      {
        label: "Valid Indian Passport (with gender information)",
        docId: "indian-passport",
      },
      {
        label: "Third gender / Transgender Identity Card / Certificate",
        docId: "transgender-id",
      },
      {
        label: "Medical Certificate from surgeon (for surgical gender change)",
        docId: "medical-gender-certificate",
      },
      {
        label: "Any valid PoI document with gender information",
      },
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
  | {
      kind: "matrix";
      rows: Array<{
        label: string;
        poi: boolean;
        poa: boolean;
        por: boolean;
        pdb: boolean;
        note?: string;
      }>;
    }
  | {
      kind: "section";
      title: string;
      bullets: string[];
      tone?: "info" | "warn" | "danger";
    }
  | { kind: "table"; table: "foreign" | "shelter" | "hofUpto5" }
  | { kind: "heading"; title: string; subtitle?: string }
  | {
      kind: "updateAccordion";
      groups: Array<{
        title: string;
        description: string;
        documents: Array<{ label: string; docId?: string }>;
        note?: UpdateNote;
      }>;
    };

const AVAILABLE_DOC_OPTIONS = wizardConfig.steps.availableDocuments.options;

function getOptionLabel(value: string): string {
  return (
    AVAILABLE_DOC_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

export function computeResults(
  formData: Record<string, string>,
): ResultBlock[] {
  const purpose = formData.purpose;
  const age = formData.ageGroup;
  const enrolType = formData.enrolmentType;
  const selected = parseMulti(formData.availableDocuments);

  const out: ResultBlock[] = [];

  out.push({
    kind: "heading",
    title: "Step 5: Document Checklist",
    subtitle:
      purpose === "update"
        ? "Documents Required for Updates"
        : age === "upto5"
          ? "Child Enrolment (0–5 Years)"
          : "Documents Required for Enrolment",
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
      bullets: [
        "This checklist mirrors the latest official UIDAI lists for enrolment and updates.",
        "For clarifications or exception cases, contact your nearest Aadhaar center or UIDAI Regional Office.",
      ],
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
        "One parent's/guardian's biometric authentication is mandatory.",
        "For those born on/after 1.10.2023, Birth Certificate is mandatory.",
        "HoF must have a valid Aadhaar; address in HoF Aadhaar will be used for child.",
        "Legal guardianship documents establish only Proof of Relationship; carry a separate Proof of Date of Birth document.",
        "Foreign/OCI/Nepal/Bhutan/LTV enrolments must bring additional PoA/PDB documents from List III wherever marked not acceptable above.",
      ],
    });

    return out;
  }

  // NEW ENROLMENT: 5–18 years – List II matrix with alphabetical ordering
  if (age === "5to18") {
    const baseKeys = selected.length
      ? selected
      : AVAILABLE_DOC_OPTIONS.map((opt) => opt.value);
    const uniqueKeys = Array.from(new Set(baseKeys.filter(Boolean)));

    const rows = uniqueKeys.map((k) => {
      const e = LIST_II_MATRIX[k];
      if (e) {
        return {
          label: e.label,
          poi: !!e.poi,
          poa: !!e.poa,
          por: !!e.por,
          pdb: !!e.pdb,
          note: e.note,
        };
      }
      return {
        label: getOptionLabel(k),
        poi: false,
        poa: false,
        por: false,
        pdb: false,
        note: "Not listed under UIDAI Schedule II for 5–18 years.",
      };
    });

    const sortedRows = [...rows].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: "base" }),
    );

    out.push({ kind: "matrix", rows: sortedRows });

    out.push({
      kind: "section",
      title: "Important Notes",
      bullets: [
        "Each document must be current, issued to the child, verifiable with the issuing authority, and not withdrawn or suspended.",
        "All PoI, PoA, PoR and Proof of Date of Birth documents must be in the child's name; PoR documents must also mention the Head of Family.",
        "Ensure the child's name and date of birth match exactly across every document submitted.",
        "Children aged 5–18 are encouraged to enrol through the Head of Family. The HoF must have a valid Aadhaar, provide biometric authentication, and their Aadhaar address will populate the child's record. Provide both parents' Aadhaar numbers wherever available.",
        "Items marked with * require an additional Proof of Address document from List III. Validity: OCI and Nepal/Bhutan nationals – 10 years; LTV holders – till Long Term Visa validity; other foreign nationals – till visa validity.",
        "If HoF or Proof of Relationship documents are unavailable, enrolment may proceed through document-based PoI/PoA/PDB submission.",
      ],
    });

    return out;
  }

  // NEW ENROLMENT: 5–18 or 18+ – Matrix view (List III)
  const baseKeys = selected.length
    ? selected
    : AVAILABLE_DOC_OPTIONS.map((opt) => opt.value);
  const uniqueKeys = Array.from(new Set(baseKeys.filter(Boolean)));

  const rows = uniqueKeys.map((k) => {
    const e = LIST_III_MATRIX[k];
    if (e) {
      return {
        label: e.label,
        poi: !!e.poi,
        poa: !!e.poa,
        por: !!e.por,
        pdb: !!e.pdb,
        note: e.note,
      };
    }
    return {
      label: getOptionLabel(k),
      poi: false,
      poa: false,
      por: false,
      pdb: false,
      note: "Not listed under UIDAI Schedule III for 18+ enrolments.",
    };
  });

  const sortedRows = [...rows].sort((a, b) =>
    a.label.localeCompare(b.label, undefined, { sensitivity: "base" }),
  );

  out.push({ kind: "matrix", rows: sortedRows });
  out.push({
    kind: "section",
    title: "Important Notes",
    bullets: [
      "All documents must be current, issued to the resident, verifiable with the issuing authority and not withdrawn or cancelled.",
      "Proof of Identity must include the resident's name and photograph; Proof of Address must include the resident's name and address in India.",
      "Proof of Relationship documents are required only for Head of Family based enrolment and must contain the resident's name and the HoF's name.",
      "The resident's name and date of birth must match exactly across every PoI, PoA, PoR and Proof of Date of Birth document submitted.",
      "Items marked with * require a separate Proof of Address document from this list. Validity: OCI and Nepal/Bhutan nationals – 10 years; Long Term Visa holders – till LTV validity; other foreign nationals – till visa validity.",
    ],
  });

  return out;
}
