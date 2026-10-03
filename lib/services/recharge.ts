import { circles, dthProviders, operators } from "@/lib/data/operators";
import { buildPlans, dthPlans } from "@/lib/data/plans";
import type { Bill, DthAccount, Plan } from "@/types";
import { daysFromNow, delay, hash, mockName, newTransactionId, pick } from "./mock";

export interface PaymentResult {
  status: "success" | "pending" | "failed";
  transactionId: string;
  amount: number;
  date: string;
  message?: string;
}

/** Mock operator/circle lookup from the number series. */
export function detectOperator(mobile: string) {
  if (mobile.length !== 10) return null;
  const seed = hash(mobile.slice(0, 5));
  const operator = pick(operators.slice(0, 4), seed);
  const circle = pick(circles, Math.floor(seed / 11));
  return { operatorId: operator.id, circleId: circle.id };
}

export async function getPlans(operatorId: string): Promise<Plan[]> {
  await delay(500);
  return buildPlans(operatorId);
}

export async function fetchPostpaidBill(mobile: string): Promise<Bill> {
  await delay();
  const seed = hash(mobile);
  return {
    customerName: mockName(seed),
    billNumber: `PB${seed % 1000000}`,
    billDate: daysFromNow(-12),
    dueDate: daysFromNow(8),
    amount: 399 + (seed % 900),
  };
}

export async function fetchDthAccount(providerId: string, subscriberId: string): Promise<DthAccount> {
  await delay();
  if (/^0+$/.test(subscriberId) || subscriberId.endsWith("0000")) {
    throw new Error("We couldn’t find an account with this Subscriber ID. Please check and try again.");
  }
  const seed = hash(providerId + subscriberId);
  const current = pick(dthPlans.slice(0, 3), seed);
  const balance = seed % 120;
  return {
    customerName: mockName(seed),
    subscriberId,
    currentPlan: current.name,
    monthlyAmount: current.price,
    balance,
    dueAmount: Math.max(0, current.price - balance),
    nextRechargeDate: daysFromNow(2 + (seed % 5)),
    recommendedPlans: dthPlans,
  };
}

export function getDthProvider(id: string) {
  return dthProviders.find((p) => p.id === id);
}

/** Mock payment — always succeeds after a short delay. */
export async function processPayment(amount: number): Promise<PaymentResult> {
  await delay(1200);
  return {
    status: "success",
    transactionId: newTransactionId(),
    amount,
    date: new Date().toISOString(),
  };
}
