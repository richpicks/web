import { PickType, ScoreType } from '@/app/lib/types'

export const getPostResults = (wins: number, total: number) => {
  const result = (wins / total) * 100
  if (result === 100) {
    return `and was perfect`
  }
  if (result > 50) {
    return `and had a good outing`
  }
  if (result === 50) {
    return `and broke even`
  } else {
    return `and was less than stellar`
  }
}

export const gameDone = (pick: PickType) => {
  return pick.game.done
}

export const getFinal = (pick: PickType) => {
  const {
    bet,
    game: { awayScore, awayTeam, homeScore },
    team,
  } = pick
  const isAway = team?.name === awayTeam.name
  const total = awayScore + homeScore
  const difference = isAway ? awayScore - homeScore : homeScore - awayScore
  return {
    spread: difference,
    over: total,
    under: total,
    moneyline: difference,
  }[bet]
}

export const getSpread = (pick: PickType) => {
  const {
    game: { awaySpread, awayTeam, homeSpread },
    team,
  } = pick
  const isAway = team?.name === awayTeam.name
  return isAway ? awaySpread : homeSpread
}

export const getSpreadData = (pick: PickType) => {
  const {
    game: { awayScore, awaySpread, awayTeam, homeScore, homeSpread, homeTeam },
    team,
  } = pick
  const isAway = team?.name === awayTeam.name
  return isAway
    ? {
        isAway: isAway,
        isFavorite: awaySpread <= 0,
        opposingScore: homeScore,
        opposingTeam: homeTeam,
        pickedScore: awayScore,
        pickedTeam: awayTeam,
        result: getResult(awayScore - homeScore),
        spread: awaySpread,
      }
    : {
        isAway: isAway,
        isFavorite: homeSpread <= 0,
        opposingScore: awayScore,
        opposingTeam: awayTeam,
        pickedScore: homeScore,
        pickedTeam: homeTeam,
        result: getResult(homeScore - awayScore),
        spread: homeSpread,
      }
}

export const getMoneylineData = (pick: PickType) => {
  const {
    game: { awayScore, awaySpread, awayTeam, homeScore, homeSpread, homeTeam },
    team,
  } = pick
  const isAway = team?.name === awayTeam.name
  return isAway
    ? {
        isAway: isAway,
        isFavorite: awaySpread <= 0,
        opposingScore: homeScore,
        opposingTeam: homeTeam,
        pickedScore: awayScore,
        pickedTeam: awayTeam,
        result: getResult(awayScore - homeScore),
        spread: awaySpread,
      }
    : {
        isAway: isAway,
        isFavorite: homeSpread <= 0,
        opposingScore: awayScore,
        opposingTeam: awayTeam,
        pickedScore: homeScore,
        pickedTeam: homeTeam,
        result: getResult(homeScore - awayScore),
        spread: homeSpread,
      }
}

export const getResult = (diff: number) => {
  if (diff > 0) return 'won'
  if (diff < 0) return 'lost'
  return 'tied'
}

export const getEmoji = (diff: number) => {
  if (diff > 0) return '💰'
  if (diff < 0) return '😢'
  return '🤔'
}

export const getConjuction = (diff: number) => {
  if (diff > 0) return 'and'
  return 'but'
}

export const tallyScores = (score: ScoreType, settled: number) => {
  let { wins, losses, ties } = score
  if (settled > 0) score.wins = ++wins
  if (settled < 0) score.losses = ++losses
  if (settled === 0) score.ties = ++ties
  return score
}

export const settleScore = (pick: PickType) => {
  const {
    game: { points },
    bet,
  } = pick
  const spread = getSpread(pick)
  const final = getFinal(pick)
  return {
    over: final - points,
    spread: final + spread,
    under: points - final,
    moneyline: final,
  }[bet]
}

export const getScoreboard = (picks: PickType[]) => {
  const initialScores = { wins: 0, losses: 0, ties: 0 }
  return picks
    .filter(gameDone)
    .map(settleScore)
    .reduce(tallyScores, initialScores)
}

export const getAllDone = (picks: PickType[]) => {
  return picks.every(gameDone)
}
