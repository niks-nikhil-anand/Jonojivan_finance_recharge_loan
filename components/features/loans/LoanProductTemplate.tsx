import Link from "next/link";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqJsonLd } from "@/components/sections/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import type { LoanProduct } from "@/types";
import { EmiCalculator } from "./EmiCalculator";

/** Shared layout for every loan product page — content comes from lib/data/loans. */
export function LoanProductTemplate({ product }: { product: LoanProduct }) {
  const applyHref = `/loans/apply?type=${product.slug === "business-loan" ? "business" : "personal"}`;
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-linear-to-br from-brand-800 via-brand-700 to-brand-500 text-white">
        <Container className="grid grid-cols-1 gap-8 pt-8 pb-16 sm:pt-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:pb-20">
          <div>
            <p className="text-sm font-semibold text-brand-200">
              <Link href="/loans" className="hover:text-white">
                Loans
              </Link>{" "}
              / {product.name}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{product.heroTitle}</h1>
            <p className="mt-4 max-w-xl text-lg text-brand-100">{product.heroText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={applyHref} variant="white" size="lg">
                Apply Now
              </ButtonLink>
              <ButtonLink href="/loans/eligibility" size="lg" variant="glass">
                Check Eligibility
              </ButtonLink>
            </div>
          </div>
          {/* 3. Amount / tenure information */}
          <dl className="grid grid-cols-2 gap-3">
            {product.highlights.map((h) => (
              <div key={h.label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                <dt className="text-xs text-brand-200">{h.label}</dt>
                <dd className="mt-1 font-bold sm:text-lg">{h.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Overview */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title={`What is a ${product.name}?`} />
            <div className="space-y-4 text-slate-600 sm:text-lg">
              {product.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {/* 4. Eligibility */}
          <Card>
            <h2 className="text-xl font-bold text-slate-900">Eligibility</h2>
            <ul className="mt-4 space-y-3">
              {product.eligibility.map((e) => (
                <li key={e} className="flex gap-3 text-slate-700">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700" aria-hidden="true">
                    ✓
                  </span>
                  {e}
                </li>
              ))}
            </ul>
            <ButtonLink href="/loans/eligibility" variant="secondary" className="mt-6" fullWidth>
              Check your eligibility
            </ButtonLink>
          </Card>
        </div>
      </Section>

      {/* 5. Required documents */}
      <Section className="bg-white">
        <SectionHeading title="Required documents" description="Keep these handy — you can upload them online." />
        <div className="grid gap-4 sm:grid-cols-3">
          {product.documents.map((d) => (
            <Card key={d.title} padding="sm" className="bg-slate-50 shadow-none">
              <h3 className="font-semibold text-slate-900">{d.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {d.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true">📄</span>
                    {i}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Benefits */}
      <Section>
        <SectionHeading title="Benefits" />
        <FeatureGrid items={product.benefits} columns={4} />
      </Section>

      {/* 7. EMI calculator */}
      <Section className="bg-white" id="emi-calculator">
        <SectionHeading title="EMI Calculator" description="Adjust amount, rate and tenure to plan your monthly budget." />
        <EmiCalculator
          defaultAmount={product.slug === "business-loan" ? 500000 : 200000}
          defaultRate={product.slug === "business-loan" ? 15 : 12}
          defaultTenure={24}
          amountRange={product.amount}
          tenureRange={product.tenureMonths}
          loanType={product.slug === "business-loan" ? "business" : "personal"}
        />
      </Section>

      {/* 8. Application process */}
      <Section>
        <SectionHeading title="Application process" align="center" />
        <HowItWorks steps={product.process} />
      </Section>

      {/* 9. FAQs */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
          <SectionHeading title={`${product.name} FAQs`} action={{ label: "All FAQs", href: "/faq" }} />
          <Accordion items={product.faqs} />
        </div>
        <FaqJsonLd faqs={product.faqs} />
      </Section>

      {/* 10. Apply now */}
      <Container className="py-12 sm:py-16">
        <CtaBanner
          title={`Apply for a ${product.name} today`}
          description="A simple step-by-step application. Takes about 5 minutes."
          primary={{ label: "Apply Now", href: applyHref }}
          secondary={{ label: "Check Eligibility", href: "/loans/eligibility" }}
        />
      </Container>
    </>
  );
}
