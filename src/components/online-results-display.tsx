"use client";

import { ArrowLeft, Printer, RotateCcw } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { documentDetails } from "@/config/document-details";
import {
  addressUpdateNote,
  buildOnlineSummary,
  getAddressUpdateDocumentIds,
  onlineGeneralRequirements,
  onlineWizardNotes,
} from "@/config/online-services-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type OnlineResultsDisplayProps = {
  formData: Record<string, string>;
  onReset: () => void;
  onBack: () => void;
  stepIndicator?: React.ReactNode;
};

export function OnlineResultsDisplay({
  formData,
  onReset,
  onBack,
  stepIndicator,
}: OnlineResultsDisplayProps) {
  const summaryItems = useMemo(() => buildOnlineSummary(formData), [formData]);
  const documentIds = useMemo(() => getAddressUpdateDocumentIds(), []);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #online-results-content,
          #online-results-content * {
            visibility: visible !important;
          }
          #online-results-content {
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

      <div className="mx-auto max-w-4xl space-y-6" id="online-results-content">
        <Card>
          <CardHeader className="space-y-4">
            {stepIndicator && <div className="no-print">{stepIndicator}</div>}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Address Update Document Checklist
                </CardTitle>
                <CardDescription className="text-base">
                  Documents required for Aadhaar address update through the
                  Online Services wizard.
                </CardDescription>
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
                <p className="text-sm text-muted-foreground">
                  {onlineWizardNotes.summaryHint}
                </p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {summaryItems.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      {"values" in item ? (
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {item.values.map((val) => (
                            <li key={val}>{val}</li>
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

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold">
                  Documents you can upload right now
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tap a document to view the advisory details before you prepare
                  the scan.
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {documentIds
                  .map((id) => documentDetails[id])
                  .filter((detail): detail is NonNullable<typeof detail> =>
                    Boolean(detail),
                  )
                  .map((detail) => (
                    <li key={detail.id}>
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
                              {detail.title}
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
                                <li key={`${detail.id}-${bullet}`}>{bullet}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Follow the general advisory guidance for scans and
                              image quality.
                            </p>
                          )}
                        </DialogContent>
                      </Dialog>
                    </li>
                  ))}
              </ul>
            </div>

            {addressUpdateNote && (
              <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100">
                <p className="font-semibold">{addressUpdateNote.title}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {addressUpdateNote.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
              <p className="font-semibold">General online submission tips</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {onlineGeneralRequirements.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>

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
          </CardContent>
        </Card>
      </div>
    </>
  );
}
