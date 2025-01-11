import { PickType } from '@/app/lib/types'
import {
  getConjuction,
  getEmoji,
  getMoneylineData,
  getSpreadData,
  settleScore,
} from '@/app/lib/utils'
import styles from './Pick.module.scss'

const PickOverUnder = ({ data }: { data: PickType }) => {
  const { bet, game } = data
  const settled = settleScore(data)
  const emoji = getEmoji(settled)
  return (
    <>
      <p className={styles.bet}>Over/Under</p>
      <p className={styles.pick}>
        {game.done ? 'Rich picked the ' : 'The '}
        <strong>{bet}</strong> {game.points !== 0 && `(${game.points})`} for the{' '}
        <em>{game.awayTeam.location}</em> <strong>{game.awayTeam.name}</strong>{' '}
        against the <em>{game.homeTeam.location}</em>{' '}
        <strong>{game.homeTeam.name}</strong>.
      </p>
      {game.done && (
        <p className={styles.result}>
          <span aria-hidden="true">{emoji}</span> Rich needed the{' '}
          <strong>{game.awayTeam.name}</strong> and the{' '}
          <strong>{game.homeTeam.name}</strong> to score{' '}
          {bet === 'over' ? 'more' : 'less'} than {game.points} points combined.
          The final score was {game.awayScore} to {game.homeScore}.
        </p>
      )}
    </>
  )
}

const PickSpread = ({ data }: { data: PickType }) => {
  const { team, game } = data
  const settled = settleScore(data)
  const conjunction = getConjuction(settled)
  const emoji = getEmoji(settled)
  const spreadData = getSpreadData(data)
  const {
    isAway,
    isFavorite,
    opposingScore,
    opposingTeam,
    pickedScore,
    result,
    spread,
  } = spreadData
  const absoluteSpread = Math.abs(spread)
  const positiveSpread = spread > 0 ? `+${spread}` : spread
  return (
    <>
      <p className={styles.bet}>Spread</p>
      <p className={styles.pick}>
        {game.done ? 'Rich picked the ' : 'The '}
        <strong>
          {team?.location} {team?.name}
        </strong>{' '}
        ({positiveSpread}) {isAway ? 'on the road' : 'at home'} against the{' '}
        <em>
          {opposingTeam.location} {opposingTeam.name}
        </em>
        .
      </p>
      {game.done && (
        <p className={styles.result}>
          <span aria-hidden="true">{emoji}</span> Rich needed the{' '}
          <strong>{team?.name}</strong> to {isFavorite ? 'win' : 'not lose'} by
          more than {absoluteSpread} point{absoluteSpread === 1 ? '' : 's'},{' '}
          {conjunction} they {result} {pickedScore} to {opposingScore}.
        </p>
      )}
    </>
  )
}

const PickMoneyline = ({ data }: { data: PickType }) => {
  const { team, game } = data
  const settled = settleScore(data)
  const conjunction = getConjuction(settled)
  const emoji = getEmoji(settled)
  const moneylineData = getMoneylineData(data)
  const {
    isAway,
    opposingScore,
    opposingTeam,
    pickedScore,
    result,
    moneyline,
  } = moneylineData
  const positiveMoneyline = moneyline > 100 ? `+${moneyline}` : moneyline
  return (
    <>
      <p className={styles.bet}>Moneyline</p>
      <p className={styles.pick}>
        {game.done ? 'Rich picked the ' : 'The '}
        <strong>
          {team?.location} {team?.name}
        </strong>{' '}
        ({positiveMoneyline}) {isAway ? 'on the road' : 'at home'} against the{' '}
        <em>
          {opposingTeam.location} {opposingTeam.name}
        </em>
        .
      </p>
      {game.done && (
        <p className={styles.result}>
          <span aria-hidden="true">{emoji}</span> Rich needed the{' '}
          <strong>{team?.name}</strong> to win, {conjunction} they {result}{' '}
          {pickedScore} to {opposingScore}.
        </p>
      )}
    </>
  )
}

const Pick = ({ data }: { data: PickType }) => {
  const { bet } = data
  return {
    spread: <PickSpread data={data} />,
    over: <PickOverUnder data={data} />,
    under: <PickOverUnder data={data} />,
    moneyline: <PickMoneyline data={data} />,
  }[bet]
}

export { Pick }
