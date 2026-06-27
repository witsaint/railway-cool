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
      className="border-t border-[var(--light-grey-border)] bg-[var(--beige-accent)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--dark-grey-text)]">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl font-medium text-black md:text-4xl">
            Trusted by teams who ship
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <blockquote
              key={item.name}
              className={`card-minimal zoom-hover flex flex-col gap-6 p-8 ${
                index === 1 ? "border-[var(--navy-accent)]" : ""
              }`}
            >
              <p className="font-serif text-lg italic leading-relaxed text-black">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-black">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-[var(--dark-grey-text)]">
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
