import type { Metadata } from "next";
import { Header } from "@/components/header";
import { OnlineServices } from "@/components/online-services";

export const metadata: Metadata = {
  title: "Online Services - Address Update",
  description:
    "Online Aadhaar address update wizard. Get personalized document checklist for online address update submission based on your age group and category. Support for Indian residents, NRIs, and foreign nationals.",
  keywords: [
    "Aadhaar online services",
    "online address update",
    "Aadhaar address change online",
    "online Aadhaar update",
    "address update documents",
    "UIDAI online services",
  ],
  openGraph: {
    title: "Online Services - Address Update | Aadhaar Sahayak",
    description:
      "Online Aadhaar address update wizard with step-by-step document checklist",
  },
};

export default function OnlineServicesPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <OnlineServices />
      </main>
    </div>
  );
}
