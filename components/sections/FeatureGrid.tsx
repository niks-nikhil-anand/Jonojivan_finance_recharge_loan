import { cn } from "@/lib/cn";
import type { LoanFeature } from "@/types";

/** Visual benefit cards. */
export function FeatureGrid({ items, columns = 3 }: { items: LoanFeature[]; columns?: 3 | 4 | 5 }) {
  return (
    <ul
      className={cn(
        "grid gap-3 sm:grid-cols-2 sm:gap-4",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
        columns === 5 && "lg:grid-cols-5",
      )}
    >
      {items.map((item) => (
        <li key={item.title} className="flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card lg:flex-col">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-2xl" aria-hidden="true">
            {item.icon}
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
