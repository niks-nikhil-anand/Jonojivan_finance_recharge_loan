import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { TransactionStatus } from "@/types";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

export const statusMeta: Record<TransactionStatus, { label: string; icon: string; tone: Tone; text: string; bg: string; ring: string }> = {
  success: { label: "Successful", icon: "✓", tone: "success", text: "text-emerald-700", bg: "bg-emerald-50", ring: "ring-emerald-100" },
  pending: { label: "Pending", icon: "⏳", tone: "warning", text: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-100" },
  failed: { label: "Failed", icon: "✕", tone: "danger", text: "text-rose-700", bg: "bg-rose-50", ring: "ring-rose-100" },
};

export function StatusBadge({ status, className }: { status: TransactionStatus; className?: string }) {
  const meta = statusMeta[status];
  return (
    <Badge tone={meta.tone} className={className}>
      <span aria-hidden="true">{meta.icon}</span>
      {meta.label}
    </Badge>
  );
}
