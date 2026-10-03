import { Input, SelectField } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import type { StepProps } from "../schema";

export function PersonalStep({ values, errors, set }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input
        label="Full Name (as per PAN)"
        autoComplete="name"
        value={values.fullName}
        onChange={(e) => set("fullName", e.target.value)}
        error={errors.fullName}
        wrapperClassName="sm:col-span-2"
      />
      <Input
        label="Mobile Number"
        leading="+91"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={values.mobile}
        onChange={(e) => set("mobile", onlyDigits(e.target.value, 10))}
        error={errors.mobile}
      />
      <Input label="Email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      <Input label="Date of Birth" type="date" autoComplete="bday" value={values.dob} onChange={(e) => set("dob", e.target.value)} error={errors.dob} />
      <SelectField
        label="Gender"
        placeholder="Select"
        options={[
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
          { value: "other", label: "Other" },
        ]}
        value={values.gender}
        onChange={(e) => set("gender", e.target.value)}
        error={errors.gender}
      />
      <Input
        label="PIN Code"
        inputMode="numeric"
        autoComplete="postal-code"
        value={values.pincode}
        onChange={(e) => set("pincode", onlyDigits(e.target.value, 6))}
        error={errors.pincode}
      />
      <Input label="City" autoComplete="address-level2" value={values.city} onChange={(e) => set("city", e.target.value)} error={errors.city} />
    </div>
  );
}
