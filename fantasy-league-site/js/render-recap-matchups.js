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
    return;
  }

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
