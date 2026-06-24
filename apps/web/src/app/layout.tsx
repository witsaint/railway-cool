import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Railway Monorepo",
  description: "Next.js + Better Auth + Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
