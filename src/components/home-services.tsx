"use client";

import { useState } from "react";

import { DocumentAdvisory } from "@/components/document-advisory";
import { DocumentChecker } from "@/components/document-checker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

const TABS = [
  { id: "wizard", label: "Document Checker" },
  { id: "advisory", label: "Document Advisory" },
] as const;

const TAB_COPY: Record<
  (typeof TABS)[number]["id"],
  { title: string; description: string }
> = {
  wizard: {
    title: "Aadhaar Document Requirement Checker",
    description:
      "Find out exactly which documents you need for Aadhaar enrolment or update, tailored to your age and situation.",
  },
  advisory: {
    title: "Document Advisory",
    description:
      "Review the UIDAI-approved document requirements and quality tips before you upload your files.",
  },
};

export function HomeServices() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("wizard");

  const activeCopy = TAB_COPY[activeTab];

  return (
    <div className="space-y-8">
      <Tabs
        value={activeTab}
        onValueChange={(val) =>
          setActiveTab(val as (typeof TABS)[number]["id"])
        }
        className="flex flex-col items-center gap-6"
      >
        <TabsList className="inline-flex rounded-full border border-border/70 bg-background p-1 text-sm shadow-sm">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-full px-5 py-2 font-medium transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mx-auto max-w-3xl space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {activeCopy.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed text-balance">
            {activeCopy.description}
          </p>
        </div>

        <TabsContent className="w-full pb-8" value="wizard">
          <DocumentChecker withIntro={false} />
        </TabsContent>
        <TabsContent className="w-full pb-8" value="advisory">
          <DocumentAdvisory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
