"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { processPayment, type PaymentResult } from "@/lib/services/recharge";

export interface SummaryLine {
  label: string;
  value: string;
}

interface CheckoutSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  lines: SummaryLine[];
  amount: number;
  onComplete: (result: PaymentResult & { method: string }) => void;
}

const methods = [
  { id: "UPI", label: "UPI", description: "Google Pay, PhonePe, Paytm & more", icon: "⚡" },
  { id: "Debit Card", label: "Debit / Credit Card", description: "Visa, Mastercard, RuPay", icon: "💳" },
  { id: "Net Banking", label: "Net Banking", description: "All major banks", icon: "🏦" },
];

/** Review + payment-method bottom sheet shared by every recharge and bill flow. */
export function CheckoutSheet({ open, onClose, title, lines, amount, onComplete }: CheckoutSheetProps) {
  const [method, setMethod] = useState(methods[0].id);
  const [paying, setPaying] = useState(false);

  async function pay() {
    setPaying(true);
    try {
      const result = await processPayment(amount);
      onComplete({ ...result, method });
    } finally {
      setPaying(false);
    }
  }

  return (
    <BottomSheet
      open={open}
      onClose={() => !paying && onClose()}
      title={title}
      footer={
        <Button fullWidth size="lg" variant="success" onClick={pay} loading={paying}>
          {paying ? "Processing payment…" : `Pay ${formatINR(amount)}`}
        </Button>
      }
    >
      <dl className="divide-y divide-slate-100 rounded-2xl bg-slate-50 px-4">
        {lines.map((l) => (
          <div key={l.label} className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-slate-500">{l.label}</dt>
            <dd className="text-right font-medium text-slate-900">{l.value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 py-3">
          <dt className="font-semibold text-slate-900">Total payable</dt>
          <dd className="text-lg font-bold text-slate-900">{formatINR(amount)}</dd>
        </div>
      </dl>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-slate-700">Pay using</legend>
        <div className="flex flex-col gap-2">
          {methods.map((m) => (
            <label
              key={m.id}
              className={cn(
                "flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-colors",
                method === m.id ? "border-brand-500 bg-brand-50/60 ring-2 ring-brand-100" : "border-slate-200 hover:bg-slate-50",
              )}
            >
              <input type="radio" name="payment-method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="sr-only" />
              <span className="text-xl" aria-hidden="true">
                {m.icon}
              </span>
              <span className="flex-1">
                <span className="block font-medium text-slate-900">{m.label}</span>
                <span className="block text-xs text-slate-500">{m.description}</span>
              </span>
              <span
                className={cn("grid size-5 place-items-center rounded-full border-2", method === m.id ? "border-brand-600" : "border-slate-300")}
                aria-hidden="true"
              >
                {method === m.id && <span className="size-2.5 rounded-full bg-brand-600" />}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-4 text-center text-xs text-slate-500">🔒 Payments are encrypted and processed securely.</p>
    </BottomSheet>
  );
}
