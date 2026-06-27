# Design System — Wealth Video Hero

**Style Name:** Wealth Video Hero  
**Type:** Fintech, Glassmorphism, Video Background, Premium  
**Keywords:** fintech, wealth, glassmorphism, premium, dark mode, blur, feature grid, pill badge  
**Era:** 2024–2026 Fintech Premium  
**Light/Dark:** Dark only (Full dark)

---

## Context

This design language applies to the **Railway monorepo platform** — an internal R&D and Product development platform. The fintech premium aesthetic translates to:

- **Full-screen video hero** with cinematic depth and motion
- **Glassmorphism cards** floating over dark backgrounds
- **Pill-shaped badges and CTAs** for a modern wealth-management feel
- **High-contrast white typography** on black with subtle grey hierarchy

Landing page UI copy is **English**. Internal app surfaces (dashboard, login) may use Chinese where appropriate.

---

## Color Palette

### Primary

| Token | Value | Usage |
|-------|-------|-------|
| Black | `#000000` | Page background, video overlay base |
| White | `#FFFFFF` | Primary text, pill CTAs, headlines |
| Dark Grey | `#1A1A1A` | Section backgrounds, elevated surfaces |
| Mid Grey | `#888888` | Secondary text, muted labels |

### Secondary

| Token | Value | Usage |
|-------|-------|-------|
| Glass BG | `rgba(0,0,0,0.7)` | Glass card backgrounds |
| Glass Border | `rgba(255,255,255,0.1)` | Card borders, dividers |
| Light Grey | `#CCCCCC` | Body secondary text on dark |
| Deep Black | `#111111` | Footer, nested surfaces |

---

## CSS Variables

Define in `apps/web/src/app/globals.css`:

```css
--bg-primary: #000000;
--text-primary: #FFFFFF;
--glass-bg: rgba(0, 0, 0, 0.7);
--glass-border: rgba(255, 255, 255, 0.1);
--blur: 24px;
--radius-pill: 9999px;
--radius-card: 16px;
--video-scale: 1.5;
--transition: 200ms ease;
--text-secondary: #888888;
--text-muted: #CCCCCC;
--surface-dark: #1A1A1A;
--surface-deep: #111111;
```

---

## Typography

### Font Families

| Role | Family | Weight range |
|------|--------|--------------|
| All text | Inter, system-ui (sans) | 400, 500, 600, 700 |

Load Inter via `next/font/google`. No serif fonts — modern sans only for fintech premium feel.

### Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| Display | 4rem (64px) | 1.05 | 600–700 | Hero headline |
| H1 | 2.5rem (40px) | 1.15 | 600 | Section titles |
| H2 | 1.75rem (28px) | 1.25 | 600 | Card titles |
| H3 | 1.125rem (18px) | 1.4 | 500 | Subsection headings |
| Body Large | 1.125rem (18px) | 1.6 | 400 | Hero subtitle, lead text |
| Body | 1rem (16px) | 1.6 | 400 | Paragraphs |
| Body Small | 0.875rem (14px) | 1.5 | 400 | Captions, footer |
| Label | 0.75rem (12px) | 1.4 | 500 | Pill badges (uppercase, tracking-wider) |

### Typography Rules

- All headings use sans-serif; never serif
- Maximum line length: 65ch for body text
- Hero headline: white, tight tracking (`tracking-tight`)
- Secondary text: `#888888` or `#CCCCCC` on dark backgrounds
- Pill badge labels: uppercase, `tracking-wider`, 12px

---

## Spacing

Base unit: **4px** (Tailwind default).

| Token | Value | Usage |
|-------|-------|-------|
| Section Y | 6rem (96px) desktop / 4rem (64px) mobile | Between major sections |
| Container X | 1.5rem (24px) mobile / 2rem (32px) tablet+ | Horizontal padding |
| Max width | 72rem (1152px) | Content container |
| Card padding | 1.5–2rem (24–32px) | Glass cards |
| Stack gap | 1.5rem (24px) | Vertical rhythm within sections |
| Grid gap | 1.5–2rem (24–32px) | Feature/pricing grids |

---

## Visual Effects

| Effect | Implementation |
|--------|----------------|
| Video background | Full-screen `<video>` autoplay muted loop; `scale(1.5)` origin top-left |
| Glass card | `.glass-card` — `backdrop-blur-xl`, `bg-black/70`, `border-white/10`, `rounded-2xl` |
| Pill badge | `.pill-badge` — glass bg, full radius, uppercase label |
| Pill CTA | `.pill-cta` — white bg, black text, `hover:scale-105` |
| Floating card | Absolute/fixed bottom positioning over hero with glass styling |
| Smooth transitions | `transition-all duration-200 ease` on interactive elements |

### Video Fallback

If `public/hero-bg.mp4` is unavailable or fails to load, use `.hero-gradient-fallback` — animated CSS gradient with subtle mesh motion (`@keyframes gradient-shift`).

