"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
}

export function OtpInput({ value, onChange, length = 6, error }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function setAt(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, length));
  }

  return (
    <div>
      <div className="flex justify-between gap-2" role="group" aria-label="One-time password">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={d}
            autoFocus={i === 0}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              if (v.length > 1) {
                // Pasted or autofilled full code
                onChange(v.slice(0, length));
                refs.current[Math.min(v.length, length) - 1]?.focus();
                return;
              }
              setAt(i, v);
              if (v && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus();
              if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
              if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onPaste={(e) => {
              const v = e.clipboardData.getData("text").replace(/\D/g, "");
              if (v) {
                e.preventDefault();
                onChange(v.slice(0, length));
                refs.current[Math.min(v.length, length) - 1]?.focus();
              }
            }}
            className={cn(
              "h-14 w-full min-w-0 rounded-xl border bg-white text-center text-xl font-semibold text-slate-900 focus:outline-none focus:ring-4",
              error ? "border-rose-400 focus:ring-rose-100" : "border-slate-300 focus:border-brand-500 focus:ring-brand-100",
            )}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
