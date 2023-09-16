import { format } from 'date-fns'
import { PickType, PostType } from '@/app/lib/types'
import { getAllDone, getScoreboard, getPostResults } from '@/app/lib/utils'
import { Pick } from '@/app/components/Pick'
import styles from './Post.module.scss'

const Post = ({ data }: {
  data: PostType
}) => {
  const { picksCollection: { items }, sys: { firstPublishedAt }, title } = data
  const allDone = getAllDone(items)
  const scoreboard = getScoreboard(items)
  const { wins } = scoreboard
  const totalPicks = items.length
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <time className={styles.eyebrow} dateTime={firstPublishedAt}>
            {format(new Date(firstPublishedAt), `do 'of' LLLL yyyy`)}
          </time>
          <h1 className={styles.heading}>
            {allDone ? `${title} ${getPostResults(wins, totalPicks)}` : 'This week Rich picks'}
          </h1>
          {allDone && (
            <p className={styles.summary}>
              {wins} out of {totalPicks}
            </p>
          )}
        </header>
        <ol className={styles.list}>
          {items.map((item: PickType) => (
            <li className={styles.item} key={item.sys.id}><Pick data={item} /></li>
          ))}
        </ol>
        {!allDone && (
          <p className={styles.graph}>
            Check out the latest odds at <a href="https://sportsbook.draftkings.com/leagues/football/nfl">DraftKings</a>, <a href="https://www.espn.com/nfl/lines">ESPN</a>, or <a href="https://sportsbook.fanduel.com/navigation/nfl">FanDuel</a>.
          </p>
        )}
      </div>
    </section>
  )
}

export { Post }
