document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

// ------------------------------------------------------------------
// Some site data sources spell the same manager's name differently --
// records.js/config.js/h2h.js use "Ben Schon", while drafts.js/recaps.js
// (and this trade data, which comes from the same trade log) use
// "Benjamin Schon". render-recap.js already works around this exact
// inconsistency with a name map; we do the same so this page's stats
// merge onto one person instead of silently splitting him into two
// (which was otherwise causing him to show up as a false "NPC" despite
// having the most trades in the league).
// ------------------------------------------------------------------
const OWNER_ALIASES = { "Benjamin Schon": "Ben Schon" };
function canonicalOwner(name) {
  return OWNER_ALIASES[name] || name;
}

// ------------------------------------------------------------------
// Derived data: each owner's current team name, and career NTV/trade
// totals, both computed straight from TRADES so this page never goes
// stale relative to the underlying trade data.
// ------------------------------------------------------------------
function latestTeamByOwner() {
  const seen = {};
  TRADES.forEach((t) => {
    [
      [canonicalOwner(t.ownerA), t.teamA],
      [canonicalOwner(t.ownerB), t.teamB],
    ].forEach(([owner, team]) => {
      const season = t.season;
      if (!seen[owner] || season >= seen[owner].season) {
        seen[owner] = { team, season };
      }
    });
  });
  const out = {};
  Object.keys(seen).forEach((o) => (out[o] = seen[o].team));
  return out;
}
const TEAM_OF_OWNER = latestTeamByOwner();

function computeManagerStats() {
  const stats = {};
  TRADES.forEach((t) => {
    [
      [canonicalOwner(t.ownerA), t.ntvA],
      [canonicalOwner(t.ownerB), t.ntvB],
    ].forEach(([owner, ntv]) => {
      if (!stats[owner]) stats[owner] = { ntv: 0, trades: 0 };
      stats[owner].ntv += ntv;
      stats[owner].trades += 1;
    });
  });
  return stats;
}
const MANAGER_STATS = computeManagerStats();

function fmtSigned(n) {
  const r = Math.round(n * 10) / 10;
  const sign = r > 0 ? "+" : r < 0 ? "−" : "";
  return sign + Math.abs(r).toFixed(1);
}

// ------------------------------------------------------------------
// Fair Merchant: the manager whose trades have most consistently left
// BOTH sides with positive PAR (a true win-win), not just the manager
// who came out ahead. Requires a minimum sample of trades so a single
// lucky trade can't crown someone off an n=1 record; ties on win-win
// rate are broken by whoever's trades swing the least on average (the
// more genuinely "even" trader), since that's the closer read on "fair".
// ------------------------------------------------------------------
const MIN_TRADES_FOR_FAIR_MERCHANT = 5;

function computeFairMerchant() {
  const byManager = {};
  TRADES.forEach((t) => {
    const a = canonicalOwner(t.ownerA);
    const b = canonicalOwner(t.ownerB);
    (byManager[a] = byManager[a] || []).push({ own: t.valueA, other: t.valueB, ntv: t.ntvA });
    (byManager[b] = byManager[b] || []).push({ own: t.valueB, other: t.valueA, ntv: t.ntvB });
  });

  const stats = Object.entries(byManager).map(([owner, trades]) => {
    const winWin = trades.filter((x) => x.own > 0 && x.other > 0).length;
    const avgAbsNtv = trades.reduce((sum, x) => sum + Math.abs(x.ntv), 0) / trades.length;
    return { owner, trades: trades.length, winWin, rate: winWin / trades.length, avgAbsNtv };
  });

  const eligible = stats.filter((s) => s.trades >= MIN_TRADES_FOR_FAIR_MERCHANT);
  const pool = eligible.length ? eligible : stats;

  const maxRate = Math.max(...pool.map((s) => s.rate));
  const tiedOnRate = pool.filter((s) => Math.abs(s.rate - maxRate) < 1e-9);
  tiedOnRate.sort((a, b) => a.avgAbsNtv - b.avgAbsNtv);

  const bestAvg = tiedOnRate[0].avgAbsNtv;
  const holders = tiedOnRate.filter((s) => Math.abs(s.avgAbsNtv - bestAvg) < 0.05);

  return { holders, rate: maxRate, winWin: holders[0].winWin, trades: holders[0].trades };
}

