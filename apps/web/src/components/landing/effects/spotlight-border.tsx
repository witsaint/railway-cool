"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

type SpotlightBorderProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightBorder({ children, className }: SpotlightBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const reduce = useReducedMotion();

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.22), transparent 42%)`;
  const borderGlow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.55), transparent 50%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`group relative rounded-2xl p-[1px] ${className ?? ""}`}
    >
      {!reduce ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: borderGlow }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[1px] rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
        </>
      ) : null}
      <div className="relative rounded-[15px] ring-1 ring-white/10">{children}</div>
    </div>
  );
}
