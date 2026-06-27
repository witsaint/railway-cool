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
    <header className="nav-discreet sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-wide text-black transition-all cursor-pointer"
        >
          Railway
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="inline-flex items-center border border-black bg-black px-6 py-2 text-sm tracking-wide text-white transition-all cursor-pointer hover:bg-white hover:text-black"
          >
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
          <span className="block h-px w-6 bg-black" />
          <span className="block h-px w-6 bg-black" />
          <span className="block h-px w-4 bg-black" />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[var(--light-grey-border)] px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm tracking-wide text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="inline-block border border-black bg-black px-6 py-2 text-sm tracking-wide text-white transition-all cursor-pointer hover:bg-white hover:text-black"
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
