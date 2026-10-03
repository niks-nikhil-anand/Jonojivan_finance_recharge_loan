import { Checkbox } from "@/components/ui/Checkbox";
import { calculateEmi } from "@/lib/emi";
import { formatDate, formatINR, maskTail } from "@/lib/format";
import type { StepProps } from "../schema";

interface ReviewStepProps extends StepProps {
  onEdit: (step: number) => void;
}

const employmentLabel: Record<string, string> = {
  salaried: "Salaried",
  "self-employed": "Self-employed Professional",
  business: "Business Owner",
};

export function ReviewStep({ values, errors, set, onEdit }: ReviewStepProps) {
  const amount = Number(values.amount);
  const tenure = Number(values.tenure);
  const emi = calculateEmi(amount, values.loanType === "business" ? 15 : 12, tenure).emi;

  const sections = [
    {
      title: "Personal Information",
      step: 0,
      rows: [
        ["Name", values.fullName],
        ["Mobile", `+91 ${values.mobile}`],
        ["Email", values.email],
        ["Date of Birth", values.dob ? formatDate(values.dob) : ""],
        ["City", `${values.city} – ${values.pincode}`],
      ],
    },
    {
      title: "Employment Details",
      step: 1,
      rows: [
        ["Type", employmentLabel[values.employmentType] ?? ""],
        ["Monthly Income", formatINR(Number(values.monthlyIncome))],
        ["Organisation", values.organisation],
      ],
    },
    {
      title: "Loan Requirements",
      step: 2,
      rows: [
        ["Loan Type", values.loanType === "business" ? "Business Loan" : "Personal Loan"],
        ["Amount", formatINR(amount)],
        ["Tenure", `${tenure} months`],
        ["Purpose", values.purpose],
        ["Estimated EMI", `${formatINR(emi)}/mo`],
      ],
    },
    {
      title: "KYC Details",
      step: 3,
      rows: [
        ["PAN", values.pan],
        ["Aadhaar", maskTail(values.aadhaar)],
      ],
    },
    {
      title: "Documents",
      step: 4,
      rows: [
        ["Identity Proof", values.idProof],
        ["Address Proof", values.addressProof],
        ["Income Proof", values.incomeProof],
        ["Photograph", values.photo || "Not provided"],
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {sections.map((s) => (
        <section key={s.title} className="rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h3 className="font-semibold text-slate-900">{s.title}</h3>
            <button type="button" onClick={() => onEdit(s.step)} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              Edit
            </button>
          </div>
          <dl className="divide-y divide-slate-100 px-4 text-sm">
            {s.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-slate-500">{k}</dt>
                <dd className="min-w-0 truncate text-right font-medium text-slate-900">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <Checkbox
        checked={values.terms === "yes"}
        onChange={(checked) => set("terms", checked ? "yes" : "")}
        error={errors.terms}
        label="I confirm the information provided is correct and agree to the Terms & Conditions and Privacy Policy."
      />
    </div>
  );
}
