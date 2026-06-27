"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { HeroDotGrid } from "./effects/dot-grid";
import { SpotlightBorder } from "./effects/spotlight-border";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-20 lg:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <HeroDotGrid className="h-full w-full opacity-80" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(34,211,238,0.08),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:pb-20">
        <Reveal className="max-w-xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/90">
            个人 Agent 平台
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl lg:leading-[1.05]">
            本地 Sandbox，云端一键部署
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
            Monorepo 全栈底座：Next.js Web、Worker、Prisma、Better Auth。
            本地 <span className="font-mono text-zinc-300">.env.local</span>{" "}
            开发，Railway 生产部署。
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
              查看功能
            </a>
          </div>
        </Reveal>

        <Reveal className="relative lg:justify-self-end" delay={0.08}>
          <SpotlightBorder>
            <div className="glass-panel overflow-hidden rounded-[14px] p-1.5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-[5/4] lg:aspect-[4/5] lg:max-w-md lg:justify-self-end">
                <Image
                  src="https://picsum.photos/seed/agent-sandbox-lab/900/1120"
                  alt="研发人员在本地 sandbox 环境中调试 Agent 工作流"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent"
                />
              </div>
            </div>
          </SpotlightBorder>
        </Reveal>
      </div>
    </section>
  );
}
