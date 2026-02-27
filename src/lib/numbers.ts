import { prisma } from "./prisma";

export async function generateQuoteNumber(userId: string): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.quote.count({
    where: { userId },
  });
  const seq = String(count + 1).padStart(3, "0");
  return `Q-${year}-${seq}`;
}

export async function generateInvoiceNumber(userId: string): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count({
    where: { userId },
  });
  const seq = String(count + 1).padStart(3, "0");
  return `INV-${year}-${seq}`;
}
