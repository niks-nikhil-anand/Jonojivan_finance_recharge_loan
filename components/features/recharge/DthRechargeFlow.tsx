"use client";

import { useState } from "react";
import { CheckoutSheet } from "@/components/features/payment/CheckoutSheet";
import { PaymentResultView } from "@/components/features/payment/PaymentResult";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { StickyCTA } from "@/components/ui/Layout";
import { SheetSelect } from "@/components/ui/SheetSelect";
import { cn } from "@/lib/cn";
import { dthProviders } from "@/lib/data/operators";
import { formatDate, formatINR, onlyDigits } from "@/lib/format";
import { fetchDthAccount, type PaymentResult } from "@/lib/services/recharge";
import type { DthAccount } from "@/types";

const providerOptions = dthProviders.map((p) => ({
  value: p.id,
  label: p.name,
  leading: <span className="grid size-8 place-items-center rounded-lg bg-slate-100 text-lg">📺</span>,
}));

export function DthRechargeFlow() {
  const [providerId, setProviderId] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [errors, setErrors] = useState<{ provider?: string; subscriber?: string }>({});
  const [fetchError, setFetchError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<DthAccount | null>(null);
  const [planId, setPlanId] = useState<string>("current");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string>();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [result, setResult] = useState<(PaymentResult & { method: string }) | null>(null);

  const provider = dthProviders.find((p) => p.id === providerId);
  const numericAmount = Number(amount) || 0;

  async function lookup() {
    const next: typeof errors = {};
    if (!providerId) next.provider = "Select your DTH provider";
    if (!/^\d{8,12}$/.test(subscriberId)) next.subscriber = "Enter a valid 8–12 digit Subscriber ID";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setFetchError(undefined);
    try {
      const acc = await fetchDthAccount(providerId, subscriberId);
      setAccount(acc);
      setPlanId("current");
      setAmount(String(acc.dueAmount || acc.monthlyAmount));
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function choosePlan(id: string, price: number) {
    setPlanId(id);
    setAmount(String(price));
    setAmountError(undefined);
  }

  function proceed() {
    if (numericAmount < 10 || numericAmount > 25000) {
      setAmountError("Enter an amount between ₹10 and ₹25,000");
      return;
    }
    setCheckoutOpen(true);
  }

  if (result && account) {
    return (
      <PaymentResultView
        status={result.status}
        title="DTH Recharge"
        amount={result.amount}
        subtitle={`${provider?.name} · ${account.subscriberId}`}
        transactionId={result.transactionId}
        date={result.date}
        method={result.method}
        onReset={() => {
          setResult(null);
          setAccount(null);
          setSubscriberId("");
        }}
        resetLabel="New Recharge"
      />
    );
  }

  if (account) {
    const selectedPlan = account.recommendedPlans.find((p) => p.id === planId);
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{provider?.name}</p>
              <p className="text-lg font-semibold text-slate-900">{account.customerName}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setAccount(null)}>
              Change
            </Button>
          </div>
          <dl className="divide-y divide-slate-100 px-5 text-sm">
            {[
              ["Subscriber ID", account.subscriberId],
              ["Current Plan", account.currentPlan],
              ["Monthly Amount", formatINR(account.monthlyAmount)],
              ["Current Balance", formatINR(account.balance)],
              ["Next Recharge By", formatDate(account.nextRechargeDate)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-slate-500">{k}</dt>
                <dd className="text-right font-medium text-slate-900">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center justify-between bg-amber-50 px-5 py-4">
            <span className="font-semibold text-amber-800">Due Amount</span>
            <span className="text-2xl font-extrabold text-slate-900">{formatINR(account.dueAmount)}</span>
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-900">Recommended plans</h2>
            <div role="radiogroup" aria-label="Recommended plans" className="grid gap-3 sm:grid-cols-2">
              <PlanOption
                selected={planId === "current"}
                onSelect={() => choosePlan("current", account.dueAmount || account.monthlyAmount)}
                title="Pay due amount"
                subtitle={`Continue ${account.currentPlan}`}
                price={account.dueAmount || account.monthlyAmount}
              />
              {account.recommendedPlans.map((p) => (
                <PlanOption
                  key={p.id}
                  selected={planId === p.id}
                  onSelect={() => choosePlan(p.id, p.price)}
                  title={p.name}
                  subtitle={`${p.channels} · ${p.validity}`}
                  price={p.price}
                />
              ))}
            </div>
          </div>
          <Card padding="sm">
            <Input
              label="Recharge Amount"
              leading="₹"
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                setAmount(onlyDigits(e.target.value, 5));
                setPlanId("custom");
                setAmountError(undefined);
              }}
              error={amountError}
              hint="You can also enter a custom amount."
            />
          </Card>
          <StickyCTA>
            <Button fullWidth size="lg" variant="success" onClick={proceed} disabled={!numericAmount}>
              Recharge {numericAmount ? formatINR(numericAmount) : ""}
            </Button>
          </StickyCTA>
        </div>

        <CheckoutSheet
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          title="Confirm DTH Recharge"
          amount={numericAmount}
          lines={[
            { label: "Provider", value: provider?.name ?? "" },
            { label: "Subscriber ID", value: account.subscriberId },
            { label: "Customer", value: account.customerName },
            { label: "Plan", value: selectedPlan?.name ?? (planId === "current" ? account.currentPlan : "Custom amount") },
          ]}
          onComplete={(r) => {
            setResult(r);
            setCheckoutOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        lookup();
      }}
      className="mx-auto w-full max-w-lg"
    >
      <Card className="flex flex-col gap-5">
        <SheetSelect
          label="Select Provider"
          placeholder="Select Provider"
          sheetTitle="Select your DTH provider"
          options={providerOptions}
          value={providerId}
          onChange={(v) => {
            setProviderId(v);
            setErrors((e) => ({ ...e, provider: undefined }));
          }}
          error={errors.provider}
        />
        <Input
          label="Subscriber ID"
          inputMode="numeric"
          placeholder="Enter Subscriber / Customer ID"
          value={subscriberId}
          onChange={(e) => {
            setSubscriberId(onlyDigits(e.target.value, 12));
            setErrors((er) => ({ ...er, subscriber: undefined }));
          }}
          error={errors.subscriber}
          hint="Find it on your set-top box screen or welcome letter. Usually 10 digits."
        />
        {fetchError && <Alert tone="danger">{fetchError}</Alert>}
        <StickyCTA>
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Continue
          </Button>
        </StickyCTA>
      </Card>
    </form>
  );
}

function PlanOption({ selected, onSelect, title, subtitle, price }: { selected: boolean; onSelect: () => void; title: string; subtitle: string; price: number }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 text-left transition-colors",
        selected ? "border-brand-500 ring-2 ring-brand-100" : "border-slate-200 hover:border-slate-300",
      )}
    >
      <span className="min-w-0">
        <span className="block font-semibold text-slate-900">{title}</span>
        <span className="block text-xs text-slate-500">{subtitle}</span>
      </span>
      <span className="shrink-0 text-lg font-bold text-slate-900">{formatINR(price)}</span>
    </button>
  );
}
