import type { Quote } from "@/types";

// Studio is Malaysia-based — default to Ringgit. Change if the backend quotes another currency.
const CURRENCY = "RM";

function money(n: number): string {
  return `${CURRENCY} ${n.toLocaleString("en-MY")}`;
}

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="mt-2 w-full border border-hai bg-tetsu text-washi">
      {/* Beni header */}
      <div className="border-b border-beni bg-beni px-4 py-3">
        <p className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-washi/80">
          Estimated Quote
        </p>
        <p className="font-syne text-base font-bold leading-tight text-washi">
          {quote.projectTitle}
        </p>
      </div>

      <div className="space-y-4 p-4">
        {quote.summary && (
          <p className="text-sm leading-relaxed text-muted">{quote.summary}</p>
        )}

        {quote.services.length > 0 && (
          <ul className="divide-y divide-hai/60 border-y border-hai/60">
            {quote.services.map((s, i) => (
              <li
                key={`${s.name}-${i}`}
                className="flex items-start justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="font-syne text-sm font-bold text-washi">
                    {s.name}
                  </p>
                  {s.description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">
                      {s.description}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-syne text-sm font-bold text-beni">
                  {money(s.price)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <dl className="space-y-2 text-sm">
          {quote.timeline && (
            <div className="flex items-center justify-between gap-3">
              <dt className="font-syne text-xs uppercase tracking-[0.15em] text-muted">
                Timeline
              </dt>
              <dd className="text-washi">{quote.timeline}</dd>
            </div>
          )}
          <div className="flex items-center justify-between gap-3 border-t border-hai/60 pt-3">
            <dt className="font-syne text-xs uppercase tracking-[0.15em] text-muted">
              Estimate
            </dt>
            <dd className="font-syne text-base font-bold text-washi">
              {money(quote.totalMin)} – {money(quote.totalMax)}
            </dd>
          </div>
        </dl>

        {quote.notes && (
          <p className="border-t border-hai/60 pt-3 text-xs italic leading-relaxed text-muted">
            {quote.notes}
          </p>
        )}
      </div>
    </div>
  );
}
