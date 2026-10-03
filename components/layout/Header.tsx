import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { mainNav } from "@/lib/data/navigation";
import { Logo } from "./Logo";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <NavLinks items={mainNav} />
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            Login
          </Link>
          <div className="hidden lg:block">
            <ButtonLink href="/loans/apply" size="sm">
              Apply Now
            </ButtonLink>
          </div>
          <MobileMenuButton />
        </div>
      </Container>
    </header>
  );
}
