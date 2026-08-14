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
 *  punishmentRules -> General rules that apply to punishments every year,
 *                     shown at the top of the Punishments page above the
 *                     year-by-year cards.
 *
 *  punishments -> One entry per season, most recent first. Each has:
 *                year, title, loser (name, or null if not decided yet),
 *                summary (shown always), and regulations (optional —
 *                an array shown collapsed under "Full Regulations").
 *                Each regulation is either a plain string, or an object
 *                { text, subitems: [...] } for nested sub-rules — subitems
 *                can nest again the same way if you need a third level.
 *
 *  superlativesCurrent -> Career awards computed from only the last two
 *                  seasons (2024-2025), since that's when the league grew
 *                  to its current 12-team size — stats from the 8- and
 *                  10-team years aren't really apples-to-apples with today.
 *
 *  superlativesAllTime -> The same 8 categories, but across full league
 *                  history since 2021, teams of every size included.
 *
 *  Both use the same shape: category, holder (owner name), team, value
 *  (the stat itself, as display text), and an optional note/year.
 *
 *  wallOfShame -> One entry per season's last-place team, shown on the home
 *                 page opposite the Ring of Honor. Same shape as `history`.
 *
 *  rules      -> Sections shown on the Rules page. Each section has a
 *                title and an items array. Each item is either a plain
 *                string, or an object { text, subitems, listStyle } for
 *                a bullet with nested sub-rules underneath — subitems
 *                can nest again the same way if needed. listStyle can
 *                be "numbers" (default) or "letters".
 * ================================================================
 */

