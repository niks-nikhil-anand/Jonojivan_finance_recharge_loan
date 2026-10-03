"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { delay } from "@/lib/services/mock";
import { isValidEmail } from "@/lib/validation";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit() {
    const next = {
      name: name.trim() ? undefined : "Enter your name",
      email: isValidEmail(email) ? undefined : "Enter a valid email address",
      message: message.trim().length >= 10 ? undefined : "Please write at least 10 characters",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    await delay(700);
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <Alert tone="success" title="Message sent">
        Thanks, {name.split(" ")[0]}. We’ll reply to {email} within 1–2 working days.
      </Alert>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <Input label="Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <div className="sm:col-span-2">
        <Textarea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} error={errors.message} maxLength={1000} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" loading={loading} fullWidth className="sm:w-auto">
          Send Message
        </Button>
      </div>
    </form>
  );
}
