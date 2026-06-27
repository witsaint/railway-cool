"use client";

import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export function PillButton({
  href,
  children,
  variant = "primary",
  className = "",
}: PillButtonProps) {
  const router = useRouter();
  const styles =
    variant === "primary" ? "pill-cta" : "pill-cta-outline";

  return (
    <Button
      onPress={() => router.push(href)}
      className={`${styles} ${className}`}
    >
      {children}
    </Button>
  );
}
