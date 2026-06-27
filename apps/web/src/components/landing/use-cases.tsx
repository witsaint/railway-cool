"use client";

import Image from "next/image";
import { Flask, RocketLaunch, UsersThree } from "@phosphor-icons/react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const useCases = [
  {
    title: "研发快速验证",
    description:
      "在本地 Sandbox 中跑 Agent 与 Worker，无需搭建完整生产 infra，迭代周期以小时计。",
    icon: Flask,
    imageSeed: "rd-sandbox-prototype",
  },
  {
    title: "产品原型协作",
    description:
      "Web 与 Worker 共享 packages/db，产品同学可直接体验 Agent 编排后的端到端流程。",
    icon: UsersThree,
    imageSeed: "product-agent-collab",
  },
  {
    title: "生产一键发布",
    description:
      "Push 到 main 触发 Railway 部署，Web 健康检查与 Worker 轮询任务同步上线。",
    icon: RocketLaunch,
    imageSeed: "railway-deploy-pipeline",
  },
];

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="border-t border-white/5 bg-zinc-950/50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            典型使用场景
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            从本地 sandbox 试跑到 Railway 生产环境，覆盖研发与产品的完整交付链路。
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 md:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem
                key={item.title}
                className="glass-panel group overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${item.imageSeed}/640/400`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-300">
                    <Icon size={18} weight="duotone" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
