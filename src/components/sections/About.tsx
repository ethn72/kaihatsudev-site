import { SITE } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-hai/40 px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* Large kanji background — glyph supplied via CSS ::before (decorative) */}
      <span
        aria-hidden="true"
        className="kanji-watermark absolute -left-6 bottom-0 select-none text-[40vw] opacity-[0.025] sm:text-[30vw]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="fluid-h2 max-w-3xl font-syne font-bold leading-tight text-washi">
              A solo studio built on Japanese-inspired precision.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted">
              <p>
                Kaihatsu Dev is run by Ethan, a web developer based in{" "}
                {SITE.region}, {SITE.location}. The name —{" "}
                <span className="font-noto text-washi">開発</span>, meaning
                &ldquo;development&rdquo; in Japanese — sets the standard:
                deliberate, exact, and made to last.
              </p>
              <p>
                Most websites are assembled. These are engineered. Every
                component is chosen on purpose, every interaction is intentional,
                and nothing ships until it is fast, accessible, and built right.
              </p>
              <p>
                No bloated templates. No corporate filler. Just clean,
                high-performance work from a developer who treats your project
                like a product — because that&rsquo;s what it is.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
