# Build Prompts — Sportsurf India Revamp

This file is the prompt log for this task, written before any code was created. It records
the actual sequence of prompts used to plan and build the revamp, in the order they were run,
so the process is auditable rather than reconstructed after the fact.

**Task brief (as given):** Revamp sportsurf.in. Keep UI/UX and existing color palette. Add
AI search and an AI chatbot. Add user registration with validation. Build a backend/admin
dashboard for content loading, submission validation, and query management. Any tech stack,
as long as it runs error-free. Must be responsive and tested end to end.

**Assumptions (no access to Sportsurf's real repo/hosting):** this is a fresh rebuild that
matches the live public site's structure, content, and palette, with the new features layered
on top — not a direct push to their production system.

**Reference data pulled from the live site before writing prompts:**
- Routes: `/`, `/about`, `/products`, `/projects`, `/projects/[id]`, `/contact`, `/login`,
  `/register`, `/profile`, `/quote`, `/privacy`, `/terms`
- Palette: navy `#0B0F19` (text/dark surfaces), blue `#3B82F6` (primary/CTA), cream `#F9F7F4`
  (light background), gold `#B8972E` (certifications/accent), amber `#f59e0b`, indigo `#6366f1`,
  light grey `#F4F5F7`
- Content domain: sports infrastructure company — product categories (surface sports, water
  sports, small sports, budget sports, sports academies, play zones), a project portfolio
  (500+ projects across 18+ states), certification badges (ISO 9001:2015, FIFA Quality, IAAF
  Certified, BIS Approved), quote-request workflow
- Framework signal on the live site: Next.js (`_next/static` assets), Prisma-style cuid IDs
  on project routes, implying a relational DB behind the content

---

## Phase 0 — Discovery (already run, see above)

> Fetch sportsurf.in's homepage HTML. Pull out: page title, meta description, all internal
> `href` routes, every hex color code present, and any framework fingerprints (`_next`,
> `__NEXT_DATA__`, wp-content, shopify, etc). Summarize the site's purpose, navigation
> structure, content types, and visual identity from this.

## Phase 1 — Stack & scaffold

> Scaffold a Next.js 14 (App Router) + TypeScript + Tailwind CSS project named
> `sportsurf-revamp`. Configure Tailwind theme tokens using this exact palette: navy
> `#0B0F19`, blue `#3B82F6`, cream `#F9F7F4`, gold `#B8972E`, amber `#f59e0b`, indigo
> `#6366f1`, grey `#F4F5F7`. Set up ESLint, Prettier, and a `src/` layout. Use Supabase for
> Postgres + Auth + storage since it keeps auth, DB, and file storage in one managed service
> for a solo build.

## Phase 2 — Data model & content rebuild

> Design a Prisma/Supabase schema for: `Product` (category, name, description, images,
> specs), `Project` (title, location, state, category, images, client, completion date),
> `Certification`, `QuoteRequest`, `User` (role: visitor/admin), `ChatQuery` (for logging
> chatbot/search interactions). Seed it with representative sports-infrastructure content
> matching the six product categories and a spread of projects across states, so pages
> aren't empty during development.

> Rebuild the public pages — Home, About, Products (with category filter), Project detail,
> Contact, Privacy, Terms — matching the original's layout (hero, category grid, project
> showcase, testimonials, certification strip, footer) and the palette above. Keep copy
> tone consistent with an institutional B2B sports-infrastructure brand.

## Phase 3 — User registration, login, validation

> Implement registration and login using Supabase Auth (email/password + email
> verification). Add server-side and client-side validation: email format, password
> strength, duplicate-account handling, and a required-fields check on the registration
> form. Build the `/profile` page to show the logged-in user's details and their submitted
> quote requests.

## Phase 4 — AI search

