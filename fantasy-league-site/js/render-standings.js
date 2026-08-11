document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const select = document.getElementById("season-select");
const wrap = document.getElementById("standings-wrap");

CONFIG.seasons.forEach((year) => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  if (year === CONFIG.currentSeason) opt.selected = true;
  select.appendChild(opt);
});

select.addEventListener("change", () => loadStandings(select.value));
loadStandings(CONFIG.currentSeason);

async function loadStandings(season) {
  wrap.innerHTML = `<p class="loading">Loading standings…</p>`;
  try {
    const data = await fetchLeague(season, ["mTeam", "mStandings"]);
    const memberLookup = buildMemberLookup(data);

    const teams = [...(data.teams || [])].sort((a, b) => {
      const seedA = a.playoffSeed || 999;
      const seedB = b.playoffSeed || 999;
      return seedA - seedB;
    });

    if (teams.length === 0) {
      wrap.innerHTML = `<p class="loading">No standings data returned for ${season}.</p>`;
      return;
    }

    const rows = teams
      .map((team, i) => {
        const rec = team.record?.overall || {};
        const wins = rec.wins ?? 0;
        const losses = rec.losses ?? 0;
        const ties = rec.ties ?? 0;
        const pf = (rec.pointsFor ?? 0).toFixed(1);
        const pa = (rec.pointsAgainst ?? 0).toFixed(1);
        return `
          <tr>
            <td class="rank">${team.playoffSeed || i + 1}</td>
            <td class="team-cell">${teamDisplayName(team)}</td>
            <td class="owner-cell">${teamOwnerName(team, memberLookup)}</td>
            <td>${wins}-${losses}${ties ? `-${ties}` : ""}</td>
            <td>${pf}</td>
            <td>${pa}</td>
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
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  } catch (err) {
    showError(wrap, err);
  }
}
