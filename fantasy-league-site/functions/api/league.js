/**
 * Cloudflare Pages Function: /api/league
 *
 * Proxies requests to ESPN's public Fantasy Football API and caches the
 * response at the edge for a few minutes. This exists for two reasons:
 *
 *  1. Browsers calling ESPN's API directly can hit CORS restrictions.
 *  2. Caching keeps us from hammering ESPN's servers if several people
 *     load the site around the same time.
 *
 * Example request from the frontend:
 *   /api/league?season=2025&leagueId=123456&view=mTeam&view=mStandings
 *
 * Only works for PUBLIC leagues. Private leagues require ESPN auth
 * cookies (espn_s2 / SWID), which are intentionally not handled here
 * to avoid storing personal credentials in a public repo.
 */

const CACHE_SECONDS = 300; // 5 minutes

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);

  const season = url.searchParams.get("season");
  const leagueId = url.searchParams.get("leagueId");
  const views = url.searchParams.getAll("view"); // supports multiple ?view=...&view=...

  if (!season || !/^\d{4}$/.test(season)) {
    return jsonError("Missing or invalid 'season' (expected a 4-digit year).", 400);
  }
  if (!leagueId || !/^\d+$/.test(leagueId)) {
    return jsonError("Missing or invalid 'leagueId'.", 400);
  }
  if (views.length === 0) {
    return jsonError("At least one 'view' parameter is required (e.g. mTeam).", 400);
  }
  // Whitelist to known ESPN view names to keep this from being an open proxy.
  const allowedViews = new Set([
    "mTeam",
    "mRoster",
    "mMatchup",
    "mMatchupScore",
    "mStandings",
    "mSettings",
    "mDraftDetail",
    "mNav",
  ]);
  for (const v of views) {
    if (!allowedViews.has(v)) {
      return jsonError(`View '${v}' is not allowed.`, 400);
    }
  }

  const espnUrl = new URL(
    `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${season}/segments/0/leagues/${leagueId}`
  );
  views.forEach((v) => espnUrl.searchParams.append("view", v));

  // Edge cache lookup
  const cacheKey = new Request(espnUrl.toString(), request);
  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (!response) {
    const espnResponse = await fetch(espnUrl.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!espnResponse.ok) {
      return jsonError(
        `ESPN API returned ${espnResponse.status}. The league may be private, or the season/leagueId may be wrong.`,
        espnResponse.status
      );
    }

    const body = await espnResponse.text();
    response = new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_SECONDS}`,
        "Access-Control-Allow-Origin": "*",
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
