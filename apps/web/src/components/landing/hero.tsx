"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-20 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(34,211,238,0.12),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:pb-20">
        <Reveal className="max-w-xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/90">
            R&amp;D platform
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl lg:leading-[1.05]">
            One monorepo for teams that ship
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
            Deploy web and worker services, shared packages, and auth from a
            single codebase built for product and research teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98] hover:bg-cyan-300"
            >
              Sign in
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <a
              href="#features"
              className="inline-flex h-11 items-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/20 hover:bg-white/10"
            >
              View features
            </a>
          </div>
        </Reveal>

        <Reveal className="relative lg:justify-self-end" delay={0.08}>
          <div className="glass-panel relative overflow-hidden rounded-2xl p-1.5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] sm:aspect-[5/4] lg:aspect-[4/5] lg:max-w-md lg:justify-self-end">
              <Image
                src="https://picsum.photos/seed/railway-platform-lab/900/1120"
                alt="Developers collaborating in a modern workspace"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
