import Link from "next/link";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:px-8 md:py-32">
      <div className="flex flex-col gap-8">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--dark-grey-text)]">
          R&D & Product Platform
        </p>
        <h1 className="font-serif text-4xl font-medium leading-tight text-black md:text-5xl lg:text-[3.5rem]">
          Build with clarity.
          <br />
          Ship with confidence.
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-[var(--dark-grey-text)]">
          A unified monorepo platform for research and product teams — deploy
          services, manage auth, and iterate fast on Railway.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/login"
            className="inline-flex items-center border border-black bg-black px-8 py-3 text-sm tracking-wide text-white transition-all cursor-pointer hover:bg-white hover:text-black"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="inline-flex items-center border border-black bg-white px-8 py-3 text-sm tracking-wide text-black transition-all cursor-pointer hover:bg-black hover:text-white"
          >
            Explore Features
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
