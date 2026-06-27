import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Railway — R&D & Product Platform",
    template: "%s | Railway",
  },
  description:
    "A unified monorepo platform for research and product teams. Deploy services, manage auth, and iterate fast on Railway.",
  keywords: [
    "monorepo",
    "Railway",
    "Next.js",
    "R&D platform",
    "product development",
    "Better Auth",
    "Prisma",
    "fintech",
  ],
  authors: [{ name: "Railway Platform" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Railway Platform",
    title: "Railway — R&D & Product Platform",
    description:
      "Build with clarity. Ship with confidence. A unified monorepo platform for research and product teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Railway — R&D & Product Platform",
    description:
      "Build with clarity. Ship with confidence. A unified monorepo platform for research and product teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
