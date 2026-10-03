import type { Metadata } from "next";
import Link from "next/link";
import { LoanProductCard } from "@/components/features/loans/LoanProductCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { loanBenefits, loanProducts, loanSteps } from "@/lib/data/loans";

export const metadata: Metadata = {
  title: "Loans",
  description: "Personal and business loans with transparent rates, flexible tenure and a simple digital application.",
};

const tools = [
  { icon: "📄", title: "Check Eligibility", description: "Know how much you can borrow — no impact on credit score.", href: "/loans/eligibility" },
  { icon: "🧮", title: "EMI Calculator", description: "Plan your monthly budget before you apply.", href: "/loans/emi-calculator" },
];

export default function LoansPage() {
  return (
    <>
      <section className="bg-linear-to-br from-brand-800 via-brand-700 to-brand-500 text-white">
        <Container className="pt-10 pb-20 text-center sm:pt-16 sm:pb-24">
          <p className="text-sm font-semibold tracking-widest text-brand-200 uppercase">Loans</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">Find the Right Loan for Your Needs</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            Simple application, quick processing and transparent information — all online.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/loans/apply" variant="white" size="lg">
              Apply for Loan
            </ButtonLink>
            <ButtonLink href="/loans/eligibility" size="lg" variant="glass">
              Check Eligibility
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 -mt-12">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {loanProducts.map((p) => (
            <LoanProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>

      <Section>
        <SectionHeading title="Why borrow with Jonojivan" align="center" />
        <FeatureGrid items={loanBenefits} columns={5} />
      </Section>

      <Section className="bg-white">
        <SectionHeading eyebrow="How it works" title="From eligibility to processing" align="center" />
        <HowItWorks steps={loanSteps} />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-center gap-4 rounded-card border border-slate-200/70 bg-white p-6 shadow-card transition-shadow hover:shadow-lg"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl" aria-hidden="true">
                {t.icon}
              </span>
              <span>
                <span className="block text-lg font-semibold text-slate-900">{t.title}</span>
                <span className="block text-sm text-slate-600">{t.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Container className="pb-12 sm:pb-16">
        <CtaBanner
          title="Start your application in minutes"
          description="A short, guided form you can complete on your phone."
          primary={{ label: "Apply Now", href: "/loans/apply" }}
        />
      </Container>
    </>
  );
}
