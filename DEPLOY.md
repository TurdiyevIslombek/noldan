# Deploying Noldan

Host is **Vercel** (the tutor needs an edge function; a static-only host
cannot run it).

## 1. Push to GitHub

```bash
gh repo create noldan --public --source=. --remote=origin --push
```

Or manually: create an empty repo on github.com, then

```bash
git remote add origin git@github.com:<you>/noldan.git
git branch -M main
git push -u origin main
```

`.env`, `.env.local`, `.vercel` and the local agent tooling are gitignored.
Only `.env.example` (empty template) is committed — verify with
`git ls-files | grep env` before the first push.

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

`SITE_URL` is the one that is easy to forget. It is baked into
`canonical`, `og:image`, `robots.txt` and `sitemap.xml` at build time and
defaults to `https://noldan.uz`. Until that domain actually resolves,
leaving the default means **every shared link previews a dead host** and
canonical points somewhere that does not exist. Set it to the
`*.vercel.app` URL now, change it when the domain is live, redeploy.

`ALLOWED_ORIGINS` is comma-separated and only needed once you attach a
custom domain — the `*.vercel.app` URL is allowed automatically.

Deploy.

## 4. Verify the tutor is not an open door

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

## 5. Check the link preview

Paste the deployed URL into <https://cards-dev.twitter.com/validator> or
just into a Telegram chat with yourself. You should see the green
`og.png` card. If the image is missing, `SITE_URL` was wrong at build
time — fix it and redeploy (the value is baked in, not read at runtime).

## 6. Custom domain (optional)

Vercel → Settings → Domains → add `noldan.uz`. Then set `SITE_URL` to
`https://noldan.uz`, add the domain to `ALLOWED_ORIGINS`, and redeploy.
Nothing in the source needs editing.

## Regenerating the social card

`public/og.png` is generated, not hand-drawn:

```bash
node scripts/make-og.mjs && rsvg-convert -w 1200 -h 630 og.svg -o public/og.png
```

Needs `librsvg` (`brew install librsvg`) and Manrope + JetBrains Mono
visible to fontconfig — see the header comment in `scripts/make-og.mjs`.
Redo it whenever the headline changes.

## Before you share the link widely

- [ ] Transformer lessons 10–18 are `status: "soon"` and land on a
      near-empty page. They are linkable — consider whether that is the
      impression you want during a demo.
- [ ] The homepage says "27 dars — 18 tasi hozir tayyor". If you write
      more lessons, that sentence in `src/experience/Experience.tsx` does
      not update itself.

## Known, accepted

**`react-router` advisory GHSA-qwww-vcr4-c8h2 (high).** Affects
`>=7.12.0 <8.3.0`. It is an **RSC-mode CSRF bypass**; this app is a
client-side SPA using `BrowserRouter` with no RSC, no data routers and no
server actions, so the vulnerable path is unreachable. `npm audit fix`
does **not** resolve it — npm's only offer is a *downgrade* to 7.11.0
flagged semver-major. Revisit when upgrading to react-router 8.

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
