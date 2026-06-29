"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatPanel } from "@/components/ui/ChatPanel";
import { KAI_OPEN_EVENT } from "@/lib/utils";

export function KaiWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Open on global "kai:open" events (CTAs across the page).
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(KAI_OPEN_EVENT, handler);
    return () => window.removeEventListener(KAI_OPEN_EVENT, handler);
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock background scroll while open (mobile only — the bottom sheet covers the
  // page there; on desktop the small corner panel keeps the page visible and
  // locking would remove the scrollbar and cause a horizontal jump).
  // position:fixed + scroll restore is the cross-browser fix (overflow:hidden
  // alone fails on iOS).
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = `-${scrollY}px`;
    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Hidden on the dedicated /chat page.
  if (pathname === "/chat") return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6">
      {open && (
        <>
          {/* Dimming backdrop — mobile only; tap to close */}
          <div
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="animate-fade-in fixed inset-0 z-[9998] bg-black/60 sm:hidden"
          />

          {/* Panel: flex column — fixed header, scrollable messages, fixed input.
              Mobile = 95vw centered bottom sheet; desktop = 420x650 corner. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Kai"
            className="animate-pop-in fixed bottom-0 left-[2.5vw] right-[2.5vw] z-[9999] flex h-[85dvh] flex-col border border-hai bg-sumi sm:bottom-6 sm:left-auto sm:right-6 sm:h-[650px] sm:max-h-[85dvh] sm:w-[420px]"
          >
            {/* Fixed header — never scrolls, never overlaps content */}
            <header className="flex shrink-0 items-center justify-between border-b border-hai px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-beni font-noto text-sm font-bold text-white">
                  開
                </span>
                <div>
                  <p className="font-syne text-sm font-bold text-washi">Kai</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-washi"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </header>

            {/* Scrollable messages + input live inside ChatPanel (flex column) */}
            <div className="min-h-0 flex-1">
              <ChatPanel variant="widget" />
            </div>
          </div>
        </>
      )}

      {/* Toggle button — only shown when closed, so it never overlaps the panel */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with Kai"
          aria-expanded={false}
          className="relative flex h-14 w-14 items-center justify-center bg-beni font-noto text-2xl font-bold text-white shadow-lg transition-colors hover:bg-beni-light hover:text-sumi"
        >
          <span className="absolute inset-0 -z-10 animate-ping bg-beni/40" />
          開
        </button>
      )}
    </div>
  );
}
