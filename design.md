# Design System — Minimalismo Fotográfico Elegante

**Style Name:** Minimalismo Fotográfico Elegante  
**Type:** Elegant, Minimalist, Visual  
**Keywords:** photography, portfolio, elegant, minimalist, visual, clean, artistic, sophisticated, focused, serene  
**Era:** 2026+ Visual Art  
**Light/Dark:** Light only (Full light, no dark mode)

---

## Context

This design language applies to the **Railway monorepo platform** — an internal R&D and Product development platform. The photography-inspired aesthetic translates to:

- **Visual focus** on product capabilities and workflows
- **Gallery-like** presentation of features and integrations
- **Image-forward hero** with abstract visual elements (CSS, not stock photos)
- **Serene whitespace** that lets content breathe in a dev-tool context

Landing page UI copy is **English**. Internal app surfaces (dashboard, login) may use Chinese where appropriate.

---

## Color Palette

### Primary

| Token | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Page background, card surfaces |
| Black | `#000000` | Primary text, primary buttons, logo |
| Dark Grey | `#333333` | Secondary text, subtitles |
| Light Grey | `#E0E0E0` | Borders, dividers, subtle backgrounds |

### Secondary (Accent — use sparingly)

| Token | Hex | Usage |
|-------|-----|-------|
| Beige | `#F5F5DC` | Warm section backgrounds, hero accents |
| Navy | `#000080` | Links, badges, highlighted tier accent |
| Dark Green | `#006400` | Success states, "active" indicators |
| Brown | `#A52A2A` | Warm accent dots, decorative elements |

---

## CSS Variables

Define in `apps/web/src/app/globals.css`:

```css
--white-bg: #FFFFFF;
--black-text: #000000;
--dark-grey-text: #333333;
--light-grey-border: #E0E0E0;
--beige-accent: #F5F5DC;
--navy-accent: #000080;
--green-accent: #006400;
--brown-accent: #A52A2A;
--font-serif: "Lora", serif;
--font-sans: "Helvetica Neue", sans-serif;
--image-focus-scale: 1.05;
```

---

## Typography

### Font Families

| Role | Family | Weight range |
|------|--------|--------------|
| Headings | Lora (serif) | 400, 500, 600 |
| Body | Helvetica Neue, system-ui (sans) | 300, 400, 500 |

Load Lora via `next/font/google`. Helvetica Neue falls back to system sans-serif.

### Type Scale

| Name | Size | Line Height | Weight | Font | Usage |
|------|------|-------------|--------|------|-------|
| Display | 3.5rem (56px) | 1.1 | 500 | Serif | Hero headline |
| H1 | 2.5rem (40px) | 1.2 | 500 | Serif | Section titles |
| H2 | 1.75rem (28px) | 1.3 | 500 | Serif | Card titles |
| H3 | 1.25rem (20px) | 1.4 | 500 | Serif | Subsection headings |
| Body Large | 1.125rem (18px) | 1.6 | 400 | Sans | Hero subtitle, lead text |
| Body | 1rem (16px) | 1.6 | 400 | Sans | Paragraphs |
| Body Small | 0.875rem (14px) | 1.5 | 400 | Sans | Captions, footer |
| Label | 0.75rem (12px) | 1.4 | 500 | Sans | Tags, overlines (uppercase, tracking-widest) |

### Typography Rules

- Headlines use serif; never bold sans-serif for primary titles
- Maximum line length: 65ch for body text
- Letter-spacing: `tracking-wide` on buttons and nav links; `tracking-widest` on labels
- No all-caps for headings; reserve uppercase for labels and nav

---

## Spacing

Base unit: **4px** (Tailwind default).

| Token | Value | Usage |
|-------|-------|-------|
| Section Y | 6rem (96px) desktop / 4rem (64px) mobile | Between major sections |
| Container X | 1.5rem (24px) mobile / 2rem (32px) tablet+ | Horizontal padding |
| Max width | 72rem (1152px) | Content container |
| Card padding | 2rem (32px) | Feature, testimonial, pricing cards |
| Stack gap | 1.5rem (24px) | Vertical rhythm within sections |
| Grid gap | 2rem (32px) | Feature/pricing grids |

---

## Visual Effects

