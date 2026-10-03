import Link from "next/link";
import { cn } from "@/lib/cn";
import { services } from "@/lib/data/services";

/** All recharge & bill services. 2 cols mobile → 3 tablet → 5 desktop (or 9 in compact). */
export function ServiceGrid({ compact }: { compact?: boolean }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4", compact ? "lg:grid-cols-9" : "lg:grid-cols-5")}>
      {services.map((s) => (
        <li key={s.slug}>
          <Link
            href={s.href}
            className={cn(
              "group flex h-full items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg",
              compact ? "lg:flex-col lg:p-3 lg:text-center" : "sm:flex-col sm:items-start sm:p-5",
            )}
          >
            <span
              className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-2xl transition-colors group-hover:bg-brand-100"
              aria-hidden="true"
            >
              {s.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">{s.label}</span>
              <span className={cn("block truncate text-xs text-slate-500", compact && "lg:hidden")}>{s.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
