/**
 * ================================================================
 *  RECORDS — career, all-time stats per owner, for the Records page.
 * ================================================================
 *  One entry per owner who has ever played in the league. Computed
 *  from Fantasy Matchup Data.xlsx (regular season record/PF, playoff
 *  bracket record — winners bracket only, no consolation ladders),
 *  Box Scores.xlsx (chugs — 0-point starts, excluding losers-bracket
 *  weeks, since the rule began in 2023), and Draft Recap.xlsx +
 *  Position Ranks.xlsx (career-best draft steal/bust).
 *
 *  years        -> every season this owner has played, ascending.
 *  regSeason    -> [wins, losses], career regular season.
 *  playoff      -> [wins, losses], winners-bracket games only.
 *  titles       -> array of championship years.
 *  careerPoints -> career regular-season points scored.
 *  ppg          -> career regular-season points per game.
 *  bestPfSeason -> single best regular-season points total.
 *  weeklyHigh   -> single highest weekly score (weeks 1-14 only,
 *                  since 2021's playoff weeks report combined
 *                  two-week totals, not single-week scores).
 *  chugs        -> career 0-point-start count since the 2023 rule.
 *  draftSteal / draftBust -> this owner's best/worst career pick,
 *                  by draft-position-rank vs. season-end rank.
 * ================================================================
 */

