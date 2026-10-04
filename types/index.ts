export type BillCategory =
  | "electricity"
  | "broadband"
  | "fastag"
  | "gas"
  | "water"
  | "landline"
  | "insurance";

export type ServiceSlug = "mobile" | "dth" | BillCategory;

export interface Service {
  slug: ServiceSlug;
  label: string;
  icon: string;
  description: string;
  href: string;
}

/** Drives the universal bill-payment UI — one entry per bill category. */
export interface BillCategoryConfig {
  slug: BillCategory;
  title: string;
  icon: string;
  tagline: string;
  providerLabel: string;
  idLabel: string;
  idPlaceholder: string;
  idInputMode: "numeric" | "text";
  /** Regex source the identifier must match. */
  idPattern: string;
  idHelp: string;
  idMaxLength: number;
  uppercase?: boolean;
  /** Optional second field, e.g. date of birth for insurance. */
  extraField?: { name: string; label: string; type: "date" | "text" };
  /** FASTag-style wallets accept a custom amount instead of a fixed bill. */
  customAmount?: { min: number; max: number; presets: number[] };
}

export interface Provider {
  id: string;
  name: string;
  region?: string;
}

export interface Operator {
  id: string;
  name: string;
  /** Tailwind classes for the operator badge. */
  badge: string;
}

export type PlanCategory =
  | "popular"
  | "unlimited"
  | "data"
  | "validity"
  | "talktime"
  | "sms";

export interface Plan {
  id: string;
  operatorId: string;
  price: number;
  data: string;
  validity: string;
  calls: string;
  sms: string;
  categories: PlanCategory[];
  extras?: string[];
}

export interface Bill {
  customerName: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  amount: number;
  /** Set for wallet-style categories (FASTag) where amount is user-chosen. */
  balance?: number;
}

export interface DthPlan {
  id: string;
  name: string;
  price: number;
  validity: string;
  channels: string;
}

export interface DthAccount {
  customerName: string;
  subscriberId: string;
  currentPlan: string;
  monthlyAmount: number;
  balance: number;
  dueAmount: number;
  nextRechargeDate: string;
  recommendedPlans: DthPlan[];
}

export type TransactionType = "recharge" | "bill" | "loan";
export type TransactionStatus = "success" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  service: ServiceSlug | "loan";
  title: string;
  provider: string;
  reference: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  paymentMethod: string;
  description?: string;
  statusNote?: string;
}

export interface LoanFeature {
  title: string;
  description: string;
  icon: string;
}

export interface LoanProduct {
  slug: "personal-loan" | "business-loan" | "micro-finance-loan";
  name: string;
  shortDescription: string;
  heroTitle: string;
  heroText: string;
  icon: string;
  overview: string[];
  highlights: { label: string; value: string }[];
  amount: { min: number; max: number };
  tenureMonths: { min: number; max: number };
  rateFrom: number;
  eligibility: string[];
  documents: { title: string; items: string[] }[];
  benefits: LoanFeature[];
  process: { title: string; description: string }[];
  faqs: Faq[];
}

export type FaqGroup = "recharge" | "bills" | "loans" | "payments" | "account";

export interface Faq {
  question: string;
  answer: string;
  group?: FaqGroup;
}

export type OfferCategory = "recharge" | "cashback" | "loans" | "promotions";

export interface Offer {
  id: string;
  category: OfferCategory;
  title: string;
  description: string;
  highlight: string;
  code?: string;
  validTill: string;
  cta: { label: string; href: string };
  tone: "brand" | "emerald" | "amber" | "rose" | "violet";
}

export type EmploymentType = "salaried" | "self-employed" | "business";
