import { getSeasonPicks } from '../lib/api'
import { getScoreboard } from '../lib/utils'
import styles from './Scoreboard.module.scss'

const Scoreboard = async ({ seasonID }: { seasonID: string }) => {
  // fetch data
  const picks = (await getSeasonPicks(seasonID)) ?? []
  // format data
  const filteredPicks = picks.filter((p: any) => p?.game?.done)
  const totalPicks = filteredPicks.length
  const data = getScoreboard(filteredPicks)
  const { wins, losses, ties } = data
  const winningPercentage = +(wins / totalPicks).toFixed(2) * 100
  // JSX
  return totalPicks > 0 ? (
    <div className={styles.scoreboard}>
      <div className="container">
        <ul className={styles.list}>
          <li>
            {wins} out of {totalPicks}
          </li>
          <li>
            <strong>{winningPercentage.toPrecision(2)}%</strong> accuracy
          </li>
        </ul>
        <div className={styles.stats}>
          <ul className={styles.list}>
            <li>{wins} hits 💰</li>
            <li>{ties} pushes 🤔</li>
            <li>{losses} misses 😢</li>
          </ul>
        </div>
      </div>
    </div>
  ) : null
}

export { Scoreboard }
