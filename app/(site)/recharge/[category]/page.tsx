import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BillPaymentFlow } from "@/components/features/bills/BillPaymentFlow";
import { ServiceAside } from "@/components/features/recharge/ServiceAside";
import { PageBody, PageHeader } from "@/components/ui/Layout";
import { billProviders } from "@/lib/data/bill-providers";
import { billCategories, billCategorySlugs, isBillCategory } from "@/lib/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return billCategorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/recharge/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isBillCategory(category)) return {};
  const config = billCategories[category];
  return { title: config.title, description: config.tagline };
}

export default async function BillPaymentPage({ params }: PageProps<"/recharge/[category]">) {
  const { category } = await params;
  if (!isBillCategory(category)) notFound();
  const config = billCategories[category];
  const isWallet = Boolean(config.customAmount);

  return (
    <>
      <PageHeader title={config.title} description={config.tagline} icon={config.icon} back={{ label: "Recharge & Bills", href: "/recharge" }} />
      <PageBody className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <BillPaymentFlow category={category} />
        <ServiceAside
          current={category}
          steps={[
            `Select from ${billProviders[category].length}+ ${config.providerLabel.toLowerCase()}s`,
            `Enter your ${config.idLabel.toLowerCase()}`,
            isWallet ? "Choose a top-up amount and pay" : "Review the fetched bill and pay",
          ]}
        />
      </PageBody>
    </>
  );
}
