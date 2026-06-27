"use client";

import Image from "next/image";
import { RevealStagger, RevealItem } from "./reveal";

const logos = [
  { name: "GitHub", slug: "github", href: "https://github.com" },
  { name: "Vercel", slug: "vercel", href: "https://vercel.com" },
  { name: "Stripe", slug: "stripe", href: "https://stripe.com" },
  { name: "Docker", slug: "docker", href: "https://docker.com" },
  { name: "PostgreSQL", slug: "postgresql", href: "https://postgresql.org" },
  { name: "Prisma", slug: "prisma", href: "https://prisma.io" },
];

export function LogoWall() {
  return (
    <section
      aria-label="Trusted by engineering teams"
      className="border-y border-white/5 py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm text-zinc-500">
          Used by teams building on modern stacks
        </p>
        <RevealStagger className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <RevealItem key={logo.slug} className="flex justify-center">
              <a
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="opacity-50 transition-opacity hover:opacity-100"
                aria-label={logo.name}
              >
                <Image
                  src={`https://cdn.simpleicons.org/${logo.slug}/a1a1aa`}
                  alt=""
                  width={96}
                  height={28}
                  className="h-7 w-auto"
                  unoptimized
                />
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
