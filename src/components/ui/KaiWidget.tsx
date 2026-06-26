"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
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

  // Hidden on the dedicated /chat page.
  if (pathname === "/chat") return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 right-0 flex h-[85dvh] w-screen flex-col border border-hai bg-sumi sm:absolute sm:bottom-16 sm:right-0 sm:h-[650px] sm:max-h-[80dvh] sm:w-[420px]"
            role="dialog"
            aria-label="Chat with Kai"
          >
            <header className="flex items-center justify-between border-b border-hai px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-beni font-noto text-sm font-bold text-washi">
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
                className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-washi"
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
            <div className="min-h-0 flex-1">
              <ChatPanel variant="widget" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat with Kai" : "Open chat with Kai"}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center bg-beni font-noto text-2xl font-bold text-washi shadow-lg transition-colors hover:bg-beni-light"
      >
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping bg-beni/40" />
        )}
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        ) : (
          "開"
        )}
      </button>
    </div>
  );
}