| Effect | Implementation |
|--------|----------------|
| Image focus | `.image-overlay` gradient on visual blocks |
| Gallery grid | `.gallery-grid` asymmetric CSS grid for hero visual |
| Zoom micro-interaction | `.zoom-hover` scale on hover (`--image-focus-scale`) |
| Smooth transitions | `transition-all duration-300 ease-out` on interactive elements |
| Nav discreet | `.nav-discreet` — minimal border-bottom, transparent feel |
| Whitespace | Generous padding; never fill every pixel |

---

## Component Patterns

### Navbar (`.nav-discreet`)

- Fixed or sticky top, white background, 1px bottom border (`--light-grey-border`)
- Logo: serif wordmark, black
- Links: sans-serif, 14px, dark grey, hover → black
- CTA button: black fill, white text, sharp corners (no pill shape)
- Mobile: hamburger → slide-down menu (client component)

### Hero

- Two-column layout (text left, visual right) on desktop; stack on mobile
- Headline: Display serif, black
- Subtitle: Body large, dark grey
- Two buttons: primary (black fill) + secondary (outline black)
- Visual: CSS abstract gallery grid — beige/navy/green/brown blocks with `.image-overlay`

### Feature Cards

- 3-column grid (1 col mobile)
- White card, 1px border, no shadow (or very subtle on hover)
- Lucide-style inline SVG icon, 24×24, stroke black, 1.5px stroke
- Title: H3 serif; description: body sans, dark grey
- `.zoom-hover` on card container

### Testimonials

- 3 cards in row; quote in serif italic
- Author name sans, role in small caps label style
- Subtle beige background on alternate cards optional

### Pricing

- 3 tiers; middle tier highlighted (navy border or badge "Most Popular")
- Price: large serif number + `/month` sans
- Feature list with minimal check SVG icons
- CTA per tier; highlighted tier gets filled black button

### Final CTA

- Full-width section, beige or light grey background
- Centered headline + single primary button → `/login`

### Footer

- Multi-column: brand, product links, legal, contact
- Social icons: inline SVG (GitHub, Twitter/X, LinkedIn)
- Copyright © 2026
- Links: privacy, terms, contact, SEO sitemap-style links

---

## Interaction Rules

| Element | Behavior |
|---------|----------|
| Buttons | `cursor-pointer`, `transition-all duration-300`, hover invert or scale subtle |
| Links | Underline on hover only (not default) |
| Cards | `.zoom-hover` — scale 1.05, no shadow jump |
| Nav links | Color shift grey → black |
| Focus | Visible 2px black outline, offset 2px (`focus-visible:ring-2`) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — disable scale transforms |

All interactive elements must include `cursor-pointer` and `transition-all`.

---

## Responsive Breakpoints

| Name | Min width | Layout changes |
|------|-----------|----------------|
| Mobile | 0 | Single column, stacked nav menu |
| sm | 640px | 2-col where appropriate |
| md | 768px | Navbar inline links visible |
| lg | 1024px | Hero 2-col, 3-col features/pricing |
| xl | 1280px | Max container centered |

Mobile-first Tailwind utilities. Test at 375px, 768px, 1024px, 1440px.

---

## Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- One `<h1>` per page (hero headline)
- Section headings increment logically (h2 → h3)
- Color contrast: black on white ≥ 21:1; dark grey on white ≥ 12:1
- Focus indicators on all interactive elements
- SVG icons: `aria-hidden="true"` when decorative; `aria-label` when standalone links
- Skip link optional for dashboard; landing nav is sufficient
- `prefers-reduced-motion` respected for zoom/scale animations
- Form buttons (HeroUI) retain accessible press/focus states

---

## HeroUI Integration

Use HeroUI `Button` for CTAs but **override default styling**:

```tsx
<Button
  className="rounded-none border border-black bg-black text-white font-sans text-sm tracking-wide transition-all cursor-pointer hover:bg-white hover:text-black"
>
  Get Started
</Button>
```

Do not use default bootstrap-like primary colors. Match elegant minimal palette only.

---

## Do Not

- Dark mode or dark backgrounds on marketing pages
- Emoji icons — use inline SVG only
- Heavy shadows, gradients (except `.image-overlay`), or glassmorphism
- Pill-shaped buttons — prefer sharp or minimal radius (0–2px)
- Stock photography — use CSS abstract visuals for hero
