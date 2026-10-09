"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 1 });

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element).closest("a, button, [data-tilt]");
      gsap.to(ring.current, { scale: target ? 1.9 : 1, duration: 0.3, ease: "power3" });
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);

    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.35);
        y((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const onLeave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      gsap.set(el, { transformPerspective: 1000 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      cleanups.forEach((c) => c());
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
