"use client";

import Link from "next/link";
import { Check } from "@phosphor-icons/react";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For solo builders exploring the stack.",
    features: [
      "One web service",
      "GitHub OAuth",
      "Community support",
      "Health checks",
    ],
    highlighted: false,
    cta: "Use Starter",
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For R&D and product squads shipping weekly.",
    features: [
      "Web and worker services",
      "Shared monorepo packages",
      "PostgreSQL on Railway",
      "Priority support",
      "Custom domains",
    ],
    highlighted: true,
    cta: "Choose Team",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For orgs with compliance and scale needs.",
    features: [
      "Unlimited services",
      "Dedicated infrastructure",
      "SSO and audit logs",
      "SLA coverage",
      "Onboarding help",
    ],
    highlighted: false,
    cta: "Contact sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Plans that match how you grow
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Start free, add worker services when your team is ready, and scale
            with enterprise controls later.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <RevealItem
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-cyan-400/40 bg-zinc-900/80 shadow-[0_0_0_1px_rgba(34,211,238,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "glass-panel"
              }`}
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-3 py-1 text-xs font-medium text-zinc-950">
                  Most popular
                </span>
              ) : null}

              <div>
                <h3 className="text-lg font-semibold text-zinc-50">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{tier.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-zinc-50">
                  {tier.price}
                </span>
                {tier.period ? (
                  <span className="text-sm text-zinc-500">{tier.period}</span>
                ) : null}
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <Check
                      size={16}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-cyan-300"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-transform active:scale-[0.98] ${
                  tier.highlighted
                    ? "bg-cyan-400 text-zinc-950 hover:bg-cyan-300"
                    : "border border-white/10 bg-white/5 text-zinc-100 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {tier.cta}
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
