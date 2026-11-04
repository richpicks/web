// Made-up picks for previewing the record page before Rich posts.
// Only served outside production, see app/nfl/sample/record/page.tsx

import { BankrollType, PickType, PostType } from '@/app/lib/types'

export const sampleBankroll: BankrollType = {
  title: 'Sample bankroll',
  startingBankroll: 1000,
  startDate: '2026-11-12',
  unitPercent: 2,
  maxUnitsPerWeek: 10,
  defaultPrice: -110,
  splitRule: {
    name: 'Steady saver',
    bankrollPercent: 50,
    indexFundPercent: 30,
    savingsPercent: 20,
    appliesTo: 'weekly profit',
    indexFundAnnualRate: 7,
    savingsAnnualRate: 4,
  },
}

const home = { name: 'Home', location: 'Sample' }
const away = { name: 'Away', location: 'Sample' }

// result: 'w' win, 'l' loss, 'p' push, 'v' void, '-' not played yet
type Result = 'w' | 'l' | 'p' | 'v' | '-'

// a home spread pick at -3: win by 7, lose by 3, push at 3
const spreadPick = (id: string, date: string, result: Result, units = 1) =>
  samplePick(id, date, result, 'spread', home, units, {
    w: [20, 27],
    l: [20, 17],
    p: [20, 23],
    v: [0, 0],
    '-': [0, 0],
  })

// an away moneyline pick at +145
const moneylinePick = (id: string, date: string, result: Result) =>
  samplePick(id, date, result, 'moneyline', away, 1, {
    w: [24, 21],
    l: [17, 24],
    p: [20, 20],
    v: [0, 0],
    '-': [0, 0],
  })

const samplePick = (
  id: string,
  date: string,
  result: Result,
  bet: PickType['bet'],
  team: typeof home,
  units: number,
  scores: { [key in Result]: number[] }
): PickType => {
  const [awayScore, homeScore] = scores[result]
  return {
    sys: { id },
    title: `Sample pick ${id}`,
    bet,
    team,
    units,
    resultOverride: result === 'v' ? 'void' : null,
    game: {
      date,
      awayTeam: away,
      awayScore,
      awaySpread: 3,
      awayMoneyline: 145,
      homeTeam: home,
      homeScore,
      homeSpread: -3,
      homeMoneyline: -170,
      points: 44.5,
      done: result !== '-' && result !== 'v',
    },
  }
}

// weeks 10 and 11 match the worked example in the plan doc
const weeks: [number, string, string][] = [
  [10, '2026-11-12', 'wwwll'],
  [11, '2026-11-19', 'wllll'],
  [12, '2026-11-26', 'wwlpw'],
  [13, '2026-12-03', 'lwlwl'],
  [14, '2026-12-10', 'wwwlw'],
  [15, '2026-12-17', 'llwvl'],
  [16, '2026-12-24', 'wlww-'],
]

export const samplePosts: PostType[] = weeks.map(([week, date, results]) => ({
  sys: { id: `week-${week}`, firstPublishedAt: `${date}T16:00:00.000Z` },
  title: `NFL Week ${week}`,
  week,
  picksCollection: {
    items: results.split('').map((result, i) => {
      const id = `${week}-${i}`
      const kickoff = `${date}T20:00:00.000Z`
      // from week 12, one 2-unit pick and one plus-money pick a week
      if (week > 11 && i === 0)
        return spreadPick(id, kickoff, result as Result, 2)
      if (week > 11 && i === 1)
        return moneylinePick(id, kickoff, result as Result)
      return spreadPick(id, kickoff, result as Result)
    }),
  },
}))
