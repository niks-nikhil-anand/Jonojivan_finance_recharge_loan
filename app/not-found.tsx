import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <Logo />
      <p className="mt-10 text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-slate-600">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <ButtonLink href="/">Go to Home</ButtonLink>
        <ButtonLink href="/support" variant="outline">
          Get Help
        </ButtonLink>
      </div>
    </main>
  );
}
