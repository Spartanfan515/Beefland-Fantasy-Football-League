/**
 * ================================================================
 *  TRADES — every detected historical trade (2021-2025), with the
 *  Net Trade Value (NTV) computed for each side.
 * ================================================================
 *  Generated from the league's Box Scores + Fantasy Matchup Data via
 *  the Points-Above-Replacement (PAR) methodology described in the
 *  methodology section at the bottom of the Trade Center page.
 *
 *  Each entry:
 *    season, weekFrom, weekTo -> when the trade happened (weekFrom is
 *      the string "pre-S1" for the two preseason trades).
 *    ownerA/teamA/playersA, ownerB/teamB/playersB -> the two sides.
 *      Each player is {name, pos} -- pos is display-only badge coloring.
 *    valueA/valueB -> total PAR value each side received, in points.
 *    ntvA/ntvB -> Net Trade Value = valueA - valueB (and its negation).
 *      Positive means that side won the trade.
 *    legsA/legsB -> the leg-by-leg breakdown behind valueA/valueB.
 *      Each leg: kind (pair | pool | depart_zero | unmatched), in
 *      (player received) / out (player given up, where applicable),
 *      margin (points), note (plain-English explanation of how the
 *      baseline was chosen).
 * ================================================================
 */
const TRADES = [
  {
    "season": 2021,
    "weekFrom": 5,
    "weekTo": 6,
    "ownerA": "Bobby Mowry",
    "teamA": "Gore winning me a championship",
    "playersA": [
      {
        "name": "Stefon Diggs",
        "pos": "WR"
      }
    ],
    "ownerB": "Jacob Ayriss",
    "teamB": "The Real Slim Brady",
    "playersB": [
      {
        "name": "Allen Robinson II",
        "pos": "WR"
      },
      {
        "name": "Antonio Gibson",
        "pos": "RB"
      }
    ],
    "valueA": 5.4,
    "valueB": 28.2,
    "ntvA": -22.8,
    "ntvB": 22.8,
    "legsA": [
      {
        "kind": "pool",
        "in": "Antonio Gibson",
        "out": null,
        "margin": 33.6,
        "note": "[RB] vs bench pool ('RB',) (avg 0.0)"
      },
      {
        "kind": "pair",
        "in": "Allen Robinson II",
        "out": "Stefon Diggs",
        "margin": -28.2,
        "note": "Stefon Diggs usage 100% over 5wk"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Antonio Gibson",
        "margin": 0.0,
        "note": "Antonio Gibson usage 80% -> no vacancy"
      },
      {
        "kind": "pair",
        "in": "Stefon Diggs",
        "out": "Allen Robinson II",
        "margin": 28.2,
        "note": "Allen Robinson II usage 60% over 5wk"
      }
    ]
  },
  {
    "season": 2021,
    "weekFrom": 9,
    "weekTo": 10,
    "ownerA": "Jack Callahan",
    "teamA": "I Believe",
    "playersA": [
      {
        "name": "Carson Wentz",
        "pos": "QB"
      }
    ],
    "ownerB": "Zach Crook",
    "teamB": "Save The Bees",
    "playersB": [
      {
        "name": "Ryan Tannehill",
        "pos": "QB"
      }
    ],
    "valueA": 0.0,
    "valueB": -29.1,
    "ntvA": 29.1,
    "ntvB": -29.1,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Carson Wentz",
        "margin": 0.0,
        "note": "Carson Wentz usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Ryan Tannehill",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Ryan Tannehill",
        "margin": 0.0,
        "note": "Ryan Tannehill usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Carson Wentz",
        "out": null,
        "margin": -29.1,
        "note": "[QB] vs incumbent Patrick Mahomes (100%)"
      }
    ]
  },
  {
    "season": 2021,
    "weekFrom": 13,
    "weekTo": 14,
    "ownerA": "Benjamin Schon",
    "teamA": "Nick Foles SZN Champ",
    "playersA": [
      {
        "name": "James Conner",
        "pos": "RB"
      }
    ],
    "ownerB": "Zach Crook",
    "teamB": "Save The Bees",
    "playersB": [
      {
        "name": "Dontrell Hilliard",
        "pos": "RB"
      },
      {
        "name": "Ja'Marr Chase",
        "pos": "WR"
      }
    ],
    "valueA": 85.4,
    "valueB": 36.1,
    "ntvA": 49.3,
    "ntvB": -49.3,
    "legsA": [
      {
        "kind": "pair",
        "in": "Dontrell Hilliard",
        "out": "James Conner",
        "margin": -31.3,
        "note": "James Conner usage 57% over 7wk"
      },
      {
        "kind": "pool",
        "in": "Ja'Marr Chase",
        "out": null,
        "margin": 116.7,
        "note": "[WR] vs incumbent Keenan Allen (92%)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dontrell Hilliard",
        "margin": 0.0,
        "note": "Dontrell Hilliard usage 50% over only 2wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "James Conner",
        "out": null,
        "margin": 36.1,
        "note": "[RB] vs incumbent Jonathan Taylor (92%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Ja'Marr Chase",
        "margin": 0.0,
        "note": "Ja'Marr Chase usage 69% -> no vacancy"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 4,
    "weekTo": 5,
    "ownerA": "Adam Schon",
    "teamA": "I Can't Brees \u270a\ud83c\udfff",
    "playersA": [
      {
        "name": "Ezekiel Elliott",
        "pos": "RB"
      }
    ],
    "ownerB": "Jack Callahan",
    "teamB": "Kelce You Later",
    "playersB": [
      {
        "name": "Devin Singletary",
        "pos": "RB"
      }
    ],
    "valueA": 63.0,
    "valueB": 0.0,
    "ntvA": 63.0,
    "ntvB": -63.0,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Ezekiel Elliott",
        "margin": 0.0,
        "note": "Ezekiel Elliott usage 50% over only 4wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Devin Singletary",
        "out": null,
        "margin": 63.0,
        "note": "[RB] vs bench pool ('RB',) (avg 17.3)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Devin Singletary",
        "margin": 0.0,
        "note": "Devin Singletary usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Ezekiel Elliott",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 4,
    "weekTo": 5,
    "ownerA": "Benjamin Schon",
    "teamA": "I think we done",
    "playersA": [
      {
        "name": "Nyheim Hines",
        "pos": "RB"
      }
    ],
    "ownerB": "Jack Callahan",
    "teamB": "Kelce You Later",
    "playersB": [
      {
        "name": "Damien Harris",
        "pos": "RB"
      }
    ],
    "valueA": 0.0,
    "valueB": -9.2,
    "ntvA": 9.2,
    "ntvB": -9.2,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Nyheim Hines",
        "margin": 0.0,
        "note": "Nyheim Hines usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Damien Harris",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Damien Harris",
        "margin": 0.0,
        "note": "Damien Harris usage 25% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Nyheim Hines",
        "out": null,
        "margin": -9.2,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 11.0)"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 4,
    "weekTo": 5,
    "ownerA": "Benjamin Schon",
    "teamA": "I think we done",
    "playersA": [
      {
        "name": "Derek Carr",
        "pos": "QB"
      }
    ],
    "ownerB": "Evan Lamb",
    "teamB": "King Beef",
    "playersB": [
      {
        "name": "Darren Waller",
        "pos": "TE"
      }
    ],
    "valueA": 0.0,
    "valueB": -5.7,
    "ntvA": 5.7,
    "ntvB": -5.7,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Derek Carr",
        "margin": 0.0,
        "note": "Derek Carr usage 50% over only 2wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Darren Waller",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Derek Carr",
        "out": null,
        "margin": -5.7,
        "note": "[QB] vs bench pool ('QB',) (avg 22.2)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Darren Waller",
        "margin": 0.0,
        "note": "Darren Waller usage 100% over only 4wk -> too small a sample to trust"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 6,
    "weekTo": 7,
    "ownerA": "Adam Schon",
    "teamA": "I Can't Brees \u270a\ud83c\udfff",
    "playersA": [
      {
        "name": "Dalton Schultz",
        "pos": "TE"
      }
    ],
    "ownerB": "Evan Lamb",
    "teamB": "King Beef",
    "playersB": [
      {
        "name": "Brandon Aiyuk",
        "pos": "WR"
      }
    ],
    "valueA": 36.1,
    "valueB": 30.0,
    "ntvA": 6.1,
    "ntvB": -6.1,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dalton Schultz",
        "margin": 0.0,
        "note": "Dalton Schultz usage 40% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Brandon Aiyuk",
        "out": null,
        "margin": 36.1,
        "note": "[WR] vs incumbent Deebo Samuel (100%)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Dalton Schultz",
        "out": null,
        "margin": 30.0,
        "note": "[TE] vs bench pool ('TE',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Brandon Aiyuk",
        "margin": 0.0,
        "note": "Brandon Aiyuk usage 0% -> no vacancy"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 6,
    "weekTo": 7,
    "ownerA": "Jack Callahan",
    "teamA": "Kelce You Later",
    "playersA": [
      {
        "name": "Ezekiel Elliott",
        "pos": "RB"
      }
    ],
    "ownerB": "Zack Rollis",
    "teamB": "Richmond Diamond Dogs",
    "playersB": [
      {
        "name": "Adam Thielen",
        "pos": "WR"
      }
    ],
    "valueA": 9.7,
    "valueB": 59.2,
    "ntvA": -49.5,
    "ntvB": 49.5,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Ezekiel Elliott",
        "margin": 0.0,
        "note": "Ezekiel Elliott usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Adam Thielen",
        "out": null,
        "margin": 9.7,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 0.0)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Adam Thielen",
        "margin": 0.0,
        "note": "Adam Thielen usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Ezekiel Elliott",
        "out": null,
        "margin": 59.2,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 14.5)"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 6,
    "weekTo": 7,
    "ownerA": "Evan Lamb",
    "teamA": "King Beef",
    "playersA": [
      {
        "name": "Tee Higgins",
        "pos": "WR"
      }
    ],
    "ownerB": "Jacob Ayriss",
    "teamB": "What R U Doing Step Burrow",
    "playersB": [
      {
        "name": "Christian Kirk",
        "pos": "WR"
      },
      {
        "name": "Michael Gallup",
        "pos": "WR"
      }
    ],
    "valueA": -11.0,
    "valueB": 34.2,
    "ntvA": -45.2,
    "ntvB": 45.2,
    "legsA": [
      {
        "kind": "pair",
        "in": "Christian Kirk",
        "out": "Tee Higgins",
        "margin": -11.0,
        "note": "Tee Higgins usage 100% over 6wk"
      },
      {
        "kind": "pool",
        "in": "Michael Gallup",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Tee Higgins",
        "out": "Christian Kirk",
        "margin": 34.2,
        "note": "Christian Kirk usage 50% over 6wk"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Michael Gallup",
        "margin": 0.0,
        "note": "Michael Gallup usage 0% -> no vacancy"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 7,
    "weekTo": 8,
    "ownerA": "Jon Hurlburt",
    "teamA": "Commissioner of The Year",
    "playersA": [
      {
        "name": "DJ Moore",
        "pos": "WR"
      },
      {
        "name": "JuJu Smith-Schuster",
        "pos": "WR"
      }
    ],
    "ownerB": "Adam Schon",
    "teamB": "I Can't Brees \u270a\ud83c\udfff",
    "playersB": [
      {
        "name": "Alvin Kamara",
        "pos": "RB"
      }
    ],
    "valueA": 23.2,
    "valueB": 60.0,
    "ntvA": -36.8,
    "ntvB": 36.8,
    "legsA": [
      {
        "kind": "pool",
        "in": "Alvin Kamara",
        "out": null,
        "margin": 23.2,
        "note": "[RB] vs incumbent Austin Ekeler (100%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "DJ Moore",
        "margin": 0.0,
        "note": "DJ Moore usage 43% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "JuJu Smith-Schuster",
        "margin": 0.0,
        "note": "JuJu Smith-Schuster usage 14% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Alvin Kamara",
        "margin": 0.0,
        "note": "Alvin Kamara usage 86% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "DJ Moore",
        "out": null,
        "margin": 33.6,
        "note": "[RB/WR/TE] vs incumbent Brandin Cooks (71%)"
      },
      {
        "kind": "pool",
        "in": "JuJu Smith-Schuster",
        "out": null,
        "margin": 26.4,
        "note": "[WR] vs incumbent Deebo Samuel (100%)"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 7,
    "weekTo": 8,
    "ownerA": "Benjamin Schon",
    "teamA": "I think we done",
    "playersA": [
      {
        "name": "Patriots D/ST",
        "pos": "D/ST"
      }
    ],
    "ownerB": "Jack Callahan",
    "teamB": "Kelce You Later",
    "playersB": [
      {
        "name": "Tyler Allgeier",
        "pos": "RB"
      }
    ],
    "valueA": 13.3,
    "valueB": 69.0,
    "ntvA": -55.7,
    "ntvB": 55.7,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Patriots D/ST",
        "margin": 0.0,
        "note": "Patriots D/ST usage 100% over only 1wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Tyler Allgeier",
        "out": null,
        "margin": 13.3,
        "note": "[RB] vs incumbent Nick Chubb (100%)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Patriots D/ST",
        "out": null,
        "margin": 69.0,
        "note": "[D/ST] vs bench pool ('D/ST',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Tyler Allgeier",
        "margin": 0.0,
        "note": "Tyler Allgeier usage 0% -> no vacancy"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Adam Schon",
    "teamA": "I Can't Brees \u270a\ud83c\udfff",
    "playersA": [
      {
        "name": "Brandin Cooks",
        "pos": "WR"
      }
    ],
    "ownerB": "Jack Callahan",
    "teamB": "Kelce You Later",
    "playersB": [
      {
        "name": "Joshua Palmer",
        "pos": "WR"
      }
    ],
    "valueA": 4.9,
    "valueB": 0.0,
    "ntvA": 4.9,
    "ntvB": -4.9,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Brandin Cooks",
        "margin": 0.0,
        "note": "Brandin Cooks usage 45% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Joshua Palmer",
        "out": null,
        "margin": 4.9,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 8.1)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Joshua Palmer",
        "margin": 0.0,
        "note": "Joshua Palmer usage 67% over only 3wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Brandin Cooks",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 13,
    "weekTo": 14,
    "ownerA": "Benjamin Schon",
    "teamA": "I think we done",
    "playersA": [
      {
        "name": "AJ Dillon",
        "pos": "RB"
      },
      {
        "name": "Davante Adams",
        "pos": "WR"
      }
    ],
    "ownerB": "Evan Lamb",
    "teamB": "King Beef",
    "playersB": [
      {
        "name": "Derrick Henry",
        "pos": "RB"
      },
      {
        "name": "Gabe Davis",
        "pos": "WR"
      }
    ],
    "valueA": 33.8,
    "valueB": -5.0,
    "ntvA": 38.8,
    "ntvB": -38.8,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "AJ Dillon",
        "margin": 0.0,
        "note": "AJ Dillon usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Derrick Henry",
        "out": null,
        "margin": 39.0,
        "note": "[RB] vs incumbent Dameon Pierce (92%)"
      },
      {
        "kind": "pool",
        "in": "Gabe Davis",
        "out": null,
        "margin": -5.2,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 11.3)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Davante Adams",
        "margin": 0.0,
        "note": "Davante Adams usage 92% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "AJ Dillon",
        "out": "Derrick Henry",
        "margin": -6.2,
        "note": "Derrick Henry usage 92% over 13wk"
      },
      {
        "kind": "pair",
        "in": "Davante Adams",
        "out": "Gabe Davis",
        "margin": 1.2,
        "note": "Gabe Davis usage 62% over 13wk"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 14,
    "weekTo": 15,
    "ownerA": "Brent Hurlburt",
    "teamA": "2 Hurlburts 1 Cup",
    "playersA": [
      {
        "name": "Jaylen Waddle",
        "pos": "WR"
      },
      {
        "name": "Kenneth Walker III",
        "pos": "RB"
      }
    ],
    "ownerB": "Jon Hurlburt",
    "teamB": "Commissioner of The Year",
    "playersB": [
      {
        "name": "Dallas Goedert",
        "pos": "TE"
      },
      {
        "name": "Justin Fields",
        "pos": "QB"
      }
    ],
    "valueA": 2.0,
    "valueB": -2.8,
    "ntvA": 4.8,
    "ntvB": -4.8,
    "legsA": [
      {
        "kind": "pool",
        "in": "Justin Fields",
        "out": null,
        "margin": 8.5,
        "note": "[QB] vs bench pool ('QB',) (avg 15.1)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Kenneth Walker III",
        "margin": 0.0,
        "note": "Kenneth Walker III usage 43% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jaylen Waddle",
        "margin": 0.0,
        "note": "Jaylen Waddle usage 79% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Dallas Goedert",
        "out": null,
        "margin": -6.5,
        "note": "[TE] vs bench pool ('TE',) (avg 6.5)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Justin Fields",
        "margin": 0.0,
        "note": "Justin Fields usage 50% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Kenneth Walker III",
        "out": null,
        "margin": -2.8,
        "note": "[RB] vs incumbent Travis Etienne Jr. (57%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dallas Goedert",
        "margin": 0.0,
        "note": "Dallas Goedert usage 36% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Jaylen Waddle",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 14,
    "weekTo": 15,
    "ownerA": "Adam Schon",
    "teamA": "I Can't Brees \u270a\ud83c\udfff",
    "playersA": [
      {
        "name": "Brandon Aiyuk",
        "pos": "WR"
      }
    ],
    "ownerB": "Jack Callahan",
    "teamB": "Kelce You Later",
    "playersB": [
      {
        "name": "Diontae Johnson",
        "pos": "WR"
      },
      {
        "name": "Tua Tagovailoa",
        "pos": "QB"
      }
    ],
    "valueA": -14.6,
    "valueB": -11.5,
    "ntvA": -3.1,
    "ntvB": 3.1,
    "legsA": [
      {
        "kind": "pool",
        "in": "Tua Tagovailoa",
        "out": null,
        "margin": -16.3,
        "note": "[QB] vs bench pool ('QB',) (avg 37.4)"
      },
      {
        "kind": "pool",
        "in": "Diontae Johnson",
        "out": null,
        "margin": 1.7,
        "note": "[RB/WR/TE] vs incumbent DJ Moore (57%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Brandon Aiyuk",
        "margin": 0.0,
        "note": "Brandon Aiyuk usage 25% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Tua Tagovailoa",
        "margin": 0.0,
        "note": "Tua Tagovailoa usage 11% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Brandon Aiyuk",
        "out": null,
        "margin": -11.5,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 8.2)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Diontae Johnson",
        "margin": 0.0,
        "note": "Diontae Johnson usage 64% -> no vacancy"
      }
    ]
  },
  {
    "season": 2022,
    "weekFrom": 14,
    "weekTo": 15,
    "ownerA": "Adam Schon",
    "teamA": "I Can't Brees \u270a\ud83c\udfff",
    "playersA": [
      {
        "name": "Chiefs D/ST",
        "pos": "D/ST"
      }
    ],
    "ownerB": "Zack Rollis",
    "teamB": "Richmond Diamond Dogs",
    "playersB": [
      {
        "name": "Cardinals D/ST",
        "pos": "D/ST"
      },
      {
        "name": "D'Onta Foreman",
        "pos": "RB"
      }
    ],
    "valueA": 3.9,
    "valueB": 3.0,
    "ntvA": 0.9,
    "ntvB": -0.9,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Chiefs D/ST",
        "margin": 0.0,
        "note": "Chiefs D/ST usage 67% over only 3wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Cardinals D/ST",
        "out": null,
        "margin": 13.0,
        "note": "[D/ST] vs bench pool ('D/ST',) (avg -4.0)"
      },
      {
        "kind": "pool",
        "in": "D'Onta Foreman",
        "out": null,
        "margin": -9.1,
        "note": "[RB] vs incumbent Devin Singletary (90%)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Cardinals D/ST",
        "margin": 0.0,
        "note": "Cardinals D/ST usage 100% over only 1wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Chiefs D/ST",
        "out": null,
        "margin": 3.0,
        "note": "[D/ST] vs bench pool ('D/ST',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "D'Onta Foreman",
        "margin": 0.0,
        "note": "D'Onta Foreman usage 62% -> no vacancy"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 5,
    "weekTo": 6,
    "ownerA": "Benjamin Schon",
    "teamA": "I Like Turtles",
    "playersA": [
      {
        "name": "Gabe Davis",
        "pos": "WR"
      }
    ],
    "ownerB": "Zack Rollis",
    "teamB": "Richmond Diamond Dogs",
    "playersB": [
      {
        "name": "Raheem Mostert",
        "pos": "RB"
      }
    ],
    "valueA": 32.8,
    "valueB": -10.3,
    "ntvA": 43.1,
    "ntvB": -43.1,
    "legsA": [
      {
        "kind": "pool",
        "in": "Raheem Mostert",
        "out": null,
        "margin": 32.8,
        "note": "[RB] vs incumbent Dameon Pierce (60%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Gabe Davis",
        "margin": 0.0,
        "note": "Gabe Davis usage 60% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Raheem Mostert",
        "margin": 0.0,
        "note": "Raheem Mostert usage 80% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Gabe Davis",
        "out": null,
        "margin": -10.3,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 16.0)"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 5,
    "weekTo": 6,
    "ownerA": "Benjamin Schon",
    "teamA": "I Like Turtles",
    "playersA": [
      {
        "name": "Dameon Pierce",
        "pos": "RB"
      },
      {
        "name": "Eagles D/ST",
        "pos": "D/ST"
      },
      {
        "name": "Trevor Lawrence",
        "pos": "QB"
      }
    ],
    "ownerB": "Zach Crook",
    "teamB": "Team Crook",
    "playersB": [
      {
        "name": "Amari Cooper",
        "pos": "WR"
      },
      {
        "name": "C.J. Stroud",
        "pos": "QB"
      }
    ],
    "valueA": 50.0,
    "valueB": 36.8,
    "ntvA": 13.2,
    "ntvB": -13.2,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Eagles D/ST",
        "margin": 0.0,
        "note": "Eagles D/ST usage 80% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Trevor Lawrence",
        "margin": 0.0,
        "note": "Trevor Lawrence usage 40% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "C.J. Stroud",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dameon Pierce",
        "margin": 0.0,
        "note": "Dameon Pierce usage 60% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Amari Cooper",
        "out": null,
        "margin": 50.0,
        "note": "[RB/WR/TE] vs incumbent Gabe Davis (60%)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Eagles D/ST",
        "out": null,
        "margin": 1.0,
        "note": "[D/ST] vs bench pool ('D/ST',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "C.J. Stroud",
        "margin": 0.0,
        "note": "C.J. Stroud usage 50% over only 2wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Trevor Lawrence",
        "out": null,
        "margin": 32.4,
        "note": "[QB] vs bench pool ('QB',) (avg 0.0)"
      },
      {
        "kind": "pool",
        "in": "Dameon Pierce",
        "out": null,
        "margin": 3.4,
        "note": "[RB] vs bench pool ('RB',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Amari Cooper",
        "margin": 0.0,
        "note": "Amari Cooper usage 60% -> no vacancy"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 6,
    "weekTo": 7,
    "ownerA": "Benjamin Schon",
    "teamA": "I Like Turtles",
    "playersA": [
      {
        "name": "Raheem Mostert",
        "pos": "RB"
      }
    ],
    "ownerB": "Zack Rollis",
    "teamB": "Richmond Diamond Dogs",
    "playersB": [
      {
        "name": "David Montgomery",
        "pos": "RB"
      },
      {
        "name": "Michael Pittman Jr.",
        "pos": "WR"
      }
    ],
    "valueA": 120.2,
    "valueB": 34.5,
    "ntvA": 85.7,
    "ntvB": -85.7,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Raheem Mostert",
        "margin": 0.0,
        "note": "Raheem Mostert usage 100% over only 1wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "David Montgomery",
        "out": null,
        "margin": 70.5,
        "note": "[RB] vs bench pool ('RB',) (avg 9.3)"
      },
      {
        "kind": "pool",
        "in": "Michael Pittman Jr.",
        "out": null,
        "margin": 49.7,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 21.3)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "David Montgomery",
        "margin": 0.0,
        "note": "David Montgomery usage 33% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Raheem Mostert",
        "out": null,
        "margin": 34.5,
        "note": "[RB] vs bench pool ('RB',) (avg 7.2)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Michael Pittman Jr.",
        "margin": 0.0,
        "note": "Michael Pittman Jr. usage 67% -> no vacancy"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 7,
    "weekTo": 8,
    "ownerA": "Adam Schon",
    "teamA": "I Can't Brees \u270a\ud83c\udfff",
    "playersA": [
      {
        "name": "Courtland Sutton",
        "pos": "WR"
      },
      {
        "name": "Derrick Henry",
        "pos": "RB"
      }
    ],
    "ownerB": "Zach Crook",
    "teamB": "Team Crook",
    "playersB": [
      {
        "name": "Puka Nacua",
        "pos": "WR"
      }
    ],
    "valueA": 1.9,
    "valueB": 136.9,
    "ntvA": -135.0,
    "ntvB": 135.0,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Derrick Henry",
        "margin": 0.0,
        "note": "Derrick Henry usage 86% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Courtland Sutton",
        "margin": 0.0,
        "note": "Courtland Sutton usage 43% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Puka Nacua",
        "out": null,
        "margin": 1.9,
        "note": "[WR] vs bench pool ('WR',) (avg 6.6)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Derrick Henry",
        "out": null,
        "margin": 91.0,
        "note": "[RB] vs bench pool ('RB',) (avg 4.6)"
      },
      {
        "kind": "pool",
        "in": "Courtland Sutton",
        "out": null,
        "margin": 45.9,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 7.7)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Puka Nacua",
        "margin": 0.0,
        "note": "Puka Nacua usage 83% -> no vacancy"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 7,
    "weekTo": 8,
    "ownerA": "Benjamin Schon",
    "teamA": "I Like Turtles",
    "playersA": [
      {
        "name": "C.J. Stroud",
        "pos": "QB"
      },
      {
        "name": "Tyler Conklin",
        "pos": "TE"
      }
    ],
    "ownerB": "Evan Lamb",
    "teamB": "King Beef",
    "playersB": [
      {
        "name": "Brock Purdy",
        "pos": "QB"
      },
      {
        "name": "Dalton Schultz",
        "pos": "TE"
      }
    ],
    "valueA": 74.6,
    "valueB": 163.0,
    "ntvA": -88.4,
    "ntvB": 88.4,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "C.J. Stroud",
        "margin": 0.0,
        "note": "C.J. Stroud usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Brock Purdy",
        "out": null,
        "margin": 26.8,
        "note": "[QB] vs incumbent Tua Tagovailoa (71%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Tyler Conklin",
        "margin": 0.0,
        "note": "Tyler Conklin usage 67% over only 3wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Dalton Schultz",
        "out": null,
        "margin": 47.8,
        "note": "[TE] vs bench pool ('TE',) (avg 2.9)"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Brock Purdy",
        "margin": 0.0,
        "note": "Brock Purdy usage 17% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "C.J. Stroud",
        "out": null,
        "margin": 111.3,
        "note": "[QB] vs bench pool ('QB',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dalton Schultz",
        "margin": 0.0,
        "note": "Dalton Schultz usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Tyler Conklin",
        "out": null,
        "margin": 51.7,
        "note": "[TE] vs incumbent Darren Waller (100%)"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 9,
    "weekTo": 10,
    "ownerA": "Jacob Ayriss",
    "teamA": "Harbaugh's Burger Joint",
    "playersA": [
      {
        "name": "Chuba Hubbard",
        "pos": "RB"
      },
      {
        "name": "DJ Moore",
        "pos": "WR"
      },
      {
        "name": "Zay Flowers",
        "pos": "WR"
      }
    ],
    "ownerB": "Adam Schon",
    "teamB": "I Can't Brees \u270a\ud83c\udfff",
    "playersB": [
      {
        "name": "Bijan Robinson",
        "pos": "RB"
      },
      {
        "name": "Puka Nacua",
        "pos": "WR"
      }
    ],
    "valueA": 10.0,
    "valueB": 48.0,
    "ntvA": -38.0,
    "ntvB": 38.0,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Chuba Hubbard",
        "margin": 0.0,
        "note": "Chuba Hubbard usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Bijan Robinson",
        "out": null,
        "margin": 25.3,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 14.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Zay Flowers",
        "margin": 0.0,
        "note": "Zay Flowers usage 22% -> no vacancy"
      },
      {
        "kind": "pair",
        "in": "Puka Nacua",
        "out": "DJ Moore",
        "margin": -15.3,
        "note": "DJ Moore usage 67% over 9wk"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Chuba Hubbard",
        "out": "Bijan Robinson",
        "margin": -1.6,
        "note": "Bijan Robinson usage 100% over 9wk"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Puka Nacua",
        "margin": 0.0,
        "note": "Puka Nacua usage 100% over only 2wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "DJ Moore",
        "out": null,
        "margin": 47.2,
        "note": "[WR] vs bench pool ('WR',) (avg 4.3)"
      },
      {
        "kind": "pool",
        "in": "Zay Flowers",
        "out": null,
        "margin": 2.4,
        "note": "[WR] vs incumbent Mike Evans (89%)"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 10,
    "weekTo": 11,
    "ownerA": "Austin Gauss",
    "teamA": "Beats By Ray (Rice)",
    "playersA": [
      {
        "name": "DeVonta Smith",
        "pos": "WR"
      }
    ],
    "ownerB": "Jacob Ayriss",
    "teamB": "Harbaugh's Burger Joint",
    "playersB": [
      {
        "name": "Isiah Pacheco",
        "pos": "RB"
      }
    ],
    "valueA": 50.4,
    "valueB": -3.4,
    "ntvA": 53.8,
    "ntvB": -53.8,
    "legsA": [
      {
        "kind": "pool",
        "in": "Isiah Pacheco",
        "out": null,
        "margin": 50.4,
        "note": "[RB/WR/TE] vs incumbent Jakobi Meyers (50%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "DeVonta Smith",
        "margin": 0.0,
        "note": "DeVonta Smith usage 80% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Isiah Pacheco",
        "margin": 0.0,
        "note": "Isiah Pacheco usage 50% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "DeVonta Smith",
        "out": null,
        "margin": -3.4,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 13.3)"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Jon Hurlburt",
    "teamA": "Commissioner of The Year",
    "playersA": [
      {
        "name": "Jaylen Warren",
        "pos": "RB"
      },
      {
        "name": "Sam Howell",
        "pos": "QB"
      }
    ],
    "ownerB": "Adam Schon",
    "teamB": "I Can't Brees \u270a\ud83c\udfff",
    "playersB": [
      {
        "name": "Mike Evans",
        "pos": "WR"
      }
    ],
    "valueA": 68.1,
    "valueB": 40.3,
    "ntvA": 27.8,
    "ntvB": -27.8,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Sam Howell",
        "margin": 0.0,
        "note": "Sam Howell usage 20% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jaylen Warren",
        "margin": 0.0,
        "note": "Jaylen Warren usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Mike Evans",
        "out": null,
        "margin": 68.1,
        "note": "[RB/WR/TE] vs incumbent Aaron Jones (55%)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Sam Howell",
        "out": null,
        "margin": 45.8,
        "note": "[QB] vs incumbent Joe Burrow (82%)"
      },
      {
        "kind": "pool",
        "in": "Jaylen Warren",
        "out": null,
        "margin": -5.5,
        "note": "[RB] vs bench pool ('RB',) (avg 20.2)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Mike Evans",
        "margin": 0.0,
        "note": "Mike Evans usage 91% -> no vacancy"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Benjamin Schon",
    "teamA": "I Like Turtles",
    "playersA": [
      {
        "name": "Brock Purdy",
        "pos": "QB"
      },
      {
        "name": "Calvin Ridley",
        "pos": "WR"
      },
      {
        "name": "Dalton Schultz",
        "pos": "TE"
      }
    ],
    "ownerB": "Zach Crook",
    "teamB": "Team Crook",
    "playersB": [
      {
        "name": "Travis Kelce",
        "pos": "TE"
      }
    ],
    "valueA": 49.3,
    "valueB": 98.4,
    "ntvA": -49.1,
    "ntvB": 49.1,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Brock Purdy",
        "margin": 0.0,
        "note": "Brock Purdy usage 25% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dalton Schultz",
        "margin": 0.0,
        "note": "Dalton Schultz usage 100% over only 4wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Travis Kelce",
        "out": null,
        "margin": 49.3,
        "note": "[TE] vs bench pool ('TE',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Calvin Ridley",
        "margin": 0.0,
        "note": "Calvin Ridley usage 82% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Brock Purdy",
        "out": null,
        "margin": 96.0,
        "note": "[QB] vs bench pool ('QB',) (avg 0.0)"
      },
      {
        "kind": "pool",
        "in": "Calvin Ridley",
        "out": null,
        "margin": 16.3,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 2.8)"
      },
      {
        "kind": "pair",
        "in": "Dalton Schultz",
        "out": "Travis Kelce",
        "margin": -13.9,
        "note": "Travis Kelce usage 82% over 11wk"
      }
    ]
  },
  {
    "season": 2023,
    "weekFrom": 13,
    "weekTo": 14,
    "ownerA": "Jon Hurlburt",
    "teamA": "Commissioner of The Year",
    "playersA": [
      {
        "name": "Aaron Jones",
        "pos": "RB"
      },
      {
        "name": "Alexander Mattison",
        "pos": "RB"
      }
    ],
    "ownerB": "Evan Lamb",
    "teamB": "King Beef",
    "playersB": [
      {
        "name": "Travis Etienne Jr.",
        "pos": "RB"
      }
    ],
    "valueA": 44.6,
    "valueB": 7.6,
    "ntvA": 37.0,
    "ntvB": -37.0,
    "legsA": [
      {
        "kind": "pair",
        "in": "Travis Etienne Jr.",
        "out": "Alexander Mattison",
        "margin": 44.6,
        "note": "Alexander Mattison usage 54% over 13wk"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Aaron Jones",
        "margin": 0.0,
        "note": "Aaron Jones usage 46% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Aaron Jones",
        "out": "Travis Etienne Jr.",
        "margin": 1.0,
        "note": "Travis Etienne Jr. usage 92% over 13wk"
      },
      {
        "kind": "pool",
        "in": "Alexander Mattison",
        "out": null,
        "margin": 6.6,
        "note": "[RB] vs incumbent Rhamondre Stevenson (92%)"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 3,
    "weekTo": 4,
    "ownerA": "Brent Hurlburt",
    "teamA": "Baby Mama U",
    "playersA": [
      {
        "name": "Tyreek Hill",
        "pos": "WR"
      }
    ],
    "ownerB": "Benjamin Schon",
    "teamB": "Like a good Nabers",
    "playersB": [
      {
        "name": "David Montgomery",
        "pos": "RB"
      },
      {
        "name": "Jayden Reed",
        "pos": "WR"
      }
    ],
    "valueA": 71.8,
    "valueB": -11.2,
    "ntvA": 83.0,
    "ntvB": -83.0,
    "legsA": [
      {
        "kind": "pool",
        "in": "David Montgomery",
        "out": null,
        "margin": 68.7,
        "note": "[RB] vs bench pool ('RB',) (avg 10.0)"
      },
      {
        "kind": "pool",
        "in": "Jayden Reed",
        "out": null,
        "margin": 3.1,
        "note": "[WR] vs bench pool ('WR',) (avg 19.3)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Tyreek Hill",
        "margin": 0.0,
        "note": "Tyreek Hill usage 100% over only 3wk -> too small a sample to trust"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "David Montgomery",
        "margin": 0.0,
        "note": "David Montgomery usage 33% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jayden Reed",
        "margin": 0.0,
        "note": "Jayden Reed usage 33% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Tyreek Hill",
        "out": null,
        "margin": -11.2,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 17.4)"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 8,
    "weekTo": 9,
    "ownerA": "Austin Gauss",
    "teamA": "Beats By Ray (Rice)",
    "playersA": [
      {
        "name": "Tyler Allgeier",
        "pos": "RB"
      }
    ],
    "ownerB": "Jack Callahan",
    "teamB": "Chasing Contracts",
    "playersB": [
      {
        "name": "Cedric Tillman",
        "pos": "WR"
      }
    ],
    "valueA": 18.6,
    "valueB": 13.7,
    "ntvA": 4.9,
    "ntvB": -4.9,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Tyler Allgeier",
        "margin": 0.0,
        "note": "Tyler Allgeier usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Cedric Tillman",
        "out": null,
        "margin": 18.6,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 8.8)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Tyler Allgeier",
        "out": null,
        "margin": 13.7,
        "note": "[RB] vs incumbent Brian Robinson Jr. (75%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Cedric Tillman",
        "margin": 0.0,
        "note": "Cedric Tillman usage 0% -> no vacancy"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 8,
    "weekTo": 9,
    "ownerA": "Jacob Ayriss",
    "teamA": "Obi-Jan Kenobi",
    "playersA": [
      {
        "name": "Blake Corum",
        "pos": "RB"
      }
    ],
    "ownerB": "Adam Kahler",
    "teamB": "Saquon Deez Nuts",
    "playersB": [
      {
        "name": "Taysom Hill",
        "pos": "TE"
      }
    ],
    "valueA": 67.0,
    "valueB": 0.0,
    "ntvA": 67.0,
    "ntvB": -67.0,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Blake Corum",
        "margin": 0.0,
        "note": "Blake Corum usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Taysom Hill",
        "out": null,
        "margin": 67.0,
        "note": "[TE] vs incumbent Dalton Kincaid (100%)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Blake Corum",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Taysom Hill",
        "margin": 0.0,
        "note": "Taysom Hill usage 0% -> no vacancy"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 10,
    "weekTo": 11,
    "ownerA": "Brent Hurlburt",
    "teamA": "Baby Mama U",
    "playersA": [
      {
        "name": "Jauan Jennings",
        "pos": "WR"
      }
    ],
    "ownerB": "Jacob Ayriss",
    "teamB": "Obi-Jan Kenobi",
    "playersB": [
      {
        "name": "Brian Thomas Jr.",
        "pos": "WR"
      }
    ],
    "valueA": 75.7,
    "valueB": 12.8,
    "ntvA": 62.9,
    "ntvB": -62.9,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jauan Jennings",
        "margin": 0.0,
        "note": "Jauan Jennings usage 25% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Brian Thomas Jr.",
        "out": null,
        "margin": 75.7,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 13.0)"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Jauan Jennings",
        "out": "Brian Thomas Jr.",
        "margin": 12.8,
        "note": "Brian Thomas Jr. usage 80% over 10wk"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 10,
    "weekTo": 11,
    "ownerA": "Austin Gauss",
    "teamA": "Beats By Ray (Rice)",
    "playersA": [
      {
        "name": "Chuba Hubbard",
        "pos": "RB"
      },
      {
        "name": "Sam LaPorta",
        "pos": "TE"
      }
    ],
    "ownerB": "Benjamin Schon",
    "teamB": "Like a good Nabers",
    "playersB": [
      {
        "name": "Khalil Shakir",
        "pos": "WR"
      },
      {
        "name": "Trey McBride",
        "pos": "TE"
      }
    ],
    "valueA": 46.6,
    "valueB": 7.2,
    "ntvA": 39.4,
    "ntvB": -39.4,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Chuba Hubbard",
        "margin": 0.0,
        "note": "Chuba Hubbard usage 80% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Khalil Shakir",
        "out": null,
        "margin": 14.6,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 7.3)"
      },
      {
        "kind": "pair",
        "in": "Trey McBride",
        "out": "Sam LaPorta",
        "margin": 32.0,
        "note": "Sam LaPorta usage 80% over 10wk"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Chuba Hubbard",
        "out": null,
        "margin": 36.8,
        "note": "[RB] vs incumbent Jordan Mason (80%)"
      },
      {
        "kind": "pair",
        "in": "Sam LaPorta",
        "out": "Trey McBride",
        "margin": -29.6,
        "note": "Trey McBride usage 90% over 10wk"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Khalil Shakir",
        "margin": 0.0,
        "note": "Khalil Shakir usage 20% -> no vacancy"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Austin Gauss",
    "teamA": "Beats By Ray (Rice)",
    "playersA": [
      {
        "name": "DeVonta Smith",
        "pos": "WR"
      }
    ],
    "ownerB": "Evan Lamb",
    "teamB": "King Beef",
    "playersB": [
      {
        "name": "Rachaad White",
        "pos": "RB"
      }
    ],
    "valueA": 20.5,
    "valueB": 13.7,
    "ntvA": 6.8,
    "ntvB": -6.8,
    "legsA": [
      {
        "kind": "pool",
        "in": "Rachaad White",
        "out": null,
        "margin": 20.5,
        "note": "[RB] vs incumbent Alexander Mattison (80%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "DeVonta Smith",
        "margin": 0.0,
        "note": "DeVonta Smith usage 82% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Rachaad White",
        "margin": 0.0,
        "note": "Rachaad White usage 55% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "DeVonta Smith",
        "out": null,
        "margin": 13.7,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 0.0)"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Jack Callahan",
    "teamA": "Chasing Contracts",
    "playersA": [
      {
        "name": "Jonnu Smith",
        "pos": "TE"
      }
    ],
    "ownerB": "Jacob Ayriss",
    "teamB": "Obi-Jan Kenobi",
    "playersB": [
      {
        "name": "Jaylen Waddle",
        "pos": "WR"
      }
    ],
    "valueA": 0.0,
    "valueB": 37.1,
    "ntvA": -37.1,
    "ntvB": 37.1,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jonnu Smith",
        "margin": 0.0,
        "note": "Jonnu Smith usage 50% over only 2wk -> too small a sample to trust"
      },
      {
        "kind": "pool",
        "in": "Jaylen Waddle",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Jonnu Smith",
        "out": null,
        "margin": 37.1,
        "note": "[TE] vs bench pool ('TE',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jaylen Waddle",
        "margin": 0.0,
        "note": "Jaylen Waddle usage 36% -> no vacancy"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 12,
    "weekTo": 13,
    "ownerA": "Jack Callahan",
    "teamA": "Chasing Contracts",
    "playersA": [
      {
        "name": "Jayden Daniels",
        "pos": "QB"
      }
    ],
    "ownerB": "Benjamin Schon",
    "teamB": "Like a good Nabers",
    "playersB": [
      {
        "name": "Bucky Irving",
        "pos": "RB"
      },
      {
        "name": "Josh Downs",
        "pos": "WR"
      }
    ],
    "valueA": 42.8,
    "valueB": 33.1,
    "ntvA": 9.7,
    "ntvB": -9.7,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Jayden Daniels",
        "margin": 0.0,
        "note": "Jayden Daniels usage 33% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Bucky Irving",
        "out": null,
        "margin": 42.8,
        "note": "[RB] vs bench pool ('RB',) (avg 4.8)"
      },
      {
        "kind": "pool",
        "in": "Josh Downs",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Jayden Daniels",
        "out": null,
        "margin": 33.1,
        "note": "[QB] vs bench pool ('QB',) (avg 14.2)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Bucky Irving",
        "margin": 0.0,
        "note": "Bucky Irving usage 18% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Josh Downs",
        "margin": 0.0,
        "note": "Josh Downs usage 25% -> no vacancy"
      }
    ]
  },
  {
    "season": 2024,
    "weekFrom": 13,
    "weekTo": 14,
    "ownerA": "Austin Gauss",
    "teamA": "Beats By Ray (Rice)",
    "playersA": [
      {
        "name": "Christian McCaffrey",
        "pos": "RB"
      },
      {
        "name": "Rachaad White",
        "pos": "RB"
      }
    ],
    "ownerB": "Zack Rollis",
    "teamB": "Richmond Diamond Dogs",
    "playersB": [
      {
        "name": "De'Von Achane",
        "pos": "RB"
      },
      {
        "name": "Jonathan Taylor",
        "pos": "RB"
      }
    ],
    "valueA": 18.9,
    "valueB": 6.0,
    "ntvA": 12.9,
    "ntvB": -12.9,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Rachaad White",
        "margin": 0.0,
        "note": "Rachaad White usage 100% over only 2wk -> too small a sample to trust"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Christian McCaffrey",
        "margin": 0.0,
        "note": "Christian McCaffrey usage 31% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "De'Von Achane",
        "out": null,
        "margin": 18.9,
        "note": "[RB] vs bench pool ('RB',) (avg 0.0)"
      },
      {
        "kind": "pool",
        "in": "Jonathan Taylor",
        "out": null,
        "margin": 0.0,
        "note": "no active weeks"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Rachaad White",
        "out": "De'Von Achane",
        "margin": 6.0,
        "note": "De'Von Achane usage 92% over 13wk"
      },
      {
        "kind": "pair",
        "in": "Christian McCaffrey",
        "out": "Jonathan Taylor",
        "margin": 0.0,
        "note": "Jonathan Taylor usage 77% over 13wk"
      }
    ]
  },
  {
    "season": 2025,
    "weekFrom": "pre-S1",
    "weekTo": 1,
    "ownerA": "Benjamin Schon",
    "teamA": "Bill! Bill! Bill! Bill!",
    "playersA": [
      {
        "name": "Dallas Goedert",
        "pos": "TE"
      },
      {
        "name": "DeVonta Smith",
        "pos": "WR"
      }
    ],
    "ownerB": "Blake Beachnau",
    "teamB": "Kareem in my Hunt",
    "playersB": [
      {
        "name": "Rome Odunze",
        "pos": "WR"
      },
      {
        "name": "Tyler Warren",
        "pos": "TE"
      }
    ],
    "valueA": -16.5,
    "valueB": -9.8,
    "ntvA": -6.7,
    "ntvB": 6.7,
    "legsA": [
      {
        "kind": "pair",
        "in": "Tyler Warren",
        "out": "Dallas Goedert",
        "margin": -20.8,
        "note": "preseason 1:1 [TE] (full season)"
      },
      {
        "kind": "pair",
        "in": "Rome Odunze",
        "out": "DeVonta Smith",
        "margin": 4.3,
        "note": "preseason 1:1 [WR] (full season)"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Dallas Goedert",
        "out": "Tyler Warren",
        "margin": -5.5,
        "note": "preseason 1:1 [TE] (full season)"
      },
      {
        "kind": "pair",
        "in": "DeVonta Smith",
        "out": "Rome Odunze",
        "margin": -4.3,
        "note": "preseason 1:1 [WR] (full season)"
      }
    ]
  },
  {
    "season": 2025,
    "weekFrom": "pre-S1",
    "weekTo": 1,
    "ownerA": "Jon Hurlburt",
    "teamA": "Brocklyn Nine-Nine",
    "playersA": [
      {
        "name": "Chris Olave",
        "pos": "WR"
      },
      {
        "name": "Jahmyr Gibbs",
        "pos": "RB"
      }
    ],
    "ownerB": "Austin Gauss",
    "teamB": "I like to Chase Brown kids",
    "playersB": [
      {
        "name": "Christian McCaffrey",
        "pos": "RB"
      },
      {
        "name": "Jaxon Smith-Njigba",
        "pos": "WR"
      }
    ],
    "valueA": 148.8,
    "valueB": -145.4,
    "ntvA": 294.2,
    "ntvB": -294.2,
    "legsA": [
      {
        "kind": "pair",
        "in": "Christian McCaffrey",
        "out": "Jahmyr Gibbs",
        "margin": 34.0,
        "note": "preseason 1:1 [RB] (full season)"
      },
      {
        "kind": "pair",
        "in": "Jaxon Smith-Njigba",
        "out": "Chris Olave",
        "margin": 114.8,
        "note": "preseason 1:1 [WR] (full season)"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Jahmyr Gibbs",
        "out": "Christian McCaffrey",
        "margin": -45.8,
        "note": "preseason 1:1 [RB] (full season)"
      },
      {
        "kind": "pair",
        "in": "Chris Olave",
        "out": "Jaxon Smith-Njigba",
        "margin": -99.6,
        "note": "preseason 1:1 [WR] (full season)"
      }
    ]
  },
  {
    "season": 2025,
    "weekFrom": 7,
    "weekTo": 8,
    "ownerA": "Austin Gauss",
    "teamA": "I like to Chase Brown kids",
    "playersA": [
      {
        "name": "Chris Olave",
        "pos": "WR"
      },
      {
        "name": "Kenneth Gainwell",
        "pos": "RB"
      }
    ],
    "ownerB": "Adam Schon",
    "teamB": "Mass Laportations",
    "playersB": [
      {
        "name": "Derrick Henry",
        "pos": "RB"
      }
    ],
    "valueA": 19.1,
    "valueB": 6.7,
    "ntvA": 12.4,
    "ntvB": -12.4,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Kenneth Gainwell",
        "margin": 0.0,
        "note": "Kenneth Gainwell usage 0% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Derrick Henry",
        "out": null,
        "margin": 19.1,
        "note": "[RB] vs incumbent Jahmyr Gibbs (100%)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Chris Olave",
        "margin": 0.0,
        "note": "Chris Olave usage 86% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "pair",
        "in": "Kenneth Gainwell",
        "out": "Derrick Henry",
        "margin": -35.5,
        "note": "Derrick Henry usage 86% over 7wk"
      },
      {
        "kind": "pool",
        "in": "Chris Olave",
        "out": null,
        "margin": 42.2,
        "note": "[WR] vs incumbent Jerry Jeudy (57%)"
      }
    ]
  },
  {
    "season": 2025,
    "weekFrom": 8,
    "weekTo": 9,
    "ownerA": "Benjamin Schon",
    "teamA": "Bill! Bill! Bill! Bill!",
    "playersA": [
      {
        "name": "Josh Jacobs",
        "pos": "RB"
      },
      {
        "name": "Rome Odunze",
        "pos": "WR"
      }
    ],
    "ownerB": "Austin Gauss",
    "teamB": "I like to Chase Brown kids",
    "playersB": [
      {
        "name": "Derrick Henry",
        "pos": "RB"
      },
      {
        "name": "Drake London",
        "pos": "WR"
      },
      {
        "name": "TreVeyon Henderson",
        "pos": "RB"
      }
    ],
    "valueA": 172.9,
    "valueB": 52.9,
    "ntvA": 120.0,
    "ntvB": -120.0,
    "legsA": [
      {
        "kind": "pair",
        "in": "TreVeyon Henderson",
        "out": "Josh Jacobs",
        "margin": 57.1,
        "note": "Josh Jacobs usage 88% over 8wk"
      },
      {
        "kind": "pool",
        "in": "Derrick Henry",
        "out": null,
        "margin": 95.2,
        "note": "[RB] vs incumbent Jacory Croskey-Merritt (50%)"
      },
      {
        "kind": "pair",
        "in": "Drake London",
        "out": "Rome Odunze",
        "margin": 20.6,
        "note": "Rome Odunze usage 75% over 8wk"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Derrick Henry",
        "margin": 0.0,
        "note": "Derrick Henry usage 100% over only 1wk -> too small a sample to trust"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "TreVeyon Henderson",
        "margin": 0.0,
        "note": "TreVeyon Henderson usage 25% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Josh Jacobs",
        "out": null,
        "margin": 73.5,
        "note": "[RB] vs bench pool ('RB',) (avg 2.7)"
      },
      {
        "kind": "pair",
        "in": "Rome Odunze",
        "out": "Drake London",
        "margin": -20.6,
        "note": "Drake London usage 75% over 8wk"
      }
    ]
  },
  {
    "season": 2025,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Jon Hurlburt",
    "teamA": "Brocklyn Nine-Nine",
    "playersA": [
      {
        "name": "Kyle Pitts Sr.",
        "pos": "TE"
      },
      {
        "name": "Rhamondre Stevenson",
        "pos": "RB"
      }
    ],
    "ownerB": "Adam Kahler",
    "teamB": "Burrow this Chubb in the Brown",
    "playersB": [
      {
        "name": "Dak Prescott",
        "pos": "QB"
      }
    ],
    "valueA": 82.1,
    "valueB": 3.1,
    "ntvA": 79.0,
    "ntvB": -79.0,
    "legsA": [
      {
        "kind": "pool",
        "in": "Dak Prescott",
        "out": null,
        "margin": 82.1,
        "note": "[QB] vs bench pool ('QB',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Rhamondre Stevenson",
        "margin": 0.0,
        "note": "Rhamondre Stevenson usage 0% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Kyle Pitts Sr.",
        "margin": 0.0,
        "note": "Kyle Pitts Sr. usage 18% -> no vacancy"
      }
    ],
    "legsB": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Dak Prescott",
        "margin": 0.0,
        "note": "Dak Prescott usage 73% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Rhamondre Stevenson",
        "out": null,
        "margin": -4.6,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 8.2)"
      },
      {
        "kind": "pool",
        "in": "Kyle Pitts Sr.",
        "out": null,
        "margin": 7.7,
        "note": "[TE] vs incumbent T.J. Hockenson (64%)"
      }
    ]
  },
  {
    "season": 2025,
    "weekFrom": 11,
    "weekTo": 12,
    "ownerA": "Blake Beachnau",
    "teamA": "Kareem in my Hunt",
    "playersA": [
      {
        "name": "Kareem Hunt",
        "pos": "RB"
      },
      {
        "name": "Matthew Stafford",
        "pos": "QB"
      }
    ],
    "ownerB": "Brent Hurlburt",
    "teamB": "Uncle Lamb's",
    "playersB": [
      {
        "name": "Aaron Jones Sr.",
        "pos": "RB"
      },
      {
        "name": "Keenan Allen",
        "pos": "WR"
      }
    ],
    "valueA": 3.3,
    "valueB": 68.3,
    "ntvA": -65.0,
    "ntvB": 65.0,
    "legsA": [
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Matthew Stafford",
        "margin": 0.0,
        "note": "Matthew Stafford usage 18% -> no vacancy"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Kareem Hunt",
        "margin": 0.0,
        "note": "Kareem Hunt usage 9% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Aaron Jones Sr.",
        "out": null,
        "margin": 1.0,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 6.6)"
      },
      {
        "kind": "pool",
        "in": "Keenan Allen",
        "out": null,
        "margin": 2.3,
        "note": "[RB/WR/TE] vs bench pool ('RB', 'WR') (avg 4.7)"
      }
    ],
    "legsB": [
      {
        "kind": "pool",
        "in": "Matthew Stafford",
        "out": null,
        "margin": 55.1,
        "note": "[QB] vs bench pool ('QB',) (avg 0.0)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Aaron Jones Sr.",
        "margin": 0.0,
        "note": "Aaron Jones Sr. usage 36% -> no vacancy"
      },
      {
        "kind": "pool",
        "in": "Kareem Hunt",
        "out": null,
        "margin": 13.2,
        "note": "[RB] vs bench pool ('RB',) (avg 8.8)"
      },
      {
        "kind": "depart_zero",
        "in": null,
        "out": "Keenan Allen",
        "margin": 0.0,
        "note": "Keenan Allen usage 82% -> no vacancy"
      }
    ]
  }
];
