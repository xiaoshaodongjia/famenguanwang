---
name: PLOVER Industrial Valves
description: B2B industrial valve manufacturer showcase — a bold, gallery-like digital showroom where technical precision meets confident visual impact.
colors:
  primary: "#2563eb"
  primary-deep: "#1e40af"
  primary-50: "#eff6ff"
  primary-100: "#dbeafe"
  accent: "#e8590c"
  accent-deep: "#d9480f"
  accent-soft: "#fff4e6"
  neutral-900: "#111827"
  neutral-800: "#1f2937"
  neutral-700: "#374151"
  neutral-600: "#4b5563"
  neutral-500: "#6b7280"
  neutral-400: "#9ca3af"
  neutral-300: "#d1d5db"
  neutral-200: "#e5e7eb"
  neutral-100: "#f3f4f6"
  neutral-50: "#f9fafb"
  white: "#ffffff"
  success: "#16a34a"
  success-soft: "#dcfce7"
  error: "#dc2626"
  error-soft: "#fef2f2"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
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
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
    typography: "{components.button-primary-typography}"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
  card-interactive:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  chip:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.neutral-600}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-accent:
    backgroundColor: "{colors.primary-50}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: PLOVER Industrial Valves

## Overview

**Creative North Star: "The Industrial Showroom"**

PLOVER's digital presence reads like a carefully curated industrial showroom — a space where technical precision meets the confidence of a manufacturer who knows their product speaks for itself. The palette is deliberately restrained: cool blues establish trust and structure, while a single warm accent (industrial amber-orange) punctuates the moments that matter — the CTAs, the inquiry buttons, the actions that move a deal forward. This warm/cool tension is the system's signature: calm enough to convey reliability, bold enough to stand out in a sea of generic blue industrial sites.

Density leans comfortable-to-open. Products breathe in generous grids. Typography is system-native and confident, relying on weight and scale rather than decorative typefaces to create hierarchy. Every surface is flat at rest; depth appears only as a response to interaction — a card lifts on hover, a dropdown reveals its shadow, a modal dims the world behind it. Motion is purposeful: slow fades for content reveals, crisp transitions for state changes.

**Key Characteristics:**
- **Warm/cool contrast** — blue for trust and information, amber-orange for action and urgency.
- **Gallery-grade whitespace** — products displayed with the breathing room of a physical showroom.
- **Restrained depth** — flat-by-default surfaces; shadows only as state feedback.
- **System-native typography** — no custom fonts; hierarchy through weight, scale, and spacing.
- **Industrial B2B voice** — confident, technical, unflashy; credibility over cleverness.

## Colors

A dual-temperature palette: cool blues anchor the experience, a single warm accent drives action. This is not a rainbow system — every color earns its place.

