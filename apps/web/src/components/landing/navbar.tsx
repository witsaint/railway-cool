"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-transparent fixed top-0 z-50 w-full">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white transition-all cursor-pointer"
        >
          Railway
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--text-muted)] transition-all cursor-pointer hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/login" className="pill-cta px-6 py-2 text-sm">
            Sign In
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden transition-all cursor-pointer"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-4 bg-white" />
        </button>
      </nav>

      {menuOpen && (
        <div className="glass-card mx-4 mb-4 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] transition-all cursor-pointer hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="pill-cta inline-flex px-6 py-2 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
