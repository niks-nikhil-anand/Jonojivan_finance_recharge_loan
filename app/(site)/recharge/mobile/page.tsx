import type { Metadata } from "next";
import { MobileRechargeForm } from "@/components/features/recharge/MobileRechargeForm";
import { ServiceAside } from "@/components/features/recharge/ServiceAside";
import { PageBody, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Mobile Recharge",
  description: "Recharge prepaid or pay postpaid bills for Jio, Airtel, Vi, BSNL and MTNL in seconds.",
};

export default async function MobileRechargePage({ searchParams }: PageProps<"/recharge/mobile">) {
  const { number, amount } = await searchParams;
  const initialNumber = typeof number === "string" ? number : undefined;
  const initialAmount = typeof amount === "string" && /^\d+$/.test(amount) ? Number(amount) : undefined;

  return (
    <>
      <PageHeader title="Mobile Recharge" description="Prepaid recharge & postpaid bills for all operators." icon="📱" back={{ label: "Recharge & Bills", href: "/recharge" }} />
      <PageBody className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <MobileRechargeForm initialNumber={initialNumber} initialAmount={initialAmount} />
        <ServiceAside
          current="mobile"
          steps={["Enter your mobile number", "Confirm operator & circle", "Pick a plan and pay"]}
        />
      </PageBody>
    </>
  );
}
