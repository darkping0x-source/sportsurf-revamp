# SportSurf India — Revamp

A rebuild of [sportsurf.in](https://sportsurf.in) (a sports-infrastructure company site) done
as a live client task: keep the existing UI/UX and color palette, and add AI search, an AI
chatbot, user registration with validation, and a backend admin dashboard for content,
quote-request validation, and query management.

There was no access to Sportsurf's actual source code or database for this task, so this is
a fresh Next.js build that reproduces the public site's structure, content, and exact color
palette (extracted directly from the live site's HTML/CSS), with the requested features
built on top of a real Supabase backend rather than static mockups.

## What was actually done, in order

The full prompt-by-prompt build log is in [`PROMPTS.md`](./PROMPTS.md). In short:

1. **Discovery** — pulled the live site's HTML to get its real routes, nav structure, color
   hex codes (`#0B0F19` navy, `#3B82F6` blue, `#F9F7F4` cream, `#B8972E` gold, plus amber/
   indigo/grey accents), product categories, and certification badges, instead of guessing.
2. **Scaffold** — Next.js 16 (App Router) + TypeScript + Tailwind v4, palette wired in as
   theme tokens.
3. **Content** — a Postgres schema (`supabase/migrations/`) for products, projects,
   certifications, quote requests, and query logs; public pages rebuilt against it.
4. **Auth** — Supabase Auth registration/login with email verification, server-side
   validation (email format, password length, confirmation match), and a profile page
   showing the user's own quote requests.
5. **AI search** — the product/project catalog is sent to Gemini per query, which returns a
   relevance-ranked, filtered subset with a reason per match; falls back to local keyword
   scoring if the AI call fails, so the feature degrades instead of erroring.
6. **AI chatbot** — a floating widget grounded in the same catalog data (so it can't
   hallucinate products that don't exist), with a WhatsApp/email fallback for anything out
   of scope.
7. **Admin dashboard** — role-gated `/admin`: product/project CRUD, a quote-request
   approve/reject queue, a filterable log of every search and chat query, user role
   management, and an activity overview.
8. **Responsiveness** — checked at 375px/768px/1280px; found and fixed a real bug (the
   header's nav links were fully hidden on mobile with no menu to replace them).
9. **Testing** — unit tests for validation and search ranking, a Playwright integration test
   for login → quote request → profile, and a full manual route sweep.

Each phase was verified against the live Supabase project as it was built, not just written
and assumed to work — see the git log for what was actually tested at each step.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Supabase (Postgres, Auth,
Row Level Security) · Google Gemini (`gemini-flash-latest`) for AI search and the chatbot,
chosen specifically because it has a genuinely free tier — no paid API required to run this.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in your own Supabase + Gemini keys
npm run dev
```

Before first run, apply the schema to your Supabase project (SQL Editor, in order):

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_seed.sql`
3. `supabase/migrations/0003_fix_admin_recursion.sql`

To reach the admin dashboard, promote a user to admin manually once, e.g.:

```sql
update profiles set role = 'admin' where id = '<your-user-id>';
```

## Testing

```bash
npm run test       # unit tests (vitest) — validation + search ranking
npm run test:e2e   # integration test (Playwright) — login, quote request, profile
```

## Known scope notes for this submission

- **Content is representative, not the real catalog.** Nine products and eight projects
  were seeded from what the public site actually shows, but this isn't Sportsurf's full real
  database — the admin dashboard is there so real content can be added going forward.
- **No image assets.** Product/project photography wasn't available without access to their
  media library; the schema has an `images` column ready for it.
- **Email is on Supabase's default shared SMTP**, which rate-limits to a couple of signup
  emails per hour — fine for this evaluation, but a production launch would want a real SMTP
  provider (Resend, SendGrid, etc.) configured in Supabase's Auth settings.
- **Not deployed to a public URL yet** — runs via `npm run dev` / `npm run build && npm run
  start`. Deploying (Vercel is the natural fit for Next.js) just needs the same env vars set
  there, plus updating Supabase Auth's Site URL/redirect URLs to the production domain so
  email confirmation links resolve correctly.
