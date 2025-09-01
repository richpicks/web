import { Metadata } from 'next'
import Link from 'next/link'
import { PostType } from '@/app/lib/types'
import { Post } from '@/app/components/Post'
import { getSeasonPosts } from '@/app/lib/api'
import { Scoreboard } from '@/app/components/Scoreboard'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Welcome to Rich Picks',
}

const Home = async () => {
  // page data
  const seasonID = '3BZXcTiV6iKpzevoOHK08n'
  const seasonPosts = (await getSeasonPosts(seasonID)) ?? []
  // JSX
  return seasonPosts.length > 0 ? (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">NFL 2025 Regular Season</h1>
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
          <h1 className="heading">NFL 2025 Regular Season</h1>
        </div>
      </header>
      <div className={styles.body}>
        <div className="container">
          <p className={styles.graph}>
            Welcome to Rich Picks. The regular season is upon us, in the
            meantime, check out Rich’s <Link href="/nfl">NFL picks</Link>.
          </p>
        </div>
      </div>
    </article>
  )
}

export default Home
