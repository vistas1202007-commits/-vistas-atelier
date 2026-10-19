-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'proposal', 'won', 'lost')),
  score int not null default 0,
  name text not null,
  email text not null,
  company text,
  country text,
  service text not null,
  budget text,
  timeline text,
  brief text not null,
  source text
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Lock the table down: only the server (service role key) can read or write.
-- No policies are created, so the public anon key has no access at all.
alter table public.enquiries enable row level security;
