// All text on the Document Advisory page is editable here.

import { documentDetails } from "@/config/document-details";

export type AdvisoryGroup = {
  id: string;
  title: string;
  itemIds: string[];
};

export type AdvisoryConfig = {
  pageTitle: string;
  pageDescription: string;
  acknowledgeLabel: string;
  acknowledgeBadge: string;
  supportedFormats: string[];
  maxFileSizeNote: string;
  generalSpec: {
    title: string;
    bullets: string[];
  };
  groups: AdvisoryGroup[];
};

export const advisoryConfig: AdvisoryConfig = {
  pageTitle: "Document Advisory",
  pageDescription:
    "Check the mandatory quality standards and document-specific advisories before uploading proofs.",
  acknowledgeLabel: "I have read and understood the document advisory",
  acknowledgeBadge: "Review required",
  supportedFormats: ["JPEG", "PNG", "PDF"],
  maxFileSizeNote: "Max file size: 2 MB",

  generalSpec: {
    title: "General Document Quality Specification",
    bullets: [
      "Document must be scanned upright and must not be rotated (e.g., sideways, upside down).",
      "The text must be relatively straight and aligned with the page.",
      "Lighting must be uniform across the entire document; avoid significant shadows or hotspots.",
      "The document must not be too dark, too light, or blurred in any portion.",
      "No text and/or image must be obscured on the page.",
      "The entire document must not be blank and must be clearly visible within the scan boundaries.",
      "The corners or edges of the document must not be cut off.",
      "Any holograms, watermarks, microprints or seals must be clearly visible.",
      "All mandatory fields on the document must be present and clearly readable.",
      "The document must not have smudges, fingerprints or other marks that obscure information.",
      "For multi-page documents, pages should be included in the correct order.",
      "The colors in the document must appear natural and accurate.",
      "If the original document was crumpled, the scan should be flat enough for all content to be clear.",
    ],
  },

  groups: [
    {
      id: "browse",
      title: "Browse All Document Advisories",
      itemIds: [
        "govt-photo-id",
        "pan-card",
        "voter-id",
        "driving-licence",
        "uidai-standard",
        "std-mpmla",
        "std-gaz-a-epfo",
        "service-photo-id",
        "ration-card",
        "electricity-bill",
        "water-bill",
        "std-tehsildar-gaz-b",
        "marriage-certificate",
        "gazette-notification",
        "gas-bill",
        "passbook",
        "bank-statement",
        "caste-certificate",
        "property-agreement",
        "std-edu-institution",
        "indian-passport",
        "insurance-policy",
        "birth-certificate",
        "property-tax",
        "allotment-letter",
        "telephone-bill",
        "pensioner-photo-id",
        "marksheet-certificate",
        "self-declaration-birth",
        "std-naco",
        "std-shelter",
        "hof-self-declaration",
        "transgender-id",
        "medical-gender-certificate",
      ],
    },
  ],
};

export const advisoryDocumentIndex = new Map(Object.entries(documentDetails));
