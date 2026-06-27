# Design System — Dark Tech B2B Platform

**Style Name:** Dark Tech B2B Platform  
**Type:** B2B SaaS, Glass accents, Motion scroll-reveal, Premium dark  
**Keywords:** monorepo, platform, glassmorphism, dark mode, cyan accent, bento features  
**Era:** 2024–2026 Internal developer platforms  
**Light/Dark:** Dark only (locked page theme)

---

## Context

This design language applies to the **Railway monorepo platform** — an internal R&D and Product development platform. The aesthetic is:

- **Dark-tech B2B** with zinc surfaces and a single cyan accent
- **Asymmetric split hero** with real photography (not video fintech hero)
- **Glass panels** with backdrop blur, `border-white/10`, and inner highlight
- **Motion scroll-reveal** via `motion/react` (`whileInView`), honoring `prefers-reduced-motion`
- **Varied feature layouts** (bento grid, not three equal cards)

Landing page UI copy is **English**. Internal app surfaces (dashboard, login) may use Chinese where appropriate.

---

## Color Palette

### Primary

| Token | Value | Usage |
|-------|-------|-------|
| Surface | `#030712` / zinc-950 | Page background |
| Elevated | `#0a0f1c` | Section tints |
| Text primary | zinc-50 | Headlines |
| Text secondary | zinc-400 | Body copy |
| Text muted | zinc-500 | Captions, footer |

### Accent (single lock)

| Token | Value | Usage |
|-------|-------|-------|
| Cyan | `oklch(0.78 0.14 195)` / cyan-400 | Primary CTAs, icons, highlights |

No purple/violet gradients. No second accent color on marketing pages.

---

## CSS Variables

Define in `apps/web/src/app/globals.css`:

```css
--color-surface: #030712;
--color-surface-elevated: #0a0f1c;
--color-accent: oklch(0.78 0.14 195);
```

Utility class `.glass-panel`:

- `border border-white/10`
- `bg-zinc-950/60 backdrop-blur-xl`
- `box-shadow: inset 0 1px 0 rgba(255,255,255,0.1)`
- Solid fallback under `prefers-reduced-transparency`

---

## Typography

| Role | Family | Notes |
|------|--------|-------|
| All text | **Outfit** via `next/font/google` | No Inter as default |
| Mono (optional) | system mono stack | Metrics or code snippets only |

### Type scale

| Name | Size | Usage |
|------|------|-------|
| Display | `text-4xl md:text-5xl lg:text-6xl` | Hero headline (max 2 lines) |
| H2 | `text-3xl md:text-4xl` | Section titles |
| H3 | `text-xl` | Feature / card titles |
| Body | `text-base` | Paragraphs, max ~65ch |
| Label | `text-xs uppercase tracking-[0.18em]` | Hero eyebrow only (max 1 per 3 sections) |

---

## Spacing & Layout

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-20 lg:py-24` (density dial ~4)
- Corner radius: **rounded-2xl** for panels, **rounded-xl** for buttons (documented rule)
- Hero: `min-h-[100dvh]`, `pt-20 lg:pt-24` max, asymmetric split on `lg+`

---

## Component Patterns

### Navbar

- Fixed, glass blur bar, height **64px**
- Single-line desktop nav
- CTA: **Sign in** → `/login`

### Hero

- Asymmetric split: copy left, photo right
- Max 4 text elements: eyebrow, headline, subtext (≤20 words), CTAs
- Primary CTA: **Sign in**; secondary: **View features** (anchor)
- Real image via `next/image` + picsum seed or brand asset

### Logo wall

- Directly under hero (not inside hero)
- Simple Icons SVG logos only, no category labels

### Features

- Bento grid with varied cell sizes and backgrounds (image, glass, accent gradient, strip)
- Phosphor icons (`@phosphor-icons/react`)
- No three equal feature cards in a row

### Testimonials

- Featured large quote + supporting stack (not 3 equal cards)
- Real avatar photos (picsum seeds), quotes ≤3 lines

### Pricing

- Three tiers; middle tier highlighted with cyan border/badge
- Tier CTAs differ by intent: Use Starter / Choose Team / Contact sales

### Final CTA

- Glass panel band, single **Sign in** CTA (same label as nav/hero)

### Footer

- zinc-950, hairline top border, social + legal links

---

## Motion

- Library: `motion/react`
- Scroll reveal: `whileInView`, `viewport={{ once: true }}`
- `useReducedMotion()` degrades to static
- No `window.addEventListener('scroll')`

---

## Sections Checklist

Landing page order:

1. Navbar  
2. Hero  
3. Logo wall  
4. Features  
5. Testimonials  
6. Pricing  
7. Final CTA  
8. Footer  

---

## Do Not

- Wealth Video Hero / fintech full-screen video background
- Inter as default marketing font
- AI purple gradients or three identical feature cards
- Div-based fake product screenshots
- Em-dashes (`—`) anywhere in visible copy
- Light-mode marketing sections mid-page
- lucide-react on landing (use Phosphor)

---

## HeroUI Integration

Use HeroUI inside authenticated app surfaces. Landing CTAs use Tailwind-styled links/buttons matching the cyan accent system.
