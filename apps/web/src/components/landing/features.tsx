import { IconGitBranch, IconLayers, IconShield } from "./icons";

const features = [
  {
    icon: IconLayers,
    title: "Monorepo Architecture",
    description:
      "Shared packages, unified tooling, and Turborepo pipelines keep R&D and product code in sync across apps.",
  },
  {
    icon: IconGitBranch,
    title: "Continuous Deployment",
    description:
      "Push to main and deploy Web and Worker services automatically on Railway with zero-downtime rollouts.",
  },
  {
    icon: IconShield,
    title: "Secure by Default",
    description:
      "Better Auth with GitHub OAuth, Prisma-backed sessions, and environment-scoped secrets for every service.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/10 bg-[var(--surface-deep)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="pill-badge mb-4">Capabilities</span>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Everything your team needs to move forward
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass-card flex flex-col gap-6 p-8"
            >
              <feature.icon className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
