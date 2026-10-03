import { statusMeta } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatDate, formatINR, formatTime } from "@/lib/format";
import type { TransactionStatus } from "@/types";

interface PaymentResultViewProps {
  status: TransactionStatus;
  title: string;
  amount: number;
  subtitle?: string;
  transactionId: string;
  date: string;
  method: string;
  note?: string;
  onReset?: () => void;
  resetLabel?: string;
}

const headings: Record<TransactionStatus, string> = {
  success: "Successful",
  pending: "Pending",
  failed: "Failed",
};

/** Clear success / pending / failed state after any payment. */
export function PaymentResultView({ status, title, amount, subtitle, transactionId, date, method, note, onReset, resetLabel = "Make another payment" }: PaymentResultViewProps) {
  const meta = statusMeta[status];
  return (
    <Card padding="lg" className="mx-auto w-full max-w-lg text-center" aria-live="polite">
      <span className={cn("mx-auto grid size-20 place-items-center rounded-full text-3xl font-bold ring-8", meta.bg, meta.text, meta.ring)} aria-hidden="true">
        {meta.icon}
      </span>
      <h2 className={cn("mt-5 text-xl font-bold", meta.text)}>
        {title} {headings[status]}
      </h2>
      <p className="mt-2 text-4xl font-extrabold text-slate-900">{formatINR(amount)}</p>
      {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
      {note && <p className={cn("mt-4 rounded-xl px-4 py-3 text-sm", meta.bg, meta.text)}>{note}</p>}

      <dl className="mt-6 divide-y divide-slate-100 rounded-2xl bg-slate-50 px-4 text-left text-sm">
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-slate-500">Transaction ID</dt>
          <dd className="font-mono font-semibold text-slate-900">{transactionId}</dd>
        </div>
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-slate-500">Date</dt>
          <dd className="font-medium text-slate-900">
            {formatDate(date)}, {formatTime(date)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-slate-500">Payment Method</dt>
          <dd className="font-medium text-slate-900">{method}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {onReset && (
          <Button onClick={onReset} fullWidth size="lg">
            {resetLabel}
          </Button>
        )}
        <ButtonLink href="/transactions" variant="outline" fullWidth size="lg">
          View Transactions
        </ButtonLink>
      </div>
    </Card>
  );
}
