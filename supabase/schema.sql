-- Meme Bingo Card Generator - Supabase Schema
-- Run this in your Supabase SQL editor to set up the memes cache table.

create table if not exists memes (
  id uuid default gen_random_uuid() primary key,
  external_id text not null,
  category text not null,
  url text not null,
  title text default '',
  cached_at timestamptz default now(),
  constraint unique_category_url unique (category, url)
);

create index if not exists idx_memes_category on memes(category);
create index if not exists idx_memes_cached_at on memes(cached_at);

-- Public can read; only the service role can insert/update (via API route)
alter table memes enable row level security;

create policy "Allow public read" on memes
  for select using (true);

create policy "Allow service role insert" on memes
  for insert to service_role with check (true);

create policy "Allow service role update" on memes
  for update to service_role using (true);
