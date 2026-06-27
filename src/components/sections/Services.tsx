import { SERVICES } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-hai/40 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>What We Build</SectionLabel>
          <h2 className="fluid-h2 mt-6 max-w-2xl font-syne font-bold leading-tight text-washi">
            Services engineered for performance and longevity.
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-px bg-hai/40 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal as="li" key={service.number} delay={(i % 3) * 0.08}>
              <article className="group h-full border-l-2 border-transparent bg-tetsu p-7 transition-all duration-300 hover:-translate-y-1 hover:border-beni hover:bg-tetsu/80 sm:p-8">
                <span className="font-syne text-sm font-bold text-beni-light">
                  {service.number}
                </span>
                <h3 className="mt-4 font-syne text-xl font-bold text-washi">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
