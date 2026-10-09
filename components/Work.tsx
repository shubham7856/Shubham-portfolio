import SectionLabel from "./SectionLabel";
import { projects } from "@/lib/content";

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");

export default function Work() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-4 sm:px-8 py-28 scroll-mt-16">
      <SectionLabel index="01" label="Test results" />
      <h2 data-scramble className="font-display font-medium text-4xl sm:text-6xl tracking-[-0.025em] text-ink mb-5 max-w-3xl leading-[1.04]">
        Real client work, run like a test suite.
      </h2>
      <p className="text-muted mb-16 max-w-2xl">
        Each project runs as you scroll to it. Every number comes from a report, a dataset or a test plan.
      </p>

      <ol className="space-y-8">
        {projects.map((p, i) => (
          <li key={p.name} className="run-card lg:sticky" style={{ top: `${96 + i * 18}px` }}>
            <article className="relative rounded-[1.75rem] bg-surface border border-line overflow-hidden shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.7)]">
              <header className="flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b border-line font-mono text-xs">
                <span className="text-faint truncate">
                  <span className="text-steel">spec</span> {slug(p.name)}.spec.ts
                </span>
                <span className="run-status shrink-0 px-2.5 py-1 rounded-md bg-pass/15 text-pass">PASSED</span>
              </header>
              <div className="h-0.5 bg-line">
                <div className="run-bar h-full bg-pass origin-left" />
              </div>

              <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10">
                <div>
                  <span className="font-display text-6xl tracking-[-0.04em] text-accent leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl tracking-[-0.015em] text-ink mt-5 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-steel font-medium mb-4">{p.context}</p>
                  <p className="text-muted leading-relaxed text-[15px] mb-6">{p.summary}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <li key={s} className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-bg text-muted border border-line">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:border-l lg:border-line lg:pl-10">
                  <ul className="space-y-3.5 font-mono text-[13px]">
                    {p.outcomes.map((o) => (
                      <li key={o} className="run-step flex gap-3 leading-snug" data-state="passed">
                        <span className="run-icon w-4 shrink-0 text-center" aria-hidden="true" />
                        <span className="run-text text-ink transition-colors duration-200">{o}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex items-center justify-between gap-4">
                    <p className="run-summary font-mono text-xs text-faint">
                      {p.outcomes.length} passed, 0 failed
                    </p>
                    <span
                      className="run-stamp font-display font-semibold text-lg tracking-[0.2em] text-pass border-[3px] border-pass rounded-lg px-3 py-0.5 -rotate-12 opacity-85"
                      aria-hidden="true"
                    >
                      PASS
                    </span>
                  </div>
                </div>
              </div>

            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
