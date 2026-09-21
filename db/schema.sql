-- =====================================================================
-- Noldan — the whole database, in one file.
--
-- Apply with:  npm run db:migrate        (uses DATABASE_URL)
-- or paste it into the Neon SQL editor and press Run. Safe to run
-- again: every statement is "if not exists" / "on conflict do nothing".
--
-- Two halves:
--
--  1. Sign-in. The four tables Better Auth reads and writes, in exactly
--     the shape it expects (generated from better-auth 1.7 and made
--     re-runnable). The quoted camelCase names are the library's — do
--     not rename them.
--
--  2. The site's own tables: courses, entitlements, orders,
--     transactions, progress.
--
-- The browser never talks to this database. Every read and write goes
-- through /api, which checks the session cookie (or a payment
-- provider's signature) first. That is the whole security model: a
-- database nothing public can reach has no access rules to get wrong.
--
-- Money is an integer in the currency's minor unit — tiyin for UZS,
-- cents for USD. Never floats.
-- =====================================================================

-- ----------------------------------------------------------------- sign-in

create table if not exists "user" (
  "id"            text not null primary key,
  "name"          text not null,
  "email"         text not null unique,
  "emailVerified" boolean not null,
  "image"         text,
  "createdAt"     timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt"     timestamptz default CURRENT_TIMESTAMP not null
);

create table if not exists "session" (
  "id"        text not null primary key,
  "expiresAt" timestamptz not null,
  "token"     text not null unique,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz not null,
  "ipAddress" text,
  "userAgent" text,
  "userId"    text not null references "user" ("id") on delete cascade
);

create table if not exists "account" (
  "id"                    text not null primary key,
  "accountId"             text not null,
  "providerId"            text not null,
  "userId"                text not null references "user" ("id") on delete cascade,
  "accessToken"           text,
  "refreshToken"          text,
  "idToken"               text,
  "accessTokenExpiresAt"  timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  "scope"                 text,
  "password"              text,
  "createdAt"             timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt"             timestamptz not null
);

create table if not exists "verification" (
  "id"         text not null primary key,
  "identifier" text not null,
  "value"      text not null,
  "expiresAt"  timestamptz not null,
  "createdAt"  timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt"  timestamptz default CURRENT_TIMESTAMP not null
);

create index if not exists "session_userId_idx" on "session" ("userId");
create index if not exists "account_userId_idx" on "account" ("userId");
create index if not exists "verification_identifier_idx" on "verification" ("identifier");

-- ----------------------------------------------------------------- courses
-- Catalogue + price list. Lesson TEXT is not here (it ships from
-- content/ and api/_content); the price and the free/paid flag are, so a
-- price can change without a redeploy.
create table if not exists courses (
  id           text primary key,              -- 'tokenizator', 'transformer'
  name         text not null,
  access       text not null default 'paid' check (access in ('free', 'paid')),
  price_uzs    bigint not null default 0,     -- tiyin
  price_usd    bigint not null default 0,     -- cents
  is_published boolean not null default true
);

insert into courses (id, name, access, price_uzs, price_usd) values
  ('tokenizator', 'Tokenizator qurish',       'free', 0,        0),
  ('transformer', 'Transformer (GPT) qurish', 'paid', 24900000, 1900)
on conflict (id) do nothing;
-- 24 900 000 tiyin = 249 000 so'm (a placeholder). 1900 cents = $19.

-- ------------------------------------------------------------ entitlements
-- "This user may read this course." Written only by the payment path.
-- expires_at null = forever, which is what a one-time purchase grants.
create table if not exists entitlements (
  id         uuid primary key default gen_random_uuid(),
  user_id    text not null references "user" ("id") on delete cascade,
  course_id  text not null references courses on delete cascade,
  source     text not null check (source in ('purchase', 'grant', 'trial')),
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  unique (user_id, course_id)
);
create index if not exists entitlements_user_idx on entitlements (user_id);

-- ------------------------------------------------------------------ orders
-- One row per attempt to buy, created before the student is sent to the
-- provider, so the provider always has a real order to ask about.
create table if not exists orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    text not null references "user" ("id") on delete cascade,
  course_id  text not null references courses on delete restrict,
  provider   text not null check (provider in ('payme', 'click', 'uzum', 'stripe')),
  amount     bigint not null check (amount > 0),   -- minor units
  currency   text not null default 'UZS' check (currency in ('UZS', 'USD')),
  state      text not null default 'pending'
             check (state in ('pending', 'paid', 'cancelled', 'failed')),
  created_at timestamptz not null default now(),
  paid_at    timestamptz
);
create index if not exists orders_user_idx on orders (user_id);

-- ------------------------------------------------------------ transactions
-- The provider's view of an order. Payme re-drives this state machine at
-- will and expects the SAME answer every time, so every method is
-- answered from this row rather than recomputed.
create table if not exists transactions (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references orders on delete cascade,
  provider        text not null check (provider in ('payme', 'click', 'uzum', 'stripe')),
  provider_txn_id text not null,
  state           text not null default 'created'
                  check (state in ('created', 'performed', 'cancelled')),
  amount          bigint not null,
  -- Provider-native epoch milliseconds, stored exactly as given: Payme
  -- sends and expects these numbers back, and a round trip through
  -- timestamptz would not return them unchanged.
  create_time     bigint,
  perform_time    bigint default 0,
  cancel_time     bigint default 0,
  reason          int,
  created_at      timestamptz not null default now(),
  unique (provider, provider_txn_id)
);
create index if not exists transactions_order_idx on transactions (order_id);

-- ---------------------------------------------------------------- progress
-- So a student who signs in on their phone sees where they got to on
-- their laptop.
create table if not exists progress (
  user_id      text not null references "user" ("id") on delete cascade,
  course_id    text not null,
  lesson_id    text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, lesson_id)
);
