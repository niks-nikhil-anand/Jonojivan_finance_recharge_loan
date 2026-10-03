import type { Transaction } from "@/types";

export const transactions: Transaction[] = [
  { id: "JJ829392", type: "recharge", service: "mobile", title: "Mobile Recharge", provider: "Jio", reference: "9876544321", amount: 299, status: "success", date: "2026-10-02T10:24:00+05:30", paymentMethod: "UPI", description: "1.5 GB/day · 28 Days · Unlimited Calls" },
  { id: "JJ829377", type: "bill", service: "electricity", title: "Electricity", provider: "BESCOM", reference: "1234567890", amount: 1240, status: "success", date: "2026-10-02T09:02:00+05:30", paymentMethod: "UPI" },
  { id: "JJ829301", type: "recharge", service: "dth", title: "DTH Recharge", provider: "Tata Play", reference: "1023456789", amount: 449, status: "pending", date: "2026-10-01T20:41:00+05:30", paymentMethod: "Debit Card", statusNote: "The operator is confirming your recharge. This usually completes within 30 minutes." },
  { id: "JJ829255", type: "bill", service: "broadband", title: "Broadband", provider: "ACT Fibernet", reference: "ACT55410922", amount: 1059, status: "success", date: "2026-09-30T18:15:00+05:30", paymentMethod: "Credit Card" },
  { id: "JJ829190", type: "recharge", service: "mobile", title: "Mobile Recharge", provider: "Airtel", reference: "9123458812", amount: 359, status: "failed", date: "2026-09-29T13:07:00+05:30", paymentMethod: "UPI", statusNote: "The operator could not process this recharge. ₹359 has been refunded to your UPI account." },
  { id: "JJ829104", type: "bill", service: "fastag", title: "FASTag", provider: "ICICI Bank FASTag", reference: "KA01AB1234", amount: 500, status: "success", date: "2026-09-27T08:30:00+05:30", paymentMethod: "UPI" },
  { id: "JJLN20419", type: "loan", service: "loan", title: "Personal Loan Application", provider: "Jonojivan Loans", reference: "₹2,00,000 · 24 months", amount: 200000, status: "pending", date: "2026-09-25T16:20:00+05:30", paymentMethod: "—", statusNote: "Your application is under verification. We’ll update you by SMS." },
  { id: "JJ828980", type: "bill", service: "gas", title: "Piped Gas", provider: "Indraprastha Gas", reference: "50012345678", amount: 612, status: "success", date: "2026-09-22T11:45:00+05:30", paymentMethod: "Net Banking" },
  { id: "JJ828911", type: "bill", service: "insurance", title: "Insurance Premium", provider: "LIC of India", reference: "LIC88213450", amount: 4850, status: "success", date: "2026-09-18T19:10:00+05:30", paymentMethod: "Debit Card" },
  { id: "JJ828870", type: "bill", service: "water", title: "Water", provider: "BWSSB", reference: "RR4410923", amount: 380, status: "failed", date: "2026-09-15T07:55:00+05:30", paymentMethod: "UPI", statusNote: "Payment was declined by your bank. No money was deducted." },
  { id: "JJ828802", type: "recharge", service: "mobile", title: "Mobile Recharge", provider: "Vi", reference: "9988776655", amount: 199, status: "success", date: "2026-09-10T21:30:00+05:30", paymentMethod: "Wallet" },
  { id: "JJ828766", type: "bill", service: "landline", title: "Landline", provider: "BSNL Landline", reference: "08022334455", amount: 499, status: "success", date: "2026-09-05T10:00:00+05:30", paymentMethod: "UPI" },
];
