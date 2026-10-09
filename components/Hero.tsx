"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { profile, testRun } from "@/lib/content";

gsap.registerPlugin(SplitText, useGSAP);

const HeroScene = dynamic(() => import("./motion/HeroScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        SplitText.create(".hero-title", {
          type: "words",
          mask: "words",
          onSplit: (self) => {
            tl.from(self.words, { yPercent: 115, duration: 1.1, stagger: 0.06 }, 0.15);
          },
        });
        tl.from(".hero-fade", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.7);
        tl.from(".hero-console", { y: 40, autoAlpha: 0, duration: 1 }, 0.6);

        // Type each check out character by character, then print the summary line.
        gsap.set(".type-row", { autoAlpha: 0 });
        gsap.utils.toArray<HTMLElement>(".type-line").forEach((line) => {
          const text = line.dataset.text ?? "";
          const state = { n: 0 };
          line.textContent = "";
          tl.to(
            state,
            {
              n: text.length,
              duration: text.length * 0.018,
              ease: "none",
              onStart: () => {
                gsap.set(line.closest("li"), { autoAlpha: 1 });
              },
              onUpdate: () => {
                line.textContent = text.slice(0, Math.round(state.n));
              },
            },
            ">0.08",
          );
        });
        tl.from(".type-summary", { autoAlpha: 0, duration: 0.4 }, ">0.1");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="hero relative min-h-[100svh] overflow-hidden bg-[#0a1628] text-[#f2eee6] flex items-center"
    >
      <div className="absolute inset-0 lg:left-[38%] opacity-60 lg:opacity-100">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(10,22,40,0.92),rgba(10,22,40,0.2)_60%,transparent)] pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 pt-28 pb-20 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p className="hero-fade font-mono text-xs uppercase tracking-[0.2em] text-[#8a97ab] mb-6">
            {profile.name} · {profile.title}
          </p>
          <h1 className="hero-title font-display font-medium text-[2.7rem] sm:text-6xl lg:text-[4.6rem] leading-[1.02] tracking-[-0.025em] mb-7">
            I test what ships, and build the tools that test it <span className="text-[#d4b06a]">faster.</span>
          </h1>
          <p className="hero-fade text-[#a7b0be] text-lg leading-relaxed max-w-xl mb-10">
            QA Automation Engineer at {profile.company}, working across web and mobile client projects in
            Java, TypeScript and Python. Open to SDET and QA Automation roles.
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <a
              data-magnetic
              href="#work"
              className="px-7 py-3.5 rounded-full bg-[#d4b06a] text-[#0a1628] font-medium hover:bg-[#e2c487] transition-colors duration-200"
            >
              See the work
            </a>
            <a
              data-magnetic
              href={`mailto:${profile.email}`}
              className="px-7 py-3.5 rounded-full border border-white/20 font-medium hover:border-white/60 transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div
          className="hero-console rounded-3xl bg-black/55 backdrop-blur-md border border-white/10 font-mono text-[13px] leading-relaxed overflow-hidden"
          role="img"
          aria-label={`Highlights shown as a passing test run: ${testRun.map((t) => t.check).join("; ")}`}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="ml-3 text-[#8a97ab] text-xs">~/shubham $ npx run-portfolio</span>
          </div>
          <ul className="px-5 py-5 space-y-2.5 min-h-[17rem]" aria-hidden="true">
            {testRun.map((t) => (
              <li key={t.check} className="type-row flex gap-3">
                <span className="type-tick text-[#d4b06a] shrink-0">✓</span>
                <span>
                  <span className="text-[#8a97ab]">{t.suite}</span>{" "}
                  <span className="type-line" data-text={t.check}>
                    {t.check}
                  </span>
                </span>
              </li>
            ))}
            <li className="type-summary pt-3 mt-3 border-t border-white/10 text-[#8a97ab]">
              <span className="text-[#d4b06a]">{testRun.length} passed</span>, 0 failed
            </li>
          </ul>
        </div>
      </div>

      <a
        href="#work"
        className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#8a97ab] hidden lg:flex flex-col items-center gap-2"
      >
        Scroll
        <span className="scroll-cue block w-px h-10 bg-gradient-to-b from-[#8a97ab] to-transparent" />
      </a>
    </section>
  );
}
