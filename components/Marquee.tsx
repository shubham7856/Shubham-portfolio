import { skills } from "@/lib/content";

const items = skills.flatMap((s) => s.items);

function Row({ reverse }: { reverse?: boolean }) {
  return (
    <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {items.map((item) => (
            <li
              key={item}
              className="font-display text-3xl sm:text-5xl tracking-[-0.02em] whitespace-nowrap px-6 sm:px-8 flex items-center gap-6 sm:gap-8"
            >
              {item}
              <span className="text-accent text-xl" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-14 overflow-hidden border-b border-line text-ink" aria-label="Skills">
      <Row />
      <div className="mt-4 text-faint">
        <Row reverse />
      </div>
    </section>
  );
}
