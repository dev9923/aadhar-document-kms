"use client";

import {
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  Check,
  Info,
  Printer,
  RotateCcw,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { documentDetails } from "@/config/document-details";
import {
  computeResults,
  LIST_I,
  parseMulti,
  type ResultBlock,
  wizardConfig,
} from "@/config/wizard-config";

/* ---------- Colored callout with icons ---------- */
function NoteBox({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "info" | "warn" | "danger";
}) {
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
      <div
        className={`mb-2 flex items-center gap-2 font-semibold ${config.heading}`}
      >
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

function AcceptBadge({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex items-center gap-1 text-green-600">
      <Check className="h-4 w-4" />{" "}
      <span className="hidden sm:inline">Acceptable</span>
      <span className="sm:hidden">Acc</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-red-600">
      <X className="h-4 w-4" />{" "}
      <span className="hidden sm:inline">Not acceptable</span>
      <span className="sm:hidden">Not</span>
    </span>
  );
}

/* ---------- Tables for 0–5 ---------- */
function ForeignNationalTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Category</TableHead>
          <TableHead className="w-[30%]">Required Documents</TableHead>
          <TableHead className="w-[10%]">PoI</TableHead>
          <TableHead className="w-[10%]">PoA</TableHead>
          <TableHead className="w-[10%]">PDB</TableHead>
          <TableHead className="w-[20%]">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {LIST_I.foreign.map((entry) => (
          <TableRow key={entry.category}>
            <TableCell className="whitespace-normal break-words font-medium">
              {entry.category}
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              {entry.documents}
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.poi} />
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.poa} />
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.pdb} />
            </TableCell>
            <TableCell className="whitespace-normal break-words text-muted-foreground">
              {entry.note ?? "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ShelterDocBasedTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[45%]">Document Type</TableHead>
          <TableHead className="w-[15%]">PoI</TableHead>
          <TableHead className="w-[15%]">PoA</TableHead>
          <TableHead className="w-[15%]">PDB</TableHead>
          <TableHead className="w-[10%]">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {LIST_I.documentBased.map((entry, index) => (
          <TableRow key={`${entry.document}-${index}`}>
            <TableCell className="whitespace-normal break-words">
              {entry.document}
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.poi} />
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.poa} />
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.pdb} />
            </TableCell>
            <TableCell className="whitespace-normal break-words text-muted-foreground">
              {entry.note ?? "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function HofUpto5Table() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[55%]">Document Type</TableHead>
          <TableHead className="w-[15%]">PoR</TableHead>
          <TableHead className="w-[15%]">PDB</TableHead>
          <TableHead className="w-[15%]">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {LIST_I.hofBased.map((entry, index) => (
          <TableRow key={`${entry.document}-${index}`}>
            <TableCell className="whitespace-normal break-words">
              {entry.document}
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.por} />
            </TableCell>
            <TableCell>
              <AcceptBadge ok={entry.pdb} />
            </TableCell>
            <TableCell className="whitespace-normal break-words text-muted-foreground">
              {entry.note ?? "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ---------- Matrix (List III) with acceptability + icons, wrap text, hide Notes if empty ---------- */
type MatrixBlock = Extract<ResultBlock, { kind: "matrix" }>;

function EligibilityMatrix({ rows }: MatrixBlock) {
  const hasNotes = rows.some((r) => !!r.note);
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[960px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Document</TableHead>
            <TableHead className="w-[12%]">PoI</TableHead>
            <TableHead className="w-[12%]">PoA</TableHead>
            <TableHead className="w-[12%]">PoR</TableHead>
            <TableHead className="w-[12%]">PDB</TableHead>
            {hasNotes && <TableHead className="min-w-[200px]">Notes</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={`${r.label}-${i}`}>
              <TableCell className="font-medium whitespace-normal break-words">
                {r.label}
              </TableCell>
              <TableCell>
                <AcceptBadge ok={!!r.poi} />
              </TableCell>
              <TableCell>
                <AcceptBadge ok={!!r.poa} />
              </TableCell>
              <TableCell>
                <AcceptBadge ok={!!r.por} />
              </TableCell>
              <TableCell>
                <AcceptBadge ok={!!r.pdb} />
              </TableCell>
              {hasNotes && (
                <TableCell className="text-muted-foreground whitespace-normal break-words">
                  {r.note ?? ""}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ---------- Update accordion ---------- */
function UpdateAccordion({
  groups,
}: {
  groups: Array<{
    title: string;
    description: string;
    documents: Array<{ label: string; docId?: string }>;
    note?: {
      title: string;
      bullets: string[];
      tone?: "info" | "warn" | "danger";
    };
  }>;
}) {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  if (!groups.length) return null;
  return (
    <Accordion
      type="multiple"
      className="w-full rounded-lg border border-border/60 bg-background/60"
    >
      {groups.map((g) => (
        <AccordionItem
          key={g.title}
          value={g.title.toLowerCase().replace(/\s+/g, "-")}
          className="border-border/50 px-2 first:rounded-t-lg last:rounded-b-lg last:border-b-0"
        >
          <AccordionTrigger className="text-base font-semibold">
            {g.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 px-2 pt-0 pb-4">
            <p className="text-sm text-muted-foreground">{g.description}</p>
            {g.documents.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {g.documents.map((doc, index) => {
                  const detail = doc.docId ? documentDetails[doc.docId] : null;
                  const key = doc.docId ?? `${g.title}-${index}`;
                  if (detail) {
                    return (
                      <li key={key}>
                        <Dialog
                          open={activeDocId === detail.id}
                          onOpenChange={(open) => {
                            if (open) {
                              setActiveDocId(detail.id);
                            } else if (activeDocId === detail.id) {
                              setActiveDocId(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="h-full w-full justify-start text-left whitespace-normal break-words"
                            >
                              {doc.label}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-xl">
                            <DialogHeader className="space-y-1">
                              <DialogTitle>{detail.title}</DialogTitle>
                              {detail.subtitle && (
                                <DialogDescription>
                                  {detail.subtitle}
                                </DialogDescription>
                              )}
                            </DialogHeader>
                            {detail.bullets?.length ? (
                              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
                                {detail.bullets.map((bullet) => (
                                  <li
                                    key={`${detail.id}-${bullet}`}
                                    className="whitespace-normal break-words"
                                  >
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Follow the general advisory guidance above.
                              </p>
                            )}
                          </DialogContent>
                        </Dialog>
                      </li>
                    );
                  }
                  return (
                    <li key={key}>
                      <div className="h-full w-full rounded-md border border-dashed border-border/60 bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                        {doc.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {g.note && (
              <div className="border-t border-border/40 pt-3">
                <NoteBox title={g.note.title} tone={g.note.tone ?? "info"}>
                  <ul className="list-disc pl-6 space-y-1">
                    {g.note.bullets.map((note) => (
                      <li
                        key={`${g.note?.title}-${note}`}
                        className="whitespace-normal break-words"
                      >
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

const SUMMARY_ORDER = [
  "purpose",
  "ageGroup",
  "category",
  "enrolmentType",
  "updateDocuments",
] as const;

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
  const heading = blocks.find(
    (block): block is Extract<ResultBlock, { kind: "heading" }> =>
      block.kind === "heading",
  );
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
                {heading?.subtitle && (
                  <CardDescription className="text-base">
                    {heading.subtitle}
                  </CardDescription>
                )}
              </div>

              <div className="no-print flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="gap-2"
                >
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
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      {"values" in item ? (
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {item.values.map((val) => (
                            <li key={`${item.id}-${val}`}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {blocks.map((block) => {
              if (block.kind === "heading") return null;

              if (block.kind === "table") {
                if (block.table === "foreign")
                  return <ForeignNationalTable key={`table-${block.table}`} />;
                if (block.table === "shelter")
                  return <ShelterDocBasedTable key={`table-${block.table}`} />;
                if (block.table === "hofUpto5")
                  return <HofUpto5Table key={`table-${block.table}`} />;
              }

              if (block.kind === "matrix") {
                return (
                  <div
                    key={`matrix-${block.rows
                      .map((row) => row.label)
                      .join("|")}`}
                    className="space-y-2"
                  >
                    <h3 className="text-xl font-semibold">
                      Document Eligibility Matrix
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your selected documents:
                    </p>
                    {/* pass kind to satisfy TS */}
                    <EligibilityMatrix kind="matrix" rows={block.rows} />
                  </div>
                );
              }

              if (block.kind === "updateAccordion") {
                return (
                  <UpdateAccordion
                    key={`update-${block.groups.map((g) => g.title).join("|")}`}
                    groups={block.groups}
                  />
                );
              }

              if (block.kind === "section") {
                return (
                  <NoteBox
                    key={`section-${block.title}`}
                    title={block.title}
                    tone={block.tone ?? "info"}
                  >
                    <ul className="list-disc pl-6 space-y-1">
                      {block.bullets.map((b) => (
                        <li
                          key={`${block.title}-${b}`}
                          className="whitespace-normal break-words"
                        >
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
              <Button
                variant="outline"
                onClick={onBack}
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                variant="outline"
                onClick={onReset}
                className="gap-2 bg-transparent"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            </div>

            <footer className="text-xs text-muted-foreground border-t pt-3 mt-6">
              <p>
                This checklist is derived from UIDAI Schedule II — Lists I–IV
                (official document requirements). For the latest version, visit{" "}
                <a
                  href="https://uidai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
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
