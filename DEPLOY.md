# Deploying Noldan

Host is **Vercel** (the tutor needs an edge function; a static-only host
cannot run it).

## Launch — the whole thing, in order

1. **Push to GitHub** — section 1.
2. **Import into Vercel** and deploy on the free `*.vercel.app` address
   first — section 3. Check it works before touching the domain.
3. **Accounts and payments** (database, Telegram/Google sign-in, Payme,
   Click) — sections 4–8. The free course works without them; the paid
   course and sign-in do not.
4. **Buy the domain and attach it** — section 10.
5. **Point the site at the domain**: set `SITE_URL`, regenerate the
   share card, redeploy — section 10.
6. **Tell Google, Yandex and Bing** — section 11.

## After launch: updating the site

Every change goes live the same way: it is pushed to GitHub, Vercel
rebuilds, and about a minute later the site has it. Nothing is submitted
anywhere by hand — the lesson pages, the lesson list, the course sidebar
and `sitemap.xml` all rebuild themselves from the files.

**A new lesson.** Send the `.md` file, or add it yourself:

```bash
npm run add:lesson -- ~/Downloads/noldan-1-dars-10.md
```

It saves `content/tokenizator/dars-10.md` without the production notes
(animation prompts, video script — never published), lists the
animations those notes name, and runs every lesson's code against the
output printed in the lessons. Then mark where each animation goes,
one line where it belongs:

```
<!-- animatsiya: l1 | Title -->
```

**A video for an animation.** Name the file after its id — `c1.mp4`,
`l2.mp4` … (the letter advances with each lesson: Dars 01 `c`, Dars 02
`d`, … Dars 09 `k`, Dars 10 `l`) — and:

```bash
npm run add:video -- ~/Downloads/l1.mp4 dars-10
```

It shrinks the video for the web (Dars 01's three went from 15 MB to
2.4 MB with no visible difference) and saves it to
`public/media/tokenizator/dars-10/l1.mp4`. The lesson plays it at its
marker, silently and on a loop while it is on screen.

**A YouTube video for the whole lesson.** One line in the lesson's
header: `> **Video:** https://youtu.be/…`

**Then publish:**

```bash
git add -A
git commit -m "Add Dars 10"
git push
```

**Without this computer:** on github.com open the repo →
`content/tokenizator/` → **Add file → Upload files** (or open a lesson,
press the pencil to edit it) → **Commit changes**. Vercel deploys it the
same way. Videos uploaded like this are not shrunk — keep them under
about 8 MB.

## Google and updates — what to expect

- **You never have to ask Google to re-check the site.** Google comes
  back on its own, and reads `sitemap.xml` — which lists every lesson
  with the date it last changed — to see what is new. The sitemap is
  submitted once, at launch (section 11); after that it keeps itself
  up to date.
- **Updating the site never takes it out of Google.** Pages already in
  search stay there while Google re-reads them. There is no "wait for
  approval" after a change.
- **A new lesson usually appears within a few days.** To hurry one
  page: Search Console → **URL inspection** → paste its address →
  **Request indexing**. Optional.
- **A brand-new domain is slow the first time.** Expect the first pages
  to appear within days and the whole site within a few weeks. That is
  normal and not something to fix.
- **What Google reads.** Every public page is built as real HTML at
  deploy time (`scripts/prerender.mjs`): its own title, description,
  canonical address, structured data, and — for free lessons — the full
  lesson text. Google does not have to run the app to see the content.

## 1. Push to GitHub

The repo is public — it doubles as the project's portfolio — so nothing
secret is in it. Keys live only in Vercel's settings and in your own
`.env.local`; git ignores `.env*` (except the empty `.env.example`),
`.vercel`, local notes and agent tooling. Check before the first push:

```bash
git ls-files | grep -i env      # must print only .env.example
npm run build && npm run test:payments && npm run check:lessons
```

**Commit e-mail.** GitHub → Settings → Emails → tick *Keep my email
addresses private* and copy the `…@users.noreply.github.com` address,
then `git config user.email "<that address>"`. Commits count on your
profile without your personal address being public.

