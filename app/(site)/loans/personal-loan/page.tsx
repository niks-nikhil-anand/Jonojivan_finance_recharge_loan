import type { Metadata } from "next";
import { LoanProductTemplate } from "@/components/features/loans/LoanProductTemplate";
import { getLoanProduct } from "@/lib/data/loans";

const product = getLoanProduct("personal-loan");

export const metadata: Metadata = {
  title: product.name,
  description: product.heroText,
};

export default function PersonalLoanPage() {
  return <LoanProductTemplate product={product} />;
}
