document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const grid = document.getElementById("records-grid");

// "Present" means the most recent season that actually shows up in the
// data, not CONFIG.currentSeason — that may be an upcoming season with no
// games played yet.
let currentYear = null;
if (RECORDS && Object.keys(RECORDS).length > 0) {
  currentYear = Math.max(...Object.values(RECORDS).flatMap((r) => r.years));
}

if (!RECORDS || Object.keys(RECORDS).length === 0) {
  grid.innerHTML = `<p class="loading">No records yet — edit js/records.js.</p>`;
} else {
  const owners = Object.keys(RECORDS).sort((a, b) => {
    const ra = RECORDS[a];
    const rb = RECORDS[b];
    if (rb.titles.length !== ra.titles.length) return rb.titles.length - ra.titles.length;
    const wpA = ra.regSeason[0] / (ra.regSeason[0] + ra.regSeason[1]);
    const wpB = rb.regSeason[0] / (rb.regSeason[0] + rb.regSeason[1]);
    return wpB - wpA;
  });

  grid.innerHTML = owners.map((owner) => renderRecordCard(owner, RECORDS[owner])).join("");
}

function yearsLabel(years) {
  const min = Math.min(...years);
  const max = Math.max(...years);
  if (min === max) return `${min}`;
  const span = years.length === max - min + 1;
  if (span) {
    return max === currentYear ? `${min}–Present` : `${min}–${max}`;
  }
  return years.join(", ");
}

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function avatarColorClass(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return `avatar--${hash % 5}`;
}

function renderRecordCard(owner, r) {
  const titlesLabel = r.titles.length
    ? `${r.titles.length} · ${r.titles.join(", ")}`
    : "—";

  const isInactive = r.active === false;
  const cardClass = isInactive ? "record-card record-card--inactive" : "record-card";
  const bioHtml = r.bio ? `<div class="record-bio">${r.bio}</div>` : "";

  return `
    <div class="${cardClass}">
      <div class="record-card-header">
        <div class="record-owner-group">
          <div class="record-avatar ${avatarColorClass(owner)}">${initials(owner)}</div>
          <div class="record-owner">${owner}${isInactive ? '<span class="record-inactive-tag">No Longer in League</span>' : ""}</div>
        </div>
        <div class="record-years">${yearsLabel(r.years)} <span class="record-years-count">(${r.years.length} ${r.years.length === 1 ? "season" : "seasons"})</span></div>
      </div>

      <div class="record-stat-row">
        <div class="record-stat">
          <div class="record-stat-label">Regular Season</div>
          <div class="record-stat-value">${r.regSeason[0]}-${r.regSeason[1]}</div>
        </div>
        <div class="record-stat">
          <div class="record-stat-label">Playoffs</div>
          <div class="record-stat-value">${r.playoff[0]}-${r.playoff[1]}</div>
        </div>
        <div class="record-stat">
          <div class="record-stat-label">Championships</div>
          <div class="record-stat-value">${titlesLabel}</div>
        </div>
      </div>

      <div class="record-stat-row">
        <div class="record-stat">
          <div class="record-stat-label">Career Points</div>
          <div class="record-stat-value record-stat-value--tight">${r.careerPoints.toLocaleString()}</div>
          <div class="record-stat-sub">${r.ppg} PPG</div>
        </div>
        <div class="record-stat">
          <div class="record-stat-label">Best PF Season</div>
          <div class="record-stat-value record-stat-value--tight">${r.bestPfSeason.points.toLocaleString()}</div>
          <div class="record-stat-sub">${r.bestPfSeason.year}</div>
        </div>
        <div class="record-stat">
          <div class="record-stat-label">Single-Game High</div>
          <div class="record-stat-value record-stat-value--tight">${r.weeklyHigh.points}</div>
          <div class="record-stat-sub">Wk ${r.weeklyHigh.week}, ${r.weeklyHigh.year}</div>
        </div>
        <div class="record-stat">
          <div class="record-stat-label">Chugs</div>
          <div class="record-stat-value record-stat-value--tight">${r.chugs}</div>
          <div class="record-stat-sub">since 2023</div>
        </div>
      </div>

      <div class="record-pick-row">
        <div class="record-pick record-pick--steal">
          <div class="record-pick-label">Best Draft Pick</div>
          <div class="record-pick-player">${r.draftSteal.player}</div>
          <div class="record-pick-detail">${r.draftSteal.pick} &middot; ${r.draftSteal.points}</div>
          <div class="record-pick-rank">${r.draftSteal.draftRank} &rarr; ${r.draftSteal.finalRank}</div>
          <div class="record-pick-note">${r.draftSteal.team} &middot; ${r.draftSteal.note}</div>
        </div>
        <div class="record-pick record-pick--bust">
          <div class="record-pick-label">Worst Draft Pick</div>
          <div class="record-pick-player">${r.draftBust.player}</div>
          <div class="record-pick-detail">${r.draftBust.pick} &middot; ${r.draftBust.points}</div>
          <div class="record-pick-rank">${r.draftBust.draftRank} &rarr; ${r.draftBust.finalRank}</div>
          <div class="record-pick-note">${r.draftBust.team} &middot; ${r.draftBust.note}</div>
        </div>
      </div>
      ${bioHtml}
    </div>
  `;
}
