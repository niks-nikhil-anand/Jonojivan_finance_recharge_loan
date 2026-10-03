"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, SelectField } from "@/components/ui/Field";
import { StickyCTA } from "@/components/ui/Layout";
import { cn } from "@/lib/cn";
import type { EligibilityResult } from "@/lib/eligibility";
import { formatINR, onlyDigits } from "@/lib/format";
import { submitEligibilityCheck } from "@/lib/services/loans";
import type { EmploymentType } from "@/types";

const employmentOptions: { value: EmploymentType; label: string }[] = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self-employed Professional" },
  { value: "business", label: "Business Owner" },
];

interface Values {
  income: string;
  employment: EmploymentType;
  amount: string;
  existingEmi: string;
  age: string;
}

type Errors = Partial<Record<keyof Values, string>>;

export function EligibilityChecker() {
  const [values, setValues] = useState<Values>({ income: "", employment: "salaried", amount: "", existingEmi: "", age: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit() {
    const next: Errors = {};
    if (!Number(values.income)) next.income = "Enter your monthly income";
    if (!Number(values.amount)) next.amount = "Enter the loan amount you need";
    const age = Number(values.age);
    if (!age || age < 18 || age > 80) next.age = "Enter a valid age";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      setResult(
        await submitEligibilityCheck({
          monthlyIncome: Number(values.income),
          employmentType: values.employment,
          loanAmount: Number(values.amount),
          existingEmi: Number(values.existingEmi) || 0,
          age,
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const tone = {
      eligible: { icon: "🎉", title: "You’re eligible!", box: "bg-emerald-50 text-emerald-800 ring-emerald-100" },
      partial: { icon: "👍", title: "You’re eligible for a lower amount", box: "bg-amber-50 text-amber-800 ring-amber-100" },
      ineligible: { icon: "😕", title: "Not eligible right now", box: "bg-rose-50 text-rose-800 ring-rose-100" },
    }[result.status];
    const applyAmount = result.status === "partial" ? result.maxAmount : result.requestedAmount;

    return (
      <Card padding="lg" className="mx-auto w-full max-w-xl" aria-live="polite">
        <div className={cn("rounded-2xl p-6 text-center ring-8", tone.box)}>
          <span className="text-5xl" aria-hidden="true">
            {tone.icon}
          </span>
          <h2 className="mt-3 text-2xl font-bold">{tone.title}</h2>
          {result.status !== "ineligible" && (
            <>
              <p className="mt-4 text-sm font-medium opacity-80">Estimated eligible amount</p>
              <p className="text-4xl font-extrabold text-slate-900">{formatINR(result.maxAmount)}</p>
            </>
          )}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-slate-500">You asked for</dt>
            <dd className="mt-0.5 text-lg font-bold text-slate-900">{formatINR(result.requestedAmount)}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-slate-500">Affordable EMI</dt>
            <dd className="mt-0.5 text-lg font-bold text-slate-900">{formatINR(result.maxEmi)}/mo</dd>
          </div>
        </dl>

        {result.reasons.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            {result.reasons.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden="true">•</span>
                {r}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-5 text-xs text-slate-500">
          This is an indicative estimate based on a 60-month tenure at 12% p.a. Final eligibility depends on verification and credit assessment.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {result.status !== "ineligible" ? (
            <ButtonLink href={`/loans/apply?amount=${applyAmount}`} fullWidth size="lg">
              Apply for {formatINR(applyAmount)}
            </ButtonLink>
          ) : (
            <ButtonLink href="/support" fullWidth size="lg">
              Talk to us
            </ButtonLink>
          )}
          <Button variant="outline" fullWidth size="lg" onClick={() => setResult(null)}>
            Check Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="mx-auto w-full max-w-2xl"
    >
      <Card className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Monthly Income"
          leading="₹"
          inputMode="numeric"
          placeholder="50,000"
          value={values.income}
          onChange={(e) => set("income", onlyDigits(e.target.value, 8))}
          error={errors.income}
          hint="Net take-home income"
        />
        <SelectField
          label="Employment Type"
          options={employmentOptions}
          value={values.employment}
          onChange={(e) => set("employment", e.target.value as EmploymentType)}
        />
        <Input
          label="Loan Amount"
          leading="₹"
          inputMode="numeric"
          placeholder="2,00,000"
          value={values.amount}
          onChange={(e) => set("amount", onlyDigits(e.target.value, 8))}
          error={errors.amount}
        />
        <Input
          label="Existing EMI"
          leading="₹"
          inputMode="numeric"
          placeholder="0"
          value={values.existingEmi}
          onChange={(e) => set("existingEmi", onlyDigits(e.target.value, 7))}
          hint="Total of all current monthly EMIs"
        />
        <Input
          label="Age"
          inputMode="numeric"
          placeholder="30"
          value={values.age}
          onChange={(e) => set("age", onlyDigits(e.target.value, 2))}
          error={errors.age}
          trailing={<span className="text-sm text-slate-500">years</span>}
        />
        <div className="sm:col-span-2">
          <StickyCTA>
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Check Eligibility
            </Button>
          </StickyCTA>
        </div>
      </Card>
      <p className="mt-4 text-center text-xs text-slate-500">Checking eligibility does not affect your credit score.</p>
    </form>
  );
}
