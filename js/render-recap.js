document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const select = document.getElementById("recap-season-select");
const content = document.getElementById("recap-content");

const years = Object.keys(RECAPS).map(Number).sort((a, b) => b - a);

years.forEach((year, i) => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  if (i === 0) opt.selected = true; // most recent completed season by default
  select.appendChild(opt);
});

const TROPHY_SVG = `
  <svg viewBox="0 0 100 120" class="trophy-icon" aria-hidden="true">
    <path d="M25 10 H75 V28 C75 45 63 55 50 55 C37 55 25 45 25 28 Z" fill="var(--gold)" />
    <path d="M25 14 H10 C10 30 18 38 27 39" fill="none" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" />
    <path d="M75 14 H90 C90 30 82 38 73 39" fill="none" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" />
    <rect x="45" y="55" width="10" height="18" fill="var(--gold-dim)" />
    <path d="M30 73 H70 L65 85 H35 Z" fill="var(--gold)" />
    <rect x="25" y="85" width="50" height="10" rx="2" fill="var(--gold-dim)" />
  </svg>
`;

// Owner names are shortened to first name only in recap prose/callouts.
// The two Adams (Adam Kahler, Adam Schon) are disambiguated with a last initial.
const FIRST_NAMES = {
  "Jacob Ayriss": "Jacob",
  "Zach Crook": "Zach",
  "Austin Gauss": "Austin",
  "Jon Hurlburt": "Jon",
  "Brent Hurlburt": "Brent",
  "Jack Callahan": "Jack",
  "Benjamin Schon": "Ben",
  "Ben Schon": "Ben",
  "Zack Rollis": "Zack",
  "Adam Kahler": "Adam K.",
  "Adam Schon": "Adam S.",
  "Evan Lamb": "Evan",
  "Blake Beachnau": "Blake",
};

function shortenName(fullName) {
  if (FIRST_NAMES[fullName]) return FIRST_NAMES[fullName];
  const parts = fullName.split(" ");
  if (parts[0] === "Adam" && parts.length > 1) return `Adam ${parts[1][0]}.`;
  return parts[0];
}

function shortenOwnersInText(text) {
  let result = text;
  Object.keys(FIRST_NAMES)
    .sort((a, b) => b.length - a.length)
    .forEach((full) => {
      const escaped = full.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(escaped, "g"), FIRST_NAMES[full]);
    });
  return result;
}

select.addEventListener("change", () => renderRecap(select.value));
renderRecap(years[0]);

function renderRecap(year) {
  const data = RECAPS[year];
  if (!data) {
    content.innerHTML = `<p class="loading">No recap for ${year} yet.</p>`;
    return;
  }

  const mvp = data.champion.playoffMVP;
  const championCard = `
    <div class="champion-callout">
      ${TROPHY_SVG}
      <div class="champion-callout-text">
        <div class="champion-callout-label">${year} Champion</div>
        <div class="champion-callout-team">${data.champion.team}</div>
        <div class="champion-callout-owner">${shortenName(data.champion.owner)} &middot; #${data.champion.seed} seed</div>
      </div>
      ${
        mvp
          ? `
      <div class="champion-callout-mvp">
        <div class="champion-callout-mvp-label">Playoff MVP</div>
        <div class="champion-callout-mvp-name">${mvp.name}</div>
        <div class="champion-callout-mvp-points">${mvp.points.toFixed(2)} pts</div>
      </div>`
          : ""
      }
    </div>
  `;

  const bracketHtml = `
    <div class="bracket">
      ${data.bracket
        .map(
          (round) => `
        <div class="bracket-round">
          <div class="bracket-round-label">${round.label}</div>
          ${round.games.map((g) => renderGame(g)).join("")}
        </div>
      `
        )
        .join("")}
    </div>
  `;

  content.innerHTML = `
    <div class="recap-overview">${shortenOwnersInText(data.overview)}</div>
    ${championCard}
    <h2 class="bracket-heading">Playoff Bracket</h2>
    ${bracketHtml}
  `;
}

function renderGame(g) {
  if (g.isBye) {
    return `
      <div class="bracket-game">
        <div class="bracket-team bracket-team--winner">
          <span class="bracket-seed">#${g.homeSeed}</span>
          <span class="bracket-team-name">${g.homeTeam}</span>
          <span class="bracket-points">BYE</span>
        </div>
      </div>
    `;
  }
  const homeWon = g.winnerOwner === g.homeOwner;
  return `
    <div class="bracket-game">
      <div class="bracket-team ${homeWon ? "bracket-team--winner" : ""}">
        <span class="bracket-seed">#${g.homeSeed}</span>
        <span class="bracket-team-name">${g.homeTeam}</span>
        <span class="bracket-points">${g.homePoints.toFixed(2)}</span>
      </div>
      <div class="bracket-team ${!homeWon ? "bracket-team--winner" : ""}">
        <span class="bracket-seed">#${g.awaySeed}</span>
        <span class="bracket-team-name">${g.awayTeam}</span>
        <span class="bracket-points">${g.awayPoints.toFixed(2)}</span>
      </div>
    </div>
  `;
}
