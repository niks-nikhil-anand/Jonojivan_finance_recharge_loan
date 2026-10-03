"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Native <dialog> rendered as a bottom sheet on mobile and a centred modal on desktop.
 * Handles focus trapping, Esc-to-close and backdrop click.
 */
export function BottomSheet({ open, onClose, title, description, children, footer, className }: BottomSheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Prefer an explicitly marked field (e.g. search) over the close button.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label={title}
      className={cn(
        "sheet mx-0 mt-auto mb-0 w-full rounded-t-3xl bg-white p-0 text-slate-900 shadow-2xl",
        "lg:m-auto lg:w-[32rem] lg:rounded-3xl",
        className,
      )}
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-slate-200 lg:hidden" aria-hidden="true" />
        <header className="flex shrink-0 items-start justify-between gap-4 px-5 pt-3 pb-3 lg:pt-5">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 grid size-10 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{children}</div>
        {footer && (
          <div className="shrink-0 border-t border-slate-100 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</div>
        )}
      </div>
    </dialog>
  );
}
