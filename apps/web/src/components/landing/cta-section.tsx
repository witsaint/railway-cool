import { ElegantButton } from "./elegant-button";

export function CtaSection() {
  return (
    <section className="border-t border-[var(--light-grey-border)] bg-[var(--beige-accent)] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
        <h2 className="font-serif text-3xl font-medium text-black md:text-4xl">
          Ready to build your next platform?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--dark-grey-text)]">
          Join R&D and product teams shipping faster with a unified monorepo,
          secure auth, and one-click Railway deployment.
        </p>
        <div className="mt-10">
          <ElegantButton href="/login">Get Started Free</ElegantButton>
        </div>
      </div>
    </section>
  );
}
