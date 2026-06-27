"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getSessionId, streamKai } from "@/lib/kai";
import { cn } from "@/lib/utils";
import { QuoteCard } from "@/components/ui/QuoteCard";
import type { ChatMessage } from "@/types";

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Hey — I'm Kai. Ask me about services, timelines, or a ballpark quote, and I'll point you in the right direction.",
};

const ERROR_FALLBACK =
  "I couldn't reach the server just now. Email horngyarngtan@gmail.com and Ethan will get right back to you.";

function uid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export function ChatPanel({
  variant = "widget",
}: {
  variant?: "widget" | "page";
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sessionRef = useRef<string>("");

  useEffect(() => {
    sessionRef.current = getSessionId();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, suggestions]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const sendMessage = async (raw: string) => {
    const text = raw.trim();
    if (!text || streaming) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    const assistantId = uid();

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "", quote: null },
    ]);
    setInput("");
    setSuggestions([]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const patchAssistant = (patch: Partial<ChatMessage>) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m)),
      );

    try {
      await streamKai(
        text,
        sessionRef.current,
        {
          onMeta: (meta) => {
            if (meta.sessionId) sessionRef.current = meta.sessionId;
            if (meta.quote) patchAssistant({ quote: meta.quote });
          },
          onToken: (t) =>
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + t } : m,
              ),
            ),
          onSuggest: (s) => setSuggestions(s),
          onError: () => patchAssistant({ content: ERROR_FALLBACK }),
        },
        controller.signal,
      );
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId && !m.content
              ? { ...m, content: ERROR_FALLBACK }
              : m,
          ),
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 space-y-3 overflow-y-auto p-4",
          variant === "page" && "px-0",
        )}
      >
        {messages.map((m) => (
          <div key={m.id} className="flex flex-col gap-2">
            {/* Show a bubble when there's text, or a typing indicator while a
                text-only reply is still empty (suppressed for quote-only replies). */}
            {(m.content || !m.quote) && (
              <div
                className={cn(
                  "max-w-[85%] px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-beni text-white"
                    : "mr-auto bg-hai/50 text-washi",
                )}
              >
                {m.content || (
                  <span
                    className="inline-flex gap-1"
                    aria-label="Kai is typing"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
                  </span>
                )}
              </div>
            )}
            {m.quote && (
              <div className="mr-auto w-full max-w-[95%]">
                <QuoteCard quote={m.quote} />
              </div>
            )}
          </div>
        ))}

        {/* Follow-up suggestion chips */}
        {suggestions.length > 0 && !streaming && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s, i) => (
              <button
                key={`${s}-${i}`}
                onClick={() => void sendMessage(s)}
                className="border border-hai px-3 py-1.5 text-xs text-muted transition-colors hover:border-beni hover:text-washi"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-hai bg-sumi p-3"
      >
        <label htmlFor="kai-input" className="sr-only">
          Message Kai
        </label>
        <input
          id="kai-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Kai anything…"
          className="min-h-[44px] flex-1 border border-hai bg-tetsu px-3 text-washi placeholder:text-muted/60 focus:border-beni focus:outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="flex h-11 min-w-11 items-center justify-center bg-beni px-4 font-syne text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-beni-light hover:text-sumi disabled:opacity-40"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}
