"use client";

import { useState, useSyncExternalStore } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StickyCTA } from "@/components/ui/Layout";
import { Stepper } from "@/components/ui/Stepper";
import { submitLoanApplication } from "@/lib/services/loans";
import { emptyApplication, steps, validators, type ApplicationErrors, type ApplicationValues, type FieldName } from "./schema";
import { DocumentsStep } from "./steps/DocumentsStep";
import { EmploymentStep } from "./steps/EmploymentStep";
import { KycStep } from "./steps/KycStep";
import { LoanStep } from "./steps/LoanStep";
import { PersonalStep } from "./steps/PersonalStep";
import { ReviewStep } from "./steps/ReviewStep";
import { SubmittedStep } from "./steps/SubmittedStep";

const DRAFT_KEY = "jj-loan-application-draft";

const stepMeta = [
  { title: "Personal Information", description: "Tell us a little about yourself." },
  { title: "Employment Details", description: "Your work and income details." },
  { title: "Loan Requirements", description: "How much do you need, and for how long?" },
  { title: "KYC Details", description: "Required by RBI guidelines to verify your identity." },
  { title: "Documents", description: "Upload clear copies of your documents." },
  { title: "Review", description: "Check everything before you submit." },
];

function readDraft() {
  try {
    return sessionStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
}

function saveDraft(values: ApplicationValues, step: number) {
  try {
    // Sensitive identifiers are never written to storage.
    const safe = { ...values, pan: "", aadhaar: "" };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ values: safe, step }));
  } catch {
    // Storage unavailable — draft simply isn't saved.
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

const noopSubscribe = () => () => {};

interface WizardProps {
  initial?: Partial<Pick<ApplicationValues, "amount" | "tenure" | "loanType">>;
}

export function LoanApplicationWizard({ initial }: WizardProps) {
  const [values, setValues] = useState<ApplicationValues>(() => ({ ...emptyApplication, loanType: "personal", ...initial }));
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ referenceId: string; submittedAt: string } | null>(null);
  const [draftDismissed, setDraftDismissed] = useState(false);

  // Read once on the client; server snapshot is null so markup matches during hydration.
  const draft = useSyncExternalStore(noopSubscribe, readDraft, () => null);
  const showDraftBanner = Boolean(draft) && !draftDismissed && step === 0 && !submitted;

  function set(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function goTo(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function next() {
    const stepErrors = validators[step](values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      const first = Object.keys(stepErrors)[0];
      // Wait for the error state to render, then move focus to the first invalid field.
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[aria-invalid="true"], #doc-${first}`)?.focus());
      return;
    }
    if (step < steps.length - 1) {
      saveDraft(values, step + 1);
      goTo(step + 1);
      return;
    }
    setSubmitting(true);
    try {
      setSubmitted(await submitLoanApplication());
      clearDraft();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  function resumeDraft() {
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft) as { values: Partial<ApplicationValues>; step: number };
      setValues((v) => ({ ...v, ...parsed.values }));
      // KYC identifiers aren't saved, so resume no further than the KYC step.
      setStep(Math.min(parsed.step, 3));
    } catch {
      clearDraft();
    }
    setDraftDismissed(true);
  }

  if (submitted) {
    return <SubmittedStep {...submitted} name={values.fullName} amount={Number(values.amount)} />;
  }

  const props = { values, errors, set };
  const meta = stepMeta[step];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      {showDraftBanner && (
        <Alert tone="info" title="Continue where you left off?">
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={resumeDraft}>
              Resume
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                clearDraft();
                setDraftDismissed(true);
              }}
            >
              Start fresh
            </Button>
          </div>
        </Alert>
      )}

      <Card>
        <Stepper steps={[...steps]} current={step} />
      </Card>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <Card className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{meta.title}</h2>
            <p className="mt-1 text-slate-500">{meta.description}</p>
          </div>

          {step === 0 && <PersonalStep {...props} />}
          {step === 1 && <EmploymentStep {...props} />}
          {step === 2 && <LoanStep {...props} />}
          {step === 3 && <KycStep {...props} />}
          {step === 4 && <DocumentsStep {...props} />}
          {step === 5 && <ReviewStep {...props} onEdit={goTo} />}

          <StickyCTA>
            <div className="flex gap-3 lg:justify-end">
              {step > 0 && (
                <Button variant="outline" size="lg" onClick={() => goTo(step - 1)} className="lg:min-w-32">
                  Back
                </Button>
              )}
              <Button type="submit" size="lg" fullWidth loading={submitting} className="flex-1 lg:w-auto lg:flex-none lg:min-w-48">
                {step === steps.length - 1 ? "Submit Application" : "Continue"}
              </Button>
            </div>
          </StickyCTA>
        </Card>
      </form>
      <p className="text-center text-xs text-slate-500">🔒 Your information is encrypted and only used to process your loan application.</p>
    </div>
  );
}
