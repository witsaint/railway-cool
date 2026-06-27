import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Features } from "./features";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { CtaSection } from "./cta-section";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