const CONFIG = {
  leagueName: "Beefland",
  tagline: "Glory is temporary. The group chat is forever.",

  leagueId: "989866932",
  seasons: [2026, 2025, 2024, 2023, 2022, 2021],
  currentSeason: 2026,

  history: [
    {
      year: 2025,
      champion: "Magic in the Hamptons",
      owner: "Jacob Ayriss",
      record: "7-7",
      note: "Won it at .500 — proof the regular season doesn't matter.",
    },
    {
      year: 2024,
      champion: "Saquon Deez Nuts",
      owner: "Adam Kahler",
      record: "9-5",
      note: "First (and still only) No. 2 seed to win it all, sealed with a 52.38-point championship blowout over the No. 1 seed.",
    },
    {
      year: 2023,
      champion: "Commissioner of the Year",
      owner: "Jon Hurlburt",
      record: "10-5",
      note: "Beat the No. 3 seed 157.10–88.38 in the final — the largest championship-game margin in Beefland history (68.72 pts).",
    },
    {
      year: 2022,
      champion: "Richmond Diamond Dogs",
      owner: "Zack Rollis",
      record: "9-6",
      asterisk: true,
      note: "*The Bengals–Bills Monday Night game ended early with the title unsettled — the payout was split 75/25.",
    },
    {
      year: 2021,
      champion: "Nick Foles SZN Champ",
      owner: "Ben Schon",
      record: "10-4",
      note: "Beefland's first champion — won two-week semifinal and final rounds, a playoff format used only in 2021.",
    },
  ],

  punishmentRules: [
    "The punishment will be chosen by the previous year's champion. A majority of the league must vote to approve the punishment. The Commissioner is the tiebreaker.",
    "The league loser will be determined as the team with the worst record at the end of the regular season. In the case of multiple teams competing for last place, the standard ESPN tiebreaker will be used (PF, PA, then H2H).",
    "A manager who refuses to complete the agreed-upon league punishment will be kicked from the league and replaced with a more committed manager.",
  ],

  punishments: [
    {
      year: 2026,
      title: "The Carnivore Challenge",
      loser: null,
      summary:
        'The following declaration shall lay forth regulations for the 2026 Beefland Fantasy Football League punishment. The rulings must be strictly adhered to by thee who art in last place at the conclusion of the 2026 fantasy football regular season, henceforth referred to as "The Loser." Upon completion of the season, The Loser will be required to attempt the Carnivore Challenge at Meat BBQ in Lansing, MI: The Boss Logg (18 layers — pork, brisket, 2 burger patties, bacon, fries, gravy, cheddar, ‘merican, and pepper jack cheese, hot garlic sauce, jalapeños, and a sunny side up egg), 1 side, and a made-to-order mac and cheese with 2 toppings. Eating it all within 45 minutes relieves The Loser of the $55 bill, earns a T-shirt and a photo on the wall, and grants a moment of glory in a tumultuous season.',
      regulations: [
        {
          text: "All food provided in the Carnivore Challenge must be eaten solely by The Loser.",
          subitems: [
            "No aid may be provided by any person, animal, or other entity which would reduce the amount of food The Loser would consume.",
          ],
        },
        "All food provided in the Carnivore Challenge must be consumed by The Loser before they are able to leave the restaurant.",
        {
          text: "The Loser must give full effort to complete the Carnivore Challenge in the 45 minutes allotted by the restaurant.",
          subitems: [
            'If the league deems "full effort" was not given by The Loser, a judgement panel will be utilized to rule on the matter.',
            "The judgement panel will be comprised of any significant other (girlfriend/fiancée/wife) of all league members, including The Loser.",
            '"Full Effort" is defined as "a serious attempt to complete the challenge with all physical and mental power." Full effort can be given without successful completion of the challenge in 45 minutes.',
            {
              text: 'The judgement panel will vote "Yay" or "Nay" on Full Effort, with majority ruling.',
              subitems: [
                'If "Yay" is the ruling, The Loser has completed the 2026 Fantasy Football punishment.',
                'If "Nay" is the ruling, The Loser must provide $100 toward the purchase of a Beefland Fantasy Football League Trophy, to be awarded to the champion each season.',
              ],
            },
          ],
        },
        "The Loser is allowed to leave the table to use the restroom during the challenge.",
        {
          text: "The Loser is not allowed to force themselves to puke during the challenge.",
          subitems: [
            "Forceful puking results in failure of the challenge. Remaining food must still be consumed before leaving. The Loser will provide $100 for the league trophy.",
          ],
        },
        {
          text: "The Loser must notify the league of the challenge date two weeks beforehand, so other members can plan to attend.",
          subitems: [
            "If no other member can attend, The Loser must reschedule to ensure at least one member can attend.",
          ],
        },
        "Video/livestream must be provided so league members unable to attend in person can spectate the event.",
        "Punishment must be completed before the 2027 Beefland Fantasy Football League Draft.",
      ],
    },
    {
      year: 2025,
      title: "18 Holes in a Skirt",
      loser: "Adam Kahler",
      summary:
        "The Loser must play 18 holes of golf in a skirt or dress. A witness must be present to attest to completion. A mercy of double par can be applied for non-golfers, but they must attempt every hole.",
      regulations: null,
    },
    {
      year: 2024,
      title: "Wheel of Doom",
      loser: "Zack Rollis",
      summary:
        "The loser spins a wheel for their punishment, using an online application, with the commissioner documenting the entire wheel creation and spin for the league to see. The wheel is spun 3 times, with the final spin being the punishment.",
      regulations: [
        "20% – IHOP Challenge: stay at your local IHOP for 24 hours; each pancake eaten removes 1 hour from the punishment. No requesting smaller pancakes. Photos/videos of pancakes eaten must be shared with the league.",
        "20% – Beer Mile: run a mile, chugging a 12oz beer every 1/4 mile, along a route shared with the league in advance.",
        "20% – Hot Dog Challenge: eat nothing but hot dogs until reaching (Total Losses, Playoff + Regular Season) × 2 hot dogs, same brand, regular size, in a row.",
        "20% – Solo Date Night: make a dinner reservation for two at a real restaurant, dress up, order for an imaginary date, and improvise with the server when they ask where she is.",
        "15% – Champion Names Your Team: the league champion renames your team for the rest of the off-season and all of next season.",
        "5% – No Punishment: sometimes the wheel just likes you.",
      ],
    },
    {
      year: 2023,
      title: "Lemonade Stand",
      loser: "Adam Schon",
      summary:
        "The loser runs a lemonade stand and must keep running it until they raise $100 to cover misc. draft fees for the next season — max 12 hours. The stand's location must be shared with the league so they can stop by and show support.",
      regulations: null,
    },
    {
      year: 2022,
      title: '"4-6-8-10" Challenge',
      loser: "Adam Schon",
      summary:
        "The loser completes the 4-6-8-10 game: 4, then 6, then 8, then 10 of 'something,' all within 24 hours. Choices: dollars donated to charity ×10, beers drank, hot dogs eaten, or miles run.",
      regulations: null,
    },
    {
      year: 2021,
      title: "Wax on, Wax Off",
      loser: "Bobby Mowry",
      summary: "We do not speak of this challenge. RIP Bobby.",
      regulations: null,
    },
  ],

  superlativesCurrent: [
    {
      category: "Most Playoff Wins",
      holder: "Jacob Ayriss",
      team: "Magic in the Hamptons",
      value: "3 Wins",
    },
    {
      category: "Best Win %",
      holder: "Ben Schon",
      team: "Bill! Bill! Bill! Bill!",
      value: "60.7% (17-11)",
      note: "tied with Blake Beachnau",
    },
    {
      category: "Highest Career PPG",
      holder: "Jon Hurlburt",
      team: "Brocklyn Nine-Nine",
      value: "124.5 PPG",
    },
    {
      category: "Best Regular Season",
      holder: "Zach Crook",
      team: "Oh. My. Gosh. Lookit. Her. Bert",
      value: "10-4",
      note: "2025",
    },
    {
      category: "Highest Scoring Season",
      holder: "Jon Hurlburt",
      team: "Brocklyn Nine-Nine",
      value: "1,891.10 pts",
      note: "2025",
    },
    {
      category: "Single-Game Record",
      holder: "Jon Hurlburt",
      team: "Brocklyn Nine-Nine",
      value: "208.56 pts",
      note: "Week 12, 2025",
    },
    {
      category: "Cinderella Champ",
      holder: "Jacob Ayriss",
      team: "Magic in the Hamptons",
      value: "#6 seed",
      note: "2025",
    },
    {
      category: "Most Chugs",
      holder: "Evan Lamb",
      team: "Kelce Krushed my Worthy",
      value: "9 Chugs",
      note: "tied with Adam Schon, 2024–2025",
    },
  ],

  superlativesAllTime: [
    {
      category: "Most Playoff Wins",
      holder: "Jacob Ayriss",
      team: "Magic in the Hamptons",
      value: "5 Wins",
    },
    {
      category: "Best Win %",
      holder: "Jack Callahan",
      team: "Bijan al Gaib",
      value: "61.1% (44-28)",
    },
    {
      category: "Highest Career PPG",
      holder: "Ben Schon",
      team: "Bill! Bill! Bill! Bill!",
      value: "130.7 PPG",
    },
    {
      category: "Best Regular Season",
      holder: "Jack Callahan",
      team: "Saquon These Balls",
      value: "11-4",
      note: "2023",
    },
    {
      category: "Highest Scoring Season",
      holder: "Zack Rollis",
      team: "Richmond Diamond Dogs",
      value: "2,080.02 pts",
      note: "2023",
    },
    {
      category: "Single-Game Record",
      holder: "Zach Crook",
      team: "Save The Bees",
      value: "211.20 pts",
      note: "Week 14, 2021",
    },
    {
      category: "Cinderella Champ",
      holder: "Jacob Ayriss",
      team: "Magic in the Hamptons",
      value: "#6 seed",
      note: "2025",
    },
    {
      category: "Most Chugs",
      holder: "Brent Hurlburt",
      team: "Uncle Lamb's",
      value: "13 Chugs",
      note: "2023–2025",
    },
  ],

  wallOfShame: [
    {
      year: 2025,
      team: "Burrow this Chubb in the Brown",
      owner: "Adam Kahler",
      record: "4-10",
      worstPick: {
        player: "Joe Burrow",
        pick: "R3.3",
        points: "115.3 pts",
        draftRank: "QB1",
        finalRank: "QB29",
      },
    },
    {
      year: 2024,
      team: "Richmond Diamond Dogs",
      owner: "Zack Rollis",
      record: "2-12",
      worstPick: {
        player: "Stefon Diggs",
        pick: "R3.11",
        points: "121.9 pts",
        draftRank: "WR19",
        finalRank: "WR67",
      },
    },
    {
      year: 2023,
      team: "I Can't Brees",
      owner: "Adam Schon",
      record: "2-13",
      worstPick: {
        player: "Derrick Henry",
        pick: "R1.8",
        points: "231.4 pts",
        draftRank: "RB3",
        finalRank: "RB9",
      },
    },
    {
      year: 2022,
      team: "I Can't Brees",
      owner: "Adam Schon",
      record: "3-12",
      worstPick: {
        player: "Deebo Samuel",
        pick: "R2.2",
        points: "171.0 pts",
        draftRank: "WR4",
        finalRank: "WR39",
      },
    },
    {
      year: 2021,
      team: "Gore Winning Me a Championship",
      owner: "Bobby Mowry",
      record: "2-12",
      worstPick: {
        player: "Christian McCaffrey",
        pick: "R1.1",
        points: "127.5 pts",
        draftRank: "RB1",
        finalRank: "RB38",
      },
    },
  ],

  rules: [
    {
      section: "Summary",
      items: [
        "12-man, Full PPR scoring with Big-Play and Big-Game scoring.",
        "1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX, 1 DEF, 1 K.",
        {
          text: "6-man, seeded playoff determined by regular season record and/or PF tiebreakers.",
          subitems: ["First-round byes for the Regular Season Champion and Runner-up."],
        },
        "Outright league loser, with league punishment, decided by regular season record and/or PF tiebreaker.",
      ],
    },
    {
      section: "League Dues and Payouts",
      items: [
        "$20/person due no later than 1 hour before the given draft date.",
        "$175 to the playoff champion, $25 to the playoff runner-up, $20 to the regular season champion, and $20 to the team with the highest PF at the end of the regular season.",
      ],
    },
    {
      section: "Playoff Format",
      items: [
        "6-man seeded playoff determined by regular season record and/or PF/ESPN tiebreakers.",
        {
          text: "Immediately after Monday Night's game of Week 15, the league enters the Playoff Period. During the Playoff Period, player acquisitions are restricted:",
          subitems: [
            "Teams eliminated from the playoffs may not drop any players from their roster, unless the player is on IR, PUP, Suspended, or otherwise out for the season.",
            "Exception: roster churning is OK — the intent is only to prevent teams from dropping their stars after elimination. The Commissioner handles edge cases on a case-by-case basis.",
          ],
        },
      ],
    },
    {
      section: "Player Acquisitions",
      items: [
        "Draft order is determined by the prior season's playoff champion, in any generally fair fashion (a random method, a game, etc.), no later than two weeks before the scheduled draft date — preferably ASAP.",
        {
          text: "The trade deadline is the Thursday following Week 13's games.",
          subitems: [
            "2024–2025 Season: November 27th at 8:00 PM.",
            "2023–2024 Season: December 14th at 12:00 PM.",
          ],
        },
        "Waiver order is the reverse of the draft order, following traditional waiver-wire priority rules for the rest of the season.",
        "Trades can be vetoed by the league with 70% of non-involved team managers voting in favor (7 of 10).",
        "Playoff Period acquisition restrictions begin immediately at Week 15's Monday Night Football game.",
      ],
    },
    {
      section: "Miscellaneous League Changes",
      items: [
        {
          text: "Certain actions may be needed to improve the league, in-season or in the off-season. When addressing league changes, the Commissioner is expected to:",
          listStyle: "letters",
          subitems: [
            "Consult league managers and gather consensus opinion on the special circumstance.",
            "Use league manager (LM) polls.",
            "Provide the league with the action(s) to be taken, if any.",
            "Execute changes based on the best or most just consensus opinion.",
          ],
        },
        "Covered changes may include alleged collusion, league size, scoring rules, and anything that could significantly affect how the league functions.",
        "Any changes to scoring, league size, etc. take effect in the off-season.",
      ],
    },
    {
      section: "Other League Rules",
      items: [
        "Any team that plays a player who ends a game with zero (0) points must send a video of themselves chugging a beer to the league group chat before the start of the following week's 8:20 PM game. Some leeway is given for those away on business or otherwise busy. Not enforced for playoff consolation games, but still encouraged.",
      ],
    },
  ],
};
