import { Input, SelectField } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import type { StepProps } from "../schema";

export function EmploymentStep({ values, errors, set }: StepProps) {
  const salaried = values.employmentType !== "self-employed" && values.employmentType !== "business";
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <SelectField
        label="Employment Type"
        placeholder="Select"
        options={[
          { value: "salaried", label: "Salaried" },
          { value: "self-employed", label: "Self-employed Professional" },
          { value: "business", label: "Business Owner" },
        ]}
        value={values.employmentType}
        onChange={(e) => set("employmentType", e.target.value)}
        error={errors.employmentType}
      />
      <Input
        label="Monthly Income"
        leading="₹"
        inputMode="numeric"
        value={values.monthlyIncome}
        onChange={(e) => set("monthlyIncome", onlyDigits(e.target.value, 8))}
        error={errors.monthlyIncome}
        hint="Net monthly take-home"
      />
      <Input
        label={salaried ? "Company Name" : "Business / Practice Name"}
        autoComplete="organization"
        value={values.organisation}
        onChange={(e) => set("organisation", e.target.value)}
        error={errors.organisation}
      />
      <SelectField
        label={salaried ? "Total Work Experience" : "Business Vintage"}
        placeholder="Select"
        options={[
          { value: "<1", label: "Less than 1 year" },
          { value: "1-3", label: "1 – 3 years" },
          { value: "3-5", label: "3 – 5 years" },
          { value: "5+", label: "More than 5 years" },
        ]}
        value={values.experience}
        onChange={(e) => set("experience", e.target.value)}
        error={errors.experience}
      />
    </div>
  );
}
