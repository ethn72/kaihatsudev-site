import { SITE } from "@/lib/constants";
import type { Quote } from "@/types";

const SESSION_KEY = "kaihatsu_active_session";

/** Get (or lazily create) the persistent chat session id. */
export function getSessionId(): string {
  if (typeof window === "undefined") {
    return `session_0_server`;
  }
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export interface KaiMeta {
  sessionId?: string;
  quote: Quote | null;
  sources?: unknown[];
}

export interface KaiStreamHandlers {
  onMeta?: (meta: KaiMeta) => void;
  onToken?: (t: string) => void;
  onSuggest?: (suggestions: string[]) => void;
  onError?: (message: string) => void;
  onDone?: () => void;
}

/**
 * Streams a reply from the Kai backend over SSE.
 *
 * Contract (POST /api/chat/stream):
 *   request:  { message, sessionId }
 *   events:   meta { sessionId, quote, sources }
 *             token { t }
 *             suggest { suggestions }
 *             done {}
 *             error { error }
 */
export async function streamKai(
  message: string,
  sessionId: string,
  handlers: KaiStreamHandlers,
  signal: AbortSignal,
): Promise<void> {
  const res = await fetch(`${SITE.backendUrl}/api/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ message, sessionId }),
    signal,
  });

  if (!res.ok || !res.body) {
    throw new Error(`Kai backend responded ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line.
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";
    for (const frame of frames) {
      dispatchFrame(frame, handlers);
    }
  }

  // Flush any trailing frame without a terminating blank line.
  if (buffer.trim()) dispatchFrame(buffer, handlers);
}

function dispatchFrame(frame: string, handlers: KaiStreamHandlers): void {
  let event = "message";
  const dataLines: string[] = [];

  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trim());
    }
  }

  const raw = dataLines.join("\n");
  if (!raw || raw === "[DONE]") {
    if (event === "done") handlers.onDone?.();
    return;
  }

  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(raw);
  } catch {
    // A bare token frame with no JSON wrapper — treat as text.
    if (event === "token" || event === "message") handlers.onToken?.(raw);
    return;
  }

  switch (event) {
    case "meta":
      handlers.onMeta?.({
        sessionId: data.sessionId as string | undefined,
        quote: (data.quote as Quote | null) ?? null,
        sources: data.sources as unknown[] | undefined,
      });
      break;
    case "token":
    case "message":
      handlers.onToken?.((data.t as string) ?? "");
      break;
    case "suggest":
      handlers.onSuggest?.((data.suggestions as string[]) ?? []);
      break;
    case "error":
      handlers.onError?.((data.error as string) ?? "Unknown error");
      break;
    case "done":
      handlers.onDone?.();
      break;
  }
}
