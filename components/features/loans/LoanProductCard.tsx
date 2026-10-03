import Link from "next/link";
import type { LoanProduct } from "@/types";

export function LoanProductCard({ product }: { product: LoanProduct }) {
  const amount = product.highlights.find((h) => h.label === "Loan amount")?.value;
  return (
    <Link
      href={`/loans/${product.slug}`}
      className="group flex h-full flex-col rounded-card border border-slate-200/70 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg sm:p-7"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-3xl" aria-hidden="true">
        {product.icon}
      </span>
      <h3 className="mt-5 text-xl font-bold text-slate-900">{product.name}</h3>
      <p className="mt-1 text-slate-600">{product.shortDescription}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-sm">
        <div>
          <dt className="text-slate-500">Amount</dt>
          <dd className="font-semibold text-slate-900">{amount}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Interest from</dt>
          <dd className="font-semibold text-slate-900">{product.rateFrom}% p.a.</dd>
        </div>
      </dl>
      <span className="mt-auto pt-6 font-semibold text-brand-700 group-hover:text-brand-800">Learn More →</span>
    </Link>
  );
}
