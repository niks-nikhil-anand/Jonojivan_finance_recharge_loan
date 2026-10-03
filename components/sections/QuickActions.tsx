import Link from "next/link";

const actions = [
  { label: "Recharge", description: "Mobile & DTH", icon: "📱", href: "/recharge/mobile", tone: "bg-emerald-50 text-emerald-700" },
  { label: "Apply Loan", description: "Personal & business", icon: "💰", href: "/loans/apply", tone: "bg-brand-50 text-brand-700" },
  { label: "EMI Calc", description: "Plan your EMI", icon: "🧮", href: "/loans/emi-calculator", tone: "bg-amber-50 text-amber-700" },
  { label: "Eligibility", description: "Check in 1 min", icon: "📄", href: "/loans/eligibility", tone: "bg-violet-50 text-violet-700" },
];

/** 2×2 on mobile, 4-up from tablet. */
export function QuickActions() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {actions.map((a) => (
        <li key={a.label}>
          <Link
            href={a.href}
            className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
          >
            <span className={`grid size-12 place-items-center rounded-2xl text-2xl ${a.tone}`} aria-hidden="true">
              {a.icon}
            </span>
            <span>
              <span className="block font-semibold text-slate-900">{a.label}</span>
              <span className="block text-xs text-slate-500">{a.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
