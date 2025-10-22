"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Online Services", href: "/online-services" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex flex-1 items-center gap-3 overflow-hidden"
        >
          <Image
            src="/AadhaarLogo.png"
            alt="Aadhaar logo"
            width={40}
            height={40}
            className="rounded-sm"
          />
          <span className="truncate text-xs font-semibold leading-tight sm:text-lg">
            Aadhaar Document Reference Hub
          </span>
        </Link>
        <nav className="mr-3 items-center gap-6 hidden sm:flex">
        {links.map((link) =>
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
            )}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "sm:hidden border-t bg-background shadow-sm transition-all duration-300 ease-out",
          mobileOpen
            ? "block max-h-64 opacity-100"
            : "hidden max-h-0 opacity-0 pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="space-y-2 px-4 pb-4 pt-3 sm:px-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-md text-sm",
                  active && "bg-muted text-foreground hover:bg-muted",
                )}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
