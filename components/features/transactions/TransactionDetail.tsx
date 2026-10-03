import { statusMeta } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatDate, formatINR, formatTime } from "@/lib/format";
import type { Transaction } from "@/types";
import { PrintReceiptButton } from "./PrintReceiptButton";
import { displayReference, transactionIcon } from "./TransactionItem";

const headline: Record<Transaction["type"], string> = {
  recharge: "Recharge",
  bill: "Payment",
  loan: "Application",
};

const statusWord: Record<Transaction["status"], Record<Transaction["type"], string>> = {
  success: { recharge: "Successful", bill: "Successful", loan: "Approved" },
  pending: { recharge: "Pending", bill: "Pending", loan: "Under Review" },
  failed: { recharge: "Failed", bill: "Failed", loan: "Declined" },
};

export function TransactionDetail({ transaction: t }: { transaction: Transaction }) {
  const meta = statusMeta[t.status];
  const rows = [
    { label: "Transaction ID", value: t.id, mono: true },
    { label: "Date", value: `${formatDate(t.date)}, ${formatTime(t.date)}` },
    { label: "Service", value: t.title },
    { label: t.type === "loan" ? "Details" : "Provider", value: t.type === "loan" ? t.reference : t.provider },
    ...(t.description ? [{ label: "Plan", value: t.description }] : []),
    { label: "Payment Method", value: t.paymentMethod },
  ];

  return (
    <Card padding="none" className="mx-auto w-full max-w-lg overflow-hidden">
      <div className={cn("px-6 pt-8 pb-6 text-center", meta.bg)}>
        <span className={cn("mx-auto grid size-16 place-items-center rounded-full bg-white text-2xl font-bold ring-8", meta.text, meta.ring)} aria-hidden="true">
          {meta.icon}
        </span>
        <h2 className={cn("mt-4 text-lg font-bold", meta.text)}>
          {headline[t.type]} {statusWord[t.status][t.type]} <span aria-hidden="true">{meta.icon}</span>
        </h2>
        <p className="mt-2 text-4xl font-extrabold text-slate-900">{formatINR(t.amount)}</p>
        <p className="mt-3 inline-flex items-center gap-2 text-slate-700">
          <span aria-hidden="true">{transactionIcon(t)}</span>
          <span className="font-semibold">{t.provider}</span>
          {t.type !== "loan" && <span className="text-slate-500">{displayReference(t)}</span>}
        </p>
      </div>

      {t.statusNote && <p className={cn("mx-6 mt-5 rounded-xl px-4 py-3 text-sm", meta.bg, meta.text)}>{t.statusNote}</p>}

      <dl className="divide-y divide-slate-100 px-6 py-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">{r.label}</dt>
            <dd className={cn("text-right font-medium text-slate-900", r.mono && "font-mono")}>{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="no-print flex flex-col gap-3 border-t border-slate-100 p-6 sm:flex-row">
        {t.status !== "failed" && <PrintReceiptButton />}
        <ButtonLink href={`/support?txn=${t.id}`} variant={t.status === "success" ? "secondary" : "primary"} size="lg" fullWidth>
          Need Help?
        </ButtonLink>
      </div>
    </Card>
  );
}
