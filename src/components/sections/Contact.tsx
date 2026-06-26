import { SITE } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-hai/40 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>Start a Project</SectionLabel>
            <h2 className="fluid-h2 mt-6 font-syne font-bold leading-tight text-washi">
              Let&rsquo;s build something.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Tell me about your project. I&rsquo;ll get back to you within 24
              hours.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-syne text-xs uppercase tracking-[0.2em] text-muted">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-washi transition-colors hover:text-beni"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-syne text-xs uppercase tracking-[0.2em] text-muted">
                  Instagram
                </dt>
                <dd className="mt-1">
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-washi transition-colors hover:text-beni"
                  >
                    {SITE.instagram}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-syne text-xs uppercase tracking-[0.2em] text-muted">
                  Based in
                </dt>
                <dd className="mt-1 text-washi">
                  {SITE.region}, {SITE.location}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.06}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
