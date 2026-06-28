const certs = [
  {
    name: "AZ-900: Azure Fundamentals",
    issuer: "Microsoft Azure",
    status: "quick-win" as const,
    target: "Aug 2026",
    icon: "⚡",
    description: "Validates Azure cloud fundamentals. Azure is already a strong skill — 2–4 weeks of exam prep converts existing knowledge into an official credential on the resume right now.",
  },
  {
    name: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    status: "pursuing" as const,
    target: "Sep 2026",
    icon: "🏗️",
    description: "Infrastructure as code with Terraform — provider configuration, state management, and modules. Directly tied to Month 3 of the DevOps roadmap.",
  },
  {
    name: "AZ-400: DevOps Engineer Expert",
    issuer: "Microsoft Azure",
    status: "pursuing" as const,
    target: "Nov 2026",
    icon: "🔷",
    description: "Microsoft's flagship DevOps certification covering CI/CD, monitoring, IaC, and DevOps practices on Azure. AZ-900 → AZ-400 path.",
  },
  {
    name: "CKA: Certified Kubernetes Administrator",
    issuer: "CNCF",
    status: "planned" as const,
    target: "Jan 2027",
    icon: "☸️",
    description: "Validates hands-on Kubernetes administration skills — one of the most sought-after credentials for Platform Engineering roles. Targeted after the Kubernetes learning month.",
  },
];

const statusConfig = {
  "quick-win": {
    label: "Quick Win",
    classes: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  pursuing: {
    label: "Pursuing",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  planned: {
    label: "Planned",
    classes: "bg-slate-700/50 text-slate-400 border-slate-600",
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 bg-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Certifications
        </h2>
        <p className="text-slate-500 text-center text-sm mb-12">
          Strategic certification path — from quick wins to expert-level credentials
        </p>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {certs.map((cert) => {
            const config = statusConfig[cert.status];
            return (
              <div
                key={cert.name}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-6 flex gap-4"
              >
                <span className="text-3xl shrink-0">{cert.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${config.classes}`}
                    >
                      {config.label} · {cert.target}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-slate-500 text-xs mb-2">{cert.issuer}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
