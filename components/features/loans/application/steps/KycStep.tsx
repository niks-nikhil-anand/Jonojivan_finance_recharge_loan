import { Checkbox } from "@/components/ui/Checkbox";
import { Input, Textarea } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import type { StepProps } from "../schema";

export function KycStep({ values, errors, set }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input
        label="PAN Number"
        placeholder="ABCDE1234F"
        autoCapitalize="characters"
        autoComplete="off"
        value={values.pan}
        onChange={(e) => set("pan", e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 10))}
        error={errors.pan}
      />
      <Input
        label="Aadhaar Number"
        inputMode="numeric"
        autoComplete="off"
        placeholder="12-digit Aadhaar"
        value={values.aadhaar}
        onChange={(e) => set("aadhaar", onlyDigits(e.target.value, 12))}
        error={errors.aadhaar}
        hint="Only the last 4 digits are shown after submission."
      />
      <div className="sm:col-span-2">
        <Textarea
          label="Current Address"
          autoComplete="street-address"
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          error={errors.address}
        />
      </div>
      <div className="sm:col-span-2">
        <Checkbox
          checked={values.kycConsent === "yes"}
          onChange={(checked) => set("kycConsent", checked ? "yes" : "")}
          error={errors.kycConsent}
          label="I authorise Jonojivan and its lending partners to verify my KYC details and fetch my credit report for this application."
        />
      </div>
    </div>
  );
}
