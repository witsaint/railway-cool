"use client";

import {
  ChartLineUp,
  LockKey,
  RocketLaunch,
  Stack,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { GlowCard } from "./glow-card";

type Feature = {
  title: string;
  description: string;
  icon: Icon;
  accent: "cyan" | "violet" | "neutral";
};

const features: Feature[] = [
  {
    title: "快速部署",
    description:
      "Turbo 构建流水线与 Railway 一键发布，从 PR 合并到生产环境，分钟级完成交付。",
    icon: RocketLaunch,
    accent: "cyan",
  },
  {
    title: "一体化服务",
    description:
      "Web、Worker、共享包与数据库 schema 在同一 Monorepo 中演进，减少跨仓库协调成本。",
    icon: Stack,
    accent: "violet",
  },
  {
    title: "安全认证",
    description:
      "Better Auth 集成 GitHub OAuth，会话管理与路由保护开箱即用，满足内部工具安全基线。",
    icon: LockKey,
    accent: "neutral",
  },
  {
    title: "可观测性",
    description:
      "健康检查端点、结构化日志与部署状态追踪，让研发与产品团队共享同一套运行视图。",
    icon: ChartLineUp,
    accent: "cyan",
  },
];

const accentIcon: Record<Feature["accent"], string> = {
  cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  neutral: "text-zinc-300 bg-white/[0.04] border-white/[0.08]",
};

export function FeatureCards() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal-single className="mb-14 max-w-2xl">
          <h2
            className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            面向内部团队的
            <span className="text-zinc-400"> 核心能力</span>
          </h2>
          <p className="mt-4 max-w-[65ch] text-pretty leading-relaxed text-zinc-400">
            不是又一个模板化 SaaS 落地页。每一块能力都对应 Railway Monorepo 中的真实模块，为研发效率与产品迭代而设计。
          </p>
        </div>

        <div
          data-reveal-group
          className="grid gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} data-reveal>
                <GlowCard accent={feature.accent} className="h-full p-6 sm:p-7">
                  <div
                    className={`mb-5 inline-flex size-11 items-center justify-center rounded-xl border ${accentIcon[feature.accent]}`}
                  >
                    <IconComponent size={22} weight="duotone" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </GlowCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