### Primary (Cool — Trust & Structure)
- **Industrial Blue** (#2563eb): The backbone. Used for interactive text links, navigation hover states, active category indicators, and the logo wordmark. This is the color of established industrial B2B.
- **Deep Blue** (#1e40af): Hover state for primary links, darker gradient stops in the hero carousel, and selected category badges. One step darker than the primary for state depth.
- **Blue Wash** (#eff6ff): The faintest blue. Backgrounds for accent chips, inquiry form hover states, and selected filter pills. Never used for text.
- **Blue Mist** (#dbeafe): Light blue for success-adjacent contexts and carousel subtitle text. Slightly stronger than Blue Wash.

### Accent (Warm — Action & Urgency)
- **Industrial Amber** (#e8590c): The action color. Reserved exclusively for primary CTAs (Submit Inquiry, Send, Browse Products), hero buttons, and the moments where you want the visitor to act. Its warmth against the cool blue creates the system's signature tension.
- **Deep Amber** (#d9480f): Hover state for amber CTAs. One step darker, signaling pressability.
- **Amber Glow** (#fff4e6): The faintest warm tint. Used sparingly for warm-background success states or inquiry confirmation banners.

### Neutral (Structure & Content)
- **Carbon** (#111827): Primary text color. Headlines, product names, body copy. Not pure black — slightly softened for long-form readability.
- **Gunmetal** (#1f2937): Footer background and top info bar. The darkest surface in the system.
- **Steel** (#374151): Secondary text — parameter labels, section subtitles, breadcrumb current page.
- **Ash** (#4b5563): Tertiary text — helper text, placeholder hints, metadata.
- **Fog** (#6b7280): The workhorse muted color. Product specs, timestamps, empty state text, captions.
- **Silver** (#9ca3af): Disabled states, empty SVG placeholders, divider accents within cards.
- **Pearl** (#d1d5db): Input borders, card borders at rest, section dividers.
- **Cloud** (#e5e7eb): Hover borders, table row separators, subtle background tints.
- **Frost** (#f3f4f6): Light surfaces — category tag backgrounds, alternating table rows, card hover backgrounds.
- **Mist** (#f9fafb): The lightest surface. Page backgrounds behind white cards, code blocks.
- **White** (#ffffff): Card surfaces, input backgrounds, modal backgrounds, content containers.

### Semantic
- **Signal Green** (#16a34a): Success states — inquiry submitted confirmations, form validation success.
- **Green Mist** (#dcfce7): Success state backgrounds.
- **Alert Red** (#dc2626): Error states — form validation errors, destructive action text.
- **Red Mist** (#fef2f2): Error state backgrounds.

### Named Rules
**The Warm Action Rule.** Amber-orange appears only on interactive elements that trigger a submission, navigation, or inquiry. It never decorates, never appears in body text, never fills a surface larger than a button. Its warmth is the point — rarity makes it powerful.

**The Blue Rest Rule.** Industrial Blue is never used as a surface fill (except the hero gradient). It lives on text, borders, and small indicators. A blue background is a bug, not a feature.

## Typography

**Display/Body Font:** System native stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`

**Character:** The system font stack is a deliberate choice — it loads instantly, renders crisply at every size, and communicates the no-nonsense pragmatism of industrial B2B. Hierarchy is achieved entirely through weight (400–700), scale, and spacing rather than typeface contrast. The result is fast, legible, and confident without pretense.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3.5rem), 1.1 line-height, -0.02em tracking): Page hero headlines, homepage category names, section titles on landing pages. Reserved for one or two instances per viewport.
- **Headline** (700, clamp(1.5rem, 3vw, 2.25rem), 1.2 line-height, -0.01em tracking): Product names on detail pages, section headings (Technical Data, Applications), card titles at large size.
- **Title** (600, 1.25rem, 1.35 line-height): Subsection headings, sidebar labels, navigation section headers, modal titles.
- **Body** (400, 1rem, 1.6 line-height): Product descriptions, form labels, parameter values. Max line length 65–75ch for readability in technical content.
- **Label** (500, 0.875rem, 1.5 line-height): Buttons, chips, category tags, form field labels, parameter names. The workhorse for UI chrome.
- **Caption** (500, 0.75rem, 1.4 line-height, 0.02em tracking): Metadata, timestamps, breadcrumbs, footer legal text. Used at small sizes where legibility matters most.

### Named Rules
**The Weight Ladder Rule.** The system uses only three weights: 400 (body), 500 (labels/captions), and 600–700 (headlines). No light weights, no black weights. Three weights create clear hierarchy without noise.

**The Scale Rule.** Type scale steps are roughly 1.25x between levels. Jumps between Display and Body should feel significant; adjacent levels should feel like siblings.

**The Chinese-First Rule.** The font stack lists CJK fonts (PingFang SC, Hiragino Sans GB, Microsoft YaHei) before Latin fallbacks. Chinese body text must render with the appropriate regional font — never rely on system defaults for CJK content.

## Layout

A centered, constrained single-column layout with a maximum content width of 1280px (`max-w-7xl`). The grid expands responsively: 1 column on mobile, 2 on tablet, 3–4 on desktop.

**Container:** `max-w-7xl mx-auto` with responsive horizontal padding: `px-4` (mobile) → `px-6` (sm) → `px-8` (lg+).

**Grid:** CSS Grid with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` as the standard product card rhythm. Two-column layouts use `grid-cols-1 lg:grid-cols-2` with generous `gap-8`.

**Section Rhythm:** Vertical spacing between major sections is `py-8` to `py-12` (32–48px). Within sections, `mb-6` to `mb-8` separates headings from content. The spacing scale (4/8/16/24/32/48/64px) is applied consistently — no arbitrary values.

**Responsive Breakpoints:** Tailwind defaults — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`. The site is mobile-first; tablet and desktop enhance rather than rescue.

**Density:** Comfortable. Product cards have internal padding of `p-4` to `p-8`. Tables use `py-3` rows with `border-b` separators. The homepage gives each section generous vertical breathing room — this is a showroom, not a dashboard.

## Elevation & Depth

The system is **flat-by-default**. Surfaces have no shadow at rest. Depth is expressed only as a response to interaction or state — this keeps the interface clean and the focus on product content.

### Shadow Vocabulary
- **Resting** (none): Cards, inputs, and containers at rest have no shadow. A `border` or `bg-white` on `bg-gray-50` provides separation.
- **Lifted** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` — Tailwind `shadow-md`): Card hover states, dropdown menus, and any surface that needs to momentarily rise above its context.
- **Floating** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` — Tailwind `shadow-xl`): Modals, overlays, and the highest-elevation elements.

### Named Rules
**The Flat-By-Default Rule.** If an element has a shadow at rest, it needs justification. Shadows are earned through interaction (hover) or elevation (modals), not assigned arbitrarily.

**The One-Level Lift Rule.** On hover, a surface rises by exactly one shadow level. A resting card (`shadow-none`) → `shadow-md` on hover. Never skip levels.

## Shapes

**Corner radius** is the system's form language. The vocabulary is tight:
- **4px (`rounded-sm`)**: Small decorative elements, tiny tags.
- **8px (`rounded-md`)**: Cards, buttons, inputs, search fields. The default radius — applied to nearly every contained element.
- **12px (`rounded-lg`)**: Modals, large content sections, hero content blocks. Reserved for elements that need a softer, more premium feel.
- **9999px (`rounded-full`)**: Category chips, social icon circles, carousel indicator dots. Anything that should read as a pill or circle.

**Borders** are `1px solid #d1d5db` (Pearl) at rest. On interactive elements, borders transition to `#9ca3ab` (Silver) on hover or `#2563eb` (Industrial Blue) on focus.

**Section dividers** use a distinctive `w-16 h-0.5 bg-blue-600` bar beneath headings — a recurring motif that ties section headers to the brand color without overusing it.

**Accent dots** (`w-2 h-2 rounded-full bg-blue-600`) mark list items in application sections — a small, consistent detail that replaces generic bullets.

## Components

### Buttons
- **Shape:** 8px corner radius (`rounded-md`).
- **Primary (Action):** Amber-orange background (#e8590c), white text, `px-7 py-3`, 600 weight. Hover shifts to deep amber (#d9480f) with a subtle `translateY(-1px)` lift. This is the CTA — it should feel like the most clickable thing on the page.
- **Secondary:** White background, 2px Industrial Blue border, blue text. Hover fills with blue wash (#eff6ff). Used for "Contact Us", "View All", and actions that support but don't drive.
- **Ghost:** Transparent background, blue text, minimal padding. Used for inline links and low-weight actions.
- **States:** `disabled:opacity-50` with loading text swap. No color change on disabled — opacity alone signals unavailability.

### Chips / Tags
- **Neutral Chip:** Frost background (#f3f4f6), Ash text (#4b5563), full radius, `px-3 py-1`, label weight. Used for subcategory tags and filter pills.
- **Accent Chip:** Blue Wash background (#eff6ff), Industrial Blue text, full radius. Used for category badges on product cards.
- **State:** Selected chips switch to Industrial Blue background with white text.

### Cards / Containers
- **Corner Style:** 8px radius (`rounded-md`).
- **Background:** White (#ffffff).
- **Shadow Strategy:** No shadow at rest; `shadow-md` on hover with `transition-shadow`.
- **Border:** No border at rest (shadow provides separation); some variants use `border border-gray-200` with `hover:border-blue-300` for interactive category cards.
- **Internal Padding:** `p-4` for product cards, `p-6` to `p-8` for content sections.
- **Behavior:** Product cards scale their image (`group-hover:scale-105`) on hover — a subtle zoom that brings the product forward.

### Inputs / Fields
- **Style:** White background, Pearl border (#d1d5db), 8px radius, `px-3 py-2`, body text.
- **Focus:** Border transitions to transparent with `ring-2 ring-blue-500` — a blue glow that clearly signals active input.
- **Error:** Red text and red-tinted background (`bg-red-50`) for inline validation messages.
- **Placeholder:** Fog text (#6b7280).

### Navigation
- **Style:** Sticky top bar, white background, `shadow-sm`, `h-16` height.
- **Logo:** Industrial Blue, 2xl size, bold weight — "PLOVER" as the anchor.
- **Top Info Bar:** Gunmetal background (#1f2937), Cloud text (#e5e7eb), small text, hidden on mobile. Contains contact info and social icons.
- **Desktop Nav:** Label-weight text, gray-700 at rest → Industrial Blue on hover. Dropdowns appear on hover with `opacity/visibility` transition and `shadow-lg`.
- **Mobile Nav:** Hamburger toggle, full-width stacked links, nested accordion-style for "About us" and "Products" submenus.
- **Search:** Inline in the nav bar (desktop), full-width below the nav (mobile). Same input styling as form fields.

### Hero Carousel
- **Style:** Full-width, `h-[400px] md:h-[500px]`, gradient fallback from Industrial Blue to Deep Blue.
- **Overlay:** Dark gradient overlay (`from-blue-900/70 to-blue-800/40`) protects text over imagery.
- **CTA Button:** White background, Industrial Blue text — the one place white-on-blue appears as a button (the hero is the exception to the amber-CTA rule, because the dark gradient background changes the contrast math).
- **Navigation:** Frost-white circular arrows with backdrop blur, dot indicators that elongate when active.
- **Motion:** 0.6s fade transitions between slides, autoplay every 5s, pause on hover. Text uses a staggered `fadeInUp` animation.

### Inquiry Modal
- **Style:** Centered, `max-w-md`, white background, `rounded-xl`, `shadow-xl`.
- **Overlay:** `bg-black/50` backdrop, click-outside-to-close.
- **Success State:** Green checkmark in a Green Mist circle, confirmation message, amber close button.
- **Form:** Standard input styling, amber submit button.

### Section Header (Recurring Pattern)
- **Style:** Headline text, followed by a `w-16 h-0.5 bg-blue-600` accent bar, then `mb-6` spacing before content. This three-part motif (title → bar → space → content) is the standard section opening across all content pages.

## Do's and Don'ts

### Do:
- **Do** use amber-orange (#e8590c) exclusively for primary CTAs — Submit, Send, Browse, Contact.
- **Do** keep surfaces flat at rest; reserve shadows for hover and elevation states.
- **Do** use the blue accent bar (`w-16 h-0.5 bg-blue-600`) consistently beneath section headings.
- **Do** let product images be the hero — give them generous aspect ratios and clean backgrounds.
- **Do** use the system font stack; never introduce decorative typefaces for body or UI text.

### Don't:
- **Don't** use Industrial Blue as a surface fill color (except the hero gradient).
- **Don't** use amber-orange for anything that isn't a clickable action — no amber text, no amber decorative elements.
- **Don't** add shadows to elements at rest — no shadow on static cards, no shadow on inputs.
- **Don't** use more than one accent color per screen — blue for structure, amber for action, that's the system.
- **Don't** use font weights outside 400, 500, 600, 700 — no light (300), no extra-bold (800+).
- **Don't** break the section header pattern — every content section should open with the title + blue bar + spacing motif.
