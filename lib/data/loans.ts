import type { LoanFeature, LoanProduct } from "@/types";

export const loanBenefits: LoanFeature[] = [
  { icon: "📝", title: "Simple application", description: "A short, guided form you can finish on your phone." },
  { icon: "⚡", title: "Quick processing", description: "Applications are reviewed promptly with clear status updates." },
  { icon: "🔍", title: "Transparent information", description: "Rates, fees and EMI shown upfront — no hidden surprises." },
  { icon: "📆", title: "Flexible repayment", description: "Choose a tenure that fits your monthly budget." },
  { icon: "📲", title: "Digital application", description: "Upload documents online, no branch visits needed." },
];

export const loanSteps = [
  { title: "Check Eligibility", description: "Answer a few questions to see how much you could borrow." },
  { title: "Apply Online", description: "Fill a short step-by-step application form." },
  { title: "Submit Documents", description: "Upload KYC and income proof securely." },
  { title: "Verification", description: "Our team reviews and verifies your details." },
  { title: "Loan Processing", description: "On approval, funds are processed to your bank account." },
];

export const loanProducts: LoanProduct[] = [
  {
    slug: "personal-loan",
    name: "Personal Loan",
    shortDescription: "Quick access to funds",
    heroTitle: "Personal Loans for Life’s Moments",
    heroText:
      "Weddings, travel, medical needs or home upgrades — get a collateral-free personal loan with a simple digital application.",
    icon: "💳",
    overview: [
      "A personal loan is an unsecured loan you can use for almost any personal need. No collateral or guarantor is required.",
      "You repay in fixed monthly instalments (EMIs) over a tenure you choose, so planning your budget stays simple.",
    ],
    highlights: [
      { label: "Loan amount", value: "₹50,000 – ₹25 Lakh" },
      { label: "Tenure", value: "12 – 60 months" },
      { label: "Interest from", value: "10.99% p.a." },
      { label: "Processing fee", value: "Up to 2%" },
    ],
    amount: { min: 50000, max: 2500000 },
    tenureMonths: { min: 12, max: 60 },
    rateFrom: 10.99,
    eligibility: [
      "Indian resident aged 21–60 years",
      "Salaried or self-employed with a stable income",
      "Minimum monthly income of ₹20,000",
      "At least 1 year of total work experience",
      "Healthy credit history (CIBIL 700+ preferred)",
    ],
    documents: [
      { title: "Identity & address", items: ["PAN card", "Aadhaar card", "Passport / Voter ID (optional)"] },
      { title: "Income proof", items: ["Last 3 months’ salary slips", "Last 6 months’ bank statement", "Form 16 / ITR (if applicable)"] },
      { title: "Others", items: ["Recent passport-size photograph"] },
    ],
    benefits: [
      { icon: "🔓", title: "No collateral", description: "Borrow without pledging any asset." },
      { icon: "🎯", title: "Use for any need", description: "Wedding, travel, medical, education and more." },
      { icon: "📆", title: "Flexible tenure", description: "Repay over 12 to 60 months." },
      { icon: "📲", title: "100% digital", description: "Apply, upload and track from your phone." },
    ],
    process: [
      { title: "Check eligibility", description: "Know your eligible amount in under a minute." },
      { title: "Fill the application", description: "Personal, employment and loan details." },
      { title: "Upload documents", description: "KYC and income proofs." },
      { title: "Verification & approval", description: "We verify your details and share the decision." },
      { title: "Disbursal", description: "Approved amount is processed to your bank account." },
    ],
    faqs: [
      { question: "How much personal loan can I get?", answer: "Depending on your income, existing EMIs and credit profile, you can apply for ₹50,000 up to ₹25 Lakh." },
      { question: "Do I need a guarantor or collateral?", answer: "No. Personal loans are unsecured, so no collateral or guarantor is needed." },
      { question: "Can I prepay my loan?", answer: "Yes. Part-prepayment and foreclosure are allowed after the lock-in period mentioned in your loan agreement." },
      { question: "How is my EMI calculated?", answer: "EMI depends on loan amount, interest rate and tenure. Use our EMI calculator to see the exact monthly amount." },
    ],
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    shortDescription: "Support your business needs",
    heroTitle: "Business Loans That Grow With You",
    heroText:
      "Working capital, inventory, equipment or expansion — fund your business with a simple online application and flexible repayment.",
    icon: "🏪",
    overview: [
      "Business loans help MSMEs, traders, shop owners and self-employed professionals meet working capital and growth needs.",
      "Unsecured options are available for eligible businesses, with tenures designed around your cash flows.",
    ],
    highlights: [
      { label: "Loan amount", value: "₹1 Lakh – ₹50 Lakh" },
      { label: "Tenure", value: "12 – 60 months" },
      { label: "Interest from", value: "13.99% p.a." },
      { label: "Processing fee", value: "Up to 2.5%" },
    ],
    amount: { min: 100000, max: 5000000 },
    tenureMonths: { min: 12, max: 60 },
    rateFrom: 13.99,
    eligibility: [
      "Business owner aged 24–65 years",
      "Business vintage of at least 2 years",
      "Annual turnover of ₹10 Lakh or more",
      "Business must be profitable for the last year",
      "Healthy credit history for business and promoters",
    ],
    documents: [
      { title: "KYC", items: ["PAN of business & owner", "Aadhaar of owner", "Business address proof"] },
      { title: "Business proof", items: ["GST registration / Udyam certificate", "Shop & establishment licence"] },
      { title: "Financials", items: ["Last 12 months’ bank statement", "Last 2 years’ ITR with P&L and balance sheet"] },
    ],
    benefits: [
      { icon: "💼", title: "Working capital", description: "Manage inventory and day-to-day expenses." },
      { icon: "🏭", title: "Expand operations", description: "Buy equipment or open a new location." },
      { icon: "📆", title: "Flexible repayment", description: "Tenures that match your business cycle." },
      { icon: "📲", title: "Digital process", description: "Apply online with minimal paperwork." },
    ],
    process: [
      { title: "Check eligibility", description: "Share basic business and income details." },
      { title: "Fill the application", description: "Business, owner and requirement details." },
      { title: "Upload documents", description: "KYC, GST and financial statements." },
      { title: "Verification & approval", description: "Business and credit verification." },
      { title: "Disbursal", description: "Approved amount is processed to your business account." },
    ],
    faqs: [
      { question: "Who can apply for a business loan?", answer: "Proprietors, partnerships, private limited companies and self-employed professionals with at least 2 years of business vintage." },
      { question: "Is collateral required?", answer: "Unsecured business loans are available for eligible businesses. Larger amounts may need security." },
      { question: "What can I use the loan for?", answer: "Working capital, inventory, equipment purchase, expansion or any legitimate business purpose." },
      { question: "How long does approval take?", answer: "Once documents are complete, verification typically takes a few working days." },
    ],
  },
  {
    slug: "micro-finance-loan",
    name: "Micro Finance Loan",
    shortDescription: "Quick funds up to ₹5,000",
    heroTitle: "Micro Finance Loans for Immediate Needs",
    heroText:
      "Need funds urgently? Get a micro finance loan up to ₹5,000 with flexible repayment in 7-90 days. Quick approval and instant disbursement.",
    icon: "💰",
    overview: [
      "Micro finance loans are designed for quick access to small amounts of funds for immediate personal or business needs.",
      "With a simple application process and fast approval, you can get funds within days.",
    ],
    highlights: [
      { label: "Loan amount", value: "₹500 – ₹5,000" },
      { label: "Tenure", value: "7 – 90 days" },
      { label: "Interest from", value: "3% – 9% p.a." },
      { label: "Processing fee", value: "5%" },
    ],
    amount: { min: 500, max: 5000 },
    tenureMonths: { min: 0.23, max: 3 },
    rateFrom: 3,
    eligibility: [
      "Indian resident aged 18–60 years",
      "Active bank account",
      "Monthly income of ₹5,000 or more",
      "Valid contact details",
    ],
    documents: [
      { title: "Identity & address", items: ["Aadhaar card", "Pan card or Voter ID"] },
      { title: "Income proof", items: ["Latest 3 months bank statement"] },
      { title: "Others", items: ["Recent passport-size photograph"] },
    ],
    benefits: [
      { icon: "⚡", title: "Instant approval", description: "Get approval in under 24 hours." },
      { icon: "💳", title: "No collateral", description: "Borrow without any security." },
      { icon: "🚀", title: "Quick disbursal", description: "Funds transferred to your account immediately." },
      { icon: "📱", title: "100% digital", description: "Apply, approve and track from your phone." },
    ],
    process: [
      { title: "Quick application", description: "Fill a simple online form in 2 minutes." },
      { title: "Instant verification", description: "Verification done through your bank details." },
      { title: "Approval", description: "Get approval decision within 24 hours." },
      { title: "Disbursal", description: "Funds are transferred to your bank account." },
      { title: "Repay", description: "Choose flexible repayment between 7-90 days." },
    ],
    faqs: [
      { question: "How much micro finance loan can I get?", answer: "You can borrow between ₹500 to ₹5,000 depending on your income and eligibility." },
      { question: "How long does approval take?", answer: "Micro finance loans are approved within 24 hours in most cases." },
      { question: "Can I extend my loan duration?", answer: "Yes, you can request for an extension based on your repayment capacity and creditworthiness." },
      { question: "What is the processing fee?", answer: "The processing fee for micro finance loans is 5% of the loan amount." },
    ],
  },
];

export function getLoanProduct(slug: LoanProduct["slug"]) {
  const product = loanProducts.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown loan product: ${slug}`);
  return product;
}