Once on this computer, log in (GitHub.com → HTTPS → log in with a web
browser):

```bash
gh auth login
```

Then create the repo and push:

```bash
git branch -M main
gh repo create noldan --public --source=. --remote=origin --push \
  --description "Build AI from scratch, in Uzbek — a free course that starts with the tokenizer"
```

## 2. Get a model key

Free tier, open-weight Llama: <https://console.groq.com/keys>

Alternatives the proxy also accepts: `OPENROUTER_API_KEY`, `HF_TOKEN`.
It uses whichever it finds first.

## 3. Import into Vercel

<https://vercel.com/new> → pick the repo. Framework preset **Vite** is
detected automatically; leave build command and output directory alone.

Before the first deploy, add under **Settings → Environment Variables**:

| Name | Value | Environments |
|---|---|---|
| `GROQ_API_KEY` | your key | Production, Preview |
| `SITE_URL` | `https://<your-app>.vercel.app` | Production |
| `ALLOWED_ORIGINS` | `https://<your-domain>` | Production |
| `VITE_GITHUB_URL` | `https://github.com/<you>/noldan` | Production, Preview |

Accounts and payments need more variables — see sections 4 and 5, and
`.env.example` for the annotated list.

`SITE_URL` is the one that is easy to forget. It is baked into
`canonical`, `og:image`, `robots.txt`, `sitemap.xml` and every
pre-rendered page at build time and
defaults to `https://noldan.uz`. Until that domain actually resolves,
leaving the default means **every shared link previews a dead host** and
canonical points somewhere that does not exist. Set it to the
`*.vercel.app` URL now, change it when the domain is live, redeploy.

`ALLOWED_ORIGINS` is comma-separated and only needed once you attach a
custom domain — the `*.vercel.app` URL is allowed automatically.

Deploy.

## 4. Accounts — database and sign-in

Students sign in with **Telegram** or **Google**: one tap, no password,
no confirmation email. The sign-in code runs inside this project's own
`/api` (Better Auth) and the accounts live in your own Postgres
database — no auth company in between, nothing to pay at this size.

Six variables, all server-side. None has a `VITE_` prefix and none may
ever get one: anything prefixed `VITE_` is compiled into JavaScript
every visitor downloads.

| Name | From |
|---|---|
| `DATABASE_URL` | step 1 (Vercel sets it for you) |
| `BETTER_AUTH_SECRET` | step 2 |
| `TELEGRAM_CLIENT_ID`, `TELEGRAM_CLIENT_SECRET` | step 3 |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | step 4 |

Below, `https://<host>` means the address the site is on right now —
the `*.vercel.app` one until the domain is attached. When the domain
arrives, add its addresses in steps 3 and 4 as well (section 10).

**1. Database — Neon, free.** In Vercel: the project → **Storage** →
**Create Database** → **Neon** → free plan, region **Frankfurt**
(`eu-central-1`). The site's functions run in Frankfurt too (`regions`
in `vercel.json`), so the two sit side by side, close to Uzbekistan.
Connect it to the project; Vercel adds `DATABASE_URL` by itself.

Then create the tables, once: open the database in Neon's console →
**SQL Editor**, paste all of `db/schema.sql`, press **Run**. (Or, on a
computer with the project: put the `DATABASE_URL` line into `.env.local`
and run `npm run db:migrate`.) Running it again is harmless.

The free plan sleeps after five minutes without queries and wakes by
itself on the next one, in well under a second. Nothing is ever paused
for you to restore by hand, and visitors who are not signed in never
touch the database at all.

**2. Secret.** Any long random string, as `BETTER_AUTH_SECRET`
(Production and Preview). To make one:

```bash
openssl rand -base64 32
```

Changing it later signs everyone out; no data is lost.

**3. Telegram.** In Telegram, open **@BotFather**:

- send `/newbot`, give it a name (`Noldan`) and a username ending in
  `bot` (e.g. `noldan_uz_bot`). Its name and photo are what students see
  on Telegram's "log in" screen;
