"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { openKaiWidget, scrollToSection } from "@/lib/utils";

// 3D background — client-only, only pulled into the bundle on the client.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [show3D, setShow3D] = useState(false);

  // Load the 3D scene only after the hero text is painted & interactive.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // keep it static for reduced-motion users
    const t = setTimeout(() => setShow3D(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // GSAP staggered reveal of the hero lines on load.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !rootRef.current) return;

    let ctx: { revert: () => void } | undefined;
    import("gsap").then(({ gsap }) => {
      if (!rootRef.current) return;
      ctx = gsap.context(() => {
        gsap.from(".hero-reveal", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.1,
        });
      }, rootRef);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden px-5 sm:px-8"
    >
      {/* 3D background */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {show3D && <HeroScene />}
      </div>

      {/* 開発 watermark */}
      <span
        aria-hidden="true"
        className="kanji-watermark absolute -right-4 top-1/2 -z-0 -translate-y-1/2 select-none text-[34vw] opacity-[0.03] sm:text-[28vw]"
      >
        {SITE.kanji}
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <h1 className="sr-only">
          Kaihatsu Dev — Web Development Studio Based in Malaysia. Built right,
          the first time.
        </h1>

        {/* Massive brand display */}
        <div
          aria-hidden="true"
          className="hero-reveal font-syne font-extrabold leading-[0.9] tracking-tight text-washi"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          KAIHATSU
          <br />
          DEV
        </div>

        <p
          className="hero-reveal mt-6 max-w-2xl font-syne text-xl font-bold text-washi sm:text-2xl"
        >
          Web Development Studio Based in Malaysia
        </p>

        <p className="hero-reveal mt-4 font-noto text-lg text-beni">
          {SITE.kanji} — {SITE.tagline}
        </p>

        <p className="hero-reveal mt-5 max-w-xl text-base leading-relaxed text-muted">
          Precision-built websites and digital products for businesses that
          care about quality.
        </p>

        <div className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
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
