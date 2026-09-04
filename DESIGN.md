---
name: PLOVER — The Clean Room
description: Light minimalist luxury. Pure white canvas, museum-grade whitespace, subtle shadows on hover. A valve manufacturer's site that feels like an Apple product page.
colors:
  canvas: "#FAFAFA"
  surface: "#FFFFFF"
  surface-hover: "#F5F5F5"
  ink: "#111111"
  ink-secondary: "#6B7280"
  ink-tertiary: "#9CA3AF"
  accent: "#2563EB"
  accent-light: "#3B82F6"
  accent-dark: "#1D4ED8"
  accent-subtle: "rgba(37, 99, 235, 0.06)"
  line: "#E5E5E5"
  line-subtle: "rgba(0, 0, 0, 0.06)"
  signal: "#22C55E"
  alert: "#EF4444"
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
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: PLOVER — The Clean Room

## Overview

**Creative North Star: "The Clean Room"**

PLOVER's digital presence reads like an Apple product page crossed with a high-end furniture catalog. The world is light by default — pure white surfaces (#FAFAFA canvas, #FFFFFF cards) that make products float like museum pieces. Every element has room to breathe: generous whitespace separates sections, cards rest flat with no border, and depth appears only as a subtle shadow on hover.

Typography is ultra-light and architectural. Display weights at 200-200 at massive scale create an editorial quality. The single accent color (vivid blue #2563EB) appears only on interactive elements and key data. Everything else is a careful gradation of neutral grays.

Motion is slow and physical. Transitions ease out over 400-700ms. Images zoom gently on hover. Shadows fade in like a physical object being lifted. Nothing snaps.

**Key Characteristics:**
- **Light-by-default** — Pure white canvas (#FAFAFA) as the foundation
- **Museum-grade whitespace** — Products displayed with gallery breathing room
- **Flat-by-default** — No borders on cards; shadow appears only on hover
- **Ultra-light typography** — Display 200, Headline 300, never bold
- **Single accent** — Vivid blue (#2563EB) for CTAs and links only

## Colors

A monochromatic palette with a single cool accent. The canvas is everything.

### Surfaces (Light Canvas)
- **Canvas** (#FAFAFA): The primary background. Warm off-white.
- **Surface** (#FFFFFF): Card and container backgrounds. Pure white.
- **Surface Hover** (#F5F5F5): Subtle shift for hover states.

### Accent (The Blue Pulse)
- **Accent** (#2563EB): The action color. Links, CTAs, active states. Vivid blue.
- **Accent Light** (#3B82F6): Hover state for accent elements.
- **Accent Dark** (#1D4ED8): Active/pressed state.
- **Accent Subtle** (rgba(37,99,235,0.06)): Tag backgrounds, subtle highlights.

### Text (Neutral Grays)
- **Ink** (#111111): Primary text. Near-black.
- **Ink Secondary** (#6B7280): Secondary text, descriptions, metadata.
- **Ink Tertiary** (#9CA3AF): Tertiary text, captions, timestamps.

### Lines
- **Line** (#E5E5E5): Visible dividers, borders.
- **Line Subtle** (rgba(0,0,0,0.06)): Hairline borders, card borders at rest.

### Semantic
- **Signal** (#22C55E): Success states.
- **Alert** (#EF4444): Error states.

### Named Rules
**The Blue Pulse Rule.** Vivid blue appears only on interactive elements: links, CTAs, active states, and subtle tag backgrounds. It never fills large surfaces. Its coolness is the point — a single pulse of color in a sea of neutral.

**The Flat Rule.** Cards have no border at rest. They are defined by their white surface against the slightly darker canvas. Shadow appears only on hover, as if the card is being lifted off the page.

## Typography

**Display Font:** Inter (200 weight for headlines)
**Body Font:** Inter (400 weight for reading)
**Mono Font:** JetBrains Mono (for technical data)

**Character:** Inter is chosen for its precision and neutrality. At display sizes with ultra-light weights, it achieves an editorial quality normally reserved for luxury brands. The generous whitespace around headlines is as important as the letterforms.

### Hierarchy
- **Display** (200, clamp(2.5rem, 6vw, 5rem), 1.05, -0.03em): Hero headlines, page titles. One per viewport.
- **Headline** (300, clamp(1.75rem, 3.5vw, 3rem), 1.15, -0.02em): Section titles, product names.
- **Title** (400, 1.25rem, 1.4): Card titles, subsection headers.
- **Body** (400, 1rem, 1.7): Product descriptions, form content.
- **Label** (500, 0.875rem, 1.5): Buttons, chips, nav items.
- **Mono** (400, 0.875rem, 1.6, 0.02em): Technical specifications.

### Named Rules
**The Lightness Rule.** Display and Headline weights never exceed 300. If you need emphasis, increase size or add accent color — never weight.

**The Mono Boundary Rule.** Monospace is used ONLY for technical data values.

## Layout

A centered, constrained layout with generous maximum widths and massive whitespace.

**Container:** `max-w-7xl` (1280px) with responsive padding: `px-6` → `px-8`.

**Section Rhythm:** Vertical spacing between major sections is `py-20` to `py-24` (80-96px). The light canvas needs more breathing room.

**Grid:** CSS Grid with generous gaps (`gap-6` to `gap-10`). Product cards: 1 → 2 → 4 columns.

**Density:** Open and airy. Every element has space to breathe.

## Elevation & Depth

Depth in The Clean Room is conveyed through **subtle shadows on hover**, not borders or permanent shadows.

### Depth Vocabulary
- **Resting** (none): Cards at rest have no shadow, no border. They float on the canvas by contrast alone.
- **Lifted** (shadow): On hover, a subtle shadow (`0 4px 24px -8px rgba(0,0,0,0.08)`) lifts the card.

### Named Rules
**The Shadow-on-Hover Rule.** Shadows never appear at rest. They are earned through interaction only. The transition from flat to lifted should feel like a physical object being picked up.

## Shapes

**Corner radius** is restrained:
- **4px** (`rounded-sm`): Small elements, tags.
- **8px** (`rounded-md`): Buttons, inputs, search fields.
- **12px** (`rounded-lg`): Cards, content sections.

**Borders** are minimal:
- Cards: no border at rest
- Inputs: `1px solid rgba(0,0,0,0.06)` at rest
- Focus: `1px solid rgba(0,0,0,0.1)` with subtle shadow

## Components

### Buttons
- **Primary:** Black background (#111111), white text, 8px radius. Hover darkens slightly.
- **Secondary:** Transparent background, black border and text. Hover fills with canvas.

### Cards / Containers
- **Corner Style:** 12px radius.
- **Background:** Surface (#FFFFFF).
- **Border:** None at rest.
- **Internal Padding:** `p-8` to `p-10`.
- **Behavior:** Shadow appears on hover (transition 400ms). Image zooms gently.

### Inputs / Fields
- **Style:** Canvas background (#FAFAFA), subtle border, 8px radius.
- **Focus:** Border darkens slightly with subtle shadow.

### Navigation
- **Style:** Fixed/sticky, white background with subtle backdrop blur.
- **Logo:** Black wordmark, light weight, generous letter-spacing.
- **Links:** Gray text at rest → Black on hover. Active state has accent underline.
- **Mobile:** Full-screen white overlay with dark links.

### Hero
- **Style:** Full-viewport canvas, product imagery floating on white.
- **Overlay:** Subtle gradient for text readability over images.
- **CTA:** Black button.
- **Typography:** Display weight (200), massive scale.

## Do's and Don'ts

### Do:
- **Do** keep the canvas (#FAFAFA) as the primary background on every page.
- **Do** use vivid blue (#2563EB) exclusively for links, CTAs, and active states.
- **Do** use ultra-light display weights (200-300) for headlines.
- **Do** let cards rest flat with no border; shadow only on hover.
- **Do** give elements generous room to breathe — whitespace is the luxury material.

### Don't:
- **Don't** use borders on cards at rest.
- **Don't** use shadows on elements at rest.
- **Don't** use font weights above 500 for UI, above 300 for headlines.
- **Don't** use more than one accent color per screen.
- **Don't** crowd the layout — the white canvas needs breathing room.
