const roadmap = [
  {
    step: "Now",
    topic: "Linux + Bash",
    detail: "File system, permissions, processes and shell scripting for automation.",
    status: "in-progress" as const,
    icon: "🐧",
  },
  {
    step: "Next",
    topic: "Docker",
    detail: "Images, containers, volumes and Compose, starting with containerising my own test suites.",
    status: "upcoming" as const,
    icon: "🐳",
  },
  {
    step: "Then",
    topic: "CI/CD with Tests",
    detail: "GitHub Actions pipelines that build, test and report on every push.",
    status: "upcoming" as const,
    icon: "⚙️",
  },
  {
    step: "Later",
    topic: "Kubernetes + Terraform",
    detail: "Running workloads on AKS and provisioning the infrastructure as code.",
    status: "upcoming" as const,
    icon: "☸️",
  },
];

const statusConfig = {
  "in-progress": {
    label: "In Progress",
    classes: "bg-green-500/10 text-green-400 border-green-500/30",
    dot: "bg-green-400 animate-pulse",
  },
  upcoming: {
    label: "Upcoming",
    classes: "bg-slate-700/50 text-slate-500 border-slate-600",
    dot: "bg-slate-600",
  },
};

export default function DevOpsRoadmap() {
  return (
    <section id="roadmap" className="py-20 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          What I&apos;m Learning
        </h2>
        <p className="text-slate-500 text-center text-sm mb-12">
          Self-paced alongside full-time work, in this order
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roadmap.map((item) => {
            const config = statusConfig[item.status];
            return (
              <div
                key={item.topic}
                className={`rounded-2xl border bg-slate-800 p-5 flex flex-col gap-3 ${
                  item.status === "in-progress" ? "border-green-500/30" : "border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${config.classes}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    {config.label}
                  </span>
                </div>

                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">
                    {item.step}
                  </p>
                  <h3 className="text-white font-bold text-base leading-snug">
                    {item.topic}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
