"use client";

import { useState } from "react";
import { BillDetailsCard } from "@/components/features/bills/BillDetailsCard";
import { CheckoutSheet, type SummaryLine } from "@/components/features/payment/CheckoutSheet";
import { PaymentResultView } from "@/components/features/payment/PaymentResult";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChipTabs, SegmentedControl } from "@/components/ui/Chips";
import { Input } from "@/components/ui/Field";
import { Skeleton, StickyCTA } from "@/components/ui/Layout";
import { SheetSelect } from "@/components/ui/SheetSelect";
import { cn } from "@/lib/cn";
import { circles, getOperator, operators } from "@/lib/data/operators";
import { buildPlans, planCategories } from "@/lib/data/plans";
import { formatINR, formatMobile, onlyDigits } from "@/lib/format";
import { detectOperator, fetchPostpaidBill, getPlans, type PaymentResult } from "@/lib/services/recharge";
import { isValidMobile } from "@/lib/validation";
import type { Bill, Plan, PlanCategory } from "@/types";
import { PlanCard } from "./PlanCard";

type Connection = "prepaid" | "postpaid";
type Stage = "form" | "plans" | "bill" | "done";

interface Checkout {
  title: string;
  amount: number;
  lines: SummaryLine[];
  subtitle: string;
}

interface Errors {
  mobile?: string;
  operator?: string;
  circle?: string;
}

function OperatorMark({ id }: { id: string }) {
  const op = getOperator(id);
  if (!op) return null;
  return <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold", op.badge)}>{op.name.slice(0, 4)}</span>;
}

const operatorOptions = operators.map((o) => ({ value: o.id, label: o.name, leading: <OperatorMark id={o.id} /> }));
const circleOptions = circles.map((c) => ({ value: c.id, label: c.name }));

interface MobileRechargeFormProps {
  initialNumber?: string;
  initialAmount?: number;
}

