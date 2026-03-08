import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAT Calculator",
  description:
    "Calculate UK VAT (20%) online. Add or extract VAT with the TradeInvoice VAT calculator.",
};

export default function VATCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
