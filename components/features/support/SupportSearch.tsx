"use client";

import Link from "next/link";
import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { controlStyles } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import type { Faq } from "@/types";

export function SupportSearch({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 1);
  const results = words.length
    ? faqs.filter((f) => {
        const text = `${f.question} ${f.answer}`.toLowerCase();
        return words.every((w) => text.includes(w));
      })
    : [];

  return (
    <div>
      <label htmlFor="support-search" className="sr-only">
        Search your issue
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg" aria-hidden="true">
          🔍
        </span>
        <input
          id="support-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your issue, e.g. refund, recharge failed"
          className={cn(controlStyles(), "h-14 rounded-2xl pl-12 text-base shadow-card")}
          autoComplete="off"
        />
      </div>
      {q && (
        <div className="mt-4" aria-live="polite">
          {results.length ? (
            <>
              <p className="mb-2 text-sm text-slate-500">
                {results.length} result{results.length > 1 ? "s" : ""}
              </p>
              <Accordion items={results.slice(0, 6)} />
            </>
          ) : (
            <p className="rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-card">
              No matching answers.{" "}
              <Link href="#raise-request" className="font-semibold text-brand-700">
                Raise a support request
              </Link>{" "}
              and we’ll help you.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
