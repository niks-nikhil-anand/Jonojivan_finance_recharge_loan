import type { Metadata } from "next";
import { LoanProductTemplate } from "@/components/features/loans/LoanProductTemplate";
import { getLoanProduct } from "@/lib/data/loans";

const product = getLoanProduct("micro-finance-loan");

export const metadata: Metadata = {
  title: product.name,
  description: product.heroText,
};

export default function MicroFinanceLoanPage() {
  return <LoanProductTemplate product={product} />;
}
