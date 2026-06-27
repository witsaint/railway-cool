"use client";

import { Card } from "@heroui/react";
import type { ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  accent?: "cyan" | "violet" | "neutral";
};

const accentRing: Record<NonNullable<GlowCardProps["accent"]>, string> = {
  cyan: "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_40px_-8px_rgba(34,211,238,0.25)]",
  violet:
    "hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_40px_-8px_rgba(167,139,250,0.22)]",
  neutral:
    "hover:shadow-[0_0_0_1px_rgba(148,163,184,0.25),0_0_32px_-10px_rgba(148,163,184,0.15)]",
};

export function GlowCard({
  children,
  className = "",
  accent = "neutral",
}: GlowCardProps) {
  return (
    <Card
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/[0.06]",
        "bg-[linear-gradient(145deg,rgba(15,23,42,0.92)_0%,rgba(3,7,18,0.96)_100%)]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-white/[0.12]",
        accentRing[accent],
        className,
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x,50%) var(--mouse-y,0%), rgba(34,211,238,0.06), transparent 40%)",
        }}
      />
      {children}
    </Card>
  );
}
