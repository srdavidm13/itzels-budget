# Itzel's Budget App — Project Log

## Overview
A personal budget planner and monthly expense tracker tailored for Itzel.
Alberta (Canada) tax calculations, budget planning, and month-by-month spending tracking.

**Live URL:** https://itzels-budget.vercel.app
**GitHub:** https://github.com/srdavidm13/itzels-budget
**Vercel project:** srdavidm13s-projects / itzels-budget

---

## Architecture

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS — single `index.html` |
| Hosting | Vercel (static + serverless) |
| API routes | Vercel serverless functions (`api/get.js`, `api/set.js`) |
| Data storage | Private GitHub Gist (cloud, syncs across devices) |
| Icons | Tabler Icons v2.47.0 (CDN) |
| Source control | GitHub — `srdavidm13/itzels-budget` |

### Storage flow
1. On load: `GET /api/get` → fetches `budget.json` from private GitHub Gist
2. On any change: `POST /api/set` → writes updated JSON to the same Gist
3. Env vars on Vercel: `GITHUB_TOKEN` (encrypted) and `GIST_ID` (plain)
4. Gist ID: `06fc391654cd950ac73237e9cddbb9ef` (private)

### File structure
```
/
├── index.html          # Entire frontend app
├── api/
│   ├── get.js          # GET /api/get  — loads data from Gist
│   └── set.js          # POST /api/set — saves data to Gist
├── package.json        # Node 20.x, no dependencies
├── vercel.json         # Build config: @vercel/static + @vercel/node
├── .gitignore
└── CLAUDE.md           # This file
```

---

## Budget categories

| Category | Group | Default |
|---|---|---|
| Rent | Fixed | $1,300 |
| Utilities | Fixed | $150 |
| Internet | Fixed | $70 |
| Phone | Fixed | $60 |
| Student loans | Fixed | $200 |
| Car insurance | Fixed | $180 |
| Gas | Fixed | $150 |
| Personal care | Lifestyle | $150 |
| Subscriptions | Lifestyle | $40 |
| Entertainment | Lifestyle | $200 |
| Investing (her own) | Future | $200 |

Child benefit: $400/month (2 girls × $200) — noted as sent to dad for RESP.

## Tax model
- 2025 Alberta + Federal brackets
- CPP: 5.95% on earnings $3,500–$71,300
- EI: 1.64% on earnings up to $65,700
- Federal BPA: $16,129 | Alberta BPA: $22,323

---

## Changelog

### v1.1.0 — 2026-06-21
**Cloud storage via GitHub Gist**
- Replaced `localStorage` with cloud storage: data now syncs across all devices
- Added `api/get.js` — serverless function to load data from private GitHub Gist
- Added `api/set.js` — serverless function to save data to private GitHub Gist
- Added `package.json` for Node.js 20.x runtime declaration
- Updated `vercel.json` to build both static HTML and serverless API routes
- Added `GITHUB_TOKEN` and `GIST_ID` as Vercel environment variables

### v1.0.0 — 2026-06-21
**Initial release**
- Converted original `budget-app-html.html` to `index.html` for Vercel compatibility
- Fixed storage: replaced non-standard `window.storage` API with `localStorage`
- Added `vercel.json` for static deployment
- Added `.gitignore`
- Initialized git repo on `main` branch
- Created GitHub repo `srdavidm13/itzels-budget`
- Deployed to Vercel: https://itzels-budget.vercel.app

---

## How to deploy changes

```bash
cd "/Users/srdavidm/Documents/Itzel's Budget App"
git add -p                          # stage changes
git commit -m "your message"
git push origin main                # triggers Vercel auto-deploy
```

Or force a manual Vercel deploy:
```bash
vercel --yes --prod --scope srdavidm13s-projects
```

---

## Notes
- The original source file `budget-app-html.html` is kept for reference but not deployed.
- All tax brackets are for the 2025 tax year and may need updating annually.
- Data is stored as a single JSON blob in the Gist file `budget.json`.
- The app is public (anyone with the URL can view it), but all data lives in the private Gist which is only accessible via the server-side API routes.
