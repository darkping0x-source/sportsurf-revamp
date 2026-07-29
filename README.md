# SportSurf India Revamp

This is my submission for the SportSurf hiring task. Below I explain what was asked, what
problems I found on their real site, what I built to fix it, the tech I used and why, how AI
helped me along the way, and the challenges I ran into.

## 1. The Task

I got this task by mail as part of a selection process. Here is basically what they asked:

> check www.sportsurf.in, we need this site to revamped. UIUX can remains same. ai search and
> ai chatbot to be added. user regn / validation to be added. backend dashboard to be made for
> content loading, validation, query management, etc more features. use any tech stack that
> suits without errors. use same colors. chk for responsiveness. test all features after
> completion.

So basically, rebuild sportsurf.in, keep the same UI and colors, add AI search and an AI
chatbot, add proper signup/login, and build a backend/admin panel, and it all had to work with
no errors.

## 2. Issues With The Current Site

Before building anything I actually checked the real site properly. Short list of what I found
wrong with it:

- Header takes up almost 1/4 of the screen before any real content shows
- Category icon row overflows the screen, and is just missing on mobile
- One product image is broken (404 error) right on their homepage
- Hero photo on homepage is different on mobile vs desktop
- Search box placeholder text gets cut off, can't read it
- Products page filter just tells you to scroll back to top, not a real filter
- Every product shows the same "1,200+ Reviews", feels fake
- About page says company founded in 2018 in one place, 2013 in another, same page
- Homepage is heavy to load, around 7MB

## 3. What I Did

- Rebuilt the site with the same colors and same layout style
- Added AI search (Gemini) that understands natural queries, not just keyword match
- Added AI chatbot that answers using our real product data only
- Added signup/login with email verification and proper validation
- Built an admin dashboard: manage products/projects, approve quote requests, see search and
  chat logs, manage user roles
- Kept the header short, less than half the height of the original
- Category dropdown instead of the icon row that was overflowing
- Checked every image loads before using it, no broken images this time
- Same hero photo on every screen size
- Filters sit right on the products page, no scrolling up needed
- Kept our stats/facts consistent everywhere they appear
- Tested it, unit tests, an integration test, and a manual pass through every page
- Deployed it live on Vercel

## 4. Features

Everything the site actually has, grouped by area.

**Main site, for everyone:**
- Homepage with hero banner, category grid, stats, project showcase, testimonials, and
  certification badges
- Category dropdown menu in the header, all 9 categories, works the same on phone and desktop
- Products page with filters right there on the page
- Product pages with ratings, reviews, and specs
- Projects page, and a detail page for each project
- About and Contact pages
- Quote request page, split into sections (project details, client info, urgency, extra
  notes), also shows what's included in a quote
- Scrolling announcement ribbon in the header
- Works properly on phone, tablet, and desktop

**AI features:**
- AI search bar that understands normal sentences, not just exact keywords, powered by Gemini
- AI chatbot on every page, answers using our real product data only, doesn't make things up,
  points people to WhatsApp or email if it can't help
- Every search and chat message gets logged so it can be checked later

**Account features, after logging in:**
- Signup and login with email verification
- Proper checks on the forms, email format, password strength, passwords matching
- A dashboard showing your quote stats and recent activity
- A page listing all your quote requests
- Notifications when one of your quotes gets approved or rejected
- Account settings to update your name and phone
- Quote form fills in your name, email, and phone automatically if you're already logged in

**Admin panel, admin only:**
- Add, edit, or delete products and projects
- Approve or reject quote requests that come in
- See a log of every search and chatbot conversation
- Manage user roles, make someone an admin
- Overview page with basic numbers

**Other:**
- Same colors and same overall feel as the original site
- Tested with unit tests, an integration test, and a manual pass through every page
- Deployed live on Vercel

## 5. Technologies Used

I asked Claude what stack made sense for a project like this, and picked from what it
suggested based on what actually solved a problem I had, not just because it was suggested.

