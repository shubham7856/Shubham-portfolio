import Odometer from "./Odometer";
import { evidence } from "@/lib/content";

export default function Evidence() {
  return (
    <section className="border-y border-line bg-bg-deep">
      <dl className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
        {evidence.map((e, i) => (
          <div
            key={e.value}
            className={`py-12 pr-6 ${i % 2 === 1 ? "pl-6 border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:pl-6 lg:border-l" : ""}`}
          >
            <dt className="sr-only">{e.label}</dt>
            <dd className="font-display font-medium text-5xl sm:text-6xl tracking-[-0.03em] text-accent mb-3" data-odo>
              <Odometer value={e.value} />
            </dd>
            <dd className="text-sm text-muted leading-snug max-w-[16rem]">{e.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
