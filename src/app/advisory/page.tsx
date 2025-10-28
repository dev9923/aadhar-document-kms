import type { Metadata } from "next";
import { DocumentAdvisory } from "@/components/document-advisory";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Document Advisory",
  description:
    "Comprehensive document quality standards and advisories for Aadhaar enrolment and updates. Mandatory specifications for 40+ document types including passport, voter ID, PAN card, utility bills, and more.",
  keywords: [
    "Aadhaar document advisory",
    "document quality standards",
    "UIDAI document requirements",
    "Aadhaar document specifications",
    "document scanning guidelines",
    "identity proof requirements",
    "address proof requirements",
  ],
  openGraph: {
    title: "Document Advisory | Aadhaar Sahayak",
    description:
      "Complete guide to document quality standards and requirements for Aadhaar services",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <DocumentAdvisory />
      </main>
    </div>
  );
}
