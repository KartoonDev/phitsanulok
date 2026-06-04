create type public.content_status as enum ('draft', 'published');
create type public.post_type as enum ('news', 'story');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
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
  district text,
  address text,
  opening_hours jsonb not null default '{}'::jsonb,
  entry_fee text,
  phone text,
  website text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  location text,
  cover_image text,
  tags text[] not null default '{}'::text[],
  highlights text[] not null default '{}'::text[],
  travel_tips text[] not null default '{}'::text[],
  nearby_place_slugs text[] not null default '{}'::text[],
  duration text,
  best_time_to_visit text,
  accessibility text,
  map_url text,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint places_latitude_range check (latitude is null or latitude between -90 and 90),
  constraint places_longitude_range check (longitude is null or longitude between -180 and 180)
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

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
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

create or replace function public.can_manage_content()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.places enable row level security;
alter table public.media enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_logs enable row level security;

create policy "Published posts are public"
on public.posts for select
using (status = 'published' or public.can_manage_content());

create index places_status_published_at_idx
on public.places (status, published_at desc);

create index places_category_idx
on public.places (category);

create index places_tags_idx
on public.places using gin (tags);

create policy "Published places are public"
on public.places for select
using (status = 'published' or public.can_manage_content());

create policy "Categories are public"
on public.categories for select
using (true);

create policy "Media rows are public"
on public.media for select
using (true);

create policy "Settings are public"
on public.site_settings for select
using (true);

create policy "Users can read their own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "Admins manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

create policy "Editors manage categories"
on public.categories for all
using (public.can_manage_content())
with check (public.can_manage_content());

create policy "Editors manage posts"
on public.posts for all
using (public.can_manage_content())
with check (public.can_manage_content());

create policy "Editors manage places"
on public.places for all
using (public.can_manage_content())
with check (public.can_manage_content());

create policy "Editors manage media"
on public.media for all
using (public.can_manage_content())
with check (public.can_manage_content());

create policy "Admins manage settings"
on public.site_settings for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins read audit logs"
on public.audit_logs for select
using (public.is_admin());

create policy "Editors insert audit logs"
on public.audit_logs for insert
with check (public.can_manage_content());

insert into public.categories (name, slug)
values
  ('ข่าวประชาสัมพันธ์', 'news'),
  ('ธรรมชาติ', 'nature'),
  ('วัดและประวัติศาสตร์', 'temple-history'),
  ('ชุมชน', 'community'),
  ('อาหาร', 'food'),
  ('พิพิธภัณฑ์และศูนย์เรียนรู้', 'museum-learning'),
  ('เรื่องเล่าท้องถิ่น', 'stories')
on conflict (slug) do nothing;

