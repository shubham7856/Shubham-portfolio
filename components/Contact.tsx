import SectionLabel from "./SectionLabel";
import { profile } from "@/lib/content";

const links = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Resume (PDF)", href: "/resume.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-12 scroll-mt-16">
      <SectionLabel index="03" label="Contact" />
      <h2 data-split className="font-display font-medium text-4xl sm:text-7xl tracking-[-0.02em] text-ink mb-10 max-w-4xl leading-[1.05]">
        Hiring an SDET or QA Automation Engineer?
      </h2>
      <a
        data-magnetic
        href={`mailto:${profile.email}`}
        className="inline-block font-display text-xl sm:text-3xl text-accent underline decoration-1 underline-offset-[6px] decoration-accent/40 hover:decoration-accent transition-colors duration-200 break-all"
      >
        {profile.email}
      </a>

      <ul data-reveal className="flex flex-wrap gap-x-8 gap-y-3 mt-10">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors duration-200"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-24 pt-6 border-t border-line flex flex-wrap justify-between gap-2 text-xs text-faint font-mono">
        <span>{profile.name} · {profile.location}</span>
        <span>Next.js · Tailwind · Vercel</span>
      </footer>
    </section>
  );
}
