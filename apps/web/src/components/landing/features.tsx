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
    <section id="features" className="border-t border-[var(--light-grey-border)] bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--dark-grey-text)]">
            Capabilities
          </p>
          <h2 className="font-serif text-3xl font-medium text-black md:text-4xl">
            Everything your team needs to move forward
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="card-minimal zoom-hover flex flex-col gap-6 p-8"
            >
              <feature.icon className="h-6 w-6 text-black" />
              <h3 className="font-serif text-xl font-medium text-black">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--dark-grey-text)]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
