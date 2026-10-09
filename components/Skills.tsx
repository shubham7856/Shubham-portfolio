const skillGroups = [
  {
    label: "Languages",
    color: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    skills: ["Java", "TypeScript", "Python", "SQL", "Bash"],
  },
  {
    label: "Testing",
    color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    skills: ["Selenium", "Appium", "Playwright", "TestNG", "REST Assured", "pytest", "axe-core", "Page Object Model", "Extent Reports"],
  },
  {
    label: "AI Tooling",
    color: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    skills: ["Claude Code", "Custom Skills", "MCP", "Ollama"],
  },
  {
    label: "CI / CD and Cloud",
    color: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    skills: ["Azure Pipelines", "GitHub Actions", "Azure", "AWS (Basic)"],
  },
  {
    label: "Tools",
    color: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    skills: ["Git", "GitHub", "Jira", "Maven", "Docker (Learning)"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Current Skills
        </h2>
        <p className="text-slate-500 text-center text-sm mb-12">
          Technologies I use today
        </p>

        <div className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${group.color}`}
                  >
                    {skill}
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
