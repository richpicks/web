export interface GameType {
  date: string
  awayTeam: TeamType
  awayScore: number
  awaySpread: number
  awayMoneyline: number
  homeTeam: TeamType
  homeScore: number
  homeSpread: number
  homeMoneyline: number
  points: number
  done: boolean
}

export interface PickType {
  title: string
  bet: 'spread' | 'over' | 'under' | 'moneyline'
  game: GameType
  team?: TeamType
  units?: number | null
  price?: number | null
  resultOverride?: 'void' | 'push' | null
  reasoning?: string | null
  sys: {
    id: string
  }
}

export interface PostType {
  title: string
  week?: number | null
  picksCollection: {
    items: PickType[]
  }
  sys: {
    id: string
    firstPublishedAt: string
  }
}

export interface ScoreType {
  wins: number
  losses: number
  ties: number
}

export interface TeamType {
  name: string
  location: string
}

export interface SplitRuleType {
  name: string
  bankrollPercent: number
  indexFundPercent: number
  savingsPercent: number
  appliesTo: 'weekly profit' | 'each winning pick'
  indexFundAnnualRate: number
  savingsAnnualRate: number
  explanation?: string | null
}

export interface BankrollType {
  title: string
  startingBankroll: number
  startDate: string
  unitPercent: number
  maxUnitsPerWeek: number
  defaultPrice: number
  splitRule: SplitRuleType
}
