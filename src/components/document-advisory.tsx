"use client";

import { advisoryConfig } from "@/config/advisory-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Info, ListCheck, Paperclip } from "lucide-react";

export function DocumentAdvisory() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">{advisoryConfig.pageTitle}</h2>
        <p className="text-muted-foreground text-lg leading-snug text-balance">
          {advisoryConfig.pageDescription}
        </p>
      </div>

      {/* General spec */}
      <Card className="gap-4">
        <CardHeader className="gap-0">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg">{advisoryConfig.generalSpec.title}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{advisoryConfig.acknowledgeLabel}</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <ul className="list-disc space-y-1 pl-6">
            {advisoryConfig.generalSpec.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          {/* Supported formats */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
              <FileText className="h-3.5 w-3.5 text-amber-600 dark:text-amber-200" />
              <span className="font-medium">Supported formats:</span>
              <span>{advisoryConfig.supportedFormats.join(", ")}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-sky-200/70 bg-sky-50 px-2 py-1 text-foreground dark:border-sky-400/40 dark:bg-sky-500/10">
              <Paperclip className="h-3.5 w-3.5 text-sky-500" />
              {advisoryConfig.maxFileSizeNote}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Browsable advisory list */}
      <Card className="gap-4">
        <CardHeader className="gap-0">
          <div className="flex items-center gap-2">
            <ListCheck className="h-5 w-5 text-sky-600" />
            <CardTitle className="text-lg">{advisoryConfig.groups[0].title}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Expand an item to view its official name and advisory requirements.
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {advisoryConfig.groups.map((group) =>
              group.items.map((it) => (
                <AccordionItem key={it.id} value={it.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm font-semibold text-foreground">{it.title}</span>
                      {it.subtitle && <span className="text-xs text-muted-foreground leading-relaxed">{it.subtitle}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground">
                    {it.bullets?.length ? (
                      <ul className="list-disc space-y-1 pl-6">
                        {it.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="rounded-md border border-dashed border-muted-foreground/40 bg-muted/20 px-3 py-2 text-muted-foreground">
                        Follow the general document quality rules above.
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )),
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
