"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BottomSheet } from "./BottomSheet";
import { ChevronDown, controlStyles, FieldShell } from "./Field";

export interface SheetOption {
  value: string;
  label: string;
  description?: string;
  leading?: ReactNode;
}

interface SheetSelectProps {
  label: string;
  placeholder: string;
  options: SheetOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  sheetTitle?: string;
  /** Defaults to on when there are more than 8 options. */
  searchable?: boolean;
  searchPlaceholder?: string;
}

/** Picker that opens a searchable bottom sheet — scales to any number of providers. */
export function SheetSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  hint,
  sheetTitle,
  searchable,
  searchPlaceholder = "Search",
}: SheetSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = options.find((o) => o.value === value);
  const showSearch = searchable ?? options.length > 8;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q))
    : options;

  function openSheet() {
    setQuery("");
    setOpen(true);
  }

  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <button
        id={id}
        type="button"
        onClick={openSheet}
        aria-haspopup="dialog"
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlStyles(error), "flex h-12 items-center justify-between gap-3 text-left")}
      >
        <span className={cn("flex min-w-0 items-center gap-2", !selected && "text-slate-400")}>
          {selected?.leading}
          <span className="truncate">{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-slate-500" />
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title={sheetTitle ?? label}>
        {showSearch && (
          <div className="sticky top-0 z-10 -mx-5 bg-white px-5 pb-3">
            <input
              type="search"
              data-autofocus=""
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className={cn(controlStyles(), "h-11")}
            />
          </div>
        )}
        <ul className="-mx-2 flex flex-col" role="listbox" aria-label={label}>
          {filtered.map((o) => {
            const isSelected = o.value === value;
            return (
              <li key={o.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    isSelected ? "bg-brand-50" : "hover:bg-slate-50",
                  )}
                >
                  {o.leading}
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-slate-900">{o.label}</span>
                    {o.description && <span className="block text-sm text-slate-500">{o.description}</span>}
                  </span>
                  {isSelected && (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-brand-600" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-slate-500">No matches for “{query}”</li>}
        </ul>
      </BottomSheet>
    </FieldShell>
  );
}