Recommended royalty-free sources:

- [Coverr](https://coverr.co/) — abstract fintech / city timelapse
- [Mixkit](https://mixkit.co/free-stock-video/) — technology abstract loops
- Place in `apps/web/public/hero-bg.mp4`

CDN fallback example (development only):

```
https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-network-connections-99786-large.mp4
```

---

## Component Patterns

### Navbar (`.nav-transparent`)

- Fixed top, fully transparent (no background until scroll optional)
- Logo: sans wordmark, white
- Links: sans-serif, 14px, `#CCCCCC`, hover → white
- CTA: white pill button → `/login`
- Mobile: hamburger → slide-down glass menu

### Hero

- Full viewport height (`min-h-screen`)
- Background: looping video at 150% scale, origin top-left
- Dark overlay gradient for text legibility
- Glass pill badge (e.g. "Premium Platform")
- Display headline: massive white sans
- Subtitle: body large, `#CCCCCC`
- Two white pill CTAs with hover scale
- **Bottom floating glass card**: 4-column feature grid (icon + label per column)

### Feature Cards (section)

- 3-column grid (1 col mobile)
- Glass card styling
- Lucide inline SVG icon, 24×24, stroke white, 1.5px stroke
- Title: H2 white; description: body, `#888888`

### Testimonials

- 3 glass cards in row
- Quote in white body text
- Author name white; role in `#888888`
- Optional star or quote icon decorative

### Pricing

- 3 tiers; middle tier highlighted (white border, "Most Popular" pill badge)
- Price: large white number + `/month` muted
- Feature list with check SVG icons
- CTA per tier; highlighted tier gets white pill button

### Final CTA

- Full-width section on `#111111`
- Centered headline + subtitle + white pill button → `/login`

### Footer

- Background `#000000`, top border `white/10`
- Social icons: inline SVG (GitHub, Twitter/X, LinkedIn)
- Links: Privacy, Terms, Contact
- Copyright © 2026

---

## Sections Checklist

Landing page must include (in order):

- [ ] **Navbar** — transparent, logo + links + CTA
- [ ] **Hero** — video bg, pill badge, headline, subtitle, 2 pill CTAs
- [ ] **Hero feature grid** — bottom floating 4-column glass card
- [ ] **Features** — 3 glass cards with Lucide icons
- [ ] **Testimonials** — 3 glass cards
- [ ] **Pricing** — 3 tiers, middle highlighted
- [ ] **Final CTA**
- [ ] **Footer** — social, privacy, terms, contact, © 2026

---

## Interaction Rules

| Element | Behavior |
|---------|----------|
| Pill CTAs | `cursor-pointer`, `transition-all duration-200`, `hover:scale-105` |
| Links | Color shift grey → white; no underline by default |
| Glass cards | Subtle `hover:border-white/20` border brighten |
| Nav links | `#CCCCCC` → `#FFFFFF` |
| Focus | Visible 2px white outline, offset 2px (`focus-visible:ring-2`) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — disable scale transforms and video; show static gradient |

All interactive elements must include `cursor-pointer` and `transition-all`.

---

## Responsive Breakpoints

| Name | Min width | Layout changes |
|------|-----------|----------------|
| Mobile | 0 | Single column, stacked nav menu, hero grid 2×2 |
| sm | 640px | 2-col where appropriate |
| md | 768px | Navbar inline links visible |
| lg | 1024px | Hero 4-col feature grid, 3-col features/pricing |
| xl | 1280px | Max container centered |

Mobile-first Tailwind utilities. Test at 375px, 768px, 1024px, 1440px.

Hero floating card: 4 columns on lg+, 2×2 on sm, single column stack on xs.

---

## Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- One `<h1>` per page (hero headline)
- Section headings increment logically (h2 → h3)
- Color contrast: white on black ≥ 21:1; `#CCCCCC` on black ≥ 12:1
- Video: `aria-hidden="true"` on decorative background; provide text alternative in hero
- Focus indicators on all interactive elements
- SVG icons: `aria-hidden="true"` when decorative; `aria-label` when standalone links
- `prefers-reduced-motion`: pause/hide video, disable scale animations

---

## HeroUI Integration

Use HeroUI `Button` for CTAs but **override default styling**:

```tsx
<Button
  className="rounded-full bg-white text-black font-medium text-sm transition-all cursor-pointer hover:scale-105"
>
  Get Started
</Button>
```

Do not use default bootstrap-like primary colors. Match dark fintech glass palette only.

---

## Do Not

- Light mode or white backgrounds on marketing pages
- Serif fonts (Lora, Georgia) — sans only
- Emoji icons — use inline SVG only
- Sharp-corner buttons — use pill shape for CTAs and badges
- Heavy drop shadows — rely on glass blur and border
- Stock photography static heroes — use video or CSS gradient animation
