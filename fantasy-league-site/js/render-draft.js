document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const select = document.getElementById("draft-season-select");
const content = document.getElementById("draft-content");

const years = Object.keys(DRAFTS).map(Number).sort((a, b) => b - a);

years.forEach((year, i) => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  if (i === 0) opt.selected = true;
  select.appendChild(opt);
});

select.addEventListener("change", () => renderDraft(select.value));
renderDraft(years[0]);

function renderDraft(year) {
  const data = DRAFTS[year];
  if (!data) {
    content.innerHTML = `<p class="loading">No draft board for ${year} yet.</p>`;
    return;
  }

  const picks = data.picks;
  const owners = data.owners || {};

  // Column order = the order teams picked in Round 1.
  const teamOrder = [];
  const seen = new Set();
  picks
    .filter((p) => p.round === 1)
    .sort((a, b) => a.pick - b.pick)
    .forEach((p) => {
      if (!seen.has(p.team)) {
        seen.add(p.team);
        teamOrder.push(p.team);
      }
    });

  // pickGrid[team][round] = { player, round, pick }
  const pickGrid = {};
  teamOrder.forEach((t) => (pickGrid[t] = {}));
  let maxRound = 1;
  picks.forEach((p) => {
    if (!pickGrid[p.team]) pickGrid[p.team] = {};
    pickGrid[p.team][p.round] = p;
    if (p.round > maxRound) maxRound = p.round;
  });

  const headerRow = teamOrder
    .map((team) => {
      const owner = owners[team];
      return `
      <th class="draft-team-col">
        <div class="draft-team-col-inner">
          <div class="draft-team-name">${team}</div>
          <div class="draft-team-owner${owner ? "" : " draft-team-owner--tbd"}">${owner || "Owner TBD"}</div>
        </div>
      </th>
    `;
    })
    .join("");

  const bodyRows = [];
  for (let round = 1; round <= maxRound; round++) {
    const cells = teamOrder
      .map((team) => {
        const p = pickGrid[team][round];
        if (!p) return `<td class="draft-pick-cell draft-pick-cell--empty">—</td>`;
        const posClass = p.position ? ` draft-pos--${p.position}` : "";
        return `
        <td class="draft-pick-cell${posClass}">
          <span class="draft-pick-num">${p.round}.${p.pick}</span>
          <span class="draft-pick-player">${p.player}</span>
        </td>
      `;
      })
      .join("");
    bodyRows.push(`<tr>${cells}</tr>`);
  }

  const legend = [
    ["WR", "WR"],
    ["RB", "RB"],
    ["TE", "TE"],
    ["QB", "QB"],
    ["K", "K"],
    ["DST", "DEF"],
  ]
    .map(([cls, label]) => `<span class="draft-legend-item"><span class="draft-legend-swatch draft-pos--${cls}"></span>${label}</span>`)
    .join("");

  const sb = data.stealBust;
  const stealBustBlock = sb
    ? `
    <div class="steal-bust-grid">
      ${renderStealBustCard("Draft Steal", sb.steal, "steal")}
      ${renderStealBustCard("Draft Bust", sb.bust, "bust")}
    </div>
  `
    : "";

  content.innerHTML = `
    ${stealBustBlock}
    <h2 class="bracket-heading">Draft Board</h2>
    <div class="draft-legend">${legend}</div>
    <div class="table-wrap draft-board-wrap">
      <table class="draft-board-table">
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${bodyRows.join("")}</tbody>
      </table>
    </div>
  `;
}

function renderStealBustCard(label, entry, kind) {
  return `
    <div class="steal-bust-card steal-bust-card--${kind}">
      <div class="steal-bust-label">${label}</div>
      <div class="steal-bust-player">${entry.player}</div>
      <div class="steal-bust-detail">${entry.pick} &middot; ${entry.points}</div>
      <div class="steal-bust-rank">${entry.draftRank} &rarr; ${entry.finalRank}</div>
      <div class="steal-bust-team">${entry.team}</div>
      <div class="steal-bust-owner">${entry.holder}</div>
    </div>
  `;
}
