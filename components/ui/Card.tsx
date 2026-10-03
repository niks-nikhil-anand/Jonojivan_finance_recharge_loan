import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = { none: "", sm: "p-4", md: "p-5 sm:p-6", lg: "p-6 sm:p-8" };

export function Card({ padding = "md", className, ...props }: CardProps) {
  return <div className={cn("rounded-card border border-slate-200/70 bg-white shadow-card", paddings[padding], className)} {...props} />;
}
