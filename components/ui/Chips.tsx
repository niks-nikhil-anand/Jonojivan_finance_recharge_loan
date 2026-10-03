import Link from "next/link";
import { cn } from "@/lib/cn";

export function chipStyles(active: boolean) {
  return cn(
    "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors",
    active
      ? "border-brand-600 bg-brand-600 text-white"
      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  );
}

interface ChipItem<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface ChipTabsProps<T extends string> {
  items: ChipItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

/** Horizontally scrolling chip tabs (plan categories, FAQ groups, offer filters). */
export function ChipTabs<T extends string>({ items, value, onChange, label, className }: ChipTabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className={cn("no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={item.id === value}
          onClick={() => onChange(item.id)}
          className={chipStyles(item.id === value)}
        >
          {item.label}
          {item.count !== undefined && <span className="opacity-70">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}

interface ChipLinksProps {
  items: { label: string; href: string; active: boolean }[];
  label: string;
  className?: string;
}

/** Same look as ChipTabs but driven by URL search params. */
export function ChipLinks({ items, label, className }: ChipLinksProps) {
  return (
    <nav aria-label={label} className={cn("no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0", className)}>
      {items.map((item) => (
        <Link key={item.label} href={item.href} scroll={false} aria-current={item.active ? "page" : undefined} className={chipStyles(item.active)}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange, label }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-slate-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-11 rounded-xl text-sm font-semibold transition-all",
            o.value === value ? "bg-white text-brand-700 shadow-sm" : "text-slate-600 hover:text-slate-900",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
