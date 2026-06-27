import Link from "next/link";
import { IconGitHub, IconLinkedIn, IconTwitter } from "./icons";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/login", label: "Sign In" },
  { href: "/dashboard", label: "Dashboard" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "mailto:contact@railway.dev", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-xl font-semibold text-white transition-all cursor-pointer"
            >
              Railway
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              Unified platform for R&D and product teams to build, deploy, and
              iterate at scale.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/witsaint/railway-cool"
                aria-label="GitHub"
                className="text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
              >
                <IconGitHub />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
              >
                <IconTwitter />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
              >
                <IconLinkedIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white">
              Product
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white">
              Connect
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:contact@railway.dev"
                  className="text-sm text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--text-secondary)] transition-all cursor-pointer hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-sm text-[var(--text-secondary)]">
            &copy; 2026 Railway Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
