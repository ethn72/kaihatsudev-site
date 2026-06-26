import { cn } from "@/lib/utils";

/** Geometric K letterform — sharp white triangles on Sumi, Beni square accent top-right. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="Kaihatsu Dev logo"
      fill="none"
    >
      {/* spine */}
      <rect x="14" y="12" width="16" height="76" fill="currentColor" />
      {/* upper arm */}
      <polygon points="30,50 70,12 88,12 48,50" fill="currentColor" />
      {/* lower arm */}
      <polygon points="30,50 48,50 88,88 70,88" fill="currentColor" />
      {/* Beni square accent */}
      <rect x="82" y="6" width="12" height="12" fill="#C84B31" />
    </svg>
  );
}

/** 開 mark — Beni square with white kanji. Used as icon / favicon-style badge. */
export function KaiMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center bg-beni font-noto font-bold text-washi",
        className,
      )}
      aria-hidden="true"
    >
      開
    </span>
  );
}

/** Logo mark + wordmark lockup. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-7 w-7 text-washi" />
      <span className="font-syne text-lg font-bold tracking-tight text-washi">
        KAIHATSU<span className="text-beni"> DEV</span>
      </span>
    </span>
  );
}
