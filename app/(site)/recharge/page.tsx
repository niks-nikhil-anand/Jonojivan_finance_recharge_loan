import type { Metadata } from "next";
import Link from "next/link";
import { QuickRechargeCard } from "@/components/features/recharge/QuickRechargeCard";
import { TransactionItem } from "@/components/features/transactions/TransactionItem";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Card } from "@/components/ui/Card";
import { PageBody, PageHeader, SectionHeading } from "@/components/ui/Layout";
import { operators } from "@/lib/data/operators";
import { getRecentTransactions } from "@/lib/services/transactions";

export const metadata: Metadata = {
  title: "Recharge & Pay Bills",
  description: "Mobile and DTH recharge, plus electricity, broadband, FASTag, gas, water, landline and insurance bill payments.",
};

export default async function RechargeHubPage() {
  const recent = (await getRecentTransactions(6)).filter((t) => t.type !== "loan").slice(0, 3);
  return (
    <>
      <PageHeader title="Recharge & Pay Bills" description="Every operator and biller in one place — fast, simple and secure." icon="⚡" />
      <PageBody className="flex flex-col gap-10">
        <ServiceGrid />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <QuickRechargeCard />
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <h2 className="text-lg font-bold text-slate-900">Recent payments</h2>
              <Link href="/transactions" className="text-sm font-semibold text-brand-700">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recent.map((t) => (
                <TransactionItem key={t.id} transaction={t} />
              ))}
            </div>
          </Card>
        </div>

        <section>
          <SectionHeading title="Supported mobile operators" description="Prepaid and postpaid across all telecom circles." />
          <ul className="flex flex-wrap gap-3">
            {operators.map((o) => (
              <li key={o.id} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pr-4 pl-1.5 shadow-card">
                <span className={`grid size-8 place-items-center rounded-full text-[10px] font-bold ${o.badge}`}>{o.name.slice(0, 4)}</span>
                <span className="font-medium text-slate-800">{o.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </PageBody>
    </>
  );
}
