/**
 * ================================================================
 *  Superlatives Calculator
 * ================================================================
 *
 *  Run this once locally (not deployed as part of the site) to
 *  calculate League Superlatives from your league's full history.
 *  It fetches every season's matchup data from ESPN and prints a
 *  ready-to-paste CONFIG.superlatives block.
 *
 *  Requires Node.js 18 or newer (for built-in fetch).
 *
 *  Usage:
 *    node scripts/calculate-superlatives.mjs
 *
 *  Then copy the printed block into js/config.js, replacing the
 *  existing `superlatives:` array.
 *
 * ----------------------------------------------------------------
 *  A few judgment calls are baked in below — adjust the marked
 *  constants if you'd define these differently for your league:
 *
 *  - "Playoff wins" counts wins in the winners' bracket only
 *    (not the consolation/losers' bracket).
 *  - "Win %" and "Highest Scoring Season" use regular-season
 *    games only (playoffs are a small, unequal sample size).
 *  - "Career PPG" and "Single-Game Record" include every game,
 *    regular season and playoffs.
 *  - Career stats are grouped by MANAGER (owner), not by team
 *    name, since team names change year to year.
 * ================================================================
 */

const LEAGUE_ID = "989866932";
const SEASONS = [2021, 2022, 2023, 2024, 2025];

// ESPN moved their API to this subdomain in 2024; it works for older
// seasons too, so we use it for everything.
const BASE_URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons";

