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

-- Allow public read/write since memes aren't sensitive data
alter table memes enable row level security;

create policy "Allow public read" on memes
  for select using (true);

create policy "Allow public insert" on memes
  for insert with check (true);

create policy "Allow public update" on memes
  for update using (true);
