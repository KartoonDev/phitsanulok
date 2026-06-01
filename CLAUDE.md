# CLAUDE.md — Phitsanulok Province Website

## Project Overview

Tourism and information website for **Phitsanulok Province, Thailand**. Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui components, and Supabase as the backend. Includes a public-facing site and an admin CMS interface.

The app runs in **demo mode** (hardcoded data from `lib/data.ts`) when Supabase env vars are absent, and switches to live Supabase queries when configured.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.1.4 (App Router) |
| React | React 19 |
| Language | TypeScript 5.7 (strict mode) |
| Styling | Tailwind CSS 3.4 + CSS variables |
| Component Library | shadcn/ui (Radix UI primitives) |
| Icons | lucide-react |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage) |
| Fonts | Noto Sans Thai (Google Fonts) |
| Linting | ESLint 9 (flat config, `next/core-web-vitals`) |
| Deployment Target | Vercel |

No test framework is configured yet.

---

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
NEXT_PUBLIC_SUPABASE_URL=          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Public anon key
SUPABASE_SERVICE_ROLE_KEY=         # Server-side admin key (never expose to client)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Without Supabase vars the app uses demo data from `lib/data.ts` — useful for frontend work.

---

## Repository Structure

```
phitsanulok/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (font, header, footer)
│   ├── globals.css         # CSS variables, container utilities
│   ├── page.tsx            # Homepage
│   ├── places/             # Public places pages
│   │   ├── page.tsx        # Listing with search/filter
│   │   └── [slug]/page.tsx # Detail page (static params)
│   ├── news/page.tsx
│   ├── stories/page.tsx
│   ├── food/page.tsx
│   ├── culture/page.tsx
│   └── admin/              # Admin CMS (protected)
│       ├── page.tsx        # Dashboard with metrics
│       ├── login/page.tsx
│       ├── places/page.tsx
│       ├── content/page.tsx
│       ├── media/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── admin/
│   │   └── admin-shell.tsx # Sidebar layout wrapper for admin pages
│   ├── site/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── content-card.tsx
│   │   └── section-heading.tsx
│   └── ui/                 # shadcn/ui primitives (button, card, badge, input, …)
├── lib/
│   ├── types.ts            # Shared TypeScript types
│   ├── data.ts             # Demo/fallback data (places, posts, media)
│   ├── utils.ts            # cn(), formatThaiDate()
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       ├── server.ts       # Server-side Supabase client (SSR)
│       └── places.ts       # Supabase query helpers for places
├── supabase/
│   └── schema.sql          # Full PostgreSQL schema with RLS policies
├── public/
│   └── brand/phitsanulok-logo.png
├── next.config.mjs         # Allowed remote image domains
├── tailwind.config.ts      # Custom color palette and theme
├── tsconfig.json
├── eslint.config.mjs
└── components.json         # shadcn/ui configuration
```

---

## Architecture Conventions

### Routing and Pages

- All pages use **Next.js App Router** with `async` server components by default.
- Dynamic routes (e.g. `/places/[slug]`) implement `generateStaticParams()` for SSG.
- `searchParams` must be typed as `Promise<{ [key: string]: string }>` and awaited (Next.js 15 async API).
- Page metadata is generated via `export async function generateMetadata()`.

### Data Layer

Two data sources that must stay in sync:

| Source | Location | Used when |
|--------|----------|-----------|
| Demo data | `lib/data.ts` | Supabase env vars absent |
| Supabase | `lib/supabase/*.ts` | Supabase configured |

When adding new content fields, update both `lib/types.ts`, `lib/data.ts` (demo records), and `supabase/schema.sql`.

### Supabase

- **Browser client**: `lib/supabase/client.ts` — for client components.
- **Server client**: `lib/supabase/server.ts` — for server components and route handlers.
- RLS is enabled on all tables. The `is_admin()` helper function (defined in schema) gates write access to authenticated admin users.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — use only in trusted server contexts.

### Components

- UI primitives live in `components/ui/` — these are shadcn/ui components. **Do not hand-edit them**; use the shadcn CLI to add/upgrade.
- Site-specific components go in `components/site/`.
- Admin-specific layout components go in `components/admin/`.
- All components are typed with TypeScript. Props interfaces go inline unless reused.

### Styling

