# Magazin

A free-to-read magazine website. No login, no subscription.

**Magazin** (this site) only displays content.  
**Sanity Studio** is a separate app where you upload articles.

## Quick start (magazine site)

```bash
npm install
npm run dev
```

Open http://localhost:5173 — demo articles show until Sanity is connected.

## Upload content (separate Sanity Studio)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` → `.env` and set your project ID:

```env
VITE_SANITY_PROJECT_ID=yourProjectId
VITE_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=production
```

3. Start the **separate** Sanity editor:

```bash
npm run studio
```

Studio opens on its own URL (usually http://localhost:3333). Upload Categories, Authors, and Articles there. Magazin reads them automatically.

4. In Sanity manage → API → CORS origins, add `http://localhost:5173`.

### Article flags (homepage layout)

- **Lead story** — main headline  
- **Featured** — opinion / features strip  
- **Live** — live block  

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Magazin website |
| `npm run studio` | Separate Sanity content editor |
| `npm run build` | Production build of Magazin |

## Stack

- Vite + React + Tailwind (Magazin site)
- Sanity CMS (separate Studio for uploads)
