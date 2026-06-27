"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const navLinks = [
  { href: "#features", label: "功能" },
  { href: "#use-cases", label: "场景" },
  { href: "#pricing", label: "方案" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl backdrop-saturate-150">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-50 transition-colors hover:text-white"
        >
          Railway
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/login"
            className="inline-flex h-10 items-center rounded-xl bg-cyan-400 px-5 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98] hover:bg-cyan-300"
          >
            Sign in
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-100 lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={20} weight="bold" aria-hidden />
          ) : (
            <List size={20} weight="bold" aria-hidden />
          )}
        </button>
      </nav>

      {menuOpen ? (
        <div className="glass-panel mx-4 mb-4 rounded-2xl p-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/login"
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-cyan-400 text-sm font-medium text-zinc-950"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
