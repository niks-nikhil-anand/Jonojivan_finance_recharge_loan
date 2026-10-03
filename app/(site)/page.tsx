import { LoanProductCard } from "@/components/features/loans/LoanProductCard";
import { OfferCard } from "@/components/features/offers/OfferCard";
import { QuickRechargeCard } from "@/components/features/recharge/QuickRechargeCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { QuickActions } from "@/components/sections/QuickActions";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { faqs } from "@/lib/data/faqs";
import { loanProducts, loanSteps } from "@/lib/data/loans";
import { offers } from "@/lib/data/offers";

const trust = [
  { value: "9+", label: "Bill & recharge categories" },
  { value: "100+", label: "Operators & billers" },
  { value: "₹25L", label: "Personal loans up to" },
  { value: "24×7", label: "Recharge availability" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-800 via-brand-700 to-brand-500 text-white">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/5" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/4 size-72 translate-y-1/2 rounded-full bg-emerald-400/15 blur-2xl" aria-hidden="true" />
        <Container className="relative grid grid-cols-1 items-center gap-10 pt-10 pb-20 sm:pt-16 sm:pb-24 lg:grid-cols-[1.15fr_1fr] lg:pt-20 lg:pb-32">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100 ring-1 ring-white/15">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" /> Loans · Recharge · Bill Payments
            </p>
            <h1 className="mt-5 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Loans Made Simple.
              <br />
              <span className="text-emerald-300">Recharge Made Easy.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              Apply for loans, recharge your mobile and pay your everyday bills from one simple platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/loans/apply" variant="white" size="lg">
                Apply for Loan
              </ButtonLink>
              <ButtonLink href="/recharge/mobile" variant="success" size="lg">
                Recharge Now
              </ButtonLink>
            </div>
          </div>
          <div className="hidden lg:block">
            <QuickRechargeCard />
          </div>
        </Container>
      </section>

      {/* Quick actions overlap the hero */}
      <Container className="relative z-10 -mt-12 sm:-mt-14">
        <QuickActions />
      </Container>

      {/* Recharge & bills */}
      <Section>
        <SectionHeading
          title="Recharge & Pay Bills"
          description="Every operator and biller, one consistent experience."
          action={{ label: "All services", href: "/recharge" }}
        />
        <div className="mb-6 lg:hidden">
          <QuickRechargeCard />
        </div>
        <ServiceGrid />
      </Section>

      {/* Loans */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Loans"
          title="Find the Right Loan for Your Needs"
          description="Transparent rates, flexible tenures and a fully digital application."
          action={{ label: "Explore loans", href: "/loans" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loanProducts.map((p) => (
            <LoanProductCard key={p.slug} product={p} />
          ))}
          <div className="flex flex-col justify-between gap-6 rounded-card bg-slate-900 p-6 text-white sm:col-span-2 sm:p-7 lg:col-span-1">
            <div>
              <span className="text-3xl" aria-hidden="true">
                🧮
              </span>
              <h3 className="mt-4 text-xl font-bold">Plan before you borrow</h3>
              <p className="mt-1 text-slate-300">Check your eligibility and estimate your EMI in under a minute.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/loans/eligibility" variant="white" fullWidth>
                Check Eligibility
              </ButtonLink>
              <ButtonLink href="/loans/emi-calculator" fullWidth variant="glass">
                EMI Calculator
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Offers */}
      <Section>
        <SectionHeading title="Offers for You" action={{ label: "View all", href: "/offers" }} />
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {offers.slice(0, 3).map((o) => (
            <li key={o.id} className="w-[85%] shrink-0 snap-start sm:w-auto">
              <OfferCard offer={o} />
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section className="bg-white">
        <SectionHeading eyebrow="How it works" title="Your loan in 5 simple steps" align="center" />
        <HowItWorks steps={loanSteps} />
      </Section>

      {/* Trust strip */}
      <Container className="py-10">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {trust.map((t) => (
            <div key={t.label} className="rounded-2xl bg-white p-5 text-center shadow-card">
              <dt className="sr-only">{t.label}</dt>
              <dd className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{t.value}</dd>
              <dd className="mt-1 text-xs text-slate-500 sm:text-sm">{t.label}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* FAQ preview */}
      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
          <SectionHeading
            title="Frequently asked questions"
            description="Quick answers to common questions about recharges, bills and loans."
            action={{ label: "All FAQs", href: "/faq" }}
          />
          <Accordion items={faqs.filter((f) => f.group === "recharge" || f.group === "loans").slice(0, 5)} />
        </div>
      </Section>

      <Container className="pb-12 sm:pb-16">
        <CtaBanner
          title="Ready to get started?"
          description="Recharge in seconds or start your loan application today."
          primary={{ label: "Apply for Loan", href: "/loans/apply" }}
          secondary={{ label: "Recharge Now", href: "/recharge/mobile" }}
        />
      </Container>
    </>
  );
}
