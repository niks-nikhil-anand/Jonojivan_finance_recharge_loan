import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Jonojivan home">
      <Image src="/logo.png" alt="Jonojivan" width={40} height={40} className="size-10 shrink-0" />
      <span className="text-lg font-bold tracking-tight text-slate-900">Jonojivan Finance</span>
    </Link>
  );
}
