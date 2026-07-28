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
| `ALLOWED_ORIGINS` | `https://<your-domain>` | Production |

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

## 5. Custom domain (optional)

Vercel → Settings → Domains → add `noldan.uz`. Then update the absolute
URLs in `index.html` (`canonical`, `og:url`, `og:image`) and
`public/sitemap.xml`, which currently assume `https://noldan.uz/`.

## Before you share the link widely

- [ ] `og.png` — a 1200×630 social preview image in `public/`. The meta
      tags reference it; without the file, links share with no image.
- [ ] `DEMO_CORPUS` in `src/lib/bpe.ts` is placeholder Uzbek written by
      an AI. A native speaker should read those ~30 lines, or replace
      them with a slice of real training data. It runs live on the
      homepage demo.
- [ ] Homepage copy is English while the rest of the site is Uzbek.
      Decide whether that is intended.
- [ ] Transformer lessons 10–18 are `status: "soon"` and land on a
      near-empty page. They are linkable — consider whether that is the
      impression you want during a demo.

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
