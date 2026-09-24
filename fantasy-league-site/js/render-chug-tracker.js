const chugWrap = document.getElementById("chug-tracker-wrap");

// Show the "watch all chug videos" link if a folder URL is configured.
const chugFolderLink = document.getElementById("chug-folder-link");
if (chugFolderLink && CONFIG.chugFolderUrl) {
  chugFolderLink.href = CONFIG.chugFolderUrl;
  chugFolderLink.style.display = "";
}

if (!CONFIG.chugLog2026 || CONFIG.chugLog2026.length === 0) {
  chugWrap.innerHTML = `<p class="loading">No chugs logged yet this season — edit CONFIG.chugLog2026 in js/config.js.</p>`;
} else {
  // Group every logged chug by owner.
  const byOwner = {};
  CONFIG.chugLog2026.forEach((entry) => {
    if (!byOwner[entry.owner]) {
      byOwner[entry.owner] = { owner: entry.owner, owed: 0, completed: 0, entries: [] };
    }
    byOwner[entry.owner].owed += 1;
    if (entry.completed) byOwner[entry.owner].completed += 1;
    byOwner[entry.owner].entries.push(entry);
  });

  // Only managers with at least one chug owed make the board.
  const rows = Object.values(byOwner)
    .filter((o) => o.owed > 0)
    .sort((a, b) => b.owed - a.owed || a.owner.localeCompare(b.owner));

  if (rows.length === 0) {
    chugWrap.innerHTML = `<p class="loading">Nobody owes a chug right now. Clean week.</p>`;
  } else {
    const tableRows = rows
      .map((r) => {
        const outstanding = r.owed - r.completed;
        const detail = r.entries
          .map((e) => {
            const base = `Wk ${e.week}: ${e.player} (${e.team})`;
            const time = typeof e.chugTimeSeconds === "number" ? ` — <span class="chug-time">${e.chugTimeSeconds}s</span>` : "";
            if (e.completed && e.video) {
              return `<div class="chug-detail-row">${base}${time} — <a class="chug-watch-link" href="${e.video}" target="_blank" rel="noopener">watch &#9654;</a></div>`;
            }
            return `<div class="chug-detail-row">${base}${time}${e.completed ? " — done" : " — owed"}</div>`;
          })
          .join("");
        return `
          <tr>
            <td class="owner-cell">${r.owner}</td>
            <td>${r.owed}</td>
            <td>${r.completed}</td>
            <td class="${outstanding > 0 ? "chug-outstanding" : "chug-clear"}">${outstanding}</td>
            <td class="chug-detail">${detail}</td>
          </tr>
        `;
      })
      .join("");

    chugWrap.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Manager</th>
              <th>Chugs Owed</th>
              <th>Chugs Completed</th>
              <th>Outstanding</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    `;
  }
}
