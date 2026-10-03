import { checkEligibility, type EligibilityInput } from "@/lib/eligibility";
import { delay } from "./mock";

export async function submitEligibilityCheck(input: EligibilityInput) {
  await delay(600);
  return checkEligibility(input);
}

export async function submitLoanApplication(): Promise<{ referenceId: string; submittedAt: string }> {
  await delay(1200);
  return {
    referenceId: `JJLN${Math.floor(10000 + Math.random() * 90000)}`,
    submittedAt: new Date().toISOString(),
  };
}

export async function submitSupportRequest(): Promise<{ ticketId: string }> {
  await delay(800);
  return { ticketId: `SR${Math.floor(100000 + Math.random() * 900000)}` };
}
