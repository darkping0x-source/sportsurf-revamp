-- Sportsurf revamp — core schema
-- Run against a Supabase Postgres project (or any Postgres with pgvector available).

create extension if not exists pgcrypto;
create extension if not exists vector;

create type product_category as enum (
  'surface_sports',
  'water_sports',
  'small_sports',
  'budget_sports',
  'sports_academies',
  'play_zones'
);

create type request_status as enum ('pending', 'approved', 'rejected');

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'visitor' check (role in ('visitor', 'admin')),
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  category product_category not null,
  name text not null,
  slug text not null unique,
  description text not null,
  specs jsonb not null default '{}'::jsonb,
  images text[] not null default '{}',
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client_name text,
  location text not null,
  state text not null,
  category product_category not null,
  description text not null,
  images text[] not null default '{}',
  completed_on date,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  sort_order int not null default 0
);

create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  location text,
  estimated_area text,
  message text,
  status request_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table chat_queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles (id) on delete set null,
  source text not null check (source in ('search', 'chatbot')),
  query text not null,
  response text,
  result_count int,
  created_at timestamptz not null default now()
);

create index products_embedding_idx on products using ivfflat (embedding vector_cosine_ops);
create index projects_embedding_idx on projects using ivfflat (embedding vector_cosine_ops);
create index chat_queries_created_at_idx on chat_queries (created_at desc);

-- Row Level Security: public read on catalog/content tables, owner/admin-gated elsewhere.
alter table products enable row level security;
alter table projects enable row level security;
alter table certifications enable row level security;
alter table profiles enable row level security;
alter table quote_requests enable row level security;
alter table chat_queries enable row level security;

create policy "products are publicly readable" on products for select using (true);
create policy "projects are publicly readable" on projects for select using (true);
create policy "certifications are publicly readable" on certifications for select using (true);

create policy "users read own profile" on profiles for select using (auth.uid() = id);
create policy "users update own profile" on profiles for update using (auth.uid() = id);

create policy "users read own quote requests" on quote_requests for select using (auth.uid() = user_id);
create policy "anyone can submit a quote request" on quote_requests for insert with check (true);

create policy "users read own chat queries" on chat_queries for select using (auth.uid() = user_id);
create policy "anyone can log a query" on chat_queries for insert with check (true);

-- Admin override: rows readable/writable by admins regardless of ownership.
create policy "admins manage products" on products for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "admins manage projects" on projects for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "admins manage certifications" on certifications for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "admins manage quote requests" on quote_requests for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "admins manage chat queries" on chat_queries for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Auto-create a profile row when a new auth user signs up.
create function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
