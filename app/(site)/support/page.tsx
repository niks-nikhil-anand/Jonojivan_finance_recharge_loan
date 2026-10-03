import type { Metadata } from "next";
import { ContactOptions } from "@/components/features/support/ContactOptions";
import { IssueCategories } from "@/components/features/support/IssueCategories";
import { SupportRequestForm } from "@/components/features/support/SupportRequestForm";
import { SupportSearch } from "@/components/features/support/SupportSearch";
import { issueCategories } from "@/components/features/support/supportData";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { faqs } from "@/lib/data/faqs";
import { contactInfo } from "@/lib/data/navigation";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Get help with recharges, bill payments, refunds, loans and your account.",
};

export default async function SupportPage({ searchParams }: PageProps<"/support">) {
  const { category, txn } = await searchParams;
  const initialCategory = issueCategories.find((c) => c.id === category)?.id;
  const initialTxn = typeof txn === "string" && /^[A-Z0-9]{4,12}$/.test(txn) ? txn : undefined;

  return (
    <>
      <section className="bg-linear-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <Container className="pt-10 pb-24 text-center sm:pt-14">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How can we help?</h1>
          <p className="mt-2 text-brand-100">Search our help articles or reach out — we’re here {contactInfo.hours}.</p>
        </Container>
      </section>
      <Container size="narrow" className="-mt-16 flex flex-col gap-12 pb-12 sm:pb-16">
        <SupportSearch faqs={faqs} />

        <section>
          <SectionHeading title="Browse by category" />
          <IssueCategories />
        </section>

        <section>
          <SectionHeading title="Contact us" />
          <ContactOptions columns={2} />
        </section>

        <section id="raise-request" className="scroll-mt-24">
          <SectionHeading title="Raise a support request" description="Tell us what went wrong and we’ll get back within 24 hours." />
          <SupportRequestForm
            key={`${initialCategory ?? ""}-${initialTxn ?? ""}`}
            initialCategory={initialCategory ?? (initialTxn ? "payment" : undefined)}
            initialTransactionId={initialTxn}
          />
        </section>
      </Container>
    </>
  );
}
