"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-syne font-bold text-sm uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beni focus-visible:ring-offset-2 focus-visible:ring-offset-sumi disabled:opacity-50 disabled:pointer-events-none min-h-[44px] cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary: "bg-beni text-washi hover:bg-beni-light",
  secondary:
    "border border-washi/40 text-washi hover:border-beni hover:text-beni",
  ghost: "text-muted hover:text-washi",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
