/**
 * Thin wrapper around our /api/league Cloudflare Function.
 * Also includes small helpers for pulling readable data out of ESPN's
 * (unofficial, undocumented) response shape. If ESPN changes their API,
 * this is the file to fix — the raw response is logged to the console
 * in dev to make that easier.
 */

async function fetchLeague(season, views) {
  const params = new URLSearchParams({ season, leagueId: CONFIG.leagueId });
  views.forEach((v) => params.append("view", v));

  const res = await fetch(`/api/league?${params.toString()}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

/** Map ESPN member id -> display name */
function buildMemberLookup(data) {
  const lookup = {};
  (data.members || []).forEach((m) => {
    lookup[m.id] = m.displayName || `${m.firstName || ""} ${m.lastName || ""}`.trim();
  });
  return lookup;
}

function teamOwnerName(team, memberLookup) {
  const ownerId = (team.owners || [])[0];
  return memberLookup[ownerId] || "Unknown Manager";
}

function teamDisplayName(team) {
  const name = `${team.location || ""} ${team.nickname || ""}`.trim();
  return name || team.abbrev || `Team ${team.id}`;
}

/** Renders a small error message inline instead of a blank page */
function showError(container, err) {
  console.error(err);
  container.innerHTML = `
    <div class="error-box">
      <p><strong>Couldn't load live data.</strong></p>
      <p>${err.message || "Something went wrong talking to the ESPN API."}</p>
      <p class="error-hint">Check that <code>leagueId</code> in js/config.js is correct and the league is public.</p>
    </div>
  `;
}
