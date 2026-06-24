"use client";

import { Button, Card } from "@heroui/react";
import type { ReactNode } from "react";

export { Button, Card };

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Card className="p-6">{children}</Card>
    </main>
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="primary" {...props}>
      {children}
    </Button>
  );
}
