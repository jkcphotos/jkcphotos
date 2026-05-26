# JKC Photos — Astro + Sanity + Cloudflare Pages

Photography portfolio site for JKC Photos, built with Astro (frontend), Sanity CMS (content + images), and Cloudflare Pages (hosting).

---

## One-time setup

### 1. Create a Sanity project

Go to [sanity.io/manage](https://sanity.io/manage) → **New Project** → give it a name (e.g. "JKC Photos") → choose the **Production** dataset.

Copy the **Project ID** (8-character string shown on the project dashboard).

### 2. Configure environment variables

Edit `.env` and replace the placeholder values:

```
SANITY_STUDIO_PROJECT_ID=your_8char_project_id
SANITY_STUDIO_DATASET=production
PUBLIC_SANITY_PROJECT_ID=your_8char_project_id
PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token_here
```

To get a write token: Sanity dashboard → your project → **API** → **Tokens** → **Add API token** → choose **Editor** access.

> **Important:** `.env` is git-ignored and never deployed. The write token is only needed locally to run the seed script.

### 3. Install dependencies

```bash
npm install
```

### 4. Seed Sanity with all images and content

This uploads every image from `jkc_site/` into your Sanity project and creates all the CMS documents:

```bash
npm run seed
```

This takes a few minutes (uploads ~200+ images). It is **idempotent** — safe to re-run; it updates existing documents rather than duplicating them.

### 5. Verify locally

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) and confirm:
- Homepage shows hero image + featured work + all sections
- `/events/` lists all 6 event cards
- Each `/events/<slug>/` shows the full gallery
- `/portraits/` and `/nightlife/` show their galleries
- `/admin` loads the Sanity Studio (you can edit content here)

---

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → **Create a project** → connect your GitHub repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `20` (set in Environment Variables as `NODE_VERSION=20`)
4. Add environment variables in the Cloudflare Pages dashboard (Settings → Environment variables):
   ```
   SANITY_STUDIO_PROJECT_ID = your_8char_project_id
   SANITY_STUDIO_DATASET    = production
   PUBLIC_SANITY_PROJECT_ID = your_8char_project_id
   PUBLIC_SANITY_DATASET    = production
   ```
   Do **not** add `SANITY_WRITE_TOKEN` to Cloudflare — it's only for local seeding.
5. Deploy. First build triggers automatically.

### Connect Sanity webhook (auto-rebuild on publish)

1. In Cloudflare Pages → your project → Settings → **Deploy Hooks** → create a hook and copy the URL.
2. In Sanity dashboard → your project → **API** → **Webhooks** → **Create webhook**:
   - URL: paste the Cloudflare deploy hook URL
   - Trigger on: **Create, Update, Delete**
   - Filter: leave blank (trigger on any document)

Now every time you publish a change in `/admin`, Cloudflare automatically rebuilds and deploys the site.

---

## Day-to-day workflow

1. Go to `https://your-site.pages.dev/admin` (or your custom domain `/admin`)
2. Add / edit content (upload photos, update event galleries, edit text)
3. Click **Publish** in Sanity Studio
4. Cloudflare rebuilds the site automatically (~1-2 min)
5. Live site is updated

---

## Local development commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run seed` | Upload all legacy images + create Sanity documents |

---

## Project structure

```
jkc_site_V3/
├── src/
│   ├── components/       # Astro components
│   │   ├── global/       # Header, Footer, SEO, Button, Lightbox
│   │   ├── home/         # Homepage section components
│   │   ├── events/       # Event card + gallery components
│   │   ├── gallery/      # ImageTile, MasonryGallery, EditorialGrid
│   │   └── sanity/       # SanityImage (srcset + LQIP blur-up)
│   ├── layouts/          # BaseLayout, PortfolioLayout
│   ├── lib/              # Sanity client, urlFor, GROQ queries
│   ├── pages/            # Astro file-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── portraits.astro
│   │   ├── nightlife.astro
│   │   └── events/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── schemas/          # Sanity document + object schemas
│   ├── scripts/          # Client-side TS (lightbox, nav, reveal)
│   ├── styles/           # CSS split by concern
│   └── types/            # TypeScript types for Sanity docs
├── scripts/
│   └── seed-sanity.ts    # One-time image migration script
├── public/               # Static assets (_headers, _redirects, favicon, robots.txt)
├── jkc_site/             # Legacy static site (gitignored — source for seed script)
├── astro.config.mjs
├── sanity.config.ts
└── .env.example
```
