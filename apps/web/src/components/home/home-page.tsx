"use client";

import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import { FeatureCards } from "./feature-cards";
import { HeroSection } from "./hero-section";
import { SiteHeader } from "./site-header";

export function HomePage() {
  const scopeRef = useGsapScroll();

  return (
    <div ref={scopeRef} className="relative min-h-[100dvh] text-zinc-100">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeatureCards />

        <section
          id="platform"
          className="border-t border-white/[0.06] py-20 lg:py-24"
        >
          <div
            data-reveal-single
            className="mx-auto max-w-7xl px-6 text-center lg:px-8"
          >
            <p className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-zinc-500">
              Monorepo · pnpm · Turbo · Next.js App Router · HeroUI · Railway
            </p>
            <p className="mt-3 text-xs text-zinc-600">
              内部研发与产品协作平台 · {new Date().getFullYear()}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
