const projects = [
  {
    title: "Easy Drugs",
    description:
      "QA engagement for a Canadian pharmaceutical e-commerce platform. Responsible for end-to-end manual testing across the web UI, REST APIs, and database layers — covering product listings, prescription workflows, checkout, and user account management to ensure regulatory-grade quality.",
    tags: ["Manual Testing", "Web UI", "REST API", "Database", "Jira"],
    highlights: [
      "Web UI, REST API, and database testing",
      "Pharma-grade quality standards",
      "Bug reporting and triage in Jira",
      "Test case design and execution",
    ],
    github: null,
    badge: "Active Engagement",
  },
  {
    title: "Audible App Automation",
    description:
      "End-to-end mobile automation suite for the Audible app on iOS and Android. Covers authentication flows, library browsing, and playback interactions with robust locator strategies.",
    tags: ["Java", "Appium", "iOS", "Android", "TestNG"],
    highlights: [
      "iOS + Android coverage",
      "Configurable per-device JSON configs",
      "Video recording on test failure",
      "Extent report dashboard",
    ],
    github: null,
    badge: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Projects
        </h2>
        <p className="text-slate-500 text-center text-sm mb-12">
          Real frameworks and test suites, not toy apps
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col rounded-2xl bg-slate-900 border border-slate-700 p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  {project.badge && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold">
                      {project.badge}
                    </span>
                  )}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-colors ml-2 shrink-0"
                    title="View on GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <ul className="mb-5 space-y-1">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
