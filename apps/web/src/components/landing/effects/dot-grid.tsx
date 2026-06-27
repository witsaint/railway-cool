"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type DotGridProps = {
  className?: string;
  dotSize?: number;
  gap?: number;
  accentOpacity?: number;
};

export function HeroDotGrid({
  className,
  dotSize = 1.2,
  gap = 28,
  accentOpacity = 0.35,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gap;
          const y = row * gap;
          const wave =
            Math.sin(col * 0.35 + t * 0.0008) * Math.cos(row * 0.28 + t * 0.0006);
          const alpha = 0.08 + (wave + 1) * 0.5 * accentOpacity;
          const isAccent = wave > 0.55;

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = isAccent
            ? `rgba(34, 211, 238, ${alpha})`
            : `rgba(161, 161, 170, ${alpha * 0.45})`;
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [accentOpacity, dotSize, gap, reduce]);

  if (reduce) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: `${gap}px ${gap}px`,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "h-full w-full"}
    />
  );
}
