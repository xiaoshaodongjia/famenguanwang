---
name: PLOVER — The Dark Foundry
description: Dark-first industrial luxury. Cinematic product imagery, gunmetal surfaces, amber-gold precision accents. A valve manufacturer's site that feels like an Aston Martin configurator.
colors:
  void: "#0A0F1A"
  abyss: "#080C14"
  surface: "#141B2D"
  surface-raised: "#1A2332"
  gunmetal: "#1E293B"
  gold: "#C8A96E"
  gold-light: "#E5C98A"
  gold-dark: "#9A7D4B"
  gold-glow: "rgba(200, 169, 110, 0.15)"
  snow: "#F0F2F5"
  mist: "#94A3B8"
  fog: "#64748B"
  ash: "#475569"
  white: "#FFFFFF"
  success: "#4ADE80"
  error: "#F87171"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 200
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.01em"
  mono:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.void}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-ghost-hover:
    backgroundColor: "{colors.gold-glow}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.snow}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: PLOVER — The Dark Foundry

## Overview

**Creative North Star: "The Dark Foundry"**

PLOVER's digital presence reads like a high-end automotive configurator crossed with a precision engineering atelier. The world is dark by default — deep navy-black surfaces (#0A0F1A) that make product imagery pop with cinematic intensity. Every surface is intentional: gunmetal cards float on the void with subtle gold borders, technical data glows in monospace precision, and the amber-gold accent (#C8A96E) is the single warm pulse in an otherwise cool, controlled environment.

Typography is the silent hero. Ultra-light display weights (200-300) at massive scale create an editorial, almost luxury-fashion sensibility. The generous letter-spacing and tight tracking give headlines an architectural quality. Body text is clean and widely-led for long-form technical reading. Monospace is reserved exclusively for specifications — DN values, pressure ratings, temperatures — where precision reads as credibility.

Motion is slow and deliberate. Transitions ease out over 400-600ms. Elements fade and drift rather than snap. The carousel respects `prefers-reduced-motion` absolutely. Nothing jitters, nothing rushes.

