"use client";

import Image from "next/image";
import {
  Cube,
  GithubLogo,
  Package,
  Robot,
} from "@phosphor-icons/react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const features = [
  {
    title: "Agent 编排",
    description:
      "Personal agent 工作流与任务调度，统一上下文与工具调用，研发与产品共用同一套编排层。",
    icon: Robot,
    span: "lg:col-span-7 lg:row-span-2",
    visual: "image" as const,
    imageSeed: "agent-orchestration-flow",
  },
  {
    title: "本地 Sandbox",
    description:
      "隔离式本地开发环境，Docker PostgreSQL + .env.local，Agent 与 Worker 在沙箱中安全试跑。",
    icon: Cube,
    span: "lg:col-span-5",
    visual: "glass" as const,
  },
  {
    title: "Monorepo 部署",
    description:
      "Turborepo 任务链，Web 与 Worker 共享 packages/db，Railway 一键推送 main 分支上线。",
    icon: Package,
    span: "lg:col-span-5",
    visual: "accent" as const,
  },
  {
    title: "GitHub 登录",
    description:
      "Better Auth + GitHub OAuth，Prisma 持久化 session，生产与本地 OAuth App 分离配置。",
    icon: GithubLogo,
    span: "lg:col-span-12",
    visual: "strip" as const,
    imageSeed: "github-auth-platform",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            为研发与产品团队而生
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            个人 Agent 能力与本地 Sandbox 环境，打包进同一 monorepo 平台，从原型到生产路径清晰。
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {features.map((feature) => (
            <RevealItem
              key={feature.title}
              className={`glass-panel group overflow-hidden rounded-2xl ${feature.span}`}
            >
              {feature.visual === "image" ? (
                <div className="grid h-full lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-52 lg:min-h-full">
                    <Image
                      src={`https://picsum.photos/seed/${feature.imageSeed}/960/720`}
                      alt="Agent 编排工作流示意"
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-zinc-950/70 lg:bg-gradient-to-t"
                    />
                  </div>
                  <FeatureCopy feature={feature} padded />
                </div>
              ) : null}

              {feature.visual === "glass" ? (
                <FeatureCopy feature={feature} padded />
              ) : null}

              {feature.visual === "accent" ? (
                <div className="relative h-full overflow-hidden p-8">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_55%)]"
                  />
                  <FeatureCopy feature={feature} />
                </div>
              ) : null}

              {feature.visual === "strip" ? (
                <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px] lg:items-center lg:p-8">
                  <FeatureCopy feature={feature} />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={`https://picsum.photos/seed/${feature.imageSeed}/640/400`}
                      alt="GitHub OAuth 集成示意"
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function FeatureCopy({
  feature,
  padded = false,
}: {
  feature: (typeof features)[number];
  padded?: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div className={padded ? "flex h-full flex-col justify-end p-8" : ""}>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
        <Icon size={20} weight="duotone" aria-hidden />
      </div>
      <h3 className="text-xl font-semibold text-zinc-50">{feature.title}</h3>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-zinc-400">
        {feature.description}
      </p>
    </div>
  );
}
