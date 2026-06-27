"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  as?: "div" | "li" | "span" | "section";
}

/**
 * Fade-and-rise on scroll into view, using IntersectionObserver + CSS.
 * No animation library in the bundle. Honors prefers-reduced-motion via the
 * `.reveal` rule in globals.css.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // `as` is a host tag; cast to one concrete type so the ref is well-typed.
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement | null>}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
