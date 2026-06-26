import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { OpenKaiButton } from "@/components/ui/OpenKaiButton";
import { KaiMark } from "@/components/ui/Logo";

const MOCK_CHAT = [
  { role: "user", text: "Do you build e-commerce sites?" },
  {
    role: "assistant",
    text: "Yes — headless storefronts, fast checkout, the works. Want a rough quote?",
  },
  { role: "user", text: "How fast can you start?" },
  {
    role: "assistant",
    text: "Usually within a week. Tell me about your project and I'll line it up.",
  },
];

export function KaiSection() {
  return (
    <section
      id="kai"
      className="relative border-t border-hai/40 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionLabel>Meet Kai</SectionLabel>
            <h2 className="fluid-h2 mt-6 font-syne font-bold leading-tight text-washi">
              Always on.
              <br />
              Always ready.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Kai is the studio&rsquo;s AI assistant. Ask about services, get a
              ballpark quote, or check availability — any time, no waiting. When
              it&rsquo;s time to talk specifics, Kai hands you straight to Ethan.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8">
              <OpenKaiButton>Chat with Kai</OpenKaiButton>
            </div>
          </Reveal>
        </div>

        {/* Mock chat UI */}
        <Reveal delay={0.1}>
          <div className="border border-hai bg-tetsu">
            <div className="flex items-center gap-3 border-b border-hai px-5 py-4">
              <KaiMark className="h-9 w-9 text-sm" />
              <div>
                <p className="font-syne text-sm font-bold text-washi">Kai</p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {MOCK_CHAT.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "max-w-[80%] self-end bg-beni px-4 py-2.5 text-sm text-washi"
                      : "max-w-[80%] self-start bg-hai/50 px-4 py-2.5 text-sm text-muted"
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
