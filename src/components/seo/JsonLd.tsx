import { SITE, SERVICES } from "@/lib/constants";

/**
 * Structured data for SEO. Rendered once in the root layout.
 * - LocalBusiness: the studio, located in Malaysia / Selangor
 * - Person: Ethan, the web developer
 * - WebSite: the site itself
 * - Service: one node per offering
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.domain}/#business`,
        name: SITE.name,
        alternateName: "開発 Dev",
        url: SITE.domain,
        image: `${SITE.domain}/opengraph-image`,
        description: SITE.description,
        slogan: SITE.tagline,
        email: SITE.email,
        priceRange: "$$",
        areaServed: { "@type": "Country", name: "Malaysia" },
        address: {
          "@type": "PostalAddress",
          addressRegion: SITE.region,
          addressCountry: "MY",
        },
        sameAs: [SITE.instagramUrl],
        founder: { "@id": `${SITE.domain}/#ethan` },
        knowsAbout: [
          "Web Development",
          "React",
          "Next.js",
          "Frontend Development",
          "Backend Systems",
          "Website Performance",
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE.domain}/#ethan`,
        name: "Ethan",
        jobTitle: "Web Developer",
        worksFor: { "@id": `${SITE.domain}/#business` },
        url: SITE.domain,
        address: {
          "@type": "PostalAddress",
          addressRegion: SITE.region,
          addressCountry: "MY",
        },
        knowsAbout: ["React", "Next.js", "TypeScript", "Web Performance"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.domain}/#website`,
        url: SITE.domain,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.domain}/#business` },
        inLanguage: "en-MY",
      },
      ...SERVICES.map((s) => ({
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@id": `${SITE.domain}/#business` },
        areaServed: { "@type": "Country", name: "Malaysia" },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, generated from constants — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
