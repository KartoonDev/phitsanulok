create type public.content_status as enum ('draft', 'published');
create type public.post_type as enum ('news', 'story');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  type public.post_type not null default 'news',
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  cover_image text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  category text not null,
  location text,
  cover_image text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bucket text not null default 'site-media',
  path text not null,
  url text,
  size_bytes bigint,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.places enable row level security;
alter table public.media enable row level security;
alter table public.site_settings enable row level security;

create policy "Published posts are public"
on public.posts for select
using (status = 'published' or public.is_admin());

create policy "Places are public"
on public.places for select
using (true);

create policy "Categories are public"
on public.categories for select
using (true);

create policy "Media rows are public"
on public.media for select
using (true);

create policy "Settings are public"
on public.site_settings for select
using (true);

create policy "Admins manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage categories"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage posts"
on public.posts for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage places"
on public.places for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage media"
on public.media for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage settings"
on public.site_settings for all
using (public.is_admin())
with check (public.is_admin());

insert into public.categories (name, slug)
values
  ('ข่าวประชาสัมพันธ์', 'news'),
  ('ที่เที่ยว', 'places'),
  ('วัดและวัฒนธรรม', 'culture'),
  ('อาหารและของฝาก', 'food'),
  ('เรื่องเล่าท้องถิ่น', 'stories')
on conflict (slug) do nothing;

insert into public.site_settings (key, value)
values (
  'site',
  '{"name":"พิษณุโลก เมืองสองแคว","hero":"บ้านเกิดที่เล่าใหม่ด้วยเว็บไซต์สมัยใหม่","contact":"contact@phitsanulok.local"}'
)
on conflict (key) do nothing;
