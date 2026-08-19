create table if not exists hale_leads (
  id serial primary key,
  name text not null,
  email text not null,
  phone text,
  goal text not null,
  notes text,
  source text not null default 'instagram',
  emailed boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists hale_leads_created_idx on hale_leads (created_at desc);
