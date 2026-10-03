import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Plan } from "@/types";

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
  highlighted?: boolean;
}

export function PlanCard({ plan, onSelect, highlighted }: PlanCardProps) {
  const details = [
    { label: "Data", value: plan.data },
    { label: "Validity", value: plan.validity },
    { label: "Calls", value: plan.calls },
    { label: "SMS", value: plan.sms },
  ].filter((d) => d.value !== "—");

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-white p-5 shadow-card transition-shadow hover:shadow-lg",
        highlighted ? "border-brand-500 ring-2 ring-brand-100" : "border-slate-200/70",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-3xl font-extrabold text-slate-900">₹{plan.price}</p>
        {plan.categories.includes("popular") && (
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">Popular</span>
        )}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {details.map((d) => (
          <div key={d.label}>
            <dt className="text-xs text-slate-500">{d.label}</dt>
            <dd className="font-semibold text-slate-900">{d.value}</dd>
          </div>
        ))}
      </dl>
      {plan.extras && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {plan.extras.map((e) => (
            <li key={e} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              {e}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-5">
        <Button onClick={() => onSelect(plan)} fullWidth variant={highlighted ? "primary" : "secondary"}>
          Recharge
        </Button>
      </div>
    </article>
  );
}
