"use client";

import { useState } from "react";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard unavailable — the code is still visible to copy manually.
        }
      }}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 font-mono text-sm font-semibold tracking-wide text-slate-800 hover:border-brand-400 hover:bg-brand-50"
      aria-label={`Copy code ${code}`}
    >
      {code}
      <span className="font-sans text-xs font-medium text-brand-700" aria-live="polite">
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}
