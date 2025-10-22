import { Header } from "@/components/header";
import { OnlineServices } from "@/components/online-services";

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
