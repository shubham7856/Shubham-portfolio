import SectionLabel from "./SectionLabel";
import { learning } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-y border-line bg-bg-deep grid-paper scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-28 grid lg:grid-cols-[1.2fr_1fr] gap-16">
        <div>
          <SectionLabel index="03" label="About" />
          <h2 data-scramble className="font-display font-medium text-4xl sm:text-5xl tracking-[-0.025em] text-ink mb-8">
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
          </div>
        </div>

        <div data-reveal className="lg:pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint mb-6">
            pipeline: <span className="text-steel">growing-toward-ci-cd</span>
          </p>
          <ol className="relative border-l-2 border-line ml-2 space-y-7">
            {learning.map((l) => (
              <li key={l.topic} className="pl-7 relative">
                <span
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${
                    l.active ? "border-accent bg-accent/30 animate-pulse" : "border-line bg-bg-deep"
                  }`}
                />
                <p className={`font-mono text-xs mb-1 ${l.active ? "text-accent" : "text-faint"}`}>
                  {l.active ? "running" : "queued"} · {l.step.toLowerCase()}
                </p>
                <p className={`font-display text-xl ${l.active ? "text-ink" : "text-muted"}`}>{l.topic}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
