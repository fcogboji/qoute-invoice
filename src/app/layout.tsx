import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import CookieBanner from "@/components/cookie-banner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "tradeinvoice — Quote on Site. Invoice in Seconds. UK Trades.",
  description:
    "The quoting app for UK tradespeople. Electricians, plumbers, builders, fitters. No paperwork. 20% VAT sorted. Works on your phone.",
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
          {children}
          <CookieBanner />
        </body>
      </html>
    </ClerkProvider>
  );
}
