import { cn } from "@/lib/cn";

interface HowItWorksProps {
  steps: { title: string; description: string }[];
}

/** Numbered steps — vertical timeline on mobile, horizontal row on desktop. */
export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <ol className={cn("relative grid gap-4 lg:gap-6", steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4 lg:flex-col">
          {i < steps.length - 1 && (
            <span
              className="absolute top-12 bottom-[-1rem] left-6 w-0.5 bg-brand-100 lg:top-6 lg:right-[-1.5rem] lg:bottom-auto lg:left-12 lg:h-0.5 lg:w-auto"
              aria-hidden="true"
            />
          )}
          <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-600 text-sm font-bold text-white shadow-lg shadow-brand-600/25">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pb-2">
            <h3 className="font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
