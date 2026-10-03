import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransactionDetail } from "@/components/features/transactions/TransactionDetail";
import { PageBody, PageHeader } from "@/components/ui/Layout";
import { getTransaction } from "@/lib/services/transactions";

export async function generateMetadata({ params }: PageProps<"/transactions/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: `Transaction ${id}`, robots: { index: false } };
}

export default async function TransactionDetailPage({ params }: PageProps<"/transactions/[id]">) {
  const { id } = await params;
  const transaction = await getTransaction(id);
  if (!transaction) notFound();

  return (
    <>
      <div className="no-print">
        <PageHeader title="Transaction Details" back={{ label: "Transactions", href: "/transactions" }} />
      </div>
      <PageBody>
        <TransactionDetail transaction={transaction} />
      </PageBody>
    </>
  );
}
