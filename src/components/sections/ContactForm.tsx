"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const inputClass =
  "w-full border border-hai bg-sumi px-4 py-3 text-[16px] text-washi placeholder:text-muted/60 transition-colors focus:border-beni focus:outline-none disabled:opacity-50";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(`${SITE.backendUrl}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, note }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          data.error ??
            `Something went wrong. Please email me directly at ${SITE.email}`,
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        `Something went wrong. Please email me directly at ${SITE.email}`,
      );
    }
  };

  if (status === "success") {
    return (
      <div className="border border-success/40 bg-tetsu p-8" role="status">
        <p className="font-syne text-lg font-bold text-washi">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-muted">
          I&rsquo;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          disabled={submitting}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={submitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="note" className="sr-only">
          Project description
        </label>
        <textarea
          id="note"
          name="note"
          required
          disabled={submitting}
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tell me about your project"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-beni-light" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto"
      >
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
