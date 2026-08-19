create table if not exists hale_profiles (
  user_id text primary key,
  program_slug text,
  goal text,
  experience text,
  training_place text,
  days_per_week text,
  unit text not null default 'kg',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists hale_set_logs (
  id serial primary key,
  user_id text not null,
  workout_id text not null,
  exercise_name text not null,
  set_index int not null,
  reps int not null,
  weight real not null,
  logged_on date not null default current_date,
  created_at timestamptz not null default now()
);
create index if not exists hale_set_logs_user_idx on hale_set_logs (user_id, logged_on);

create table if not exists hale_completions (
  id serial primary key,
  user_id text not null,
  workout_id text not null,
  completed_on date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, workout_id, completed_on)
);

create table if not exists hale_meals (
  id serial primary key,
  user_id text not null,
  logged_on date not null default current_date,
  meal text not null,
  name text not null,
  calories int,
  protein int,
  created_at timestamptz not null default now()
);
create index if not exists hale_meals_user_idx on hale_meals (user_id, logged_on);

create table if not exists hale_messages (
  id serial primary key,
  user_id text not null,
  role text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists hale_messages_user_idx on hale_messages (user_id, created_at);
