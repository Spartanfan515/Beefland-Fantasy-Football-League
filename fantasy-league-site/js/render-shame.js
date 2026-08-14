const shameGrid = document.getElementById("shame-grid");

if (!CONFIG.wallOfShame || CONFIG.wallOfShame.length === 0) {
  shameGrid.innerHTML = `<p class="loading">No Wall of Shame entries yet — edit CONFIG.wallOfShame in js/config.js.</p>`;
} else {
  const sorted = [...CONFIG.wallOfShame].sort((a, b) => b.year - a.year);
  const shameCards = sorted
    .map(
      (entry) => `
      <div class="shame-card">
        <div class="shame-year">${entry.year}</div>
        <div class="shame-team">${entry.team}</div>
        <div class="shame-owner">${entry.owner}</div>
        <div class="shame-record">${entry.record}</div>
      </div>
    `
    )
    .join("");

  const bust = CONFIG.draftBust;
  const bustCard = bust
    ? `
      <div class="shame-card shame-card--bust">
        <div class="shame-year shame-year--bust">Draft Bust</div>
        <div class="shame-team">${bust.team}</div>
        <div class="shame-owner">${bust.owner}</div>
        <div class="shame-record">${bust.player} &middot; ${bust.points}</div>
        <div class="shame-bust-note">${bust.pick} overall, ${bust.year}. ${bust.note}</div>
      </div>
    `
    : "";

  shameGrid.innerHTML = shameCards + bustCard;
}
