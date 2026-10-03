import { cn } from "@/lib/cn";
import type { FieldName, StepProps } from "../schema";

const docs: { field: FieldName; title: string; description: string; optional?: boolean }[] = [
  { field: "idProof", title: "Identity Proof", description: "PAN card" },
  { field: "addressProof", title: "Address Proof", description: "Aadhaar, passport or utility bill" },
  { field: "incomeProof", title: "Income Proof", description: "Salary slips / bank statement / ITR" },
  { field: "photo", title: "Photograph", description: "Recent passport-size photo", optional: true },
];

/** UI-only file pickers — files stay on the device; only the name is kept for review. */
export function DocumentsStep({ values, errors, set }: StepProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-slate-500">Accepted formats: PDF, JPG or PNG, up to 5 MB each.</p>
      {docs.map((doc) => {
        const fileName = values[doc.field];
        const error = errors[doc.field];
        const inputId = `doc-${doc.field}`;
        return (
          <div key={doc.field}>
            <div
              className={cn(
                "flex items-center gap-4 rounded-2xl border border-dashed p-4 transition-colors",
                fileName ? "border-emerald-300 bg-emerald-50/60" : error ? "border-rose-300 bg-rose-50/50" : "border-slate-300 bg-slate-50",
              )}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-2xl shadow-sm" aria-hidden="true">
                {fileName ? "✅" : "📄"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">
                  {doc.title} {doc.optional && <span className="text-xs font-normal text-slate-500">(optional)</span>}
                </p>
                <p className="truncate text-sm text-slate-500">{fileName || doc.description}</p>
              </div>
              {fileName ? (
                <button type="button" onClick={() => set(doc.field, "")} className="text-sm font-semibold text-rose-600 hover:text-rose-700">
                  Remove
                </button>
              ) : (
                <label
                  htmlFor={inputId}
                  className="inline-flex h-10 cursor-pointer items-center rounded-xl bg-white px-4 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-slate-200 hover:bg-brand-50"
                >
                  Upload
                </label>
              )}
              <input
                id={inputId}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="sr-only"
                aria-label={`Upload ${doc.title}`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) set(doc.field, file.name);
                  e.target.value = "";
                }}
              />
            </div>
            {error && (
              <p className="mt-1.5 text-sm text-rose-600" role="alert">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