- open the BotFather mini app → your bot → **Login Widget**;
- under **Allowed URLs** add `https://<host>` and
  `https://<host>/api/auth/callback/telegram`;
- the same screen shows the **Client ID** and **Client Secret** → add
  them as `TELEGRAM_CLIENT_ID` and `TELEGRAM_CLIENT_SECRET`.

**4. Google.** <https://console.cloud.google.com> → create a project
called `Noldan`, then open **Google Auth Platform** (also reachable as
APIs & Services → OAuth consent screen):

- **Get started**: app name `Noldan`, your email as the support email,
  audience **External**;
- **Audience** → **Publish app**, so anyone can sign in, not only test
  users. Only name, email and photo are requested, so Google does not
  need to review the app;
- **Clients** → **Create client** → **Web application**. Authorized
  JavaScript origin: `https://<host>`. Authorized redirect URI:
  `https://<host>/api/auth/callback/google`;
- copy the **Client ID** and **Client secret** → `GOOGLE_CLIENT_ID` and
  `GOOGLE_CLIENT_SECRET`.

**Redeploy** after adding variables. `/kirish` shows a button for every
provider that has both of its variables, so you can launch with one and
add the other later. With none, the page says accounts are coming soon
and points to the free course.

**Check it:** open `/kirish` and sign in with each button. You land on
the lessons page, and `/hisobim` shows your name.

**Changing prices** is a SQL update in Neon's SQL Editor, not a
redeploy:

```sql
update courses set price_uzs = 29900000 where id = 'transformer';
```

