"use client";

import { useState } from "react";
import BugHunt from "./motion/BugHunt";
import Terminal from "./Terminal";
import { profile } from "@/lib/content";

const RANKS = [
  { at: 1, text: "First one down. Keep going." },
  { at: 3, text: "Three caught. You have the instincts." },
  { at: 5, text: "Five! Achievement unlocked: QA material." },
  { at: 10, text: "Ten bugs. Honestly, we should work together." },
];

export default function Hero() {
  const [caught, setCaught] = useState(0);
  const rank = [...RANKS].reverse().find((r) => caught >= r.at);

  return (
    <section
      id="top"
      className="hunt-zone relative min-h-[100svh] overflow-hidden bg-bg grid-paper flex items-center cursor-crosshair"
    >
      <BugHunt onCatch={setCaught} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 pt-28 pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center pointer-events-none">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel mb-6">
            {profile.name} · {profile.title}
          </p>
          <h1 className="font-display font-medium text-[2.6rem] sm:text-6xl lg:text-[4.4rem] leading-[1.03] tracking-[-0.025em] mb-7">
            <span data-scramble className="block">I break things on purpose,</span>
            <span data-scramble className="block text-accent">so your users never do.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-xl mb-8">
            QA Automation Engineer at {profile.company}, testing web and mobile client projects in Java,
            TypeScript and Python. Open to SDET and QA Automation roles.
          </p>
          <div className="flex flex-wrap gap-3 mb-10 pointer-events-auto">
            <a
              href="#work"
              className="px-7 py-3.5 rounded-full bg-accent text-bg font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              See the test results
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-7 py-3.5 rounded-full border border-line text-ink font-medium hover:border-accent transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>
          <p className="font-mono text-xs text-faint" aria-live="polite">
            <span className="text-ink">bugs fixed: {caught}</span>
            <span className="mx-2">·</span>
            {rank ? <span className="text-pass">{rank.text}</span> : "psst, the bugs are clickable"}
          </p>
        </div>

        <div className="pointer-events-auto">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