- Use **Tailwind utility classes** as the primary styling mechanism.
- Combine classes using the `cn()` helper from `lib/utils.ts` (wraps `clsx` + `tailwind-merge`).
- Custom color tokens are CSS variables defined in `globals.css` and mapped in `tailwind.config.ts`:
  - `primary` — dark navy (`hsl(236 38% 23%)`)
  - `accent` — gold/orange (`hsl(42 78% 48%)`)
  - `secondary` — light tan (`hsl(43 63% 91%)`)
- Dark mode is class-based (`dark:` prefix).
- The `.container-page` utility class provides standard horizontal padding and max-width.
- Remote images require domains to be whitelisted in `next.config.mjs`.

### TypeScript

- Strict mode is enabled — no `any` without justification.
- Use the types from `lib/types.ts` (`Post`, `Place`, `PlaceCategory`, `MediaItem`, etc.).
- Path alias `@/` resolves to the project root.

---

## Database Schema Summary

Six tables in Supabase (all with RLS):

| Table | Purpose |
|-------|---------|
| `profiles` | User accounts with `role` (admin/editor) |
| `categories` | Post categories |
| `posts` | News and story articles (draft/published) |
| `places` | Tourism locations with geo, tags, hours |
| `media` | Uploaded files linked to Supabase Storage |
| `site_settings` | Key-value config pairs |

Enums: `content_status` (draft, published), `post_type` (news, story).

To apply the schema, run `supabase/schema.sql` against a fresh Supabase project.

---

## Key Type Definitions (`lib/types.ts`)

```typescript
type ContentStatus = "draft" | "published"
type PostType      = "news" | "story"
type PlaceCategory = "ธรรมชาติ" | "วัดและประวัติศาสตร์" | "ชุมชน" | "อาหาร" | "กิจกรรม"

interface Post  { id, title, slug, excerpt, content, type, status, featured, ... }
interface Place { id, name, slug, description, category, location, latitude,
                  longitude, tags, openingHours, entryFee, highlights, ... }
interface MediaItem { id, name, url, bucket, size, createdAt }
```

---

## Admin CMS

All admin routes live under `/admin`. The `AdminShell` component (`components/admin/admin-shell.tsx`) provides the sidebar navigation wrapper — wrap every admin page in it.

Admin sections:
- `/admin` — Dashboard with content metrics
- `/admin/places` — Manage tourism places
- `/admin/content` — Manage posts/news
- `/admin/media` — Upload/manage media files
- `/admin/settings` — Site configuration
- `/admin/login` — Authentication entry point

**Authentication is scaffolded but not yet fully wired.** Supabase Auth is the intended provider. The `profiles` table tracks roles.

---

## Development Workflow

### Git

- **Main branch**: `main` — stable, deployed to production.
- Use feature branches for new work; name them descriptively.
- Commit messages follow the `feat:`, `fix:`, `chore:`, `docs:` prefix convention.

### Adding a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```

This places the component in `components/ui/`. Do not manually edit generated shadcn files — re-run the CLI to upgrade.

### Adding a New Page

1. Create `app/<route>/page.tsx`.
2. Export a default async server component.
3. Add `export async function generateMetadata()` for SEO.
4. If the route is dynamic, export `generateStaticParams()`.
5. Use `lib/supabase/server.ts` for data fetching; fall back to `lib/data.ts` when env vars are absent.

### Extending the Data Model

1. Add the new field to `lib/types.ts`.
2. Add it to the demo records in `lib/data.ts`.
3. Add the column/table to `supabase/schema.sql` with appropriate RLS policies.
4. Update query helpers in `lib/supabase/`.

### Image Handling

- Use `next/image` (`<Image />`) for all images.
- Supabase Storage URLs (`*.supabase.co`) and Unsplash URLs are already whitelisted in `next.config.mjs`.
- Add new external domains to the `remotePatterns` array in `next.config.mjs` before using them.

---

## Localization Notes

- The site is Thai-language. UI strings are hardcoded in Thai.
- Dates are formatted with `formatThaiDate()` (`lib/utils.ts`), which uses the `th-TH` locale and `Asia/Bangkok` timezone.
- The root font is **Noto Sans Thai** loaded via `next/font/google` in `app/layout.tsx`.

---

## What Is Not Yet Implemented

- **No tests** — no Jest, Vitest, Playwright, or similar setup.
- **No CI/CD** — no GitHub Actions workflows.
- **Admin auth enforcement** — login page exists but middleware/guards are not wired.
- **Content editor UI** — admin pages show scaffolding but no create/edit/delete forms.
- **Supabase query implementation** — most pages still use demo data; only `lib/supabase/places.ts` has partial implementation.
