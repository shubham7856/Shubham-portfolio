"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// One place for every scroll-driven effect, keyed off data attributes in the markup:
// data-split (heading words rise), data-reveal (block fades up), data-count (number counts up),
// #work-pin / #work-track (horizontal project scroll on desktop), #progress (top scroll bar).
export default function ScrollFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to("#progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.05,
              scrollTrigger: { trigger: el, start: "top 88%" },
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const raw = el.dataset.count ?? "";
        const target = Number(raw.replace(/[^\d]/g, ""));
        const suffix = raw.replace(/[\d,]/g, "");
        const state = { n: 0 };
        gsap.to(state, {
          n: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.round(state.n).toLocaleString("en-US") + suffix;
          },
        });
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const pin = document.querySelector<HTMLElement>("#work-pin");
      const track = document.querySelector<HTMLElement>("#work-track");
      if (!pin || !track) return;
      // The sideways row only exists while this animation runs; without it the CSS grid shows every card.
      pin.classList.add("is-horizontal");
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: "#work-pin",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
        },
      });
      return () => pin.classList.remove("is-horizontal");
    });

    return () => mm.revert();
  });

  return null;
}
