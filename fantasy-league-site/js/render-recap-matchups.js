// ------------------------------------------------------------------
// Weekly Matchups section (below the playoff bracket on the Recap page).
// Reuses the season selector already on the page (#recap-season-select);
// this file only owns the "view by Week / Manager" controls and the
// matchup list itself.
// ------------------------------------------------------------------
const seasonSelect = document.getElementById("recap-season-select");
const modeSelect = document.getElementById("matchup-mode-select");
const weekSelect = document.getElementById("matchup-week-select");
const weekLabel = document.getElementById("matchup-week-label");
const managerSelect = document.getElementById("matchup-manager-select");
const managerLabel = document.getElementById("matchup-manager-label");
const matchupList = document.getElementById("matchup-list");
const matchupSummary = document.getElementById("matchup-summary");

function currentSeasonData() {
  return MATCHUPS[seasonSelect.value];
}

function fmtPts(n) {
  return (Math.round(n * 10) / 10).toFixed(1);
}

// The RB/WR/TE flex slot and non-dedicated bench/IR spots don't map onto
// the site's existing draft-pos--WR/RB/TE/QB/K/DST swatches, so give them
// a neutral tag instead of guessing a color that isn't there. A player
// whose real position couldn't be resolved from any season's data at all
// (a small minority) carries a raw slot label like "BE" as `pos` -- that's
// not a real position, so show a plain dash rather than asserting one.
const KNOWN_POS = ["WR", "RB", "TE", "QB", "K", "DST"];

function posBadgeClass(pos) {
  const key = (pos || "").replace("/", "");
  return KNOWN_POS.includes(key) ? `draft-pos--${key}` : "matchup-pos--flex";
}

function posLabel(pos) {
  const key = (pos || "").replace("/", "");
  return KNOWN_POS.includes(key) ? pos : "—";
}

function playerRow(entry) {
  return `
    <div class="matchup-player-row">
      <span class="matchup-pos-tag ${posBadgeClass(entry.pos)}">${posLabel(entry.pos)}</span>
      <span class="matchup-player-name">${entry.name}</span>
      <span class="matchup-player-pts">${fmtPts(entry.points)}</span>
    </div>
  `;
}

function rosterGroup(label, entries) {
  if (!entries.length) return "";
  return `
    <div class="matchup-roster-group">
      <div class="matchup-roster-group-label">${label}</div>
      ${entries.map(playerRow).join("")}
    </div>
  `;
}

function rosterBlock(roster) {
  return `
    <div class="matchup-roster">
      ${rosterGroup("Starters", roster.starters)}
      ${rosterGroup("Bench", roster.bench)}
      ${rosterGroup("IR", roster.ir)}
    </div>
  `;
}

function sideClass(side, opponent) {
  if (!opponent) return ""; // bye -- no win/loss to color
  return side.won ? "matchup-side--winner" : "matchup-side--loser";
}