const RECORDS = {
  "Adam Kahler": {
    years: [2024, 2025],
    regSeason: [13, 15],
    playoff: [2, 0],
    titles: [2024],
    careerPoints: 3255.08,
    ppg: 116.25,
    bestPfSeason: { points: 1806.2, year: 2024 },
    weeklyHigh: { points: 189.26, year: 2024, week: 14 },
    chugs: 5,
    bio: "The most volatile résumé in Beefland: a 2024 title as a No. 2 seed shocker, sealed with a 52.38-point championship blowout, followed by a last-place finish and a date with the Carnivore Challenge in 2025. Feast or famine, no in-between.",
    draftSteal: {
      player: "Jakobi Meyers", pick: "R12.3", draftRank: "WR56",
      finalRank: "WR22", points: "224.0 pts", team: "Saquon Deez Nuts", note: "2024",
    },
    draftBust: {
      player: "Joe Burrow", pick: "R3.3", draftRank: "QB1",
      finalRank: "QB29", points: "136.5 pts", team: "Burrow this Chubb in the Brown", note: "2025",
    },
  },
  "Adam Schon": {
    years: [2022, 2023, 2024, 2025],
    regSeason: [19, 39],
    playoff: [0, 0],
    titles: [],
    careerPoints: 6412.96,
    ppg: 110.57,
    bestPfSeason: { points: 1697.96, year: 2024 },
    weeklyHigh: { points: 175.16, year: 2025, week: 12 },
    chugs: 11,
    bio: "Four Wall of Shame appearances since 2021 tell most of the story, but the stat sheet hides a knack for finding value late — a Round 10 Tyler Lockett turned into a top-15 receiver. Buys low, finishes low.",
    draftSteal: {
      player: "Tyler Lockett", pick: "R10.2", draftRank: "WR38",
      finalRank: "WR13", points: "245.3 pts", team: "I Can't Brees", note: "2022",
    },
    draftBust: {
      player: "Christian Watson", pick: "R5.8", draftRank: "WR21",
      finalRank: "WR69", points: "101.3 pts", team: "I Can't Brees", note: "2023",
    },
  },
  "Austin Gauss": {
    years: [2022, 2023, 2024, 2025],
    regSeason: [31, 27],
    playoff: [1, 2],
    titles: [],
    careerPoints: 6900.32,
    ppg: 118.97,
    bestPfSeason: { points: 1862.34, year: 2022 },
    weeklyHigh: { points: 189.2, year: 2023, week: 2 },
    chugs: 6,
    bio: "Boom-or-bust incarnate — the very same 2024 draft delivered a league-best steal in Chuba Hubbard and the single worst bust in Beefland history, a 47.8-point Christian McCaffrey season. Somehow still above .500 for his career.",
    draftSteal: {
      player: "Chuba Hubbard", pick: "R13.1", draftRank: "RB46",
      finalRank: "RB15", points: "249.6 pts", team: "Beats By Ray (Rice)", note: "2024",
    },
    draftBust: {
      player: "Christian McCaffrey", pick: "R1.1", draftRank: "RB1",
      finalRank: "RB70", points: "47.8 pts", team: "Beats By Ray (Rice)", note: "2024",
    },
  },
  "Ben Schon": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [42, 30],
    playoff: [2, 2],
    titles: [2021],
    careerPoints: 9410.86,
    ppg: 130.71,
    bestPfSeason: { points: 2028.68, year: 2022 },
    weeklyHigh: { points: 184.62, year: 2021, week: 3 },
    chugs: 5,
    bio: "Beefland's inaugural champion in 2021 and the all-time career PPG leader at 130.7 — the model of consistency every other owner still measures themselves against.",
    draftSteal: {
      player: "Josh Downs", pick: "R16.5", draftRank: "WR68",
      finalRank: "WR35", points: "190.5 pts", team: "Like a Good Nabers", note: "2024",
    },
    draftBust: {
      player: "Isiah Pacheco", pick: "R2.5", draftRank: "RB9",
      finalRank: "RB65", points: "56.9 pts", team: "Like a Good Nabers", note: "2024",
    },
  },
  "Blake Beachnau": {
    years: [2024, 2025],
    regSeason: [17, 11],
    playoff: [1, 1],
    titles: [],
    careerPoints: 3290.76,
    ppg: 117.53,
    bestPfSeason: { points: 1686.86, year: 2024 },
    weeklyHigh: { points: 163.06, year: 2025, week: 6 },
    chugs: 4,
    bio: "Two seasons in, already tied for the best win percentage of the current era — proof the hot start wasn't a fluke. A Round 11 Jerry Jeudy steal in his title-contending 2024 debut didn't hurt either.",
    draftSteal: {
      player: "Jerry Jeudy", pick: "R11.12", draftRank: "WR54",
      finalRank: "WR11", points: "258.9 pts", team: "Steeler Virginity", note: "2024",
    },
    draftBust: {
      player: "Mike Evans", pick: "R4.2", draftRank: "WR15",
      finalRank: "WR75", points: "86.8 pts", team: "Kareem in my Hunt", note: "2025",
    },
  },
  "Bobby Mowry": {
    years: [2021],
    regSeason: [2, 12],
    playoff: [0, 0],
    titles: [],
    careerPoints: 1559.18,
    ppg: 111.37,
    bestPfSeason: { points: 1559.18, year: 2021 },
    weeklyHigh: { points: 158.88, year: 2021, week: 5 },
    chugs: 0,
    active: false,
    bio: "Beefland's founding fall guy — a 2-12 debut season in 2021 that ended in the league's most legendary, least-discussed punishment. We do not speak of it. RIP Bobby.",
    draftSteal: {
      player: "Brandin Cooks", pick: "R11.1", draftRank: "WR36",
      finalRank: "WR19", points: "242.8 pts", team: "Gore Winning Me a Championship", note: "2021",
    },
    draftBust: {
      player: "DeAndre Hopkins", pick: "R3.1", draftRank: "WR4",
      finalRank: "WR46", points: "147.2 pts", team: "Gore Winning Me a Championship", note: "2021",
    },
  },
  "Brent Hurlburt": {
    years: [2022, 2023, 2024, 2025],
    regSeason: [27, 31],
    playoff: [1, 1],
    titles: [],
    careerPoints: 6904.48,
    ppg: 119.04,
    bestPfSeason: { points: 1909.28, year: 2022 },
    weeklyHigh: { points: 165.06, year: 2022, week: 2 },
    chugs: 13,
    bio: "The league's undisputed Chug King with 13 zero-point starts since 2023 — a distinction Brent wears as a badge of honor. Also found a Round 14 gem in Wan'Dale Robinson during a bounce-back 2025.",
    draftSteal: {
      player: "Wan'Dale Robinson", pick: "R14.7", draftRank: "WR62",
      finalRank: "WR14", points: "223.9 pts", team: "Uncle Lamb's", note: "2025",
    },
    draftBust: {
      player: "Cooper Kupp", pick: "R1.6", draftRank: "WR3",
      finalRank: "WR38", points: "177.4 pts", team: "2 Hurlburts 1 Cup", note: "2023",
    },
  },
  "Evan Lamb": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [34, 38],
    playoff: [0, 1],
    titles: [],
    careerPoints: 8474.74,
    ppg: 117.7,
    bestPfSeason: { points: 1789.32, year: 2024 },
    weeklyHigh: { points: 182.58, year: 2023, week: 5 },
    chugs: 11,
    bio: "Five seasons in, one lone playoff appearance, and a share of the current-era Chugs crown — a quietly steady Beefland career that keeps finding its way back to the middle of the pack.",
    draftSteal: {
      player: "Mike Williams", pick: "R15.2", draftRank: "WR48",
      finalRank: "WR12", points: "264.6 pts", team: "King Beef", note: "2021",
    },
    draftBust: {
      player: "Chris Carson", pick: "R5.2", draftRank: "RB18",
      finalRank: "RB83", points: "48.1 pts", team: "King Beef", note: "2021",
    },
  },
  "Jack Callahan": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [44, 28],
    playoff: [1, 5],
    titles: [],
    careerPoints: 9387.36,
    ppg: 130.38,
    bestPfSeason: { points: 2071.22, year: 2023 },
    weeklyHigh: { points: 208.82, year: 2023, week: 8 },
    chugs: 9,
    bio: "The best regular-season team money can buy — a league-best 61.1% all-time win rate and an 11-4 masterpiece in 2023 — undone every January by a brutal 1-5 playoff record. Beefland's most talented roster without a ring.",
    draftSteal: {
      player: "Jamaal Williams", pick: "R16.10", draftRank: "RB48",
      finalRank: "RB12", points: "234.9 pts", team: "Kelce You Later", note: "2022",
    },
    draftBust: {
      player: "Garrett Wilson", pick: "R4.11", draftRank: "WR18",
      finalRank: "WR63", points: "99.5 pts", team: "Bijan al Gaib", note: "2025",
    },
  },
  "Jacob Ayriss": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [35, 37],
    playoff: [5, 2],
    titles: [2025],
    careerPoints: 9014.22,
    ppg: 125.2,
    bestPfSeason: { points: 1989.98, year: 2023 },
    weeklyHigh: { points: 193.22, year: 2023, week: 5 },
    chugs: 3,
    bio: "The most playoff wins in league history, capped by a 2025 title won from the No. 6 seed as a certified Cinderella run — living proof that Beefland's regular season is just seeding for the real show.",
    draftSteal: {
      player: "Brian Thomas Jr.", pick: "R10.6", draftRank: "WR51",
      finalRank: "WR4", points: "302.0 pts", team: "Obi-Jan Kenobi", note: "2024",
    },
    draftBust: {
      player: "Jonathon Brooks", pick: "R6.6", draftRank: "RB23",
      finalRank: "RB114", points: "7.5 pts", team: "Obi-Jan Kenobi", note: "2024",
    },
  },
  "Jon Hurlburt": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [42, 30],
    playoff: [2, 2],
    titles: [2023],
    careerPoints: 9085.62,
    ppg: 126.19,
    bestPfSeason: { points: 1938.92, year: 2023 },
    weeklyHigh: { points: 208.56, year: 2025, week: 12 },
    chugs: 6,
    bio: "The 2023 champion and reigning single-game record holder at 208.56 points — Jon's teams have quietly been the league's most dominant offense over the last three seasons.",
    draftSteal: {
      player: "Chris Olave", pick: "R8.8", draftRank: "WR42",
      finalRank: "WR6", points: "279.0 pts", team: "Brocklyn Nine-Nine", note: "2025",
    },
    draftBust: {
      player: "Chris Olave", pick: "R2.8", draftRank: "WR10",
      finalRank: "WR93", points: "78.7 pts", team: "Commissioner of the Year", note: "2024",
    },
  },
  "Zach Crook": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [39, 33],
    playoff: [2, 2],
    titles: [],
    careerPoints: 9027.5,
    ppg: 125.38,
    bestPfSeason: { points: 1944.64, year: 2021 },
    weeklyHigh: { points: 211.2, year: 2021, week: 14 },
    chugs: 10,
    bio: "Owns the single-game scoring record dating back to Beefland's very first season (211.20 points, Week 14, 2021) and just posted the best regular season of the current era in 2025 — the longest-tenured burst of pure firepower in the league.",
    draftSteal: {
      player: "Michael Wilson", pick: "R16.4", draftRank: "WR67",
      finalRank: "WR12", points: "228.6 pts", team: "Oh. My. Gosh. Lookit. Her. Bert", note: "2025",
    },
    draftBust: {
      player: "Michael Thomas", pick: "R6.9", draftRank: "WR27",
      finalRank: "WR117", points: "51.1 pts", team: "Team Crook", note: "2022",
    },
  },
  "Zack Rollis": {
    years: [2021, 2022, 2023, 2024, 2025],
    regSeason: [33, 39],
    playoff: [2, 1],
    titles: [2022],
    careerPoints: 8641.32,
    ppg: 120.02,
    bestPfSeason: { points: 2080.02, year: 2023 },
    weeklyHigh: { points: 199.68, year: 2023, week: 3 },
    chugs: 5,
    bio: "The 2022 champion, with an asterisk-worthy ending, and the owner of the highest-scoring season in Beefland history — 2,080.02 points in 2023. Capable of complete domination, and once sentenced to a Wheel of Doom for proving the opposite.",
    draftSteal: {
      player: "Raheem Mostert", pick: "R15.2", draftRank: "RB45",
      finalRank: "RB5", points: "273.7 pts", team: "Richmond Diamond Dogs", note: "2023",
    },
    draftBust: {
      player: "Tee Higgins", pick: "R2.9", draftRank: "WR10",
      finalRank: "WR50", points: "146.6 pts", team: "Richmond Diamond Dogs", note: "2023",
    },
  },
};
