export interface EmiBreakdown {
  emi: number;
  principal: number;
  interest: number;
  total: number;
}

/**
 * Standard reducing-balance EMI. The EMI is rounded to the rupee and the
 * totals are derived from that rounded figure, matching what a borrower pays.
 */
export function calculateEmi(principal: number, annualRate: number, months: number): EmiBreakdown {
  if (principal <= 0 || months <= 0) {
    return { emi: 0, principal: 0, interest: 0, total: 0 };
  }
  const r = annualRate / 12 / 100;
  const raw = r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  const emi = Math.round(raw);
  const total = emi * months;
  return { emi, principal, interest: total - principal, total };
}

/** Largest principal serviceable by a given EMI. */
export function principalForEmi(emi: number, annualRate: number, months: number) {
  if (emi <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return emi * months;
  return (emi * ((1 + r) ** months - 1)) / (r * (1 + r) ** months);
}
