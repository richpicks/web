import { format } from 'date-fns'
import { PickType, PostType } from '@/app/lib/types'
import { getAllDone, getScoreboard, getPostResults } from '@/app/lib/utils'
import { Pick } from '@/app/components/Pick'

const Post = ({ data }: {
  data: PostType
}) => {
  const { picksCollection: { items } } = data
  const allDone = getAllDone(items)
  const scoreboard = getScoreboard(items)
  const { sys: { firstPublishedAt }, title } = data
  return (
    <section className="section">
      <div className="container">
        <header className="header">
          <time className="eyebrow" dateTime={firstPublishedAt}>
            {format(new Date(firstPublishedAt), `do 'of' LLLL yyyy`)}
          </time>
          <h1 className="heading">
            {title}
          </h1>
          {allDone && (
            <p className="summary">
              {getPostResults(scoreboard.wins, items.length)}
            </p>
          )}
        </header>
        <ol className="games">
          {items.map((item: PickType) => (
            <li className="game" key={item.sys.id}><Pick data={item} /></li>
          ))}
        </ol>
        {!allDone && (
          <p className="graph">
            Check out the latest odds at <a href="https://sportsbook.draftkings.com/leagues/football/nfl">DraftKings</a>, <a href="https://www.espn.com/nfl/lines">ESPN</a>, or <a href="https://sportsbook.fanduel.com/navigation/nfl">FanDuel</a>.
          </p>
        )}
      </div>
    </section>
  )
}

export { Post }
