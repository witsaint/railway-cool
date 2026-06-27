import Link from "next/link";
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

const productLinks = [
  { href: "#features", label: "功能" },
  { href: "#pricing", label: "方案" },
  { href: "/login", label: "Sign in" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "mailto:contact@railway.dev", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 pb-10 pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-zinc-50"
            >
              Railway
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              个人 Agent 编排与本地 Sandbox 能力的 monorepo 平台，面向研发与产品团队，从本地开发到 Railway 生产部署。
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com/witsaint/railway-cool"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-100"
              >
                <GithubLogo size={18} weight="fill" aria-hidden />
              </a>
              <a
                href="https://twitter.com"
                aria-label="X"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-100"
              >
                <XLogo size={18} weight="fill" aria-hidden />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-100"
              >
                <LinkedinLogo size={18} weight="fill" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-200">Product</h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-200">Legal</h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-600">
          &copy; 2026 Railway Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
