import type { Metadata } from "next";
import { TransactionFilters } from "@/components/features/transactions/TransactionFilters";
import { TransactionItem } from "@/components/features/transactions/TransactionItem";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState, PageBody, PageHeader } from "@/components/ui/Layout";
import { formatDate } from "@/lib/format";
import { getTransactions, type TransactionFilters as Filters } from "@/lib/services/transactions";
import type { Transaction, TransactionStatus, TransactionType } from "@/types";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Your recharge, bill payment and loan transaction history.",
};

const types: TransactionType[] = ["recharge", "bill", "loan"];
const statuses: TransactionStatus[] = ["success", "pending", "failed"];
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function str(v: string | string[] | undefined) {
  return typeof v === "string" ? v : undefined;
}

export default async function TransactionsPage({ searchParams }: PageProps<"/transactions">) {
  const sp = await searchParams;
  const type = str(sp.type);
  const status = str(sp.status);
  const from = str(sp.from);
  const to = str(sp.to);

  const filters: Filters = {
    type: types.find((t) => t === type),
    status: statuses.find((s) => s === status),
    from: from && isoDate.test(from) ? from : undefined,
    to: to && isoDate.test(to) ? to : undefined,
  };
  const list = await getTransactions(filters);

  const groups = new Map<string, Transaction[]>();
  for (const t of list) {
    const key = formatDate(t.date);
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }

  return (
    <>
      <PageHeader title="Transactions" description="Track every recharge, bill payment and loan application." icon="🧾" />
      <PageBody size="narrow" className="flex flex-col gap-5">
        <TransactionFilters filters={filters} />
        {list.length ? (
          <div className="flex flex-col gap-5">
            {[...groups].map(([date, items]) => (
              <section key={date}>
                <h2 className="mb-2 px-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">{date}</h2>
                <Card padding="none" className="divide-y divide-slate-100 overflow-hidden">
                  {items.map((t) => (
                    <TransactionItem key={t.id} transaction={t} />
                  ))}
                </Card>
              </section>
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState
              icon="🔍"
              title="No transactions found"
              description="Try changing the filters, or make your first recharge."
              action={
                <ButtonLink href="/transactions" variant="outline">
                  Clear filters
                </ButtonLink>
              }
            />
          </Card>
        )}
      </PageBody>
    </>
  );
}
