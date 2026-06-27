import type { Metadata } from "next";
import Link from "next/link";
import { ChatPanel } from "@/components/ui/ChatPanel";
import { KaiMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Chat with Kai",
  description:
    "Talk to Kai, the Kaihatsu Dev assistant — ask about services, timelines, and quotes.",
  alternates: { canonical: "https://kaihatsu.dev/chat" },
  robots: { index: false, follow: true },
};

export default function ChatPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="flex items-center justify-between border-b border-hai px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <KaiMark className="h-9 w-9 text-sm" />
          <span className="font-syne text-base font-bold tracking-tight text-washi">
            KAIHATSU<span className="text-beni-light"> DEV</span>
          </span>
        </Link>
        <Link
          href="/"
          className="font-syne text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-washi"
        >
          ← Back
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-4 sm:px-6">
        <ChatPanel variant="page" />
      </div>
    </div>
  );
}
