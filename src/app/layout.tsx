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
  "Official web application to help you plan your Aadhaar enrolment or update with step-by-step document checklists, eligibility guides, and advisory references. Comprehensive support for all age groups, document types, and special categories including OCI, NRI, and foreign nationals.";

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
    "Aadhaar enrolment",
    "Aadhaar update",
    "document checklist",
    "address update",
    "name update",
    "date of birth update",
    "identity proof",
    "address proof",
    "POI",
    "POA",
    "POR",
    "proof of relationship",
    "India",
    "Indian passport",
    "voter ID",
    "driving license",
    "PAN card",
    "ration card",
    "OCI",
    "NRI",
    "foreign nationals",
    "Nepal Bhutan nationals",
    "LTV visa",
    "UIDAI documents",
    "Aadhaar card",
    "online Aadhaar update",
    "Aadhaar services",
  ],
  authors: [{ name: "Aadhaar Sahayak Team" }],
  creator: "Aadhaar Sahayak",
  publisher: "Aadhaar Sahayak",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/AadhaarLogo.png", type: "image/png", sizes: "512x512" }],
    apple: { url: "/AadhaarLogo.png", sizes: "512x512", type: "image/png" },
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
        alt: "Aadhaar Sahayak - Document Checklist & Eligibility Guide",
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
    creator: "@AadhaarSahayak",
  },
  category: "Government Services",
  alternates: {
    canonical: NORMALISED_SITE_URL,
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
