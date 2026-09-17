const chugWrap = document.getElementById("chug-tracker-wrap");

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
          .map((e) => `Wk ${e.week}: ${e.player} (${e.team})${e.completed ? " — done" : " — owed"}`)
          .join("; ");
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
