import { BankrollType, PickType, PostType } from '@/app/lib/types'
import { settleScore } from '@/app/lib/utils'

export type Outcome = 'win' | 'loss' | 'push' | 'void' | 'pending'

export interface LedgerPick {
  pick: PickType
  outcome: Outcome
  units: number
  stake: number
  price: number
  profit: number
}

export interface LedgerWeek {
  id: string
  label: string
  date: string
  unitSize: number
  picks: LedgerPick[]
  settled: boolean
  net: number
  toBankroll: number
  toIndexFund: number
  toSavings: number
  bankroll: number
  indexFund: number
  savings: number
}

export interface Ledger {
  settings: BankrollType
  weeks: LedgerWeek[]
  bankroll: number
  indexFund: number
  savings: number
  total: number
}

export interface BankrollRecord {
  wins: number
  losses: number
  pushes: number
  pending: number
  winRate: number | null
  breakEvenRate: number
  staked: number
  profit: number
  returnOnStakes: number | null
  longestLosingStreak: number
}

const cents = (n: number) => Math.round(n * 100) / 100

export const getUnits = (pick: PickType) => pick.units ?? 1

export const getPrice = (pick: PickType, defaultPrice: number) => {
  if (pick.price) return pick.price
  if (pick.bet === 'moneyline') {
    const {
      game: { awayMoneyline, awayTeam, homeMoneyline },
      team,
    } = pick
    const moneyline =
      team?.name === awayTeam.name ? awayMoneyline : homeMoneyline
    if (moneyline) return moneyline
  }
  return defaultPrice
}

// American odds: -110 risks 110 to win 100, +145 risks 100 to win 145
export const getWinnings = (stake: number, price: number) =>
  price > 0 ? (stake * price) / 100 : (stake * 100) / Math.abs(price)

export const getOutcome = (pick: PickType): Outcome => {
  if (pick.resultOverride) return pick.resultOverride
  if (!pick.game.done) return 'pending'
  const settled = settleScore(pick)
  if (settled > 0) return 'win'
  if (settled < 0) return 'loss'
  return 'push'
}

export const getBreakEvenRate = (price: number) =>
  price > 0 ? 100 / (price + 100) : Math.abs(price) / (Math.abs(price) + 100)

const weeklyGrowth = (annualRate: number) =>
  Math.pow(1 + annualRate / 100, 1 / 52)

export const validateSplitRule = ({ splitRule }: BankrollType) => {
  const { bankrollPercent, indexFundPercent, savingsPercent, name } = splitRule
  const sum = bankrollPercent + indexFundPercent + savingsPercent
  if (sum !== 100) {
    throw new Error(
      `Split rule "${name}" adds up to ${sum}%, it needs to add up to 100%`
    )
  }
}

const byDate = (a: string, b: string) =>
  new Date(a).getTime() - new Date(b).getTime()

export const getLedger = (
  posts: PostType[],
  settings: BankrollType
): Ledger => {
  validateSplitRule(settings)
  const { splitRule, startDate, startingBankroll, unitPercent, defaultPrice } =
    settings
  const indexGrowth = weeklyGrowth(splitRule.indexFundAnnualRate)
  const savingsGrowth = weeklyGrowth(splitRule.savingsAnnualRate)
  const perPick = splitRule.appliesTo === 'each winning pick'
  const split = (amount: number) => ({
    toBankroll: (amount * splitRule.bankrollPercent) / 100,
    toIndexFund: (amount * splitRule.indexFundPercent) / 100,
    toSavings: (amount * splitRule.savingsPercent) / 100,
  })

  let bankroll = startingBankroll
  let indexFund = 0
  let savings = 0

  const weeks = [...posts]
    .sort((a, b) => byDate(a.sys.firstPublishedAt, b.sys.firstPublishedAt))
    .map((post) => {
      const items = post.picksCollection.items.filter(
        (pick) => pick?.game && byDate(pick.game.date, startDate) >= 0
      )
      return { post, items }
    })
    .filter(({ items }) => items.length > 0)
    .map(({ post, items }, index) => {
      indexFund *= indexGrowth
      savings *= savingsGrowth
      const unitSize = Math.max(1, Math.round((bankroll * unitPercent) / 100))
      const picks = items.map((pick) => {
        const outcome = getOutcome(pick)
        const units = getUnits(pick)
        const stake = units * unitSize
        const price = getPrice(pick, defaultPrice)
        const profit =
          outcome === 'win'
            ? getWinnings(stake, price)
            : outcome === 'loss'
              ? -stake
              : 0
        return { pick, outcome, units, stake, price, profit }
      })
      const settled = picks.every((p) => p.outcome !== 'pending')
      const net = picks.reduce((sum, p) => sum + p.profit, 0)
      let moved = { toBankroll: net, toIndexFund: 0, toSavings: 0 }
      if (perPick) {
        moved = picks.reduce(
          (total, p) => {
            const part =
              p.profit > 0
                ? split(p.profit)
                : { toBankroll: p.profit, toIndexFund: 0, toSavings: 0 }
            return {
              toBankroll: total.toBankroll + part.toBankroll,
              toIndexFund: total.toIndexFund + part.toIndexFund,
              toSavings: total.toSavings + part.toSavings,
            }
          },
          { toBankroll: 0, toIndexFund: 0, toSavings: 0 }
        )
      } else if (settled && net > 0) {
        moved = split(net)
      }
      bankroll += moved.toBankroll
      indexFund += moved.toIndexFund
      savings += moved.toSavings
      return {
        id: post.sys.id,
        label: post.week ? `Week ${post.week}` : `Post ${index + 1}`,
        date: post.sys.firstPublishedAt,
        unitSize,
        picks,
        settled,
        net: cents(net),
        toBankroll: cents(moved.toBankroll),
        toIndexFund: cents(moved.toIndexFund),
        toSavings: cents(moved.toSavings),
        bankroll: cents(bankroll),
        indexFund: cents(indexFund),
        savings: cents(savings),
      }
    })

  return {
    settings,
    weeks,
    bankroll: cents(bankroll),
    indexFund: cents(indexFund),
    savings: cents(savings),
    total: cents(bankroll + indexFund + savings),
  }
}

export const getRecord = (ledger: Ledger): BankrollRecord => {
  const picks = ledger.weeks
    .flatMap((week) => week.picks)
    .sort((a, b) => byDate(a.pick.game.date, b.pick.game.date))
  const count = (outcome: Outcome) =>
    picks.filter((p) => p.outcome === outcome).length
  const wins = count('win')
  const losses = count('loss')
  const decided = picks.filter(
    (p) => p.outcome === 'win' || p.outcome === 'loss'
  )
  const staked = decided.reduce((sum, p) => sum + p.stake, 0)
  const profit = decided.reduce((sum, p) => sum + p.profit, 0)
  let streak = 0
  let longestLosingStreak = 0
  // pushes and voids don't end a streak
  decided.forEach((p) => {
    streak = p.outcome === 'loss' ? streak + 1 : 0
    longestLosingStreak = Math.max(longestLosingStreak, streak)
  })
  return {
    wins,
    losses,
    pushes: count('push'),
    pending: count('pending'),
    winRate: wins + losses > 0 ? wins / (wins + losses) : null,
    breakEvenRate: getBreakEvenRate(ledger.settings.defaultPrice),
    staked: cents(staked),
    profit: cents(profit),
    returnOnStakes: staked > 0 ? profit / staked : null,
    longestLosingStreak,
  }
}

export const formatMoney = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export const formatPercent = (n: number | null) =>
  n === null ? '–' : `${Math.round(n * 1000) / 10}%`
