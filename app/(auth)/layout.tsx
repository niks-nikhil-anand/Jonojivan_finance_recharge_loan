import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-linear-to-b from-brand-50 to-canvas">
      <header className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-4">
        <Logo />
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to home
        </Link>
      </header>
      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4 pb-10 sm:pt-10">{children}</main>
    </div>
  );
}
