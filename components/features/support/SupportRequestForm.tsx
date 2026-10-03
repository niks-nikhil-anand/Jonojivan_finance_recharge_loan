"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, SelectField, Textarea } from "@/components/ui/Field";
import { onlyDigits } from "@/lib/format";
import { submitSupportRequest } from "@/lib/services/loans";
import { isValidMobile } from "@/lib/validation";
import { issueCategories } from "./supportData";

interface SupportRequestFormProps {
  initialCategory?: string;
  initialTransactionId?: string;
}

export function SupportRequestForm({ initialCategory = "", initialTransactionId = "" }: SupportRequestFormProps) {
  const [category, setCategory] = useState(initialCategory);
  const [txn, setTxn] = useState(initialTransactionId);
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<string>();

  async function submit() {
    const next = {
      category: category ? undefined : "Select an issue type",
      mobile: isValidMobile(mobile) ? undefined : "Enter a valid 10-digit mobile number",
      message: message.trim().length >= 10 ? undefined : "Please describe the issue (at least 10 characters)",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    try {
      setTicket((await submitSupportRequest()).ticketId);
    } finally {
      setLoading(false);
    }
  }

  if (ticket) {
    return (
      <Card>
        <Alert tone="success" title={`Request raised · ${ticket}`}>
          Thanks! Our support team will contact you on +91 {mobile} within 24 hours. Keep the ticket ID for reference.
        </Alert>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => {
            setTicket(undefined);
            setMessage("");
          }}
        >
          Raise another request
        </Button>
      </Card>
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
      <Card className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Issue Type"
          placeholder="Select"
          options={issueCategories.map((c) => ({ value: c.id, label: c.label }))}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setErrors((er) => ({ ...er, category: undefined }));
          }}
          error={errors.category}
        />
        <Input
          label="Transaction ID (optional)"
          placeholder="e.g. JJ829392"
          value={txn}
          onChange={(e) => setTxn(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12))}
        />
        <Input
          label="Registered Mobile"
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
          wrapperClassName="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <Textarea
            label="Describe your issue"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrors((er) => ({ ...er, message: undefined }));
            }}
            error={errors.message}
            maxLength={1000}
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" size="lg" fullWidth loading={loading} className="sm:w-auto">
            Submit Request
          </Button>
        </div>
      </Card>
    </form>
  );
}
