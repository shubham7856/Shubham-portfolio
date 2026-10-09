"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

// Every scroll effect in one place, keyed off markup hooks:
// data-scramble (heading decodes), data-reveal (block fades up), data-odo (digits roll),
// .run-card (project runs its steps, earlier cards sink as the next stacks on), #progress.
export default function ScrollFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((el) => {
        const text = el.textContent ?? "";
        const inHero = !!el.closest("#top");
        gsap.to(el, {
          duration: Math.min(2, 0.6 + text.length * 0.025),
          delay: inHero ? 0.2 : 0,
          scrambleText: { text, chars: GLYPHS, speed: 0.5, revealDelay: 0.15 },
          scrollTrigger: inHero ? undefined : { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-odo]").forEach((el) => {
        const strips = el.querySelectorAll<HTMLElement>(".odo-strip");
        gsap.set(strips, { y: 0, yPercent: 0 });
        gsap.to(strips, {
          yPercent: (_, s: HTMLElement) => -Number(s.dataset.digit) * 10,
          duration: 1.6,
          ease: "power3.out",
          stagger: { each: 0.12, from: "end" },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>(".run-card");
      cards.forEach((card, i) => {
        const steps = card.querySelectorAll<HTMLElement>(".run-step");
        const status = card.querySelector<HTMLElement>(".run-status");
        const bar = card.querySelector<HTMLElement>(".run-bar");
        const stamp = card.querySelector<HTMLElement>(".run-stamp");
        const setStatus = (label: string, tone: string) => {
          if (!status) return;
          status.textContent = label;
          status.className = `run-status shrink-0 px-2.5 py-1 rounded-md ${tone}`;
        };

        steps.forEach((s) => (s.dataset.state = "pending"));
        setStatus("QUEUED", "bg-line text-faint");
        gsap.set(bar, { scaleX: 0 });
        const summary = card.querySelector<HTMLElement>(".run-summary");
        gsap.set(stamp, { autoAlpha: 0, scale: 2.4 });
        gsap.set(summary, { autoAlpha: 0 });

        const tl = gsap.timeline({
          paused: true,
          onStart: () => setStatus("RUNNING", "bg-steel/15 text-steel"),
        });
        steps.forEach((s, k) => {
          tl.call(() => (s.dataset.state = "running"));
          tl.to(bar, { scaleX: (k + 0.5) / steps.length, duration: 0.42, ease: "none" });
          tl.call(() => (s.dataset.state = "passed"));
        });
        tl.to(bar, { scaleX: 1, duration: 0.15 });
        tl.call(() => setStatus("PASSED", "bg-pass/15 text-pass"));
        tl.to(summary, { autoAlpha: 1, duration: 0.3 }, "<");
        tl.to(stamp, { autoAlpha: 0.85, scale: 1, duration: 0.45, ease: "back.out(2.5)" });

        ScrollTrigger.create({ trigger: card, start: "top 72%", once: true, onEnter: () => tl.play() });

        // On desktop the cards stick and stack; the one underneath sinks back as the next lands on it.
        const next = cards[i + 1];
        if (next && window.matchMedia("(min-width: 1024px)").matches) {
          gsap.to(card.firstElementChild, {
            scale: 0.93,
            filter: "brightness(0.6)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 25%", scrub: true },
          });
        }
      });
    });

    return () => mm.revert();
  });

  return null;
}
