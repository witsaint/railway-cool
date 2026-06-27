import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { LogoWall } from "./logo-wall";
import { Features } from "./features";
import { UseCases } from "./use-cases";
import { Pricing } from "./pricing";
import { CtaSection } from "./cta-section";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="relative min-h-[100dvh] text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <LogoWall />
        <Features />
        <UseCases />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
