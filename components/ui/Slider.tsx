import { useId, type CSSProperties } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  /** Displayed value, e.g. "₹2,00,000". */
  display: string;
  minLabel: string;
  maxLabel: string;
  /** Optional editable number input shown next to the label. */
  input?: { prefix?: string; suffix?: string; ariaLabel: string };
}

export function Slider({ label, value, min, max, step, onChange, display, minLabel, maxLabel, input }: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-600">
          {label}
        </label>
        {input ? (
          <div className="flex h-10 items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
            {input.prefix && <span className="text-sm font-semibold text-slate-500">{input.prefix}</span>}
            <input
              type="number"
              inputMode="decimal"
              aria-label={input.ariaLabel}
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (!Number.isNaN(n)) onChange(n);
              }}
              onBlur={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
              className="w-24 bg-transparent text-right text-base font-semibold text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            {input.suffix && <span className="text-sm font-semibold text-slate-500">{input.suffix}</span>}
          </div>
        ) : (
          <span className="text-lg font-bold text-slate-900">{display}</span>
        )}
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={display}
        className="range"
        style={{ "--fill": `${Math.min(100, Math.max(0, fill))}%` } as CSSProperties}
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
