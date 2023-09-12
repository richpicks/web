import { PickType } from '@/app/lib/types'
import { getEmoji, getSpreadData, settleScore } from '@/app/lib/utils'

const PickOverUnder = ({ data }: {
  data: PickType
}) => {
  const { bet, game } = data
  const settled = settleScore(data)
  const emoji = getEmoji(settled)
  return (
    <>
      <p className="pick">
        The <strong>{bet}</strong> for the{' '}
        <em>{game.awayTeam.location} {game.awayTeam.name}</em>{' '}
        against the <em>{game.homeTeam.location} {game.homeTeam.name}</em>.
      </p>
      {game.done && (
        <p className="result">
          <span aria-hidden="true">{emoji}</span>{' '}
          Rich needed the <em>{game.awayTeam.name}</em> and
          the <em>{game.homeTeam.name}</em> to score
          {bet === 'over' ? 'more' : 'less'} than {game.points} points combined.
          The final score was {game.awayScore} to {game.homeScore}.
        </p>
      )}
    </>
  )
}

const PickSpread = ({ data }: {
  data: PickType
}) => {
  const { team, game } = data
  const settled = settleScore(data)
  const emoji = getEmoji(settled)
  const spreadData = getSpreadData(data)
  const {
    isAway,
    isFavorite,
    opposingScore,
    opposingTeam,
    pickedScore,
    result,
    spread
  } = spreadData
  const absoluteSpread = Math.abs(spread)
  return (
    <>
      <p className="pick">
        The <strong>{team?.location} {team?.name}</strong>{' '}
        {game.done ? `(${spread}) ` : ''}
        {isAway ? 'on the road' : 'at home' }  against the{' '}
        <em>{opposingTeam.location} {opposingTeam.name}</em>.
      </p>
      {game.done && (
        <p className="result">
          <span aria-hidden="true">{emoji}</span>{' '}
          Rich needed the <strong>{team?.name}</strong> to{' '}
          {isFavorite ? 'win' : 'not lose'} by more than {absoluteSpread}{' '}
          point{absoluteSpread === 1 ? '' : 's'}.{' '}
          They {result} {pickedScore} to {opposingScore}.
        </p>
      )}
    </>
  )
}

const Pick = ({ data }: {
  data: PickType
}) => {
  const { bet, team, game } = data
  return {
    spread: <PickSpread data={data} />,
    over: <PickOverUnder data={data} />,
    under: <PickOverUnder data={data} />,
  }[bet]
}

export { Pick }
