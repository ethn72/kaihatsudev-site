import { WORK } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-hai/40 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="fluid-h2 mt-6 max-w-2xl font-syne font-bold leading-tight text-washi">
            A few things built right.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-px bg-hai/40">
          {WORK.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <article className="group relative grid grid-cols-1 gap-6 bg-tetsu p-8 transition-colors duration-300 hover:bg-tetsu/70 sm:grid-cols-12 sm:p-12">
                <div className="sm:col-span-1">
                  <span className="font-syne text-sm font-bold text-beni">
                    0{i + 1}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <p className="font-syne text-xs uppercase tracking-[0.2em] text-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-syne text-2xl font-bold text-washi transition-colors group-hover:text-beni sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>
                <div className="sm:col-span-4 sm:text-right">
                  <ul className="flex flex-wrap gap-2 sm:justify-end">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-hai px-3 py-1 font-syne text-[11px] uppercase tracking-wider text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
