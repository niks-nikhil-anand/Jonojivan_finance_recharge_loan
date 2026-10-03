import type { Metadata } from "next";
import { OfferCard } from "@/components/features/offers/OfferCard";
import { ChipLinks } from "@/components/ui/Chips";
import { EmptyState, PageBody, PageHeader } from "@/components/ui/Layout";
import { offerCategories, offers } from "@/lib/data/offers";

export const metadata: Metadata = {
  title: "Offers",
  description: "Recharge offers, cashback deals, loan offers and promotions on Jonojivan.",
};

export default async function OffersPage({ searchParams }: PageProps<"/offers">) {
  const { category } = await searchParams;
  const active = offerCategories.find((c) => c.id === category)?.id ?? "all";
  const visible = active === "all" ? offers : offers.filter((o) => o.category === active);

  return (
    <>
      <PageHeader title="Offers" description="Save more on recharges, bills and loans." icon="🎁" />
      <PageBody className="flex flex-col gap-6">
        <div className="rounded-2xl bg-white p-3 shadow-card">
          <ChipLinks
            label="Offer categories"
            items={offerCategories.map((c) => ({
              label: c.label,
              href: c.id === "all" ? "/offers" : `/offers?category=${c.id}`,
              active: c.id === active,
            }))}
          />
        </div>
        {visible.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((o) => (
              <li key={o.id}>
                <OfferCard offer={o} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon="🎁" title="No offers here yet" description="Check back soon for new deals." />
        )}
        <p className="text-xs text-slate-500">Offers are subject to terms and may change or end without notice. One use per user unless stated.</p>
      </PageBody>
    </>
  );
}
