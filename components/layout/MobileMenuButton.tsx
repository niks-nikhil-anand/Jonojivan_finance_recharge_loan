"use client";

import { useState } from "react";
import { MoreMenuSheet } from "./MoreMenuSheet";

export function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-6" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <MoreMenuSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
