document.getElementById("site-title").innerHTML =
  `${CONFIG.leagueName.split(" ").slice(0, -1).join(" ")} <span>${CONFIG.leagueName.split(" ").slice(-1)}</span>`;

const select = document.getElementById("season-select");
const wrap = document.getElementById("draft-wrap");

CONFIG.seasons.forEach((year) => {
  const opt = document.createElement("option");
  opt.value = year;
  opt.textContent = year;
  if (year === CONFIG.currentSeason) opt.selected = true;
  select.appendChild(opt);
});

select.addEventListener("change", () => loadDraft(select.value));
loadDraft(CONFIG.currentSeason);

async function loadDraft(season) {
  wrap.innerHTML = `<p class="loading">Loading draft board…</p>`;
  try {
    const data = await fetchLeague(season, ["mDraftDetail", "mTeam"]);
    const picks = data.draftDetail?.picks || [];

    if (!data.draftDetail?.drafted || picks.length === 0) {
      wrap.innerHTML = `<p class="loading">No draft data available for ${season} yet.</p>`;
      return;
    }

    const teamsById = {};
    (data.teams || []).forEach((t) => (teamsById[t.id] = teamDisplayName(t)));

    const rounds = {};
    picks.forEach((pick) => {
      rounds[pick.roundId] = rounds[pick.roundId] || [];
      rounds[pick.roundId].push(pick);
    });

    const roundIds = Object.keys(rounds).sort((a, b) => a - b);

    wrap.innerHTML = roundIds
      .map((roundId) => {
        const rows = rounds[roundId]
          .sort((a, b) => a.roundPickNumber - b.roundPickNumber)
          .map((pick) => {
            const playerName =
              pick.playerPoolEntry?.player?.fullName || `Player #${pick.playerId}`;
            const teamName = teamsById[pick.teamId] || `Team ${pick.teamId}`;
            return `
              <tr>
                <td class="rank">${pick.overallPickNumber}</td>
                <td class="team-cell">${playerName}</td>
                <td class="owner-cell">${teamName}</td>
              </tr>
            `;
          })
          .join("");

        return `
          <h2>Round ${roundId}</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Pick</th><th>Player</th><th>Drafted By</th></tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        `;
      })
      .join("");
  } catch (err) {
    showError(wrap, err);
  }
}
