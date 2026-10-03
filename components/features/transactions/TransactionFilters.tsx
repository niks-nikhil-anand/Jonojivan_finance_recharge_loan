import Form from "next/form";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { ChipLinks } from "@/components/ui/Chips";
import { controlStyles } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import type { TransactionFilters as Filters } from "@/lib/services/transactions";

const typeTabs = [
  { id: undefined, label: "All" },
  { id: "recharge", label: "Recharge" },
  { id: "bill", label: "Bills" },
  { id: "loan", label: "Loans" },
] as const;

const statusTabs = [
  { id: undefined, label: "Any status" },
  { id: "success", label: "Successful" },
  { id: "pending", label: "Pending" },
  { id: "failed", label: "Failed" },
] as const;

function href(filters: Filters) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) if (v) params.set(k, v);
  const qs = params.toString();
  return qs ? `/transactions?${qs}` : "/transactions";
}

/** URL-driven filters — shareable and back-button safe, no client JS required. */
export function TransactionFilters({ filters }: { filters: Filters }) {
  const hasDate = Boolean(filters.from || filters.to);
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-card sm:p-4">
      <ChipLinks
        label="Transaction type"
        items={typeTabs.map((t) => ({ label: t.label, href: href({ ...filters, type: t.id }), active: filters.type === t.id }))}
      />
      <ChipLinks
        label="Transaction status"
        items={statusTabs.map((t) => ({ label: t.label, href: href({ ...filters, status: t.id }), active: filters.status === t.id }))}
      />
      <details className="group" open={hasDate}>
        <summary className="flex h-10 cursor-pointer list-none items-center gap-2 text-sm font-medium text-slate-600 [&::-webkit-details-marker]:hidden">
          📅 Date range {hasDate && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">Active</span>}
          <span className="ml-auto text-xs text-brand-700 group-open:hidden">Show</span>
        </summary>
        <Form action="/transactions" className="mt-2 grid grid-cols-2 gap-3 sm:flex sm:items-end">
          {filters.type && <input type="hidden" name="type" value={filters.type} />}
          {filters.status && <input type="hidden" name="status" value={filters.status} />}
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            From
            <input type="date" name="from" defaultValue={filters.from} className={cn(controlStyles(), "h-11 text-sm")} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            To
            <input type="date" name="to" defaultValue={filters.to} className={cn(controlStyles(), "h-11 text-sm")} />
          </label>
          <button type="submit" className={buttonStyles({ size: "md" })}>
            Apply
          </button>
          {hasDate && (
            <Link href={href({ type: filters.type, status: filters.status })} className={buttonStyles({ variant: "ghost" })}>
              Clear
            </Link>
          )}
        </Form>
      </details>
    </div>
  );
}