function matchupCard(m) {
  const roundBadge = m.roundLabel ? `<span class="matchup-round-badge">${m.roundLabel}</span>` : "";

  if (m.isBye) {
    return `
      <div class="matchup-card">
        <div class="matchup-card-header">
          <span class="matchup-week-badge">Week ${m.week}</span>
          ${roundBadge}
          <span class="matchup-bye-badge">Bye</span>
        </div>
        <div class="matchup-sides matchup-sides--bye">
          <div class="matchup-side">
            <div class="matchup-side-team">${m.home.team}</div>
            <div class="matchup-side-owner">${m.home.owner}</div>
            ${rosterBlock(m.home.roster)}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="matchup-card">
      <div class="matchup-card-header">
        <span class="matchup-week-badge">Week ${m.week}</span>
        ${roundBadge}
      </div>
      <div class="matchup-sides">
        <div class="matchup-side ${sideClass(m.home, m.away)}">
          <div class="matchup-side-team">${m.home.team}</div>
          <div class="matchup-side-owner">${m.home.owner}</div>
          <div class="matchup-side-score">${fmtPts(m.home.score)}</div>
          ${rosterBlock(m.home.roster)}
        </div>
        <div class="matchup-vs-badge">
          <div class="matchup-vs-label">VS</div>
        </div>
        <div class="matchup-side ${sideClass(m.away, m.home)}">
          <div class="matchup-side-team">${m.away.team}</div>
          <div class="matchup-side-owner">${m.away.owner}</div>
          <div class="matchup-side-score">${fmtPts(m.away.score)}</div>
          ${rosterBlock(m.away.roster)}
        </div>
      </div>
    </div>
  `;
}

// Re-orients a matchup so `owner` always renders as the "home" (left)
// side, regardless of which side they were actually on that week.
function orientForManager(m, owner) {
  if (m.home.owner === owner) return m;
  return { ...m, home: m.away, away: m.home };
}

// ------------------------------------------------------------------
// Weekly / manager summary -- a short "what mattered" callout rendered
// above the matchup cards. All of the heavy lifting (the optimal-lineup
// math, and the points-for-tiebreaker check) is precomputed in
// matchups.js; this just picks the highlights and writes the sentences.
// ------------------------------------------------------------------

function summaryListHtml(items) {
  if (!items.length) {
    return `<p class="matchup-summary-empty">Nothing notable to call out.</p>`;
  }
  return `<ul class="matchup-summary-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

// During a playoff week, only winners-bracket games (semifinals,
// championship, 3rd place game) are eligible for the summary -- the
// consolation/losers bracket is left out of the write-up entirely,
// though its cards still appear in the list below like any other game.
function eligibleGamesForWeek(games) {
  const isPlayoffWeek = games.some((g) => g.tier !== "NONE");
  if (!isPlayoffWeek) return { games, isPlayoffWeek: false };
  const eligible = games.filter((g) => g.tier === "WINNERS_BRACKET" || g.tier === "WINNERS_CONSOLATION_LADDER");
  return { games: eligible, isPlayoffWeek: true };
}

function buildWeekSummary(data, week) {
  const allGames = data.byWeek[String(week)] || [];
  const { games, isPlayoffWeek } = eligibleGamesForWeek(allGames);
  const items = [];

  let closest = null;
  for (const g of games) {
    if (g.isBye || !g.away) continue;
    const margin = Math.abs(g.home.score - g.away.score);
    if (!closest || margin < closest.margin) closest = { g, margin };
  }
  if (closest) {
    const winner = closest.g.home.won ? closest.g.home : closest.g.away;
    const loser = closest.g.home.won ? closest.g.away : closest.g.home;
    items.push(
      `<strong>Closest game:</strong> ${winner.team} survived ${loser.team} ${fmtPts(winner.score)}–${fmtPts(loser.score)} — a margin of just ${fmtPts(closest.margin)} point${closest.margin === 1 ? "" : "s"}.`
    );
  }

  let top = null;
  for (const g of games) {
    for (const side of [g.home, g.away]) {
      if (!side) continue;
      for (const p of side.roster.starters) {
        if (!top || p.points > top.points) top = { ...p, team: side.team, owner: side.owner };
      }
    }
  }
  if (top) {
    items.push(
      `<strong>Top performance:</strong> ${top.name} put up ${fmtPts(top.points)} points for ${top.team} (${top.owner}) — the most of any starter in Week ${week}.`
    );
  }

  const flips = [];
  for (const g of games) {
    if (g.isBye || !g.away) continue;
    for (const [side, opp] of [
      [g.home, g.away],
      [g.away, g.home],
    ]) {
      if (side.pointsLeft > 0 && side.score < opp.score && side.optimalScore > opp.score && side.swaps.length) {
        flips.push({ side, opp });
      }
    }
  }
  flips.sort((a, b) => b.side.pointsLeft - a.side.pointsLeft);
  for (const { side, opp } of flips.slice(0, 2)) {
    const swap = side.swaps[0];
    items.push(
      `<strong>Costly bench call:</strong> ${side.owner}'s ${swap.in.name} scored ${fmtPts(swap.in.points)} on the bench while ${swap.out.name} managed just ${fmtPts(swap.out.points)} — starting ${swap.in.name} instead would have flipped ${side.owner}'s loss to ${opp.owner} into a win.`
    );
  }

  const note = isPlayoffWeek
    ? `<div class="matchup-summary-note">Playoff week — this summary covers winners-bracket games only.</div>`
    : "";

  return `
    <div class="matchup-summary-card">
      <div class="matchup-summary-title">Week ${week} Summary</div>
      ${note}
      ${summaryListHtml(items)}
    </div>
  `;
}

function buildManagerSummary(data, owner) {
  const rows = data.weeks
    .map((w) => (data.byWeek[String(w)] || []).find((m) => m.home.owner === owner || (m.away && m.away.owner === owner)))
    .filter(Boolean)
    .map((m) => orientForManager(m, owner));

  const items = [];

  const scored = rows.filter((m) => !m.isBye && typeof m.home.score === "number");
  const best = scored
    .slice()
    .sort((a, b) => b.home.score - a.home.score)
    .slice(0, 3);
  if (best.length) {
    const parts = best.map((m) => `${fmtPts(m.home.score)} in Week ${m.week} (${m.home.won ? "W" : "L"} vs ${m.away.owner})`);
    items.push(`<strong>Best performances:</strong> ${parts.join(", ")}.`);
  }

  const perfectWeeks = rows.filter((m) => m.home.isPerfect).map((m) => m.week);
  if (perfectWeeks.length) {
    items.push(
      `<strong>Perfect lineup:</strong> started the highest-scoring roster possible in Week${perfectWeeks.length > 1 ? "s" : ""} ${perfectWeeks.join(", ")}.`
    );
  } else {
    items.push(
      `<strong>Perfect lineup:</strong> no week this season had their optimal lineup on the field — there was always a better bench option somewhere.`
    );
  }

  const impact = data.tiebreakImpact && data.tiebreakImpact[owner];
  if (impact) {
    const swap = impact.swaps && impact.swaps[0];
    const swapText = swap
      ? ` Week ${impact.week} alone left ${fmtPts(swap.gain)} points on the bench just by starting ${swap.in.name} over ${swap.out.name} — enough by itself to flip the tiebreaker.`
      : "";
    items.push(
      `<strong>Playoff-altering decision:</strong> ${owner} finished the season tied with ${impact.opponent}, but lost the points-for tiebreaker by ${fmtPts(impact.margin)} points.${swapText}`
    );
  }

  return `
    <div class="matchup-summary-card">
      <div class="matchup-summary-title">${owner} — Season Summary</div>
      ${summaryListHtml(items)}
    </div>
  `;
}

function renderSummary() {
  const data = currentSeasonData();
  if (!data) {
    matchupSummary.innerHTML = "";
    return;
  }
  matchupSummary.innerHTML =
    modeSelect.value === "week" ? buildWeekSummary(data, weekSelect.value) : buildManagerSummary(data, managerSelect.value);
}

function populateWeekSelect() {
  const data = currentSeasonData();
  const prev = weekSelect.value;
  weekSelect.innerHTML = data.weeks.map((w) => `<option value="${w}">Week ${w}</option>`).join("");
  weekSelect.value = data.weeks.includes(Number(prev)) ? prev : String(data.weeks[0]);
}

function populateManagerSelect() {
  const data = currentSeasonData();
  const prev = managerSelect.value;
  const owners = data.owners.slice().sort();
  managerSelect.innerHTML = owners.map((o) => `<option value="${o}">${o}</option>`).join("");
  managerSelect.value = owners.includes(prev) ? prev : owners[0];
}

function renderMatchups() {
  const data = currentSeasonData();
  if (!data) {
    matchupList.innerHTML = `<p class="loading">No matchup data for this season.</p>`;
    matchupSummary.innerHTML = "";
    return;
  }

  renderSummary();

  if (modeSelect.value === "week") {
    const games = (data.byWeek[weekSelect.value] || []).slice();
    matchupList.innerHTML = games.length
      ? games.map(matchupCard).join("")
      : `<p class="loading">No matchups recorded for this week.</p>`;
  } else {
    const owner = managerSelect.value;
    const games = data.weeks
      .map((w) => (data.byWeek[String(w)] || []).find((m) => m.home.owner === owner || (m.away && m.away.owner === owner)))
      .filter(Boolean)
      .map((m) => orientForManager(m, owner));
    matchupList.innerHTML = games.length
      ? games.map(matchupCard).join("")
      : `<p class="loading">No matchups found for this manager.</p>`;
  }
}

function refreshControlsForSeason() {
  populateWeekSelect();
  populateManagerSelect();
  renderMatchups();
}

function applyMode() {
  const isWeek = modeSelect.value === "week";
  weekLabel.classList.toggle("is-hidden", !isWeek);
  weekSelect.classList.toggle("is-hidden", !isWeek);
  managerLabel.classList.toggle("is-hidden", isWeek);
  managerSelect.classList.toggle("is-hidden", isWeek);
  renderMatchups();
}

modeSelect.addEventListener("change", applyMode);
weekSelect.addEventListener("change", renderMatchups);
managerSelect.addEventListener("change", renderMatchups);
// The season select already has its own listener (render-recap.js) that
// re-renders the bracket above; this just chains onto the same element.
seasonSelect.addEventListener("change", refreshControlsForSeason);

refreshControlsForSeason();