- **Next.js (App Router) + TypeScript**: one project handles both the pages and the backend
  API routes, so I didn't need a separate backend server. TypeScript catches dumb mistakes
  before they turn into bugs.
- **Tailwind CSS**: fastest way to match the original site's exact colors and spacing without
  writing a pile of custom CSS files by hand.
- **Supabase**: database, login/auth, and file storage in one place, and it has a free tier,
  which mattered since this wasn't a paid project. Also made role based access (admin vs
  normal user) way easier than building that myself.
- **Google Gemini**: used for the AI search and the chatbot, picked mainly because it has an
  actual free tier, so the AI side of this doesn't need a paid key to run.
- **Vercel**: basically built for Next.js, deploying was just connecting the GitHub repo, no
  extra setup needed.
- **Vitest + Playwright**: Vitest for quick unit tests, Playwright for testing the real
  signup to quote request flow like an actual user would click through it.

## 6. AI I Used

I used Claude to help me plan and build this project. Before starting any actual coding, I gave
it a starting prompt telling it what role to play, something like "act as a senior software
architect and full stack developer, help me build this step by step, ask before doing anything
risky." This kept it focused on thinking through each decision properly instead of just
dumping code at me.

## 7. Prompts I Used

Not putting every single prompt here, there were a lot, just a few examples from different
stages of the build.

**Starting the project:**
> "Scaffold a Next.js project with TypeScript and Tailwind, use the same colors as sportsurf.in
> as the theme colors."

**AI search:**
> "I want an AI powered search bar, when someone types something like 'outdoor badminton court
> flooring in kerala' it should understand what they mean, not just match keywords."

**Admin panel:**
> "Build an admin section, only admins can get in, need to manage products/projects, approve
> quote requests, and see the search and chatbot logs."

**Fixing the header issue:**
> "Can we get rid of that row of category icons under the header and put a small dropdown
> instead, this should also fix the overflow problem we saw on the real site."

**Deployment:**
> "I think we are ready to deploy this, make whatever changes we need for Vercel."

## 8. Challenges I Faced

- Free stock photo sources kept giving broken links, unrelated photos, or even non commercial
  licensed images, had to manually check and swap out several
- Email verification kept failing for every single signup, took a few rounds of debugging to
  find the real cause, turned out to be a mismatch in how Supabase sends its confirmation link
- Supabase does not let you edit the confirmation email template unless you set up your own
  SMTP, had to find a fix that worked without that
- This particular Next.js version renamed "middleware" to "proxy", small thing but confusing
  when I first hit it
- Supabase's free email sending is limited to 2 emails an hour, had to keep that in mind while
  testing signups

## 9. Quick Summary

| Problem on real site | What I did instead |
|---|---|
| Header too big | Made ours less than half the size |
| Category icons overflow / missing on mobile | Dropdown menu, works everywhere |
| Broken image | Every image checked before use |
| Hero photo changes per device | Same photo on every device |
| Filter needs scrolling to top | Filter right on the page |
| Fake looking review numbers | Real varied numbers |
| Facts contradict each other | Kept consistent everywhere |
| Heavy page (~7MB) | Much lighter (~1.5MB) |

## How To Run This

```bash
npm install
cp .env.example .env.local   # add your own Supabase + Gemini keys
npm run dev
```

Apply the schema to your Supabase project first (SQL Editor, run every file in
`supabase/migrations/` in order, starting from 0001).

To reach the admin dashboard, promote a user manually:

```sql
update profiles set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

### Deploying to Vercel

1. Push to GitHub, import the repo into Vercel.
2. Add the 4 env vars from `.env.example` in Vercel's project settings.
3. After the first deploy, go to Supabase Auth settings and update the Site URL and Redirect
   URLs to your new Vercel domain (add `/auth/confirm` to the redirect list), or the email
   confirmation flow will fail on the live site.
