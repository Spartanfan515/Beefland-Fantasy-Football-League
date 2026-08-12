const superlativesGrid = document.getElementById("superlatives-grid");

if (!CONFIG.superlatives || CONFIG.superlatives.length === 0) {
  superlativesGrid.innerHTML = `<p class="loading">No superlatives added yet — edit CONFIG.superlatives in js/config.js.</p>`;
} else {
  superlativesGrid.innerHTML = CONFIG.superlatives
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
