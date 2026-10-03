import Link from "next/link";
import { issueCategories } from "./supportData";

export function IssueCategories() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {issueCategories.map((c) => (
        <li key={c.id}>
          <Link
            href={`/support?category=${c.id}#raise-request`}
            className="flex h-full flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition-shadow hover:shadow-lg"
          >
            <span className="text-2xl" aria-hidden="true">
              {c.icon}
            </span>
            <span className="font-semibold text-slate-900">{c.label}</span>
            <span className="text-xs text-slate-500">{c.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
