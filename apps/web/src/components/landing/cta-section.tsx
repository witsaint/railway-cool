import Link from "next/link";

export function CtaSection() {
  return (
    <section className="border-t border-white/10 bg-[var(--surface-dark)] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Ready to build your next platform?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
          Join R&D and product teams shipping faster with a unified monorepo,
          secure auth, and one-click Railway deployment.
        </p>
        <div className="mt-10">
          <Link href="/login" className="pill-cta">
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}
