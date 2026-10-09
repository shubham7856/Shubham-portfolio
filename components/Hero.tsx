import { profile, testRun } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint mb-6">
          {profile.title} · {profile.company}
        </p>
        <h1 className="font-display font-medium text-ink text-[2.6rem] sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-[-0.02em] mb-6">
          I test what ships, and build the tools that test it faster.
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-xl mb-10">
          QA Automation Engineer working across web and mobile client projects in Java, TypeScript
          and Python. Open to SDET and QA Automation roles.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#work"
            className="px-6 py-3 rounded-full bg-ink text-bg font-medium hover:opacity-85 transition-opacity duration-200"
          >
            See the work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3 rounded-full border border-line text-ink font-medium hover:border-ink transition-colors duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div
        className="rounded-3xl bg-console text-console-ink font-mono text-[13px] leading-relaxed shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] overflow-hidden"
        aria-label="Highlights from my test work, shown as a passing test run"
      >
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-console-muted text-xs">~/shubham $ npx run-portfolio</span>
        </div>
        <ul className="px-5 py-5 space-y-2.5">
          {testRun.map((t, i) => (
            <li
              key={t.check}
              className="reveal-line flex gap-3"
              style={{ animationDelay: `${300 + i * 260}ms` }}
            >
              <span className="text-[#4cc596] shrink-0">✓</span>
              <span>
                <span className="text-console-muted">{t.suite}</span> {t.check}
              </span>
            </li>
          ))}
          <li
            className="reveal-line pt-3 mt-3 border-t border-white/10 text-console-muted"
            style={{ animationDelay: `${300 + testRun.length * 260}ms` }}
          >
            <span className="text-[#4cc596]">{testRun.length} passed</span>, 0 failed
          </li>
        </ul>
      </div>
    </section>
  );
}
