import { SegmentedControl } from "@/components/ui/Chips";
import { Input, SelectField } from "@/components/ui/Field";
import { calculateEmi } from "@/lib/emi";
import { formatINR, onlyDigits } from "@/lib/format";
import { purposeOptions, tenureOptions, type StepProps } from "../schema";

export function LoanStep({ values, errors, set }: StepProps) {
  const type = values.loanType === "business" ? "business" : "personal";
  const amount = Number(values.amount);
  const tenure = Number(values.tenure);
  const estimate = amount && tenure ? calculateEmi(amount, type === "business" ? 15 : 12, tenure) : null;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <p className="mb-1.5 text-sm font-medium text-slate-700">Loan Type</p>
        <SegmentedControl
          label="Loan type"
          value={type}
          onChange={(v) => {
            set("loanType", v);
            set("purpose", "");
          }}
          options={[
            { value: "personal", label: "Personal Loan" },
            { value: "business", label: "Business Loan" },
          ]}
        />
      </div>
      <Input
        label="Loan Amount"
        leading="₹"
        inputMode="numeric"
        value={values.amount}
        onChange={(e) => set("amount", onlyDigits(e.target.value, 8))}
        error={errors.amount}
        hint="₹50,000 – ₹50,00,000"
      />
      <SelectField
        label="Tenure"
        placeholder="Select"
        options={tenureOptions.map((t) => ({ value: String(t), label: `${t} months` }))}
        value={values.tenure}
        onChange={(e) => set("tenure", e.target.value)}
        error={errors.tenure}
      />
      <div className="sm:col-span-2">
        <SelectField
          label="Purpose of Loan"
          placeholder="Select"
          options={purposeOptions[type].map((p) => ({ value: p, label: p }))}
          value={values.purpose}
          onChange={(e) => set("purpose", e.target.value)}
          error={errors.purpose}
        />
      </div>
      {estimate && (
        <div className="flex items-center justify-between rounded-2xl bg-brand-50 px-5 py-4 sm:col-span-2">
          <span className="text-sm text-brand-800">Estimated EMI</span>
          <span className="text-xl font-bold text-slate-900">{formatINR(estimate.emi)}/mo</span>
        </div>
      )}
    </div>
  );
}
