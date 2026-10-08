/**
 * ================================================================
 *  SEASON RECAPS
 * ================================================================
 *  Generated from the full 2021–2025 matchup log. Bracket data
 *  (scores, seeds, winners) is computed directly from the log.
 *  The `overview` text for each year is a written summary based on
 *  that same data — worth a factual read-through if anything looks
 *  off, since it's prose, not a raw data dump.
 *
 *  To add a new season once it's complete: add an entry here with
 *  the same shape (champion, bracket, overview). The Recap page
 *  automatically shows the highest year present, most recent first.
 * ================================================================
 */

const RECAPS = {
  2025: {
    champion: { owner: "Jacob Ayriss", team: "Magic in the Hamptons", seed: 6, playoffMVP: { name: "Drake Maye", points: 52.94 } },
    overview:
      "Jacob Ayriss squeaked into the field as the No. 6 seed, beating out Blake Beachnau for the final playoff spot by a league-record-thin 35.84 points — the closest cutoff in Beefland history. Zach Crook's Oh. My. Gosh. Lookit. Her. Bert. finished the regular season at 10-4 to grab the top seed and a first-round bye, with Jon Hurlburt's 208.56-point outburst in Week 12 standing as the best single week by any eventual playoff team. None of that mattered once the bracket started: Jacob knocked off the No. 3 seed, then the No. 2 seed, then top-seeded Zach in the final — running the table on every higher seed to complete one of the most unlikely title runs in league history, as a 7-7 team.",
    bracket: [
      {
        label: "Quarterfinals",
        games: [
          { homeSeed: 1, homeTeam: "Oh. My. Gosh. Lookit. Her. Bert", homeOwner: "Zach Crook", homePoints: 132.6, awaySeed: null, awayTeam: null, awayOwner: null, awayPoints: null, isBye: true, winnerOwner: "Zach Crook" },
          { homeSeed: 4, homeTeam: "I Like to Chase Brown Kids", homeOwner: "Austin Gauss", homePoints: 121.02, awaySeed: 5, awayTeam: "Bijan al Gaib", awayOwner: "Jack Callahan", awayPoints: 104.0, isBye: false, winnerOwner: "Austin Gauss" },
          { homeSeed: 3, homeTeam: "Brocklyn Nine-Nine", homeOwner: "Jon Hurlburt", homePoints: 99.96, awaySeed: 6, awayTeam: "Magic in the Hamptons", awayOwner: "Jacob Ayriss", awayPoints: 115.8, isBye: false, winnerOwner: "Jacob Ayriss" },
          { homeSeed: 2, homeTeam: "Bill! Bill! Bill! Bill!", homeOwner: "Benjamin Schon", homePoints: 145.1, awaySeed: null, awayTeam: null, awayOwner: null, awayPoints: null, isBye: true, winnerOwner: "Benjamin Schon" },
        ],
      },
      {
        label: "Semifinals",
        games: [
          { homeSeed: 1, homeTeam: "Oh. My. Gosh. Lookit. Her. Bert", homeOwner: "Zach Crook", homePoints: 174.9, awaySeed: 4, awayTeam: "I Like to Chase Brown Kids", awayOwner: "Austin Gauss", awayPoints: 86.7, isBye: false, winnerOwner: "Zach Crook" },
          { homeSeed: 2, homeTeam: "Bill! Bill! Bill! Bill!", homeOwner: "Benjamin Schon", homePoints: 96.54, awaySeed: 6, awayTeam: "Magic in the Hamptons", awayOwner: "Jacob Ayriss", awayPoints: 119.0, isBye: false, winnerOwner: "Jacob Ayriss" },
        ],
      },
      {
        label: "Championship",
        games: [
          { homeSeed: 6, homeTeam: "Magic in the Hamptons", homeOwner: "Jacob Ayriss", homePoints: 133.54, awaySeed: 1, awayTeam: "Oh. My. Gosh. Lookit. Her. Bert", awayOwner: "Zach Crook", awayPoints: 112.24, isBye: false, winnerOwner: "Jacob Ayriss" },
        ],
      },
    ],
  },

  2024: {
    champion: { owner: "Adam Kahler", team: "Saquon Deez Nuts", seed: 2, playoffMVP: { name: "Joe Burrow", points: 77.80 } },
    overview:
      "Blake Beachnau's Steeler Virginity locked up the No. 1 seed at 10-4, earning a bye alongside Adam Kahler's No. 2 seed Saquon Deez Nuts. The final playoff spot went to Brent Hurlburt's Baby Mama U over Austin Gauss by a comfortable 98-point margin despite identical 8-6 records. Adam K.'s 189.26-point explosion in Week 14 turned out to be a preview: after his bye, he handled Brent Hurlburt in the semifinals, then upset top-seeded Blake in the championship to become the first No. 2 seed to win it all in Beefland history.",
    bracket: [
      {
        label: "Quarterfinals",
        games: [
          { homeSeed: 1, homeTeam: "Steeler Virginity", homeOwner: "Blake Beachnau", homePoints: 130.74, awaySeed: null, awayTeam: null, awayOwner: null, awayPoints: null, isBye: true, winnerOwner: "Blake Beachnau" },
          { homeSeed: 4, homeTeam: "Chasing Contracts", homeOwner: "Jack Callahan", homePoints: 138.98, awaySeed: 5, awayTeam: "Like a Good Nabers", awayOwner: "Benjamin Schon", awayPoints: 135.44, isBye: false, winnerOwner: "Jack Callahan" },
          { homeSeed: 3, homeTeam: "King Beef", homeOwner: "Evan Lamb", homePoints: 116.26, awaySeed: 6, awayTeam: "Baby Mama U", awayOwner: "Brent Hurlburt", awayPoints: 146.7, isBye: false, winnerOwner: "Brent Hurlburt" },
          { homeSeed: 2, homeTeam: "Saquon Deez Nuts", homeOwner: "Adam Kahler", homePoints: 122.84, awaySeed: null, awayTeam: null, awayOwner: null, awayPoints: null, isBye: true, winnerOwner: "Adam Kahler" },
        ],
      },
      {
        label: "Semifinals",
        games: [
          { homeSeed: 1, homeTeam: "Steeler Virginity", homeOwner: "Blake Beachnau", homePoints: 141.14, awaySeed: 4, awayTeam: "Chasing Contracts", awayOwner: "Jack Callahan", awayPoints: 116.16, isBye: false, winnerOwner: "Blake Beachnau" },
          { homeSeed: 2, homeTeam: "Saquon Deez Nuts", homeOwner: "Adam Kahler", homePoints: 146.88, awaySeed: 6, awayTeam: "Baby Mama U", awayOwner: "Brent Hurlburt", awayPoints: 137.28, isBye: false, winnerOwner: "Adam Kahler" },
        ],
      },
      {
        label: "Championship",
        games: [
          { homeSeed: 1, homeTeam: "Steeler Virginity", homeOwner: "Blake Beachnau", homePoints: 90.3, awaySeed: 2, awayTeam: "Saquon Deez Nuts", awayOwner: "Adam Kahler", awayPoints: 142.68, isBye: false, winnerOwner: "Adam Kahler" },
        ],
      },
    ],
  },

  2023: {
    champion: { owner: "Jon Hurlburt", team: "Commissioner of the Year", seed: 4, playoffMVP: { name: "Breece Hall", points: 70.70 } },
    overview:
      "Jack Callahan's Saquon These Balls put together the best regular season in league history to that point at 11-4, claiming the top seed with a full three-game cushion over the next team out. It didn't matter. Jon Hurlburt's Commissioner of the Year snuck in as the No. 4 seed, immediately knocked off Jack's No. 1 team in the semifinals, then beat Jacob Ayriss's No. 3 seed in the final to win it all — the first time a lower seed had taken down the league's best regular-season team on the way to a title. Jack's 208.82-point Week 8 remains one of the best single weeks in franchise history — just not enough to matter in the end.",
    bracket: [
      {
        label: "Semifinals",
        games: [
          { homeSeed: 1, homeTeam: "Saquon These Balls", homeOwner: "Jack Callahan", homePoints: 131.92, awaySeed: 4, awayTeam: "Commissioner of the Year", awayOwner: "Jon Hurlburt", awayPoints: 165.52, isBye: false, winnerOwner: "Jon Hurlburt" },
          { homeSeed: 2, homeTeam: "Richmond Diamond Dogs", homeOwner: "Zack Rollis", homePoints: 133.98, awaySeed: 3, awayTeam: "Harbaugh's Burger Joint", awayOwner: "Jacob Ayriss", awayPoints: 154.14, isBye: false, winnerOwner: "Jacob Ayriss" },
        ],
      },
      {
        label: "Championship",
        games: [
          { homeSeed: 3, homeTeam: "Harbaugh's Burger Joint", homeOwner: "Jacob Ayriss", homePoints: 88.38, awaySeed: 4, awayTeam: "Commissioner of the Year", awayOwner: "Jon Hurlburt", awayPoints: 157.1, isBye: false, winnerOwner: "Jon Hurlburt" },
        ],
      },
    ],
  },

  2022: {
    champion: { owner: "Zack Rollis", team: "Richmond Diamond Dogs", seed: 1, playoffMVP: { name: "T.J. Hockenson", points: 50.80 } },
    overview:
      "Zack Rollis's Richmond Diamond Dogs claimed the No. 1 seed at 9-6, part of a crowded five-team logjam all sitting at 9-6 that was separated only by points scored — Austin Gauss grabbed the final playoff spot over Jon Hurlburt by 85 points despite an identical record. Zack's own best week of the year, 183.92 points in Week 12, came right in the middle of that chase. He beat Austin in the semifinals, then held off Jacob Ayriss in a low-scoring championship to join Benjamin Schon as a No. 1-seed champion — Beefland's second straight top-seed title.",
    bracket: [
      {
        label: "Semifinals",
        games: [
          { homeSeed: 1, homeTeam: "Richmond Diamond Dogs", homeOwner: "Zack Rollis", homePoints: 139.78, awaySeed: 4, awayTeam: "Beats By Ray (Rice)", awayOwner: "Austin Gauss", awayPoints: 127.76, isBye: false, winnerOwner: "Zack Rollis" },
          { homeSeed: 2, homeTeam: "Kelce You Later", homeOwner: "Jack Callahan", homePoints: 97.86, awaySeed: 3, awayTeam: "What R U Doing Step Burrow", awayOwner: "Jacob Ayriss", awayPoints: 142.3, isBye: false, winnerOwner: "Jacob Ayriss" },
        ],
      },
      {
        label: "Championship",
        games: [
          { homeSeed: 1, homeTeam: "Richmond Diamond Dogs", homeOwner: "Zack Rollis", homePoints: 67.4, awaySeed: 3, awayTeam: "What R U Doing Step Burrow", awayOwner: "Jacob Ayriss", awayPoints: 57.8, isBye: false, winnerOwner: "Zack Rollis" },
        ],
      },
    ],
  },

  2021: {
    champion: { owner: "Benjamin Schon", team: "Nick Foles SZN Champ", seed: 1, playoffMVP: { name: "Ja'Marr Chase", points: 91.40 } },
    overview:
      "In Beefland's inaugural season, Benjamin Schon's Nick Foles SZN Champ ran away with the top seed at 10-4. Zach Crook's Save The Bees set the league scoring record that still stands — 211.20 points in Week 14 — and rode a hot finish all the way to the No. 3 seed and a championship appearance, but Ben's team held on to win the first title in franchise history. At the bottom of the playoff race, Jon Hurlburt edged out Evan Lamb for the final spot despite identical 8-6 records, winning the tiebreaker by a lopsided 160.90 points.",
    bracket: [
      {
        label: "Semifinals",
        games: [
          { homeSeed: 1, homeTeam: "Nick Foles SZN Champ", homeOwner: "Benjamin Schon", homePoints: 296.56, awaySeed: 4, awayTeam: "The Delegate From 4SKN", awayOwner: "Jon Hurlburt", awayPoints: 228.08, isBye: false, winnerOwner: "Benjamin Schon" },
          { homeSeed: 2, homeTeam: "I Believe", homeOwner: "Jack Callahan", homePoints: 180.74, awaySeed: 3, awayTeam: "Save The Bees", awayOwner: "Zach Crook", awayPoints: 293.58, isBye: false, winnerOwner: "Zach Crook" },
        ],
      },
      {
        label: "Championship",
        games: [
          { homeSeed: 1, homeTeam: "Nick Foles SZN Champ", homeOwner: "Benjamin Schon", homePoints: 310.46, awaySeed: 3, awayTeam: "Save The Bees", awayOwner: "Zach Crook", awayPoints: 279.32, isBye: false, winnerOwner: "Benjamin Schon" },
        ],
      },
    ],
  },
};