insert into public.places (
  name,
  slug,
  description,
  category,
  district,
  address,
  opening_hours,
  entry_fee,
  phone,
  website,
  latitude,
  longitude,
  location,
  cover_image,
  tags,
  highlights,
  travel_tips,
  nearby_place_slugs,
  duration,
  best_time_to_visit,
  accessibility,
  map_url,
  status,
  featured,
  published_at
)
values
  (
    'วัดพระศรีรัตนมหาธาตุวรมหาวิหาร',
    'wat-phra-si-rattana-mahathat',
    'วัดสำคัญคู่เมืองพิษณุโลก เป็นที่ประดิษฐานพระพุทธชินราชและเป็นจุดเริ่มต้นที่ดีสำหรับทำความรู้จักเมืองสองแคว',
    'temple-history',
    'เมืองพิษณุโลก',
    'ถนนพุทธบูชา ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก',
    '{"daily":"06:00-18:00"}'::jsonb,
    'เข้าชมฟรี',
    '055-251-649',
    null,
    16.824310,
    100.262870,
    'อำเภอเมืองพิษณุโลก',
    '/images/places/wat-phra-si-rattana-mahathat.jpg',
    array['temple', 'heritage', 'city-center'],
    array['พระพุทธชินราช', 'สถาปัตยกรรมวัดเก่า', 'เดินเที่ยวริมแม่น้ำน่าน'],
    array['แต่งกายสุภาพ', 'ช่วงเช้าคนไม่แน่น', 'จอดรถตามจุดที่วัดจัดไว้'],
    array['nan-river-community', 'sgt-maj-thawee-folk-museum'],
    '1-2 ชั่วโมง',
    'เช้าหรือเย็น',
    'มีทางเดินหลักและพื้นที่พัก แต่บางจุดมีขั้นบันได',
    'https://maps.google.com/?q=Wat+Phra+Si+Rattana+Mahathat+Phitsanulok',
    'published',
    true,
    now()
  ),
  (
    'อุทยานแห่งชาติภูหินร่องกล้า',
    'phu-hin-rong-kla',
    'อุทยานภูเขาที่มีทั้งลานหิน ป่าสน จุดชมวิว และร่องรอยประวัติศาสตร์ เหมาะกับทริปธรรมชาติแบบเต็มวัน',
    'nature',
    'นครไทย',
    'อุทยานแห่งชาติภูหินร่องกล้า อำเภอนครไทย จังหวัดพิษณุโลก',
    '{"daily":"08:00-17:00"}'::jsonb,
    'มีค่าธรรมเนียมอุทยานตามประกาศกรมอุทยาน',
    '055-356-607',
    'https://portal.dnp.go.th',
    16.993820,
    100.997210,
    'อำเภอนครไทย',
    '/images/places/phu-hin-rong-kla.jpg',
    array['national-park', 'mountain', 'history'],
    array['ลานหินปุ่ม', 'ผาชูธง', 'เส้นทางศึกษาธรรมชาติ'],
    array['เตรียมเสื้อกันหนาวในฤดูหนาว', 'รองเท้าควรเหมาะกับทางเดินธรรมชาติ', 'ตรวจสภาพอากาศก่อนเดินทาง'],
    array['kaeng-song-waterfall'],
    'ครึ่งวัน-เต็มวัน',
    'พฤศจิกายน-กุมภาพันธ์',
    'บางเส้นทางเป็นพื้นธรรมชาติและไม่เหมาะกับรถเข็น',
    'https://maps.google.com/?q=Phu+Hin+Rong+Kla+National+Park',
    'published',
    true,
    now()
  ),
  (
    'พระราชวังจันทน์',
    'chan-palace',
    'พื้นที่ประวัติศาสตร์ในเมืองพิษณุโลก เชื่อมโยงเรื่องราวสมเด็จพระนเรศวรมหาราชและภูมิทัศน์เมืองเก่า',
    'temple-history',
    'เมืองพิษณุโลก',
    'ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก',
    '{"tuesday_sunday":"09:00-16:00","monday":"closed"}'::jsonb,
    'เข้าชมฟรี',
    null,
    null,
    16.828930,
    100.257890,
    'อำเภอเมืองพิษณุโลก',
    '/images/places/chan-palace.jpg',
    array['history', 'museum', 'city-center'],
    array['ศาลสมเด็จพระนเรศวร', 'แหล่งเรียนรู้เมืองเก่า', 'พื้นที่เดินชมแบบสงบ'],
    array['ตรวจวันเปิดทำการก่อนเดินทาง', 'เหมาะจับคู่กับวัดพระศรีรัตนมหาธาตุ', 'พกน้ำดื่มในวันที่อากาศร้อน'],
    array['wat-phra-si-rattana-mahathat', 'nan-river-community'],
    '1 ชั่วโมง',
    'ช่วงเช้า',
    'พื้นที่ส่วนใหญ่เดินได้สะดวก แต่ควรตรวจทางลาดในจุดจัดแสดง',
    'https://maps.google.com/?q=Chan+Palace+Phitsanulok',
    'published',
    false,
    now()
  ),
  (
    'ริมแม่น้ำน่าน พิษณุโลก',
    'nan-river-community',
    'เส้นทางเดินเล่นริมแม่น้ำน่านใกล้ย่านเมืองเก่า เหมาะสำหรับชมบรรยากาศเมืองและแวะร้านอาหารท้องถิ่น',
    'community',
    'เมืองพิษณุโลก',
    'ริมแม่น้ำน่าน ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก',
    '{"daily":"open"}'::jsonb,
    'เข้าชมฟรี',
    null,
    null,
    16.823950,
    100.263890,
    'อำเภอเมืองพิษณุโลก',
    '/images/places/nan-river-community.jpg',
    array['river', 'walk', 'food'],
    array['วิวแม่น้ำน่าน', 'ย่านอาหารเย็น', 'เดินเชื่อมวัดสำคัญ'],
    array['ช่วงเย็นอากาศสบายกว่า', 'ระวังพื้นที่ลื่นหลังฝนตก', 'เหมาะเดินต่อจากวัดใหญ่'],
    array['wat-phra-si-rattana-mahathat', 'chan-palace'],
    '30 นาที-1 ชั่วโมง',
    'เย็น',
    'ทางเดินบางช่วงเรียบ แต่สภาพทางขึ้นกับจุดที่เข้าใช้งาน',
    'https://maps.google.com/?q=Nan+River+Phitsanulok',
    'draft',
    false,
    null
  )
on conflict (slug) do nothing;

insert into public.site_settings (key, value)
values (
  'site',
  '{"name":"พิษณุโลก เมืองสองแคว","hero":"บ้านเกิดที่เล่าใหม่ด้วยเว็บไซต์สมัยใหม่","contact":"contact@phitsanulok.local"}'
)
on conflict (key) do nothing;
