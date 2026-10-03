import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate, formatINR } from "@/lib/format";

interface SubmittedStepProps {
  referenceId: string;
  submittedAt: string;
  name: string;
  amount: number;
}

const next = [
  { title: "Verification call", description: "Our team will call you within 1 working day." },
  { title: "Document check", description: "We verify your KYC and income documents." },
  { title: "Decision", description: "You’ll receive the decision by SMS and email." },
];

export function SubmittedStep({ referenceId, submittedAt, name, amount }: SubmittedStepProps) {
  return (
    <Card padding="lg" className="mx-auto w-full max-w-xl text-center" aria-live="polite">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-50 text-4xl ring-8 ring-emerald-100" aria-hidden="true">
        ✓
      </span>
      <h2 className="mt-5 text-2xl font-bold text-slate-900">Application Submitted</h2>
      <p className="mt-2 text-slate-600">
        Thank you, {name.split(" ")[0]}. Your application for {formatINR(amount)} has been received.
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-3 text-left text-sm">
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-slate-500">Reference ID</dt>
          <dd className="mt-0.5 font-mono font-bold text-slate-900">{referenceId}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-slate-500">Submitted on</dt>
          <dd className="mt-0.5 font-bold text-slate-900">{formatDate(submittedAt)}</dd>
        </div>
      </dl>
      <ol className="mt-6 space-y-3 text-left">
        {next.map((n, i) => (
          <li key={n.title} className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{i + 1}</span>
            <div>
              <p className="font-semibold text-slate-900">{n.title}</p>
              <p className="text-sm text-slate-500">{n.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/transactions?type=loan" fullWidth size="lg">
          Track Application
        </ButtonLink>
        <ButtonLink href="/" variant="outline" fullWidth size="lg">
          Back to Home
        </ButtonLink>
      </div>
    </Card>
  );
}
