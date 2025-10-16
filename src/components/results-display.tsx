"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RotateCcw, ArrowLeft, Printer, Check, X, AlertTriangle, AlertOctagon, Info } from "lucide-react";
import type React from "react";
import { computeResults, parseMulti, wizardConfig, type ResultBlock } from "@/config/wizard-config";

/* ---------- Colored callout with icons ---------- */
function NoteBox({ title, children, tone = "info" }: { title: string; children: React.ReactNode; tone?: "info" | "warn" | "danger" }) {
  const toneConfig = {
    info: {
      wrapper: "border-blue-200 bg-blue-50",
      heading: "text-blue-800",
      Icon: Info,
    },
    warn: {
      wrapper: "border-yellow-200 bg-yellow-50",
      heading: "text-yellow-800",
      Icon: AlertTriangle,
    },
    danger: {
      wrapper: "border-red-200 bg-red-50",
      heading: "text-red-700",
      Icon: AlertOctagon,
    },
  } as const;

  const config = toneConfig[tone];
  const Icon = config.Icon;
  return (
    <div className={`rounded-md border p-4 text-sm ${config.wrapper}`}>
      <div className={`mb-2 flex items-center gap-2 font-semibold ${config.heading}`}>
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

/* ---------- Tables for 0–5 ---------- */
function ForeignNationalTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Category</TableHead>
          <TableHead className="w-[40%]">Required Documents</TableHead>
          <TableHead className="w-[20%]">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="whitespace-normal break-words">OCI Card Holders</TableCell>
          <TableCell className="whitespace-normal break-words">Valid foreign passport + OCI card</TableCell>
          <TableCell>Validity: 10 years</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-normal break-words">Nepal/Bhutan Nationals</TableCell>
          <TableCell className="whitespace-normal break-words">
            Passport OR Citizenship Certificate + Limited validity Photo ID Certificate
          </TableCell>
          <TableCell>Validity: 10 years</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-normal break-words">LTV Holders</TableCell>
          <TableCell className="whitespace-normal break-words">
            Valid Long Term Visa (minority communities of AFG/BGD/PAK)
          </TableCell>
          <TableCell>Validity: till LTV validity</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-normal break-words">Other Foreign Nationals</TableCell>
          <TableCell className="whitespace-normal break-words">Valid foreign passport + valid visa</TableCell>
          <TableCell>Validity: till visa validity</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function ShelterDocBasedTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60%]">Document Type</TableHead>
          <TableHead className="w-[20%]">Required For</TableHead>
          <TableHead className="w-[20%]">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="whitespace-normal break-words">
            UIDAI Standard Certificate by DCPO + CCI placement order (Form 18, JJ Rules)
          </TableCell>
          <TableCell>PoI, PoA</TableCell>
          <TableCell>Applicable only for the child of the concerned CCI</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function HofUpto5Table() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60%]">Document Type</TableHead>
          <TableHead className="w-[20%]">Required For</TableHead>
          <TableHead className="w-[20%]">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="whitespace-normal break-words">Birth Certificate</TableCell>
          <TableCell>PoR, PDB</TableCell>
          <TableCell>Mandatory on/after 1.10.2023; must mention child & HoF names</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-normal break-words">Legal Guardianship Document</TableCell>
          <TableCell>PoR</TableCell>
          <TableCell>If applicable; HoF must have valid Aadhaar</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

/* ---------- Matrix (List III) with acceptability + icons, wrap text, hide Notes if empty ---------- */
type MatrixBlock = Extract<ResultBlock, { kind: "matrix" }>;

