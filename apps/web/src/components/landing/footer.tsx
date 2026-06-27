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

const seoLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/api/health", label: "Status" },
  { href: "https://github.com/witsaint/railway-cool", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--light-grey-border)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-serif text-xl font-medium text-black transition-all cursor-pointer"
            >
              Railway
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--dark-grey-text)]">
              Unified platform for R&D and product teams to build, deploy, and
              iterate with elegance.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/witsaint/railway-cool"
                aria-label="GitHub"
                className="text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
              >
                <IconGitHub />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
              >
                <IconTwitter />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
              >
                <IconLinkedIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Product
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-black">
              Resources
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {seoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--dark-grey-text)] transition-all cursor-pointer hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--light-grey-border)] pt-8">
          <p className="text-sm text-[var(--dark-grey-text)]">
            &copy; 2026 Railway Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
