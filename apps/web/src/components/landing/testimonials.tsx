const testimonials = [
  {
    quote:
      "We went from scattered repos to a single deployable platform in weeks. The monorepo structure finally matches how our teams actually work.",
    name: "Sarah Chen",
    role: "Engineering Lead, Product",
  },
  {
    quote:
      "Railway deployment with Prisma and Better Auth out of the box saved us months of infrastructure work. We focus on features, not plumbing.",
    name: "Marcus Webb",
    role: "R&D Platform Architect",
  },
  {
    quote:
      "The clean separation between Web and Worker services, with shared packages, is exactly what we needed for our research pipelines.",
    name: "Elena Rodriguez",
    role: "Director of Product Engineering",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-white/10 bg-[var(--bg-primary)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="pill-badge mb-4">Testimonials</span>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Trusted by teams who ship
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="glass-card flex flex-col gap-6 p-8"
            >
              <p className="text-base leading-relaxed text-white">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-white">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--text-secondary)]">
                    {item.role}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
