import { cn } from "@/lib/cn";

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

/** Zero-JS accordion built on <details>/<summary>; works in Server Components. */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-slate-200 overflow-hidden rounded-card border border-slate-200 bg-white", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-900 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-lg leading-none text-slate-600 transition-transform group-open:rotate-45 group-open:bg-brand-50 group-open:text-brand-700"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-slate-600 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
