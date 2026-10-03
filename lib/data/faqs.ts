import type { Faq, FaqGroup } from "@/types";

export const faqGroups: { id: FaqGroup; label: string }[] = [
  { id: "recharge", label: "Recharge" },
  { id: "bills", label: "Bills" },
  { id: "loans", label: "Loans" },
  { id: "payments", label: "Payments" },
  { id: "account", label: "Account" },
];

export const faqs: Faq[] = [
  { group: "recharge", question: "How can I recharge my mobile?", answer: "Go to Recharge → Mobile, enter your 10-digit number, confirm the operator and circle, pick a plan and pay. Your recharge is usually completed within seconds." },
  { group: "recharge", question: "Which mobile operators are supported?", answer: "We support all major operators including Jio, Airtel, Vi, BSNL and MTNL for both prepaid and postpaid connections." },
  { group: "recharge", question: "Which DTH providers are supported?", answer: "Tata Play, Airtel Digital TV, Dish TV, d2h and Sun Direct are supported. Just enter your Subscriber ID / Customer ID to recharge." },
  { group: "recharge", question: "My recharge failed but money was deducted. What now?", answer: "Don’t worry. Failed recharges are automatically refunded to your original payment method, typically within 3–5 working days." },
  { group: "bills", question: "Which bills can I pay?", answer: "Electricity, broadband, FASTag, piped gas, water, landline and insurance premiums from a wide list of providers across India." },
  { group: "bills", question: "Where do I find my consumer number?", answer: "It’s printed on your latest bill, usually near your name and address. The bill payment screen shows a hint for each provider type." },
  { group: "bills", question: "How long does a bill payment take to reflect?", answer: "Most billers update within a few minutes, though some may take up to 2 working days. Keep your transaction ID handy for reference." },
  { group: "loans", question: "How do I apply for a loan?", answer: "Choose Personal or Business Loan, check your eligibility, then complete the step-by-step application. You can upload documents online." },
  { group: "loans", question: "How can I check my loan application?", answer: "Your application reference is shown after submission and in Transactions. Our team will also contact you on your registered mobile number." },
  { group: "loans", question: "Does checking eligibility affect my credit score?", answer: "No. The eligibility check on our website is an estimate and does not impact your credit score." },
  { group: "payments", question: "Which payment methods are accepted?", answer: "UPI, debit cards, credit cards, net banking and popular wallets." },
  { group: "payments", question: "Is my payment secure?", answer: "Yes. Payments are processed over encrypted connections through regulated payment partners. We never store your card PIN or UPI PIN." },
  { group: "payments", question: "How do refunds work?", answer: "Refunds for failed transactions are credited back to the original payment source, usually within 3–5 working days." },
  { group: "account", question: "How do I create an account?", answer: "Tap Register, enter your name, mobile number and email, then verify with the OTP sent to your phone." },
  { group: "account", question: "I didn’t receive the OTP.", answer: "Check that your number is correct and has network coverage. You can request a new OTP after 30 seconds." },
];
