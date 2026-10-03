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
import { billProviders } from "@/lib/data/bill-providers";
import { billCategories } from "@/lib/data/services";
import { formatINR, onlyDigits } from "@/lib/format";
import { BillFetchError, fetchBill } from "@/lib/services/bills";
import type { PaymentResult } from "@/lib/services/recharge";
import type { Bill, BillCategory } from "@/types";
import { BillDetailsCard } from "./BillDetailsCard";

interface FormErrors {
  provider?: string;
  identifier?: string;
  extra?: string;
}

/**
 * One flow for every bill category: select provider → enter identifier → fetch → pay.
 * Category differences (labels, validation, wallet top-up, extra fields) come from config.
 */
export function BillPaymentFlow({ category }: { category: BillCategory }) {
  const config = billCategories[category];
  const providers = billProviders[category];
  const providerOptions = providers.map((p) => ({
    value: p.id,
    label: p.name,
    description: p.region,
    leading: (
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-lg" aria-hidden="true">
        {config.icon}
      </span>
    ),
  }));

  const [providerId, setProviderId] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [extra, setExtra] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<{ tone: "danger" | "success"; message: string }>();
  const [bill, setBill] = useState<Bill | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [amountError, setAmountError] = useState<string>();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [result, setResult] = useState<(PaymentResult & { method: string }) | null>(null);

  const provider = providers.find((p) => p.id === providerId);
  const isWallet = Boolean(config.customAmount);
  const payable = isWallet ? Number(customAmount) || 0 : (bill?.amount ?? 0);

  function normalise(value: string) {
    if (config.idInputMode === "numeric") return onlyDigits(value, config.idMaxLength);
    const v = value.replace(/[^A-Za-z0-9]/g, "").slice(0, config.idMaxLength);
    return config.uppercase ? v.toUpperCase() : v;
  }

  async function submit() {
    const next: FormErrors = {};
    if (!providerId) next.provider = `Select your ${config.providerLabel.toLowerCase()}`;
    if (!new RegExp(config.idPattern).test(identifier)) next.identifier = `Enter a valid ${config.idLabel.toLowerCase()}`;
    if (config.extraField && !extra) next.extra = `${config.extraField.label} is required`;
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setFetchError(undefined);
    try {
      setBill(await fetchBill(category, providerId, identifier));
      setCustomAmount("");
    } catch (e) {
      if (e instanceof BillFetchError) {
        setFetchError({ tone: e.code === "no_due" ? "success" : "danger", message: e.message });
      } else {
        setFetchError({ tone: "danger", message: "We couldn’t reach the biller. Please try again in a moment." });
      }
    } finally {
      setLoading(false);
    }
  }

  function proceed() {
    if (config.customAmount) {
      const { min, max } = config.customAmount;
      if (payable < min || payable > max) {
        setAmountError(`Enter an amount between ${formatINR(min)} and ${formatINR(max)}`);
        return;
      }
    }
    setCheckoutOpen(true);
  }

  function reset() {
    setResult(null);
    setBill(null);
    setIdentifier("");
    setExtra("");
  }

  if (result && bill) {
    return (
      <PaymentResultView
        status={result.status}
        title={isWallet ? "Recharge" : "Payment"}
        amount={result.amount}
        subtitle={`${provider?.name} · ${identifier}`}
        transactionId={result.transactionId}
        date={result.date}
        method={result.method}
        onReset={reset}
        resetLabel={`Pay another ${config.title.toLowerCase()}`}
      />
    );
  }

  if (bill) {
    return (
      <div className="mx-auto w-full flex max-w-lg flex-col gap-5">
        {isWallet && config.customAmount ? (
          <Card className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{provider?.name}</p>
                <p className="font-semibold text-slate-900">{bill.customerName}</p>
                <p className="text-sm text-slate-500">{identifier}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setBill(null)}>
                Change
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Current balance</span>
              <span className="text-lg font-bold text-slate-900">{formatINR(bill.balance ?? 0)}</span>
            </div>
            <Input
              label="Top-up Amount"
              leading="₹"
              inputMode="numeric"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(onlyDigits(e.target.value, 5));
                setAmountError(undefined);
              }}
              error={amountError}
              hint={`Min ${formatINR(config.customAmount.min)} · Max ${formatINR(config.customAmount.max)}`}
            />
            <div className="grid grid-cols-4 gap-2">
              {config.customAmount.presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setCustomAmount(String(p));
                    setAmountError(undefined);
                  }}
                  className={cn(
                    "h-11 rounded-xl border text-sm font-semibold",
                    Number(customAmount) === p ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-700 hover:bg-slate-50",
                  )}
                >
                  ₹{p}
                </button>
              ))}
            </div>
          </Card>
        ) : (
          <BillDetailsCard bill={bill} provider={provider?.name ?? ""} identifier={{ label: config.idLabel, value: identifier }} onChange={() => setBill(null)} />
        )}
        <StickyCTA>
          <Button fullWidth size="lg" variant="success" onClick={proceed} disabled={payable <= 0}>
            Pay {payable > 0 ? formatINR(payable) : ""}
          </Button>
        </StickyCTA>
        <CheckoutSheet
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          title={`Confirm ${config.title}`}
          amount={payable}
          lines={[
            { label: config.providerLabel, value: provider?.name ?? "" },
            { label: config.idLabel, value: identifier },
            { label: "Customer", value: bill.customerName },
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
        submit();
      }}
      className="mx-auto w-full max-w-lg"
    >
      <Card className="flex flex-col gap-5">
        <SheetSelect
          label={`Select ${config.providerLabel}`}
          placeholder={`Select ${config.providerLabel}`}
          sheetTitle={`Select ${config.providerLabel}`}
          searchPlaceholder={`Search ${providers.length} providers`}
          options={providerOptions}
          value={providerId}
          onChange={(v) => {
            setProviderId(v);
            setErrors((e) => ({ ...e, provider: undefined }));
          }}
          error={errors.provider}
        />
        <Input
          label={config.idLabel}
          placeholder={config.idPlaceholder}
          inputMode={config.idInputMode}
          autoCapitalize={config.uppercase ? "characters" : "off"}
          autoComplete="off"
          value={identifier}
          onChange={(e) => {
            setIdentifier(normalise(e.target.value));
            setErrors((er) => ({ ...er, identifier: undefined }));
          }}
          error={errors.identifier}
          hint={config.idHelp}
        />
        {config.extraField && (
          <Input
            label={config.extraField.label}
            type={config.extraField.type}
            value={extra}
            onChange={(e) => {
              setExtra(e.target.value);
              setErrors((er) => ({ ...er, extra: undefined }));
            }}
            error={errors.extra}
          />
        )}
        {fetchError && <Alert tone={fetchError.tone}>{fetchError.message}</Alert>}
        <StickyCTA>
          <Button type="submit" fullWidth size="lg" loading={loading}>
            {isWallet ? "Continue" : "Fetch Bill"}
          </Button>
        </StickyCTA>
      </Card>
    </form>
  );
}
