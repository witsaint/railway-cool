"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="border-t border-white/5 py-20 lg:py-24">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-10 lg:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_65%)]"
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
              Ready to unify your stack?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
              Sign in with GitHub and deploy your first web and worker services
              from the same monorepo today.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-cyan-400 px-6 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98] hover:bg-cyan-300"
            >
              Sign in
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
