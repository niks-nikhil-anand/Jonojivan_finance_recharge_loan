"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import { delay } from "@/lib/services/mock";
import { isValidMobile } from "@/lib/validation";
import { AuthSuccess } from "./AuthSuccess";
import { OtpVerify } from "./OtpVerify";

type Stage = "mobile" | "otp" | "done";

export function LoginForm() {
  const [stage, setStage] = useState<Stage>("mobile");
  const [mobile, setMobile] = useState("");
  const [channel, setChannel] = useState<"SMS" | "WhatsApp">("SMS");
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState<"SMS" | "WhatsApp" | null>(null);

  async function sendOtp(via: "SMS" | "WhatsApp") {
    if (!isValidMobile(mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setSending(via);
    await delay(600);
    setSending(null);
    setChannel(via);
    setStage("otp");
  }

  return (
    <Card padding="lg">
      {stage === "done" && <AuthSuccess title="You’re logged in" message="Welcome back to Jonojivan." />}
      {stage === "otp" && <OtpVerify mobile={mobile} channel={channel} onBack={() => setStage("mobile")} onVerified={() => setStage("done")} />}
      {stage === "mobile" && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            sendOtp("SMS");
          }}
          className="flex flex-col gap-5"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-1 text-slate-600">Login with your registered mobile number.</p>
          </div>
          <Input
            label="Mobile Number"
            leading="+91"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            autoFocus
            placeholder="98765 43210"
            value={mobile}
            onChange={(e) => {
              setMobile(onlyDigits(e.target.value, 10));
              setError(undefined);
            }}
            error={error}
          />
          <Button type="submit" size="lg" fullWidth loading={sending === "SMS"} disabled={sending !== null}>
            Continue
          </Button>
          <div className="flex items-center gap-3 text-xs font-medium tracking-wider text-slate-400 uppercase">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <Button variant="outline" size="lg" fullWidth onClick={() => sendOtp("WhatsApp")} loading={sending === "WhatsApp"} disabled={sending !== null}>
            💬 Continue with OTP on WhatsApp
          </Button>
          <p className="text-center text-sm text-slate-600">
            New to Jonojivan?{" "}
            <Link href="/register" className="font-semibold text-brand-700 hover:text-brand-800">
              Create an account
            </Link>
          </p>
        </form>
      )}
    </Card>
  );
}