export function MobileRechargeForm({ initialNumber = "", initialAmount }: MobileRechargeFormProps) {
  const [initial] = useState(() => {
    const number = isValidMobile(initialNumber) ? initialNumber : "";
    return { number, detected: number ? detectOperator(number) : null };
  });

  const [connection, setConnection] = useState<Connection>("prepaid");
  const [mobile, setMobile] = useState(initial.number);
  const [operatorId, setOperatorId] = useState(initial.detected?.operatorId ?? "");
  const [circleId, setCircleId] = useState(initial.detected?.circleId ?? "");
  const [autoDetected, setAutoDetected] = useState(Boolean(initial.detected));
  const [errors, setErrors] = useState<Errors>({});

  const [stage, setStage] = useState<Stage>("form");
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [category, setCategory] = useState<PlanCategory>("popular");
  const [bill, setBill] = useState<Bill | null>(null);
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [result, setResult] = useState<(PaymentResult & { method: string }) | null>(null);

  const operator = getOperator(operatorId);
  const circle = circles.find((c) => c.id === circleId);
  const popularPlans = operatorId ? buildPlans(operatorId).filter((p) => p.categories.includes("popular")).slice(0, 3) : [];

  function handleMobileChange(value: string) {
    const digits = onlyDigits(value, 10);
    setMobile(digits);
    setErrors((e) => ({ ...e, mobile: undefined }));
    if (digits.length === 10) {
      const detected = detectOperator(digits);
      if (detected && (!operatorId || autoDetected)) {
        setOperatorId(detected.operatorId);
        setCircleId(detected.circleId);
        setAutoDetected(true);
        setErrors({});
      }
    }
  }

  function validate() {
    const next: Errors = {};
    if (!isValidMobile(mobile)) next.mobile = "Enter a valid 10-digit mobile number";
    if (!operatorId) next.operator = "Select your operator";
    if (connection === "prepaid" && !circleId) next.circle = "Select your circle";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function baseLines(): SummaryLine[] {
    return [
      { label: "Mobile Number", value: `+91 ${formatMobile(mobile)}` },
      { label: "Operator", value: `${operator?.name ?? ""} ${connection === "prepaid" ? "Prepaid" : "Postpaid"}` },
      ...(circle ? [{ label: "Circle", value: circle.name }] : []),
    ];
  }

  function selectPlan(plan: Plan) {
    if (!validate()) return;
    setCheckout({
      title: "Confirm Recharge",
      amount: plan.price,
      subtitle: `${operator?.name} · +91 ${formatMobile(mobile)}`,
      lines: [...baseLines(), { label: "Plan", value: [plan.data, plan.validity].filter((v) => v !== "—").join(" · ") }],
    });
    setCheckoutOpen(true);
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);
    try {
      if (connection === "prepaid") {
        const list = await getPlans(operatorId);
        setPlans(list);
        setCategory("popular");
        setStage("plans");
        const preselected = initialAmount ? list.find((p) => p.price === initialAmount) : undefined;
        if (preselected) selectPlan(preselected);
      } else {
        setBill(await fetchPostpaidBill(mobile));
        setStage("bill");
      }
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStage("form");
    setResult(null);
    setCheckout(null);
    setBill(null);
  }

  if (stage === "done" && result && checkout) {
    return (
      <PaymentResultView
        status={result.status}
        title={connection === "prepaid" ? "Recharge" : "Bill Payment"}
        amount={result.amount}
        subtitle={checkout.subtitle}
        transactionId={result.transactionId}
        date={result.date}
        method={result.method}
        onReset={reset}
        resetLabel="New Recharge"
      />
    );
  }

  const sheet = checkout && (
    <CheckoutSheet
      open={checkoutOpen}
      onClose={() => setCheckoutOpen(false)}
      title={checkout.title}
      lines={checkout.lines}
      amount={checkout.amount}
      onComplete={(r) => {
        setResult(r);
        setCheckoutOpen(false);
        setStage("done");
      }}
    />
  );

  if (stage === "plans") {
    const visible = plans.filter((p) => p.categories.includes(category));
    return (
      <div className="flex flex-col gap-5">
        <Card padding="sm" className="flex items-center gap-3">
          <OperatorMark id={operatorId} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900">+91 {formatMobile(mobile)}</p>
            <p className="truncate text-sm text-slate-500">
              {operator?.name} Prepaid · {circle?.name}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setStage("form")}>
            Change
          </Button>
        </Card>
        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-900">Choose a plan</h2>
          <ChipTabs
            label="Plan categories"
            items={planCategories.map((c) => ({ ...c, count: plans.filter((p) => p.categories.includes(c.id)).length }))}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div role="tabpanel" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <PlanCard key={p.id} plan={p} onSelect={selectPlan} highlighted={p.price === initialAmount} />
          ))}
        </div>
        {sheet}
      </div>
    );
  }

  if (stage === "bill" && bill) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col gap-5">
        <BillDetailsCard
          bill={bill}
          provider={`${operator?.name} Postpaid`}
          identifier={{ label: "Mobile Number", value: `+91 ${formatMobile(mobile)}` }}
          onChange={() => setStage("form")}
        />
        <StickyCTA>
          <Button
            fullWidth
            size="lg"
            variant="success"
            onClick={() => {
              setCheckout({
                title: "Confirm Bill Payment",
                amount: bill.amount,
                subtitle: `${operator?.name} Postpaid · +91 ${formatMobile(mobile)}`,
                lines: [...baseLines(), { label: "Customer", value: bill.customerName }],
              });
              setCheckoutOpen(true);
            }}
          >
            Pay {formatINR(bill.amount)}
          </Button>
        </StickyCTA>
        {sheet}
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
    >
      <Card className="flex flex-col gap-5">
        <SegmentedControl
          label="Connection type"
          value={connection}
          onChange={(v) => {
            setConnection(v);
            setErrors({});
          }}
          options={[
            { value: "prepaid", label: "Prepaid" },
            { value: "postpaid", label: "Postpaid" },
          ]}
        />
        <Input
          label="Mobile Number"
          leading="+91"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="98765 43210"
          value={mobile}
          onChange={(e) => handleMobileChange(e.target.value)}
          error={errors.mobile}
          autoFocus={!initial.number}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <SheetSelect
            label="Operator"
            placeholder="Select Operator"
            sheetTitle="Select your operator"
            options={operatorOptions}
            value={operatorId}
            onChange={(v) => {
              setOperatorId(v);
              setAutoDetected(false);
              setErrors((e) => ({ ...e, operator: undefined }));
            }}
            error={errors.operator}
            hint={autoDetected ? "Auto-detected — tap to change" : undefined}
          />
          {connection === "prepaid" && (
            <SheetSelect
              label="Circle"
              placeholder="Select Circle"
              sheetTitle="Select your circle"
              searchPlaceholder="Search state or city"
              options={circleOptions}
              value={circleId}
              onChange={(v) => {
                setCircleId(v);
                setErrors((e) => ({ ...e, circle: undefined }));
              }}
              error={errors.circle}
            />
          )}
        </div>

        {connection === "prepaid" && popularPlans.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-sm font-medium text-slate-600">Popular Plans</p>
              {operator && <Badge tone="brand">{operator.name}</Badge>}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {popularPlans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPlan(p)}
                  className="flex flex-col items-center rounded-xl border border-slate-200 px-2 py-2.5 hover:border-brand-400 hover:bg-brand-50"
                >
                  <span className="font-bold text-slate-900">₹{p.price}</span>
                  <span className="text-xs text-slate-500">{p.validity}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <StickyCTA>
          <Button type="submit" fullWidth size="lg" loading={loading}>
            {connection === "prepaid" ? "View Plans" : "Fetch Bill"}
          </Button>
        </StickyCTA>
      </Card>

      {loading && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2" aria-hidden="true">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      )}
      {sheet}
    </form>
  );
}
