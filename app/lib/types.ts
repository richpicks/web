export interface GameType {
  awayTeam: TeamType
  awayScore: number
  awaySpread: number
  homeTeam: TeamType
  homeScore: number
  homeSpread: number
  points: number
  done: boolean
}

export interface PickType {
  title: string
  bet: 'spread' | 'over' | 'under'
  game: GameType
  team?: TeamType
  sys: {
    id: string
  }
}

export interface PostType {
  title: string
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
