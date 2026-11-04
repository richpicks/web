import { Metadata } from 'next'
import Link from 'next/link'
import { PostType } from '@/app/lib/types'
import { Post } from '@/app/components/Post'
import { getSeasonPostsBySlug } from '@/app/lib/api'
import { Scoreboard } from '@/app/components/Scoreboard'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Welcome to Rich Picks',
}

const Home = async () => {
  // page data
  const seasonSlug = '2026-regular-season'
  const { id: seasonID, items: seasonPosts = [] } =
    (await getSeasonPostsBySlug(seasonSlug)) ?? {}
  // JSX
  return seasonPosts.length > 0 ? (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">NFL 2026 Regular Season</h1>
          <p className={styles.graph}>
            Rich picks against a $1,000 play-money bankroll.{' '}
            <Link href={`/nfl/${seasonSlug}/record`}>See the record</Link>.
          </p>
        </div>
      </header>
      <Scoreboard seasonID={seasonID} />
      {seasonPosts.map((post: PostType) => (
        <Post key={post.sys.id} data={post} />
      ))}
    </article>
  ) : (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">NFL 2026 Regular Season</h1>
        </div>
      </header>
      <div className={styles.body}>
        <div className="container">
          <p className={styles.graph}>
            Welcome to Rich Picks. This season Rich picks against a $1,000
            play-money bankroll, starting November 12. In the meantime, check
            out Rich’s <Link href="/nfl">past NFL picks</Link>.
          </p>
        </div>
      </div>
    </article>
  )
}

export default Home
