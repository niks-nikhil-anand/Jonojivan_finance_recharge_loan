import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/sections/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChipLinks } from "@/components/ui/Chips";
import { PageBody, PageHeader } from "@/components/ui/Layout";
import { faqGroups, faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to frequently asked questions about recharges, bill payments, loans, payments and your account.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" description="Quick answers about recharges, bills, loans and more." icon="❓" />
      <PageBody size="narrow" className="flex flex-col gap-8">
        <div className="sticky top-16 z-20 rounded-2xl bg-white/95 p-3 shadow-card backdrop-blur">
          <ChipLinks label="FAQ groups" items={faqGroups.map((g) => ({ label: g.label, href: `#${g.id}`, active: false }))} />
        </div>
        {faqGroups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-36">
            <h2 className="mb-3 text-xl font-bold text-slate-900">{g.label}</h2>
            <Accordion items={faqs.filter((f) => f.group === g.id)} />
          </section>
        ))}
        <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <span className="text-4xl" aria-hidden="true">
            💬
          </span>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Still need help?</p>
            <p className="text-sm text-slate-500">Our support team is happy to help you.</p>
          </div>
          <ButtonLink href="/support">Contact Support</ButtonLink>
        </Card>
        <FaqJsonLd faqs={faqs} />
      </PageBody>
    </>
  );
}
