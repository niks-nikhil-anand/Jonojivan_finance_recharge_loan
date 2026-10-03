import Link from "next/link";
import { StatusBadge } from "@/components/ui/Badge";
import { services } from "@/lib/data/services";
import { formatDate, formatINR, maskTail } from "@/lib/format";
import type { Transaction } from "@/types";

export function transactionIcon(t: Transaction) {
  if (t.service === "loan") return "💰";
  return services.find((s) => s.slug === t.service)?.icon ?? "🧾";
}

/** Masks phone/account style references; leaves descriptive ones (loan) intact. */
export function displayReference(t: Transaction) {
  return t.type === "loan" ? t.reference : maskTail(t.reference);
}

export function TransactionItem({ transaction: t }: { transaction: Transaction }) {
  return (
    <Link href={`/transactions/${t.id}`} className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-slate-100 text-2xl" aria-hidden="true">
        {transactionIcon(t)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900">{t.title}</p>
        <p className="truncate text-sm text-slate-500">
          {t.provider} · {displayReference(t)}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">{formatDate(t.date)}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-bold text-slate-900">{formatINR(t.amount)}</span>
        <StatusBadge status={t.status} />
      </div>
    </Link>
  );
}
