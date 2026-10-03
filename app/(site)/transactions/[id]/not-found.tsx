import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState, PageBody, PageHeader } from "@/components/ui/Layout";

export default function TransactionNotFound() {
  return (
    <>
      <PageHeader title="Transaction Details" back={{ label: "Transactions", href: "/transactions" }} />
      <PageBody>
        <Card className="mx-auto max-w-lg">
          <EmptyState
            icon="🧾"
            title="Transaction not found"
            description="We couldn’t find a transaction with this ID. It may belong to another account."
            action={<ButtonLink href="/transactions">View all transactions</ButtonLink>}
          />
        </Card>
      </PageBody>
    </>
  );
}
