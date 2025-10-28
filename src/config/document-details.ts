export type DocumentDetail = {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
};

export const documentDetails: Record<string, DocumentDetail> = {
  "govt-photo-id": {
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
  "pan-card": {
    id: "pan-card",
    title: "PAN Card / e-PAN Card",
    subtitle:
      "Permanent Account Number card issued by the Income Tax Department with the resident's name and photograph",
    bullets: [
      "PAN card or e-PAN must display the resident's name exactly as it should appear on Aadhaar.",
      "Digital e-PAN downloads must retain the embedded photograph and QR code.",
    ],
  },
  "driving-licence": {
    id: "driving-licence",
    title: "Driving Licence",
    subtitle:
      "Driving Licence issued by the Central or State Transport Authority",
    bullets: [
      "Licence must be valid and legible with the resident's name and photograph.",
      "When used for address proof, ensure the printed address matches the Aadhaar update request.",
    ],
  },
  "voter-id": {
    id: "voter-id",
    title: "Voter Identity Card / e-Voter Identity Card",
    subtitle:
      "Voter Identity Card / e-Voter Identity Card whose details are displayed online on the ECI/CEO website",
    bullets: [
      "The Voter ID Card/e-Voter ID Card must have Name and Address of the resident.",
    ],
  },
  "std-mpmla": {
    id: "std-mpmla",
    title: "Standard Certificate by MP / MLA / MLC / Municipal Councillor",
    subtitle:
      "Certificate on UIDAI Standard Certificate format by MP/MLA/MLC/Municipal Councillor",
    bullets: [
      "Certificate must be in UIDAI-specified format.",
      "Certificate must contain Name and Address of the resident.",
      "Certificate must be valid (issue date within permitted window).",
    ],
  },
  "std-gaz-a-epfo": {
    id: "std-gaz-a-epfo",
    title: "Standard Certificate by Gazetted Officer Group ‘A’ / EPFO Officer",
    subtitle:
      "Certificate on UIDAI Standard Certificate format by Gazetted Officer Group ‘A’ / EPFO Officer",
    bullets: [
      "Certificate must be in UIDAI-specified format.",
      "Certificate must contain Name and Address of the resident.",
      "Certificate must be valid (issue date within permitted window).",
    ],
  },
  "service-photo-id": {
    id: "service-photo-id",
    title: "Service Photo Identity Card (Govt/PSU)",
    subtitle:
      "Photo identity card issued by Central/State Government, PSU, or regulatory/statutory body",
    bullets: [
      "Card must show the resident's name, photograph, and organisation details.",
      "Ensure the card is valid and stamped or signed by the issuing authority.",
    ],
  },
  "ration-card": {
    id: "ration-card",
    title: "Ration / PDS Photo Card",
    subtitle:
      "Ration or PDS photograph card (including e-Ration) showing the resident's name and address",
    bullets: [
      "The Ration/PDS/e-Ration Card must have Name and Address of the resident.",
    ],
  },
  "electricity-bill": {
    id: "electricity-bill",
    title: "Electricity Bill (≤3 months old)",
    subtitle:
      "Pre-paid or post-paid electricity bill issued within the last three months",
    bullets: [
      "Electricity bill must have Name and Address of the resident.",
      "The bill should not be older than 3 months.",
    ],
  },
  "water-bill": {
    id: "water-bill",
    title: "Water Bill (≤3 months old)",
    subtitle:
      "Municipal or utility water bill issued within the last three months",
    bullets: [
      "Water bill must have Name and Address of the resident.",
      "The bill should not be older than 3 months.",
    ],
  },
  "std-tehsildar-gaz-b": {
    id: "std-tehsildar-gaz-b",
    title: "Standard Certificate by Tehsildar / Gazetted Officer Group ‘B’",
    subtitle:
      "Certificate on UIDAI Standard Certificate format by Tehsildar / Gazetted Officer Group ‘B’",
    bullets: [
      "Certificate must be in UIDAI-specified format.",
      "Certificate must contain Name and Address of the resident.",
      "Certificate must be valid (issue date within permitted window).",
    ],
  },
  "marriage-certificate": {
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
  "gazette-notification": {
    id: "gazette-notification",
    title: "Gazette Notification of Name Change",
    subtitle:
      "Official Gazette notification published for the resident's name change",
    bullets: [
      "Submit the full Gazette notification that records both the old and new names.",
      "Attach supporting Proof of Identity for the old name if the Gazette entry does not include a photograph.",
    ],
  },
  "gas-bill": {
    id: "gas-bill",
    title: "Gas Connection Bill (≤3 months old)",
    subtitle: "Recent gas connection bill issued within the last three months",
    bullets: [
      "The Gas connection bill must have Name and Address of the resident.",
      "The Gas connection bill should not be older than 3 months.",
    ],
  },
  passbook: {
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
  "bank-statement": {
    id: "bank-statement",
    title: "Bank Account Statement (≤3 months old)",
    subtitle:
      "Bank statement for savings/current account issued within the last three months",
    bullets: [
      "Statement must have Name and Address of the resident.",
      "Statement must be stamped and signed if printed from bank branch.",
      "The statement should not be older than 3 months.",
    ],
  },
  "caste-certificate": {
    id: "caste-certificate",
    title: "ST / SC / OBC Certificate (Central/State Government)",
    subtitle: "ST / SC / OBC Certificate issued by Central/State Government",
    bullets: [
      "The certificate must have Name and Address of the resident.",
      "The certificate must be valid.",
    ],
  },
  "property-agreement": {
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
  "std-edu-institution": {
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
  "indian-passport": {
    id: "indian-passport",
    title: "Indian Passport (Current)",
    subtitle:
      "Valid Indian passport displaying the resident's name and address",
    bullets: [
      "Passport must have Name and Address of the resident.",
      "Passport must be valid.",
    ],
  },
  "insurance-policy": {
    id: "insurance-policy",
    title: "Life/Medical Insurance Policy (valid up to 1 year from issue date)",
    subtitle:
      "Life or medical insurance Policy (valid up to 1 year from the date of issue)",
    bullets: [
      "Policy must have Name and Address of the resident.",
      "Policy is valid only up to 1 year from the date of issue for PoA.",
    ],
  },
  "birth-certificate": {
    id: "birth-certificate",
    title: "Birth Certificate",
    subtitle:
      "Birth certificate issued under the Registration of Births and Deaths Act, 1969",
    bullets: [
      "Certificate must mention the resident's name, date of birth, and parents' names.",
      "Only certificates issued by the competent municipal or panchayat authority are accepted.",
    ],
  },
  "property-tax": {
    id: "property-tax",
    title: "Property Tax Receipt (≤1 year)",
    subtitle:
      "Latest municipal property tax receipt issued within the past year",
    bullets: [
      "Receipt must have Name and Address of the resident.",
      "The receipt should not be older than 1 year.",
    ],
  },
  "allotment-letter": {
    id: "allotment-letter",
    title: "Govt/PSU Accommodation Allotment Letter (≤1 year)",
    subtitle:
      "Accommodation allotment letter from Central/State Government, PSU, regulatory or statutory body issued within the last year",
    bullets: [
      "Allotment letter must have Name and Address of the resident.",
      "Allotment letter should not be older than 1 year.",
    ],
  },
  "telephone-bill": {
    id: "telephone-bill",
    title: "Telephone / Mobile / Broadband Bill (≤3 months)",
    subtitle:
      "Landline, post-paid mobile, or broadband bill issued within the last three months",
    bullets: [
      "Bill must have Name and Address of the resident.",
      "Bill should not be older than 3 months.",
    ],
  },
  "pensioner-photo-id": {
    id: "pensioner-photo-id",
    title: "Pensioner / Freedom Fighter Photo Identity Card",
    subtitle:
      "Photo identity card or Pension Payment Order issued by Central/State Government",
    bullets: [
      "Document must show the resident's name and photograph along with pension details.",
      "Ensure the card or order carries the issuing authority's seal and is currently valid.",
    ],
  },
  "marksheet-certificate": {
    id: "marksheet-certificate",
    title: "Mark-sheet / Certificate (Board / University)",
    subtitle:
      "Mark-sheet or certificate issued by a recognised Board, University, or higher education institution",
    bullets: [
      "Document must clearly display the resident's name and date of birth.",
      "Only original documents or digitally signed copies are accepted for verification.",
    ],
  },
  "self-declaration-birth": {
    id: "self-declaration-birth",
    title: "Self-Declaration with Birth Certificate",
    subtitle:
      "Resident's self-declaration accompanying the Birth Certificate for exception handling",
    bullets: [
      "Use the UIDAI-prescribed self-declaration format and sign the document.",
      "Attach the referenced Birth Certificate along with the declaration.",
    ],
  },
  "std-naco": {
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
  "std-shelter": {
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
  "uidai-standard": {
    id: "uidai-standard",
    title: "UIDAI Standard Certificate (Authorised Signatories)",
    subtitle:
      "Certificate issued on UIDAI Standard Certificate format by authorised signatories (MP/MLA/MLC, Gazetted Officers, Tehsildar, Educational Institution Head, etc.)",
    bullets: [
      "Use the UIDAI-prescribed Standard Certificate template for the signatory category.",
      "Certificate must clearly mention the resident's Name and Address.",
      "Issue date must fall within the validity window prescribed by UIDAI.",
      "Attach any supporting proof mandated for the chosen certificate variant.",
    ],
  },
  "hof-self-declaration": {
    id: "hof-self-declaration",
    title: "HoF Self-Declaration (Immediate Family Members)",
    subtitle:
      "Self-declaration by Head of Family (HoF) with Aadhaar, confirming relationship and shared address for immediate family members",
    bullets: [
      "HoF must have a valid Aadhaar with the current address.",
      "Declaration must be signed by HoF and include the resident's name and relationship.",
      "Attach supporting relationship proof if advised by the enrolment/update centre.",
    ],
  },
  "transgender-id": {
    id: "transgender-id",
    title: "Transgender Identity Card / Certificate",
    subtitle:
      "Identity card or certificate issued under the Transgender Persons (Protection of Rights) Act, 2019",
    bullets: [
      "Document must bear the resident's name and affirmed gender with issuing authority details.",
      "Ensure the certificate is issued by the competent State or District authority and remains valid.",
    ],
  },
  "medical-gender-certificate": {
    id: "medical-gender-certificate",
    title: "Medical Certificate from Surgeon",
    subtitle:
      "Certificate issued by the surgeon or medical institution confirming gender affirmation procedure",
    bullets: [
      "Certificate must mention the procedure undertaken and include the surgeon's signature and seal.",
      "Provide the hospital or clinic letterhead along with the date of issuance.",
    ],
  },
  "prisoner-induction": {
    id: "prisoner-induction",
    title: "Prisoner Induction Document (PID)",
    subtitle:
      "Prisoner Induction Document (PID) issued by Prison Officer with signature and seal",
    bullets: [
      "Document must have Name and Address of the resident.",
      "Must be issued by the Prison Officer with signature and seal.",
      "Acceptable as Proof of Identity and Proof of Address.",
    ],
  },
  "dcpo-certificate": {
    id: "dcpo-certificate",
    title: "DCPO Certificate with CCI Placement Order",
    subtitle:
      "Certificate issued on UIDAI Standard Certificate format by District Child Protection Officer (DCPO) along with order of placement of child in Child Care Institution (CCI) in Form 18 of the Juvenile Justice Model Rules, 2016 (as amended in 2022)",
    bullets: [
      "Certificate must be in UIDAI-specified format.",
      "Must include the order of placement of child in CCI in Form 18.",
      "Applicable for children in Child Care Institutions.",
      "Certificate must contain Name and Address of the child.",
    ],
  },
  "std-village-auth": {
    id: "std-village-auth",
    title: "Standard Certificate by Village Panchayat Authority",
    subtitle:
      "Certificate issued on UIDAI Standard Certificate format by Village Panchayat Head/President or Mukhiya/Gaon Bura/equivalent authority (for rural areas)/Village Panchayat Secretary/Village Revenue Officer or equivalent (for rural areas)",
    bullets: [
      "Certificate must be in UIDAI-specified format.",
      "Certificate must contain Name and Address of the resident.",
      "Certificate must be valid (issue date within permitted window).",
      "Applicable only for rural areas.",
    ],
  },
  "disability-id": {
    id: "disability-id",
    title: "Disability Identity Card / Certificate",
    subtitle:
      "Disability Identity Card / Certificate of Disability issued under Rights of Persons with Disabilities Rules, 2017",
    bullets: [
      "Document must have Name and Address of the resident.",
      "Must be issued under Rights of Persons with Disabilities Rules, 2017.",
      "Acceptable as Proof of Identity and Proof of Address.",
    ],
  },
  "mgnrega-domicile": {
    id: "mgnrega-domicile",
    title: "MGNREGA Job Card and Domicile Certificate",
    subtitle:
      "MGNREGA/NREGS Job Card and Domicile Certificate issued by State Government",
    bullets: [
      "Document must have Name and Address of the resident.",
      "Both MGNREGA/NREGS Job Card and Domicile Certificate are required.",
      "Must be issued by State Government.",
      "Acceptable as Proof of Identity, Proof of Address, and Proof of Relationship.",
    ],
  },
};

export const documentDetailsList = Object.values(documentDetails);

export const documentDetailsMap = new Map<string, DocumentDetail>(
  Object.entries(documentDetails),
);

export function getDocumentDetail(id: string): DocumentDetail | undefined {
  return documentDetails[id];
}
