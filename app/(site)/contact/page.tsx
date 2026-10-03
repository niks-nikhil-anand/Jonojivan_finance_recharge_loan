import type { Metadata } from "next";
import { ContactForm } from "@/components/features/support/ContactForm";
import { ContactOptions } from "@/components/features/support/ContactOptions";
import { Card } from "@/components/ui/Card";
import { PageBody, PageHeader } from "@/components/ui/Layout";
import { contactInfo } from "@/lib/data/navigation";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach Jonojivan by WhatsApp, phone or email, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" description={`We’re available ${contactInfo.hours}.`} icon="📮" />
      <PageBody className="flex flex-col gap-6">
        <ContactOptions />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <h2 className="mb-5 text-xl font-bold text-slate-900">Send us a message</h2>
            <ContactForm />
          </Card>
          <Card className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-900">Office</h2>
            <p className="text-slate-600">{contactInfo.address}</p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Support hours</dt>
                <dd className="font-medium text-slate-900">{contactInfo.hours}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Toll-free</dt>
                <dd className="font-medium text-slate-900">{contactInfo.phone}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </PageBody>
    </>
  );
}
