import SectionLabel from "./SectionLabel";
import { projects } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-16">
      <div id="work-pin" className="work-pin">
        <div
          id="work-track"
          className="work-track px-4 sm:px-8 py-24"
        >
          <div className="work-intro shrink-0 flex flex-col justify-center">
            <SectionLabel index="01" label="Selected work" />
            <h2
              data-split
              className="font-display font-medium text-4xl sm:text-6xl tracking-[-0.025em] text-ink mb-6 leading-[1.02]"
            >
              Real client work, measured from the deliverable.
            </h2>
            <p data-reveal className="text-muted max-w-md">
              Every number comes from a report, a dataset or a test plan.{" "}
              <span className="work-hint">Keep scrolling, the projects move sideways.</span>
            </p>
          </div>

          {projects.map((p, i) => (
            <article
              key={p.name}
              data-tilt
              className="project-card shrink-0 rounded-[2rem] bg-surface border border-line p-8 sm:p-10 flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-6xl sm:text-7xl tracking-[-0.04em] text-accent/80 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ul className="flex flex-wrap justify-end gap-1.5 max-w-[60%]">
                  {p.stack.map((s) => (
                    <li key={s} className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-bg text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className="font-display font-medium text-2xl sm:text-3xl tracking-[-0.015em] text-ink mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-4">{p.context}</p>
              <p className="text-muted leading-relaxed text-[15px] mb-6">{p.summary}</p>
              <ul className="mt-auto space-y-2.5 pt-6 border-t border-line">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-[14px] text-ink leading-snug">
                    <span className="text-accent font-mono shrink-0" aria-hidden="true">✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
