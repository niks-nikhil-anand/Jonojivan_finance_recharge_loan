import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  /** "narrow" for reading-width pages (FAQ, transactions). */
  size?: "default" | "narrow";
}

export function Container({ className, children, size = "default" }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", size === "narrow" ? "max-w-3xl" : "max-w-7xl", className)}>{children}</div>;
}

interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({ title, description, eyebrow, action, align = "left", as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4 sm:mb-8", align === "center" && "flex-col items-center text-center")}>
      <div className={cn(align === "center" && "max-w-2xl")}>
        {eyebrow && <p className="mb-2 text-xs font-semibold tracking-widest text-brand-600 uppercase">{eyebrow}</p>}
        <Tag className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</Tag>
        {description && <p className="mt-2 text-slate-600 sm:text-lg">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-800">
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export function Section({ className, children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={cn("py-10 sm:py-14 lg:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  back?: { label: string; href: string };
  children?: ReactNode;
}

/** Compact header used at the top of interior pages. */
export function PageHeader({ title, description, icon, back, children }: PageHeaderProps) {
  return (
    <div className="bg-linear-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
      <Container className="pt-6 pb-10 sm:pt-10 sm:pb-14">
        {back && (
          <Link href={back.href} className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-brand-100 hover:text-white">
            ← {back.label}
          </Link>
        )}
        <div className="flex items-center gap-4">
          {icon && (
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl backdrop-blur" aria-hidden="true">
              {icon}
            </span>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description && <p className="mt-1.5 max-w-2xl text-brand-100 sm:text-lg">{description}</p>}
          </div>
        </div>
        {children}
      </Container>
    </div>
  );
}

/** Pulls page content up over the PageHeader gradient. */
export function PageBody({ className, children, size }: { className?: string; children: ReactNode; size?: ContainerProps["size"] }) {
  return (
    <Container size={size} className={cn("-mt-6 pb-12 sm:pb-16", className)}>
      {children}
    </Container>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200/80", className)} aria-hidden="true" />;
}

export function EmptyState({ icon, title, description, action }: { icon: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="mb-3 text-4xl" aria-hidden="true">
        {icon}
      </span>
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      {description && <p className="mt-1 max-w-sm text-slate-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/**
 * Primary action pinned above the mobile bottom nav; renders inline from lg up.
 * `aboveNav` should be false on pages without the bottom nav (auth).
 */
export function StickyCTA({ children, aboveNav = true, className }: { children: ReactNode; aboveNav?: boolean; className?: string }) {
  return (
    <>
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <div
        className={cn(
          "fixed inset-x-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-raised backdrop-blur",
          aboveNav ? "bottom-[calc(4rem+env(safe-area-inset-bottom))]" : "bottom-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          "lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
