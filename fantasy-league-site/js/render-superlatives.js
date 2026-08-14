function renderSuperlativeGrid(containerId, data) {
  const container = document.getElementById(containerId);
  if (!data || data.length === 0) {
    container.innerHTML = `<p class="loading">No superlatives added yet — edit js/config.js.</p>`;
    return;
  }
  container.innerHTML = data
    .map(
      (s) => `
      <div class="stat-card">
        <div class="stat-category">${s.category}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-holder">${s.team}</div>
        <div class="stat-owner">${s.holder}${s.note ? ` · ${s.note}` : ""}</div>
      </div>
    `
    )
    .join("");
}

renderSuperlativeGrid("superlatives-current-grid", CONFIG.superlativesCurrent);
renderSuperlativeGrid("superlatives-alltime-grid", CONFIG.superlativesAllTime);