function EligibilityMatrix({ rows }: MatrixBlock) {
  const hasNotes = rows.some((r) => !!r.note);

  const Badge = ({ ok }: { ok: boolean }) =>
    ok ? (
      <span className="inline-flex items-center gap-1 text-green-600">
        <Check className="h-4 w-4" /> <span className="hidden sm:inline">Acceptable</span>
        <span className="sm:hidden">Acc</span>
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-red-600">
        <X className="h-4 w-4" /> <span className="hidden sm:inline">Not acceptable</span>
        <span className="sm:hidden">Not</span>
      </span>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60%]">Document</TableHead>
          <TableHead className="w-[10%]">PoI</TableHead>
          <TableHead className="w-[10%]">PoA</TableHead>
          <TableHead className="w-[10%]">PoR</TableHead>
          <TableHead className="w-[10%]">PDB</TableHead>
          {hasNotes && <TableHead>Notes</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={`${r.label}-${i}`}>
            <TableCell className="font-medium whitespace-normal break-words">{r.label}</TableCell>
            <TableCell><Badge ok={!!r.poi} /></TableCell>
            <TableCell><Badge ok={!!r.poa} /></TableCell>
            <TableCell><Badge ok={!!r.por} /></TableCell>
            <TableCell><Badge ok={!!r.pdb} /></TableCell>
            {hasNotes && <TableCell className="text-muted-foreground whitespace-normal break-words">{r.note ?? ""}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ---------- Update accordion ---------- */
function UpdateAccordion({ groups }: { groups: Array<{ title: string; description: string; bullets: string[]; note?: { title: string; bullets: string[]; tone?: "info" | "warn" | "danger" } }> }) {
  if (!groups.length) return null;
  return (
    <Accordion type="multiple" className="w-full">
      {groups.map((g, idx) => (
        <AccordionItem key={idx} value={g.title.toLowerCase().replace(/\s+/g, "-")}>
          <AccordionTrigger className="text-base">{g.title}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground mb-2">{g.description}</p>
            <ul className="list-disc pl-6 space-y-1">
              {g.bullets.map((b, i) => (
                <li key={i} className="whitespace-normal break-words">
                  {b}
                </li>
              ))}
            </ul>
            {g.note && (
              <div className="mt-3">
                <NoteBox title={g.note.title} tone={g.note.tone ?? "info"}>
                  <ul className="list-disc pl-6 space-y-1">
                    {g.note.bullets.map((note, i) => (
                      <li key={i} className="whitespace-normal break-words">
                        {note}
                      </li>
                    ))}
                  </ul>
                </NoteBox>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const SUMMARY_ORDER = ["purpose", "ageGroup", "category", "enrolmentType", "updateDocuments"] as const;

const SUMMARY_LABELS: Record<string, string> = {
  purpose: "Purpose",
  ageGroup: "Age Group",
  category: "Category",
  enrolmentType: "Enrolment / Update Type",
  updateDocuments: "Updates Requested",
};

type SummaryItem =
  | { id: string; label: string; value: string }
  | { id: string; label: string; values: string[] };

function buildSummary(formData: Record<string, string>): SummaryItem[] {
  const items: SummaryItem[] = [];
  for (const id of SUMMARY_ORDER) {
    const raw = formData[id];
    if (!raw) continue;
    const step = wizardConfig.steps[id];
    if (!step) continue;
    const label = SUMMARY_LABELS[id] ?? step.title;
    if (step.type === "checkbox") {
      const entries = parseMulti(raw);
      if (!entries.length) continue;
      const values = entries
        .map((entry) => step.options.find((o) => o.value === entry)?.label ?? entry);
      if (!values.length) continue;
      items.push({ id, label, values });
    } else {
      const optionLabel = step.options.find((o) => o.value === raw)?.label ?? raw;
      items.push({ id, label, value: optionLabel });
    }
  }
  return items;
}

export function ResultsDisplay({
  formData,
  onReset,
  onBack,
  stepIndicator,
}: {
  formData: Record<string, string>;
  onReset: () => void;
  onBack: () => void;
  stepIndicator?: React.ReactNode;
}) {
  const blocks = computeResults(formData);
  const heading = blocks.find((b) => b.kind === "heading") as any;
  const summaryItems = buildSummary(formData);

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #results-content,
          #results-content * {
            visibility: visible !important;
          }
          #results-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-4xl space-y-6" id="results-content">
        <Card>
          <CardHeader className="space-y-4">
            {stepIndicator && <div className="no-print">{stepIndicator}</div>}
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl">{heading?.title}</CardTitle>
                {heading?.subtitle && <CardDescription className="text-base">{heading.subtitle}</CardDescription>}
              </div>

              <div className="no-print flex items-center gap-2">
                <Button variant="outline" onClick={() => window.print()} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {summaryItems.length > 0 && (
              <div className="rounded-md border bg-muted/40 p-4">
                <h3 className="text-lg font-semibold">Your selections</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {summaryItems.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      {"values" in item ? (
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {item.values.map((val, idx) => (
                            <li key={idx}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {blocks.map((block, i) => {
              if (block.kind === "heading") return null;

              if (block.kind === "table") {
                if (block.table === "foreign") return <ForeignNationalTable key={i} />;
                if (block.table === "shelter") return <ShelterDocBasedTable key={i} />;
                if (block.table === "hofUpto5") return <HofUpto5Table key={i} />;
              }

              if (block.kind === "matrix") {
                return (
                  <div key={i} className="space-y-2">
                    <h3 className="text-xl font-semibold">Document Eligibility Matrix</h3>
                    <p className="text-sm text-muted-foreground">Based on your selected documents:</p>
                    {/* pass kind to satisfy TS */}
                    <EligibilityMatrix kind="matrix" rows={block.rows} />
                  </div>
                );
              }

              if (block.kind === "updateAccordion") {
                return (
                  <UpdateAccordion key={i} groups={block.groups} />
                );
              }

              if (block.kind === "section") {
                return (
                  <NoteBox key={i} title={block.title} tone={block.tone ?? "info"}>
                    <ul className="list-disc pl-6 space-y-1">
                      {block.bullets.map((b, j) => (
                        <li key={j} className="whitespace-normal break-words">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </NoteBox>
                );
              }

              return null;
            })}

            {/* Action bar: Back + Start Over */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button variant="outline" onClick={onReset} className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            </div>

            <footer className="text-xs text-muted-foreground border-t pt-3 mt-6">
              <p>
                This checklist is derived from UIDAI Schedule II — Lists I–IV (official document requirements). For the
                latest version, visit{" "}
                <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-primary">
                  uidai.gov.in
                </a>
                .
              </p>
            </footer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
