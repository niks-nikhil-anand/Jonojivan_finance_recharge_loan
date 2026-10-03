"use client";

import Link from "next/link";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { ButtonLink } from "@/components/ui/Button";
import { moreMenu } from "@/lib/data/navigation";

interface MoreMenuSheetProps {
  open: boolean;
  onClose: () => void;
}

/** Full menu shown from the hamburger and the bottom-nav "More" tab. */
export function MoreMenuSheet({ open, onClose }: MoreMenuSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Menu"
      footer={
        <div className="grid grid-cols-2 gap-3">
          <ButtonLink href="/login" variant="outline" fullWidth onClick={onClose}>
            Login
          </ButtonLink>
          <ButtonLink href="/loans/apply" fullWidth onClick={onClose}>
            Apply Now
          </ButtonLink>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {moreMenu.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">{group.title}</p>
            <ul className="grid grid-cols-2 gap-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-14 items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <span className="text-xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
