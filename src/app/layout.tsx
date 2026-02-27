import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradesQuote — Quote on Site. Invoice in Seconds. UK Trades.",
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
        </body>
      </html>
    </ClerkProvider>
  );
}
