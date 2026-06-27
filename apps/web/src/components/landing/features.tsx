"use client";

import Image from "next/image";
import {
  GitBranch,
  Package,
  RocketLaunch,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const features = [
  {
    title: "Monorepo pipelines",
    description:
      "Shared packages, Turborepo tasks, and typed boundaries keep R&D and product code aligned.",
    icon: Package,
    span: "lg:col-span-7 lg:row-span-2",
    visual: "image" as const,
    imageSeed: "railway-monorepo-build",
  },
  {
    title: "Git-native deploys",
    description:
      "Push to main and roll out Web plus Worker services on Railway without manual release steps.",
    icon: GitBranch,
    span: "lg:col-span-5",
    visual: "glass" as const,
  },
  {
    title: "Secure sessions",
    description:
      "Better Auth with GitHub OAuth, Prisma-backed sessions, and scoped environment secrets.",
    icon: ShieldCheck,
    span: "lg:col-span-5",
    visual: "accent" as const,
  },
  {
    title: "Worker-ready runtime",
    description:
      "Background jobs and polling workers share the same packages, database, and deployment flow.",
    icon: RocketLaunch,
    span: "lg:col-span-12",
    visual: "strip" as const,
    imageSeed: "railway-worker-runtime",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Built for platform teams, not slide decks
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Everything you need to run an internal monorepo platform with
            clear ownership between research and product.
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
                      alt="Engineers reviewing deployment pipelines"
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
                      alt="Server racks in a data center"
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
