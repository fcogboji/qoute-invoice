import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import CookieBanner from "@/components/cookie-banner";
import StructuredData from "@/components/structured-data";
import OrganizationSchema from "@/components/organization-schema";
import Script from "next/script";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tradeinvoice.co.uk"),
  title: {
    default: "TradeInvoice – Simple Invoicing for UK Tradespeople",
    template: "%s | TradeInvoice",
  },
  description:
    "TradeInvoice helps UK tradespeople create, manage and track quotes and invoices easily. Built for electricians, plumbers, builders and contractors.",
  keywords: [
    "invoice software",
    "quote software",
    "UK tradespeople invoicing",
    "invoice generator",
    "plumber invoice",
    "electrician invoice",
    "TradeInvoice",
  ],
  authors: [{ name: "TradeInvoice" }],
  creator: "TradeInvoice",
  openGraph: {
    title: "TradeInvoice – Simple Invoicing for UK Tradespeople",
    description:
      "Create and manage professional quotes and invoices for your trade business. UK VAT sorted. Works on your phone.",
    url: "https://tradeinvoice.co.uk",
    siteName: "TradeInvoice",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeInvoice – Simple Invoicing for UK Tradespeople",
    description: "Create and manage professional quotes and invoices for your trade business.",
  },
  verification: {
    google: "10hbxiokmLm8SHIbF",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased font-sans">
          <StructuredData />
          <OrganizationSchema />
          {children}
          <script src="https://24-7concept-pew4inhis-friday-s-projects.vercel.app/widget.js" defer data-api-base="https://24-7concept-pew4inhis-friday-s-projects.vercel.app" data-bot-id="cmnj5dx73000320k23wzzbdj8" data-brand="tradeinvoice"></script>
          <CookieBanner />
          
       
        </body>
      </html>
    </ClerkProvider>
  );
}
