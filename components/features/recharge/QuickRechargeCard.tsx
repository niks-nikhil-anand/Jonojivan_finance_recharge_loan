"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import { isValidMobile } from "@/lib/validation";

const popular = [299, 349, 399];

/** One-field recharge shortcut — hands the number to the full recharge flow. */
export function QuickRechargeCard() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string>();

  function go(amount?: number) {
    if (!isValidMobile(mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    const params = new URLSearchParams({ number: mobile });
    if (amount) params.set("amount", String(amount));
    router.push(`/recharge/mobile?${params}`);
  }

  return (
    <Card className="text-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Quick Recharge</h2>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Instant</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
        className="flex flex-col gap-4"
      >
        <Input
          label="Mobile Number"
          leading="+91"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="98765 43210"
          value={mobile}
          onChange={(e) => {
            setMobile(onlyDigits(e.target.value, 10));
            setError(undefined);
          }}
          error={error}
        />
        <Button type="submit" fullWidth size="lg">
          View Plans
        </Button>
      </form>
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">Popular plans</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {popular.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              className="h-11 rounded-xl border border-slate-200 font-semibold text-slate-800 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
            >
              ₹{p}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
