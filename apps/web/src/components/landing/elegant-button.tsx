"use client";

import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";

type ElegantButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export function ElegantButton({
  href,
  children,
  variant = "primary",
  className = "",
}: ElegantButtonProps) {
  const router = useRouter();
  const base =
    "rounded-none px-8 py-3 text-sm tracking-wide transition-all cursor-pointer";
  const styles =
    variant === "primary"
      ? "border border-black bg-black text-white hover:bg-white hover:text-black"
      : "border border-black bg-white text-black hover:bg-black hover:text-white";

  return (
    <Button
      onPress={() => router.push(href)}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Button>
  );
}
