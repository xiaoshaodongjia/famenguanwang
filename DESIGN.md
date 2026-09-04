---
name: PLOVER — The Blueprint
description: Technical engineering interface. Neutral dark gray canvas, electric cyan line work, grid backgrounds, pervasive monospace. A valve manufacturer's site that feels like precision engineering software.
colors:
  void: "#1A1A1A"
  ink: "#111111"
  surface: "#222222"
  surface-raised: "#2A2A2A"
  line: "#333333"
  cyan: "#00D4FF"
  cyan-dim: "#0099CC"
  cyan-glow: "rgba(0, 212, 255, 0.15)"
  cyan-line: "rgba(0, 212, 255, 0.2)"
  snow: "#E0E0E0"
  mist: "#888888"
  fog: "#555555"
  ash: "#444444"
  signal: "#00FF88"
  alert: "#FF4444"
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
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  mono:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
rounded:
  sm: "2px"
  md: "4px"
  lg: "6px"
  xl: "8px"
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
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "#33DDFF"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cyan}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-ghost-hover:
    backgroundColor: "{colors.cyan-glow}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.snow}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
---

# Design System: PLOVER — The Blueprint

## Overview

**Creative North Star: "The Blueprint"**

PLOVER's digital presence reads like a precision engineering workstation — the kind of interface a valve engineer would trust with critical specifications. The world is a neutral dark gray canvas (#1A1A1A) overlaid with a subtle grid pattern, evoking graph paper and CAD environments. Every surface is defined by thin lines: cyan electric borders (#00D4FF) trace the edges of cards, tables, and panels, while monospace type carries the authority of technical data sheets.

Typography serves the data. Inter provides clean, readable body text at display scale, but JetBrains Mono is the voice of the interface — navigation labels, category tags, parameter names, and specification values all speak in monospace. The grid background is the constant reminder: this is a space for precision, for engineers who measure twice.

Motion is quick and functional. Transitions resolve in 200-300ms — fast enough to feel responsive, slow enough to track. No decorative easing, no cinematic drift. The interface responds like a well-tuned instrument.

