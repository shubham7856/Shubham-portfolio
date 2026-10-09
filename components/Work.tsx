import SectionLabel from "./SectionLabel";
import { projects } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-4 sm:px-8 py-24 scroll-mt-16">
      <SectionLabel index="01" label="Selected work" />
      <h2 className="font-display font-medium text-3xl sm:text-5xl tracking-[-0.02em] text-ink mb-4 max-w-3xl">
        Real client work, measured from the deliverable.
      </h2>
      <p className="text-muted mb-16 max-w-2xl">
        Every number below comes from a report, a dataset or a test plan, not from memory.
      </p>

      <ol>
        {projects.map((p, i) => (
          <li key={p.name} className="grid lg:grid-cols-[5rem_1fr_1fr] gap-x-10 gap-y-5 py-12 border-t border-line">
            <span className="font-mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display font-medium text-2xl sm:text-[1.7rem] tracking-[-0.01em] text-ink mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-4">{p.context}</p>
              <p className="text-muted leading-relaxed mb-6">{p.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="font-mono text-xs px-2.5 py-1 rounded-lg bg-surface text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-3 lg:pt-1">
              {p.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] text-ink leading-snug">
                  <span className="text-accent font-mono shrink-0" aria-hidden="true">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
