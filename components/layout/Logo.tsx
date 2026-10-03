import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Jonojivan home">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" className={inverted ? "fill-white" : "fill-brand-600"} />
        <path
          d="M19.5 8v10.5a5 5 0 0 1-9.6 2"
          fill="none"
          strokeWidth="3.2"
          strokeLinecap="round"
          className={inverted ? "stroke-brand-600" : "stroke-white"}
        />
        <circle cx="22.5" cy="9.5" r="2.4" className="fill-emerald-400" />
      </svg>
      <span className={cn("text-lg font-bold tracking-tight", inverted ? "text-white" : "text-slate-900")}>
        Jonojivan
      </span>
    </Link>
  );
}