async function fetchSeason(year) {
  const url = `${BASE_URL}/${year}/segments/0/leagues/${LEAGUE_ID}?view=mTeam&view=mMatchupScore&view=mStandings&view=mSettings`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${year}: HTTP ${res.status}`);
  }
  return res.json();
}

function buildMemberLookup(data) {
  const lookup = {};
  (data.members || []).forEach((m) => {
    lookup[m.id] = m.displayName || `${m.firstName || ""} ${m.lastName || ""}`.trim();
  });
  return lookup;
}

function teamDisplayName(team) {
  const name = `${team.location || ""} ${team.nickname || ""}`.trim();
  return name || team.abbrev || `Team ${team.id}`;
}

async function main() {
  // Per-manager career totals, keyed by ownerId
  const career = {};
  // Per-team-season records, for "best single season" style stats
  const seasons = [];
  // Every individual game score, for single-game record
  const allGames = [];
  // Champion + seed per year, for Cinderella Champ
  const champions = [];

  for (const year of SEASONS) {
    console.error(`Fetching ${year}...`);
    const data = await fetchSeason(year);

    const memberLookup = buildMemberLookup(data);
    const teamsById = {};
    (data.teams || []).forEach((t) => {
      teamsById[t.id] = {
        name: teamDisplayName(t),
        ownerId: (t.owners || [])[0],
        ownerName: memberLookup[(t.owners || [])[0]] || "Unknown Manager",
        playoffSeed: t.playoffSeed,
      };
    });

    // Per-team-season accumulators
    const seasonStats = {};
    Object.keys(teamsById).forEach((id) => {
      seasonStats[id] = { wins: 0, losses: 0, ties: 0, points: 0, games: 0, playoffWins: 0 };
    });

    (data.schedule || []).forEach((matchup) => {
      const isPlayoff = matchup.playoffTierType && matchup.playoffTierType !== "NONE";
      const isWinnersBracket = matchup.playoffTierType === "WINNERS_BRACKET";
      const sides = [
        { info: matchup.home, opp: matchup.away },
        { info: matchup.away, opp: matchup.home },
      ];

      sides.forEach(({ info, opp }) => {
        if (!info || info.totalPoints == null || info.totalPoints === 0) return;
        const teamMeta = teamsById[info.teamId];
        if (!teamMeta) return;

        allGames.push({
          teamId: info.teamId,
          team: teamMeta.name,
          owner: teamMeta.ownerName,
          points: info.totalPoints,
          year,
          week: matchup.matchupPeriodId,
        });

        // Career totals (every game, regular + playoff)
        if (!career[teamMeta.ownerId]) {
          career[teamMeta.ownerId] = {
            owner: teamMeta.ownerName,
            wins: 0,
            losses: 0,
            ties: 0,
            points: 0,
            games: 0,
            playoffWins: 0,
            teams: new Set(),
          };
        }
        const c = career[teamMeta.ownerId];
        c.points += info.totalPoints;
        c.games += 1;
        c.teams.add(teamMeta.name);

        if (opp && opp.totalPoints != null) {
          if (info.totalPoints > opp.totalPoints) {
            c.wins += 1;
            if (isWinnersBracket) c.playoffWins += 1;
          } else if (info.totalPoints < opp.totalPoints) {
            c.losses += 1;
          } else {
            c.ties += 1;
          }
        }

        // Regular-season-only per-team-season accumulator
        if (!isPlayoff) {
          const s = seasonStats[info.teamId];
          if (s) {
            s.points += info.totalPoints;
            s.games += 1;
            if (opp && opp.totalPoints != null) {
              if (info.totalPoints > opp.totalPoints) s.wins += 1;
              else if (info.totalPoints < opp.totalPoints) s.losses += 1;
              else s.ties += 1;
            }
          }
        }
      });

      // Track the championship game (last winners-bracket matchup) to find that year's champ + seed
      if (isWinnersBracket && matchup.winner && matchup.winner !== "UNDECIDED") {
        const winnerSide = matchup.winner === "HOME" ? matchup.home : matchup.away;
        if (winnerSide) {
          const meta = teamsById[winnerSide.teamId];
          if (meta) {
            const existing = champions.find((c) => c.year === year);
            // Keep the matchup with the highest matchupPeriodId as the final
            if (!existing || matchup.matchupPeriodId > existing.week) {
              const record = { year, week: matchup.matchupPeriodId, team: meta.name, owner: meta.ownerName, seed: meta.playoffSeed };
              if (existing) {
                Object.assign(existing, record);
              } else {
                champions.push(record);
              }
            }
          }
        }
      }
    });

    Object.entries(seasonStats).forEach(([teamId, s]) => {
      if (s.games === 0) return;
      const meta = teamsById[teamId];
      seasons.push({
        year,
        team: meta.name,
        owner: meta.ownerName,
        wins: s.wins,
        losses: s.losses,
        ties: s.ties,
        points: s.points,
        games: s.games,
        winPct: (s.wins + s.ties * 0.5) / s.games,
      });
    });
  }

  // ---- Calculate each superlative ----

  const careerList = Object.values(career).map((c) => ({
    ...c,
    winPct: (c.wins + c.ties * 0.5) / (c.wins + c.losses + c.ties),
    ppg: c.points / c.games,
    teams: [...c.teams].join(" / "),
  }));

  const mostPlayoffWins = [...careerList].sort((a, b) => b.playoffWins - a.playoffWins)[0];
  const bestWinPct = [...careerList].sort((a, b) => b.winPct - a.winPct)[0];
  const highestPPG = [...careerList].sort((a, b) => b.ppg - a.ppg)[0];
  const bestRegSeason = [...seasons].sort((a, b) => b.winPct - a.winPct || b.points - a.points)[0];
  const highestScoringSeason = [...seasons].sort((a, b) => b.points - a.points)[0];
  const singleGame = [...allGames].sort((a, b) => b.points - a.points)[0];
  const cinderella = [...champions].sort((a, b) => (b.seed || 0) - (a.seed || 0))[0];

  function formatRecord(w, l, t) {
    return `${w}-${l}${t ? `-${t}` : ""}`;
  }

  const block = `  superlatives: [
    {
      category: "Most Playoff Wins",
      holder: "${mostPlayoffWins.owner}",
      team: "${mostPlayoffWins.teams}",
      value: "${mostPlayoffWins.playoffWins} playoff wins",
    },
    {
      category: "Best Win %",
      holder: "${bestWinPct.owner}",
      team: "${bestWinPct.teams}",
      value: "${(bestWinPct.winPct * 100).toFixed(1)}% (${formatRecord(bestWinPct.wins, bestWinPct.losses, bestWinPct.ties)})",
    },
    {
      category: "Highest Career PPG",
      holder: "${highestPPG.owner}",
      team: "${highestPPG.teams}",
      value: "${highestPPG.ppg.toFixed(1)} PPG",
    },
    {
      category: "Best Regular Season",
      holder: "${bestRegSeason.owner}",
      team: "${bestRegSeason.team}",
      value: "${formatRecord(bestRegSeason.wins, bestRegSeason.losses, bestRegSeason.ties)}",
      note: "${bestRegSeason.year}",
    },
    {
      category: "Highest Scoring Season",
      holder: "${highestScoringSeason.owner}",
      team: "${highestScoringSeason.team}",
      value: "${highestScoringSeason.points.toFixed(1)} pts",
      note: "${highestScoringSeason.year}",
    },
    {
      category: "Single-Game Record",
      holder: "${singleGame.owner}",
      team: "${singleGame.team}",
      value: "${singleGame.points.toFixed(1)} pts",
      note: "Week ${singleGame.week}, ${singleGame.year}",
    },
    {
      category: "Cinderella Champ",
      holder: "${cinderella.owner}",
      team: "${cinderella.team}",
      value: "#${cinderella.seed} seed",
      note: "${cinderella.year}",
    },
  ],`;

  console.log("\n\n=== Paste this into js/config.js, replacing the existing superlatives array ===\n");
  console.log(block);
  console.log("\n=== End ===\n");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
