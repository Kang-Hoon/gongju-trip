-- K-Trip Planner: Supabase schema
-- Run this once in Supabase → SQL Editor.

-- 1) Theme votes: "What is this city's main theme for you?"
create table if not exists public.theme_votes (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  city_id     text not null check (char_length(city_id) <= 40),
  theme_id    text not null check (char_length(theme_id) <= 40),
  lang        text check (lang in ('en', 'ko')),
  visitor_id  text not null check (char_length(visitor_id) <= 64)
);

-- One vote per visitor per city (re-votes are ignored by the unique index)
create unique index if not exists theme_votes_one_per_visitor
  on public.theme_votes (city_id, visitor_id);

-- 2) Survey responses after a plan is generated
create table if not exists public.survey_responses (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  city_id       text not null check (char_length(city_id) <= 40),
  rating        smallint check (rating between 1 and 5),
  realistic     text check (realistic in ('yes', 'somewhat', 'no')),
  would_use     text check (would_use in ('yes', 'maybe', 'no')),
  next_city     text check (char_length(next_city) <= 80),
  comment       text check (char_length(comment) <= 1000),
  lang          text check (lang in ('en', 'ko')),
  settings      jsonb,   -- days, start/end time, transport, origin
  profile       jsonb,   -- taste percentages from the quiz
  visitor_id    text not null check (char_length(visitor_id) <= 64)
);

-- 3) Public vote totals (the only thing anonymous visitors can read)
create or replace view public.theme_vote_counts
with (security_invoker = false) as
  select city_id, theme_id, count(*)::int as votes
  from public.theme_votes
  group by city_id, theme_id;

-- 4) Row-level security: anonymous users may insert, never read raw rows
alter table public.theme_votes enable row level security;
alter table public.survey_responses enable row level security;

drop policy if exists "anon can vote" on public.theme_votes;
create policy "anon can vote" on public.theme_votes
  for insert to anon with check (true);

drop policy if exists "anon can answer survey" on public.survey_responses;
create policy "anon can answer survey" on public.survey_responses
  for insert to anon with check (true);

grant insert on public.theme_votes, public.survey_responses to anon;
grant select on public.theme_vote_counts to anon;
revoke select on public.theme_votes, public.survey_responses from anon;

-- Handy queries for you (run in the SQL editor, not exposed to visitors):
-- select * from theme_vote_counts order by city_id, votes desc;
-- select city_id, round(avg(rating), 2) as avg_rating, count(*) from survey_responses group by city_id;
-- select created_at, city_id, rating, realistic, would_use, next_city, comment from survey_responses order by created_at desc;
