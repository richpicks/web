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
  const regularSeasonID = '3hYqTUewPuxadePp650bj8'
  const regularSeasonPosts = (await getSeasonPosts(regularSeasonID)) ?? []
  // JSX
  return regularSeasonPosts.length > 0 ? (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">NFL 2024 Regular Season</h1>
        </div>
      </header>
      <Scoreboard seasonID={regularSeasonID} />
      {regularSeasonPosts.map((post: PostType) => (
        <Post key={post.sys.id} data={post} />
      ))}
    </article>
  ) : (
    <article className="article">
      <header className="header">
        <div className="container">
          <h1 className="heading">NFL 2024 Regular Season</h1>
        </div>
      </header>
      <div className={styles.body}>
        <div className="container">
          <p className={styles.graph}>
            Welcome to Rich Picks. Check out the{' '}
            <Link href="/nfl/2023-post-season">NFL 2023 Post Season</Link> and
            the{' '}
            <Link href="/nfl/2023-regular-season">NFL 2023 Regular Season</Link>{' '}
            for previous picks.
          </p>
        </div>
      </div>
    </article>
  )
}

export default Home
