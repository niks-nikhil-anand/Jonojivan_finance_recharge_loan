"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/ui/OtpInput";
import { formatMobile } from "@/lib/format";
import { delay } from "@/lib/services/mock";
import { patterns } from "@/lib/validation";

interface OtpVerifyProps {
  mobile: string;
  channel: "SMS" | "WhatsApp";
  onVerified: () => void;
  onBack: () => void;
  submitLabel?: string;
}

const RESEND_SECONDS = 30;

export function OtpVerify({ mobile, channel, onVerified, onBack, submitLabel = "Verify & Continue" }: OtpVerifyProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  async function verify() {
    if (!patterns.otp.test(otp)) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    await delay(700);
    setLoading(false);
    onVerified();
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        verify();
      }}
      className="flex flex-col gap-5"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Verify OTP</h1>
        <p className="mt-1 text-slate-600">
          Enter the 6-digit code sent via {channel} to <span className="font-semibold text-slate-900">+91 {formatMobile(mobile)}</span>{" "}
          <button type="button" onClick={onBack} className="font-semibold text-brand-700 hover:text-brand-800">
            Edit
          </button>
        </p>
      </div>
      <OtpInput
        value={otp}
        onChange={(v) => {
          setOtp(v);
          setError(undefined);
        }}
        error={error}
      />
      <p className="text-sm text-slate-500" aria-live="polite">
        {seconds > 0 ? (
          <>Resend OTP in 0:{String(seconds).padStart(2, "0")}</>
        ) : (
          <button
            type="button"
            className="font-semibold text-brand-700 hover:text-brand-800"
            onClick={() => {
              setSeconds(RESEND_SECONDS);
              setResent(true);
              setOtp("");
            }}
          >
            Resend OTP
          </button>
        )}
        {resent && seconds > 0 && <span className="ml-2 text-emerald-700">· New OTP sent</span>}
      </p>
      <Button type="submit" size="lg" fullWidth loading={loading}>
        {submitLabel}
      </Button>
      <p className="text-center text-xs text-slate-400">Demo mode: any 6 digits will work.</p>
    </form>
  );
}
