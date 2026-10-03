import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { contactInfo, footerNav } from "@/lib/data/navigation";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="no-print border-t border-slate-200 bg-white">
      <Container className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1.2fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Loans made simple. Recharge made easy. Apply for loans, recharge your mobile and pay everyday bills from one platform.
          </p>
          <div className="mt-5 space-y-1.5 text-sm text-slate-600">
            <p>
              <a href={contactInfo.phoneHref} className="font-medium text-slate-900 hover:text-brand-700">
                {contactInfo.phone}
              </a>{" "}
              · {contactInfo.hours}
            </p>
            <p>
              <a href={contactInfo.emailHref} className="hover:text-brand-700">
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-slate-900">{group.title}</p>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-600 hover:text-brand-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-slate-100">
        <Container className="flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Jonojivan. All rights reserved.</p>
          <p>Loans are subject to eligibility and lender approval. Figures shown are indicative.</p>
        </Container>
      </div>
    </footer>
  );
}
