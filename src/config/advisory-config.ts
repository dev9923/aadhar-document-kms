// All text on the Document Advisory page is editable here.

export type AdvisoryItem = {
    id: string;
    title: string;         // e.g., "Indian Passport"
    subtitle?: string;     // short helper line shown under title
    bullets?: string[];    // document-specific requirements/notes
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
    groups: {
      id: string;
      title: string;       // section heading inside the accordion list
      items: AdvisoryItem[];
    }[];
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
        items: [
          {
            id: "govt-photo-id",
            title:
              "Photo ID Card/Certificate with photo (Central/State Govt) — Bhamashah, Domicile, Labour Card, etc.",
            subtitle:
              "Photograph Identity Card / Certificate with photograph issued by Central/State Government (e.g., Bhamashah, Domicile Certificate, Labour Card)",
            bullets: [
              "The Govt ID Card/Certificate must have Name and Address of the resident.",
              "The Govt ID Card/Certificate must be valid.",
            ],
          },
          {
            id: "voter-id",
            title: "Voter Identity Card / e-Voter Identity Card",
            subtitle:
              "Voter Identity Card / e-Voter Identity Card whose details are displayed online on the ECI/CEO website",
            bullets: [
              "The Voter ID Card/e-Voter ID Card must have Name and Address of the resident.",
            ],
          },
          {
            id: "std-mpmla",
            title:
              "Standard Certificate by MP / MLA / MLC / Municipal Councillor",
            subtitle:
              "Certificate on UIDAI Standard Certificate format by MP/MLA/MLC/Municipal Councillor",
            bullets: [
              "Certificate must be in UIDAI-specified format.",
              "Certificate must contain Name and Address of the resident.",
              "Certificate must be valid (issue date within permitted window).",
            ],
          },
          {
            id: "std-gaz-a-epfo",
            title:
              "Standard Certificate by Gazetted Officer Group ‘A’ / EPFO Officer",
            subtitle:
              "Certificate on UIDAI Standard Certificate format by Gazetted Officer Group ‘A’ / EPFO Officer",
            bullets: [
              "Certificate must be in UIDAI-specified format.",
              "Certificate must contain Name and Address of the resident.",
              "Certificate must be valid (issue date within permitted window).",
            ],
          },
          {
            id: "ration-card",
            title: "Ration / PDS Photo Card",
            subtitle: "Ration or PDS photograph card (including e-Ration) showing the resident's name and address",
            bullets: [
              "The Ration/PDS/e-Ration Card must have Name and Address of the resident.",
            ],
          },
          {
            id: "electricity-bill",
            title:
              "Electricity Bill (≤3 months old)",
            subtitle:
              "Pre-paid or post-paid electricity bill issued within the last three months",
            bullets: [
              "Electricity bill must have Name and Address of the resident.",
              "The bill should not be older than 3 months.",
            ],
          },
          {
            id: "std-tehsildar-gaz-b",
            title:
              "Standard Certificate by Tehsildar / Gazetted Officer Group ‘B’",
            subtitle:
              "Certificate on UIDAI Standard Certificate format by Tehsildar / Gazetted Officer Group ‘B’",
            bullets: [
              "Certificate must be in UIDAI-specified format.",
              "Certificate must contain Name and Address of the resident.",
              "Certificate must be valid (issue date within permitted window).",
            ],
          },
          {
            id: "marriage-certificate",
            title:
              "Marriage Certificate (with/without photo) + PoI of old name if certificate has no photograph",
            subtitle:
              "Marriage Certificate issued by Central/State Government (supporting PoI of old name if certificate has no photograph)",
            bullets: [
              "Marriage Certificate must have Name and Address of the resident.",
              "If the certificate has no photograph, attach PoI document of the old name with photograph.",
            ],
          },
          {
            id: "gas-bill",
            title: "Gas Connection Bill (≤3 months old)",
            subtitle: "Recent gas connection bill issued within the last three months",
            bullets: [
              "The Gas connection bill must have Name and Address of the resident.",
              "The Gas connection bill should not be older than 3 months.",
            ],
          },
          {
            id: "passbook",
            title:
              "Scheduled Commercial Bank’s Passbook / Post Office Savings Passbook (stamped and signed)",
            subtitle:
              "Passbook with Name and Photograph (cross-stamped and signed) / PO Savings Account Passbook (with stamp and signature)",
            bullets: [
              "Passbook must have Name and Address of the resident.",
              "Passbook must be stamped and signed by the bank/post office official.",
            ],
          },
          {
            id: "caste-certificate",
            title: "ST / SC / OBC Certificate (Central/State Government)",
            subtitle:
              "ST / SC / OBC Certificate issued by Central/State Government",
            bullets: [
              "The certificate must have Name and Address of the resident.",
              "The certificate must be valid.",
            ],
          },
          {
            id: "property-agreement",
            title:
              "Registered Sale Agreement/Gift Deed or (Registered/Unregistered) Rent/Lease/Leave & Licence",
            subtitle:
              "Valid sale agreement / gift deed registered with Registrar Office, or registered/unregistered rent, lease or leave & licence agreement",
            bullets: [
              "Document must have Name and Address of the resident.",
              "Document must be valid and legible; include registration details if applicable.",
            ],
          },
          {
            id: "std-edu-institution",
            title:
              "Standard Certificate by Recognized Educational Institution (Head of Institute; for concerned students)",
            subtitle:
              "Certificate on UIDAI Standard Certificate format by Recognised educational institution (only for the institute students concerned)",
            bullets: [
              "Certificate must be in UIDAI-specified format.",
              "Certificate must contain Name and Address of the resident.",
              "Certificate must be valid (issue date within permitted window).",
            ],
          },
          {
            id: "indian-passport",
            title: "Indian Passport (Current)",
            subtitle: "Valid Indian passport displaying the resident's name and address",
            bullets: [
              "Passport must have Name and Address of the resident.",
              "Passport must be valid.",
            ],
          },
          {
            id: "insurance-policy",
            title:
              "Life/Medical Insurance Policy (valid up to 1 year from issue date)",
            subtitle:
              "Life or medical insurance Policy (valid up to 1 year from the date of issue)",
            bullets: [
              "Policy must have Name and Address of the resident.",
              "Policy is valid only up to 1 year from the date of issue for PoA.",
            ],
          },
          {
            id: "property-tax",
            title: "Property Tax Receipt (≤1 year)",
            subtitle: "Latest municipal property tax receipt issued within the past year",
            bullets: [
              "Receipt must have Name and Address of the resident.",
              "The receipt should not be older than 1 year.",
            ],
          },
          {
            id: "allotment-letter",
            title:
              "Govt/PSU Accommodation Allotment Letter (≤1 year)",
            subtitle:
              "Accommodation allotment letter from Central/State Government, PSU, regulatory or statutory body issued within the last year",
            bullets: [
              "Allotment letter must have Name and Address of the resident.",
              "Allotment letter should not be older than 1 year.",
            ],
          },
          {
            id: "telephone-bill",
            title:
              "Telephone / Mobile / Broadband Bill (≤3 months)",
            subtitle:
              "Landline, post-paid mobile, or broadband bill issued within the last three months",
            bullets: [
              "Bill must have Name and Address of the resident.",
              "Bill should not be older than 3 months.",
            ],
          },
          {
            id: "std-naco",
            title:
              "Standard Certificate by NACO/State Health Dept/Project Director of State AIDS Control Society",
            subtitle:
              "Certificate on UIDAI Standard Certificate format by Gazetted Officer at NACO / State Health Department / Project Director of State AIDS Control Society or nominee",
            bullets: [
              "Certificate must be in UIDAI-specified format.",
              "Certificate must contain Name and Address of the resident.",
              "Certificate must be valid (issue date within permitted window).",
            ],
          },
          {
            id: "std-shelter",
            title:
              "Standard Certificate by Superintendent/Warden/Matron/Head of Institution (shelter homes/orphanages)",
            subtitle:
              "Certificate on UIDAI Standard Certificate format by Superintendent/Warden/Matron/Head of Institution of recognised shelter homes or orphanages (for concerned children only)",
            bullets: [
              "Certificate must be in UIDAI-specified format.",
              "Certificate must contain Name and Address of the resident.",
              "Certificate must be valid (issue date within permitted window).",
            ],
          },
        ],
      },
    ],
  };
  
