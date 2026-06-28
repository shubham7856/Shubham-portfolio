const roadmap = [
  {
    month: "Jul 2026",
    topic: "Docker + Linux + Bash",
    detail: "Containers, images, volumes, networks. Linux fundamentals and shell scripting for automation.",
    status: "in-progress" as const,
    icon: "🐳",
  },
  {
    month: "Aug 2026",
    topic: "Kubernetes on AKS",
    detail: "Pods, deployments, services, ingress. Running and scaling workloads on Azure Kubernetes Service.",
    status: "upcoming" as const,
    icon: "☸️",
  },
  {
    month: "Sep 2026",
    topic: "Terraform + Terraform Associate Cert",
    detail: "Infrastructure as code for Azure resources. Target: HashiCorp Terraform Associate certification.",
    status: "upcoming" as const,
    icon: "🏗️",
  },
  {
    month: "Oct 2026",
    topic: "Full CI/CD Pipelines",
    detail: "End-to-end pipelines: build → test → deploy using Azure Pipelines and GitHub Actions.",
    status: "upcoming" as const,
    icon: "⚙️",
  },
  {
    month: "Nov 2026",
    topic: "Monitoring + AZ-400 Cert",
    detail: "Azure Monitor, Prometheus, Grafana dashboards. Target: AZ-400 DevOps Expert certification.",
    status: "upcoming" as const,
    icon: "📊",
  },
  {
    month: "Dec 2026",
    topic: "Job Search & Interviews",
    detail: "Mock interviews, system design practice, applications to Razorpay, CRED, PhonePe, Zepto, Freshworks.",
    status: "upcoming" as const,
    icon: "🎯",
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
          DevOps Learning Roadmap
        </h2>
        <p className="text-slate-500 text-center text-sm mb-12">
          6-month structured plan — started Jul 2026
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmap.map((item) => {
            const config = statusConfig[item.status];
            return (
              <div
                key={item.month}
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
                    {item.month}
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
