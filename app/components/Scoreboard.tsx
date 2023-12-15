import { getPicks } from '../lib/api'
import { getScoreboard } from '../lib/utils'
import styles from './Scoreboard.module.scss'

const Scoreboard = async () => {
  // fetch data
  const picks = (await getPicks(false)) ?? []
  // format data
  const totalPicks = picks.length
  const data = getScoreboard(picks)
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
            <strong>{winningPercentage}%</strong> accuracy
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
