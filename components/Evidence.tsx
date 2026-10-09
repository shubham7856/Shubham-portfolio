import { evidence } from "@/lib/content";

export default function Evidence() {
  return (
    <section className="border-y border-line">
      <dl className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
        {evidence.map((e, i) => (
          <div
            key={e.value}
            className={`py-10 pr-6 ${i % 2 === 1 ? "pl-6 border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:pl-6 lg:border-l" : ""}`}
          >
            <dt className="sr-only">{e.label}</dt>
            <dd className="font-display font-medium text-4xl sm:text-5xl tracking-[-0.02em] text-ink mb-2">
              {e.value}
            </dd>
            <dd className="text-sm text-muted leading-snug max-w-[16rem]">{e.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
