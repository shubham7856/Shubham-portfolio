"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import SectionLabel from "./SectionLabel";
import { skills } from "@/lib/content";

const TONES: Record<string, string> = {
  Languages: "border-accent/60 text-accent",
  "Test automation": "border-steel/60 text-steel",
  "AI tooling": "border-pass/60 text-pass",
  "CI/CD and tools": "border-ink/40 text-ink",
};

const pills = skills.flatMap((s) => s.items.map((label) => ({ label, group: s.group })));

export default function SkillsPit() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop = () => {};
    // Drop the pills only once the pit is actually on screen, so visitors see them fall.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        stop = start(el);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-8 pb-28 scroll-mt-16">
      <SectionLabel index="02" label="Skills" />
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 data-scramble className="font-display font-medium text-4xl sm:text-5xl tracking-[-0.025em] text-ink">
          The toolbox. Go on, throw it around.
        </h2>
        <ul className="flex flex-wrap gap-4 font-mono text-xs text-faint">
          {Object.entries(TONES).map(([group, tone]) => (
            <li key={group} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full border-2 ${tone}`} />
              {group}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={box}
        className="skills-pit relative h-[26rem] sm:h-[28rem] rounded-[1.75rem] border border-line bg-bg-deep grid-paper overflow-hidden"
      >
        <ul className="pit-list flex flex-wrap gap-2.5 p-6 sm:p-8">
          {pills.map((p) => (
            <li
              key={p.label}
              data-pill
              className={`pill select-none whitespace-nowrap rounded-full border-2 bg-surface px-5 py-2.5 font-display text-base sm:text-lg ${TONES[p.group]}`}
            >
              {p.label}
            </li>
          ))}
        </ul>
        <p className="pit-hint absolute top-5 right-6 font-mono text-xs text-faint pointer-events-none">
          drag, flick, stack
        </p>
      </div>
    </section>
  );
}

function start(el: HTMLElement) {
  const items = Array.from(el.querySelectorAll<HTMLElement>("[data-pill]"));
  const sizes = items.map((p) => ({ w: p.offsetWidth, h: p.offsetHeight }));
  const W = el.clientWidth;
  const H = el.clientHeight;
  el.classList.add("pit-live");

  const engine = Matter.Engine.create();
  const t = 200;
  const walls = [
    Matter.Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true }),
    Matter.Bodies.rectangle(-t / 2, 0, t, H * 4, { isStatic: true }),
    Matter.Bodies.rectangle(W + t / 2, 0, t, H * 4, { isStatic: true }),
  ];
  const bodies = sizes.map((s, i) =>
    Matter.Bodies.rectangle(
      s.w / 2 + 8 + Math.random() * Math.max(1, W - s.w - 16),
      -60 - i * 45,
      s.w,
      s.h,
      { chamfer: { radius: s.h / 2 }, restitution: 0.4, friction: 0.25, angle: (Math.random() - 0.5) * 0.6 },
    ),
  );
  Matter.Composite.add(engine.world, [...walls, ...bodies]);

  if (window.matchMedia("(pointer: fine)").matches) {
    const mouse = Matter.Mouse.create(el);
    // Matter grabs the wheel by default, which would trap page scrolling over the pit.
    const m = mouse as unknown as { mousewheel: EventListener };
    el.removeEventListener("wheel", m.mousewheel);
    el.removeEventListener("mousewheel", m.mousewheel);
    el.removeEventListener("DOMMouseScroll", m.mousewheel);
    const drag = Matter.MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, damping: 0.1 } });
    Matter.Composite.add(engine.world, drag);
    el.classList.add("pit-grab");
  }

  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(el);

  let raf = 0;
  let last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min(now - last, 1000 / 60);
    last = now;
    if (visible) {
      Matter.Engine.update(engine, dt);
      bodies.forEach((b, i) => {
        items[i].style.transform = `translate(${b.position.x - sizes[i].w / 2}px, ${b.position.y - sizes[i].h / 2}px) rotate(${b.angle}rad)`;
      });
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    Matter.Engine.clear(engine);
  };
}
