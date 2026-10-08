document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const wrap = document.getElementById("standings-2026-wrap");

if (!CONFIG.standings2026 || CONFIG.standings2026.length === 0) {
  wrap.innerHTML = `<p class="loading">No 2026 standings yet — edit CONFIG.standings2026 in js/config.js.</p>`;
} else {
  const sorted = [...CONFIG.standings2026].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pf - a.pf;
  });

  const rows = sorted
    .map((t, i) => {
      const diff = t.pf - t.pa;
      const diffLabel = `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}`;
      return `
        <tr>
          <td class="rank">${i + 1}</td>
          <td class="team-cell">${t.team}</td>
          <td class="owner-cell">${t.owner}</td>
          <td>${t.wins}-${t.losses}</td>
          <td>${t.pf.toFixed(2)}</td>
          <td>${t.pa.toFixed(2)}</td>
          <td>${diffLabel}</td>
        </tr>
      `;
    })
    .join("");

  wrap.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Seed</th>
            <th>Team</th>
            <th>Manager</th>
            <th>Record</th>
            <th>PF</th>
            <th>PA</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}
