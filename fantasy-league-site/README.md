# Fantasy League Site

A static site for your fantasy football league:

- **Home** — "Ring of Honor" championship banners, League Superlatives, and the Wall of Shame
- **Standings** — live current-season standings, pulled from the ESPN Fantasy API
- **Draft** — draft board by round, for any season, pulled live
- **Recap** — a season-by-season breakdown: a written overview, the full playoff bracket, and the champion, for every year 2021–2025
- **Rules** — your league rules
- **Punishments** — your league punishments

Live data is fetched through a small Cloudflare Pages Function (`functions/api/league.js`)
that proxies and caches requests to ESPN — this avoids CORS issues and keeps you from
hammering ESPN's servers.

**Works with public leagues only.** Private leagues require ESPN login cookies, which
aren't handled here on purpose (you don't want personal credentials sitting in a GitHub repo).

---

## 1. Edit your league info

Open `js/config.js`. This is the only file you need to touch to get the site working:

- `leagueId` — from your ESPN league URL: `.../league?leagueId=123456`
- `seasons` — the years your league has existed
- `currentSeason` — the year that loads by default
- `history` — one entry per year for the championship banners (fill in by hand once a
  season wraps up — ESPN doesn't cleanly expose "who won" in the API across all years)
- `punishments` / `rules` — plain text, edit freely

---

## 2. Try it locally (optional but recommended)

You'll need [Node.js](https://nodejs.org) installed. Then, from the project folder:

```bash
npm install -g wrangler
wrangler pages dev .
```

This starts a local server (usually `http://localhost:8788`) that runs the site
**and** the API function together, so the live data actually works while testing.
If you just double-click `index.html` in a browser, the Standings/Draft pages
won't load data — they need the Cloudflare Function running.

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
The `functions/api/league.js` file is automatically picked up and deployed as part of
this — no extra setup needed.

From now on, every time you push to `main` on GitHub, Cloudflare redeploys automatically.

### Optional: custom domain

In your Pages project → **Custom domains** → **Set up a domain**. If the domain's
DNS is already on Cloudflare, this takes about a minute.

---

## League Superlatives & Season Recaps

Both of these are already filled in with real data from your 2021–2025 matchup history
(computed from a matchup log spreadsheet, cross-checked against ESPN's own API for 2021).

- `CONFIG.superlatives` in `js/config.js` — the 7 career stat cards on the home page.
- `RECAPS` in `js/recaps.js` — the written overview, playoff bracket, and champion for
  each season, shown on the Recap page.

**After the 2026 season wraps**, you'll want to add a new entry to `RECAPS` for that year
and update the superlatives if any records changed. The easiest path is the same one used
to build the current data: export a fresh matchup log (or ask for a fresh ESPN API pull)
and recompute. Alternatively, `scripts/calculate-superlatives.mjs` can recalculate the
superlatives directly from ESPN's live API if you'd rather not export a spreadsheet each
year — run it locally with `node scripts/calculate-superlatives.mjs` once the season is
final.

---

## 6. Updating things later

- **New champion each year:** add an entry to `history` in `js/config.js`, commit, push.
- **Rule change:** edit `rules` in `js/config.js`, commit, push.
- **New season starts:** add the year to `seasons` and update `currentSeason` in `js/config.js`.

Standings and draft data need no manual updates — they're live.

---

## Project structure

```
fantasy-league-site/
├── index.html              Home page (banners, superlatives, wall of shame)
├── standings.html          Live standings
├── draft.html               Live draft board
├── recap.html                Season-by-season recaps + playoff brackets
├── rules.html                League rules
├── punishments.html          League punishments
├── css/styles.css           All styling
├── js/
│   ├── config.js              ← edit this one most often
│   ├── api.js                  fetch helper + ESPN data shaping
│   ├── recaps.js                season overview + bracket data
│   ├── render-history.js        home page championship banners
│   ├── render-superlatives.js   home page stat cards
│   ├── render-shame.js          home page wall of shame
│   ├── render-standings.js      standings page logic
│   ├── render-draft.js          draft page logic
│   ├── render-recap.js          recap page logic
│   ├── render-rules.js          rules page logic
│   └── render-punishments.js    punishments page logic
├── scripts/
│   └── calculate-superlatives.mjs   run locally to refresh Superlatives
└── functions/api/league.js  Cloudflare Function — proxies + caches ESPN API calls
```

## A note on the ESPN API

ESPN's Fantasy API is public but **unofficial and undocumented** — field names have
been reverse-engineered by the community and can shift over time. If a page stops
showing data:

1. Open your browser's dev tools → Network tab, reload the page, and look at the
   response from `/api/league?...` to see the raw shape ESPN is returning.
2. Compare against [cwendt94/espn-api](https://github.com/cwendt94/espn-api), a
   well-maintained community reference for these endpoints.
3. Adjust the field lookups in `js/api.js` or the relevant `render-*.js` file.
