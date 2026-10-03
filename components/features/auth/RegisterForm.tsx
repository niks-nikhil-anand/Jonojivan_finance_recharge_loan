"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import { delay } from "@/lib/services/mock";
import { isValidEmail, isValidMobile } from "@/lib/validation";
import { AuthSuccess } from "./AuthSuccess";
import { OtpVerify } from "./OtpVerify";

type Stage = "details" | "otp" | "done";

export function RegisterForm() {
  const [stage, setStage] = useState<Stage>("details");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);

  async function submit() {
    const next = {
      name: name.trim().length >= 2 ? undefined : "Enter your name",
      mobile: isValidMobile(mobile) ? undefined : "Enter a valid 10-digit mobile number",
      email: isValidEmail(email) ? undefined : "Enter a valid email address",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    await delay(600);
    setLoading(false);
    setStage("otp");
  }

  return (
    <Card padding="lg">
      {stage === "done" && <AuthSuccess title={`Welcome, ${name.trim().split(" ")[0]}!`} message="Your Jonojivan account is ready." />}
      {stage === "otp" && (
        <OtpVerify mobile={mobile} channel="SMS" onBack={() => setStage("details")} onVerified={() => setStage("done")} submitLabel="Verify & Create Account" />
      )}
      {stage === "details" && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col gap-5"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
            <p className="mt-1 text-slate-600">It takes less than a minute.</p>
          </div>
          <Input
            label="Full Name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((er) => ({ ...er, name: undefined }));
            }}
            error={errors.name}
          />
          <Input
            label="Mobile Number"
            leading="+91"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={mobile}
            onChange={(e) => {
              setMobile(onlyDigits(e.target.value, 10));
              setErrors((er) => ({ ...er, mobile: undefined }));
            }}
            error={errors.mobile}
            hint="We’ll send an OTP to verify this number."
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((er) => ({ ...er, email: undefined }));
            }}
            error={errors.email}
          />
          <Button type="submit" size="lg" fullWidth loading={loading}>
            Get OTP
          </Button>
          <p className="text-center text-xs text-slate-500">By continuing you agree to our Terms & Privacy Policy.</p>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-800">
              Login
            </Link>
          </p>
        </form>
      )}
    </Card>
  );
}
