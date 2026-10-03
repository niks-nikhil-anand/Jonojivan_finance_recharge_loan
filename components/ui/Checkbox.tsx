import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  error?: string;
}

export function Checkbox({ checked, onChange, label, error }: CheckboxProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={cn("flex cursor-pointer gap-3 rounded-2xl border p-4 text-sm text-slate-700", error ? "border-rose-300 bg-rose-50/50" : "border-slate-200 bg-slate-50")}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-5 shrink-0 accent-brand-600"
        />
        <span>{label}</span>
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
