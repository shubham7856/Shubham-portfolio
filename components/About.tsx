import SectionLabel from "./SectionLabel";
import { learning, skills } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="bg-surface scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-24 grid lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel index="02" label="About" />
          <h2 data-split className="font-display font-medium text-3xl sm:text-5xl tracking-[-0.02em] text-ink mb-8">
            Tests, and the tooling around them.
          </h2>
          <div data-reveal className="space-y-5 text-muted text-[17px] leading-relaxed">
            <p>
              I&apos;m an Associate QA Engineer at Atimi Software in Bengaluru, where I joined as a QA
              Trainee in May 2024. I write automation for web and mobile client projects: Java with
              Selenium, Appium and TestNG on a shared in-house framework, TypeScript with Playwright,
              and Python for data-quality work.
            </p>
            <p>
              Alongside the suites I build AI-assisted tooling with Claude Code, so the repeat work
              around testing, from report triage to competitor app analysis, becomes a single command.
            </p>
            <p>
              Next I&apos;m growing toward CI/CD, so the tests I write also run, report and gate every push.
            </p>
          </div>

          <div data-reveal className="mt-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint mb-4">Learning path</p>
            <ol className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden">
              {learning.map((l) => (
                <li key={l.topic} className="bg-bg p-4">
                  <p className={`font-mono text-xs mb-1 ${l.active ? "text-accent" : "text-faint"}`}>
                    {l.active && <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-1.5 align-middle" />}
                    {l.step}
                  </p>
                  <p className="text-sm text-ink leading-snug">{l.topic}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div data-reveal className="lg:pt-14">
          <dl className="divide-y divide-line border-y border-line">
            {skills.map((s) => (
              <div key={s.group} className="py-6 grid sm:grid-cols-[10rem_1fr] gap-3">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-faint pt-1">{s.group}</dt>
                <dd className="text-ink leading-relaxed">{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
