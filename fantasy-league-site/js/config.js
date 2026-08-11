/**
 * ================================================================
 *  LEAGUE CONFIG — this is the only file most people need to edit.
 * ================================================================
 *
 *  leagueId   -> Find this in your ESPN Fantasy Football URL:
 *                https://fantasy.espn.com/football/league?leagueId=123456
 *                                                                    ^^^^^^ this number
 *
 *  seasons    -> List of years your league has existed, most recent first.
 *                Used to populate the year dropdowns on Standings/Draft.
 *
 *  currentSeason -> The year that should load by default.
 *
 *  history    -> One entry per completed season, used for the Ring of
 *                Honor banners on the home page. ESPN's API does not
 *                cleanly expose "who won the championship" in a single
 *                field across all seasons (playoff formats change), so
 *                this is filled in by hand once per year — takes two
 *                minutes when the season wraps up. Check the League
 *                History tab in the ESPN app for the final bracket.
 *
 *  punishments -> Free text list, shown on the Punishments page.
 *
 *  rules      -> Free text sections, shown on the Rules page.
 * ================================================================
 */

const CONFIG = {
  leagueName: "The League",
  tagline: "Glory is temporary. The group chat is forever.",

  leagueId: "123456",
  seasons: [2025, 2024, 2023, 2022, 2021],
  currentSeason: 2025,

  history: [
    {
      year: 2024,
      champion: "Team Name",
      owner: "Owner Name",
      record: "11-3",
      note: "Back-to-back after a Week 1 upset.",
    },
    {
      year: 2023,
      champion: "Team Name",
      owner: "Owner Name",
      record: "10-4",
      note: "Won it as the #6 seed.",
    },
    {
      year: 2022,
      champion: "Team Name",
      owner: "Owner Name",
      record: "12-2",
      note: "",
    },
  ],

  punishments: [
    {
      title: "Last Place",
      description:
        "The team with the worst regular-season record wears the League Jersey to the draft the following year and keeps it on for the group photo.",
    },
    {
      title: "The Sacko Bowl",
      description:
        "Teams ranked 9th and 10th play an extra consolation game. The loser sets up next year's draft board.",
    },
  ],

  rules: [
    {
      section: "Roster & Scoring",
      items: [
        "Standard PPR scoring.",
        "Starting lineup: QB, RB, RB, WR, WR, TE, FLEX, D/ST, K.",
        "Bench: 7 spots. IR: 1 spot.",
      ],
    },
    {
      section: "Draft",
      items: [
        "Snake draft order is randomized the night before.",
        "Draft is held in person — no remote picking unless cleared in advance.",
        "Pick timer: 90 seconds.",
      ],
    },
    {
      section: "Trades & Waivers",
      items: [
        "Trade deadline is Week 11.",
        "Waiver priority resets weekly based on standings (worst record picks first).",
        "Commissioner reviews trades for collusion, not for fairness.",
      ],
    },
    {
      section: "Playoffs",
      items: [
        "Top 6 teams make the playoffs.",
        "Weeks 15–17.",
        "Bottom 4 teams play in the Sacko Bowl consolation bracket.",
      ],
    },
  ],
};