// ------------------------------------------------------------------
// Superlatives
// ------------------------------------------------------------------
function computeSuperlatives() {
  const entries = Object.entries(MANAGER_STATS);

  const maxTrades = Math.max(...entries.map(([, s]) => s.trades));
  const triggerFinger = entries.filter(([, s]) => s.trades === maxTrades).map(([o]) => o);

  const maxNtv = Math.max(...entries.map(([, s]) => s.ntv));
  const goldenFleecer = entries.filter(([, s]) => Math.abs(s.ntv - maxNtv) < 0.05).map(([o]) => o);

  const minNtv = Math.min(...entries.map(([, s]) => s.ntv));
  const sheep = entries.filter(([, s]) => Math.abs(s.ntv - minNtv) < 0.05).map(([o]) => o);

  const fairMerchant = computeFairMerchant();

  return { triggerFinger, maxTrades, goldenFleecer, maxNtv, sheep, minNtv, fairMerchant };
}

function statCard(category, value, holderNames, note) {
  const holder = holderNames.length ? holderNames.join(" & ") : "—";
  const team = holderNames.length
    ? holderNames.map((o) => TEAM_OF_OWNER[o] || "").join(" & ")
    : "Nobody yet";
  return `
    <div class="stat-card">
      <div class="stat-category">${category}</div>
      <div class="stat-value">${value}</div>
      <div class="stat-holder">${team}</div>
      <div class="stat-owner">${holder}${note ? ` &middot; ${note}` : ""}</div>
    </div>
  `;
}

function renderSuperlatives() {
  const s = computeSuperlatives();
  const container = document.getElementById("trade-superlatives-grid");
  const fm = s.fairMerchant;
  container.innerHTML = [
    statCard("Trigger Finger", `${s.maxTrades} Trades`, s.triggerFinger, "most trades made"),
    statCard("Golden Fleecer", fmtSigned(s.maxNtv), s.goldenFleecer, "highest career Net Trade Value"),
    statCard("Sheep", fmtSigned(s.minNtv), s.sheep, "lowest career Net Trade Value"),
    statCard(
      "Fair Merchant",
      `${Math.round(fm.rate * 100)}%`,
      fm.holders.map((h) => h.owner),
      `${fm.winWin} of ${fm.trades} trades left both sides better off`
    ),
  ].join("");
}

// ------------------------------------------------------------------
// Manager leaderboard
// ------------------------------------------------------------------
function renderLeaderboard() {
  const tbody = document.getElementById("leaderboard-body");
  const rows = Object.entries(MANAGER_STATS).sort((a, b) => b[1].ntv - a[1].ntv);
  tbody.innerHTML = rows
    .map(
      ([owner, s], i) => `
    <tr>
      <td class="rank">${i + 1}</td>
      <td class="owner-cell">${owner}</td>
      <td class="team-cell">${TEAM_OF_OWNER[owner] || ""}</td>
      <td class="${s.ntv >= 0 ? "ntv-positive" : "ntv-negative"}">${fmtSigned(s.ntv)}</td>
      <td>${s.trades}</td>
    </tr>
  `
    )
    .join("");
}

// ------------------------------------------------------------------
// Trade list + filters
// ------------------------------------------------------------------
function weekLabel(t) {
  const from = t.weekFrom === "pre-S1" ? "Preseason" : `Wk ${t.weekFrom}`;
  return `${t.season} &middot; ${from} → Wk ${t.weekTo}`;
}

function playerBadge(p) {
  const posClass = "draft-pos--" + p.pos.replace("/", "");
  return `<span class="player-badge ${posClass}">${p.name}</span>`;
}

function legRow(leg) {
  const cls = leg.margin > 0 ? "positive" : leg.margin < 0 ? "negative" : "";
  return `
    <div class="trade-leg">
      <span class="trade-leg-player">${leg.in}</span>
      <span class="trade-leg-margin ${cls}">${fmtSigned(leg.margin)} PAR</span>
    </div>
  `;
}

// Legs with no "in" player are bookkeeping placeholders for a departing
// player who created no real vacancy (kind "depart_zero", margin always
// 0) -- not a player anyone actually received, so they don't belong in a
// "what did each side receive" breakdown.
function receivedLegs(legs) {
  return legs.filter((leg) => leg.in);
}

function sideClass(ntv, washThreshold) {
  if (Math.abs(ntv) < washThreshold) return "trade-side--wash";
  return ntv > 0 ? "trade-side--winner" : "trade-side--loser";
}

