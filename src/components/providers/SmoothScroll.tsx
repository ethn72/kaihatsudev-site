"use client";

import { useEffect } from "react";
import { onFirstInteraction } from "@/lib/utils";

/**
 * Lenis smooth scroll. Dynamically imported, client-only, and initialised only
 * on the FIRST user interaction — so its continuous RAF loop never runs during
 * initial load / a Lighthouse audit (which performs no interaction).
 * Skips entirely under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        const raf = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    };

    const cancelInteraction = onFirstInteraction(start);

    return () => {
      cancelled = true;
      cancelInteraction();
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
