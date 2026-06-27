import Link from "next/link";
import { IconCheck } from "./icons";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For individual developers exploring the platform.",
    features: [
      "1 Web service",
      "GitHub OAuth auth",
      "Community support",
      "Basic health monitoring",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For growing R&D and product teams.",
    features: [
      "Web + Worker services",
      "Shared monorepo packages",
      "PostgreSQL on Railway",
      "Priority support",
      "Custom domains",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced requirements.",
    features: [
      "Unlimited services",
      "Dedicated infrastructure",
      "SSO & audit logs",
      "SLA guarantee",
      "Onboarding assistance",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-[var(--light-grey-border)] bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--dark-grey-text)]">
            Pricing
          </p>
          <h2 className="font-serif text-3xl font-medium text-black md:text-4xl">
            Simple plans for every stage
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`card-minimal relative flex flex-col gap-6 p-8 ${
                tier.highlighted
                  ? "border-2 border-[var(--navy-accent)] shadow-none"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--navy-accent)] px-4 py-1 text-xs uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="font-serif text-xl font-medium text-black">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--dark-grey-text)]">
                  {tier.description}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl font-medium text-black">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-[var(--dark-grey-text)]">
                    {tier.period}
                  </span>
                )}
              </div>
              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[var(--dark-grey-text)]"
                  >
                    <IconCheck className="mt-0.5 shrink-0 text-[var(--green-accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={`inline-flex justify-center px-6 py-3 text-sm tracking-wide transition-all cursor-pointer ${
                  tier.highlighted
                    ? "border border-black bg-black text-white hover:bg-white hover:text-black"
                    : "border border-black bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
