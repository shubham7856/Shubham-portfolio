"use client";

import { useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-line">
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-ink tracking-tight">
          Shubham Sinha
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted hover:text-ink transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full bg-ink text-bg hover:opacity-85 transition-opacity duration-200"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-muted hover:text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line px-4 py-4 flex flex-col gap-4 bg-bg">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-muted hover:text-ink" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-ink font-medium">
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
