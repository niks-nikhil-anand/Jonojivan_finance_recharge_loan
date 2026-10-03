import type { Metadata } from "next";
import { EligibilityChecker } from "@/components/features/loans/EligibilityChecker";
import { PageBody, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Check Loan Eligibility",
  description: "Find out how much you can borrow in under a minute. No impact on your credit score.",
};

export default function EligibilityPage() {
  return (
    <>
      <PageHeader title="Check Your Eligibility" description="Answer 5 quick questions to estimate how much you can borrow." icon="📄" back={{ label: "Loans", href: "/loans" }} />
      <PageBody>
        <EligibilityChecker />
      </PageBody>
    </>
  );
}
