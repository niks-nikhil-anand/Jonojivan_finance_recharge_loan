import { Card } from "@/components/ui/Card";
import { formatDate, formatINR } from "@/lib/format";
import type { Bill } from "@/types";

interface BillDetailsCardProps {
  bill: Bill;
  provider: string;
  identifier: { label: string; value: string };
  onChange?: () => void;
}

export function BillDetailsCard({ bill, provider, identifier, onChange }: BillDetailsCardProps) {
  const rows = [
    { label: "Customer", value: bill.customerName },
    { label: identifier.label, value: identifier.value },
    { label: "Bill Number", value: bill.billNumber },
    { label: "Bill Date", value: formatDate(bill.billDate) },
    { label: "Due Date", value: formatDate(bill.dueDate) },
  ];
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Bill Details</p>
          <p className="font-semibold text-slate-900">{provider}</p>
        </div>
        {onChange && (
          <button type="button" onClick={onChange} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Change
          </button>
        )}
      </div>
      <dl className="divide-y divide-slate-100 px-5">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-slate-500">{r.label}</dt>
            <dd className="text-right font-medium text-slate-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-center justify-between bg-brand-50 px-5 py-4">
        <span className="font-semibold text-slate-700">Amount Due</span>
        <span className="text-2xl font-extrabold text-slate-900">{formatINR(bill.amount)}</span>
      </div>
    </Card>
  );
}
