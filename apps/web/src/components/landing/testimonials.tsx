"use client";

import Image from "next/image";
import { Reveal, RevealItem, RevealStagger } from "./reveal";

const featured = {
  quote:
    "We replaced four repos and a brittle deploy script with one monorepo. Product and R&D finally share the same release train.",
  name: "Priya Nair",
  role: "Director of Platform Engineering",
  company: "Northline Labs",
  avatarSeed: "priya-nair-platform",
};

const supporting = [
  {
    quote:
      "Better Auth and Prisma were wired correctly on day one. We stopped rebuilding login for every prototype.",
    name: "Tomás Herrera",
    role: "Staff Engineer, R&D",
    avatarSeed: "tomas-herrera-rd",
  },
  {
    quote:
      "Splitting Web and Worker services while sharing packages is exactly how our research pipelines need to run.",
    name: "Mei-Lin Zhou",
    role: "Product Engineering Lead",
    avatarSeed: "meilin-zhou-product",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-white/5 bg-zinc-950/50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Teams that ship internal platforms
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="glass-panel rounded-2xl p-8 lg:col-span-7 lg:p-10">
            <blockquote>
              <p className="text-xl leading-relaxed text-zinc-100 md:text-2xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <Image
                  src={`https://picsum.photos/seed/${featured.avatarSeed}/96/96`}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-zinc-100">
                    {featured.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-zinc-500">
                    {featured.role}, {featured.company}
                  </span>
                </cite>
              </footer>
            </blockquote>
          </Reveal>

          <RevealStagger className="grid gap-4 lg:col-span-5">
            {supporting.map((item) => (
              <RevealItem
                key={item.name}
                className="glass-panel rounded-2xl p-6"
              >
                <blockquote>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-5 flex items-center gap-3">
                    <Image
                      src={`https://picsum.photos/seed/${item.avatarSeed}/80/80`}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <cite className="not-italic">
                      <span className="block text-sm font-medium text-zinc-100">
                        {item.name}
                      </span>
                      <span className="block text-xs text-zinc-500">
                        {item.role}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
