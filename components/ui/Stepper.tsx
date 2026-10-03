import { cn } from "@/lib/cn";

interface StepperProps {
  steps: string[];
  current: number;
}

/** ●──●──○──○ progress with "Step n of N". Labels show from tablet upward. */
export function Stepper({ steps, current }: StepperProps) {
  return (
    <div>
      <ol className="flex items-center" aria-label="Application progress">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step} className={cn("flex items-center", i < steps.length - 1 && "flex-1")} aria-current={active ? "step" : undefined}>
              <span className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-xs font-bold transition-colors",
                    done && "bg-brand-600 text-white",
                    active && "bg-brand-600 text-white ring-4 ring-brand-100",
                    !done && !active && "border-2 border-slate-300 bg-white text-slate-400",
                  )}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className={cn("hidden text-xs font-medium whitespace-nowrap lg:block", active ? "text-brand-700" : "text-slate-500")}>{step}</span>
              </span>
              {i < steps.length - 1 && (
                <span className={cn("mx-1 h-0.5 flex-1 rounded-full lg:mb-6", done ? "bg-brand-600" : "bg-slate-200")} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm font-medium text-slate-500 lg:sr-only">
        Step {Math.min(current + 1, steps.length)} of {steps.length}
      </p>
    </div>
  );
}
