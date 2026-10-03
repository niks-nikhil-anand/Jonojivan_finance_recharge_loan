import type { Metadata } from "next";
import { EmiCalculator } from "@/components/features/loans/EmiCalculator";
import { Accordion } from "@/components/ui/Accordion";
import { PageBody, PageHeader, SectionHeading } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description: "Calculate your monthly loan EMI, total interest and total payable instantly.",
};

const faqs = [
  {
    question: "How is EMI calculated?",
    answer: "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate and n is the tenure in months.",
  },
  {
    question: "Does a longer tenure reduce my EMI?",
    answer: "Yes — a longer tenure lowers the monthly EMI, but you pay more interest over the life of the loan.",
  },
  {
    question: "Are these figures final?",
    answer: "No. Results are indicative. Your actual rate and EMI depend on your credit profile and the lender’s assessment.",
  },
];

export default function EmiCalculatorPage() {
  return (
    <>
      <PageHeader title="EMI Calculator" description="Move the sliders to see your monthly EMI instantly." icon="🧮" back={{ label: "Loans", href: "/loans" }} />
      <PageBody className="flex flex-col gap-12">
        <EmiCalculator />
        <section className="mx-auto w-full max-w-3xl">
          <SectionHeading title="About EMI" />
          <Accordion items={faqs} />
        </section>
      </PageBody>
    </>
  );
}
