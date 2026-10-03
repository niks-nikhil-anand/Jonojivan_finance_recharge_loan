"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { calculateEmi } from "@/lib/emi";
import { formatINR, formatNumber } from "@/lib/format";
import { useState } from "react";

interface EmiCalculatorProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenure?: number;
  amountRange?: { min: number; max: number };
  tenureRange?: { min: number; max: number };
  loanType?: "personal" | "business";
}

export function EmiCalculator({
  defaultAmount = 200000,
  defaultRate = 12,
  defaultTenure = 24,
  amountRange = { min: 10000, max: 5000000 },
  tenureRange = { min: 6, max: 84 },
  loanType,
}: EmiCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  const clamped = {
    amount: Math.min(amountRange.max, Math.max(amountRange.min, amount)),
    rate: Math.min(30, Math.max(1, rate)),
    tenure: Math.min(tenureRange.max, Math.max(tenureRange.min, tenure)),
  };
  const result = calculateEmi(clamped.amount, clamped.rate, clamped.tenure);
  const principalShare = result.total ? (result.principal / result.total) * 100 : 0;

  const params = new URLSearchParams({ amount: String(clamped.amount), tenure: String(clamped.tenure) });
  if (loanType) params.set("type", loanType);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
      <Card className="flex flex-col gap-8">
        <Slider
          label="Loan Amount"
          value={amount}
          onChange={setAmount}
          min={amountRange.min}
          max={amountRange.max}
          step={5000}
          display={formatINR(clamped.amount)}
          minLabel={formatINR(amountRange.min)}
          maxLabel={formatINR(amountRange.max)}
          input={{ prefix: "₹", ariaLabel: "Loan amount in rupees" }}
        />
        <Slider
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
          min={8}
          max={30}
          step={0.25}
          display={`${clamped.rate}%`}
          minLabel="8%"
          maxLabel="30%"
          input={{ suffix: "%", ariaLabel: "Annual interest rate in percent" }}
        />
        <Slider
          label="Tenure"
          value={tenure}
          onChange={setTenure}
          min={tenureRange.min}
          max={tenureRange.max}
          step={1}
          display={`${clamped.tenure} Months`}
          minLabel={`${tenureRange.min} months`}
          maxLabel={`${tenureRange.max} months`}
          input={{ suffix: "Mo", ariaLabel: "Tenure in months" }}
        />
      </Card>

      <Card className="flex flex-col bg-slate-900 text-white" aria-live="polite">
        <p className="text-sm font-medium text-slate-300">Monthly EMI</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">{formatINR(result.emi)}</p>
        <p className="mt-1 text-sm text-slate-400">for {clamped.tenure} months</p>

        <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-slate-700" aria-hidden="true">
          <span className="bg-brand-400" style={{ width: `${principalShare}%` }} />
          <span className="flex-1 bg-amber-400" />
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-slate-300">
              <span className="size-2.5 rounded-full bg-brand-400" aria-hidden="true" /> Principal
            </dt>
            <dd className="font-semibold">₹{formatNumber(result.principal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-slate-300">
              <span className="size-2.5 rounded-full bg-amber-400" aria-hidden="true" /> Interest
            </dt>
            <dd className="font-semibold">₹{formatNumber(result.interest)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-slate-700 pt-3">
            <dt className="font-medium text-slate-200">Total Payable</dt>
            <dd className="text-lg font-bold">₹{formatNumber(result.total)}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          <ButtonLink href={`/loans/apply?${params}`} variant="white" fullWidth size="lg">
            Apply for Loan
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}