**Key Characteristics:**
- **Dark-by-default** — Deep navy-black void (#0A0F1A) as the canvas, not an afterthought.
- **Gold as punctuation** — Amber-gold (#C8A96E) appears only on interactive elements and key data. Rarity creates desire.
- **Cinematic scale** — Product imagery at full-bleed, headlines at 5rem+, whitespace as a luxury material.
- **Monospace precision** — Technical data in mono font signals engineering credibility.
- **Subtle glow, not shadow** — Depth via faint gold borders and ambient glow, not drop shadows.

## Colors

A controlled, low-chromatic palette. The dark canvas dominates; gold is the single accent that guides action.

### Surfaces (Dark Canvas)
- **The Void** (#0A0F1A): The primary background. Deep navy-black. Every page starts here.
- **Abyss** (#080C14): The deepest layer. Modal overlays, drawer backgrounds.
- **Surface** (#141B2D): Card and container backgrounds. One step lighter than the void.
- **Surface Raised** (#1A2332): Inputs, nested cards, any element that needs to lift above Surface.
- **Gunmetal** (#1E293B): The darkest interactive surface. Footer, code blocks, technical panels.

### Accent (The Gold Pulse)
- **Amber Gold** (#C8A96E): The action color. CTAs, active states, key data highlights, divider lines. Warm, precious, deliberate.
- **Gold Light** (#E5C98A): Hover state for gold elements. Brighter, more energetic.
- **Gold Dark** (#9A7D4B): Active/pressed state. Deeper, more grounded.
- **Gold Glow** (rgba(200,169,110,0.15)): Ambient gold for hover backgrounds, focus rings, subtle highlights.

### Text (Cool Neutrals)
- **Snow** (#F0F2F5): Primary text on dark surfaces. Near-white with a slight blue undertone.
- **Mist** (#94A3B8): Secondary text — descriptions, metadata, nav items at rest.
- **Fog** (#64748B): Tertiary text — captions, timestamps, placeholder text.
- **Ash** (#475569): The most muted text. Decorative labels, disabled states.

### Semantic
- **Signal** (#4ADE80): Success states — confirmations, inquiry submitted.
- **Alert** (#F87171): Error states — validation failures, destructive actions.

### Named Rules
**The Gold Pulse Rule.** Amber-gold appears only on elements that demand action or convey precision: CTAs, form focuses, active nav indicators, technical specifications, and the thin decorative dividers that separate sections. It never fills large surfaces. Its warmth is the point — scarcity makes it precious.

**The Void Rule.** White and light backgrounds are not part of this system. The only light surfaces are text (Snow) and imagery. If a surface is lighter than #1A2332, it's either an image or an error.

## Typography

**Display Font:** Inter (200-300 weight for headlines)
**Body Font:** Inter (400 weight for reading)
**Mono Font:** JetBrains Mono / SF Mono (for technical data)

**Character:** Inter is chosen for its precision and neutrality — it disappears and lets the content speak. At display sizes with ultra-light weights, it achieves an editorial, architectural quality normally reserved for fashion brands. The generous whitespace around headlines is as important as the letterforms. Mono for technical data signals that PLOVER takes engineering seriously — every DN value, every pressure rating is set with monospace precision.

### Hierarchy
- **Display** (200, clamp(2.5rem, 6vw, 5rem), 1.05, -0.03em): Hero headlines, page titles. One per viewport. Massive, airy, breath-held.
- **Headline** (300, clamp(1.75rem, 3.5vw, 3rem), 1.15, -0.02em): Section titles, product names on detail pages. Light but present.
- **Title** (400, 1.25rem, 1.4, -0.01em): Card titles, subsection headers, sidebar labels.
- **Body** (400, 1rem, 1.7): Product descriptions, form content. Wide leading for comfortable reading.
- **Label** (500, 0.875rem, 1.5, 0.01em): Buttons, chips, nav items, form labels. Medium weight for UI chrome.
- **Mono** (400, 0.875rem, 1.6, 0.02em): Technical specifications, DN/PN values, parameter tables.

### Named Rules
**The Lightness Rule.** Display and Headline weights never exceed 300. Bold headlines are a different brand. If you need emphasis, increase size or add gold color — never weight.

**The Mono Boundary Rule.** Monospace is used ONLY for technical data values (DN50, PN16, -20~120°C, etc.) and code-like content. Never for body text, never for navigation, never for buttons.

## Layout

A centered, constrained layout with generous maximum widths and even more generous whitespace.

**Container:** `max-w-7xl` (1280px) with responsive padding: `px-6` → `px-8` → `px-12`.

**Section Rhythm:** Vertical spacing between major sections is `py-16` to `py-24` (64-96px). The dark canvas needs more breathing room than light designs — whitespace is the luxury material.

**Grid:** CSS Grid with generous gaps (`gap-6` to `gap-12`). Product cards: 1 → 2 → 3 columns. Asymmetric layouts for editorial feel on landing pages.

**Density:** Open and airy. Even data-dense pages (product detail) use generous internal padding and section spacing. The dark background creates natural visual weight, so content needs room to breathe.

**Breakpoints:** Tailwind defaults — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`. Mobile-first.

## Elevation & Depth

Depth in The Dark Foundry is conveyed through **subtle borders and ambient glow**, not drop shadows. On a dark canvas, shadows disappear — light and line create hierarchy.

### Depth Vocabulary
- **Resting** (none): Cards at rest have a 1px border at `rgba(200,169,110,0.08)` — barely visible gold outline that catches light.
- **Lifted** (glow): On hover, the border brightens to `rgba(200,169,110,0.2)` and a faint gold glow (`box-shadow: 0 0 20px rgba(200,169,110,0.08)`) lifts the element.
- **Floating** (strong glow): Modals and overlays get a stronger gold border and backdrop blur.

### Named Rules
**The Gold Line Rule.** Every card, every container is defined by a hairline gold border at low opacity. Not a shadow — a line. This is the signature of the system: precision through line, not depth through shadow.

**The Glow Threshold Rule.** Hover states never jump to full gold. They move from 8% opacity → 20% opacity border. Subtlety is the signal of quality.

## Shapes

**Corner radius** is restrained:
- **4px** (`rounded-sm`): Small elements, tiny tags, inline code.
- **8px** (`rounded-md`): Buttons, inputs, search fields. The default interactive radius.
- **12px** (`rounded-lg`): Cards, content sections, modals. Soft enough to feel premium, sharp enough to feel precise.
- **9999px** (`rounded-full`): Category chips, status indicators.

**Borders** are the primary form language:
- Card borders: `1px solid rgba(200,169,110,0.08)` at rest
- Input borders: `1px solid rgba(200,169,110,0.12)` at rest
- Focus borders: `1px solid rgba(200,169,110,0.4)` with gold glow

**Section dividers** use a distinctive motif: a thin gold line (`1px solid #C8A96E`) with a small diamond or dot at center, or a gradient fade from gold to transparent.

## Components

### Buttons
- **Shape:** 8px corner radius, medium weight label text.
- **Primary (Action):** Amber-gold background (#C8A96E), void text (#0A0F1A), `px-8 py-3.5`. Hover shifts to gold-light (#E5C98A). The highest-contrast button in the system — it should feel like the most clickable thing on any page.
- **Ghost:** Transparent background, gold text and border (`1px solid rgba(200,169,110,0.3)`). Hover fills with gold-glow background. Used for secondary actions.
- **States:** `disabled` reduces opacity to 0.4. Loading swaps text with a gold spinner.

### Cards / Containers
- **Corner Style:** 12px radius.
- **Background:** Surface (#141B2D).
- **Border:** 1px gold at 8% opacity at rest → 20% on hover with faint glow.
- **Internal Padding:** `p-6` to `p-8`.
- **Behavior:** Product cards lift on hover (border brightens + subtle glow). Image zoom is disabled on dark — instead, the border does the work.

### Inputs / Fields
- **Style:** Surface-raised background (#1A2332), gold-tinted border at 12% opacity, 8px radius.
- **Focus:** Border brightens to 40% gold with `box-shadow: 0 0 0 3px rgba(200,169,110,0.1)`.
- **Text:** Snow (#F0F2F5), placeholder in Fog (#64748B).

### Navigation
- **Style:** Fixed/sticky, void background (#0A0F1A) with a subtle gold bottom border.
- **Logo:** Gold wordmark, light weight, generous letter-spacing.
- **Links:** Mist text (#94A3B8) at rest → Gold (#C8A96E) on hover. Active state has a gold underline indicator.
- **Mobile:** Full-screen dark overlay with gold-tinted links.

### Hero
- **Style:** Full-viewport dark canvas, product imagery at cinematic scale.
- **Overlay:** Gradient from transparent to void at the bottom for text readability.
- **CTA:** Gold button, the brightest element on the page.
- **Typography:** Display weight (200), massive scale, tight tracking.

### Technical Data Display
- **Style:** Monospace font for all values. Labels in Mist, values in Snow.
- **Layout:** Clean definition lists or tables with gold-tinted row borders.
- **Highlight:** Key specs (DN, PN, Material) can be emphasized with gold color.

## Do's and Don'ts

### Do:
- **Do** keep the void (#0A0F1A) as the primary background on every page.
- **Do** use gold (#C8A96E) exclusively for CTAs, focus states, active indicators, and technical data.
- **Do** use ultra-light display weights (200-300) for headlines — never bold.
- **Do** define cards and containers with hairline gold borders, not shadows.
- **Do** use monospace font for all technical specification values.
- **Do** give elements generous room to breathe — whitespace is luxury.

### Don't:
- **Don't** use white or light backgrounds (except for text and images).
- **Don't** use gold as a surface fill color — only for lines, text, and small interactive elements.
- **Don't** use font weights above 500 for UI elements, above 300 for headlines.
- **Don't** use drop shadows for depth — use gold borders and ambient glow instead.
- **Don't** use monospace for body text, navigation, or buttons — only for technical data.
- **Don't** crowd the layout — the dark canvas needs breathing room.
- **Don't** use rounded corners above 12px — precision over softness.
