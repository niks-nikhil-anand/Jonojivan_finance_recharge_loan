import type { Metadata } from "next";
import { DthRechargeFlow } from "@/components/features/recharge/DthRechargeFlow";
import { ServiceAside } from "@/components/features/recharge/ServiceAside";
import { PageBody, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "DTH Recharge",
  description: "Recharge Tata Play, Airtel Digital TV, Dish TV, d2h and Sun Direct instantly.",
};

export default function DthRechargePage() {
  return (
    <>
      <PageHeader title="DTH Recharge" description="Recharge any DTH connection instantly." icon="📺" back={{ label: "Recharge & Bills", href: "/recharge" }} />
      <PageBody className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <DthRechargeFlow />
        <ServiceAside current="dth" steps={["Select your DTH provider", "Enter your Subscriber ID", "Choose a plan or amount and pay"]} />
      </PageBody>
    </>
  );
}
