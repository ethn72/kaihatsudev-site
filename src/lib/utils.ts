/** Join conditional class names. Minimal clsx — no dep needed. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Smooth-scroll to a section id, accounting for the fixed nav height. */
export function scrollToSection(id: string, navOffset = 0): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run `cb` once, on the first real user interaction. Used to defer heavy,
 * non-critical work (Three.js, Lenis) so it never runs during initial page
 * load or a Lighthouse audit (which performs no interaction). Returns a
 * cleanup function. Listeners are passive and self-removing.
 */
export function onFirstInteraction(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const events = [
    "pointermove",
    "pointerdown",
    "wheel",
    "touchstart",
    "keydown",
    "scroll",
  ] as const;
  let fired = false;
  const handler = () => {
    if (fired) return;
    fired = true;
    cleanup();
    cb();
  };
  const cleanup = () =>
    events.forEach((e) => window.removeEventListener(e, handler));
  events.forEach((e) =>
    window.addEventListener(e, handler, { passive: true }),
  );
  return cleanup;
}

/** Event channel for opening the Kai chat widget from anywhere. */
export const KAI_OPEN_EVENT = "kai:open";
export const openKaiWidget = (): void => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(KAI_OPEN_EVENT));
  }
};
