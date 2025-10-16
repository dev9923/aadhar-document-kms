"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { name: "Home", href: "/" },
  { name: "Document Advisory", href: "/advisory" },
  { name: "Complete Guide", href: "/docs/uidai-document-guide.pdf", download: true },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Left: Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/AadhaarLogo.png"
            alt="Aadhaar logo"
            width={40}
            height={40}
            className="rounded-sm"
          />
          <h1 className="text-xl font-semibold tracking-tight">
            Aadhaar Document KMS
          </h1>
        </Link>

        {/* Right: Nav links + Theme toggle */}
        <nav className="flex items-center gap-8 text-base">
          {links.map((link) =>
            link.download ? (
              <a
                key={link.name}
                href={link.href}
                download
                className="text-muted-foreground transition-colors hover:text-foreground/80"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            )
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
