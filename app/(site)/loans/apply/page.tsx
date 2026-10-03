import type { Metadata } from "next";
import { LoanApplicationWizard } from "@/components/features/loans/application/LoanApplicationWizard";
import { tenureOptions } from "@/components/features/loans/application/schema";
import { PageBody, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Apply for Loan",
  description: "Apply for a personal or business loan online in a few simple steps.",
};

export default async function ApplyPage({ searchParams }: PageProps<"/loans/apply">) {
  const { amount, tenure, type } = await searchParams;

  const initial: { amount?: string; tenure?: string; loanType?: string } = {};
  if (typeof amount === "string" && /^\d{4,8}$/.test(amount)) initial.amount = amount;
  if (typeof tenure === "string") {
    // Snap any tenure (e.g. from the EMI calculator) to the closest option offered.
    const n = Number(tenure);
    if (n > 0) initial.tenure = String(tenureOptions.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a)));
  }
  if (type === "business" || type === "personal") initial.loanType = type;

  return (
    <>
      <PageHeader title="Apply for Loan" description="6 short steps · about 5 minutes" icon="💰" back={{ label: "Loans", href: "/loans" }} />
      <PageBody>
        <LoanApplicationWizard initial={initial} />
      </PageBody>
    </>
  );
}
