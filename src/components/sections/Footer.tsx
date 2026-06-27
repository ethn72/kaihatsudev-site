import { NAV_LINKS, SITE } from "@/lib/constants";
import { KaiMark } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hai/40 px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <KaiMark className="h-8 w-8 text-sm" />
              <span className="font-syne text-base font-bold tracking-tight text-washi">
                KAIHATSU<span className="text-beni-light"> DEV</span>
              </span>
            </div>
            <p className="mt-4 font-noto text-sm text-muted">
              {SITE.kanji} · {SITE.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.filter((l) => l.id !== "kai").map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="font-syne text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-washi"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/chat"
                  className="font-syne text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:text-washi"
                >
                  Chat
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hai/40 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}
          </p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-beni"
          >
            {SITE.instagram}
          </a>
        </div>
      </div>
    </footer>
  );
}
