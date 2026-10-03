import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Container, PageBody, PageHeader, Section, SectionHeading } from "@/components/ui/Layout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Us",
  description: "Jonojivan brings loans, recharges and bill payments together in one simple platform.",
};

const values = [
  { icon: "🤝", title: "Simplicity", description: "Every flow is designed to be completed in a few taps, on any phone." },
  { icon: "🔍", title: "Transparency", description: "Clear rates, fees and status updates — no fine-print surprises." },
  { icon: "🔒", title: "Security", description: "Encrypted connections and regulated payment partners." },
  { icon: "🇮🇳", title: "Built for Bharat", description: "Works for every operator, biller and region across India." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Jonojivan" description="Financial everyday-essentials, made simple." icon="🏢" />
      <PageBody>
        <Card padding="lg" className="mx-auto max-w-3xl">
          <div className="space-y-4 text-slate-600 sm:text-lg">
            <p>
              <strong className="text-slate-900">Jonojivan</strong> — “people’s life” — was started with a simple idea: the money tasks people do every
              week should be easy, whether that’s recharging a phone, paying the electricity bill or applying for a loan.
            </p>
            <p>
              Instead of separate apps and confusing forms, Jonojivan offers one consistent experience for recharges, bill payments and loans — designed
              mobile-first so it works just as well on an entry-level phone as on a desktop.
            </p>
          </div>
        </Card>
      </PageBody>
      <Section>
        <SectionHeading title="What we stand for" align="center" />
        <FeatureGrid items={values} columns={4} />
      </Section>
      <Container className="pb-12 sm:pb-16">
        <CtaBanner
          title="Have a question for us?"
          description="We’d love to hear from you."
          primary={{ label: "Contact Us", href: "/contact" }}
          secondary={{ label: "Help & Support", href: "/support" }}
        />
      </Container>
    </>
  );
}
