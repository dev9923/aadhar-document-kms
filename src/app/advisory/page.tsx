import { Header } from "@/components/header"
import { DocumentAdvisory } from "@/components/document-advisory"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <DocumentAdvisory />
      </main>
    </div>
  )
}
