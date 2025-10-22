import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_SITE_URL = "http://localhost:3000";
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const NORMALISED_SITE_URL =
  RAW_SITE_URL && RAW_SITE_URL.length > 0
    ? RAW_SITE_URL.startsWith("http")
      ? RAW_SITE_URL
      : `https://${RAW_SITE_URL}`
    : DEFAULT_SITE_URL;

const APP_TITLE = "Aadhaar Sahayak";
const APP_DESCRIPTION =
  "Plan your Aadhaar enrolment or update with a step-by-step document checklist, eligibility guide, and advisory reference.";

export const metadata: Metadata = {
  metadataBase: new URL(NORMALISED_SITE_URL),
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "Aadhaar",
    "UIDAI",
    "document checklist",
    "address update",
    "enrolment",
    "identity proof",
    "India",
  ],
  authors: [{ name: "Aadhaar Sahayak Team" }],
  icons: {
    icon: [{ url: "/AadhaarLogo.png", type: "image/png", sizes: "512x512" }],
    apple: { url: "/AadhaarLogo.png" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    url: NORMALISED_SITE_URL,
    siteName: APP_TITLE,
    images: [
      {
        url: "/AadhaarLogo.png",
        width: 1200,
        height: 630,
        alt: "Aadhaar Sahayak logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: ["/AadhaarLogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
