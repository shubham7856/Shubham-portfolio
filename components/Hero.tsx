"use client";

import { useState, useEffect } from "react";

const roles = ["QA Automation Engineer", "DevOps Engineer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-3xl mx-auto">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Portfolio
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Shubham Sinha
        </h1>

        <div className="h-10 flex items-center justify-center mb-6">
          <span
            className="text-xl sm:text-2xl text-blue-400 font-medium transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {roles[roleIndex]}
          </span>
        </div>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          I build CI/CD pipelines{" "}
          <span className="text-white font-semibold">and</span> write automated
          tests inside them — most DevOps candidates can only do one.
        </p>

        <p className="text-slate-500 text-sm mb-10">
          Based in India · Open to DevOps / Platform / Cloud roles
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600">
        <span className="text-xs">scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