function tradeCard(t) {
  const WASH = 5;
  const isWash = Math.abs(t.ntvA) < WASH;
  const ownerA = canonicalOwner(t.ownerA);
  const ownerB = canonicalOwner(t.ownerB);
  const legsA = receivedLegs(t.legsA);
  const legsB = receivedLegs(t.legsB);
  const noLegs = '<p class="trade-leg-empty">No net PAR impact.</p>';
  return `
    <div class="trade-card">
      <div class="trade-card-header">
        <span class="trade-season-badge">${weekLabel(t)}</span>
        ${isWash ? '<span class="trade-wash-badge">Wash</span>' : ""}
      </div>
      <div class="trade-sides">
        <div class="trade-side ${sideClass(t.ntvA, WASH)}">
          <div class="trade-side-team">${t.teamA}</div>
          <div class="trade-side-owner">${ownerA}</div>
          <div class="trade-side-flow">Sends <span class="trade-side-arrow">&rarr;</span></div>
          <div class="trade-side-players">${t.playersA.map(playerBadge).join("")}</div>
          <div class="trade-side-value">${fmtSigned(t.valueA)} PAR received</div>
        </div>
        <div class="trade-ntv-badge">
          <div class="trade-ntv-value ${t.ntvA >= 0 ? "positive" : "negative"}">${fmtSigned(t.ntvA)}</div>
          <div class="trade-ntv-label">NTV</div>
        </div>
        <div class="trade-side ${sideClass(t.ntvB, WASH)}">
          <div class="trade-side-team">${t.teamB}</div>
          <div class="trade-side-owner">${ownerB}</div>
          <div class="trade-side-flow"><span class="trade-side-arrow">&larr;</span> Sends</div>
          <div class="trade-side-players">${t.playersB.map(playerBadge).join("")}</div>
          <div class="trade-side-value">${fmtSigned(t.valueB)} PAR received</div>
        </div>
      </div>
      <details class="trade-details">
        <summary>Show calculation</summary>
        <div class="trade-legs">
          <div class="trade-legs-side">
            <div class="trade-legs-side-label">${ownerA} received</div>
            ${legsA.length ? legsA.map(legRow).join("") : noLegs}
          </div>
          <div class="trade-legs-side">
            <div class="trade-legs-side-label">${ownerB} received</div>
            ${legsB.length ? legsB.map(legRow).join("") : noLegs}
          </div>
        </div>
      </details>
    </div>
  `;
}

function renderTradeList() {
  const seasonVal = document.getElementById("trade-season-select").value;
  const ownerVal = document.getElementById("trade-owner-select").value;

  let filtered = TRADES.filter((t) => {
    const seasonOk = seasonVal === "all" || String(t.season) === seasonVal;
    const ownerOk =
      ownerVal === "all" ||
      canonicalOwner(t.ownerA) === ownerVal ||
      canonicalOwner(t.ownerB) === ownerVal;
    return seasonOk && ownerOk;
  });

  filtered = filtered.slice().sort((a, b) => {
    if (b.season !== a.season) return b.season - a.season;
    return a.weekTo - b.weekTo;
  });

  const container = document.getElementById("trade-list");
  if (!filtered.length) {
    container.innerHTML = `<p class="loading">No trades match those filters.</p>`;
    return;
  }
  container.innerHTML = filtered.map(tradeCard).join("");
}

function populateFilters() {
  const seasonSelect = document.getElementById("trade-season-select");
  const ownerSelect = document.getElementById("trade-owner-select");

  const seasons = Array.from(new Set(TRADES.map((t) => t.season))).sort((a, b) => b - a);
  seasonSelect.innerHTML =
    `<option value="all">All Seasons</option>` +
    seasons.map((y) => `<option value="${y}">${y}</option>`).join("");

  const owners = Array.from(
    new Set(TRADES.flatMap((t) => [canonicalOwner(t.ownerA), canonicalOwner(t.ownerB)]))
  ).sort();
  ownerSelect.innerHTML =
    `<option value="all">All Managers</option>` +
    owners.map((o) => `<option value="${o}">${o}</option>`).join("");

  seasonSelect.addEventListener("change", renderTradeList);
  ownerSelect.addEventListener("change", renderTradeList);
}

renderSuperlatives();
renderLeaderboard();
populateFilters();
renderTradeList();
