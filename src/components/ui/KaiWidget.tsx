"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { ChatPanel } from "@/components/ui/ChatPanel";
import { cn, KAI_OPEN_EVENT } from "@/lib/utils";

const SEEN_KEY = "kai_widget_seen";

// Read "has the widget been opened before" from sessionStorage without a
// hydration mismatch (server snapshot = seen, so no dot is rendered on the
// server; the client reads the real value after hydration).
const noopSubscribe = () => () => {};
function useWidgetSeen() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        return true;
      }
    },
    () => true,
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function KaiWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dismissedNotif, setDismissedNotif] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seen = useWidgetSeen();
  const showNotif = !seen && !dismissedNotif;

  const openWidget = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setOpen(true);
    setDismissedNotif(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* sessionStorage unavailable — ignore */
    }
  }, []);

  const closeWidget = useCallback(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setClosing(false);
      setOpen(false);
      return;
    }
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 260);
  }, []);

  // Open on global "kai:open" events (CTAs across the page).
  useEffect(() => {
    window.addEventListener(KAI_OPEN_EVENT, openWidget);
    return () => window.removeEventListener(KAI_OPEN_EVENT, openWidget);
  }, [openWidget]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeWidget();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeWidget]);

  // Lock background scroll while open (mobile only — the bottom sheet covers the
  // page; on desktop the corner panel keeps the page visible). position:fixed +
  // scroll restore is the cross-browser fix (overflow:hidden alone fails on iOS).
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

  // Clear pending close timer on unmount.
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Hidden on the dedicated /chat page.
  if (pathname === "/chat") return null;

  const mounted = open || closing;

  return (
    <>
      {/* Frosted dimming backdrop — mobile only; tap to close */}
      {mounted && (
        <div
          onClick={closeWidget}
          aria-hidden="true"
          className={cn(
            "kai-backdrop fixed inset-0 z-[9998] sm:hidden",
            closing ? "kai-backdrop-exit" : "kai-backdrop-enter",
          )}
        />
      )}

      {/* Panel: fixed header / scrollable messages / fixed input (flex column).
          Mobile = 95vw bottom sheet; desktop = 420x650 corner panel. */}
      {mounted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Kai"
          className={cn(
            "fixed bottom-0 left-[2.5vw] right-[2.5vw] z-[9999] flex h-[85dvh] flex-col border border-hai bg-sumi sm:bottom-[5.5rem] sm:left-auto sm:right-6 sm:h-[650px] sm:max-h-[85dvh] sm:w-[420px]",
            closing ? "kai-panel-exit" : "kai-panel-enter",
          )}
        >
          <header className="flex shrink-0 items-center justify-between border-b border-hai px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beni font-noto text-sm font-bold text-white">
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
              onClick={closeWidget}
              aria-label="Close chat"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-washi"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </header>

          <div className="min-h-0 flex-1">
            <ChatPanel variant="widget" />
          </div>
        </div>
      )}

      {/* Floating action button — circular FAB. Hidden on mobile while the panel
          is open so it can never overlap the input/send button. */}
      <div
        className={cn(
          "kai-fab-enter fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6",
          mounted && "max-sm:hidden",
        )}
      >
        <div className="kai-fab-float">
          <button
            onClick={() => (open ? closeWidget() : openWidget())}
            aria-label={open ? "Close chat with Kai" : "Chat with Kai"}
            aria-expanded={open}
            className={cn(
              "kai-fab relative flex h-13 w-13 items-center justify-center bg-beni text-white shadow-lg sm:h-14 sm:w-14",
              closing && "kai-fab-bounce",
            )}
          >
            {/* Breathing pulse rings — only while closed */}
            {!mounted && (
              <>
                <span className="kai-ring" aria-hidden="true" />
                <span className="kai-ring kai-ring-2" aria-hidden="true" />
              </>
            )}

            {/* Icon: 開 <-> ✕ crossfade/rotate */}
            <span className="kai-icon" data-open={open ? "true" : "false"}>
              <span className="icon-kanji font-noto text-2xl font-bold">
                開
              </span>
              <span className="icon-close">
                <CloseIcon className="h-6 w-6" />
              </span>
            </span>

            {/* First-visit notification dot */}
            {showNotif && (
              <span
                aria-hidden="true"
                className="kai-notif absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-sumi"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
