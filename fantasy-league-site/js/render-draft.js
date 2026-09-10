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

  const da = data.draftAnalysis;
  const draftAnalysisBlock = da ? renderDraftAnalysis(da, owners) : "";

  content.innerHTML = `
    ${stealBustBlock}
    ${draftAnalysisBlock}
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

// Draft Day Analysis -- shown in place of Draft Steal/Bust for a season
// whose final position ranks don't exist yet (e.g. a season still in
// progress), computed purely from draft-order data instead.
function renderDraftAnalysis(da, owners) {
  const ownerTeam = {};
  Object.entries(owners || {}).forEach(([team, owner]) => {
    ownerTeam[owner] = team;
  });

  const posLabels = { QB: "QB", RB: "RB", WR: "WR", TE: "TE", K: "K", DST: "D/ST" };
  const posOrder = ["QB", "RB", "WR", "TE", "K", "DST"];

  const posCards = posOrder
    .filter((pos) => da.firstByPosition && da.firstByPosition[pos])
    .map((pos) => {
      const e = da.firstByPosition[pos];
      const avg = e.historicalAvgRound;
      let note = "";
      if (typeof avg === "number") {
        const diff = e.round - avg;
        const avgLabel = `${avg.toFixed(1)}-round historical average`;
        if (diff <= -0.75) note = `Well ahead of the ${avgLabel}`;
        else if (diff >= 0.75) note = `Well behind the ${avgLabel}`;
        else note = `Right around the ${avgLabel}`;
      }
      return renderStatCard({
        category: `First ${posLabels[pos] || pos} Off the Board`,
        value: e.player,
        detail: `Round ${e.round}, Pick ${e.pick} &middot; ${e.team}`,
        holder: e.owner,
        note,
      });
    })
    .join("");

  const br = da.biggestRun;
  const runCard = br
    ? renderStatCard({
        category: "Biggest Positional Run",
        value: `${br.length} Straight ${posLabels[br.position] || br.position}s`,
        detail: `Round ${br.startRound}, Picks ${br.startPick}&ndash;${br.endPick}`,
        holder: (br.players || []).join(", "),
        note: "",
      })
    : "";

  const buildCards = [];
  if (da.mostRbTeam) {
    buildCards.push(
      renderStatCard({
        category: "Most Run-Heavy Build",
        value: `${da.mostRbTeam.count} Running Backs`,
        detail: ownerTeam[da.mostRbTeam.owner] || "",
        holder: da.mostRbTeam.owner,
        note: "",
      })
    );
  }
  if (da.mostWrTeam) {
    buildCards.push(
      renderStatCard({
        category: "Most Receiver-Heavy Build",
        value: `${da.mostWrTeam.count} Wide Receivers`,
        detail: ownerTeam[da.mostWrTeam.owner] || "",
        holder: da.mostWrTeam.owner,
        note: "",
      })
    );
  }
  if (da.earliestFirstRb && da.latestFirstRb) {
    buildCards.push(
      renderStatCard({
        category: "RB Believer vs. RB Skeptic",
        value: `Round ${da.earliestFirstRb.round} vs. Round ${da.latestFirstRb.round}`,
        detail: "Earliest vs. latest first running back off the board",
        holder: `${da.earliestFirstRb.owner} (early) &middot; ${da.latestFirstRb.owner} (late)`,
        note: "",
      })
    );
  }

  const reachSlideBlock = da.biggestReach && da.biggestSlide ? renderReachSlideSection(da) : "";

  return `
    <h2 class="bracket-heading">Draft Day Analysis</h2>
    <p class="draft-analysis-note">Draft Steal &amp; Bust need final end-of-season position ranks, which don't exist yet for a season still in progress -- so here's how this year's draft compared to draft history (and to the market) instead.</p>
    ${reachSlideBlock}
    <div class="superlatives-grid draft-analysis-grid">
      ${posCards}
      ${runCard}
      ${buildCards.join("")}
    </div>
  `;
}

// Reach/Slide -- compares each pick to ESPN's PPR average draft position,
// so it works even though final Steal/Bust can't be computed yet (ADP is
// known the moment the season's mocks and live drafts happen; it doesn't
// need the season to finish). K/D-ST and picks below ESPN's tracked ADP
// floor are excluded upstream since ADP there is noise, not signal.
function renderReachSlideSection(da) {
  const asOf = da.adpAsOf
    ? new Date(da.adpAsOf + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";
  const reachCard = renderReachSlideCard("Biggest Reach", da.biggestReach, "bust", "Reached by");
  const slideCard = renderReachSlideCard("Biggest Slide", da.biggestSlide, "steal", "Slid");

  const reachRows = (da.topReaches || []).map((r) => renderReachSlideRow(r, "Reached by")).join("");
  const slideRows = (da.topSlides || []).map((r) => renderReachSlideRow(r, "Slid")).join("");

  return `
    <div class="steal-bust-grid">
      ${reachCard}
      ${slideCard}
    </div>
    <div class="reach-slide-tables">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Biggest Reaches</th><th>Pick</th><th>ADP</th><th>Gap</th></tr></thead>
          <tbody>${reachRows}</tbody>
        </table>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Biggest Slides</th><th>Pick</th><th>ADP</th><th>Gap</th></tr></thead>
          <tbody>${slideRows}</tbody>
        </table>
      </div>
    </div>
    <p class="draft-analysis-note draft-analysis-note--source">ADP: ${da.adpSource || "ESPN PPR"}${asOf ? `, as of ${asOf}` : ""} -- reflects current market consensus, not necessarily a snapshot from this league's actual draft day.</p>
  `;
}

function renderReachSlideCard(label, entry, kind, verb) {
  return `
    <div class="steal-bust-card steal-bust-card--${kind}">
      <div class="steal-bust-label">${label}</div>
      <div class="steal-bust-player">${entry.player}</div>
      <div class="steal-bust-detail">R${entry.round}.${entry.pick} (#${entry.overall} overall) &middot; ADP ${entry.adp}</div>
      <div class="steal-bust-rank">${verb} ${entry.diff.toFixed(1)} picks</div>
      <div class="steal-bust-team">${entry.team}</div>
      <div class="steal-bust-owner">${entry.owner}</div>
    </div>
  `;
}

function renderReachSlideRow(r, verb) {
  return `
    <tr>
      <td>${r.player} <span class="draft-legend-swatch draft-pos--${r.position}" title="${r.position}"></span></td>
      <td>R${r.round}.${r.pick}</td>
      <td>${r.adp}</td>
      <td>${verb} ${r.diff.toFixed(1)}</td>
    </tr>
  `;
}

function renderStatCard({ category, value, detail, holder, note }) {
  return `
    <div class="stat-card">
      <div class="stat-category">${category}</div>
      <div class="stat-value${String(value).length > 18 ? " stat-value--tight" : ""}">${value}</div>
      ${detail ? `<div class="stat-value-detail">${detail}</div>` : ""}
      ${holder ? `<div class="stat-holder">${holder}</div>` : ""}
      ${note ? `<div class="stat-owner">${note}</div>` : ""}
    </div>
  `;
}
