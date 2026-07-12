create table if not exists public.leads (
  id uuid primary key,
  full_name text not null,
  company_name text not null,
  email text not null,
  mobile_number text not null,
  country text not null,
  message text not null,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
