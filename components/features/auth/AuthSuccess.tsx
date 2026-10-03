import { ButtonLink } from "@/components/ui/Button";

export function AuthSuccess({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center text-center" aria-live="polite">
      <span className="grid size-20 place-items-center rounded-full bg-emerald-50 text-4xl ring-8 ring-emerald-100" aria-hidden="true">
        ✓
      </span>
      <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-slate-600">{message}</p>
      <div className="mt-8 grid w-full gap-3">
        <ButtonLink href="/recharge/mobile" size="lg" fullWidth>
          Recharge Now
        </ButtonLink>
        <ButtonLink href="/loans/apply" variant="outline" size="lg" fullWidth>
          Apply for Loan
        </ButtonLink>
        <ButtonLink href="/" variant="ghost" fullWidth>
          Go to Home
        </ButtonLink>
      </div>
    </div>
  );
}
