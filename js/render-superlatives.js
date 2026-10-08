function renderSuperlativeGrid(containerId, data) {
  const container = document.getElementById(containerId);
  if (!data || data.length === 0) {
    container.innerHTML = `<p class="loading">No superlatives added yet — edit js/config.js.</p>`;
    return;
  }
  container.innerHTML = data.map(renderStatCard).join("");
}

function renderStatCard(s) {
  if (s.player) {
    // Draft Steal (and similar player-centric cards): player name is the
    // headline, with draft spot / points / final rank as supporting lines.
    return `
      <div class="stat-card">
        <div class="stat-category">${s.category}</div>
        <div class="stat-value stat-value--player">${s.player}</div>
        <div class="stat-value-detail">${s.draftSpot} &middot; ${s.points} &middot; ${s.finalRank}</div>
        <div class="stat-holder">${s.team}</div>
        <div class="stat-owner">${s.holder}${s.note ? ` · ${s.note}` : ""}</div>
      </div>
    `;
  }
  return `
      <div class="stat-card">
        <div class="stat-category">${s.category}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-holder">${s.team}</div>
        <div class="stat-owner">${s.holder}${s.note ? ` · ${s.note}` : ""}</div>
      </div>
    `;
}

renderSuperlativeGrid("superlatives-current-grid", CONFIG.superlativesCurrent);
renderSuperlativeGrid("superlatives-alltime-grid", CONFIG.superlativesAllTime);
