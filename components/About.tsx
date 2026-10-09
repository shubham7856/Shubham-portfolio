export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              I&apos;m a QA Automation Engineer building test automation for web
              and mobile applications across several client projects. I write
              suites in Java with Selenium, Appium and TestNG on a shared
              in-house framework, in TypeScript with Playwright, and in Python
              for data-quality tooling.
            </p>
            <p>
              I also build{" "}
              <span className="text-blue-400 font-medium">AI-assisted tooling</span>{" "}
              with Claude Code that turns repeat QA work into a single command,
              from report triage to competitor app analysis. Alongside my day
              job I&apos;m learning Linux, Docker and CI/CD, the direction I&apos;m
              growing in next.
            </p>
            <p>
              I&apos;m a hard worker with 100% commitment. When I start
              something, I finish it, whether that&apos;s a test suite, a
              pipeline, or a certification.
            </p>
          </div>

          {/* Differentiator callout */}
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h3 className="text-white font-bold text-lg leading-tight">
                My Unique Edge
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              I can build a CI/CD pipeline{" "}
              <strong className="text-white">and</strong> write production-quality
              automated tests inside it. Most DevOps candidates can only do the
              pipeline side. Most QA engineers can only do the tests. I do both.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                "CI/CD Pipelines",
                "Automated Testing",
                "AI-Assisted Tooling",
                "Multi-platform (iOS/Android/Web)",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