(`price_uzs` is in **tiyin** — 29 900 000 tiyin = 299 000 so'm.)

**Giving someone a course by hand** (a scholarship, a friend):

```sql
insert into entitlements (user_id, course_id, source)
select id, 'transformer', 'grant' from "user" where email = 'friend@gmail.com';
```

Telegram accounts have no email. Find them by name with
`select id, name from "user" order by "createdAt" desc;` and use the
`id` in place of the `select`.

**On your own computer**, with no accounts at all: `npm run db:dev`
starts a throwaway Postgres (nothing to install) and prints a
`DATABASE_URL`. Put that and any `BETTER_AUTH_SECRET` into `.env.local`
and run `npm run dev`. Telegram and Google only send people back to
addresses registered with them, so real sign-in is tried on the
deployed site.

## 5. Payments — Payme and Click

Stripe does not onboard businesses in Uzbekistan, and your students pay
with **Uzcard** and **Humo**, which Stripe cannot charge at all. The
rails that work here are Payme and Click. Both require a registered
legal entity (YaTT or MChJ) with an INN and a bank account before they
will issue production credentials.

Until that exists, everything runs against the sandboxes and the code
does not change — only the environment variables do.

### Payme

Register at <https://business.payme.uz>. In the merchant cabinet:

- **Endpoint:** `https://<your-host>/api/payme`
- **Account field:** `order_id` (this must match exactly — the code
  reads `params.account.order_id`)

| Variable | Where from |
|---|---|
| `PAYME_MERCHANT_ID` | cabinet |
| `PAYME_KEY` | cabinet — test key while in sandbox |
| `PAYME_CHECKOUT_URL` | `https://test.paycom.uz` in sandbox, `https://checkout.paycom.uz` in production |

Payme certifies a merchant by driving deliberate failures and checking
the exact JSON-RPC error code that comes back. `npm run test:payments`
covers those branches — run it before submitting for certification.

### Click

Register at <https://merchant.click.uz>. Both callbacks point at the
same URL; the handler distinguishes them by `action`:

- **Prepare:** `https://<your-host>/api/click`
- **Complete:** `https://<your-host>/api/click`

| Variable | Where from |
|---|---|
| `CLICK_SERVICE_ID` | cabinet |
| `CLICK_MERCHANT_ID` | cabinet |
| `CLICK_SECRET_KEY` | cabinet — **secret** |

### Selling in USD later

The diaspora cannot pay in so'm and Stripe will not onboard a UZ entity,
so a USD rail needs a company abroad (a US LLC or an Estonian OÜ) before
any code matters. When that exists it is a new adapter next to
`api/payme.ts`, not a rewrite: orders, entitlements and the grant path
are already provider-neutral, and `orders.provider` / `orders.currency`
already accept it.

## 6. Verify the paywall actually holds

The important property is that paid lesson text is **not in the
bundle**. Check it directly after a build:

```bash
npm run build && grep -rl "<a sentence from a paid lesson>" dist/ || echo "not in bundle — correct"
```

Use any sentence from the first Transformer lesson (the course has no
lessons yet — do this once it does). If it ever appears in `dist/`,
something has imported `api/_content` from `src/` and the paywall has
become decorative — the lock would still draw, but the text would be
one devtools panel away.

Then, against the deployed site:

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://<your-host>/api/lesson?course=transformer&lesson=dars-01"
```

**Expect `402`** (or `404` while the course has no lessons). A `200`
means the entitlement check is not running.

## 7. Run the payment tests

```bash
npm run test:payments
```

41 assertions against both state machines, on a real Postgres that runs
inside the test (PGlite, loaded with `db/schema.sql`):
replayed callbacks, wrong amounts, forged signatures, cancels after
capture, expired transactions, and the exact error codes each provider
certifies against. These are the ones that matter — both providers
retry, so "works once" is not the bar.

## 8. Verify the tutor is not an open door

After deploying, from your own machine:

```bash
curl -i -X POST https://<your-app>.vercel.app/api/tutor \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://evil.example' \
  -d '{"messages":[{"role":"user","content":"salom"}]}'
```

**Expect `403`.** If you get a streamed answer, `ALLOWED_ORIGINS` is
misconfigured — fix it before sharing the link anywhere.

Then open the site and ask the tutor a question in a lesson. It should
answer with no key setup on the visitor's side.

## 9. Check the link preview

Paste the deployed URL into a Telegram chat with yourself. You should see
the night-sky card (`public/og.png`). If the image is missing,
`SITE_URL` was wrong at build time — fix it and redeploy (the value is
baked in, not read at runtime).

## 10. Your domain

1. **Buy it** — at Hostinger, or any registrar.
2. **Add it in Vercel**: the project → **Settings → Domains** → add
   `yourdomain.com`, then `www.yourdomain.com` set to redirect to the
   bare domain. Vercel lists the DNS records it wants. Use exactly the
   values it shows — at the time of writing, `A` for `@` →
   `76.76.21.21` and `CNAME` for `www` → `cname.vercel-dns.com`.
3. **Enter them at Hostinger**: hPanel → **Domains** → your domain →
   **DNS / Nameservers** → **DNS records**.
   - Delete Hostinger's default `A` record for `@` and `CNAME` for `www`
     — they point at its parking page and would win over Vercel's.
   - Add the `A` and `CNAME` records from step 2; leave TTL as it is.

   Vercel's Domains page turns green when DNS has spread — usually
   minutes, sometimes a few hours — and HTTPS is issued automatically.
4. **Point the site at it**, in Vercel → Settings → Environment
   Variables:
   - `SITE_URL` = `https://yourdomain.com` (no trailing slash)
   - `ALLOWED_ORIGINS` = `https://yourdomain.com,https://www.yourdomain.com`
5. **Update the share card's address** and push:
   `SITE_URL=https://yourdomain.com npm run og`
6. **Redeploy.** Canonical addresses, the sitemap, robots.txt and the
   payment return address are all built from `SITE_URL`.
7. **Check**: open `https://yourdomain.com/learn/tokenizator/dars-01`
   directly, then *View Page Source* — you should see the lesson's own
   `<title>` and its text inside `<div id="root">`. Open a made-up
   address such as `/abc` — it should say "Bu sahifa topilmadi".
8. **Payment providers**: update the callback URLs registered with
   Payme and Click to the new domain (section 5).
9. **Sign-in**: add the new domain's two addresses from section 4 in
   @BotFather (Login Widget → Allowed URLs) and in Google (the client's
   JavaScript origin and redirect URI). Keep the `*.vercel.app` ones
   until the new ones work, then remove them.

## 11. Google Search Console, Yandex, Bing

Do this after section 10, on the final domain.

**Google Search Console** — <https://search.google.com/search-console>

1. Add property → **Domain** → `yourdomain.uz`.
2. Google shows a `TXT` record. Add it at the registrar's DNS settings,
   wait a few minutes, press **Verify**. (A Domain property covers
   `www`, `http` and `https` at once.)
3. **Sitemaps** → enter `sitemap.xml` → Submit.
4. **URL inspection** → paste the homepage → **Request indexing**. Do
   the same for `/learn` and the first lesson.
5. Come back in a week: **Pages** shows what is indexed and why anything
   is not.

**Yandex Webmaster** — <https://webmaster.yandex.com> — worth doing:
Yandex is widely used in Uzbekistan. Add the site, verify (DNS or the
meta-tag option), then add `https://yourdomain.uz/sitemap.xml` under
Indexing → Sitemap files.

**Bing Webmaster Tools** — <https://www.bing.com/webmasters> — sign in
and choose **Import from Google Search Console**; it copies the site
and sitemap in one step.

## Regenerating the social card

`public/og.png` is generated in the landing page's style by the Chrome
already installed on the machine (headless) — no extra tools:

```bash
SITE_URL=https://yourdomain.uz npm run og
```

The address printed at the bottom of the card comes from `SITE_URL`.

## Before you share the link widely

- [ ] The Transformer course has no lessons yet. The site shows it as
      "Tez orada" everywhere and the account page will not sell it while
      it is empty. Add its lessons (as Markdown in
      `content/transformer/`) before setting a price.
- [ ] **Paid lessons and a public repo do not mix.** Everything in this
      repo can be read on GitHub, `content/transformer/` included. Before
      adding paid lessons, keep their files out of the public repo (a
      private repo, or the database) — otherwise anyone can read on
      GitHub what the paywall protects on the site.
- [ ] Set a real price. `db/schema.sql` seeds 249 000 so'm as a
      placeholder, not a recommendation.
- [ ] Sign in on the deployed site with both buttons, and buy the
      course with a real card, once. The sandbox proves the protocol;
      only a real charge proves the merchant contract, the settlement
      account and the return URL.

## Known, accepted

**`react-router` advisory GHSA-qwww-vcr4-c8h2 (high).** Affects
`>=7.12.0 <8.3.0`. It is an **RSC-mode CSRF bypass**; this app is a
client-side SPA using `BrowserRouter` with no RSC, no data routers and no
server actions, so the vulnerable path is unreachable. `npm audit fix`
does **not** resolve it — npm's only offer is a *downgrade* to 7.11.0
flagged semver-major. Revisit when upgrading to react-router 8.

**Payments are one-time purchases, not subscriptions.** `entitlements`
carries an `expires_at` and `hasCourseAccess` (`api/_lib/access.ts`) already honours it, so
recurring billing is a schema that is ready rather than a rewrite — but
nothing renews anything today, and Payme/Click recurring billing needs
card tokenisation that is not implemented.

**Progress is written to the account but still read from localStorage
in the Loyiha page.** `api/progress.ts` and the `progress` table work
and `/api/me` returns the rows; `src/experience/Project.tsx` has not
been migrated onto them yet, so a signed-in student's Loyiha checklist
is still per-device.

**Rate limiting is best-effort.** `api/tutor.ts` keeps an in-memory
per-IP window, but edge instances are ephemeral and not shared, so it
thins abuse rather than stopping it. If the site gets real traffic, put
Vercel's WAF/rate-limit in front of `/api/tutor`, or move the counter to
Upstash/Vercel KV.

**The demo corpus is 108 sentences.** `src/lib/bpe.ts` trains the
homepage tokenizer on real Uzbek sampled from the
[Uzbek Corpus Sample](https://github.com/elmurod1202/Uzbek-Corpus-Sample)
(CC BY 4.0), normalised to `ʻ` (U+02BB). It is enough to reach the 700
vocab ceiling and show honest compression on a held-out sentence, but it
is a demo, not a training set. Attribution is in the file header and
must stay there.
