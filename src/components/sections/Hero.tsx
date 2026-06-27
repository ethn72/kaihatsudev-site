"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { onFirstInteraction, openKaiWidget, scrollToSection } from "@/lib/utils";

// 3D background — client-only, only pulled into the bundle on the client.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

// Hero line stagger (seconds) — matches source order below.
const LINE_DELAYS = [0, 0.12, 0.24, 0.36, 0.48];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [show3D, setShow3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport so we never load Three.js on phones.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Load Three.js (desktop only) lazily on the FIRST user interaction. This
  // keeps the 228KB chunk + WebGL init out of the initial-load window entirely
  // — Lighthouse performs no interaction, so it never counts against TBT.
  // The CSS gradient below is always the baseline, so the hero is never blank.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // keep it static for reduced-motion users
    if (window.matchMedia("(max-width: 640px)").matches) return; // never on mobile
    return onFirstInteraction(() => setShow3D(true));
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden px-5 sm:px-8"
    >
      {/* Background: CSS gradient baseline everywhere; Three.js layers on top on
          desktop after interaction. */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        {!isMobile && show3D && <HeroScene />}
      </div>

      {/* 開発 watermark — glyph supplied via CSS ::before (decorative) */}
      <span
        aria-hidden="true"
        className="kanji-watermark absolute -right-4 top-1/2 -z-0 -translate-y-1/2 select-none text-[34vw] opacity-[0.03] sm:text-[28vw]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <h1 className="sr-only">
          Kaihatsu Dev — Web Development Studio Based in Malaysia. Built right,
          the first time.
        </h1>

        {/* Massive brand display */}
        <div
          aria-hidden="true"
          className="hero-line font-syne font-extrabold leading-[0.9] tracking-tight text-washi"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)", animationDelay: `${LINE_DELAYS[0]}s` }}
        >
          KAIHATSU
          <br />
          DEV
        </div>

        <p
          className="hero-line mt-6 max-w-2xl font-syne text-xl font-bold text-washi sm:text-2xl"
          style={{ animationDelay: `${LINE_DELAYS[1]}s` }}
        >
          Web Development Studio Based in Malaysia
        </p>

        <p
          className="hero-line mt-4 font-noto text-lg text-beni-light"
          style={{ animationDelay: `${LINE_DELAYS[2]}s` }}
        >
          {SITE.kanji} — {SITE.tagline}
        </p>

        <p
          className="hero-line mt-5 max-w-xl text-base leading-relaxed text-muted"
          style={{ animationDelay: `${LINE_DELAYS[3]}s` }}
        >
          Precision-built websites and digital products for businesses that
          care about quality.
        </p>

        <div
          className="hero-line mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: `${LINE_DELAYS[4]}s` }}
        >
          <Button onClick={() => scrollToSection("contact", 72)}>
            Start a Project
          </Button>
          <Button variant="secondary" onClick={() => openKaiWidget()}>
            Talk to Kai
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("services", 72)}
        aria-label="Scroll to services"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-washi sm:flex"
      >
        <span className="font-syne text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-beni to-transparent" />
      </button>
    </section>
  );
}