**Key Characteristics:**
- **Grid Canvas** — A subtle 40px grid pattern overlays the entire void, the blueprint graph paper.
- **Cyan Line Work** — Electric cyan (#00D4FF) defines every interactive edge and data highlight. Cool, precise, technical.
- **Monospace Voice** — Mono isn't just for data values — it's the interface language. Labels, tags, nav metadata all in mono.
- **Data-First Density** — Information is dense and scannable. Specifications are the hero, not decoration.
- **Sharp Precision** — Corner radii are minimal (2-6px). Everything feels machined, not molded.

## Colors

A low-chromatic, high-precision palette. The neutral gray canvas dominates; cyan is the single accent that signals interactivity and data.

### Surfaces (Neutral Gray Canvas)
- **The Void** (#1A1A1A): The primary background. Neutral dark gray — not warm, not cold. The engineering baseline.
- **Ink** (#111111): The deepest layer. Scrollbar tracks, code blocks, the darkest recesses.
- **Surface** (#222222): Card and container backgrounds. One step above the void, separated by line borders.
- **Surface Raised** (#2A2A2A): Inputs, table headers, nested elements that lift above Surface.
- **Line** (#333333): The grid color, border default, structural lines. The most-used color after the void.

### Accent (Electric Cyan)
- **Cyan** (#00D4FF): The action color. CTAs, active states, key data, link hover, focus rings. Electric, precise, unmistakable.
- **Cyan Dim** (#0099CC): Secondary cyan for less prominent elements. Timestamps, metadata.
- **Cyan Glow** (rgba(0,212,255,0.15)): Ambient cyan for hover backgrounds, focus halos, subtle highlights.
- **Cyan Line** (rgba(0,212,255,0.2)): The default border for cards and containers. Visible but not loud.

### Text (Cool Neutrals)
- **Snow** (#E0E0E0): Primary text. Cool white with no warm undertone.
- **Mist** (#888888): Secondary text — descriptions, metadata, nav at rest.
- **Fog** (#555555): Tertiary text — captions, timestamps, placeholders.
- **Ash** (#444444): The most muted. Decorative, disabled states, grid-adjacent elements.

### Semantic
- **Signal** (#00FF88): Success states — confirmations, submitted forms, active status.
- **Alert** (#FF4444): Error states — validation failures, destructive warnings.

### Named Rules
**The Cyan Line Rule.** Every card, every container, every input is defined by a 1px border at `rgba(0,212,255,0.2)`. This is the signature of the system: line defines form. On hover, the border brightens to `rgba(0,212,255,0.4)` with a faint cyan glow. Never shadow — always line.

**The Grid Rule.** The 40px grid background is present on every page. It's subtle (30% opacity line color) but constant. It reinforces the engineering context and gives the eye a reference structure. Never remove it.

## Typography

**Display Font:** Inter (200-300 weight for headlines)
**Body Font:** Inter (400 weight for reading)
**Interface Font:** JetBrains Mono (labels, tags, navigation metadata, all technical data)

**Character:** Inter disappears into clean readability. At display scale with ultra-light weight, it achieves a technical-elegant quality — precise, modern, unadorned. But the defining typographic choice is mono: JetBrains Mono carries the engineering voice. Navigation labels, category chips, parameter names, table headers, timestamps — anything that isn't body copy or a headline speaks in monospace. This pervasive mono usage is what makes the interface feel like engineering software rather than a marketing site.

### Hierarchy
- **Display** (200, clamp(2.5rem, 6vw, 5rem), 1.05, -0.03em): Hero headlines, page titles. Massive, breath-held.
- **Headline** (300, clamp(1.75rem, 3.5vw, 3rem), 1.15, -0.02em): Section titles, product names.
- **Title** (400, 1.25rem, 1.4): Card titles, subsection headers.
- **Body** (400, 1rem, 1.7): Descriptions, form content, long-form reading.
- **Label** (400 mono, 0.7rem, 1.5, 0.08em, uppercase): Buttons, chips, nav items, form labels, tags. The engineering voice.
- **Mono** (400, 0.875rem, 1.6, 0.02em): Technical specifications, parameter values, code-like content.

### Named Rules
**The Mono Voice Rule.** Monospace is used for ALL interface chrome: navigation labels, category tags, table headers, timestamps, metadata, form labels, and of course technical data values. It is not reserved exclusively for data — it is the voice of the system. Body text and headlines remain in Inter.

**The Uppercase Label Rule.** All mono labels are uppercase with 0.08em letter-spacing. This creates a consistent technical tag appearance — DN, PN, MATERIAL, SPEC, DATA — that reads as engineering notation.

## Layout

A data-dense, grid-aligned layout. The grid background provides implicit structure; explicit containers use line borders.

**Container:** `max-w-7xl` (1280px) with responsive padding: `px-6` → `px-8` → `px-12`.

**Section Rhythm:** Vertical spacing between major sections is `py-12` to `py-20` (48-80px). The grid provides visual rhythm, so less whitespace is needed than in luxury designs.

**Grid:** CSS Grid with tight gaps (`gap-4` to `gap-6`). Product cards: 1 → 2 → 3 → 4 columns. Data tables are full-width with horizontal scroll on mobile.

**Density:** Information-dense. Product cards show key specs inline. Tables are compact. The interface rewards scanning — engineers find what they need fast.

**Breakpoints:** Tailwind defaults — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`. Mobile-first.

## Elevation & Depth

Depth in The Blueprint is conveyed through **line borders and layer separation**, not shadow or glow. The grid provides ambient structure.

### Depth Vocabulary
- **Resting** (line): Cards at rest have a 1px border at `rgba(0,212,255,0.2)` — a visible cyan outline on the gray canvas.
- **Lifted** (bright line): On hover, the border brightens to `rgba(0,212,255,0.4)` with a faint cyan glow (`box-shadow: 0 0 16px rgba(0,212,255,0.1)`).
- **Floating** (strong line): Modals and overlays get a solid cyan border and backdrop blur.

### Named Rules
**The Line-Only Rule.** Never use drop shadows for depth. Depth is conveyed by border brightness and background layer separation (surface vs surface-raised). The only glow allowed is the faint cyan halo on focused or hovered interactive elements.

**The Grid Alignment Rule.** Key layout edges should align to the 40px grid where possible. This is aspirational, not strict — but the grid should feel intentional, not accidental.

## Shapes

**Corner radius** is minimal — precision over softness:
- **2px** (`rounded-sm`): Inputs, small elements, code blocks. The default technical radius.
- **4px** (`rounded-md`): Buttons, cards, containers. The default interactive radius.
- **6px** (`rounded-lg`): Larger panels, modals.
- **9999px** (`rounded-full`): Status indicators, avatar circles.

**Borders** are the primary form language:
- Card borders: `1px solid rgba(0,212,255,0.2)` at rest
- Input borders: `1px solid rgba(0,212,255,0.15)` at rest
- Focus borders: `1px solid rgba(0,212,255,0.5)` with cyan glow
- Table borders: `1px solid var(--line)` (#333333)

**Section dividers** use a gradient line: `linear-gradient(to right, var(--cyan), transparent)` — a cyan line that fades to nothing, like a technical drawing's leader line.

## Components

### Buttons
- **Shape:** 4px corner radius, mono label text (uppercase, tracked).
- **Primary (Action):** Cyan background (#00D4FF), ink text (#111111), `px-8 py-3.5`. Hover shifts to brighter cyan (#33DDFF). High-contrast, electric.
- **Ghost:** Transparent background, cyan text and border (`1px solid rgba(0,212,255,0.3)`). Hover fills with cyan-glow background.
- **States:** `disabled` reduces opacity to 0.35. Loading swaps text with a cyan spinner.

### Cards / Containers
- **Corner Style:** 4px radius.
- **Background:** Surface (#222222).
- **Border:** 1px cyan at 20% opacity at rest → 40% on hover with faint glow.
- **Internal Padding:** `p-5` to `p-6`.
- **Behavior:** Product cards brighten their border on hover. Key specs (DN, PN) are shown inline in mono.

### Inputs / Fields
- **Style:** Surface-raised background (#2A2A2A), cyan-tinted border at 15% opacity, 2px radius.
- **Focus:** Border brightens to 50% cyan with `box-shadow: 0 0 0 2px rgba(0,212,255,0.15)`.
- **Text:** Snow (#E0E0E0), placeholder in Fog (#555555).
- **Labels:** Mono, uppercase, tracked — above the input.

### Navigation
- **Style:** Fixed/sticky, void background (#1A1A1A) with a thin cyan bottom border (`1px solid rgba(0,212,255,0.15)`).
- **Logo:** Mono wordmark, cyan color, uppercase, tracked.
- **Links:** Mono labels, Mist text (#888888) at rest → Cyan (#00D4FF) on hover. Active state has a cyan underline.
- **Mobile:** Full-screen dark overlay with mono cyan-tinted links.

### Hero
- **Style:** Full-viewport dark canvas with grid overlay, product imagery with cyan line frame.
- **Overlay:** Gradient from transparent to void at the bottom for text readability.
- **CTA:** Cyan button, the most electric element on the page.
- **Typography:** Display weight (200), massive scale. A mono label above the headline ("PRODUCT LINE", "SERIES 2024").

### Technical Data Display
- **Style:** Monospace font for ALL values and labels. The data table is a first-class component.
- **Layout:** Full-width tables with cyan headers, line borders between rows.
- **Highlight:** Key specs (DN, PN, Material) in cyan color. Secondary data in Mist.
- **Density:** Compact row height, minimal padding. Information is the priority.

## Do's and Don'ts

### Do:
- **Do** keep the grid background on every page — it's the blueprint canvas.
- **Do** use cyan (#00D4FF) for CTAs, focus states, active indicators, and data highlights.
- **Do** use monospace (JetBrains Mono) for all interface chrome — labels, tags, nav, table headers.
- **Do** define cards and containers with cyan line borders, not shadows.
- **Do** keep corner radii small (2-6px) — precision over softness.
- **Do** make data tables dense and scannable — engineers scan, they don't read.

### Don't:
- **Don't** use warm colors (gold, amber, orange) — the palette is cool and neutral.
- **Don't** use drop shadows for depth — use line borders and layer separation.
- **Don't** use large corner radii — anything above 8px feels wrong here.
- **Don't** hide technical data behind interactions — show it inline, show it dense.
- **Don't** use monospace for body text or headlines — only for interface chrome and data.
- **Don't** remove the grid background — it's structural, not decorative.
- **Don't** use decorative gradients or blur effects — keep it sharp and technical.
