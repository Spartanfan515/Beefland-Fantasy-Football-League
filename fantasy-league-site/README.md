# Fantasy League Site

A static site for your fantasy football league:

- **Home** — "Ring of Honor" championship banners, one per year (manually entered, see below)
- **Standings** — live current-season standings, pulled from the ESPN Fantasy API
- **Draft** — draft board by round, for any season, pulled live
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

## Calculating League Superlatives

`js/config.js` has a `superlatives` array (Most Playoff Wins, Best Win %, Highest
Career PPG, etc.) that starts out full of placeholders — these need real season data
to fill in, which isn't something to fill in by hand.

Run this once locally (requires Node.js 18+):

```bash
node scripts/calculate-superlatives.mjs
```

It fetches every season from ESPN, calculates all 7 stats, and prints a ready-to-paste
`superlatives:` block — copy that into `js/config.js`, replacing the placeholder array.

A few judgment calls are baked into how it defines things (e.g. "playoff wins" only
counts the winners' bracket, "win %" uses regular season only) — the top of the script
explains each one and where to tweak it if you'd define a stat differently.

Re-run it any time after a season ends to refresh the numbers.

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
├── index.html              Home page (championship banners)
├── standings.html          Live standings
├── draft.html               Live draft board
├── rules.html               League rules
├── punishments.html         League punishments
├── css/styles.css           All styling
├── js/
│   ├── config.js             ← edit this one most often
│   ├── api.js                 fetch helper + ESPN data shaping
│   ├── render-history.js      home page banners
│   ├── render-standings.js    standings page logic
│   └── render-draft.js        draft page logic
├── scripts/
│   └── calculate-superlatives.mjs   run locally to fill in Superlatives
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
