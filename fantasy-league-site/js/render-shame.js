const shameGrid = document.getElementById("shame-grid");

if (!CONFIG.wallOfShame || CONFIG.wallOfShame.length === 0) {
  shameGrid.innerHTML = `<p class="loading">No Wall of Shame entries yet — edit CONFIG.wallOfShame in js/config.js.</p>`;
} else {
  const sorted = [...CONFIG.wallOfShame].sort((a, b) => b.year - a.year);
  shameGrid.innerHTML = sorted
    .map((entry) => {
      const wp = entry.worstPick;
      return `
      <div class="shame-card">
        <div class="shame-year">${entry.year}</div>
        <div class="shame-team">${entry.team}</div>
        <div class="shame-owner">${entry.owner}</div>
        <div class="shame-record">${entry.record}</div>
        ${
          wp
            ? `
        <div class="shame-bust-label">Worst Pick</div>
        <div class="shame-bust-note">${wp.player} &middot; ${wp.pick} &middot; ${wp.points}</div>`
            : ""
        }
      </div>
    `;
    })
    .join("");
}
