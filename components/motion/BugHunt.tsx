"use client";

import { useEffect, useRef } from "react";

type Bug = {
  x: number;
  y: number;
  angle: number;
  turn: number;
  speed: number;
  size: number;
  color: string;
  t: number;
  respawnAt: number;
};
type Splat = { x: number; y: number; life: number; color: string; parts: { dx: number; dy: number }[] };

const COLORS = ["#7fa7d9", "#d4b06a", "#a7b0be"];
const IGNORE = "a, button, input, form, [data-no-hunt]";

// Bugs crawl around the hero. Click (or tap) one to squash it; onCatch reports the running total.
export default function BugHunt({ onCatch }: { onCatch: (total: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCatchRef = useRef(onCatch);
  onCatchRef.current = onCatch;

  useEffect(() => {
    const canvas = canvasRef.current;
    const zone = canvas?.parentElement;
    if (!canvas || !zone) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const makeBug = (inside: boolean): Bug => {
      const size = rand(7, 11);
      let x = rand(40, w - 40);
      let y = rand(80, h - 40);
      let angle = rand(0, Math.PI * 2);
      if (!inside) {
        // Walk in from a random edge, pointed roughly at the middle.
        const edge = Math.floor(rand(0, 4));
        x = edge === 0 ? -20 : edge === 1 ? w + 20 : rand(0, w);
        y = edge === 2 ? -20 : edge === 3 ? h + 20 : rand(0, h);
        angle = Math.atan2(h / 2 - y, w / 2 - x) + rand(-0.5, 0.5);
      }
      return {
        x,
        y,
        angle,
        turn: 0,
        speed: reduce ? 0 : rand(28, 52),
        size,
        color: COLORS[Math.floor(rand(0, COLORS.length))],
        t: rand(0, 10),
        respawnAt: 0,
      };
    };

    const count = w < 640 ? 4 : 7;
    const bugs: Bug[] = Array.from({ length: count }, () => makeBug(true));
    const splats: Splat[] = [];
    const pointer = { x: -999, y: -999 };
    let caught = 0;

    const drawBug = (b: Bug) => {
      const s = b.size;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);
      ctx.strokeStyle = b.color;
      ctx.fillStyle = b.color;
      ctx.lineWidth = 1.3;
      ctx.lineCap = "round";

      const wiggle = Math.sin(b.t * 16) * 0.45;
      for (const side of [-1, 1]) {
        for (let i = -1; i <= 1; i++) {
          const phase = (i === 0 ? -wiggle : wiggle) * side;
          ctx.beginPath();
          ctx.moveTo(i * s * 0.42, side * s * 0.3);
          ctx.lineTo(i * s * 0.42 + phase * s * 0.6, side * s * 1.05);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.ellipse(-s * 0.1, 0, s * 0.8, s * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s * 0.8, 0, s * 0.32, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(10, 22, 40, 0.55)";
      ctx.beginPath();
      ctx.moveTo(-s * 0.85, 0);
      ctx.lineTo(s * 0.55, 0);
      ctx.stroke();

      ctx.strokeStyle = b.color;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(s * 1.0, side * s * 0.12);
        ctx.quadraticCurveTo(s * 1.4, side * s * 0.2, s * 1.6, side * s * 0.6);
        ctx.stroke();
      }
      ctx.restore();
    };

    const step = (b: Bug, dt: number, now: number) => {
      if (b.respawnAt) {
        if (now > b.respawnAt) Object.assign(b, makeBug(false));
        return;
      }
      if (reduce) return;
      b.t += dt;
      b.turn = Math.max(-2, Math.min(2, b.turn + rand(-1, 1) * dt * 6));
      b.angle += b.turn * dt;

      // Scuttle away from the crosshair when it gets close. Makes them worth chasing.
      const px = b.x - pointer.x;
      const py = b.y - pointer.y;
      const near = Math.hypot(px, py) < 110;
      if (near) {
        const away = Math.atan2(py, px);
        b.angle += Math.atan2(Math.sin(away - b.angle), Math.cos(away - b.angle)) * dt * 6;
      }

      // Steer back toward the middle when nearing an edge.
      const margin = 30;
      if (b.x < margin || b.x > w - margin || b.y < margin || b.y > h - margin) {
        const home = Math.atan2(h / 2 - b.y, w / 2 - b.x);
        b.angle += Math.atan2(Math.sin(home - b.angle), Math.cos(home - b.angle)) * dt * 3;
      }

      const speed = b.speed * (near ? 2.6 : 1);
      b.x += Math.cos(b.angle) * speed * dt;
      b.y += Math.sin(b.angle) * speed * dt;
    };

    const drawSplat = (sp: Splat) => {
      const k = 1 - sp.life;
      ctx.save();
      ctx.globalAlpha = Math.max(0, sp.life);
      ctx.fillStyle = sp.color;
      for (const p of sp.parts) {
        ctx.beginPath();
        ctx.arc(sp.x + p.dx * k * 26, sp.y + p.dy * k * 26, 2.2 * sp.life + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#6cc59b";
      ctx.font = "600 13px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText("+1 bug fixed", sp.x, sp.y - 14 - k * 30);
      ctx.restore();
    };

    const squash = (e: PointerEvent) => {
      if ((e.target as Element).closest(IGNORE)) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const hit = bugs.find((b) => !b.respawnAt && Math.hypot(b.x - x, b.y - y) < b.size * 2.4);
      if (!hit) return;
      splats.push({
        x: hit.x,
        y: hit.y,
        life: 1,
        color: hit.color,
        parts: Array.from({ length: 9 }, (_, i) => {
          const a = (i / 9) * Math.PI * 2 + rand(-0.3, 0.3);
          return { dx: Math.cos(a), dy: Math.sin(a) };
        }),
      });
      hit.respawnAt = performance.now() + 1400;
      caught += 1;
      onCatchRef.current(caught);
    };

    const track = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const leave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };
    zone.addEventListener("pointerdown", squash);
    zone.addEventListener("pointermove", track);
    zone.addEventListener("pointerleave", leave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const b of bugs) {
          step(b, dt, now);
          if (!b.respawnAt) drawBug(b);
        }
        for (let i = splats.length - 1; i >= 0; i--) {
          splats[i].life -= dt * 1.1;
          if (splats[i].life <= 0) splats.splice(i, 1);
          else drawSplat(splats[i]);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      zone.removeEventListener("pointerdown", squash);
      zone.removeEventListener("pointermove", track);
      zone.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
