document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;
document.getElementById("tagline").textContent = CONFIG.tagline;

const grid = document.getElementById("banner-grid");

if (!CONFIG.history || CONFIG.history.length === 0) {
  grid.innerHTML = `<p class="loading">No championship history added yet — edit CONFIG.history in js/config.js.</p>`;
} else {
  const sorted = [...CONFIG.history].sort((a, b) => b.year - a.year);
  grid.innerHTML = sorted
    .map(
      (entry) => `
      <div class="banner">
        <div class="year">${entry.year}${entry.asterisk ? '<span class="asterisk">*</span>' : ""}</div>
        <div class="champion-name">${entry.champion}</div>
        <div class="owner">${entry.owner}</div>
        <div class="record">${entry.record}</div>
        ${entry.note ? `<div class="note">${entry.note}</div>` : ""}
      </div>
    `
    )
    .join("");
}
