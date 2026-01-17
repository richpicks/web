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
  const percentage = (wins / totalPicks) * 100
  const accuracy = Math.round(percentage * 100) / 100 // †
  // JSX
  return totalPicks > 0 ? (
    <div className={styles.scoreboard}>
      <div className="container">
        <ul className={styles.list}>
          <li>
            {wins} out of {totalPicks}
          </li>
          <li>
            <strong>{accuracy}%</strong> accuracy
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

// † https://coreui.io/blog/how-to-round-a-number-to-two-decimal-places-in-javascript/#2-multiplication-and-division-trick
