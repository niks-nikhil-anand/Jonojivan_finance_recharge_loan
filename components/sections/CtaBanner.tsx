import { ButtonLink } from "@/components/ui/Button";

interface CtaBannerProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CtaBanner({ title, description, primary, secondary }: CtaBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-700 to-brand-500 px-6 py-10 text-white sm:px-10 sm:py-12">
      <div className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10" aria-hidden="true" />
      <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-emerald-400/20" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-2 text-brand-100 sm:text-lg">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primary.href} variant="white" size="lg">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} size="lg" variant="glass">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}
