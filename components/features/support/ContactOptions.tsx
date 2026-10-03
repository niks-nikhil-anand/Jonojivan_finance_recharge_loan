import { contactInfo } from "@/lib/data/navigation";

const options = [
  { icon: "💬", label: "WhatsApp", value: contactInfo.whatsapp, href: contactInfo.whatsappHref, tone: "bg-emerald-50", external: true },
  { icon: "📞", label: "Call", value: contactInfo.phone, href: contactInfo.phoneHref, tone: "bg-brand-50" },
  { icon: "✉️", label: "Email", value: contactInfo.email, href: contactInfo.emailHref, tone: "bg-amber-50" },
  { icon: "📝", label: "Raise Support Request", value: "We reply within 24 hours", href: "#raise-request", tone: "bg-violet-50" },
];

export function ContactOptions({ columns = 4 }: { columns?: 2 | 4 }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : ""}`}>
      {options.map((o) => (
        <li key={o.label}>
          <a
            href={o.href}
            {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-full items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition-shadow hover:shadow-lg"
          >
            <span className={`grid size-12 shrink-0 place-items-center rounded-2xl text-2xl ${o.tone}`} aria-hidden="true">
              {o.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">{o.label}</span>
              <span className="block truncate text-sm text-slate-500">{o.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
