"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { evidence, profile, projects, skills, testRun } from "@/lib/content";

type Line = { kind: "cmd" | "out" | "ok" | "err" | "dim"; text: string };

const HELP: Line[] = [
  { kind: "out", text: "available commands:" },
  { kind: "dim", text: "  whoami     who is this" },
  { kind: "dim", text: "  projects   client work, one line each" },
  { kind: "dim", text: "  skills     what I work with" },
  { kind: "dim", text: "  stats      the measured numbers" },
  { kind: "dim", text: "  hunt       about the bugs on this page" },
  { kind: "dim", text: "  resume     open the resume PDF" },
  { kind: "dim", text: "  contact    how to reach me" },
  { kind: "dim", text: "  clear      clear the screen" },
];

function run(input: string): Line[] | "clear" {
  const cmd = input.trim().toLowerCase();
  switch (cmd) {
    case "":
      return [];
    case "help":
    case "ls":
      return HELP;
    case "whoami":
      return [{ kind: "out", text: `${profile.name}, ${profile.title} at ${profile.company}, ${profile.location}.` }];
    case "projects":
      return projects.map((p, i) => ({ kind: "out", text: `${String(i + 1).padStart(2, "0")}  ${p.name}: ${p.context}` }));
    case "skills":
      return skills.map((s) => ({ kind: "out", text: `${s.group.padEnd(16)} ${s.items.join(", ")}` }));
    case "stats":
      return evidence.map((e) => ({ kind: "ok", text: `✓ ${e.value}  ${e.label}` }));
    case "hunt":
      return [{ kind: "out", text: "There are bugs crawling around up here. Click them. QA reflexes required." }];
    case "resume":
      window.open("/resume.pdf", "_blank", "noopener");
      return [{ kind: "ok", text: "opening resume.pdf ..." }];
    case "contact":
      return [
        { kind: "out", text: `email     ${profile.email}` },
        { kind: "out", text: `linkedin  ${profile.linkedin.replace("https://www.", "")}` },
        { kind: "out", text: `github    ${profile.github.replace("https://", "")}` },
      ];
    case "sudo hire-me":
    case "hire":
    case "hire-me":
      return [
        { kind: "ok", text: "permission granted." },
        { kind: "out", text: `next step: ${profile.email}` },
      ];
    case "rm -rf bugs":
    case "sudo rm -rf bugs":
      return [{ kind: "err", text: "nice try. bugs get fixed with tests, not rm." }];
    case "clear":
      return "clear";
    default:
      return [{ kind: "err", text: `command not found: ${cmd}. try 'help'` }];
  }
}

const COLORS: Record<Line["kind"], string> = {
  cmd: "text-ink",
  out: "text-muted",
  ok: "text-pass",
  err: "text-[#e48a7a]",
  dim: "text-faint",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // Boot sequence: the run prints itself line by line, then hands over the prompt.
  useEffect(() => {
    const boot: Line[] = [
      { kind: "cmd", text: "$ npx run-portfolio" },
      ...testRun.map((t) => ({ kind: "ok" as const, text: `✓ ${t.suite.padEnd(10)} ${t.check}` })),
      { kind: "out", text: `${testRun.length} passed, 0 failed` },
      { kind: "dim", text: "type 'help' and press enter" },
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(boot);
      setReady(true);
      return;
    }
    const timers = boot.map((line, i) =>
      window.setTimeout(() => {
        setLines((l) => [...l, line]);
        if (i === boot.length - 1) setReady(true);
      }, 500 + i * 230),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = run(value);
    if (value.trim()) history.current.push(value);
    cursor.current = history.current.length;
    setLines((l) => (result === "clear" ? [] : [...l, { kind: "cmd", text: `$ ${value}` }, ...result]));
    setValue("");
  };

  const recall = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const h = history.current;
    cursor.current = Math.max(0, Math.min(h.length, cursor.current + (e.key === "ArrowUp" ? -1 : 1)));
    setValue(h[cursor.current] ?? "");
  };

  return (
    <div
      data-no-hunt
      onClick={() => input.current?.focus({ preventScroll: true })}
      className="relative rounded-2xl bg-bg-deep/90 backdrop-blur-md border border-line font-mono text-[13px] leading-relaxed shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] overflow-hidden cursor-text"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#e48a7a]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-pass/70" />
        <span className="ml-3 text-faint text-xs">guest@shubham: ~</span>
      </div>
      <div ref={scroller} data-lenis-prevent className="h-[19rem] overflow-y-auto px-4 py-4" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap ${COLORS[l.kind]}`}>
            {l.text}
          </p>
        ))}
        {ready && (
          <form onSubmit={submit} className="flex gap-2 mt-1">
            <label htmlFor="term-input" className="text-accent shrink-0">
              $
            </label>
            <input
              id="term-input"
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={recall}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command. Type help for the list."
              className="flex-1 bg-transparent outline-none text-ink caret-accent"
            />
          </form>
        )}
      </div>
    </div>
  );
}
