import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  info: "bg-brand-50 text-brand-800 border-brand-100",
  success: "bg-emerald-50 text-emerald-800 border-emerald-100",
  warning: "bg-amber-50 text-amber-800 border-amber-100",
  danger: "bg-rose-50 text-rose-800 border-rose-100",
};

const icons = { info: "ℹ️", success: "✅", warning: "⚠️", danger: "⛔" };

export function Alert({ tone = "info", title, children, className }: { tone?: keyof typeof tones; title?: string; children?: ReactNode; className?: string }) {
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex gap-3 rounded-2xl border px-4 py-3 text-sm", tones[tone], className)}>
      <span aria-hidden="true">{icons[tone]}</span>
      <div>
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && "mt-0.5")}>{children}</div>}
      </div>
    </div>
  );
}
