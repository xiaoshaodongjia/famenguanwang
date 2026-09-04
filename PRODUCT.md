# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves two distinct B2B visitor personas, and the information architecture must serve both simultaneously:

1. **Procurement managers / supply chain buyers** — sourcing valves for a project, comparing suppliers. They care about price, MOQ, lead time, certifications, and brand credibility. Their goal is to find the right product and submit an inquiry quickly.
2. **Technical engineers / designers** — specifying valves for a project. They care about technical parameters (DN, PN, material, applicable media, temperature range), dimensions, drawings, and CAD files. Their goal is the product meets the design spec.

Both visitor types must be able to reach their goal within a few clicks from any entry point.

## Product Purpose

PLOVER INDUSTRIAL CO.,LTD's official website serves as the company's primary B2B sales and marketing channel. It showcases industrial valves and pipe fittings to global buyers, enables product discovery by technical spec and application, and converts visitor interest into inquiries. A built-in CMS lets a single admin manage all site content without touching code.

## Positioning

PLOVER competes on four simultaneous strengths that most neighboring manufacturers cannot truthfully copy all at once: competitive pricing, internationally recognized certifications (API, CE, ISO), full-category product coverage (ball, gate, globe, butterfly, etc.), and custom / non-standard manufacturing capability. The site must make all four claims credible on first visit.

## Operating Context

- Visitors arrive from search engines (product spec queries, brand name, application keywords), trade platforms, or direct referral.
- Evaluation is project-driven: a buyer often compares multiple products side by side and downloads technical documents before contacting sales.
- The admin is a non-technical operator who manages content through the `/admin` panel: products, categories, cases, blog posts, downloads, certificates, about pages, homepage slides, and inquiry responses.
- Product data is specification-heavy: each valve entry carries DN, PN, material, connection type, media, temperature range, dimensions, and optional documents (manual, catalog, CAD).
- The reference visual standard is https://ttv.es/en/products/.

## Capabilities and Constraints

**Confirmed functionality:**
- Public site: homepage with hero carousel, product catalog (category filter + search + pagination), product detail with full technical specs, about pages, application sectors, case studies, blog/posts, downloads, certificates, quality content, contact form with inquiry submission.
- Admin panel: session-authenticated CRUD for products, categories, cases, posts, downloads, certificates, about sections, sectors, contact info, homepage slides, and inquiry management.
- Multi-role: single admin account; public visitors are anonymous.
- Stack: Nuxt 4 (full-stack), TypeScript, Tailwind CSS 4, Prisma ORM, SQLite, Element Plus, TipTap rich text editor.
- Responsive across desktop, tablet, and mobile.

**Constraints:**
- SQLite single-file database — suitable for small-to-medium scale; migration path to PostgreSQL/MySQL needed if data grows.
- Image storage is local (`public/uploads`); future migration to object storage possible.
- Single-admin auth model — no multi-user roles, no customer accounts.

**Undecided product facts:**
- Whether the site targets domestic (CN), international (EN), or both markets — current copy is English-primary with Chinese planning docs.
- Whether pricing is displayed openly or hidden behind inquiry.
- Deployment target (Vercel, Alibaba Cloud ECS, or other).

## Brand Commitments

- Company name: **PLOVER INDUSTRIAL CO.,LTD**
- Industry positioning: professional manufacturer of industrial valves and pipe fittings.
- Tagline (in use): *Professional manufacturer of industrial valves and pipe fittings.*
- Voice: professional, technical, trustworthy — B2B industrial tone, not consumer-marketing casual.

## Evidence on Hand

- **Product photos** — real valve photographs available for catalog population.
- **Certificates** — API, CE, ISO certification documents available.
- **Case studies** — real, publicly referenceable customer project cases available.
- **Reference site** — https://ttv.es/en/products/ as a visual and structural benchmark.

Absences the site must not fabricate: specific revenue figures, employee counts, year founded, unverifiable quality claims, or customer names without permission.

## Product Principles

1. **Spec-first discovery** — an engineer must be able to find and validate a product by its technical parameters in under 30 seconds.
2. **Inquiry as the conversion** — every product view should make the next action obvious: inquire, download, or compare.
3. **Four-pillar credibility** — price, certification, range, and custom capability must all be legible without scrolling.
4. **Admin autonomy** — content changes ship when the admin clicks save, without developer involvement.
5. **Reference-grade craft** — the finished site must meet or exceed the benchmark set by https://ttv.es/en/products/.

## Accessibility & Inclusion

No product-specific accessibility requirement was established beyond standard web best practices (semantic structure, keyboard navigation, readable contrast). The industrial B2B audience is assumed able-bodied; however, the site should not introduce unnecessary barriers.
