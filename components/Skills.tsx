const skillGroups = [
  {
    label: "Languages",
    color: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    skills: ["Java", "Bash", "SQL"],
  },
  {
    label: "Testing",
    color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    skills: ["Appium", "Selenium", "TestNG", "Page Object Model", "Extent Reports"],
  },
  {
    label: "Cloud",
    color: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    skills: ["Azure (Advanced)", "AWS (Basic)", "Azure Pipelines"],
  },
  {
    label: "Tools",
    color: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    skills: ["Docker (Basic)", "Git", "GitHub", "IntelliJ IDEA", "Maven"],
  },
  {
    label: "CI / CD",
    color: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    skills: ["Azure Pipelines", "GitHub Actions"],
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
