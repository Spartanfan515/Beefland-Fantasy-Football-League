# Fantasy League Site

A static site for your fantasy football league:

- **Home** — "Ring of Honor" championship banners, League Superlatives (Current Era + All-Time), and the Wall of Shame
- **Standings** — placeholder for now, see note below
- **Draft** — placeholder for now, see note below
- **Recap** — a season-by-season breakdown: a written overview, the full playoff bracket, and the champion, for every year 2021–2025
- **Rules** — your league rules
- **Punishments** — your league punishments

**A note on Standings and Draft:** these originally pulled live data from ESPN's Fantasy
API through a Cloudflare Pages Function, but that integration didn't work out reliably,
so it's been removed. The pages are still there and styled, just showing a "not connected
yet" message. When there's a working way to pull this data in (another ESPN API attempt,
a spreadsheet export like the one used for Superlatives and Recap, manual entry, etc.),
those two pages are ready to be wired back up.

---

## 1. Edit your league info

Open `js/config.js`. This is the file you'll touch most:

- `leagueName`, `tagline` — shown in the header and hero
- `seasons`, `currentSeason` — the years your league has existed
- `history` — one entry per year for the championship banners
- `superlativesCurrent` — career stats from just the last two seasons (2024–2025, the
  12-team years) — already filled in
- `superlativesAllTime` — the same 7 categories across full history since 2021 — already
  filled in
- `punishmentRules`, `punishments` — your league's punishment rules and yearly history
- `rules` — your league rules, by section

---

## 2. Try it locally (optional but recommended)

You'll need [Node.js](https://nodejs.org) installed. From the project folder:

```bash
npx serve .
```

Or any other static file server — this is a plain HTML/CSS/JS site now, no build step
and no server-side function to run.

---

## 3. Push it to GitHub

If you've never used git before, here's the full sequence. Run these from inside
the `fantasy-league-site` folder:

```bash
git init
git add .
git commit -m "Initial site"
```

Then create a new repository on GitHub:

1. Go to [github.com/new](https://github.com/new)
2. Name it something like `fantasy-league-site`
3. Leave it **empty** (don't add a README/gitignore there — you already have them)
4. Click **Create repository**
5. Copy the commands GitHub shows under "…or push an existing repository from the
   command line" — they'll look like this:

```bash
git remote add origin https://github.com/YOUR-USERNAME/fantasy-league-site.git
git branch -M main
git push -u origin main
```

---

## 4. Deploy on Cloudflare Pages

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Click **Create** → **Pages** → **Connect to Git**
3. Authorize Cloudflare to access GitHub, then select your `fantasy-league-site` repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**

Cloudflare will give you a URL like `fantasy-league-site.pages.dev` within a minute or two.

From now on, every time you push to `main` on GitHub, Cloudflare redeploys automatically.

### Optional: custom domain

In your Pages project → **Custom domains** → **Set up a domain**. If the domain's
DNS is already on Cloudflare, this takes about a minute.

---

## League Superlatives & Season Recaps

Both are already filled in with real data from your 2021–2025 matchup history, computed
from a matchup log spreadsheet (cross-checked against ESPN's own API for 2021).

- `CONFIG.superlativesCurrent` / `CONFIG.superlativesAllTime` in `js/config.js`
- `RECAPS` in `js/recaps.js` — overview, bracket, and champion per season, on the Recap page

**After the 2026 season wraps**, add a new entry to `RECAPS` for that year, and update
both superlatives arrays if any records changed (remember `superlativesCurrent` should
shift to cover 2025–2026 once 2026 is final, keeping it a rolling two-season window).
`scripts/calculate-superlatives.mjs` can also recalculate the all-time superlatives
directly from ESPN's live API if that ever starts working reliably — run it locally with
`node scripts/calculate-superlatives.mjs`.

---

## Updating things later

- **New champion each year:** add an entry to `history` in `js/config.js`, commit, push.
- **Rule change:** edit `rules` in `js/config.js`, commit, push.
- **New season starts:** add the year to `seasons` and update `currentSeason` in `js/config.js`.

---

## Project structure

```
fantasy-league-site/
├── index.html              Home page (banners, superlatives, wall of shame)
├── standings.html          Placeholder — not connected to a data source yet
├── draft.html               Placeholder — not connected to a data source yet
├── recap.html                Season-by-season recaps + playoff brackets
├── rules.html                League rules
├── punishments.html          League punishments
├── css/styles.css           All styling
├── js/
│   ├── config.js              ← edit this one most often
│   ├── recaps.js                season overview + bracket data
│   ├── render-history.js        home page championship banners
│   ├── render-superlatives.js   home page stat cards (current + all-time)
│   ├── render-shame.js          home page wall of shame
│   ├── render-recap.js          recap page logic
│   ├── render-rules.js          rules page logic
│   └── render-punishments.js    punishments page logic
└── scripts/
    └── calculate-superlatives.mjs   run locally against ESPN's API, if it's ever reconnected
```
