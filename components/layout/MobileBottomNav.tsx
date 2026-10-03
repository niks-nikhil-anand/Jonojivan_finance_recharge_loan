"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MoreMenuSheet } from "./MoreMenuSheet";
import { isActivePath } from "./NavLinks";

const icons: Record<string, ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  recharge: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  loans: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8h6M9 11h6M12 11c2.5 0 2.5 4 0 4H9l4 3" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const tabs = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Recharge", href: "/recharge", icon: "recharge" },
  { label: "Loans", href: "/loans", icon: "loans" },
];

/** Home | Recharge | Loans | More — always visible below lg. */
export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const tabClass = (active: boolean) =>
    cn(
      "flex h-16 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors",
      active ? "text-brand-700" : "text-slate-500 hover:text-slate-800",
    );

  return (
    <>
      <nav
        aria-label="Primary"
        className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <div className="flex">
          {tabs.map((tab) => {
            const active = isActivePath(pathname, tab.href);
            return (
              <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined} className={tabClass(active)}>
                <Icon name={tab.icon} />
                {tab.label}
              </Link>
            );
          })}
          <button type="button" onClick={() => setMoreOpen(true)} className={tabClass(moreOpen)} aria-haspopup="dialog">
            <Icon name="more" />
            More
          </button>
        </div>
      </nav>
      <MoreMenuSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