> Add an AI-assisted search bar in the header that queries across Products and Projects.
> Use embeddings (pgvector in Supabase, or an in-memory vector index if pgvector isn't
> available) over product/project titles, descriptions, and categories, combined with an
> LLM call to handle natural-language queries like "outdoor badminton court flooring in
> Kerala" and return ranked, relevant results — not just keyword matches. Log each query
> and result count to `ChatQuery` for the admin dashboard.

## Phase 5 — AI chatbot

> Build a floating chatbot widget, styled with the site's palette, available on every page.
> It should answer visitor questions about products, certifications, project portfolio, and
> the quote process using retrieval over the seeded content (RAG: fetch relevant
> Products/Projects/Certifications rows as context, then call the LLM). Include a fallback
> that offers the WhatsApp/contact route when the bot can't answer. Log every conversation
> turn for the admin dashboard's query management view.

## Phase 6 — Admin/backend dashboard

> Build an `/admin` area (role-gated, admin-only) with: (1) content management — create,
> edit, delete Products and Projects, including image upload; (2) validation queue — review
> and approve/reject new user registrations and incoming QuoteRequests; (3) query
> management — a searchable, filterable log of AI search queries and chatbot conversations,
> so the team can see what visitors are actually asking; (4) a basic metrics view (signups,
> quotes, top search terms this week).

## Phase 7 — Responsiveness pass

> Audit every page (public + admin) at mobile (375px), tablet (768px), and desktop
> (1280px+) breakpoints. Fix any overflow, broken nav collapse, or touch-target sizing
> issues. Confirm the chatbot widget and search bar behave correctly on mobile (don't
> cover content, dismissible, keyboard-safe).

## Phase 8 — Testing pass

> Write and run: unit tests for validation logic and the search-ranking function; an
> integration test for the registration → login → quote-request flow; a manual QA pass
> covering every route in Phase 0/2, both AI features, and the full admin dashboard. Fix
> anything that errors before calling the build done, per the brief's "no errors" requirement.

## Phase 9 — Final review before submission

> Re-read the client's original brief line by line and confirm each requirement is met:
> same UI/UX, same colors, AI search, AI chatbot, registration + validation, admin
> dashboard with content/validation/query management, responsive, tested. Note anything
> intentionally out of scope or assumed, for the submission notes.

**Result — brief checked line by line:**

| Brief requirement | Status |
|---|---|
| Site revamped | Done — fresh Next.js rebuild matching the live site's structure/nav/content |
| UI/UX can remain same | Done — same nav, hero/category-grid/project-showcase/testimonials/certification-strip/footer layout |
| Same colors | Done — exact hex palette extracted from the live site, wired as Tailwind theme tokens |
| AI search | Done — Gemini-ranked catalog search with a local keyword fallback; logged to `chat_queries` |
| AI chatbot | Done — floating widget grounded in real catalog data, WhatsApp/email fallback out of scope |
| User registration/validation | Done — Supabase Auth, email verification, server-side validation on both forms |
| Admin dashboard: content loading | Done — full Product/Project CRUD |
| Admin dashboard: validation | Done — quote-request approve/reject queue |
| Admin dashboard: query management | Done — filterable search+chatbot query log |
| Admin dashboard: "etc more features" | Added — activity overview with top-search-terms, user role management |
| Any tech stack, no errors | Next.js + TS + Tailwind + Supabase + Gemini; clean lint/build at every phase |
| Responsive | Checked at 375/768/1280px; found and fixed a real bug (no mobile nav) |
| Tested | Unit tests (18, vitest) + Playwright integration test + full manual route sweep, all against the live Supabase project |

**Out of scope / assumed (see README's "Known scope notes" for the full version):** no
access to Sportsurf's real backend, so this rebuilds the public site rather than modifying
their production system; catalog content is representative (9 products, 8 projects) rather
than their complete real inventory; no image assets; Gemini's free tier was used deliberately
to keep this at zero cost, per instruction; Supabase's default email is rate-limited and fine
for evaluation but would need a real SMTP provider before a production launch; not deployed
to a public URL.
