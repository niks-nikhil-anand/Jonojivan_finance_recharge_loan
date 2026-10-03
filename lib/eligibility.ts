import { principalForEmi } from "@/lib/emi";
import type { EmploymentType } from "@/types";

export interface EligibilityInput {
  monthlyIncome: number;
  employmentType: EmploymentType;
  loanAmount: number;
  existingEmi: number;
  age: number;
}

export interface EligibilityResult {
  status: "eligible" | "partial" | "ineligible";
  maxAmount: number;
  maxEmi: number;
  requestedAmount: number;
  reasons: string[];
}

const RULES: Record<EmploymentType, { foir: number; minIncome: number; minAge: number; maxAge: number }> = {
  salaried: { foir: 0.5, minIncome: 20000, minAge: 21, maxAge: 60 },
  "self-employed": { foir: 0.45, minIncome: 25000, minAge: 23, maxAge: 65 },
  business: { foir: 0.45, minIncome: 30000, minAge: 24, maxAge: 65 },
};

/** Indicative rate and tenure used only for the estimate. */
const ESTIMATE_RATE = 12;
const ESTIMATE_TENURE = 60;

/** Rule-of-thumb estimate (fixed-obligation-to-income ratio). Not a credit decision. */
export function checkEligibility(input: EligibilityInput): EligibilityResult {
  const rule = RULES[input.employmentType];
  const reasons: string[] = [];

  if (input.age < rule.minAge || input.age > rule.maxAge) {
    reasons.push(`Applicants must be between ${rule.minAge} and ${rule.maxAge} years for this employment type.`);
  }
  if (input.monthlyIncome < rule.minIncome) {
    reasons.push(`Minimum monthly income required is ₹${rule.minIncome.toLocaleString("en-IN")}.`);
  }

  const maxEmi = Math.max(0, input.monthlyIncome * rule.foir - input.existingEmi);
  if (maxEmi <= 0) {
    reasons.push("Your existing EMIs already use most of your eligible income.");
  }

  const maxAmount = Math.floor(principalForEmi(maxEmi, ESTIMATE_RATE, ESTIMATE_TENURE) / 1000) * 1000;

  if (reasons.length > 0) {
    return { status: "ineligible", maxAmount: 0, maxEmi: 0, requestedAmount: input.loanAmount, reasons };
  }
  if (maxAmount < input.loanAmount) {
    return {
      status: "partial",
      maxAmount,
      maxEmi,
      requestedAmount: input.loanAmount,
      reasons: ["The requested amount is higher than your estimated eligibility. You can apply for a lower amount or a longer tenure."],
    };
  }
  return { status: "eligible", maxAmount, maxEmi, requestedAmount: input.loanAmount, reasons: [] };
}
