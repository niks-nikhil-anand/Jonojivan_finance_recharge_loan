import { billProviders } from "@/lib/data/bill-providers";
import type { Bill, BillCategory } from "@/types";
import { daysFromNow, delay, hash, mockName } from "./mock";

export class BillFetchError extends Error {
  constructor(
    public code: "not_found" | "no_due",
    message: string,
  ) {
    super(message);
  }
}

const amountRange: Record<BillCategory, [min: number, spread: number]> = {
  electricity: [350, 2800],
  broadband: [499, 1200],
  fastag: [0, 0],
  gas: [250, 900],
  water: [150, 700],
  landline: [299, 600],
  insurance: [1800, 12000],
};

/**
 * Mock bill fetch. Deterministic per identifier.
 * Identifiers ending in 0000 → not found, ending in 1111 → no amount due.
 */
export async function fetchBill(category: BillCategory, providerId: string, identifier: string): Promise<Bill> {
  await delay();
  const id = identifier.toUpperCase();
  if (id.endsWith("0000")) {
    throw new BillFetchError("not_found", "No account found for these details. Please check the number on your bill and try again.");
  }
  if (id.endsWith("1111")) {
    throw new BillFetchError("no_due", "Great news — there’s no amount due on this account right now.");
  }

  const seed = hash(`${category}:${providerId}:${id}`);
  const [min, spread] = amountRange[category];
  const base = {
    customerName: mockName(seed),
    billNumber: `${category.slice(0, 2).toUpperCase()}${seed % 10000000}`,
    billDate: daysFromNow(-15),
    dueDate: daysFromNow(3 + (seed % 12)),
  };

  if (category === "fastag") {
    return { ...base, amount: 0, balance: 50 + (seed % 450) };
  }
  return { ...base, amount: min + (seed % spread) };
}

export function getBillProvider(category: BillCategory, providerId: string) {
  return billProviders[category].find((p) => p.id === providerId);
}
