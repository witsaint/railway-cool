"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
      <div
        data-parallax
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.07] blur-[100px]" />
        <div className="absolute -right-24 top-1/3 h-[360px] w-[360px] rounded-full bg-violet-500/[0.08] blur-[90px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p
            data-reveal-single
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-zinc-400"
          >
            <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            研发与产品 · 统一交付平台
          </p>

          <h1
            data-reveal-single
            className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]"
            style={{ letterSpacing: "-0.03em" }}
          >
            为研发与产品打造的
            <span className="block text-cyan-200">统一平台</span>
          </h1>

          <p
            data-reveal-single
            className="mt-6 max-w-[65ch] text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            基于 Monorepo 与 Railway 的一体化内部工具链。从代码提交到服务部署、认证鉴权到可观测性，让研发团队与产品团队在同一套工作流中协作。
          </p>

          <div
            data-reveal-single
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              variant="primary"
              className="h-11 gap-2 border border-cyan-400/25 bg-cyan-500/15 px-6 text-cyan-50 shadow-[0_0_32px_-8px_rgba(34,211,238,0.45)] transition-all hover:border-cyan-300/40 hover:bg-cyan-500/25"
              onPress={() => router.push("/login")}
            >
              <GithubLogo size={18} weight="fill" />
              GitHub 登录
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="ghost"
              className="h-11 border border-white/[0.08] text-zinc-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
              onPress={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              探索能力模块
            </Button>
          </div>
        </div>

        <div
          data-reveal-single
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0f1c]/80 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-4">
              <span className="size-2 rounded-full bg-red-400/80" />
              <span className="size-2 rounded-full bg-amber-400/80" />
              <span className="size-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-xs text-zinc-500">railway deploy --watch</span>
            </div>
            <div className="space-y-3 font-mono text-xs leading-relaxed text-zinc-400">
              <p>
                <span className="text-cyan-400">✓</span> apps/web · Next.js 16 · HeroUI 3
              </p>
              <p>
                <span className="text-cyan-400">✓</span> packages/ui · 共享组件库
              </p>
              <p>
                <span className="text-violet-400">→</span> auth · Better Auth + GitHub OAuth
              </p>
              <p>
                <span className="text-violet-400">→</span> db · Prisma + PostgreSQL
              </p>
              <p className="text-zinc-500">Building production bundle...</p>
              <p className="text-emerald-400/90">Deployed to Railway · 1.2s</p>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}
