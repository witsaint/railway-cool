import Link from "next/link";
import { HeroVideoBackground } from "./hero-video-background";
import {
  IconBarChart,
  IconLock,
  IconRocket,
  IconZap,
} from "./icons";

const heroFeatures = [
  { icon: IconZap, label: "Instant Deploy" },
  { icon: IconLock, label: "Secure Auth" },
  { icon: IconBarChart, label: "Real-time Metrics" },
  { icon: IconRocket, label: "Scale Fast" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <HeroVideoBackground />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-48 pt-32 md:px-8 md:pb-56">
        <span className="pill-badge mb-8 w-fit">Premium Platform</span>

        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          Build wealth in
          <br />
          infrastructure.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
          A unified monorepo platform for research and product teams — deploy
          services, manage auth, and iterate fast on Railway.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/login" className="pill-cta">
            Get Started
          </Link>
          <a href="#features" className="pill-cta-outline">
            Explore Features
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 mx-auto max-w-6xl px-6 md:px-8">
        <div className="glass-card p-6 md:p-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {heroFeatures.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
