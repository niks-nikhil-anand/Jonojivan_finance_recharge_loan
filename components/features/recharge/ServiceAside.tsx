import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { offers } from "@/lib/data/offers";
import { services } from "@/lib/data/services";
import type { ServiceSlug } from "@/types";

interface ServiceAsideProps {
  current: ServiceSlug;
  steps: string[];
}

/** Desktop sidebar (stacks below on mobile): how-to, a relevant offer and other services. */
export function ServiceAside({ current, steps }: ServiceAsideProps) {
  const offer = offers.find((o) => o.cta.href.endsWith(`/${current}`)) ?? offers.find((o) => o.category === "promotions");
  return (
    <aside className="flex flex-col gap-4">
      <Card padding="sm">
        <h2 className="font-semibold text-slate-900">How it works</h2>
        <ol className="mt-3 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-slate-600">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </Card>
      {offer && (
        <Link href="/offers" className="rounded-card bg-linear-to-br from-emerald-600 to-emerald-500 p-5 text-white shadow-card">
          <p className="text-xs font-semibold tracking-wider text-emerald-100 uppercase">Offer</p>
          <p className="mt-1 font-semibold">{offer.title}</p>
          {offer.code && <p className="mt-2 inline-block rounded-lg bg-white/20 px-2 py-0.5 font-mono text-sm">{offer.code}</p>}
        </Link>
      )}
      <Card padding="sm">
        <h2 className="font-semibold text-slate-900">Other services</h2>
        <ul className="mt-3 grid grid-cols-4 gap-2 lg:grid-cols-3">
          {services
            .filter((s) => s.slug !== current)
            .map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="flex flex-col items-center gap-1 rounded-xl p-2 text-center text-xs font-medium text-slate-700 hover:bg-slate-50">
                  <span className="text-2xl" aria-hidden="true">
                    {s.icon}
                  </span>
                  {s.label}
                </Link>
              </li>
            ))}
        </ul>
      </Card>
    </aside>
  );
}
