import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { Offer } from "@/types";
import { CopyCodeButton } from "./CopyCodeButton";

const toneStyles: Record<Offer["tone"], string> = {
  brand: "from-brand-600 to-brand-500",
  emerald: "from-emerald-600 to-emerald-500",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-600 to-pink-500",
  violet: "from-violet-600 to-indigo-500",
};

const categoryLabel: Record<Offer["category"], string> = {
  recharge: "Recharge",
  cashback: "Cashback",
  loans: "Loans",
  promotions: "Promotion",
};

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-slate-200/70 bg-white shadow-card">
      <div className={cn("flex items-center justify-between gap-3 bg-linear-to-r px-5 py-4 text-white", toneStyles[offer.tone])}>
        <span className="text-xl font-extrabold tracking-tight">{offer.highlight}</span>
        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">{categoryLabel[offer.category]}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-slate-900">{offer.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{offer.description}</p>
        <p className="mt-3 text-xs text-slate-500">Valid till {formatDate(offer.validTill)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          {offer.code && <CopyCodeButton code={offer.code} />}
          <ButtonLink href={offer.cta.href} variant="secondary">
            {offer.cta.label}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
