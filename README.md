# Phitsanulok Province Website

Next.js + shadcn/ui style frontend with a custom admin shell and Supabase-ready backend schema.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Create your first admin user in Supabase Auth, then set `profiles.role = 'admin'`.

Without Supabase env vars, the site uses curated demo content so the frontend can be reviewed immediately.
