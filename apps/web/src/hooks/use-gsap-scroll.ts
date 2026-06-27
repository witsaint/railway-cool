"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealOptions = {
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
};

export function useGsapScroll() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      scope.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const heroParallax = scope.querySelector("[data-parallax]");
      if (heroParallax) {
        gsap.to(heroParallax, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroParallax,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      scope.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      scope.querySelectorAll<HTMLElement>("[data-reveal-single]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return scopeRef;
}

export function revealClassName(visible = false) {
  return visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
}

export type { ScrollRevealOptions };
